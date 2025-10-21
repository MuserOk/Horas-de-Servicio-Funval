import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de tener este import
import MenuH from "./MenuH"; // Tu componente MenuH

const menuItems = [
  { label: "Home", path: "/" },
  { label: "General", path: "/General" },
  { label: "Horas de Servicio", path: "/HorasDeServicio" },
  { label: "La Brújula", path: "/LaBrujula" },
];

export default function Header() {
  return (
    <div className="relative w-full dark:bg-[#153862] h-[15%] flex justify-between items-center px-2 dark:md:px-6 dark:lg:px-10 pt-4 shadow-sm pb-2 md:pb-0">
      {/* Wrapper para centrar en móvil/tablet, y alinear a la izquierda en lg */}
      <div className="flex justify-center w-full lg:justify-center lg:w-auto">
        {/* Contenedor inline-flex para que el grupo tenga ancho solo del contenido */}
        <div className="inline-flex items-center space-x-18">
          {/* Menú hamburguesa */}
          <MenuH />

          {/* Menú de navegación en escritorio (lg) */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6 text-white font-semibold">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-black hover:text-blue-300 transition duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo - Aseguramos que no se mueva */}
          <div className="flex items-center space-x-2 lg:-ml-16">
            <img
              className="block dark:hidden h-10 md:h-16 lg:h-18"
              src="/images/funval-img-light.png"
              alt="logo funval"
            />
            <img
              className="hidden dark:block h-10 md:h-16 lg:h-18"
              src="/images/funval-img-dark.jpg"
              alt="logo funval"
            />
          </div>
        </div>
      </div>

      {/* Sección de inicio de sesión */}
      <div>
        <p className="text-blue-800 font-medium text-center md:text-lg cursor-pointer hover:text-blue-400 active:text-blue-950 dark:text-white">
          Iniciar Sesión
        </p>
        <p className="text-xs lg:text-md font-medium animate-pulse text-center dark:text-white dark:font-bold">
          Pepito Juanito
        </p>
      </div>
    </div>
  );
}
