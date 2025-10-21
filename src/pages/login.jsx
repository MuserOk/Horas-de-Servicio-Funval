import React from "react";

export default function Login() {

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 border border-gray-400 rounded-md ">
        <h2 className="text-2xl font-bold text-center text-blue-800">
          Iniciar Sesión
        </h2>
        <form>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 pl-10 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Usuario"
            />
          </div>
          <div className="relative active:border-blue-500">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3..org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </span>
            <input
              type="password"
              className="w-full p-2 pl-10 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Entrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="mr-4 text-blue-500 no-underline">
            Olvidé mi contraseña
          </a>
          <a href="#" className="text-blue-500 no-underline">
            Contactar Funval
          </a>
        </div>
      </div>
    </div>
  );
}
