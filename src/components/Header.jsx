import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MenuH from "./MenuH";
import { useAuth } from "../auth/AuthContext";
import LogoutModal from "./LogoutModal";
import LoginModal from "../auth/Login"; // (?)

const menuItems = [
  { label: "Home", path: "/" },
  { label: "General", path: "/General" },
  { label: "Horas de Servicio", path: "/HorasDeServicio" },
  { label: "La Brújula", path: "/LaBrujula" }, 
  { label: "ADM", path: "/admin" }, 
];

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <div className="w-full bg-blue-400 bg-[url(/images/international-removebg-preview.png)] bg-no-repeat bg-cover dark:bg-[#153862] flex justify-between items-center px-4 sm:px-5 dark:md:px-6 dark:lg:px-10 shadow-sm py-4">
        <div className=" md:order-1 md:inline-flex md:items-center">
          <MenuH />
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 text-white font-semibold">
              {menuItems.map((item) => (
                <li className="hover:animate-pulse lg:text-xl" key={item.label}>
                  {item.path ? (
                    <Link
                      to={item.path}
                      className=" text-white dark:text-white hover:text-gray-100 transition duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : item.scrollToId ? (
                    <button
                      onClick={() => {
                        const el = document.getElementById(item.scrollToId);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-gray-900 dark:text-white hover:text-blue-300 transition duration-200">
                      {item.label}
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
          <img className="md:order-0 h-12 lg:h-14" src="/images/funval-img-dark.png" alt="logo funval" />
        <div
          onClick={() => {
            if (user) setShowLogoutModal(true);
            else setShowLoginModal(true);
          }}
          className="md:order-2 bg-white dark:bg-gray-500  py-1 px-2 rounded cursor-pointer text-blue-400 font-medium text-center md:text-lg hover:text-blue-400 active:text-blue-950 dark:text-white"
        >
          {!user ? (
            "Iniciar Sesión"

          ) : (
            <div className="text-center">
              <p className="text-blue-400  bg-white dark:bg-gray-500 py-1 px-2 rounded font-medium text-center md:text-lg hover:text-blue-400 active:text-blue-950 dark:text-white">
                Cerrar Sesión
              </p>
              <p className="text-xs lg:text-md font-medium animate-pulse text-center dark:text-white dark:font-bold">
              </p>
            </div>
          )}
        </div>

      </div >

      < LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={async (loggedOut) => {
          setShowLogoutModal(false);
          if (loggedOut) {
            await logout(); // limpia sesión global
            navigate("/");
          }
        }}
      />
    </>
  );
}
