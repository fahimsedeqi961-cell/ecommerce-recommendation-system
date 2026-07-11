import { useState, useEffect } from 'react';
import { Smartphone, Gamepad2, Sofa, Flower2, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

const FeaturedCategories = ({ activeCategory, setActiveCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Safely map specific lucide icons to your exact backend category strings
  const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('phone') || name.includes('electronic')) return <Smartphone size={28} />;
    if (name.includes('gaming') || name.includes('wearable')) return <Gamepad2 size={28} />;
    if (name.includes('furniture') || name.includes('home')) return <Sofa size={28} />;
    if (name.includes('beauty') || name.includes('skin')) return <Flower2 size={28} />;
    if (name.includes('fragran') || name.includes('perfume')) return <Sparkles size={28} />;
    return <ShoppingBag size={28} />; // Clean global fallback
  };

  useEffect(() => {
    const extractCategoriesFromProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:2000/api/products');
        if (!response.ok) throw new Error('Failed to fetch data');

        const resJson = await response.json();
        const products = resJson.data || [];

        // 1. Collect unique category names from  live seeded products array
        const uniqueCategoryNames = [...new Set(products.map(product => product.category))].filter(Boolean);

        // 2. Format database parameters with automated item tally counts
        const formattedCategories = uniqueCategoryNames.map((catName, index) => {
          const count = products.filter(p => p.category === catName).length;
          return {
            id: index,
            name: catName,
            productCount: count
          };
        });

        setCategories(formattedCategories);
      } catch (err) {
        console.error("Database connection error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    extractCategoriesFromProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center h-48">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || categories.length === 0) return null;

  return (
    <section className="bg-white py-12 md:py-16" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-left">
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

        {/* Dynamic Connected Grid System */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 8).map((category) => (
            <div
              key={category.id}
              onClick={() => {
                // If you click an active category, it clears the filter. Otherwise, it updates it.
                if (activeCategory === category.name) {
                  setActiveCategory('');
                } else {
                  setActiveCategory(category.name);
                }
              }}
              className={`group border rounded-2xl p-5 sm:p-6 bg-white hover:shadow-lg hover:shadow-indigo-50/50 transition-all duration-300 cursor-pointer flex flex-col items-center lg:items-start text-center lg:text-left ${activeCategory === category.name
                ? 'border-indigo-600 ring-2 ring-indigo-500/15 shadow-md bg-indigo-50/10'
                : 'border-slate-100 hover:border-indigo-100'
                }`}
            >
              {/* Icon Bubble */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${activeCategory === category.name
                ? 'bg-indigo-600 text-white border-indigo-700'
                : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                }`}>
                {getCategoryIcon(category.name)}
              </div>

              {/* Text Info */}
              <h3 className="font-semibold text-slate-800 text-base sm:text-lg mt-4 group-hover:text-indigo-600 transition-colors capitalize">
                {category.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {category.productCount} {category.productCount === 1 ? 'Item' : 'Items'}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCategories;
