import React, { useState } from 'react';

export default function TrackDeliveryPage() {
  const [trackingNumber, setTrackingNumber] = useState('TRK-9842-NW');
  const [searched, setSearched] = useState(true);
  const [shipment, setShipment] = useState({
    trackingId: 'TRK-9842-NW',
    orderId: 'DL001',
    origin: 'Mardan Central Hub',
    destination: 'Timergara Main Bazaar',
    status: 'IN TRANSIT',
    rider: 'Hamza Malik (Motorbike Unit #07)',
    phone: '+92 300 9876543',
    eta: '42 mins remaining',
    speed: '32 km/h',
    progressSteps: [
      { title: 'Package Picked Up', location: 'Mardan Hub', time: '10:15 AM', completed: true },
      { title: 'Departed Sorting Facility', location: 'Node 4 Corridor', time: '11:00 AM', completed: true },
      { title: 'Cross-County Transit', location: 'Northern Sector Route', time: '11:30 AM', completed: true },
      { title: 'Out for Final Delivery', location: 'Timergara Zone', time: 'Expected ~12:15 PM', completed: false },
      { title: 'Delivered', location: 'Destination Address', time: 'Pending', completed: false }
    ]
  });

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    setSearched(true);
    if (trackingNumber.toUpperCase() === 'TRK-9842-NW') {
      setShipment({
        trackingId: 'TRK-9842-NW',
        orderId: 'DL001',
        origin: 'Mardan Central Hub',
        destination: 'Timergara Main Bazaar',
        status: 'IN TRANSIT',
        rider: 'Hamza Malik (Motorbike Unit #07)',
        phone: '+92 300 9876543',
        eta: '42 mins remaining',
        speed: '32 km/h',
        progressSteps: [
          { title: 'Package Picked Up', location: 'Mardan Hub', time: '10:15 AM', completed: true },
          { title: 'Departed Sorting Facility', location: 'Node 4 Corridor', time: '11:00 AM', completed: true },
          { title: 'Cross-County Transit', location: 'Northern Sector Route', time: '11:30 AM', completed: true },
          { title: 'Out for Final Delivery', location: 'Timergara Zone', time: 'Expected ~12:15 PM', completed: false },
          { title: 'Delivered', location: 'Destination Address', time: 'Pending', completed: false }
        ]
      });
    } else {
      setShipment({
        trackingId: trackingNumber.toUpperCase(),
        orderId: 'DL-CUSTOM',
        origin: 'Peshawar Regional Depot',
        destination: 'Swat Local Terminal',
        status: 'OUT FOR DELIVERY',
        rider: 'Billal Khan (Unit #03)',
        phone: '+92 301 1234567',
        eta: '15 mins remaining',
        speed: '28 km/h',
        progressSteps: [
          { title: 'Package Picked Up', location: 'Peshawar Depot', time: '08:30 AM', completed: true },
          { title: 'In Transit', location: 'Malakand Highway', time: '09:45 AM', completed: true },
          { title: 'Out for Final Delivery', location: 'Swat Terminal', time: '10:30 AM', completed: true },
          { title: 'Delivered', location: 'Destination Address', time: 'Pending', completed: false }
        ]
      });
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 py-6 px-3 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header & Search Bar */}
        <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full inline-block mb-3 backdrop-blur-sm">
              ⚡ Live GPS Telemetry
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Track Your Delivery</h1>
            <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
              Enter your tracking number or consignment reference below to pull real-time corridor telemetry, rider location, and estimated arrival windows.
            </p>

            <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">📦</span>
                <input 
                  type="text" 
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter Tracking ID (e.g. TRK-9842-NW)" 
                  className="w-full pl-10 pr-4 py-3 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-indigo-500 backdrop-blur-sm"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm shrink-0"
              >
                Track Consignment
              </button>
            </form>
          </div>
        </div>

        {searched && shipment && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Live Status & Map Simulation */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Tracking Reference</span>
                    <h2 className="text-xl font-black text-gray-900 mt-0.5">{shipment.trackingId}</h2>
                  </div>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    • {shipment.status}
                  </span>
                </div>

                {/* Corridor Route Visualizer */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 mb-6 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Origin Hub</span>
                      <span className="text-xs font-bold text-gray-900">{shipment.origin}</span>
                    </div>
                    <div className="bg-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                      ⚡ {shipment.speed}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Destination</span>
                      <span className="text-xs font-bold text-gray-900">{shipment.destination}</span>
                    </div>
                  </div>

                  <div className="relative h-6 w-full flex items-center mb-2">
                    <div className="absolute inset-x-0 h-1 bg-indigo-100 rounded-full"></div>
                    <div className="absolute left-1/3 size-3 rounded-full bg-indigo-600 ring-4 ring-indigo-50 animate-pulse"></div>
                  </div>

                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500">In Progress</span>
                    <span className="text-indigo-600">ETA: {shipment.eta}</span>
                  </div>
                </div>

                {/* Assigned Rider Contact Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      HM
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{shipment.rider}</p>
                      <p className="text-[11px] text-gray-500">Verified Courier Partner • On Schedule</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Calling courier partner at ${shipment.phone}...`)}
                    className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
                  >
                    📞 Call Rider
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Detailed Progress Stepper */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-6">Checkpoint History</h3>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-100 pl-2">
                  {shipment.progressSteps.map((step, index) => (
                    <div key={index} className="relative flex items-start gap-4">
                      <span className={`size-3 rounded-full mt-1 shrink-0 z-10 ring-4 ring-white ${
                        step.completed ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}></span>
                      <div>
                        <p className={`text-xs font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</p>
                        <p className="text-[11px] text-indigo-600 font-medium">{step.location}</p>
                        <p className="text-[10px] text-gray-400">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-xs">
                <p className="font-bold text-emerald-900 mb-1">🛡️ Fully Insured Dispatch</p>
                <p className="text-emerald-700 text-[11px] leading-relaxed">
                  This parcel is backed by Zyroo's 100% custody guarantee from Mardan sorting terminals to the final doorstep.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}