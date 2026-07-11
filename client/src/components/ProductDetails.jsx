import { X, Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = ({ product, onClose }) => {
  const { addToCart } = useCart();

  // Handle clicking outside the main window layout to close out gracefully
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible animate-in zoom-in-95 duration-200">

        {/* Close Escape Action Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left Aspect: Display Large High-Resolution Image (5 Columns) */}
        <div className="md:col-span-5 bg-slate-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-100">
          <div className="w-full aspect-square max-w-sm rounded-2xl overflow-hidden shadow-sm bg-white">
            <img
              src={product.image?.[0] || "https://unsplash.com"}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Aspect: Detailed Schema Information Panel (7 Columns) */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6">

          <div className="space-y-4">
            {/* Category and Brand Traces */}
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

            {/* Title & Description */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {product.title}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Star Ratings Component Block */}
            <div className="flex items-center gap-1.5 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.ratings || 4) ? "currentColor" : "none"}
                    className="text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">{product.ratings || '4.0'}</span>
              <span className="text-xs text-slate-400 font-medium">/ 5.0 Database Rating</span>
            </div>

            {/* Dynamic Tags Badges Array */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg capitalize">
                    <Tag size={12} className="text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Lower Section: Pricing Matrix and Checkout Intercepts */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-baseline justify-between">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-900">
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className={`text-xs font-semibold mt-1 ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {product.stock > 0 ? `● ${product.stock} items left in stock` : '○ Out of stock'}
                </span>
              </div>
            </div>

            {/* Add to Cart Core Execution Button */}
            <button
              onClick={() => {
                addToCart(product);
                onClose(); // Automatically exit modal frame on success
              }}
              disabled={product.stock <= 0}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 group disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
              <span>Add This Selection to Cart</span>
            </button>

            {/* Trust Badges Minimalist Layout Row */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2 text-[10px] sm:text-xs text-slate-400">
              <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl">
                <Truck size={14} className="text-slate-500" />
                <span>Express Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl">
                <ShieldCheck size={14} className="text-slate-500" />
                <span>Verified Stock</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl">
                <RotateCcw size={14} className="text-slate-500" />
                <span>Easy Returns</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
