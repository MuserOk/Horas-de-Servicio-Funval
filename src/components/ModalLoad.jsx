import React, { useState, useEffect } from "react";
import ModalUpdateServ from "./ModalUpdateServ";
import api from "../api/axiosConfig"; // tu configuración de Axios

export default function ModalLoad({ isOpen, onClose }) {
  const [services, setServices] = useState([]); // estado para los servicios reales
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedService, setSelectedService] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Bloquear scroll mientras el modal está abierto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // 🔹 Función para cargar los servicios desde la API
  const cargarServicios = async () => {
    try {
      const respuesta = await api.get("/services");
      setServices(respuesta.data); // guardar la respuesta
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los servicios");
      setLoading(false);
    }
  };

  // 🔹 Ejecutar la carga cuando se abra el modal
  useEffect(() => {
    if (isOpen) {
      cargarServicios();
    }
  }, [isOpen]);

  // 🔹 Función para formatear fechas con hora
  const formatFechaHora = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-lg max-w-full max-h-[90vh] w-full
                      sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 flex flex-col overflow-hidden relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 text-3xl font-bold hover:text-gray-800 transition z-10"
        >
          &times;
        </button>

        <div className="p-6 flex flex-col grow overflow-hidden">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
            Estado de mis Horas de Servicio
          </h2>

          <div className="grow overflow-auto lg:max-h-[400px]">
            <div className="min-w-[900px] overflow-x-auto">
              {loading ? (
                <p className="text-center">Cargando servicios...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : (
                <table className="w-full border border-gray-300 text-sm text-center table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2">ID</th>
                      <th className="border px-3 py-2">Amount Reported</th>
                      <th className="border px-3 py-2">Amount Approved</th>
                      <th className="border px-3 py-2">Status</th>
                      <th className="border px-3 py-2">Evidence</th>
                      <th className="border px-3 py-2">Description</th>
                      <th className="border px-3 py-2 min-w-[140px]">
                        Created At
                      </th>
                      <th className="border px-3 py-2 min-w-[140px]">
                        Updated At
                      </th>
                      <th className="border px-3 py-2">Category</th>
                      <th className="border px-3 py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border px-3 py-2">{item.id}</td>
                        <td className="border px-3 py-2">
                          {item.amount_reported}
                        </td>
                        <td className="border px-3 py-2">
                          {item.amount_approved}
                        </td>
                        <td className="border px-3 py-2">{item.status}</td>
                        <td className="border px-3 py-2">{item.evidence}</td>
                        <td className="border px-3 py-2">{item.description}</td>
                        <td className="border px-3 py-2 min-w-[140px]">
                          {formatFechaHora(item.created_at)}
                        </td>
                        <td className="border px-3 py-2 min-w-[140px]">
                          {formatFechaHora(item.updated_at)}
                        </td>
                        <td className="border px-3 py-2">
                          {item.category?.name}
                        </td>
                        <td className="border px-3 py-2">
                          <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                            onClick={() => {
                              setSelectedService(item);
                              setShowUpdateModal(true);
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded font-semibold transition transform active:scale-95"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {selectedService && (
        <ModalUpdateServ
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          service={selectedService}
        />
      )}
    </div>
  );
}
