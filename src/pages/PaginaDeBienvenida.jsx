import React, { useState } from "react";

import { useAuth } from "../auth/AuthContext";
import LoginModal from "../auth/Login"; // ⬅ si ya lo tienes

export default function PaginaDeBienvenida() {

  const [showModal, setShowModal] = useState(false); // controla visibilidad

  return (
    <div className="flex flex-col items-center justify-center w-full text-center p-4">
      <h1 className="text-4xl font-bold text-blue-500 dark:text-blue-300 mb-6 md:text-6xl">
        Bienvenido a Horas de Servicio
      </h1>

      <p className="text-[#018686] dark:text-gray-200 mb-8 max-w-md sm:text-2xl md:text-3xl md:font-medium">
        Administra tus horas de servicio y registra tus actividades fácilmente.
      </p>

      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}
