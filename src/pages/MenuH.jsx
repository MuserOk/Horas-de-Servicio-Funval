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
    <div className="w-full h-20 bg-amber-500 relative">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-5 left-5 lg:hidden"
        aria-label="Abrir menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-black"
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
          className="fixed inset-0 z-50 bg-black/50 flex justify-start lg:hidden"
          onClick={handleCloseOutside} // Cierra al hacer clic fuera
        >
          <div
            className="bg-white w-full max-w-md rounded-b-lg shadow-lg p-6 mt-20 ml-5 mr-5 h-[32vh] overflow-visible relative border-3 border-black"
            onClick={stopPropagation} // Evita cierre si clic dentro del modal
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-1 right-1 hover:text-black text-xl"
            >
              <img
                src="/exit.png"
                alt="Cerrar"
                className="w-6 active:-scale-150"
              />
            </button>

            {/* Contenido */}
            <h2 className="text-3xl font-bold mb-4">Menú </h2>
            <ul className="space-y-2 text-lg">
              {[
                "Home",
                "General",
                "Horas de Servicio",
                "La Burjula",
                "Contactanos",
              ].map((block, index) => (
                <li
                  key={index}
                  onClick={handleBlockClick}
                  className="cursor-pointer hover:text-amber-600 active:text-blue-500"
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
