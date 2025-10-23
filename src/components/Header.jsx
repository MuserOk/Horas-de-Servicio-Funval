import { Link } from "react-router-dom";
import React from "react";
import MenuH from "./MenuH";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "General", path: "/General" },
  { label: "Horas de Servicio", path: "/HorasDeServicio" },
  { label: "La Brújula", path: "/LaBrujula" },
];

export default function Header({ logIn, setLogIn }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!logIn) {
      navigate("/login");
      setLogIn(!logIn);
    } else {
      setLogIn(false);
      navigate("/");
    }
  };

  return (
    <div className="w-full dark:bg-[#153862] flex justify-between items-center px-4 sm:px-5 dark:md:px-6 dark:lg:px-10 shadow-sm min-h-[80px]">
      {/* Contenedor principal: aseguramos que los elementos estén distribuidos correctamente */}
      <div className="flex items-center w-full justify-between lg:justify-between">
        {/* Menú hamburguesa (solo en móvil/tablet) */}
        <div className="md:hidden flex items-center">
          <MenuH />
        </div>

        {/* Logo (centrado en pantallas pequeñas, a la izquierda en pantallas grandes) */}
        <div className="flex items-center justify-center lg:justify-start lg:w-auto">
          <img
            className="block dark:hidden h-14"
            src="/images/funval-img-light.png"
            alt="logo funval"
          />
          <img
            className="hidden dark:block h-14"
            src="/images/funval-img-dark.jpg"
            alt="logo funval"
          />
        </div>

        {/* Menú de navegación centrado (en pantallas grandes) */}
        <div className="hidden lg:flex items-center justify-center ">
          <ul className="flex space-x-6 text-white font-semibold">
            {menuItems.map((item) => (
              <li className="hover:animate-pulse" key={item.label}>
                <Link
                  to={item.path}
                  className="text-black dark:text-white hover:text-blue-300 transition duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón de login */}
        <div onClick={handleClick} className="cursor-pointer">
          {!logIn ? (
            <p className="text-blue-800 font-medium text-center md:text-lg hover:text-blue-400 active:text-blue-950 dark:text-white">
              Iniciar Sesión
            </p>
          ) : (
            <div className="text-center">
              <p className="text-blue-800 font-medium text-center md:text-lg hover:text-blue-400 active:text-blue-950 dark:text-white">
                Cerrar Sesión
              </p>
              <p className="text-xs lg:text-md font-medium animate-pulse text-center dark:text-white dark:font-bold">
                Pepito Juanito
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
