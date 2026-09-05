import React from 'react';

const CtaSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-transparent to-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden text-white">
          
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Zero setup fees • 14-day free trial
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
              Ready to simplify your deliveries?
            </h2>

            {/* Subtitle */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Join hundreds of local shops and retailers streamlining their dispatch today. Reduce transit friction, delight buyers, and gain total control over fleet costs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button 
                type="button" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                Get Started
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              <button 
                type="button" 
                className="bg-white/10 hover:bg-white/15 text-white border border-white/10 font-medium text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                View Sample Orders
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaSection;