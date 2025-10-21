import React, { useState } from "react";

export default function MenuH() {
  const [open, setOpen] = useState(false);

  const handleBlockClick = () => {
    setOpen(false); // Cierra el modal al hacer clic en un bloque
  };

  // Función para cerrar modal si se hace clic fuera del contenido (fondo)
  const handleCloseOutside = (e) => {
    setOpen(false);
  };

  // Para evitar que el clic dentro del modal cierre el modal
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-2 left-2 lg:hidden"
        aria-label="Abrir menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16 text-black dark:text-white cursor-pointer hover:text-gray-400 active:text-gray-800"
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
          onClick={handleCloseOutside} // Cierra al hacer clic fuera
        >
          <div
            className="bg-blue-300/90 w-full max-w-xs rounded-b-lg shadow-[0px_1px_8px] p-6 mt-16  h-70 overflow-visible relative  border-t-0 border-r-1 border-b-1 border-l-1 border-white"
            onClick={stopPropagation} // Evita cierre si clic dentro del modal
          >
            {/* Botón cerrar */}
            <button onClick={() => setOpen(false)} className="absolute top-1 right-1 text-white font-bold hover:bg-gray-400 text-xl active:bg-gray-600 bg-gray-600/80 mt-4 mr-2 w-8 h-8 rounded flex justify-center items-center">
              X
            </button>

            {/* Contenido */}
            <h2 className="text-3xl font-bold mb-4 text-gray-100">Menú </h2>
            <ul className="space-y-2 text-lg font-bold text-gray-600">
              {[
                "Home",
                "General",
                "Horas de Servicio",
                "La Brújula",
                "Contáctos",
              ].map((block, index) => (
                <li
                  key={index}
                  onClick={handleBlockClick}
                  className="cursor-pointer hover:text-white active:text-gray-500 hover:bg-blue-900/30 px-4 rounded"
                >
                  {block}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
