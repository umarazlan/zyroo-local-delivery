import apiClient from "../api/apiClient";

export const getUsers = () => {
  return apiClient.get("/users/");
};

export const getUser = (userId) => {
  return apiClient.get(`/users/${userId}/`);
};