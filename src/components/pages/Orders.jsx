import React, { useState } from "react";

export default function OrdersPage() {
  // Working state for orders table with filtering and search capabilities
  const [orders, setOrders] = useState([
    {
      id: "DL001",
      initials: "AK",
      customer: "Ali Khan",
      customerPhone: "0312-1111111",
      rider: "Hamza",
      pickupAddress: "GT Road, Mardan",
      deliveryAddress: "Timergara Bazaar",
      packageDetails: "Electronics, fragile",
      priority: "EXPRESS",
      paymentMethod: "CASH",
      route: "Mardan → Timergara",
      status: "IN TRANSIT",
      date: "Oct 24, 2024",
    },
    {
      id: "DL002",
      initials: "AH",
      customer: "Ahmed",
      customerPhone: "0333-2222222",
      rider: "Billal",
      pickupAddress: "Saddar, Mardan",
      deliveryAddress: "Dir City Center",
      packageDetails: "Clothing, 3kg",
      priority: "STANDARD",
      paymentMethod: "EASYPAISA",
      route: "Mardan → Dir",
      status: "DELIVERED",
      date: "Oct 24, 2024",
    },
    {
      id: "DL003",
      initials: "SA",
      customer: "Sara",
      customerPhone: "0300-3333333",
      rider: "Not Assigned",
      pickupAddress: "Mingora, Swat",
      deliveryAddress: "Cantt, Mardan",
      packageDetails: "Documents",
      priority: "URGENT",
      paymentMethod: "JAZZCASH",
      route: "Swat → Mardan",
      status: "PENDING",
      date: "Oct 24, 2024",
    },
    {
      id: "DL004",
      initials: "US",
      customer: "Usman",
      customerPhone: "0345-4444444",
      rider: "Hamza",
      pickupAddress: "University Road, Peshawar",
      deliveryAddress: "GT Road, Mardan",
      packageDetails: "Books, 2kg",
      priority: "STANDARD",
      paymentMethod: "CASH",
      route: "Peshawar → Mardan",
      status: "DELIVERED",
      date: "Oct 24, 2024",
    },
  ]);
  const [modalTab, setModalTab] = useState("view"); // 'view' | 'edit' | 'assign'
  const [editForm, setEditForm] = useState({});
  const availableRiders = ["Hamza", "Billal", "Tariq", "Zubair"];
  const [selectedRider, setSelectedRider] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeModal, setActiveModal] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [createForm, setCreateForm] = useState({
    customer: "",
    customerPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    packageDetails: "",
    priority: "STANDARD",
    paymentMethod: "CASH",
    rider: "Not Assigned",
  });

  // Filtered orders logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.rider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateOrder = () => {
    setActiveModal("create-order");
  };

  const handleCreateOrderSave = () => {
    if (
      !createForm.customer ||
      !createForm.customerPhone ||
      !createForm.pickupAddress ||
      !createForm.deliveryAddress ||
      !createForm.packageDetails
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const initials = createForm.customer
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newOrder = {
      id: `DL${String(orders.length + 1).padStart(3, "0")}`,
      initials,
      customer: createForm.customer,
      customerPhone: createForm.customerPhone,
      rider: createForm.rider,
      pickupAddress: createForm.pickupAddress,
      deliveryAddress: createForm.deliveryAddress,
      packageDetails: createForm.packageDetails,
      priority: createForm.priority,
      paymentMethod: createForm.paymentMethod,
      route: `${createForm.pickupAddress} → ${createForm.deliveryAddress}`,
      status: "PENDING",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);

    setCreateForm({
      customer: "",
      customerPhone: "",
      pickupAddress: "",
      deliveryAddress: "",
      packageDetails: "",
      priority: "STANDARD",
      paymentMethod: "CASH",
      rider: "Not Assigned",
    });

    closeModal();
  };
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setEditForm({ ...order });
    setSelectedRider(order.rider !== "Not Assigned" ? order.rider : "");
    setModalTab("view");
    setActiveModal("view-order");
  };

  const handleAssignCourier = () => {
    // Quick assign action for DL003 (Sara) from support desk
    setOrders(
      orders.map((o) =>
        o.id === "DL003" ? { ...o, rider: "Hamza", status: "IN TRANSIT" } : o,
      ),
    );
    alert("Parcel DL003 successfully reassigned to Hamza from Swat Hub!");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedOrder(null);
    setModalTab("view");
    setEditForm({});
    setSelectedRider("");
  };
  const handleEditSave = () => {
    if (
      !editForm.customer ||
      !editForm.pickupAddress ||
      !editForm.deliveryAddress
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const initials = editForm.customer
      .trim()
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const updatedOrder = {
      ...editForm,
      initials,
      route: `${editForm.pickupAddress} → ${editForm.deliveryAddress}`,
    };
    setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
    setSelectedOrder(updatedOrder);
    setModalTab("view");
  };

  const handleAssignRider = () => {
    if (!selectedRider) {
      alert("Please select a rider.");
      return;
    }
    const updated = {
      ...selectedOrder,
      rider: selectedRider,
      status:
        selectedOrder.status === "PENDING"
          ? "IN TRANSIT"
          : selectedOrder.status,
    };
    setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
    setSelectedOrder(updated);
    setModalTab("view");
  };

  const handleCancelOrder = (orderToCancel) => {
    const order = orderToCancel || selectedOrder;

    if (!order) return;

    const confirmed = window.confirm(
      `Are you sure you want to cancel order ${order.id}? This action cannot be undone.`,
    );

    if (!confirmed) return;

    const updatedOrder = {
      ...order,
      status: "CANCELLED",
    };

    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)),
    );

    setSelectedOrder(updatedOrder);
    setModalTab("view");
  };
  return (
    <div className="min-h-screen bg-indigo-50 py-6 px-3 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Live Fleet Manifest
            </p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              Orders
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Manage and monitor all delivery orders across regional hubs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Quick Status Counters */}
            <div className="hidden md:flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-2xs text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">
                  Active In-Transit
                </span>
                <span className="font-bold text-indigo-600">2 Parcels</span>
              </div>
              <div className="h-6 w-px bg-gray-100"></div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">
                  Pending Assign
                </span>
                <span className="font-bold text-amber-600">1 Unassigned</span>
              </div>
            </div>

            <button
              onClick={handleCreateOrder}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              + Create Order
            </button>
          </div>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Mardan Hub
              </span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">
                3 Active Pickups
              </p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
              98% OTIF
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Corridors Open
              </span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">
                Swat • Dir Express
              </p>
            </div>
            <span className="text-xs text-gray-500 font-medium">Smooth</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Completed Today
              </span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">
                2 Orders Logged
              </p>
            </div>
            <span className="text-xs text-gray-500 font-medium">~100%</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Available Couriers
              </span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">
                Hamza, Bilal
              </p>
            </div>
            <span className="size-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by Order ID, customer, rider, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-indigo-500 bg-gray-50/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl focus:outline-indigo-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="IN TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <button
              onClick={() => alert("Exporting manifest to CSV...")}
              className="text-xs font-semibold bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              📥 Export
            </button>
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Rider</th>
                  <th className="pb-3 font-semibold">Pickup</th>
                  <th className="pb-3 font-semibold">Destination</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3.5 font-semibold text-gray-900">
                        {order.id}
                      </td>
                      <td className="py-3.5 flex items-center gap-2">
                        <span className="size-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {order.initials}
                        </span>
                        {order.customer}
                      </td>
                      <td
                        className={`py-3.5 ${order.rider === "Not Assigned" ? "text-amber-600 font-semibold" : "text-gray-700"}`}
                      >
                        {order.rider}
                      </td>
                      <td className="py-3.5 text-gray-500">
                        📍 {order.pickupAddress}
                      </td>
                      <td className="py-3.5 text-gray-500">
                        📍 {order.deliveryAddress}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            order.status === "IN TRANSIT"
                              ? "bg-blue-50 text-blue-700"
                              : order.status === "DELIVERED"
                                ? "bg-emerald-50 text-emerald-700"
                                : order.status === "CANCELLED"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {order.status === "DELIVERED"
                            ? "✓ "
                            : order.status === "CANCELLED"
                              ? "✕ "
                              : "• "}
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Button */}
                          <td className="py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* View Button */}
                              <button
                                onClick={() => handleViewOrder(order)}
                                className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
                              >
                                View
                              </button>

                              {/* Cancel Button */}
                              {order.status !== "CANCELLED" &&
                                order.status !== "DELIVERED" && (
                                  <button
                                    onClick={() => {
                                      setSelectedOrder(order);
                                      handleCancelOrder();
                                    }}
                                    className="text-red-500 hover:text-red-700 font-semibold text-xs transition-colors"
                                  >
                                    Cancel
                                  </button>
                                )}
                            </div>
                          </td>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-400">
                      No orders match your search or filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 mt-4 border-t border-gray-100 text-xs text-gray-500">
            <p>
              Showing {filteredOrders.length} of {orders.length} orders •
              Updated real-time from Hub Gateway
            </p>
            <div className="flex items-center gap-1 mt-3 sm:mt-0">
              <button
                className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                &lt; Previous
              </button>
              <button className="px-3 py-1 bg-indigo-600 text-white font-semibold rounded-lg">
                1
              </button>
              <button
                className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Dual Cards: Dispatch Intelligence & Support Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dispatch Intelligence */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-48 h-32 rounded-2xl bg-indigo-950 overflow-hidden relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80"
                alt="Fleet preview"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <span className="text-[10px] text-white font-semibold">
                  Timergara & Dir Route Active
                </span>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                Dispatch Intelligence
              </span>
              <h3 className="text-base font-bold text-gray-900 mt-0.5 mb-2">
                Priority Corridor: Northern Sector
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Direct transit between Mardan and Dir is averaging 42 minutes
                under estimated delivery window today. Hamza and Bilal are
                pacing on schedule.
              </p>
              <button
                onClick={() =>
                  alert("Opening live interactive fleet routing map...")
                }
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
              >
                Open Fleet Map ↗
              </button>
            </div>
          </div>

          {/* Support Desk */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Support Desk
                </span>
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Urgent Reroute Support
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Need to reassign parcel DL003 (Sara) from Swat Hub directly to
                an available courier?
              </p>
            </div>
            <button
              onClick={handleAssignCourier}
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900 text-xs font-bold py-2.5 rounded-xl transition-colors shadow-2xs"
            >
              Assign Hub Courier
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200">
            {activeModal === "create-order" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Create New Delivery Order
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Add a new parcel to the delivery manifest.
                    </p>
                  </div>

                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {/* Customer Name */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Customer Name *
                    </label>

                    <input
                      type="text"
                      value={createForm.customer}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          customer: e.target.value,
                        })
                      }
                      placeholder="e.g. Tariq Jamil"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Customer Phone *
                    </label>

                    <input
                      type="text"
                      value={createForm.customerPhone}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          customerPhone: e.target.value,
                        })
                      }
                      placeholder="e.g. 0300-1234567"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  {/* Pickup Address */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Pickup Address *
                    </label>

                    <input
                      type="text"
                      value={createForm.pickupAddress}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          pickupAddress: e.target.value,
                        })
                      }
                      placeholder="e.g. GT Road, Mardan"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Delivery Address *
                    </label>

                    <input
                      type="text"
                      value={createForm.deliveryAddress}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          deliveryAddress: e.target.value,
                        })
                      }
                      placeholder="e.g. Timergara Bazaar"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  {/* Package Details */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Package Details *
                    </label>

                    <input
                      type="text"
                      value={createForm.packageDetails}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          packageDetails: e.target.value,
                        })
                      }
                      placeholder="e.g. Electronics, 2kg, fragile"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Delivery Priority
                    </label>

                    <select
                      value={createForm.priority}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          priority: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      <option value="STANDARD">🟢 Standard</option>
                      <option value="EXPRESS">🟡 Express</option>
                      <option value="URGENT">🔴 Urgent</option>
                    </select>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Payment Method
                    </label>

                    <select
                      value={createForm.paymentMethod}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          paymentMethod: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      <option value="CASH">Cash</option>
                      <option value="EASYPAISA">Easypaisa</option>
                      <option value="JAZZCASH">JazzCash</option>
                    </select>
                  </div>

                  {/* Rider */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Assign Rider
                    </label>

                    <select
                      value={createForm.rider}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          rider: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      <option value="Not Assigned">Not Assigned</option>

                      {availableRiders.map((rider) => (
                        <option key={rider} value={rider}>
                          {rider}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-5">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleCreateOrderSave}
                    className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                  >
                    Create Order
                  </button>
                </div>
              </div>
            )}

            {activeModal === "view-order" && selectedOrder && (
              <div>
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Order {selectedOrder.id}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 ${
                        selectedOrder.status === "IN TRANSIT"
                          ? "bg-blue-50 text-blue-700"
                          : selectedOrder.status === "DELIVERED"
                            ? "bg-emerald-50 text-emerald-700"
                            : selectedOrder.status === "CANCELLED"
                              ? "bg-red-50 text-red-700"
                              : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      • {selectedOrder.status}
                    </span>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-lg font-bold leading-none"
                  >
                    ✕
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4">
                  {["view", "edit", "assign"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setModalTab(tab)}
                      className={`flex-1 text-[11px] font-bold py-1.5 rounded-lg transition-colors capitalize ${modalTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      {tab === "view"
                        ? "📋 View"
                        : tab === "edit"
                          ? "✏️ Edit"
                          : "🏍️ Assign"}
                    </button>
                  ))}
                </div>

                {/* VIEW TAB */}
                {modalTab === "view" && (
                  <div className="space-y-3">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-gray-100 space-y-2.5 text-xs">
                      {[
                        ["Order ID", selectedOrder.id],
                        ["Customer", selectedOrder.customer],
                        ["Phone", selectedOrder.customerPhone],
                        ["Pickup", selectedOrder.pickupAddress],
                        ["Delivery", selectedOrder.deliveryAddress],
                        ["Package", selectedOrder.packageDetails],
                        ["Priority", selectedOrder.priority],
                        ["Payment", selectedOrder.paymentMethod],
                        ["Rider", selectedOrder.rider],
                        ["Date", selectedOrder.date],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between items-start gap-4"
                        >
                          <span className="font-semibold text-gray-400 shrink-0">
                            {label}
                          </span>
                          <span className="text-gray-800 text-right">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setModalTab("edit")}
                        className="flex-1 text-xs font-semibold border border-gray-200 rounded-xl py-2 hover:bg-gray-50"
                      >
                        ✏️ Edit Order
                      </button>
                      <button
                        onClick={() => setModalTab("assign")}
                        className="flex-1 text-xs font-semibold border border-indigo-200 text-indigo-600 rounded-xl py-2 hover:bg-indigo-50"
                      >
                        🏍️ Assign Rider
                      </button>
                      {selectedOrder.status !== "CANCELLED" &&
                        selectedOrder.status !== "DELIVERED" && (
                          <button
                            onClick={handleCancelOrder}
                            className="flex-1 text-xs font-semibold border border-red-200 text-red-500 rounded-xl py-2 hover:bg-red-50"
                          >
                            ✕ Cancel
                          </button>
                        )}
                    </div>
                  </div>
                )}

                {/* EDIT TAB */}
                {modalTab === "edit" && (
                  <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                    {[
                      {
                        label: "Customer Name",
                        name: "customer",
                        placeholder: "e.g. Ali Khan",
                      },
                      {
                        label: "Customer Phone",
                        name: "customerPhone",
                        placeholder: "e.g. 0312-1234567",
                      },
                      {
                        label: "Pickup Address",
                        name: "pickupAddress",
                        placeholder: "e.g. GT Road, Mardan",
                      },
                      {
                        label: "Delivery Address",
                        name: "deliveryAddress",
                        placeholder: "e.g. Timergara Bazaar",
                      },
                      {
                        label: "Package Details",
                        name: "packageDetails",
                        placeholder: "e.g. 2kg, fragile",
                      },
                    ].map(({ label, name, placeholder }) => (
                      <div key={name}>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">
                          {label}
                        </label>
                        <input
                          type="text"
                          value={editForm[name] || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, [name]: e.target.value })
                          }
                          placeholder={placeholder}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">
                        Priority
                      </label>
                      <select
                        value={editForm.priority || "STANDARD"}
                        onChange={(e) =>
                          setEditForm({ ...editForm, priority: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                      >
                        <option value="STANDARD">🟢 Standard</option>
                        <option value="EXPRESS">🟡 Express</option>
                        <option value="URGENT">🔴 Urgent</option>
                      </select>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setModalTab("view")}
                        className="flex-1 text-xs font-semibold border border-gray-200 rounded-xl py-2 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleEditSave}
                        className="flex-1 text-xs font-semibold bg-indigo-600 text-white rounded-xl py-2 hover:bg-indigo-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* ASSIGN RIDER TAB */}
                {modalTab === "assign" && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">
                      Select a rider to assign to order{" "}
                      <span className="font-bold text-gray-800">
                        {selectedOrder.id}
                      </span>
                      .
                    </p>
                    <div className="space-y-2">
                      {availableRiders.map((rider) => (
                        <button
                          key={rider}
                          onClick={() => setSelectedRider(rider)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-semibold transition-colors ${selectedRider === rider ? "border-indigo-400 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="size-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px]">
                              {rider.slice(0, 2).toUpperCase()}
                            </span>
                            {rider}
                          </div>
                          {selectedRider === rider && (
                            <span className="text-indigo-500">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setModalTab("view")}
                        className="flex-1 text-xs font-semibold border border-gray-200 rounded-xl py-2 hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleAssignRider}
                        className="flex-1 text-xs font-semibold bg-indigo-600 text-white rounded-xl py-2 hover:bg-indigo-700"
                      >
                        Confirm Assignment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
