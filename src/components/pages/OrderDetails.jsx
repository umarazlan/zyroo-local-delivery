import React, { useState } from 'react';

export default function OrderDetailsPage() {
  // Working state for order details lookup and timeline interaction
  const [activeTab, setActiveTab] = useState('current');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const allOrders = [
    {
      id: 'DL001',
      customer: 'Ali Khan',
      phone: '+92 300 1234567',
      rider: 'Hamza Malik (Unit #07)',
      pickup: 'Mardan Central Hub',
      destination: 'Timergara Main Bazaar',
      packageDetails: 'Electronics, fragile, 2.4kg',
      status: 'IN TRANSIT',
      date: 'Oct 24, 2024',
      eta: '42 mins remaining',
      timeline: [
        { step: 'Order Placed', time: '10:15 AM', done: true },
        { step: 'Dispatched from Mardan Hub', time: '11:00 AM', done: true },
        { step: 'In Transit via Northern Corridor', time: '11:30 AM', done: true },
        { step: 'Out for Delivery', time: 'Pending', done: false },
        { step: 'Delivered & Signed', time: 'Pending', done: false },
      ],
    },
    {
      id: 'DL003',
      customer: 'Ali Khan',
      phone: '+92 300 1234567',
      rider: 'Not Assigned',
      pickup: 'Mingora, Swat',
      destination: 'Cantt, Mardan',
      packageDetails: 'Documents, 0.5kg',
      status: 'PENDING',
      date: 'Oct 24, 2024',
      eta: 'Awaiting rider',
      timeline: [
        { step: 'Order Placed', time: '09:30 AM', done: true },
        { step: 'Dispatched from Hub', time: 'Pending', done: false },
        { step: 'In Transit', time: 'Pending', done: false },
        { step: 'Out for Delivery', time: 'Pending', done: false },
        { step: 'Delivered & Signed', time: 'Pending', done: false },
      ],
    },
    {
      id: 'DL002',
      customer: 'Ali Khan',
      phone: '+92 300 1234567',
      rider: 'Billal',
      pickup: 'Saddar, Mardan',
      destination: 'Dir City Center',
      packageDetails: 'Clothing, 3kg',
      status: 'DELIVERED',
      date: 'Oct 20, 2024',
      eta: 'Completed',
      timeline: [
        { step: 'Order Placed', time: '09:00 AM', done: true },
        { step: 'Dispatched', time: '09:45 AM', done: true },
        { step: 'In Transit', time: '10:15 AM', done: true },
        { step: 'Out for Delivery', time: '10:45 AM', done: true },
        { step: 'Delivered & Signed', time: '11:15 AM', done: true },
      ],
    },
    {
      id: 'DL000',
      customer: 'Ali Khan',
      phone: '+92 300 1234567',
      rider: 'Tariq',
      pickup: 'GT Road, Mardan',
      destination: 'Peshawar Saddar',
      packageDetails: 'Books, 2kg',
      status: 'DELIVERED',
      date: 'Oct 15, 2024',
      eta: 'Completed',
      timeline: [
        { step: 'Order Placed', time: '08:00 AM', done: true },
        { step: 'Dispatched', time: '08:30 AM', done: true },
        { step: 'In Transit', time: '09:00 AM', done: true },
        { step: 'Out for Delivery', time: '09:45 AM', done: true },
        { step: 'Delivered & Signed', time: '10:30 AM', done: true },
      ],
    },
  ];

  const currentOrders = allOrders.filter(o => o.status === 'IN TRANSIT' || o.status === 'PENDING');
  const previousOrders = allOrders.filter(o => o.status === 'DELIVERED' || o.status === 'CANCELLED');

   return (
    <div className="min-h-screen bg-indigo-50 py-6 px-3 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">My Account</p>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">My Orders</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track your deliveries and view order history.</p>
        </div>

        {!selectedOrder ? (
          <>
            {/* Tabs */}
            <div className="flex gap-1 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-2xs">
              <button
                onClick={() => setActiveTab('current')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${activeTab === 'current' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Current Orders
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === 'current' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {currentOrders.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('previous')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${activeTab === 'previous' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Previous Orders
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === 'previous' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {previousOrders.length}
                </span>
              </button>
            </div>

            {/* Order Cards */}
            <div className="space-y-3">
              {(activeTab === 'current' ? currentOrders : previousOrders).map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 shrink-0">📦</div>
                      <div>
                        <p className="text-xs font-black text-gray-900">{order.id}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{order.date}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                      order.status === 'IN TRANSIT' ? 'bg-blue-50 text-blue-700' :
                      order.status === 'PENDING' ? 'bg-purple-50 text-purple-700' :
                      order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      • {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                      <span className="text-gray-400 font-semibold block mb-0.5">From</span>
                      <span className="text-gray-800 font-semibold">📍 {order.pickup}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                      <span className="text-gray-400 font-semibold block mb-0.5">To</span>
                      <span className="text-gray-800 font-semibold">📍 {order.destination}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                      <span>🏍️</span>
                      <span className={order.rider === 'Not Assigned' ? 'text-amber-600 font-semibold' : ''}>{order.rider}</span>
                      {order.status !== 'DELIVERED' && (
                        <>
                          <span>•</span>
                          <span className="text-indigo-600 font-semibold">{order.eta}</span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}

              {(activeTab === 'current' ? currentOrders : previousOrders).length === 0 && (
                <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-2xs">
                  <p className="text-2xl mb-2">📭</p>
                  <p className="text-sm font-bold text-gray-700">No {activeTab} orders</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {activeTab === 'current' ? 'You have no active deliveries right now.' : 'Your past orders will appear here.'}
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Order Detail View */
          <div className="space-y-4">
            {/* Back Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
            >
              ← Back to My Orders
            </button>

            {/* Detail Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order ID</p>
                  <h2 className="text-xl font-black text-gray-900">{selectedOrder.id}</h2>
                  <p className="text-[11px] text-gray-400 mt-0.5">{selectedOrder.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedOrder.status === 'IN TRANSIT' ? 'bg-blue-50 text-blue-700' :
                  selectedOrder.status === 'PENDING' ? 'bg-purple-50 text-purple-700' :
                  selectedOrder.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  • {selectedOrder.status}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-5">
                {[
                  ['Customer', selectedOrder.customer],
                  ['Phone', selectedOrder.phone],
                  ['Rider', selectedOrder.rider],
                  ['Package', selectedOrder.packageDetails],
                  ['Pickup', '📍 ' + selectedOrder.pickup],
                  ['Delivery', '📍 ' + selectedOrder.destination],
                ].map(([label, value]) => (
                  <div key={label} className="bg-slate-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-gray-400 font-semibold block mb-0.5">{label}</span>
                    <span className={`font-bold ${label === 'Rider' && selectedOrder.rider === 'Not Assigned' ? 'text-amber-600' : 'text-gray-900'}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* ETA Banner */}
              {selectedOrder.status !== 'DELIVERED' && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3 mb-5 flex items-center gap-3">
                  <span className="text-lg">⏱️</span>
                  <div>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Estimated Arrival</p>
                    <p className="text-xs font-bold text-indigo-700">{selectedOrder.eta}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs">
              <h3 className="text-sm font-bold text-gray-900 mb-5">Delivery Timeline</h3>

              <div className="space-y-5 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-100 pl-2">
                {selectedOrder.timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    <span className={`size-3.5 rounded-full mt-0.5 shrink-0 z-10 ring-4 ring-white ${item.done ? 'bg-indigo-600' : 'bg-gray-200'}`}></span>
                    <div className="flex items-center justify-between w-full">
                      <p className={`text-xs font-bold ${item.done ? 'text-gray-900' : 'text-gray-400'}`}>{item.step}</p>
                      <span className={`text-[10px] font-semibold shrink-0 ml-4 ${item.done ? 'text-indigo-600' : 'text-gray-400'}`}>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {selectedOrder.status === 'DELIVERED' && (
                <div className="mt-5 bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 flex items-center gap-3">
                  <span>✅</span>
                  <p className="text-xs font-bold text-emerald-700">Order successfully delivered and signed off.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
