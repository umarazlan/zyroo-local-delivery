import React, { useState } from "react";

export default function Dashboard() {
  // Working state for orders and notifications/modals
  const [orders, setOrders] = useState([
    {
      id: "DL001",
      initials: "AK",
      customer: "Ali Khan",
      rider: "Hamza",
      route: "Mardan → Timergara",
      status: "IN TRANSIT",
    },
    {
      id: "DL002",
      initials: "AH",
      customer: "Ahmed",
      rider: "Billal",
      route: "Mardan → Dir",
      status: "DELIVERED",
    },
    {
      id: "DL003",
      initials: "SA",
      customer: "Sara",
      rider: "Not Assigned",
      route: "Swat → Mardan",
      status: "PENDING",
    },
    {
      id: "DL004",
      initials: "US",
      customer: "Usman",
      rider: "Hamza",
      route: "Peshawar → Mardan",
      status: "DELIVERED",
    },
  ]);

  // const [activeModal, setActiveModal] = useState(null);
  // const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrderForm, setNewOrderForm] = useState({
    customerName: "",
    customerPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    packageDetails: "",
    priority: "STANDARD",
    paymentMethod: "CASH",
  });
  // Button Action Handlers
  const handleNewOrder = () => {
    setActiveModal("new-order");
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setActiveModal("view-order");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedOrder(null);
  };

  const handleFormChange = (e) => {
    setNewOrderForm({ ...newOrderForm, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = () => {
    if (
      !newOrderForm.customerName ||
      !newOrderForm.customerPhone ||
      !newOrderForm.pickupAddress ||
      !newOrderForm.deliveryAddress
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const newId = `DL00${orders.length + 1}`;
    const initials = newOrderForm.customerName
      .trim()
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    setOrders([
      ...orders,
      {
        id: newId,
        initials,
        customer: newOrderForm.customerName,
        rider: "Not Assigned",
        route: `${newOrderForm.pickupAddress} → ${newOrderForm.deliveryAddress}`,
        status: "PENDING",
      },
    ]);
    setNewOrderForm({
      customerName: "",
      customerPhone: "",
      pickupAddress: "",
      deliveryAddress: "",
      packageDetails: "",
      priority: "STANDARD",
      paymentMethod: "CASH",
    });
    alert(`Order ${newId} created successfully!`);
    closeModal();
  };
  return (
    <div className="min-h-screen bg-indigo-50 py-6 px-3 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
                Dashboard
              </h1>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Here's what's happening with your deliveries today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => alert("Date filter: Showing today's logs.")}
              className="flex-1 sm:flex-none bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3.5 py-2.5 sm:py-2 rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-2"
            >
              📅 Today, Oct 24
            </button>
            <button
              onClick={handleNewOrder}
              className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 sm:py-2 rounded-xl shadow-sm transition-colors text-center"
            >
              + New Delivery Order
            </button>
          </div>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                📦
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                +4 today
              </span>
            </div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Total Orders
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-gray-900">25</span>
              <span className="text-xs text-gray-500">parcels</span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-2">
              +16% vs yesterday volume
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                ⏳
              </div>
              <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                NEEDS ASSIGNMENT
              </span>
            </div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Pending Orders
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-gray-900">5</span>
              <span className="text-xs text-gray-500">in queue</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-2">
              Avg. wait time ~14 mins
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                🏍️
              </div>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                ON THE ROAD
              </span>
            </div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              In Delivery
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-gray-900">3</span>
              <span className="text-xs text-gray-500">active couriers</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-2">
              100% tracked via GPS
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                ✅
              </div>
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                98% ON-TIME
              </span>
            </div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Completed
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-gray-900">17</span>
              <span className="text-xs text-gray-500">delivered</span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-2">
              Zero return requests
            </p>
          </div>
        </div>

        {/* Main Grid: Recent Orders & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Orders Table */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-2xs overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-900">
                  Recent Orders
                </h2>
                <span className="bg-indigo-50 text-indigo-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  4 active
                </span>
              </div>
              <button
                onClick={() => alert("Navigating to full orders registry.")}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left text-xs min-w-[550px]">
                <thead>
                  <tr className="text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Rider</th>
                    <th className="pb-3 font-semibold">Route</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3 font-semibold text-gray-900">
                        {order.id}
                      </td>
                      <td className="py-3 flex items-center gap-2">
                        <span className="size-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {order.initials}
                        </span>
                        <span className="truncate max-w-[90px] sm:max-w-none">
                          {order.customer}
                        </span>
                      </td>
                      <td
                        className={`py-3 ${order.rider === "Not Assigned" ? "text-red-500 font-semibold" : "text-gray-700"}`}
                      >
                        {order.rider}
                      </td>
                      <td className="py-3 text-gray-500 truncate max-w-[110px] sm:max-w-none">
                        {order.route}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                            order.status === "IN TRANSIT"
                              ? "bg-blue-50 text-blue-700"
                              : order.status === "DELIVERED"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-purple-50 text-purple-700"
                          }`}
                        >
                          {order.status === "DELIVERED" ? "✓ " : "• "}{" "}
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-[11px] px-3 py-1 rounded-lg transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-400 mt-4">
              Showing 4 most recent deliveries out of 25 scheduled for this
              shift.
            </p>
          </div>

          {/* Delivery Overview */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-gray-900">
                  Delivery Overview
                </h2>
                <span className="border border-gray-200 text-gray-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  DAILY TARGET
                </span>
              </div>

              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs text-gray-500">Total Volume</span>
                <span className="text-lg font-black text-gray-900">
                  25{" "}
                  <span className="text-xs font-normal text-gray-500">
                    Orders
                  </span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-6 flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: "68%" }}
                ></div>
                <div
                  className="bg-purple-400 h-full"
                  style={{ width: "20%" }}
                ></div>
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: "12%" }}
                ></div>
              </div>

              {/* Breakdown metrics */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500"></span>
                    <span className="text-gray-600">Completed</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    17 orders{" "}
                    <span className="bg-emerald-50 text-emerald-700 ml-1 px-1.5 py-0.5 rounded text-[10px]">
                      68%
                    </span>
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-purple-400"></span>
                    <span className="text-gray-600">Pending</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    5 orders{" "}
                    <span className="bg-purple-50 text-purple-700 ml-1 px-1.5 py-0.5 rounded text-[10px]">
                      20%
                    </span>
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-blue-500"></span>
                    <span className="text-gray-600">In Transit</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    3 orders{" "}
                    <span className="bg-blue-50 text-blue-700 ml-1 px-1.5 py-0.5 rounded text-[10px]">
                      12%
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-600">
                ⚡ Dispatch throughput is{" "}
                <span className="font-bold text-gray-900">14% higher</span> than
                last Thursday.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Sorting Hub & Active Riders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sorting Hub Banner */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
                ⚡
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Mardan Central Sorting Hub
                </h3>
                <p className="text-xs text-gray-500">
                  Highway Node 4 • Peak outbound window: 2:00 PM – 5:30 PM
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
              <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                3 corridors active
              </span>
              <button
                onClick={() => alert("Opening Live GIS Corridors Map...")}
                className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-2xs"
              >
                Live Map
              </button>
            </div>
          </div>

          {/* Active Riders Section */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">🏍️</span>
                <h3 className="text-sm font-bold text-gray-900">
                  Active Riders
                </h3>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500"></span> 2
                Online
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50/70 p-3 rounded-2xl border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    HM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Hamza</p>
                    <p className="text-[10px] text-gray-500">
                      Yamaha YBR • Timergara Route
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-indigo-600">
                    2 deliveries
                  </p>
                  <p className="text-[10px] text-emerald-600 font-medium">
                    On Schedule
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/70 p-3 rounded-2xl border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    BL
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Billal</p>
                    <p className="text-[10px] text-gray-500">
                      Honda 125 • Dir Corridor
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-indigo-600">
                    1 delivery
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium">
                    Final Dropoff
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
              <span>📍</span>
              <span>
                Sara's order (Swat → Mardan) has no assigned rider. Hamza will
                be free in ~35 mins.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Interactive Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            {activeModal === "new-order" && (
              <div>
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    New Delivery Order
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Fill in the manifest to dispatch a parcel.
                  </p>
                </div>

                <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Customer Info
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-xs font-semibold text-gray-700 block mb-1">
                          Customer Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          value={newOrderForm.customerName}
                          onChange={handleFormChange}
                          placeholder="e.g. Ali Khan"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-xs font-semibold text-gray-700 block mb-1">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="customerPhone"
                          value={newOrderForm.customerPhone}
                          onChange={handleFormChange}
                          placeholder="e.g. 0312-1234567"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Route
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">
                          Pickup Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="pickupAddress"
                          value={newOrderForm.pickupAddress}
                          onChange={handleFormChange}
                          placeholder="e.g. Shop 4, GT Road, Mardan"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">
                          Delivery Address{" "}
                          <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="deliveryAddress"
                          value={newOrderForm.deliveryAddress}
                          onChange={handleFormChange}
                          placeholder="e.g. House 12, Timergara"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Package
                    </p>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Package Details
                    </label>
                    <textarea
                      name="packageDetails"
                      value={newOrderForm.packageDetails}
                      onChange={handleFormChange}
                      rows={2}
                      placeholder="e.g. 2kg parcel, fragile electronics"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Options
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">
                          Delivery Priority
                        </label>
                        <select
                          name="priority"
                          value={newOrderForm.priority}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                        >
                          <option value="STANDARD">🟢 Standard</option>
                          <option value="EXPRESS">🟡 Express</option>
                          <option value="URGENT">🔴 Urgent</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">
                          Payment Method
                        </label>
                        <select
                          name="paymentMethod"
                          value={newOrderForm.paymentMethod}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                        >
                          <option value="CASH">💵 Cash on Delivery</option>
                          <option value="EASYPAISA">📱 Easypaisa</option>
                          <option value="JAZZCASH">📱 JazzCash</option>
                          <option value="BANK">🏦 Bank Transfer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-gray-100">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                  >
                    Dispatch Order →
                  </button>
                </div>
              </div>
            )}

            {activeModal === "view-order" && selectedOrder && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Order Details: {selectedOrder.id}
                </h3>
                <p className="text-xs text-indigo-600 font-semibold mb-4">
                  Status: {selectedOrder.status}
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs mb-6 border border-gray-100">
                  <p>
                    <span className="font-semibold text-gray-500">
                      Customer:
                    </span>{" "}
                    {selectedOrder.customer}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-500">
                      Assigned Rider:
                    </span>{" "}
                    {selectedOrder.rider}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-500">
                      Route Path:
                    </span>{" "}
                    {selectedOrder.route}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-xs font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
