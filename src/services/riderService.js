import apiClient from "../api/apiClient";

export const getRiderDeliveries = () => {
  return apiClient.get("/users.json?key=c469efc0");
};