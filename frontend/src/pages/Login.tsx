import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";

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
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  } as React.CSSProperties,
  navText: {
    color: "#4b5563",
    fontSize: "14px",
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
  formContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 16px",
  } as React.CSSProperties,
  formBox: {
    width: "100%",
    maxWidth: "448px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  } as React.CSSProperties,
  formHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  } as React.CSSProperties,
  formTitle: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#111827",
    margin: 0,
  } as React.CSSProperties,
  formSubtitle: {
    color: "#4b5563",
    fontSize: "14px",
    margin: 0,
  } as React.CSSProperties,
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  } as React.CSSProperties,
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  } as React.CSSProperties,
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#111827",
    display: "block",
  } as React.CSSProperties,
  labelWithLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } as React.CSSProperties,
  forgotLink: {
    fontSize: "14px",
    color: "#2563eb",
    textDecoration: "none",
    cursor: "pointer",
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "8px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "all 0.2s",
  } as React.CSSProperties,
  submitButton: {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: "600",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      console.log("Login successful, token stored:", token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation Header */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <Link to="/" style={{ ...styles.brand, textDecoration: "none", color: "inherit" }}>
            <div style={styles.logo}>SK</div>
            <span style={styles.brandText}>SmartKanban</span>
          </Link>
          <div style={styles.navLinks}>
            <span style={styles.navText}>No tienes una cuenta?</span>
            <Link to="/register" style={styles.primaryButton}>
              Registrate
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div style={styles.formContainer}>
        <div style={styles.formBox}>
          <div style={styles.formHeader}>
            <h1 style={styles.formTitle}>Bienvenido de nuevo</h1>
            <p style={styles.formSubtitle}>Inicia sesión en tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <div style={styles.labelWithLink}>
                <label htmlFor="password" style={styles.label}>
                  Contraseña
                </label>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                style={styles.input}
                required
              />
            </div>

            <button
              type="submit"
              style={styles.submitButton}
            >
              Entra
            </button>
          </form>
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
}
