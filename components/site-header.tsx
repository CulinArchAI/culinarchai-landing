const navItems = [
  { href: "#platform", label: "Platform" },
  { href: "#architecture", label: "Architecture" },
  { href: "#research", label: "Research" },
  { href: "#roadmap", label: "Roadmap" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <a className="brand" href="#top" aria-label="CulinArchAI home">
          <span className="brand-mark" aria-hidden="true">
            C
          </span>
          <span className="brand-name">CulinArchAI</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#partnerships">
          Partnerships
        </a>

        <details className="mobile-nav">
          <summary aria-label="Open navigation">
            <span>Menu</span>
            <span className="menu-icon" aria-hidden="true" />
          </summary>
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="#partnerships">Partnerships</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
