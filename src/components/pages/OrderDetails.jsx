import React, { useState } from 'react';

export default function OrderDetailsPage() {
  // Working state for order details lookup and timeline interaction
  const [searchId, setSearchId] = useState('DL001');
  const [currentOrder, setCurrentOrder] = useState({
    id: 'DL001',
    customer: 'Ali Khan',
    phone: '+92 300 1234567',
    rider: 'Hamza Malik (Unit #07)',
    pickup: 'Mardan Central Hub',
    destination: 'Timergara Main Bazaar',
    status: 'IN TRANSIT',
    eta: '42 mins remaining',
    weight: '2.4 kg',
    codAmount: 'Rs. 3,450',
    timeline: [
      { step: 'Order Placed', time: '10:15 AM', done: true },
      { step: 'Dispatched from Mardan Hub', time: '11:00 AM', done: true },
      { step: 'In Transit via Northern Corridor', time: '11:30 AM', done: true },
      { step: 'Out for Delivery', time: 'Pending', done: false },
      { step: 'Delivered & Signed', time: 'Pending', done: false }
    ]
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate lookup between sample orders
    if (searchId.toUpperCase() === 'DL002') {
      setCurrentOrder({
        id: 'DL002',
        customer: 'Ahmed',
        phone: '+92 301 9876543',
        rider: 'Billal',
        pickup: 'Mardan Central Hub',
        destination: 'Dir City Center',
        status: 'DELIVERED',
        eta: 'Completed',
        weight: '1.1 kg',
        codAmount: 'Rs. 1,200',
        timeline: [
          { step: 'Order Placed', time: '09:00 AM', done: true },
          { step: 'Dispatched', time: '09:45 AM', done: true },
          { step: 'In Transit', time: '10:15 AM', done: true },
          { step: 'Out for Delivery', time: '10:45 AM', done: true },
          { step: 'Delivered & Signed', time: '11:15 AM', done: true }
        ]
      });
    } else {
      alert(`Loaded details for ${searchId.toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 py-6 px-3 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header & Quick Lookup */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Manifest Telemetry</p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">Order Details</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Deep-dive into granular tracking logs, customer profiles, and custody history.</p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
            <input 
              type="text" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Order ID (e.g. DL001)" 
              className="px-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:outline-indigo-500 bg-gray-50/50 w-full sm:w-48"
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm shrink-0">
              Lookup ID
            </button>
          </form>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Order Summary & Meta Info */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Active Manifest Record</span>
                  <h2 className="text-xl font-black text-gray-900 mt-1">{currentOrder.id}</h2>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  currentOrder.status === 'IN TRANSIT' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  • {currentOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-gray-100 mb-6">
                <div>
                  <span className="text-gray-400 font-semibold block mb-0.5">Customer</span>
                  <p className="font-bold text-gray-900">{currentOrder.customer}</p>
                  <p className="text-gray-500 text-[11px]">{currentOrder.phone}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block mb-0.5">Assigned Rider</span>
                  <p className="font-bold text-gray-900">{currentOrder.rider}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block mb-0.5">Pickup Origin</span>
                  <p className="font-bold text-gray-900">📍 {currentOrder.pickup}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block mb-0.5">Destination Hub</span>
                  <p className="font-bold text-gray-900">📍 {currentOrder.destination}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Estimated ETA</span>
                  <span className="text-xs font-bold text-indigo-600">{currentOrder.eta}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Parcel Weight</span>
                  <span className="text-xs font-bold text-gray-900">{currentOrder.weight}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">COD Balance</span>
                  <span className="text-xs font-bold text-emerald-600">{currentOrder.codAmount}</span>
                </div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold text-gray-700">Quick Administrative Actions:</span>
              <div className="flex items-center gap-2">
                <button onClick={() => alert(`Printing waybill for ${currentOrder.id}...`)} className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                  🖨️ Print Waybill
                </button>
                <button onClick={() => alert(`SMS tracking link sent to ${currentOrder.customer}`)} className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                  📱 Resend SMS Alert
                </button>
                <button onClick={() => alert("Redirecting to support escalation log...")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-sm">
                  Support Ticket
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Live Telemetry Timeline */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-gray-900">Custody Timeline</h3>
                <span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">Real-time GPS Logs</span>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-100 pl-2">
                {currentOrder.timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    <span className={`size-3 rounded-full mt-1 shrink-0 z-10 ring-4 ring-white ${
                      item.done ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}></span>
                    <div>
                      <p className={`text-xs font-bold ${item.done ? 'text-gray-900' : 'text-gray-400'}`}>{item.step}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 text-xs">
              <p className="font-bold text-indigo-900 mb-1">🔐 Secure Chain of Custody</p>
              <p className="text-indigo-700 leading-relaxed text-[11px]">
                All waypoint updates are cryptographically hashed and verified against regional hub checkpoints.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}