import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";
import { useAppContext } from "../context/AppContext";
export default function useNotifications() {
  const {
    notifications,
    setNotifications,
    loading,
    setLoading,
    errors,
    setErrors,
  } = useAppContext();
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNotifications();

      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    setNotifications,
    loading,
    error,
    fetchNotifications,
  };
}