import apiClient from "../api/apiClient";

export const getOrders = () => {
  return apiClient.get("/orders.json?key=c469efc0");
};

export const createOrder = (orderData) => {
  return apiClient.post("/orders", orderData);
};

export const updateOrder = (id, orderData) => {
  return apiClient.put(`/orders/${id}`, orderData);
};

export const deleteOrder = (id) => {
  return apiClient.delete(`/orders/${id}`);
};