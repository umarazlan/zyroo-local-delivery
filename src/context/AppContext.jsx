import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const STATUS_FLOW = [
  "ASSIGNED",
  "ACCEPTED",
  "PICKED UP",
  "IN TRANSIT",
  "DELIVERED",
];

export function AppProvider({ children }) {
  // All orders
  const [orders, setOrders] = useState([]);

  // Currently tracked delivery
  const [activeDelivery, setActiveDelivery] = useState(null);

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Loading states
  const [loading, setLoading] = useState({
    orders: false,
    deliveries: false,
    notifications: false,
  });

  // API errors
  const [errors, setErrors] = useState({
    orders: "",
    deliveries: "",
    notifications: "",
  });

  // --------------------------------
  // Update delivery status
  // --------------------------------
  const updateDeliveryStatus = (orderId, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order,
      ),
    );

    // Also update active delivery
    setActiveDelivery((currentDelivery) => {
      if (currentDelivery && currentDelivery.orderId === orderId) {
        return {
          ...currentDelivery,
          status: newStatus,
        };
      }

      return currentDelivery;
    });
  };

  // --------------------------------
  // Select delivery for tracking
  // --------------------------------
  const selectActiveDelivery = (delivery) => {
    setActiveDelivery(delivery);
  };

  // --------------------------------
  // Keep active delivery synchronized
  // with orders
  // --------------------------------
  useEffect(() => {
    if (!activeDelivery) {
      return;
    }

    const updatedDelivery = orders.find(
      (order) => order.orderId === activeDelivery.orderId,
    );

    if (updatedDelivery) {
      setActiveDelivery(updatedDelivery);
    }
  }, [orders]);

  // --------------------------------
  // Simulated real-time updates
  // --------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((currentOrders) =>
        currentOrders.map((order) => {
          // Only simulate deliveries marked for simulation
          if (!order.simulateRealtime) {
            return order;
          }

          const currentIndex = STATUS_FLOW.indexOf(order.status);

          // Unknown status
          if (currentIndex === -1) {
            return order;
          }

          // Already delivered
          if (currentIndex === STATUS_FLOW.length - 1) {
            return order;
          }

          const nextStatus = STATUS_FLOW[currentIndex + 1];

          return {
            ...order,
            status: nextStatus,
          };
        }),
      );
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateDeliveryStatusOptimistic = async (
    orderId,
    newStatus,
    updateApi,
  ) => {
    // Save old state
    const previousOrders = [...orders];
    const previousActiveDelivery = activeDelivery;

    // 1. Update UI immediately
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order,
      ),
    );

    setActiveDelivery((currentDelivery) => {
      if (currentDelivery && currentDelivery.orderId === orderId) {
        return {
          ...currentDelivery,
          status: newStatus,
        };
      }

      return currentDelivery;
    });

    try {
      // 2. Send request to API
      await updateApi();
    } catch (error) {
      console.error("Failed to update delivery:", error);

      // 3. Rollback if API fails
      setOrders(previousOrders);
      setActiveDelivery(previousActiveDelivery);

      throw error;
    }
  };
const markNotificationAsRead = (notificationId) => {
  setNotifications((currentNotifications) =>
    currentNotifications.map((notification) =>
      notification.notificationId === notificationId
        ? { ...notification, isRead: true }
        : notification
    )
  );
};
  return (
    <AppContext.Provider
      value={{
        // Orders
        orders,
        setOrders,

        // Active delivery
        activeDelivery,
        setActiveDelivery,
        selectActiveDelivery,

        // Notifications
        notifications,
        setNotifications,

        // Loading
        loading,
        setLoading,

        // Errors
        errors,
        setErrors,

        // Delivery actions
        updateDeliveryStatus,
        updateDeliveryStatusOptimistic,
        markNotificationAsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
