import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    opacity: 1,
    transition: "opacity 0.2s",
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
  content: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 16px",
  } as React.CSSProperties,
  contentBox: {
    textAlign: "center",
  } as React.CSSProperties,
  code: {
    fontSize: "96px",
    fontWeight: "bold",
    color: "#111827",
    margin: "0 0 16px 0",
  } as React.CSSProperties,
  title: {
    fontSize: "24px",
    color: "#4b5563",
    margin: "0 0 32px 0",
  } as React.CSSProperties,
  description: {
    color: "#4b5563",
    margin: "0 0 32px 0",
    maxWidth: "448px",
  } as React.CSSProperties,
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: "600",
    padding: "12px 32px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "16px",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  footer: {
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  } as React.CSSProperties,
  footerContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "32px 16px",
    textAlign: "center",
    fontSize: "14px",
    color: "#4b5563",
  } as React.CSSProperties,
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Error 404: El usuario intento acceder a:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div style={styles.container}>
      {/* Navigation Header */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <Link to="/" style={{ ...styles.brand, textDecoration: "none", color: "inherit" }}>
            <div style={styles.logo}>SK</div>
            <span style={styles.brandText}>SmartKanban</span>
          </Link>
        </div>
      </nav>

      {/* 404 Content */}
      <div style={styles.content}>
        <div style={styles.contentBox}>
          <h1 style={styles.code}>404</h1>
          <p style={styles.title}>Oops! Pagina no encontrada</p>
          <p style={styles.description}>
            La pagina que buscas no existe. Rectifiquemos esto.
          </p>
          <Link to="/" style={styles.button}>
            Regresa a la pagina principal
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          © 2026 SmartKanban. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
