import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X, Calendar, User, Tag, FileText } from 'lucide-react';
import { useData } from '../store/DataContext';
import { useAuth } from '../store/AuthContext';

const blogCategories = ['All', 'Credit', 'Equipment', 'Free', 'New Release', 'News', 'Review', 'Testimonials', 'Tutorials'];

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'News', excerpt: '' });
  const { blogPosts, addBlogPost, removeBlogPost } = useData();
  const { user } = useAuth();

  const filtered = blogPosts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    addBlogPost({
      id: `b-${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      excerpt: newPost.excerpt || newPost.content.substring(0, 150) + '...',
      author: user?.name || 'Admin',
      createdAt: new Date().toISOString().split('T')[0],
    });
    setNewPost({ title: '', content: '', category: 'News', excerpt: '' });
    setShowCreatePost(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Blog</h1>
          <p className="mt-2 text-dark-200">News, tutorials, and updates from SoundCandy</p>
        </div>
        {user?.isAdmin && (
          <button
            onClick={() => setShowCreatePost(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-5 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow"
          >
            <Plus className="h-4 w-4" /> Create Post
          </button>
        )}
      </motion.div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
        <input
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 pl-10 pr-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink transition-colors"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {blogCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
              activeCategory === cat
                ? 'bg-neon-pink/10 text-neon-pink border border-neon-pink/30'
                : 'bg-dark-700 text-dark-300 border border-dark-600 hover:text-white hover:border-dark-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <FileText className="mx-auto h-12 w-12 text-dark-400 mb-4" />
          <p className="text-dark-300">No blog posts found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.5) }}
              className="group rounded-2xl border border-dark-600/50 bg-dark-800/50 overflow-hidden hover:border-neon-pink/30 transition-all duration-300"
            >
              <div className="h-40 bg-gradient-to-br from-dark-700 to-dark-600 flex items-center justify-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-neon-pink/60" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="rounded-full bg-neon-pink/10 px-2.5 py-0.5 text-[10px] font-semibold text-neon-pink">{post.category}</span>
                  <span className="flex items-center gap-1 text-[10px] text-dark-400">
                    <Calendar className="h-3 w-3" /> {post.createdAt}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-dark-300 line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-dark-400">
                    <User className="h-3 w-3" /> {post.author}
                  </span>
                  {user?.isAdmin && (
                    <button
                      onClick={() => removeBlogPost(post.id)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-dark-600 bg-dark-800 p-8 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Create Blog Post</h2>
                <button onClick={() => setShowCreatePost(false)} className="text-dark-300 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-1.5">Title</label>
                  <input
                    type="text"
                    required
                    value={newPost.title}
                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                    placeholder="Post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-1.5">
                    <Tag className="inline h-3.5 w-3.5 mr-1" />Category
                  </label>
                  <select
                    value={newPost.category}
                    onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white focus:border-neon-pink focus:outline-none transition-colors"
                  >
                    {blogCategories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-1.5">Excerpt</label>
                  <input
                    type="text"
                    value={newPost.excerpt}
                    onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })}
                    className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                    placeholder="Brief summary (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-1.5">Content</label>
                  <textarea
                    required
                    rows={6}
                    value={newPost.content}
                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors resize-none"
                    placeholder="Write your post content..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple py-3 text-sm font-semibold text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 transition-shadow"
                >
                  Publish Post
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
