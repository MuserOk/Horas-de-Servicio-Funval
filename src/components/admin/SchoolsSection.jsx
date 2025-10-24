import React from 'react'

// src/components/SchoolsSection.jsx
import { useState, useEffect } from "react";
import api from "../../api/axiosConfig" ; // Importa la instancia configurada de axios

function SchoolsSection() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const response = await api.get("/schools/"); // Usa la instancia 'api'
      setSchools(response.data);
    } catch (error) {
      console.error("Error al cargar escuelas:", error);
      alert("Error al cargar las escuelas");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingSchool) {
        await api.put(`/schools/${editingSchool.id}`, formData); // Usa la instancia 'api'
        alert("Escuela actualizada exitosamente");
      } else {
        await api.post("/schools", formData); // Usa la instancia 'api'
        alert("Escuela creada exitosamente");
      }
      setShowModal(false);
      setFormData({ name: "" });
      setEditingSchool(null);
      fetchSchools();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar la escuela");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (school) => {
    setEditingSchool(school);
    setFormData({ name: school.name });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingSchool(null);
    setFormData({ name: "" });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Gestión de Escuelas</h2>
        <button
          onClick={openCreateModal}
          className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          + Nueva Escuela
        </button>
      </div>

      {loading && !showModal ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-200"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-blue-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{school.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => openEditModal(school)}
                      className="text-blue-400 hover:text-blue-600 font-medium"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{editingSchool ? "Editar Escuela" : "Nueva Escuela"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SchoolsSection;
