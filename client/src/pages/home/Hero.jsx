import { ArrowRight, Sparkles, Laptop, Shirt, ShoppingBag } from 'lucide-react';

const Hero = () => {
  // Simple static array for upcoming personalization feature
  const categories = [
    { id: 1, name: 'Electronics', icon: <Laptop size={16} /> },
    { id: 2, name: 'Fashion', icon: <Shirt size={16} /> },
    { id: 3, name: 'Essentials', icon: <ShoppingBag size={16} /> },
  ];

  return (
    <div className="relative bg-slate-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">

            {/* Simple AI/Smart Tag placeholder */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mx-auto lg:mx-0">
              <Sparkles size={14} className="animate-pulse" />
              <span>Smart Shopping Made Simple</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Discover Products <br />
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Tailored To Your Vibe
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              Explore a curated marketplace designed to find exactly what you need. Fast shipping, secure checkout, and a seamless shopping experience.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 group">
                <span>Shop Collection</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center">
                Browse Deals
              </button>
            </div>

            {/* Simple Dynamic Chip Placement (Great hook for your future algorithms!) */}
            <div className="pt-6 space-y-3">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase block">
                Popular Categories
              </span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-indigo-500 rounded-lg text-sm text-slate-600 hover:text-indigo-600 transition-colors shadow-sm"
                  >
                    {cat.icon}
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-2xl shadow-xl overflow-hidden group">

              {/* Clean abstract layout representing a premium product frame */}
              <div className="absolute inset-4 border border-white/20 rounded-xl flex flex-col justify-between p-6 text-white backdrop-blur-[2px]">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-1 rounded">
                    New Arrival
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs">
                    ★
                  </div>
                </div>

                {/* Fallback geometric illustration so you don't break on missing local image files */}
                <div className="my-auto flex flex-col items-center justify-center text-center opacity-80 space-y-2">
                  <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl shadow-inner">
                    📦
                  </div>
                  <span className="text-sm font-medium tracking-wide">Premium Workspace Gear</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">Minimalist Setup Pack</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Starting at $49.00</span>
                    <span className="text-xs underline cursor-pointer hover:text-indigo-200">Quick View</span>
                  </div>
                </div>
              </div>

              {/* Decorative moving shine pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
