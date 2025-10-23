import React, { useState, useRef } from "react";

export default function ModalService({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    cantidad: "",
    descripcion: "",
    categoriaId: "",
    evidencia: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white/95 w-11/12 max-w-sm p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Reportar Horas de Servicio
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Cantidad reportada */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Cantidad reportada
            </label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Ej: 3"
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
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Test reporte Horas de servicio"
              required
            />
          </div>

          {/* ID de categoría */}
          <div>
            <label className="block text-sm font-medium mb-1">
              ID de Categoría
            </label>
            <input
              type="number"
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Ej: 1"
              required
            />
          </div>

          {/* Evidencia */}
          <div>
            <label className="block text-sm font-medium mb-1">Evidencia</label>
            <button
              type="button"
              className="w-full bg-gray-200 border border-gray-400 rounded px-3 py-2 text-left transform transition duration-200 ease-in-out active:scale-105"
              onClick={() => fileInputRef.current.click()}
            >
              {formData.evidencia
                ? formData.evidencia.name
                : "Seleccionar archivo..."}
            </button>
            <input
              type="file"
              name="evidencia"
              ref={fileInputRef}
              onChange={handleChange}
              className="hidden"
              accept="image/*,.pdf"
              required
            />
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded transform transition duration-200 ease-in-out active:scale-105"
          >
            Enviar formulario
          </button>
        </form>
      </div>
    </div>
  );
}
