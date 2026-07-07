import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Tag, Heart } from 'lucide-react';

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetching products from the database
        const response = await fetch('http://localhost:2000/api/products');
        if (!response.ok) throw new Error('Network error fetching products');
        const data = await response.json();
        console.log(data);
        setProducts(data.data);
        setError(false);
      } catch (err) {
        console.error("Error loading products:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return null; // Graceful hidden layout if data fails to drop in
  }

  return (
    <section className="bg-slate-50 py-12 md:py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
            Featured Products
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-1">
            Explore premium handpicked items directly from our verified inventory catalog.
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 30).map((product) => (
            <div
              key={product._id || product.id}
              className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 hover:border-indigo-100 transition-all duration-300 flex flex-col group relative"
            >
              {/* Top Action Tags */}
              <div className="absolute top-3 inset-x-3 flex justify-between items-center z-10 pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-800 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-100 shadow-sm capitalize">
                  {product.brand || 'Premium'}
                </span>
                <button className="p-2 bg-white/90 hover:bg-indigo-50 rounded-xl border border-slate-100 shadow-sm text-slate-400 hover:text-rose-500 transition-colors pointer-events-auto">
                  <Heart size={16} />
                </button>
              </div>

              {/* Real Product Image Frame from  Database */}
              <div className="w-full aspect-square bg-slate-50 flex items-center justify-center relative overflow-hidden border-b border-slate-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      //  fallback placeholder just in case a seeded image link breaks
                      e.target.onerror = null;
                      e.target.src = "https://unsplash.com";
                    }}
                  />
                ) : (
                  // Fallback block if a product in the database completely lacks an image field
                  <div className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-100 text-3xl flex items-center justify-center text-indigo-400">
                    📦
                  </div>
                )}
              </div>


              {/* Product Content Elements */}
              <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                <div className="space-y-1.5">
                  {/* Category Tracker */}
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block capitalize">
                    {product.category}
                  </span>

                  {/* Product Title */}
                  <h3 className="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </h3>

                  {/* Product Description */}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Rating Display Panel */}
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.floor(product.ratings || 4) ? "currentColor" : "none"}
                        className={i < Math.floor(product.ratings || 4) ? "text-amber-400" : "text-slate-200"}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-500 ml-1">
                    ({product.ratings || '4.0'})
                  </span>
                </div>

                {/* Displaying Embedded Tags dynamically if they exist */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {product.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center gap-0.5 text-[10px] text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-md font-medium">
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Pricing & Add to Cart Frame */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-lg font-extrabold text-slate-900">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <span className={`text-[10px] font-medium ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  <button
                    disabled={product.stock <= 0}
                    className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm shadow-indigo-100"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeatureProducts;
