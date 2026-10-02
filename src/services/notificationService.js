const NOTIFICATION_API_URL =
  import.meta.env.VITE_NOTIFICATIONS_API_URL;

export const getNotifications = async () => {
  const response = await fetch(NOTIFICATION_API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};