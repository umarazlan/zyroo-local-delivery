import React, { useState } from 'react';

export default function OrdersPage() {
  // Working state for orders table with filtering and search capabilities
  const [orders, setOrders] = useState([
    { id: 'DL001', initials: 'AK', customer: 'Ali Khan', rider: 'Hamza', pickup: 'Mardan', destination: 'Timergara', status: 'IN TRANSIT' },
    { id: 'DL002', initials: 'AH', customer: 'Ahmed', rider: 'Billal', pickup: 'Mardan', destination: 'Dir', status: 'DELIVERED' },
    { id: 'DL003', initials: 'SA', customer: 'Sara', rider: 'Not Assigned', pickup: 'Swat', destination: 'Mardan', status: 'PENDING' },
    { id: 'DL004', initials: 'US', customer: 'Usman', rider: 'Hamza', pickup: 'Peshawar', destination: 'Mardan', status: 'DELIVERED' },
    { id: 'DL005', initials: 'AY', customer: 'Ayesha', rider: 'Billal', pickup: 'Mardan', destination: 'Nowshera', status: 'IN TRANSIT' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filtered orders logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.rider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateOrder = () => {
    setActiveModal('create-order');
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setActiveModal('view-order');
  };

  const handleAssignCourier = () => {
    // Quick assign action for DL003 (Sara) from support desk
    setOrders(orders.map(o => o.id === 'DL003' ? { ...o, rider: 'Hamza', status: 'IN TRANSIT' } : o));
    alert("Parcel DL003 successfully reassigned to Hamza from Swat Hub!");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-indigo-50 py-6 px-3 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Live Fleet Manifest</p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">Orders</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage and monitor all delivery orders across regional hubs.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Quick Status Counters */}
            <div className="hidden md:flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-2xs text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Active In-Transit</span>
                <span className="font-bold text-indigo-600">2 Parcels</span>
              </div>
              <div className="h-6 w-px bg-gray-100"></div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Pending Assign</span>
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
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mardan Hub</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">3 Active Pickups</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">98% OTIF</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Corridors Open</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">Swat • Dir Express</p>
            </div>
            <span className="text-xs text-gray-500 font-medium">Smooth</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Completed Today</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">2 Orders Logged</p>
            </div>
            <span className="text-xs text-gray-500 font-medium">~100%</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Available Couriers</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">Hamza, Bilal</p>
            </div>
            <span className="size-2 rounded-full bg-emerald-500"></span>
          </div>

        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">🔍</span>
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
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 font-semibold text-gray-900">{order.id}</td>
                      <td className="py-3.5 flex items-center gap-2">
                        <span className="size-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-[10px] shrink-0">{order.initials}</span>
                        {order.customer}
                      </td>
                      <td className={`py-3.5 ${order.rider === 'Not Assigned' ? 'text-amber-600 font-semibold' : 'text-gray-700'}`}>
                        {order.rider}
                      </td>
                      <td className="py-3.5 text-gray-500">📍 {order.pickup}</td>
                      <td className="py-3.5 text-gray-500">📍 {order.destination}</td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'IN TRANSIT' ? 'bg-blue-50 text-blue-700' :
                          order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700' :
                          'bg-amber-50 text-amber-700'
                        }`}>
                          {order.status === 'DELIVERED' ? '✓ ' : '• '} {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs transition-colors flex items-center gap-1 justify-end ml-auto"
                        >
                          View →
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-400">No orders match your search or filter criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 mt-4 border-t border-gray-100 text-xs text-gray-500">
            <p>Showing {filteredOrders.length} of {orders.length} orders • Updated real-time from Hub Gateway</p>
            <div className="flex items-center gap-1 mt-3 sm:mt-0">
              <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>&lt; Previous</button>
              <button className="px-3 py-1 bg-indigo-600 text-white font-semibold rounded-lg">1</button>
              <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Next &gt;</button>
            </div>
          </div>
        </div>

        {/* Bottom Dual Cards: Dispatch Intelligence & Support Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Dispatch Intelligence */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-48 h-32 rounded-2xl bg-indigo-950 overflow-hidden relative shrink-0">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80" alt="Fleet preview" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <span className="text-[10px] text-white font-semibold">Timergara & Dir Route Active</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Dispatch Intelligence</span>
              <h3 className="text-base font-bold text-gray-900 mt-0.5 mb-2">Priority Corridor: Northern Sector</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Direct transit between Mardan and Dir is averaging 42 minutes under estimated delivery window today. Hamza and Bilal are pacing on schedule.
              </p>
              <button 
                onClick={() => alert("Opening live interactive fleet routing map...")}
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
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Support Desk</span>
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Urgent Reroute Support</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Need to reassign parcel DL003 (Sara) from Swat Hub directly to an available courier?
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
            {activeModal === 'create-order' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Create New Delivery Order</h3>
                <p className="text-xs text-gray-500 mb-4">Add a new parcel record into the live regional hub network.</p>
                <div className="space-y-3 mb-6">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Customer Name</label>
                    <input type="text" placeholder="e.g. Tariq Jamil" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-indigo-500" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Pickup Location</label>
                    <input type="text" placeholder="e.g. Mardan Hub" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-indigo-500" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Destination</label>
                    <input type="text" placeholder="e.g. Timergara" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-indigo-500" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={closeModal} className="px-4 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
                  <button onClick={() => { alert("New order created successfully!"); closeModal(); }} className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Save & Dispatch</button>
                </div>
              </div>
            )}

            {activeModal === 'view-order' && selectedOrder && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Order Details: {selectedOrder.id}</h3>
                <p className="text-xs text-indigo-600 font-semibold mb-4">Current Status: {selectedOrder.status}</p>
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs mb-6 border border-gray-100">
                  <p><span className="font-semibold text-gray-500">Customer Name:</span> {selectedOrder.customer}</p>
                  <p><span className="font-semibold text-gray-500">Assigned Courier:</span> {selectedOrder.rider}</p>
                  <p><span className="font-semibold text-gray-500">Pickup Hub:</span> {selectedOrder.pickup}</p>
                  <p><span className="font-semibold text-gray-500">Destination:</span> {selectedOrder.destination}</p>
                </div>
                <div className="flex justify-end">
                  <button onClick={closeModal} className="px-4 py-2 text-xs font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-800">Close Window</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}