import React from "react";
import ServiceCarousel from "../components/servicecarousel";

export default function HorasDeServicio() {
  return (
    <div className="py-8">
      <ServiceCarousel />
      <h1 className="text-2xl font-bold text-center mb-8 mt-8">
        Horas de Servicio
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-12">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="bg-gray-300 dark:bg-gray-600 h-48 w-full"></div>
          <div className="p-6 flex flex-col grow">
            <h2 className="text-xl font-bold mb-2 text-center dark:text-white">
              Reportar horas de servicio
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-base mb-4">
              Reporta todas tus horas de servicio, añade una descripción de tu
              servicio y subir tus fotos.
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-auto">
              Reportar horas
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="bg-gray-300 dark:bg-gray-600 h-48 w-full"></div>
          <div className="p-6 flex flex-col grow">
            <h2 className="text-xl font-bold mb-2 text-center dark:text-white">
              Estado de mis horas de servicio
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-base mb-4">
              Revisa el estado de la revisión de tus horas de servicio.
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-auto">
              Revisar el estado de mis horas
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="bg-gray-300 dark:bg-gray-600 h-48 w-full"></div>
          <div className="p-6 flex flex-col grow">
            <h2 className="text-xl font-bold mb-2 text-center dark:text-white">
              Actualizar reporte de horas de servicio
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-base mb-4">
              Si necesitas actualizar una carga de horas de servicio y no ahn
              sido o aprovadas o rechazadas. Puedes actualizar la informacióm
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-auto">
              Actualizar reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
