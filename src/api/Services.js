import api from "./axiosConfig";

export const createService = async (data) => {
  try {
    const formData = new FormData();
    formData.append("amount_reported", data.amount_reported);
    formData.append("description", data.description);
    formData.append("category_id", data.category_id);
    if (data.evidence) {
      formData.append("evidence", data.evidence);
    }

    const res = await api.post("/services", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    console.error(
      "Error creando el servicio:",
      error.response || error.message
    );
    throw error;
  }
};
