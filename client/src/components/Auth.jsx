import { useState } from 'react';
import { Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Switch between your configured backend auth endpoints
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      // Direct call to your backend running on Port 2000
      const response = await fetch(`http://localhost:2000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication routine failed');
      }

      setMessage({ type: 'success', text: isLogin ? 'Login successful! Redirecting...' : 'Registration successful! Please login.' });
      setFormData({
        username: "",
        email: "",
        password: ""
      })

    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 relative z-10">

        {/* Animated Brand Identity Block */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center bg-indigo-600 p-2.5 rounded-2xl text-white shadow-md shadow-indigo-200 mx-auto">
            <Sparkles size={22} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-slate-500">
            {isLogin ? 'Access your smart product profile hub.' : 'Join to start training your custom profile feed.'}
          </p>
        </div>

        {/* Dynamic Alert Messages Banner */}
        {message.text && (
          <div className={`p-4 rounded-xl text-xs font-medium border mb-6 text-left ${message.type === 'success'
            ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
            : 'bg-rose-50 border-rose-100 text-rose-700'
            }`}>
            {message.text}
          </div>
        )}

        {/* Core Request Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">

          {/* Render Username input only when on the Register View */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Username</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required={!isLogin}
                />
                <User className="absolute left-4 top-3.5 text-slate-400" size={16} />
              </div>
            </div>
          )}

          {/* Email Form Row */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                required
              />
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={16} />
            </div>
          </div>

          {/* Password Form Row */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
              {isLogin && (
                <a href="#forgot" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">Forgot?</a>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                required
              />
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={16} />
            </div>
          </div>

          {/* Form Action Call-To-Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-3.5 rounded-xl transition-all shadow-md shadow-indigo-100 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-2"
          >
            <span>{loading ? 'Processing Transaction...' : isLogin ? 'Sign In to Marketplace' : 'Register Account'}</span>
            {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
          </button>
        </form>

        {/* Bottom Toggle Interchanger Interface */}
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            {isLogin ? "Don't have an account yet?" : "Already have an account?"}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage({ type: '', text: '' });
              }}
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors focus:outline-none"
            >
              {isLogin ? 'Sign Up Free' : 'Sign In Here'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Auth;
