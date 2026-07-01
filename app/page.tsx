import { HeroCanvas } from "@/components/hero-canvas";
import { SiteHeader } from "@/components/site-header";

const architectureAreas = [
  {
    code: "01",
    name: "ArcOS",
    type: "System foundation",
    status: "Working architecture",
    description:
      "The structural layer for vocabularies, records, relationships, workflows, and governance across the platform.",
  },
  {
    code: "02",
    name: "Culinary Intelligence",
    type: "Analytical capability",
    status: "In development",
    description:
      "A family of systems for interpreting ingredients, techniques, recipes, sensory relationships, and professional culinary decisions.",
  },
  {
    code: "03",
    name: "Culinary Archaeology",
    type: "Research domain",
    status: "Active research",
    description:
      "Historical and cultural research into how dishes, techniques, ingredients, and culinary ideas evolve across time and place.",
  },
  {
    code: "04",
    name: "ArchSense",
    type: "Sensory research",
    status: "Exploratory",
    description:
      "A developing sensory language for describing how taste, aroma, texture, contrast, and substitution behave as structured relationships.",
  },
];

const researchThemes = [
  {
    kind: "Research note",
    title: "Culinary knowledge as structured intelligence",
    summary:
      "A framework for moving beyond isolated recipe records toward connected culinary meaning.",
    state: "In preparation",
  },
  {
    kind: "Method note",
    title: "From ingredients to technique relationships",
    summary:
      "How provenance, transformation, and professional context can shape a richer culinary record.",
    state: "In preparation",
  },
  {
    kind: "Research direction",
    title: "Toward a computational language of sensory contrast",
    summary:
      "An early exploration of vocabulary, confidence, and validation for sensory intelligence.",
    state: "Exploratory",
  },
];

const roadmap = [
  {
    label: "Now",
    title: "Define the architecture",
    items: [
      "Validate the four-area model",
      "Establish public research standards",
      "Build the first evidence-led website layer",
    ],
  },
  {
    label: "Next",
    title: "Publish working knowledge",
    items: [
      "Release foundational research notes",
      "Introduce sample structured records",
      "Test one public capability with expert users",
    ],
  },
  {
    label: "Later",
    title: "Open the platform carefully",
    items: [
      "Knowledge and dataset exploration",
      "Authenticated professional workspaces",
      "Documented integration boundaries",
    ],
  },
];

