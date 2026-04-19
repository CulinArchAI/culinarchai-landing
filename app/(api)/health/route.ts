import { NextResponse } from "next/server";

export function GET() {
  try {
    return NextResponse.json(
      { ok: true, ts: new Date().toISOString(), service: "culinarchai" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
