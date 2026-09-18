import React, { useState } from "react";

export default function RiderDashboard() {
  const [deliveries, setDeliveries] = useState([
    {
      id: "DL001",
      customer: "Ali Khan",
      customerPhone: "0312-1111111",
      pickupAddress: "GT Road, Mardan",
      deliveryAddress: "Timergara Bazaar",
      packageDetails: "Electronics, fragile",
      priority: "EXPRESS",
      paymentMethod: "CASH",
      status: "ASSIGNED",
      date: "Oct 24, 2024",
    },
    {
      id: "DL004",
      customer: "Usman",
      customerPhone: "0345-4444444",
      pickupAddress: "University Road, Peshawar",
      deliveryAddress: "GT Road, Mardan",
      packageDetails: "Books, 2kg",
      priority: "STANDARD",
      paymentMethod: "CASH",
      status: "ACCEPTED",
      date: "Oct 24, 2024",
    },
  ]);
  const todayDeliveries = deliveries;

  const pendingDeliveries = deliveries.filter(
    (delivery) => delivery.status === "ASSIGNED",
  );

  const activeDeliveries = deliveries.filter(
    (delivery) =>
      delivery.status === "ACCEPTED" ||
      delivery.status === "PICKED UP" ||
      delivery.status === "IN TRANSIT",
  );

  const completedDeliveries = deliveries.filter(
    (delivery) => delivery.status === "DELIVERED",
  );
  const handleAcceptDelivery = (deliveryId) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              status: "ACCEPTED",
            }
          : delivery,
      ),
    );
  };
  const handleMarkPickedUp = (deliveryId) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              status: "PICKED UP",
            }
          : delivery,
      ),
    );
  };
  const handleMarkDelivered = (deliveryId) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              status: "DELIVERED",
            }
          : delivery,
      ),
    );
  };
  const handleStartDelivery = (deliveryId) => {
  setDeliveries((prevDeliveries) =>
    prevDeliveries.map((delivery) =>
      delivery.id === deliveryId
        ? {
            ...delivery,
            status: "IN TRANSIT",
          }
        : delivery,
    ),
  );
};
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Today's Deliveries */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs font-bold text-gray-400 uppercase">
            Today's Deliveries
          </p>

          <p className="text-2xl font-black text-gray-900 mt-2">
            {todayDeliveries.length}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs font-bold text-gray-400 uppercase">Pending</p>

          <p className="text-2xl font-black text-amber-600 mt-2">
            {pendingDeliveries.length}
          </p>
        </div>

        {/* Active */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs font-bold text-gray-400 uppercase">Active</p>

          <p className="text-2xl font-black text-blue-600 mt-2">
            {activeDeliveries.length}
          </p>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs font-bold text-gray-400 uppercase">Completed</p>

          <p className="text-2xl font-black text-emerald-600 mt-2">
            {completedDeliveries.length}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 p-5 mt-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Today's Deliveries
            </h2>

            <p className="text-xs text-gray-500">Deliveries assigned to you.</p>
          </div>
        </div>

        <div className="space-y-3">
          {todayDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="border border-gray-100 rounded-2xl p-4"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {/* Delivery Information */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">
                      {delivery.id}
                    </span>

                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-gray-100">
                      {delivery.status}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-gray-800 mt-2">
                    {delivery.customer}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    📍 {delivery.pickupAddress}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    📍 {delivery.deliveryAddress}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex items-center gap-2">
                  {/* ASSIGNED → ACCEPTED */}
                  {delivery.status === "ASSIGNED" && (
                    <button
                      onClick={() => handleAcceptDelivery(delivery.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                    >
                      Accept Delivery
                    </button>
                  )}

                  {/* ACCEPTED → PICKED UP */}
                  {delivery.status === "ACCEPTED" && (
                    <button
                      onClick={() => handleMarkPickedUp(delivery.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                    >
                      Mark as Picked Up
                    </button>
                  )}

                  {/* PICKED UP → IN TRANSIT */}
                  {delivery.status === "PICKED UP" && (
                    <button
                      onClick={() => handleStartDelivery(delivery.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                    >
                      Start Delivery
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
