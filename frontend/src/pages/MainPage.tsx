import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-5xl font-bold mb-6">Bienvenido a SmartKanban</h1>
      <p className="text-xl mb-6 text-center max-w-md">
        Organiza tus proyectos, tableros y tareas de manera simple y eficiente.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-500 font-bold px-6 py-3 rounded shadow hover:shadow-lg transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-white text-purple-500 font-bold px-6 py-3 rounded shadow hover:shadow-lg transition"
        >
          Registro
        </Link>
      </div>
    </div>
  );
}
