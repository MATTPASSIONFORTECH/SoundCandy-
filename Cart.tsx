import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Lock, CheckCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useAuth } from '../store/AuthContext';
import { useData } from '../store/DataContext';

export function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();
  const { user, isAuthenticated, setShowAuth, setAuthMode } = useAuth();
  const { addOrder } = useData();
  const [showCheckout, setShowCheckout] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ cardNumber: '', expiry: '', cvc: '', name: '', email: '' });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      addOrder({
        id: `order-${Date.now()}`,
        userEmail: user?.email || paymentForm.email,
        userName: user?.name || paymentForm.name,
        items: items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
        total,
        status: 'completed',
        createdAt: new Date().toISOString(),
      });
      setProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <CheckCircle className="mx-auto h-24 w-24 text-green-400 mb-6" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl font-bold text-white mb-4">
          Order Confirmed!
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-dark-200 mb-8 max-w-md mx-auto">
          Thank you for your purchase! Your sound effects will be delivered to your email shortly. Check your inbox for download links.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-8 py-4 text-sm font-semibold text-white hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <ShoppingBag className="mx-auto h-20 w-20 text-dark-400 mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-dark-200 mb-8">Looks like you haven&apos;t added any sound effects yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-8 py-4 text-sm font-semibold text-white hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow"
          >
            <ArrowLeft className="h-4 w-4" /> Browse Sounds
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
          <ShoppingCart className="h-8 w-8" /> Cart
          <span className="text-lg text-dark-300">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
        </h1>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl border border-dark-600/50 bg-dark-800/50 p-5"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-dark-700 to-dark-600">
                  <div className="flex items-end gap-0.5">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div key={j} className="w-0.5 bg-gradient-to-t from-neon-pink/40 to-neon-purple/40 rounded-full" style={{ height: `${6 + Math.sin(j) * 10 + 10}px` }} />
                    ))}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{item.name}</h3>
                  <p className="text-xs text-dark-300">{item.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600 transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="text-lg font-bold text-white w-20 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-24 rounded-2xl border border-dark-600/50 bg-dark-800/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-dark-300">Subtotal</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-300">Processing Fee</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="border-t border-dark-600 pt-3 flex justify-between">
                <span className="text-base font-semibold text-white">Total</span>
                <span className="text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">${total.toFixed(2)}</span>
              </div>
            </div>

            {!showCheckout ? (
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    setAuthMode('login');
                    setShowAuth(true);
                  } else {
                    setShowCheckout(true);
                  }
                }}
                className="w-full rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple py-3.5 text-sm font-semibold text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 transition-shadow flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4" /> Secure Checkout
              </button>
            ) : (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                onSubmit={handleCheckout}
                className="space-y-3 mt-4 pt-4 border-t border-dark-600"
              >
                <div className="flex items-center gap-2 text-xs text-dark-300 mb-2">
                  <Lock className="h-3 w-3" /> Secure, encrypted payment
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-200 mb-1">Name on Card</label>
                  <input
                    required
                    type="text"
                    value={paymentForm.name}
                    onChange={e => setPaymentForm({ ...paymentForm, name: e.target.value })}
                    className="w-full rounded-lg border border-dark-600 bg-dark-700 py-2.5 px-3 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-200 mb-1">Email</label>
                  <input
                    required
                    type="email"
                    value={paymentForm.email}
                    onChange={e => setPaymentForm({ ...paymentForm, email: e.target.value })}
                    className="w-full rounded-lg border border-dark-600 bg-dark-700 py-2.5 px-3 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-200 mb-1">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                    <input
                      required
                      type="text"
                      maxLength={19}
                      value={paymentForm.cardNumber}
                      onChange={e => {
                        const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                        setPaymentForm({ ...paymentForm, cardNumber: v });
                      }}
                      className="w-full rounded-lg border border-dark-600 bg-dark-700 py-2.5 pl-10 pr-3 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-dark-200 mb-1">Expiry</label>
                    <input
                      required
                      type="text"
                      maxLength={5}
                      value={paymentForm.expiry}
                      onChange={e => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                        setPaymentForm({ ...paymentForm, expiry: v });
                      }}
                      className="w-full rounded-lg border border-dark-600 bg-dark-700 py-2.5 px-3 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-200 mb-1">CVC</label>
                    <input
                      required
                      type="text"
                      maxLength={4}
                      value={paymentForm.cvc}
                      onChange={e => setPaymentForm({ ...paymentForm, cvc: e.target.value.replace(/\D/g, '') })}
                      className="w-full rounded-lg border border-dark-600 bg-dark-700 py-2.5 px-3 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                      placeholder="123"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple py-3 text-sm font-semibold text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 transition-shadow disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Processing Payment...
                    </>
                  ) : (
                    <>Pay ${total.toFixed(2)}</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="w-full py-2 text-xs text-dark-400 hover:text-dark-200 transition-colors"
                >
                  Cancel
                </button>
              </motion.form>
            )}

            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-dark-400">
              <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> SSL Encrypted</span>
              <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
