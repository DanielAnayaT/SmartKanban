import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FormContainer from "../components/FormContainer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard"); // ajusta según tu ruta
    } catch (err) {
      console.error(err);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <FormContainer title="Login">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-500">
        No tienes cuenta? <Link to="/register" className="text-blue-500 hover:underline">Regístrate</Link>
      </p>
    </FormContainer>
  );
}
