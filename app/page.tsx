
"use client";
import { useEffect, useRef } from "react";

const BIN = `01000001 00100000 01110011 01111001 01110011 01110100 01100101 01101101 00101110 00100000 01000001 00100000 01110011 01110100 01110010 01110101 01100011 01110100 01110101 01110010 01100101 00101110 00100000 01000001 00100000 01101110 01100101 01110111 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 00100000 01101111 01100110 00100000 01110100 01100001 01110011 01110100 01100101 00101110 00100000 01010111 01100101 00100111 01110010 01100101 00100000 01101110 01101111 01110100 00100000 01101000 01100101 01110010 01100101 00100000 01110100 01101111 00100000 01110011 01101000 01100001 01110010 01100101 00100000 01110010 01100101 01100011 01101001 01110000 01100101 01110011 00101110`;

type Dot = { x:number; y:number; vy:number; txt:"0"|"1"; stuck?:boolean; tx?:number; ty?:number; };

export default function Home(){
  const ref = useRef<HTMLCanvasElement|null>(null);

  useEffect(()=>{
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = w * DPR; canvas.height = h * DPR; ctx.scale(DPR, DPR);

    const cell = 10, cols = Math.ceil(w/cell), rows = Math.ceil(h/cell);
    const ground:boolean[][] = Array.from({length:rows}, ()=>Array(cols).fill(false));
    const dots: Dot[] = [];
    let t=0, phase:"RAIN"|"GATHER"|"MORPH"="RAIN";

    const rnd=(a:number,b:number)=>a+Math.random()*(b-a);
    const isSolid=(x:number,y:number)=>{
      const c=Math.floor(x/cell), r=Math.floor(y/cell);
      return r>=rows-1 || (r>=0&&r<rows&&c>=0&&c<cols&&ground[r+1]?.[c]);
    };
    const setCell=(x:number,y:number,val:boolean)=>{
      const c=Math.floor(x/cell), r=Math.floor(y/cell);
      if(r>=0&&r<rows&&c>=0&&c<cols) ground[r][c]=val;
    };

    const targets:{x:number;y:number}[]=[];
    function rasterize(){
      const off=document.createElement("canvas"); const o=off.getContext("2d")!;
      const pad=40; off.width=Math.min(1200,w-pad*2); off.height=240;
      o.fillStyle="#000"; o.fillRect(0,0,off.width,off.height);
      o.fillStyle="#fff"; const fs=Math.max(64,Math.min(180,Math.floor(w*0.12)));
      o.font=`800 ${fs}px ui-sans-serif,system-ui,Inter,Arial`; o.textAlign="center"; o.textBaseline="middle";
      o.fillText("CulinArch.AI", off.width/2, off.height/2);
      const img=o.getImageData(0,0,off.width,off.height).data; const step=8;
      const left=(w-off.width)/2, top=(h-off.height)/2; targets.length=0;
      for(let y=0;y<off.height;y+=step){
        for(let x=0;x<off.width;x+=step){
          const a=(y*off.width+x)*4+3; if(img[a]>10) targets.push({x:left+x,y:top+y});
        }
      }
    }
    rasterize();

    function spawn(n=Math.max(40,Math.min(140,Math.floor(w/8)))){
      for(let i=0;i<n;i++){
        dots.push({ x:rnd(0,w), y:rnd(-h*0.25,0), vy:rnd(1.2,3.2), txt: Math.random()>0.5?"1":"0" });
      }
    }
    function assignTargets(){
      while(targets.length<dots.length) targets.push(targets[Math.floor(Math.random()*targets.length)]);
      const shuffled=[...targets].sort(()=>Math.random()-0.5);
      dots.forEach((d,i)=>{ d.tx=shuffled[i].x; d.ty=shuffled[i].y; d.stuck=false; });
    }
    const human = BIN.split(" ").map(b=>String.fromCharCode(parseInt(b,2))).join("");

    function frame(){
      t++; ctx.clearRect(0,0,w,h);
      ctx.fillStyle="#0b0d0f"; ctx.fillRect(0,0,w,h);

      // grid
      ctx.strokeStyle="rgba(255,255,255,.04)"; ctx.lineWidth=1;
      for(let x=0;x<w;x+=24){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
      for(let y=0;y<h;y+=24){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }

      if(phase==="RAIN") spawn();

      ctx.fillStyle="#8ae9ff"; ctx.font="12px ui-monospace, Menlo, Consolas"; ctx.textAlign="center"; ctx.textBaseline="middle";
      let settled=0;
      dots.forEach(d=>{
        if(phase==="RAIN"){
          if(!d.stuck){ d.y+=d.vy; if(isSolid(d.x,d.y)){ d.stuck=true; setCell(d.x,d.y,true);} }
          else settled++;
        } else {
          if(d.tx==null||d.ty==null) return;
          const dx=d.tx-d.x, dy=d.ty-d.y, dist=Math.hypot(dx,dy)||1;
          const speed = phase==="GATHER" ? 0.12 : 0.2;
          d.x += dx*speed; d.y += dy*speed;
          if(dist<1.2){ d.x=d.tx; d.y=d.ty; }
        }
        ctx.save(); ctx.shadowColor="rgba(128,245,255,.7)"; ctx.shadowBlur = phase==="RAIN"?6:12;
        ctx.fillText(d.txt, d.x, d.y); ctx.restore();
      });

      ctx.fillStyle="rgba(200,208,216,.75)"; ctx.font="13px ui-monospace, Menlo, Consolas";
      ctx.textAlign="left"; ctx.fillText(human, 18, h-20);

      if(phase==="RAIN" && (t>220 || settled>400)){ phase="GATHER"; assignTargets(); }
      else if(phase==="GATHER" && t%90===0){ phase="MORPH"; }

      requestAnimationFrame(frame);
    }
    frame();

    const onResize=()=>{ w=window.innerWidth; h=window.innerHeight; canvas.width=w*DPR; canvas.height=h*DPR; ctx.scale(DPR,DPR); rasterize(); };
    window.addEventListener("resize", onResize);
    return ()=> window.removeEventListener("resize", onResize);
  },[]);

  return <div style={{height:"100dvh",background:"#0b0d0f"}}>
    <canvas ref={ref} style={{display:"block",width:"100%",height:"100%"}}/>
    <style jsx global>{`::selection { background:#1f2933; color:#8ae9ff; }`}</style>
  </div>;
}
