import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, MessageSquare, Star, ClipboardList, UserCheck, Inbox } from 'lucide-react';
import { useData } from '../store/DataContext';
import { useAuth } from '../store/AuthContext';

const creditTabs = ['Track Record', 'Clients', 'Testimonials'];

export function Credits() {
  const [activeTab, setActiveTab] = useState(0);
  const { testimonials, addTestimonial } = useData();
  const { user } = useAuth();
  const [newReview, setNewReview] = useState({ content: '', rating: 5 });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    addTestimonial({
      id: `t-${Date.now()}`,
      userName: user.name,
      rating: newReview.rating,
      content: newReview.content,
      createdAt: new Date().toISOString().split('T')[0],
    });
    setNewReview({ content: '', rating: 5 });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white">Credits</h1>
        <p className="mt-2 text-dark-200">Our work, clients, and what people say about us</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {creditTabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
              activeTab === i
                ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-lg shadow-neon-pink/20'
                : 'bg-dark-700 text-dark-200 hover:text-white hover:bg-dark-600'
            }`}
          >
            {i === 0 && <Award className="h-4 w-4" />}
            {i === 1 && <Users className="h-4 w-4" />}
            {i === 2 && <MessageSquare className="h-4 w-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Track Record */}
      {activeTab === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink/10 to-neon-purple/10">
              <ClipboardList className="h-10 w-10 text-dark-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Track Record Coming Soon</h3>
            <p className="text-dark-300 max-w-md">
              Our portfolio of projects will be listed here as we grow. Check back soon to see our work with films, games, podcasts, and more.
            </p>
          </div>
        </motion.div>
      )}

      {/* Clients */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink/10 to-neon-purple/10">
              <UserCheck className="h-10 w-10 text-dark-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Clients Coming Soon</h3>
            <p className="text-dark-300 max-w-md">
              Our client roster will be showcased here. We look forward to building relationships with creators and studios worldwide.
            </p>
          </div>
        </motion.div>
      )}

      {/* Testimonials */}
      {activeTab === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink/10 to-neon-purple/10">
                <Inbox className="h-10 w-10 text-dark-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Testimonials Yet</h3>
              <p className="text-dark-300 max-w-md mb-6">
                Be the first to share your experience! Sign in and leave a review below.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-dark-600/50 bg-dark-800/50 p-6"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-4 w-4 ${j < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-dark-500'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-dark-200 mb-4">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{t.userName}</p>
                    <p className="text-xs text-dark-400">{t.createdAt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Submit Review */}
          {user ? (
            <div className="rounded-2xl border border-dark-600/50 bg-dark-800/50 p-6 max-w-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Leave a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-1.5">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: r })}
                      >
                        <Star className={`h-6 w-6 cursor-pointer transition-colors ${r <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-dark-500 hover:text-yellow-400'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-1.5">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.content}
                    onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                    className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors resize-none"
                    placeholder="Share your experience..."
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 transition-shadow"
                >
                  Submit Review
                </button>
              </form>
            </div>
          ) : (
            <div className="rounded-2xl border border-dark-600/50 bg-dark-800/50 p-6 max-w-lg text-center">
              <p className="text-sm text-dark-300">Sign in to leave a review.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
