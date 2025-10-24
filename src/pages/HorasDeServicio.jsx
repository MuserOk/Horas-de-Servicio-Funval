import React, { useState } from "react";
import ServiceCarousel from "../components/ServiceCarousel";
import ModalService from "../components/ModalService";
import ModalLoad from "../components/ModalLoad";

export default function HorasDeServicio() {
  const [showModal, setShowModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const servicioDemo = {
    id: 1,
    amount_reported: 3,
    amount_approved: 2,
    evidence: "foto_servicio.jpg",
    description: "Ayuda en centro de historia familiar",
    status: "Aprobado",
    created_at: "2025-10-01",
    updated_at: "2025-10-10",
    category: { id: 1, name: "Templo e Historia familiar, Indexación" },
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center mb-8 mt-8 dark:text-white md:text-5xl">
        Horas de Servicio
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-12">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="border-2 dark:bg-gray-600 h-48 w-full relative"></div>
          <div className="p-6 flex flex-col grow">
            <h2 className="text-xl font-bold mb-2 text-center dark:text-white">
              Reportar horas de servicio
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-base mb-4">
              Reporta todas tus horas de servicio, añade una descripción y sube
              tus archivos.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-auto"
            >
              Reportar horas
            </button>
          </div>
        </div>

        {/* Card 2 - Estado de mis horas */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="bg-gray-300 dark:bg-gray-600 h-48 w-full"></div>
          <div className="p-6 flex flex-col grow">
            <h2 className="text-xl font-bold mb-2 text-center dark:text-white">
              Estado de mis horas de servicio
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-base mb-4">
              Revisa el estado de la revisión de tus horas de servicio.
            </p>
            <button
              onClick={() => {
                setServicioSeleccionado(servicioDemo);
                setShowLoadModal(true);
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-auto"
            >
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
              Si necesitas actualizar un reporte que no ha sido aprobado o
              rechazado, puedes hacerlo aquí.
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-auto">
              Actualizar reporte
            </button>
          </div>
        </div>
      </div>

      {/* Modales */}
      <ModalService isOpen={showModal} onClose={() => setShowModal(false)} />

      <ModalLoad
        isOpen={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        servicio={servicioSeleccionado}
      />
    </div>
  );
}
