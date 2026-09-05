import React from 'react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 bg-indigo-50 from-transparent to-white/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Stats */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
              <span className="size-2 rounded-full bg-indigo-600 animate-pulse"></span>
              LIVE FLEET OPERATIONS
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.1]">
              Local Delivery, <br />
              <span className="text-indigo-600">Managed Simply.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Manage orders, assign riders, and track local deliveries from one simple platform. Built specifically for bustling local markets, retail merchants, and regional logistics hubs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                type="button" 
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                Get Started
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              <button 
                type="button" 
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-medium text-sm px-6 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4 text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Track a Delivery
              </button>
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200/60 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">99.4%</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">On-time rate</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">&lt; 14 min</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Avg assignment</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">450+</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Local retailers</p>
              </div>
            </div>

          </div>

          {/* Right Column: Dashboard Card UI Mockup */}
          <div className="lg:col-span-6 relative">
            
            {/* Main Console Container */}
            <div className="bg-white rounded p-5 sm:p-6 shadow-2xl relative">
              
              {/* Console Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-6m6-15H8.25m3 0h3m-3 0V3.75m0 0H6.375a1.125 1.125 0 0 0-1.125 1.125v10.5m12-10.5v10.5" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-gray-900 leading-tight">Active Dispatch Console</h2>
                    <p className="text-xs text-gray-500">Real-time express routing</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  ACTIVE MONITOR
                </div>
              </div>

              {/* Routing Map Simulation Card */}
              <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100 relative overflow-hidden mb-4">
                <div className="flex items-center justify-between mb-8">
                  {/* Origin Hub */}
                  <div className="bg-white px-3.5 py-2 rounded-xl shadow-xs border border-gray-100 flex items-center gap-2.5">
                    <span className="size-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-50"></span>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Origin Hub</p>
                      <p className="text-xs font-bold text-gray-900">Mardan</p>
                    </div>
                  </div>

                  {/* Speed Indicator Badge */}
                  <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-6m6-15H8.25m3 0h3m-3 0V3.75m0 0H6.375a1.125 1.125 0 0 0-1.125 1.125v10.5m12-10.5v10.5" />
                    </svg>
                    32 km/h
                  </div>

                  {/* Destination Hub */}
                  <div className="bg-white px-3.5 py-2 rounded-xl shadow-xs border border-gray-100 flex items-center gap-2.5">
                    <span className="size-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></span>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Destination</p>
                      <p className="text-xs font-bold text-gray-900">Timergara</p>
                    </div>
                  </div>
                </div>

                {/* SVG Route Line Curve */}
                <div className="relative h-10 w-full mb-2">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 40">
                    <path d="M 10 35 Q 150 0 290 10" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                </div>

                {/* Tracking Code and ETA */}
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="bg-white px-2.5 py-1 rounded-md font-mono text-[11px] text-gray-600 border border-gray-200/60 shadow-2xs">
                    TRK-9842-NW
                  </span>
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-semibold">
                    ETA: 42 mins remaining
                  </span>
                </div>
              </div>

              {/* Assigned Rider Info Card */}
              <div className="bg-slate-50/80 rounded-2xl p-4 border border-gray-100 flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative size-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    HM
                    <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-gray-900">Hamza Malik</p>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-blue-500">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.49 4.49 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.49 4.49 0 0 1-1.307 3.497 4.49 4.49 0 0 1-3.497 1.307 4.49 4.49 0 0 1-3.397 1.549 4.49 4.49 0 0 1-3.498-1.307 4.49 4.49 0 0 1-1.307-3.497A4.49 4.49 0 0 1 2.25 12a4.49 4.49 0 0 1 1.549-3.397 4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-[11px] text-gray-500">Assigned Rider • Motorbike Unit #07</p>
                  </div>
                </div>
                <span className="bg-indigo-50 text-indigo-700 font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-lg uppercase">
                  IN TRANSIT
                </span>
              </div>

              {/* Bottom Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-gray-100 flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Consignment</p>
                    <p className="text-xs font-bold text-gray-900">Medical Supplies (3x)</p>
                  </div>
                </div>

                <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-gray-100 flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Dispatch SLA</p>
                    <p className="text-xs font-bold text-gray-900">Ahead of Target</p>
                  </div>
                </div>
              </div>

              {/* Floating Insured Badge overlay */}
              <div className="absolute -bottom-8 left-6 bg-white rounded-xl p-3 shadow-xl border border-gray-200 flex items-center gap-3">
                <div className="size-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">100% Insured</p>
                  <p className="text-[10px] text-gray-500">End-to-end custody transfer</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;