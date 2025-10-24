import React from 'react'

// src/components/StudentsSection.jsx
import { useState, useEffect } from "react";
import api from "../../api/axiosConfig" ; // Importa la instancia configurada de axios

function StudentsSection() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await api.get("/students"); // Usa la instancia 'api'
      setStudents(response.data);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
      alert("Error al cargar los estudiantes");
    } finally {
      setLoading(false);
    }
  };

  const loadStudentDetail = async (studentId) => {
    setLoading(true);
    try {
      const response = await api.get(`/students/${studentId}`); // Usa la instancia 'api'
      setSelectedStudent(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Error al cargar detalle del estudiante:", error);
      alert("Error al cargar el detalle del estudiante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Gestión de Estudiantes</h2>
      </div>

      {loading && !showDetailModal ? (
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
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Escuela
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {`${student.f_name || ""} ${student.f_lastname || ""}`.trim() || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.email || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.school_name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => loadStudentDetail(student.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Detalle del Estudiante</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p className="text-sm text-gray-900">{selectedStudent.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{selectedStudent.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Primer Nombre</p>
                  <p className="text-sm text-gray-900">{selectedStudent.f_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Segundo Nombre</p>
                  <p className="text-sm text-gray-900">{selectedStudent.s_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Primer Apellido</p>
                  <p className="text-sm text-gray-900">{selectedStudent.f_lastname || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Segundo Apellido</p>
                  <p className="text-sm text-gray-900">{selectedStudent.s_lastname || "N/A"}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Información Completa</p>
                <pre className="text-xs text-gray-600 bg-gray-50 p-3 rounded overflow-x-auto">
                  {JSON.stringify(selectedStudent, null, 2)}
                </pre>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedStudent(null);
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

export default StudentsSection;