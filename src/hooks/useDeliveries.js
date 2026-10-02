import { useEffect, useState } from "react";
import { getDeliveries } from "../services/deliveryService";

export default function useDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDeliveries();

      setDeliveries(data);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      setError("Failed to load deliveries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return {
    deliveries,
    setDeliveries,
    loading,
    error,
    fetchDeliveries,
  };
}   