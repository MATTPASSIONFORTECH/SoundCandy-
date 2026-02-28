import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, Candy, LogOut, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { useCart } from '../store/CartContext';
import { AuthModal } from './AuthModal';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Blog', path: '/blog' },
  { name: 'Credits', path: '/credits' },
  { name: 'Support', path: '/support' },
  { name: 'About', path: '/about' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout, setShowAuth, setAuthMode } = useAuth();
  const { itemCount } = useCart();

  return (
    <div className="min-h-screen bg-dark-900">
      <AuthModal />
      {/* Header */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-dark-600/50 bg-dark-900/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple shadow-lg shadow-neon-pink/20 group-hover:shadow-neon-pink/40 transition-shadow">
              <Candy className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
              SoundCandy
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-dark-200 hover:text-white'
                }`}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-dark-600/60"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
            {isAuthenticated && user?.isAdmin && (
              <Link
                to="/upload"
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === '/upload' ? 'text-white' : 'text-dark-200 hover:text-white'
                }`}
              >
                {location.pathname === '/upload' && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-dark-600/60"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Upload</span>
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-dark-700 text-dark-200 hover:text-white hover:bg-dark-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-neon-pink text-[10px] font-bold text-white"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl bg-dark-700 px-3 py-2 text-sm text-dark-200 hover:text-white hover:bg-dark-600 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline max-w-[120px] truncate">{user?.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-dark-600 bg-dark-800 p-2 shadow-xl"
                    >
                      <div className="px-3 py-2 text-xs text-dark-300 border-b border-dark-600 mb-1">
                        {user?.email}
                        {user?.isAdmin && <span className="ml-1 text-neon-pink">(Admin)</span>}
                      </div>
                      {user?.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-dark-200 hover:bg-dark-700 hover:text-white transition-colors"
                        >
                          <Settings className="h-4 w-4" /> System Config
                        </Link>
                      )}
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-dark-200 hover:bg-dark-700 hover:text-white transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAuthMode('login'); setShowAuth(true); }}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-dark-200 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); setShowAuth(true); }}
                  className="rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 text-sm font-medium text-white hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow"
                >
                  Sign Up
                </button>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-dark-700 text-dark-200 hover:text-white md:hidden transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-dark-600/50 md:hidden"
            >
              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-dark-700 text-white'
                        : 'text-dark-200 hover:bg-dark-700 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {isAuthenticated && user?.isAdmin && (
                  <Link to="/upload" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-dark-200 hover:bg-dark-700 hover:text-white transition-colors">
                    Upload
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-600/50 bg-dark-800/50 mt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple">
                  <Candy className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">SoundCandy</span>
              </div>
              <p className="text-sm text-dark-300">A world of sound, waiting to be unwrapped.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Navigation</h4>
              <div className="flex flex-col gap-2">
                {navLinks.map(l => (
                  <Link key={l.path} to={l.path} className="text-sm text-dark-300 hover:text-white transition-colors">{l.name}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Support</h4>
              <div className="flex flex-col gap-2">
                <Link to="/support" className="text-sm text-dark-300 hover:text-white transition-colors">FAQ</Link>
                <Link to="/support" className="text-sm text-dark-300 hover:text-white transition-colors">Contact</Link>
                <Link to="/support" className="text-sm text-dark-300 hover:text-white transition-colors">Terms & Conditions</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
              <p className="text-sm text-dark-300">matthewcalabresecareers@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 border-t border-dark-600/50 pt-8 text-center text-sm text-dark-400">
            © {new Date().getFullYear()} SoundCandy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
