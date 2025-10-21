import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuH() {
  const [open, setOpen] = useState(false);

  const handleBlockClick = () => {
    setOpen(false); // Cierra el modal al hacer clic en un bloque
  };

  const handleCloseOutside = () => {
    setOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Arreglo con rutas y etiquetas
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "General", path: "/General" },
    { label: "Horas de Servicio", path: "/HorasDeServicio" },
    { label: "La Brújula", path: "/LaBrujula" },
    { label: "Contáctos", path: "/contactos" }, // Asegúrate de crear esta ruta o quitarla
  ];

  return (
    <div>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 left-2 lg:hidden pt-2"
        aria-label="Abrir menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-black dark:text-white cursor-pointer hover:text-gray-400 active:text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex justify-start lg:hidden"
          onClick={handleCloseOutside}
        >
          <div
            className="bg-blue-300/90 w-full max-w-xs rounded-b-lg shadow-[0px_1px_8px] p-6 mt-16 h-70 overflow-visible relative border border-white"
            onClick={stopPropagation}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-1 right-1 text-white font-bold hover:bg-gray-400 text-xl active:bg-gray-600 bg-gray-600/80 mt-4 mr-2 w-8 h-8 rounded flex justify-center items-center"
            >
              X
            </button>

            {/* Contenido */}
            <h2 className="text-3xl font-bold mb-4 text-gray-100">Menú</h2>
            <ul className="space-y-2 text-lg font-bold text-gray-600">
              {menuItems.map(({ label, path }, index) => (
                <li
                  key={index}
                  className="hover:text-white active:text-gray-500 hover:bg-blue-900/30 px-4 rounded"
                >
                  <Link
                    to={path}
                    onClick={handleBlockClick}
                    className="block cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
