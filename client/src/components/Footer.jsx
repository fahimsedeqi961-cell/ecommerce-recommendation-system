import { Mail, Code, UserCheck, ArrowUpRight, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Top Section: Modern Newsletter Input Frame */}

        <div className="relative bg-gradient-to-r from-indigo-900 to-indigo-950 rounded-2xl p-6 md:p-10 overflow-hidden shadow-xl border border-indigo-800/40 mb-12">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-6 text-left space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight sm:text-2xl flex items-center gap-2">
                <Sparkles size={20} className="text-indigo-400" />
                Stay Updated with Smart Deals
              </h3>
              <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                Join our newsletter to receive curated catalog updates and seasonal recommendations directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-6 w-full">
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-slate-950/60 border border-slate-700/60 focus:border-indigo-500 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    required
                  />
                  <Mail className="absolute left-4 top-3.5 text-slate-500" size={16} />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all text-white font-medium text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/20 whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section: Organized Link Infrastructure */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/60 text-left">

          {/* Brand Presentation Column */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Sparkles size={16} />
              </div>
              <span className="font-bold text-lg tracking-tight">SmartShop</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs text-slate-400">
              An intelligent full-stack e-commerce environment optimizing dataset retrieval routines and structured schema structures.
            </p>
          </div>

          {/* Catalog Operations Links */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="hover:text-indigo-400 transition-colors">All Products</a></li>
              <li><a href="#categories" className="hover:text-indigo-400 transition-colors">Featured Categories</a></li>
              <li><a href="#offers" className="hover:text-indigo-400 transition-colors">Trending Bundles</a></li>
            </ul>
          </div>

          {/* Academic Info / Platform Core Links */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Project Scope</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#architecture" className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1">Backend Stack <ArrowUpRight size={12} /></a></li>
              <li><a href="#database" className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1">Schema Model <ArrowUpRight size={12} /></a></li>
              <li><a href="#cors" className="hover:text-indigo-400 transition-colors">CORS Handshake</a></li>
            </ul>
          </div>

          {/* Dev Engineering Details */}
          <div className="col-span-2 md:col-span-2 space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Engineering</h4>
            <div className="flex gap-3 text-slate-400">
              <a href="#github" className="p-2 bg-slate-800/40 hover:bg-indigo-900/40 hover:text-indigo-400 border border-slate-800 rounded-xl transition-colors">
                <Code size={16} />
              </a>
              <a href="#linkedin" className="p-2 bg-slate-800/40 hover:bg-indigo-900/40 hover:text-indigo-400 border border-slate-800 rounded-xl transition-colors">
                <UserCheck size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} SmartShop Client Engine. Developed for Academic Submission Protocol.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Protocol</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Framework Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
