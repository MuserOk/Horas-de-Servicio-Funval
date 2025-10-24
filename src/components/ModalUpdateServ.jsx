import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig"; // Asegúrate de tener tu configuración de Axios
// Recuerda pasar `service` y `onUpdated` como props desde tu tabla

export default function ModalServiceUpdate({
  isOpen,
  onClose,
  service,
  onUpdated,
}) {
  const [formData, setFormData] = useState({
    cantidad: "",
    descripcion: "",
    categoriaId: "",
  });

  // Bloquear scroll mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // Cargar datos del servicio seleccionado en el formulario
  useEffect(() => {
    if (service) {
      setFormData({
        cantidad: service.amount_reported || "",
        descripcion: service.description || "",
        categoriaId: service.category?.id || "",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para enviar PATCH a la API
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!service?.id) return;

    try {
      const response = await api.patch(`/services/${service.id}`, {
        amount_reported: formData.cantidad,
        description: formData.descripcion,
        category_id: formData.categoriaId,
      });

      // Llamar callback para actualizar la tabla en el padre
      if (onUpdated) onUpdated(response.data);

      onClose();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el servicio.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-sm p-6 rounded-lg relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Actualizar Horas de Servicio
        </h2>

        {/* Scroll interno */}
        <div className="grow overflow-auto">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            {/* Cantidad reportada */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Cantidad de horas reportadas
              </label>
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400"
                placeholder="Ej: 5"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <input
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-400"
                placeholder="Ej: Revisión de registros familiares"
                required
              />
            </div>

            {/* Selector de categoría */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Categoría
              </label>
              <select
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                required
              >
                <option value="">Selecciona una categoría...</option>
                <option value="1">
                  Templo e Historia familiar, Indexacion
                </option>
                <option value="2">Instructor</option>
                <option value="3">Liderazgo</option>
                <option value="4">Revisión</option>
                <option value="5">Asistencia al templo</option>
                <option value="13">Templo</option>
                <option value="15">Categoría</option>
              </select>
            </div>

            {/* Botón de enviar */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded transform transition duration-200 ease-in-out active:scale-95"
            >
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
