import { Smartphone, Laptop, Watch, Gamepad2, ArrowRight } from 'lucide-react';

const FeaturedCategories = () => {
  // Simple static array for your frontend demonstration
  const categories = [
    { id: 1, name: 'Smartphones', count: '120+ Items', icon: <Smartphone size={28} />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 2, name: 'Laptops', count: '80+ Items', icon: <Laptop size={28} />, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { id: 3, name: 'Wearables', count: '45+ Items', icon: <Watch size={28} />, color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { id: 4, name: 'Gaming Gear', count: '60+ Items', icon: <Gamepad2 size={28} />, color: 'bg-pink-50 text-pink-600 border-pink-100' },
  ];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
              Browse by Category
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1">
              Find exactly what you're looking for across our top collections.
            </p>
          </div>
          <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group self-start sm:self-auto">
            <span>View All Categories</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group border border-slate-100 rounded-2xl p-5 sm:p-6 bg-white hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50/50 transition-all duration-300 cursor-pointer flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* Icon Bubble */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${category.color} group-hover:scale-105 transition-transform duration-300`}>
                {category.icon}
              </div>

              {/* Text Info */}
              <h3 className="font-semibold text-slate-800 text-base sm:text-lg mt-4 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {category.count}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCategories;
