import React from 'react';

const StatsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-transparent to-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-50/40 border border-indigo-100/60 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Active Drivers */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100/80 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Drivers</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight mt-2">128</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                </svg>
                <span>+14% this week</span>
              </div>
            </div>

            {/* Card 2: Daily Dispatches */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100/80 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Daily Dispatches</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight mt-2">1,840</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                </svg>
                <span>98.8% completed</span>
              </div>
            </div>

            {/* Card 3: Avg Transit Duration */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100/80 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Transit Duration</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight mt-2">26m</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 mt-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <span>Optimal routing</span>
              </div>
            </div>

            {/* Card 4: Customer Satisfaction */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer Satisfaction</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight mt-2">4.9 / 5</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500 mt-4">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-500">Based on 3.4k ratings</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;