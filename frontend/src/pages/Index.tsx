import { Link } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontFamily: "system-ui, -apple-system, sans-serif",
  } as React.CSSProperties,
  nav: {
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 50,
  } as React.CSSProperties,
  navContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "16px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as React.CSSProperties,
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  } as React.CSSProperties,
  logo: {
    width: "32px",
    height: "32px",
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "18px",
  } as React.CSSProperties,
  brandText: {
    fontWeight: "600",
    color: "#111827",
    fontSize: "16px",
  } as React.CSSProperties,
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  } as React.CSSProperties,
  signInLink: {
    color: "#4b5563",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14px",
    cursor: "pointer",
    transition: "color 0.2s",
  } as React.CSSProperties,
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: "500",
    padding: "8px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "14px",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  hero: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,
  heroContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "80px 16px",
    width: "100%",
  } as React.CSSProperties,
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "48px",
    alignItems: "center",
  } as React.CSSProperties,
  gridLarge: {
    gridTemplateColumns: "1fr 1fr",
  } as React.CSSProperties,
  heroText: {
    space: "16px" as any,
  } as React.CSSProperties,
  h1: {
    fontSize: "56px",
    fontWeight: "bold",
    color: "#111827",
    lineHeight: "1.2",
    margin: 0,
    marginBottom: "16px",
  } as React.CSSProperties,
  paragraph: {
    fontSize: "18px",
    color: "#4b5563",
    lineHeight: "1.6",
    margin: 0,
    marginBottom: "16px",
  } as React.CSSProperties,
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "32px",
  } as React.CSSProperties,
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  } as React.CSSProperties,
  checkmark: {
    width: "20px",
    height: "20px",
    color: "#22c55e",
    flexShrink: 0,
  } as React.CSSProperties,
  featureText: {
    color: "#374151",
    fontSize: "16px",
  } as React.CSSProperties,
  ctaButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "32px",
  } as React.CSSProperties,
  ctaButtonsLarge: {
    flexDirection: "row" as any,
  } as React.CSSProperties,
  primaryCTA: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: "600",
    padding: "12px 32px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "16px",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  secondaryCTA: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
    fontWeight: "600",
    padding: "12px 32px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "16px",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  illustration: {
    display: "none",
  } as React.CSSProperties,
  illustrationLarge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  illustrationBox: {
    width: "100%",
    aspectRatio: "1",
    background: "linear-gradient(135deg, #eff6ff, #e0e7ff)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  illustrationInner: {
    width: "256px",
    height: "256px",
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
    borderRadius: "16px",
    opacity: 0.1,
  } as React.CSSProperties,
  footer: {
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  } as React.CSSProperties,
  footerContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "32px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: "16px",
  } as React.CSSProperties,
  footerContentLarge: {
    flexDirection: "row" as any,
  } as React.CSSProperties,
  footerBrand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  } as React.CSSProperties,
  footerLogo: {
    width: "24px",
    height: "24px",
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "12px",
  } as React.CSSProperties,
  footerBrandText: {
    fontWeight: "600",
    color: "#111827",
    fontSize: "14px",
  } as React.CSSProperties,
  footerCopyright: {
    fontSize: "14px",
    color: "#4b5563",
  } as React.CSSProperties,
};

export default function Index() {
  return (
    <div style={styles.container}>
      {/* Navigation Header */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.brand}>
            <div style={styles.logo}>SK</div>
            <span style={styles.brandText}>SmartKanban</span>
          </div>
          <div style={styles.navLinks}>
            <Link to="/login" style={{ ...styles.signInLink, color: "#4b5563" }}>
              Entra
            </Link>
            <Link to="/register" style={styles.primaryButton}>
              Registrate
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={{ ...styles.grid, gridTemplateColumns: window.innerWidth >= 1024 ? "1fr 1fr" : "1fr" }}>
            {/* Content */}
            <div>
              <div style={styles.heroText}>
                <h1 style={styles.h1}>
                  Maneja tus tareas de manera eficiente
                </h1>
                <p style={styles.paragraph}>
                  Organiza tu trabajo, colabora con tu equipo, y mantente productivo con la plataforma intuitiva de gestión de tareas SmartKanban.
                </p>
              </div>

              {/* Features */}
              <div style={styles.features}>
                <div style={styles.featureItem}>
                  <svg style={styles.checkmark} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span style={styles.featureText}>Organiza tareas en columnas visuales</span>
                </div>
                <div style={styles.featureItem}>
                  <svg style={styles.checkmark} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span style={styles.featureText}>Colaboración en tiempo real con tu equipo</span>
                </div>
                <div style={styles.featureItem}>
                  <svg style={styles.checkmark} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span style={styles.featureText}>Mantente organizado</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{ ...styles.ctaButtons, flexDirection: window.innerWidth >= 640 ? "row" : "column" }}>
                <Link to="/register" style={styles.primaryCTA}>
                  Registrate
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link to="/login" style={styles.secondaryCTA}>
                  Entra
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div style={{ ...styles.illustration, display: window.innerWidth >= 1024 ? "flex" : "none" }}>
              <div style={styles.illustrationBox}>
                <div style={styles.illustrationInner}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={{ ...styles.footerContent, flexDirection: window.innerWidth >= 640 ? "row" : "column" }}>
          <div style={styles.footerBrand}>
            <div style={styles.footerLogo}>SK</div>
            <span style={styles.footerBrandText}>SmartKanban</span>
          </div>
          <p style={styles.footerCopyright}>© 2026 SmartKanban. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
