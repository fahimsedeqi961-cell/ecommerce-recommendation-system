import { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [recommendations, setRecommendations] = useState([]);
  const [recLoading, setRecLoading] = useState(true);

  // 1. Fetch Dynamic Backend Recommendations on Modal Initialization
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setRecLoading(true);
        const productId = product._id || product.id;

        const response = await fetch(`http://localhost:2000/api/products/recommendations/${productId}`);
        const resJson = await response.json();

        if (resJson.success) {
          setRecommendations(resJson.data || []);
        }
      } catch (err) {
        console.error("Error collecting product engine recommendations:", err);
      } finally {
        setRecLoading(false);
      }
    };

    fetchRecommendations();
  }, [product]); // Refetches instantly if the user switches to a recommended product

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Increased max-width layout to accommodate the smart recommendation row cleanly */}
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">

        {/* Close Escape Action Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        {/* Scrollable Container Wrapper */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-grow">

          {/* Main Top Grid Aspect (Image & Content) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

            {/* Left Image Column (5 Cols) */}
            <div className="md:col-span-5 bg-slate-50 flex items-center justify-center p-4 rounded-2xl border border-slate-100">
              <div className="w-full aspect-square max-w-sm rounded-xl overflow-hidden shadow-sm bg-white">
                <img
                  src={product.image?.[0] || "https://unsplash.com"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Schema Details Column (7 Cols) */}
            <div className="md:col-span-7 text-left space-y-5">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center text-xs">
                  <span className="font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-md capitalize">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="text-slate-400 font-medium">
                      Brand: <strong className="text-slate-700">{product.brand}</strong>
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {product.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center gap-1.5 pt-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill={i < Math.floor(product.ratings || 4) ? "currentColor" : "none"} className="text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-800">{product.ratings}</span>
                  <span className="text-xs text-slate-400 font-medium">/ 5.0 Database Rating</span>
                </div>
              </div>

              {/* Pricing & Cart Action Block */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-900">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <span className={`text-xs font-semibold mt-1 ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {product.stock > 0 ? `● ${product.stock} items left in stock` : '○ Out of stock'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  disabled={product.stock <= 0}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 group disabled:bg-slate-200 disabled:text-slate-400"
                >
                  <ShoppingCart size={18} />
                  <span>Add This Selection to Cart</span>
                </button>
              </div>

            </div>
          </div>

          {/* DYNAMIC SMART RECOMMENDATIONS ROW (Frequently Bought Together) */}
          <div className="pt-6 border-t border-slate-100 text-left space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-50 p-1.5 rounded-lg text-indigo-600 border border-indigo-100">
                <Sparkles size={16} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Frequently Bought Together</h3>
                <p className="text-xs text-slate-400">Smart product recommendations matching current consumer transaction logs.</p>
              </div>
            </div>

            {recLoading ? (
              // Mini Shimmer Loading Spinner 
              <div className="flex justify-center items-center h-24">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : recommendations.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl text-center">Training data algorithms. Fallback thresholds processing complete layout.</p>
            ) : (
              // 4-Column Mini Grid for Recommendation Cards
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recommendations.slice(0, 4).map((recProd) => (
                  <div
                    key={recProd._id || recProd.id}
                    className="border border-slate-200/60 rounded-xl p-3 bg-white flex flex-col justify-between hover:shadow-md transition-all group relative"
                  >
                    <div className="space-y-2">
                      {/* Image frame */}
                      <div className="w-full aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center">
                        <img
                          src={recProd.image?.[0]}
                          alt={recProd.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Details text */}
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-slate-800 text-xs truncate group-hover:text-indigo-600 transition-colors">
                          {recProd.title}
                        </h4>
                        <span className="text-[11px] font-extrabold text-slate-900 block">
                          ${Number(recProd.price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Instant Cart Inline Mini Button */}
                    <button
                      onClick={() => {
                        addToCart(recProd);
                        onClose();
                      }}
                      className="mt-2.5 w-full bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200/80 hover:border-indigo-100 rounded-lg py-1.5 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingCart size={12} />
                      <span>Quick Add</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
