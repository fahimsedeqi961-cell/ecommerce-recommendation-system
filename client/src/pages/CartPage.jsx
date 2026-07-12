import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, incrementQuantity, decrementQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  // Simple hardcoded values for a standard e-commerce pipeline
  const shippingFee = cartTotal > 100 || cartTotal === 0 ? 0 : 10;
  const estimatedTax = cartTotal * 0.08; // 8% Tax rate calculation
  const grandTotal = cartTotal + shippingFee + estimatedTax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-md w-full text-center shadow-xl shadow-slate-200/50 space-y-6">
          <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto">
            <ShoppingBag size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Your Cart is Empty</h2>
            <p className="text-sm text-slate-500">Looks like you haven't added anything to your cart yet. Explore our dynamic marketplace collections!</p>
          </div>
          <Link to="/" className="inline-flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-3.5 rounded-xl transition-all shadow-md shadow-indigo-100 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Marketplace</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 text-left">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">Shopping Cart</h1>
            <p className="text-sm text-slate-500 mt-1">Review and manage your pending purchase selections.</p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100/80 rounded-xl transition-colors"
          >
            <Trash2 size={14} />
            <span>Clear Entire Cart</span>
          </button>
        </div>

        {/* Split Main Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Block: List of Items (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-white border border-slate-200/60 rounded-2xl p-4 flex gap-4 items-center relative group"
              >
                {/* Item Thumbnail Frame */}
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.image?.[0] || "https://unsplash.com"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details Column Block */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center text-left">
                  <div className="sm:col-span-6 space-y-1">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block capitalize">{item.category}</span>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-400 capitalize">Brand: {item.brand || 'Generic'}</p>
                  </div>

                  {/* Quantity Adjustment Node Matrix */}
                  <div className="sm:col-span-3 flex items-center justify-start sm:justify-center">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50/50 p-1">
                      <button
                        onClick={() => decrementQuantity(item)}
                        className="p-1.5 hover:bg-white text-slate-500 rounded-lg transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item)}
                        disabled={item.quantity >= item.stock}
                        className="p-1.5 hover:bg-white text-slate-500 rounded-lg disabled:opacity-30 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Item Net Price Calculation Output */}
                  <div className="sm:col-span-3 text-left sm:text-right">
                    <span className="font-extrabold text-slate-900 text-base sm:text-lg block">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">${Number(item.price).toFixed(2)} each</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Right Block: Summary / Pricing Panel (4 Columns) */}
          <div className="lg:col-span-4 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm text-left space-y-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Order Summary</h2>

            {/* Calculation Breakdowns */}
            <div className="space-y-3 text-sm text-slate-600 border-b border-slate-100 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-slate-800">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-semibold text-slate-800">
                  {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              {shippingFee > 0 && (
                <p className="text-[11px] text-slate-400 italic">Add ${(100 - cartTotal).toFixed(2)} more for free shipping!</p>
              )}
            </div>

            {/* Total Balance Outputs */}
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-base font-bold text-slate-900">Grand Total</span>
              <span className="text-2xl font-black text-indigo-600">${grandTotal.toFixed(2)}</span>
            </div>

            {/* Checkout Interface Actions */}
            <button
              onClick={() => navigate("/checkout-success")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-4 rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 group">
              <CreditCard size={18} />
              <span>Proceed to Secure Checkout</span>
            </button>

            <Link to="/" className="block text-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors pt-1">
              Continue Shopping
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CartPage;
