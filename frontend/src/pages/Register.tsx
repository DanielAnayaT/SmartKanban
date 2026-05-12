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
  input: {
    width: "100%",
    padding: "8px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "all 0.2s",
  } as React.CSSProperties,
  termsContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  } as React.CSSProperties,
  checkbox: {
    width: "16px",
    height: "16px",
    marginTop: "2px",
    cursor: "pointer",
  } as React.CSSProperties,
  termsLabel: {
    fontSize: "14px",
    color: "#4b5563",
  } as React.CSSProperties,
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
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

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/register", formData);
      console.log("Registration successful:", response.data);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error registering:", error);
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
            <span style={styles.navText}>Ya tienes una cuenta?</span>
            <Link to="/login" style={styles.primaryButton}>
              Inicia sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Registration Form */}
      <div style={styles.formContainer}>
        <div style={styles.formBox}>
          <div style={styles.formHeader}>
            <h1 style={styles.formTitle}>Crea tu cuenta</h1>
            <p style={styles.formSubtitle}>Únete a SmartKanban y comienza a gestionar tus tareas</p>
          </div>

          <form onSubmit={handleRegister} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="username" style={styles.label}>
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                style={styles.input}
                required
              />
            </div>

            

            <button
              type="submit"
              style={styles.submitButton}
            >
              Crear cuenta
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
