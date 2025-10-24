import React from 'react'

// src/components/UsersSection.jsx
import { useState, useEffect } from "react";
import api from "../../api/axiosConfig" ; // Importa la instancia configurada de axios

function UsersSection() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(""); // Para filtrar usuarios por rol
  const [formData, setFormData] = useState({
    f_name: "",
    s_name: "",
    f_lastname: "",
    s_lastname: "",
    email: "",
    password: "",
    role_id: "",
    schools: [], // Array de IDs de escuelas
    controller_id: "",
    recruiter_id: "",
    country_id: "",
  });

  useEffect(() => {
    fetchRoles(); // Cargar roles para el selector
  }, []);

  // Cargar usuarios una vez que se ha seleccionado un rol
  useEffect(() => {
    if (selectedRole) {
      fetchUsersByRole(selectedRole);
    }
  }, [selectedRole]);

  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles"); // Usa la instancia 'api'
      setRoles(response.data);
      if (response.data.length > 0) {
        setSelectedRole(response.data[0].id); // Selecciona el primer rol por defecto
      }
    } catch (error) {
      console.error("Error al cargar roles:", error);
      alert("Error al cargar los roles");
    }
  };

  const fetchUsersByRole = async (roleId) => {
    setLoading(true);
    try {
      const response = await api.get(`/users?r=${roleId}`); // Usa la instancia 'api'
      setUsers(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert("Error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingUser) {
        // Solo actualiza los campos de nombre para la edición
        const updateData = {
          f_name: formData.f_name,
          s_name: formData.s_name,
          f_lastname: formData.f_lastname,
          s_lastname: formData.s_lastname,
        };
        await api.put(`/users/${editingUser.id}`, updateData); // Usa la instancia 'api'
        alert("Usuario actualizado exitosamente");
      } else {
        // Para creación, se envían todos los campos
        await api.post("/users/", formData); // Usa la instancia 'api'
        alert("Usuario creado exitosamente");
      }
      setShowModal(false);
      resetForm();
      if (selectedRole) {
        fetchUsersByRole(selectedRole); // Refresca la lista de usuarios
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar el usuario");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      f_name: "",
      s_name: "",
      f_lastname: "",
      s_lastname: "",
      email: "",
      password: "",
      role_id: "",
      schools: [],
      controller_id: "",
      recruiter_id: "",
      country_id: "",
    });
    setEditingUser(null);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      f_name: user.f_name || "",
      s_name: user.s_name || "",
      f_lastname: user.f_lastname || "",
      s_lastname: user.s_lastname || "",
      email: user.email || "", // El email se muestra pero no se edita en este modal
      password: "", // La contraseña no se precarga por seguridad
      role_id: user.role_id || "",
      schools: user.schools || [],
      controller_id: user.controller_id || "",
      recruiter_id: user.recruiter_id || "",
      country_id: user.country_id || "",
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-500">Gestión de Usuarios</h2>
          <div className="flex gap-2 mt-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedRole === role.id ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {role.name}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          + Nuevo Usuario
        </button>
      </div>

      {loading && !showModal ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white max-w-screen rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full object-cover divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre Completo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {`${user.f_name || ""} ${user.s_name || ""} ${user.f_lastname || ""} ${user.s_lastname || ""}`.trim() ||
                        "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {roles.find((r) => r.id === user.role_id)?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primer Nombre</label>
                  <input
                    type="text"
                    value={formData.f_name}
                    onChange={(e) => setFormData({ ...formData, f_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Segundo Nombre</label>
                  <input
                    type="text"
                    value={formData.s_name}
                    onChange={(e) => setFormData({ ...formData, s_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primer Apellido</label>
                  <input
                    type="text"
                    value={formData.f_lastname}
                    onChange={(e) => setFormData({ ...formData, f_lastname: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Segundo Apellido</label>
                  <input
                    type="text"
                    value={formData.s_lastname}
                    onChange={(e) => setFormData({ ...formData, s_lastname: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {!editingUser && ( // Campos solo para creación de usuario
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                      <select
                        value={formData.role_id}
                        onChange={(e) => setFormData({ ...formData, role_id: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Seleccionar rol</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">País ID</label>
                      <input
                        type="number"
                        value={formData.country_id}
                        onChange={(e) => setFormData({ ...formData, country_id: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Controller ID</label>
                      <input
                        type="number"
                        value={formData.controller_id}
                        onChange={(e) => setFormData({ ...formData, controller_id: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recruiter ID</label>
                      <input
                        type="number"
                        value={formData.recruiter_id}
                        onChange={(e) => setFormData({ ...formData, recruiter_id: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Escuelas (IDs separadas por coma)
                    </label>
                    <input
                      type="text"
                      placeholder="1,2,3"
                      onChange={(e) => {
                        const schoolIds = e.target.value
                          .split(",")
                          .map((id) => Number(id.trim()))
                          .filter((id) => !isNaN(id)); // Asegura que solo sean números válidos
                        setFormData({ ...formData, schools: schoolIds });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
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

export default UsersSection;