function StatusPill({ children }: { children: React.ReactNode }) {
  return <span className="status-pill">{children}</span>;
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="site-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Culinary intelligence architecture</p>
              <h1 id="hero-title">
                A system. A structure. <em>A new language of taste.</em>
              </h1>
              <p className="hero-summary">
                CulinArchAI is a research-led platform for structuring culinary
                knowledge, ingredients, techniques, culture, sensory relationships,
                and professional decision-making.
              </p>
              <div className="hero-actions" aria-label="Hero actions">
                <a className="button button-primary" href="#architecture">
                  Explore the architecture
                </a>
                <a className="button button-quiet" href="#research">
                  View research direction
                </a>
              </div>
              <dl className="hero-metadata" aria-label="Platform status">
                <div>
                  <dt>Current phase</dt>
                  <dd>Research &amp; architecture</dd>
                </div>
                <div>
                  <dt>Public posture</dt>
                  <dd>Evidence before claims</dd>
                </div>
              </dl>
            </div>
            <HeroCanvas />
          </div>
        </section>

        <section className="principle-band" aria-label="Core principle">
          <div className="site-shell principle-band-inner">
            <p>Not a recipe archive.</p>
            <p>Not an AI wrapper.</p>
            <p>A structured culinary intelligence system.</p>
          </div>
        </section>

        <section className="section problem-section" id="platform" aria-labelledby="problem-title">
          <div className="site-shell split-layout">
            <div>
              <p className="eyebrow">The problem</p>
              <h2 id="problem-title">Culinary knowledge is vast. Its structure is fragmented.</h2>
            </div>
            <div className="prose-stack">
              <p>
                Recipes preserve outcomes, but they rarely capture the full structure
                behind them: technique, transformation, provenance, sensory intent,
                operational context, and cultural lineage.
              </p>
              <p>
                CulinArchAI is being built to connect those layers without reducing
                cuisine to a list of ingredients or treating AI as an authority above
                culinary craft.
              </p>
            </div>
          </div>

          <div className="site-shell signal-grid" aria-label="Knowledge gaps">
            <article>
              <span className="signal-index">01</span>
              <h3>Records without relationships</h3>
              <p>Large collections become useful only when entities, sources, and transformations can be connected.</p>
            </article>
            <article>
              <span className="signal-index">02</span>
              <h3>Technique without context</h3>
              <p>Professional culinary logic depends on why, when, and under which constraints a technique is used.</p>
            </article>
            <article>
              <span className="signal-index">03</span>
              <h3>Taste without language</h3>
              <p>Sensory decisions need richer vocabularies, confidence, and evidence—not vague claims of machine creativity.</p>
            </article>
          </div>
        </section>

        <section className="section architecture-section" id="architecture" aria-labelledby="architecture-title">
          <div className="site-shell section-heading-row">
            <div>
              <p className="eyebrow">Working architecture</p>
              <h2 id="architecture-title">Four areas. One connected system.</h2>
            </div>
            <p>
              The model below is a public working structure. Definitions and maturity
              states will evolve as research, product boundaries, and evidence become clearer.
            </p>
          </div>

          <div className="site-shell architecture-map">
            <div className="architecture-foundation">
              <div>
                <span className="architecture-code">01 / Foundation</span>
                <h3>ArcOS</h3>
              </div>
              <p>Structures the shared language, records, workflows, and rules beneath the platform.</p>
              <StatusPill>Working architecture</StatusPill>
            </div>

            <div className="architecture-connector" aria-hidden="true">
              <span />
            </div>

            <div className="architecture-network">
              {architectureAreas.slice(1).map((area) => (
                <article key={area.name} className={area.name === "Culinary Intelligence" ? "architecture-node architecture-node-primary" : "architecture-node"}>
                  <div className="architecture-node-meta">
                    <span>{area.code}</span>
                    <StatusPill>{area.status}</StatusPill>
                  </div>
                  <p className="architecture-type">{area.type}</p>
                  <h3>{area.name}</h3>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>

            <p className="architecture-note">
              Culinary Archaeology and ArchSense enrich the analytical layer with cultural,
              historical, and sensory context. They are not decorative sub-brands or equal product cards.
            </p>
          </div>
        </section>

        <section className="section capability-section" aria-labelledby="capability-title">
          <div className="site-shell split-layout">
            <div>
              <p className="eyebrow">Capability direction</p>
              <h2 id="capability-title">From isolated records to explainable relationships.</h2>
            </div>
            <div className="prose-stack">
              <p>
                The long-term platform is intended to support research, comparison,
                classification, provenance, sensory mapping, and professional decision support.
              </p>
              <p className="muted-copy">
                These are capability directions—not a claim that every function is publicly available today.
              </p>
            </div>
          </div>

          <div className="site-shell capability-list">
            {["Structured culinary records", "Technique and transformation mapping", "Ingredient relationship analysis", "Historical and cultural provenance", "Sensory vocabulary and contrast", "Future expert decision support"].map((item, index) => (
              <div key={item} className="capability-row">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
                <StatusPill>{index < 2 ? "Foundational research" : "Future capability"}</StatusPill>
              </div>
            ))}
          </div>
        </section>

        <section className="section evidence-section" aria-labelledby="evidence-title">
          <div className="site-shell evidence-layout">
            <div className="evidence-intro">
              <p className="eyebrow">Evidence model</p>
              <h2 id="evidence-title">Research before claims.</h2>
              <p>
                Authority should come from transparent methods, sources, limitations,
                versioned records, and real expert review—not from scale language or visual spectacle.
              </p>
            </div>
            <div className="evidence-grid">
              <article>
                <span className="evidence-label">Methodology</span>
                <h3>Explain how the system knows.</h3>
                <p>Define source hierarchy, taxonomy governance, confidence, and update policy.</p>
              </article>
              <article>
                <span className="evidence-label">Provenance</span>
                <h3>Keep every record traceable.</h3>
                <p>Attach origin, attribution, rights, transformations, and revision history.</p>
              </article>
              <article>
                <span className="evidence-label">Maturity</span>
                <h3>Separate live, research, and future.</h3>
                <p>Make product state visible so ambition never becomes unsupported marketing.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section research-section" id="research" aria-labelledby="research-title">
          <div className="site-shell section-heading-row">
            <div>
              <p className="eyebrow">Research programme</p>
              <h2 id="research-title">Initial publication themes.</h2>
            </div>
            <p>
              The public research layer will be developed as a durable, sourced record—not a continuous food-media feed.
            </p>
          </div>

          <div className="site-shell research-grid">
            {researchThemes.map((item, index) => (
              <article key={item.title}>
                <div className="research-meta">
                  <span>{item.kind}</span>
                  <span>{item.state}</span>
                </div>
                <span className="research-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
          <div className="site-shell split-layout">
            <div>
              <p className="eyebrow">Development posture</p>
              <h2 id="roadmap-title">A platform built in visible phases.</h2>
            </div>
            <p className="roadmap-intro">
              Public language should remain aligned with actual evidence. Dates and access commitments will only be added when dependencies are understood.
            </p>
          </div>

          <div className="site-shell roadmap-grid">
            {roadmap.map((phase) => (
              <article key={phase.label}>
                <span className="roadmap-label">{phase.label}</span>
                <h3>{phase.title}</h3>
                <ul>
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="partnership-section" id="partnerships" aria-labelledby="partnership-title">
          <div className="site-shell partnership-inner">
            <div>
              <p className="eyebrow eyebrow-light">Partnerships</p>
              <h2 id="partnership-title">For serious culinary, research, and institutional conversations.</h2>
            </div>
            <div>
              <p>
                CulinArchAI is currently defining its architecture, evidence standards,
                and first public research layer. Partnership pathways will remain selective and specific.
              </p>
              <a className="button button-light" href="mailto:hello@culinarch.ai">
                Start a conversation
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-shell footer-grid">
          <div>
            <a className="brand footer-brand" href="#top" aria-label="CulinArchAI home">
              <span className="brand-mark" aria-hidden="true">C</span>
              <span className="brand-name">CulinArchAI</span>
            </a>
            <p>A system. A structure. A new language of taste.</p>
          </div>
          <div className="footer-links">
            <a href="#platform">Platform</a>
            <a href="#architecture">Architecture</a>
            <a href="#research">Research</a>
            <a href="#roadmap">Roadmap</a>
          </div>
          <p className="footer-note">
            Working public foundation. Capability definitions, evidence, and access are still under development.
          </p>
        </div>
      </footer>
    </>
  );
}
