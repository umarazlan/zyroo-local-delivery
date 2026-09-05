import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-indigo-50 from-transparent to-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs mb-4">
            PLATFORM CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
            Everything you need to manage local deliveries
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Built for seamless communication between warehouse staff, retail partners, and couriers on the ground.
          </p>
        </div>

        {/* 3 Main Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Manage Orders */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Orders</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Keep all your delivery orders organized in one place. Instant bulk CSV Import, auto-categorization, and rapid status transitions without manual spreadsheets.
              </p>
            </div>
            <div className="mt-6 bg-slate-50/80 border border-gray-100 rounded-2xl p-3.5 flex items-center justify-between text-xs font-medium text-gray-700">
              <span>Auto-Batching Active</span>
              <span className="size-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">✓</span>
            </div>
          </div>

          {/* Card 2: Track Deliveries */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5 3.75H9.75A2.25 2.25 0 0 1 7.5 18.75V5.25A2.25 2.25 0 0 1 9.75 3h4.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 14.25 21Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Track Deliveries</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                See the current status of every delivery at a glance. Pinpoint riders on a clean interactive map, share live SMS tracking with customers, and mitigate delays.
              </p>
            </div>
            <div className="mt-6 bg-slate-50/80 border border-gray-100 rounded-2xl p-3.5 flex items-center justify-between text-xs font-medium text-gray-700">
              <span>Live GPS Feed</span>
              <span className="size-2 rounded-full bg-indigo-600 animate-pulse"></span>
            </div>
          </div>

          {/* Card 3: Manage Riders */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="size-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Riders</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Assign orders to riders and keep deliveries moving. Monitor active shifts, evaluate completion velocities, and ensure transparent payout tracking for your team.
              </p>
            </div>
            <div className="mt-6 bg-slate-50/80 border border-gray-100 rounded-2xl p-3.5 flex items-center justify-between text-xs font-medium text-gray-700">
              <span>Smart Load Balancing</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4 text-emerald-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 12h9.75m-9.75 6h9.75M3.75 6h.008v.008H3.75V6Zm0 6h.008v.008H3.75V12Zm0 6h.008v.008H3.75V18Z" />
              </svg>
            </div>
          </div>

        </div>

        {/* Bottom Banner Card: Simple Deployment */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-block text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
              SIMPLE DEPLOYMENT
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
              Up and running in under 5 minutes
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Zero complex hardware or proprietary terminals required. Riders use their standard mobile devices, and managers run dispatch directly inside any web browser.
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex items-center gap-3 sm:gap-6 w-full lg:w-auto justify-center">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="size-9 rounded-full bg-gray-100 text-gray-600 font-bold text-xs flex items-center justify-center mb-1">
                1
              </div>
              <span className="text-[11px] text-gray-500 font-medium">Upload Orders</span>
            </div>

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="size-9 rounded-full bg-gray-100 text-gray-600 font-bold text-xs flex items-center justify-center mb-1">
                2
              </div>
              <span className="text-[11px] text-gray-500 font-medium">1-Tap Assign</span>
            </div>

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="size-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-1 shadow-sm">
                3
              </div>
              <span className="text-[11px] font-bold text-gray-900">Delivered</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;