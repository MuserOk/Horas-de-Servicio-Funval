import React from 'react'

// src/components/ServicesSection.jsx
import { useState, useEffect } from "react";
import api from "../../api/axiosConfig" ; // Importa la instancia configurada de axios

function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [reviewData, setReviewData] = useState({
    amount_approved: 0,
    comment: "",
    status: "2", // Por defecto, estado para "Rechazado"
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.get("/services"); // Usa la instancia 'api'
      setServices(response.data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
      alert("Error al cargar los servicios");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch(`/review/${selectedService.id}`, reviewData); // Usa la instancia 'api'
      alert("Servicio revisado exitosamente");
      setShowReviewModal(false);
      setReviewData({ amount_approved: 0, comment: "", status: "2" });
      fetchServices(); // Refresca la lista de servicios
    } catch (error) {
      console.error("Error:", error);
      alert("Error al revisar el servicio");
    } finally {
      setLoading(false);
    }
  };

  const loadEvidence = async (serviceId) => {
    setLoading(true);
    try {
      const response = await api.get(`/evidence/${serviceId}`); // Usa la instancia 'api'
      setEvidence(response.data);
      setShowEvidenceModal(true);
    } catch (error) {
      console.error("Error al cargar evidencias:", error);
      alert("Error al cargar las evidencias");
    } finally {
      setLoading(false);
    }
  };

  const openReviewModal = (service) => {
    setSelectedService(service);
    // Inicializa reviewData con valores del servicio si es necesario, o déjalos por defecto
    setReviewData({
      amount_approved: service.amount_approved || 0, // Si ya hay datos de revisión
      comment: service.comment || "",
      status: service.status || "2",
    });
    setShowReviewModal(true);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      1: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
      2: { label: "Rechazado", color: "bg-red-100 text-red-800" },
      3: { label: "Aprobado", color: "bg-green-100 text-green-800" },
    };
    const statusInfo = statusMap[status] || { label: "Desconocido", color: "bg-gray-100 text-gray-800" };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>{statusInfo.label}</span>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Gestión de Servicios</h2>
      </div>

      {loading && !showReviewModal && !showEvidenceModal ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horas Solicitadas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.student_name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.hours || service.amount || 0} {/* Ajusta según el campo correcto */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(service.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-3">
                      <button
                        onClick={() => loadEvidence(service.id)}
                        className="text-purple-400 hover:text-purple-600 font-medium"
                      >
                        Ver Evidencias
                      </button>
                      <button
                        onClick={() => openReviewModal(service)}
                        className="text-blue-400 hover:text-blue-600 font-medium"
                      >
                        Revisar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Revisar Servicio #{selectedService?.id}</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Horas Aprobadas</label>
                <input
                  type="number"
                  value={reviewData.amount_approved}
                  onChange={(e) => setReviewData({ ...reviewData, amount_approved: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comentario</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  value={reviewData.status}
                  onChange={(e) => setReviewData({ ...reviewData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2">Rechazado</option>
                  <option value="3">Aprobado</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Guardando..." : "Guardar Revisión"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Evidence Modal */}
      {showEvidenceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Evidencias del Servicio</h3>
            {evidence ? (
              <div className="space-y-4">
                {Array.isArray(evidence) ? (
                  evidence.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600">{JSON.stringify(item)}</p>
                    </div>
                  ))
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">{JSON.stringify(evidence, null, 2)}</pre>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No hay evidencias disponibles</p>
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowEvidenceModal(false);
                  setEvidence(null);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesSection;
