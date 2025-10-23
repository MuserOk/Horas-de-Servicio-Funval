import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  // Función para cerrar modal al hacer clic fuera
  const handleCloseOutside = () => {
    if (onClose) onClose(); // avisa al padre que cierre el modal
  };

  // Detiene la propagación del clic dentro del modal
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* setMsg(null); */

    try {
      await login(email, password);
      /* setMsg("✅Sesión iniciada correctamente"); */

      // Cerrar modal y redirigir
      if (onClose) onClose();
      navigate("/Home");
    } catch (err) {
      console.error(err);
      setMsg("Credenciales inválidas o error en el servidor");
    }
  };

  if (!isOpen) return null;

  return (
    // Fondo oscuro (clic fuera)
    <div
      onClick={handleCloseOutside}
      className="fixed inset-0 flex justify-center items-center bg-black/90 bg-opacity-50 z-50"
    >
      {/* Contenedor del modal (bloque principal) */}
      <div
        onClick={stopPropagation} // evita que cierre al hacer clic dentro
        className="p-8 border border-gray-800 rounded-md bg-white dark:bg-gray-900 w-80 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800 dark:text-blue-300">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <input
              type="email"
              className="w-full p-2 pl-10 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              type="password"
              className="w-full p-2 pl-10 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 mt-2"
          >
            Entrar
          </button>
        </form>

{/*         {msg && (
          <p
            className={`mt-4 text-center ${
              msg.startsWith("✅") ? "text-green-500" : "text-red-500"
            }`}
          >
            {msg}
          </p>
        )} */}

        <div className="mt-4 text-center">
          <a href="#" className="text-xs mr-4 text-blue-500 no-underline">
            Olvidé mi contraseña
          </a>
          <a href="#" className="text-xs text-blue-500 no-underline">
            Contactar Funval
          </a>
        </div>
      </div>
    </div>
  );
}
