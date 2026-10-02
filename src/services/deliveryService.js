import apiClient from "../api/apiClient";

export const getDeliveries = () => {
  return apiClient.get("/delivery.json?key=c469efc0");
};