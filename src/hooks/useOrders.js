import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";
import { useAppContext } from "../context/AppContext";

export default function useOrders() {
  const {
    orders,
    setOrders,
    loading,
    setLoading,
    errors,
    setErrors,
  } = useAppContext();

  const fetchOrders = async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        orders: true,
      }));

      setErrors((prev) => ({
        ...prev,
        orders: "",
      }));

      const data = await getOrders();

      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);

      setErrors((prev) => ({
        ...prev,
        orders: "Failed to load orders.",
      }));
    } finally {
      setLoading((prev) => ({
        ...prev,
        orders: false,
      }));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    setOrders,
    loading: loading.orders,
    error: errors.orders,
    fetchOrders,
  };
}