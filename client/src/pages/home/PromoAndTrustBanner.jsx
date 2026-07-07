import { Sparkles, ArrowRight, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

const PromoAndTrustBanner = () => {
  return (
    <section className="bg-white py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Modern Interactive Showcase Split Banner */}
        <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl overflow-hidden p-8 md:p-12 shadow-xl shadow-indigo-950/10">
          {/* Decorative Abstract Vectors */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-15 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content Column */}
            <div className="md:col-span-7 text-left space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-indigo-300 text-xs font-semibold tracking-wider uppercase border border-white/5">
                <Sparkles size={12} className="text-indigo-400" />
                <span>Smart Bundle Offer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Upgrade Your Routine with Our <br />
                <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-blue-300 bg-clip-text text-transparent">
                  Top-Rated Collections
                </span>
              </h3>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                Unlock exclusive deals compiled automatically based on active community feedback loops and highest verification ratings.
              </p>
              <div className="pt-2">
                <button className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 group">
                  <span>Explore Smart Packs</span>
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Abstract Visual Grid Block */}
            <div className="md:col-span-5 grid grid-cols-2 gap-3">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm space-y-1 text-left">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide block">Beauty</span>
                <span className="text-white font-semibold text-sm block">94% Return Match</span>
                <p className="text-slate-400 text-[11px] leading-tight mt-1">High retention ratings across local buyers.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm space-y-1 text-left translate-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block">Groceries</span>
                <span className="text-white font-semibold text-sm block">Fresh Picked</span>
                <p className="text-slate-400 text-[11px] leading-tight mt-1">Hand-delivered daily source fulfillment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Marketplace Service Values Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div className="text-left space-y-0.5">
              <h4 className="font-bold text-slate-800 text-sm">Secure Framework</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Encrypted cookies protect your token profiles safely.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Zap size={22} />
            </div>
            <div className="text-left space-y-0.5">
              <h4 className="font-bold text-slate-800 text-sm">Optimized Fetching</h4>
              <p className="text-xs text-slate-500 leading-relaxed">CORS enabled routes process database items smoothly.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <RefreshCw size={22} />
            </div>
            <div className="text-left space-y-0.5">
              <h4 className="font-bold text-slate-800 text-sm">Flexible Restock</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Inventory levels hook live into schema attributes.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PromoAndTrustBanner;
