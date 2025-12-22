import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FormContainer from "../components/FormContainer";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/register", { username, email, password });
      alert("Registro exitoso, ahora inicia sesión");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error al registrarse");
    }
  };

  return (
    <FormContainer title="Registro">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded font-semibold transition">
          Registrarse
        </button>
      </form>
      <p className="mt-4 text-center text-gray-500">
        Ya tienes cuenta? <Link to="/login" className="text-purple-500 hover:underline">Login</Link>
      </p>
    </FormContainer>
  );
}
