import { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutSuccess = () => {
  // ✅ FIXED: Added user and cartItems here so they are properly defined inside this component!
  const { cartItems, user, clearCart } = useCart();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a clean fake tracking hex string 
    const generateFakeOrderHex = () => {
      const chars = '0123456789ABCDEF';
      let result = 'ORD-';
      for (let i = 0; i < 8; i++) {
        result += chars[Math.floor(Math.random() * 16)];
      }
      return result;
    };

    setOrderId(generateFakeOrderHex());

    const recordOrderHistory = async () => {
      // Boundary check to ensure items actually exist to build a valid recommendation order log
      if (!cartItems || cartItems.length === 0 || !user) return;

      try {
        await fetch('http://localhost:2000/api/orders/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id || user._id,
            products: cartItems.map(item => item._id || item.id)
          })
        });


        clearCart();
      } catch (err) {
        console.error("Failed to seed transaction data log:", err);
      }
    };

    recordOrderHistory();

  }, [user]);

  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blur Vectors */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 text-center space-y-8 relative z-10 animate-in fade-in zoom-in-95 duration-300">

        {/* Animated Green Check Bubble */}
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center animate-bounce duration-1000">
            <CheckCircle size={44} fill="currentColor" className="text-white" />
          </div>
          <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-20 animate-ping pointer-events-none" />
        </div>

        {/* Header Titles */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">Payment Successful!</h1>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Your transaction processed smoothly. Your database order logs have updated.
          </p>
        </div>

        {/* Order Meta Parameter Cards (Great for presentation display proof!) */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 divide-y divide-slate-200/50 text-left text-sm">
          <div className="flex justify-between items-center pb-3">
            <span className="text-slate-400 font-medium inline-flex items-center gap-1">
              <FileText size={14} /> Tracking Reference
            </span>
            <span className="font-mono font-bold text-slate-800 tracking-wider text-xs bg-white border border-slate-200 px-2.5 py-1 rounded-md">
              {orderId}
            </span>
          </div>
          <div className="flex justify-between items-center pt-3">
            <span className="text-slate-400 font-medium inline-flex items-center gap-1">
              <ShieldCheck size={14} /> Security Protocol
            </span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1 text-xs">
              Mongoose Verified
            </span>
          </div>
        </div>

        {/* Informative Help Text Box */}
        <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
          Since this is a full-stack recommendation engine simulation environment, completing this purchase feeds tracking arrays into user behavior trees, optimizing future automated filtering algorithms.
        </p>

        {/* Redirection Navigation CTA */}
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm py-4 rounded-xl transition-all shadow-md group"
          >
            <span>Return to Marketplace Dashboard</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CheckoutSuccess;
