import React, { useState } from "react";
import api from "../api/axiosConfig";

export default function LogoutModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogout = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/logout", { email, password });
      console.log("✅ Logout exitoso:", res.data);
      localStorage.removeItem("hs_token");
      onClose(true);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <div className="bg-white flex flex-col justify-center dark:bg-gray-800 p-6 rounded-xl w-80 md:w-[40%] md:h-[60%]">
        <h2 className="text-lg font-bold text-center mb-4 text-gray-900 dark:text-white md:text-3xl md:py-8">Confirmar Cierre de Sesión</h2>
        <form onSubmit={handleLogout} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Correo"
            className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="dark:bg-red-800 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 dark:hover:bg-red-700 dark:active:bg-red-600 rounded py-2 mt-2 text-white"
          >
            {loading ? "Cerrando..." : "Cerrar Sesión"}
          </button>
          <button
            type="button"
            onClick={() => onClose(false)}
            className="mt-2 text-2xl text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            Cancelar
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
