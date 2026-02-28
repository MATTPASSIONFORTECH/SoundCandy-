import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

export function AuthModal() {
  const { showAuth, setShowAuth, authMode, setAuthMode, login, signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (authMode === 'login') {
        const result = login(email, password);
        if (!result.success) setError(result.error || 'Login failed');
      } else {
        const result = signup(email, password, name);
        if (!result.success) setError(result.error || 'Signup failed');
      }
      setLoading(false);
    }, 500);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  return (
    <AnimatePresence>
      {showAuth && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => { setShowAuth(false); resetForm(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-md rounded-2xl border border-dark-600 bg-dark-800 p-8 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button
                onClick={() => { setShowAuth(false); resetForm(); }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-dark-300 mb-6">
              {authMode === 'login'
                ? 'Sign in to your SoundCandy account'
                : 'Join SoundCandy and start exploring premium sounds'}
            </p>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 pl-10 pr-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-dark-200 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 pl-10 pr-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-200 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 pl-10 pr-12 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple py-3 text-sm font-semibold text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 transition-shadow disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Processing...
                  </span>
                ) : authMode === 'login' ? 'Sign In' : 'Create Account'}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm text-dark-300">
              {authMode === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button onClick={() => { setAuthMode('signup'); setError(''); }} className="text-neon-pink hover:text-neon-pink/80 font-medium transition-colors">
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button onClick={() => { setAuthMode('login'); setError(''); }} className="text-neon-pink hover:text-neon-pink/80 font-medium transition-colors">
                    Sign In
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
