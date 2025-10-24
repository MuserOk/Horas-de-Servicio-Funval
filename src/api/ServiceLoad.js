import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig"; // ajusta la ruta según tu proyecto

const ServiceLoad = () => {
  const [services, setServices] = useState([]); // para guardar los servicios
  const [loading, setLoading] = useState(true); // indicador de carga
  const [error, setError] = useState(null); // para errores

  // Función para obtener los servicios desde la API
  const obtenerServicios = async () => {
    try {
      const respuesta = await api.get("/services"); // endpoint
      setServices(respuesta.data); // guardar los datos en estado
      setLoading(false); // terminar la carga
    } catch (err) {
      setError("Error al obtener los servicios"); // manejar error
      setLoading(false);
      console.error(err);
    }
  };

  // useEffect para ejecutar la petición al montar el componente
  useEffect(() => {
    obtenerServicios();
  }, []);

  // Renderizado condicional
  if (loading) return <p>Cargando servicios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Servicios</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name} {/* Ajusta según la estructura de tu JSON */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceLoad;
