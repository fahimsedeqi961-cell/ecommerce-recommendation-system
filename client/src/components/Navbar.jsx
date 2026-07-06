import { Menu, X, ShoppingCart, Search, User, ChevronDown, Sparkles } from 'lucide-react';
import { useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Mobile Menu Button (Left on Mobile) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-indigo-600 p-2 rounded-md transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo (Centered on Mobile, Left on Desktop) */}
          <div className="flex-1 flex justify-center md:justify-start items-center">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
                <Sparkles size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                SmartShop
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex ml-10 space-x-8 text-sm font-medium text-slate-600">
              <a href="#home" className="hover:text-indigo-600 transition-colors py-2">Home</a>
              <a href="#products" className="hover:text-indigo-600 transition-colors py-2">Products</a>

              {/* Dropdown Link Example for Categories */}
              <div className="relative group/menu">
                <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-2">
                  Categories <ChevronDown size={14} />
                </button>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-48 bg-white border border-slate-100 shadow-xl rounded-xl py-2 hidden group-hover/menu:block animate-in fade-in slide-in-from-top-5 duration-200">
                  <a href="#cat1" className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-indigo-600">Electronics</a>
                  <a href="#cat2" className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-indigo-600">Fashion</a>
                  <a href="#cat3" className="block px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-indigo-600">Smart Picks</a>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop & Mobile Right Utilities */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search - Desktop Only */}
            <div className="hidden md:flex items-center relative w-64">
              <input
                type="text"
                placeholder="Search smart recommendations..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <Search className="absolute left-3 text-slate-400" size={16} />
            </div>

            {/* Search Icon for Tablet/Mobile viewport boundaries */}
            <button className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-colors md:hidden">
              <Search size={22} />
            </button>

            {/* Login - Desktop Only */}
            <button className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-xl hover:bg-slate-50">
              <User size={18} />
              <span>Login</span>
            </button>

            {/* Cart (Right side on both Mobile and Desktop) */}
            <button className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-colors">
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                3
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 flex flex-col h-full justify-between">
          <div>
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-xl text-white">
                  <Sparkles size={18} />
                </div>
                <span className="font-bold text-lg text-slate-900">SmartShop</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 p-1">
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="mt-6 flex flex-col space-y-4">
              <a href="#home" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 font-medium py-2 block border-b border-slate-50">Home</a>
              <a href="#products" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 font-medium py-2 block border-b border-slate-50">Products</a>

              <div className="py-2">
                <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider block mb-2">Categories</span>
                <div className="pl-3 space-y-2 border-l border-slate-100">
                  <a href="#cat1" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 block py-1 text-sm">Electronics</a>
                  <a href="#cat2" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 block py-1 text-sm">Fashion</a>
                  <a href="#cat3" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600 block py-1 text-sm">Smart Picks</a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer (Login/Profile) */}
          <div className="pt-6 border-t border-slate-100">
            <button className="flex items-center justify-center gap-2 w-full bg-slate-50 text-slate-700 font-medium py-3 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
              <User size={18} />
              <span>Sign In / Register</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
