import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Users, Package, FileText, MessageSquare, ShoppingBag,
  Sliders, Trash2, Search, Shield, AlertTriangle, Check,
  BarChart3, TrendingUp, DollarSign, Eye, Edit3, X, Save,
  ChevronDown, ChevronUp, ToggleLeft, ToggleRight, RefreshCw
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { useData } from '../store/DataContext';
import { useNavigate } from 'react-router-dom';

type Tab = 'dashboard' | 'users' | 'products' | 'blog' | 'testimonials' | 'orders' | 'settings';

export function AdminSettings() {
  const { user, getAllUsers, deleteUser } = useAuth();
  const {
    sounds, removeSound, updateSound,
    blogPosts, removeBlogPost, updateBlogPost,
    testimonials, removeTestimonial,
    orders, updateOrderStatus,
    siteSettings, updateSiteSettings
  } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<string | null>(null);
  const [editProductData, setEditProductData] = useState<{ name: string; price: number; category: string; description: string }>({ name: '', price: 0, category: '', description: '' });
  const [editBlogData, setEditBlogData] = useState<{ title: string; category: string; content: string }>({ title: '', category: '', content: '' });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-8 rounded-2xl bg-dark-800 border border-dark-600 max-w-md mx-4">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-dark-300 mb-6">You must be an administrator to access system configuration.</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl text-white font-medium hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow">
            Go Home
          </button>
        </motion.div>
      </div>
    );
  }

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const allUsers = getAllUsers();
  const totalRevenue = orders.reduce((sum, o) => o.status !== 'refunded' ? sum + o.total : sum, 0);
  const completedOrders = orders.filter(o => o.status === 'completed').length;

  const tabs: { id: Tab; name: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'users', name: 'Users', icon: <Users className="h-4 w-4" />, count: allUsers.length },
    { id: 'products', name: 'Products', icon: <Package className="h-4 w-4" />, count: sounds.length },
    { id: 'blog', name: 'Blog Posts', icon: <FileText className="h-4 w-4" />, count: blogPosts.length },
    { id: 'testimonials', name: 'Testimonials', icon: <MessageSquare className="h-4 w-4" />, count: testimonials.length },
    { id: 'orders', name: 'Orders', icon: <ShoppingBag className="h-4 w-4" />, count: orders.length },
    { id: 'settings', name: 'Site Settings', icon: <Sliders className="h-4 w-4" /> },
  ];

  const soundCategories = ['Ambiences', 'Animals', 'Cinematic', 'Comedy & Toons', 'Cars', 'Destruction', 'Foley', 'Human', 'Nature', 'Technology', 'Transportation'];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-3 rounded-xl shadow-xl backdrop-blur-sm"
          >
            <Check className="h-4 w-4" />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-dark-800 border border-dark-600 rounded-2xl p-6 max-w-sm w-full">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white text-center mb-2">Confirm Delete</h3>
              <p className="text-dark-300 text-center mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 px-4 py-2 bg-dark-700 text-dark-200 rounded-xl hover:bg-dark-600 transition-colors">Cancel</button>
                <button onClick={() => {
                  const [type, id] = confirmDelete.split(':');
                  if (type === 'user') { deleteUser(id); showNotification('User deleted successfully'); }
                  if (type === 'product') { removeSound(id); showNotification('Product deleted successfully'); }
                  if (type === 'blog') { removeBlogPost(id); showNotification('Blog post deleted successfully'); }
                  if (type === 'testimonial') { removeTestimonial(id); showNotification('Testimonial deleted successfully'); }
                  setConfirmDelete(null);
                }} className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple shadow-lg shadow-neon-pink/20">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">System Configuration</h1>
              <p className="text-dark-300 text-sm">Manage your SoundCandy back-end</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-64 flex-shrink-0">
            <div className="bg-dark-800 border border-dark-600 rounded-2xl p-2 lg:sticky lg:top-24">
              <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 text-white border border-neon-pink/30'
                        : 'text-dark-300 hover:text-white hover:bg-dark-700'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                    {tab.count !== undefined && (
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-neon-pink/30 text-neon-pink' : 'bg-dark-600 text-dark-400'}`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                {/* DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: 'Total Products', value: sounds.length, icon: <Package className="h-5 w-5" />, color: 'from-blue-500 to-cyan-500' },
                        { label: 'Total Users', value: allUsers.length, icon: <Users className="h-5 w-5" />, color: 'from-green-500 to-emerald-500' },
                        { label: 'Total Orders', value: orders.length, icon: <ShoppingBag className="h-5 w-5" />, color: 'from-neon-pink to-neon-purple' },
                        { label: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign className="h-5 w-5" />, color: 'from-yellow-500 to-orange-500' },
                      ].map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-dark-400 text-sm">{stat.label}</span>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                              {stat.icon}
                            </div>
                          </div>
                          <p className="text-3xl font-bold text-white">{stat.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Quick Stats */}
                      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-neon-pink" /> Overview</h3>
                        <div className="space-y-4">
                          {[
                            { label: 'Blog Posts', value: blogPosts.length },
                            { label: 'Testimonials', value: testimonials.length },
                            { label: 'Completed Orders', value: completedOrders },
                            { label: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length },
                            { label: 'Refunded Orders', value: orders.filter(o => o.status === 'refunded').length },
                          ].map(item => (
                            <div key={item.label} className="flex items-center justify-between py-2 border-b border-dark-700 last:border-0">
                              <span className="text-dark-300 text-sm">{item.label}</span>
                              <span className="text-white font-semibold">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Category Breakdown */}
                      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-neon-purple" /> Products by Category</h3>
                        <div className="space-y-3">
                          {soundCategories.map(cat => {
                            const count = sounds.filter(s => s.category === cat).length;
                            const maxCount = Math.max(...soundCategories.map(c => sounds.filter(s => s.category === c).length), 1);
                            return (
                              <div key={cat}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-dark-300 text-xs">{cat}</span>
                                  <span className="text-dark-400 text-xs">{count}</span>
                                </div>
                                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(count / maxCount) * 100}%` }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    className="h-full bg-gradient-to-r from-neon-pink to-neon-purple rounded-full"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Eye className="h-5 w-5 text-cyan-400" /> Recent Activity</h3>
                      {orders.length === 0 && sounds.length === 0 && blogPosts.length === 0 ? (
                        <p className="text-dark-400 text-center py-8">No activity yet. Start by uploading products or creating blog posts.</p>
                      ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {[
                            ...sounds.slice(0, 5).map(s => ({ type: 'Product Added', name: s.name, date: s.uploadedAt, color: 'text-blue-400' })),
                            ...blogPosts.slice(0, 5).map(b => ({ type: 'Blog Published', name: b.title, date: b.createdAt, color: 'text-green-400' })),
                            ...orders.slice(0, 5).map(o => ({ type: 'Order', name: `$${o.total.toFixed(2)} by ${o.userName}`, date: o.createdAt, color: 'text-yellow-400' })),
                          ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10).map((item, i) => (
                            <div key={i} className="flex items-center gap-3 py-2 border-b border-dark-700 last:border-0">
                              <span className={`text-xs font-medium px-2 py-1 rounded-lg bg-dark-700 ${item.color}`}>{item.type}</span>
                              <span className="text-dark-200 text-sm flex-1 truncate">{item.name}</span>
                              <span className="text-dark-400 text-xs whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* USERS */}
                {activeTab === 'users' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                        <input
                          type="text"
                          placeholder="Search users by name or email..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-neon-pink/50 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Admin user */}
                    <div className="bg-dark-800 border border-neon-pink/30 rounded-2xl p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-white font-bold text-sm">MC</div>
                          <div>
                            <p className="text-white font-medium">Matthew Calabrese</p>
                            <p className="text-dark-400 text-sm">matthewcalabresecareers@gmail.com</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-pink/20 text-neon-pink border border-neon-pink/30">Administrator</span>
                      </div>
                    </div>

                    {allUsers.filter(u => {
                      if (!searchQuery) return true;
                      const q = searchQuery.toLowerCase();
                      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
                    }).length === 0 && !searchQuery ? (
                      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-12 text-center">
                        <Users className="h-12 w-12 text-dark-500 mx-auto mb-3" />
                        <p className="text-dark-400">No registered users yet.</p>
                      </div>
                    ) : (
                      allUsers.filter(u => {
                        if (!searchQuery) return true;
                        const q = searchQuery.toLowerCase();
                        return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
                      }).map(u => (
                        <motion.div key={u.id} layout className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-dark-600 flex items-center justify-center text-dark-300 font-bold text-sm">
                                {u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-white font-medium">{u.name}</p>
                                <p className="text-dark-400 text-sm">{u.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-dark-400 text-xs hidden sm:inline">Joined {new Date(u.createdAt).toLocaleDateString()}</span>
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-dark-600 text-dark-300">User</span>
                              <button onClick={() => setConfirmDelete(`user:${u.id}`)} className="p-2 text-dark-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                )}

                {/* PRODUCTS */}
                {activeTab === 'products' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                        <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-neon-pink/50 focus:outline-none transition-colors" />
                      </div>
                      <button onClick={() => navigate('/upload')} className="px-4 py-3 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl text-white text-sm font-medium hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow whitespace-nowrap">
                        + Add Product
                      </button>
                    </div>

                    {sounds.length === 0 ? (
                      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-12 text-center">
                        <Package className="h-12 w-12 text-dark-500 mx-auto mb-3" />
                        <p className="text-dark-400">No products yet. Click "Add Product" to upload your first sound effect.</p>
                      </div>
                    ) : (
                      <div className="bg-dark-800 border border-dark-600 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-dark-600">
                                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-5 py-3">Name</th>
                                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-5 py-3">Category</th>
                                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-5 py-3">Price</th>
                                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-5 py-3">Date</th>
                                <th className="text-right text-xs font-medium text-dark-400 uppercase tracking-wider px-5 py-3">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sounds.filter(s => {
                                if (!searchQuery) return true;
                                const q = searchQuery.toLowerCase();
                                return s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
                              }).map(sound => (
                                <tr key={sound.id} className="border-b border-dark-700 last:border-0 hover:bg-dark-700/50 transition-colors">
                                  {editingProduct === sound.id ? (
                                    <>
                                      <td className="px-5 py-3"><input type="text" value={editProductData.name} onChange={e => setEditProductData(p => ({ ...p, name: e.target.value }))} className="w-full px-2 py-1 bg-dark-700 border border-dark-500 rounded-lg text-white text-sm focus:outline-none focus:border-neon-pink/50" /></td>
                                      <td className="px-5 py-3">
                                        <select value={editProductData.category} onChange={e => setEditProductData(p => ({ ...p, category: e.target.value }))} className="px-2 py-1 bg-dark-700 border border-dark-500 rounded-lg text-white text-sm focus:outline-none focus:border-neon-pink/50">
                                          {soundCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                      </td>
                                      <td className="px-5 py-3"><input type="number" step="0.01" value={editProductData.price} onChange={e => setEditProductData(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))} className="w-20 px-2 py-1 bg-dark-700 border border-dark-500 rounded-lg text-white text-sm focus:outline-none focus:border-neon-pink/50" /></td>
                                      <td className="px-5 py-3 text-dark-400 text-sm">{new Date(sound.uploadedAt).toLocaleDateString()}</td>
                                      <td className="px-5 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                          <button onClick={() => { updateSound(sound.id, editProductData); setEditingProduct(null); showNotification('Product updated'); }} className="p-1.5 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"><Save className="h-4 w-4" /></button>
                                          <button onClick={() => setEditingProduct(null)} className="p-1.5 text-dark-400 hover:bg-dark-600 rounded-lg transition-colors"><X className="h-4 w-4" /></button>
                                        </div>
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td className="px-5 py-3 text-white text-sm font-medium">{sound.name}</td>
                                      <td className="px-5 py-3"><span className="px-2 py-1 rounded-lg text-xs bg-dark-600 text-dark-300">{sound.category}</span></td>
                                      <td className="px-5 py-3 text-neon-pink font-medium text-sm">${sound.price.toFixed(2)}</td>
                                      <td className="px-5 py-3 text-dark-400 text-sm">{new Date(sound.uploadedAt).toLocaleDateString()}</td>
                                      <td className="px-5 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                          <button onClick={() => { setEditingProduct(sound.id); setEditProductData({ name: sound.name, price: sound.price, category: sound.category, description: sound.description }); }} className="p-1.5 text-dark-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"><Edit3 className="h-4 w-4" /></button>
                                          <button onClick={() => setConfirmDelete(`product:${sound.id}`)} className="p-1.5 text-dark-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                      </td>
                                    </>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* BLOG */}
                {activeTab === 'blog' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                        <input type="text" placeholder="Search blog posts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-neon-pink/50 focus:outline-none transition-colors" />
                      </div>
                      <button onClick={() => navigate('/blog')} className="px-4 py-3 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl text-white text-sm font-medium hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow whitespace-nowrap">
                        + Create Post
                      </button>
                    </div>

                    {blogPosts.length === 0 ? (
                      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-12 text-center">
                        <FileText className="h-12 w-12 text-dark-500 mx-auto mb-3" />
                        <p className="text-dark-400">No blog posts yet. Click "Create Post" to write your first blog post.</p>
                      </div>
                    ) : (
                      blogPosts.filter(b => {
                        if (!searchQuery) return true;
                        const q = searchQuery.toLowerCase();
                        return b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
                      }).map(post => (
                        <motion.div key={post.id} layout className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
                          {editingBlog === post.id ? (
                            <div className="space-y-3">
                              <input type="text" value={editBlogData.title} onChange={e => setEditBlogData(p => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2 bg-dark-700 border border-dark-500 rounded-xl text-white focus:outline-none focus:border-neon-pink/50" placeholder="Title" />
                              <select value={editBlogData.category} onChange={e => setEditBlogData(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 bg-dark-700 border border-dark-500 rounded-xl text-white focus:outline-none focus:border-neon-pink/50">
                                {['Credit', 'Equipment', 'Free', 'New Release', 'News', 'Review', 'Testimonials', 'Tutorials'].map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                              <textarea value={editBlogData.content} onChange={e => setEditBlogData(p => ({ ...p, content: e.target.value }))} rows={4} className="w-full px-3 py-2 bg-dark-700 border border-dark-500 rounded-xl text-white focus:outline-none focus:border-neon-pink/50 resize-none" placeholder="Content" />
                              <div className="flex justify-end gap-2">
                                <button onClick={() => setEditingBlog(null)} className="px-4 py-2 bg-dark-700 text-dark-300 rounded-xl hover:bg-dark-600 transition-colors text-sm">Cancel</button>
                                <button onClick={() => { updateBlogPost(post.id, { ...editBlogData, excerpt: editBlogData.content.substring(0, 150) + '...' }); setEditingBlog(null); showNotification('Blog post updated'); }} className="px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-purple text-white rounded-xl text-sm hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow">Save</button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-white font-medium truncate">{post.title}</h3>
                                  <span className="px-2 py-0.5 rounded-lg text-xs bg-dark-600 text-dark-300 whitespace-nowrap">{post.category}</span>
                                </div>
                                <p className="text-dark-400 text-sm truncate">{post.excerpt}</p>
                                <p className="text-dark-500 text-xs mt-1">{new Date(post.createdAt).toLocaleDateString()} • by {post.author}</p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => { setEditingBlog(post.id); setEditBlogData({ title: post.title, category: post.category, content: post.content }); }} className="p-2 text-dark-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"><Edit3 className="h-4 w-4" /></button>
                                <button onClick={() => setConfirmDelete(`blog:${post.id}`)} className="p-2 text-dark-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))
                    )}
                  </div>
                )}

                {/* TESTIMONIALS */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                        <input type="text" placeholder="Search testimonials..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-neon-pink/50 focus:outline-none transition-colors" />
                      </div>
                    </div>

                    {testimonials.length === 0 ? (
                      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-12 text-center">
                        <MessageSquare className="h-12 w-12 text-dark-500 mx-auto mb-3" />
                        <p className="text-dark-400">No testimonials yet. Users can leave reviews on the Credits page.</p>
                      </div>
                    ) : (
                      testimonials.filter(t => {
                        if (!searchQuery) return true;
                        return t.userName.toLowerCase().includes(searchQuery.toLowerCase()) || t.content.toLowerCase().includes(searchQuery.toLowerCase());
                      }).map(testimonial => (
                        <motion.div key={testimonial.id} layout className="bg-dark-800 border border-dark-600 rounded-2xl p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <p className="text-white font-medium">{testimonial.userName}</p>
                                <div className="flex gap-0.5">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={`text-xs ${i < testimonial.rating ? 'text-yellow-400' : 'text-dark-600'}`}>★</span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-dark-300 text-sm">{testimonial.content}</p>
                              <p className="text-dark-500 text-xs mt-2">{new Date(testimonial.createdAt).toLocaleDateString()}</p>
                            </div>
                            <button onClick={() => setConfirmDelete(`testimonial:${testimonial.id}`)} className="p-2 text-dark-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                )}

                {/* ORDERS */}
                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                        <input type="text" placeholder="Search orders..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-neon-pink/50 focus:outline-none transition-colors" />
                      </div>
                    </div>

                    {orders.length === 0 ? (
                      <div className="bg-dark-800 border border-dark-600 rounded-2xl p-12 text-center">
                        <ShoppingBag className="h-12 w-12 text-dark-500 mx-auto mb-3" />
                        <p className="text-dark-400">No orders yet. Orders will appear here when customers make purchases.</p>
                      </div>
                    ) : (
                      orders.filter(o => {
                        if (!searchQuery) return true;
                        const q = searchQuery.toLowerCase();
                        return o.userName.toLowerCase().includes(q) || o.userEmail.toLowerCase().includes(q) || o.id.toLowerCase().includes(q);
                      }).map(order => (
                        <motion.div key={order.id} layout className="bg-dark-800 border border-dark-600 rounded-2xl overflow-hidden">
                          <div className="p-5 cursor-pointer hover:bg-dark-700/50 transition-colors" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex-shrink-0">
                                  {expandedOrder === order.id ? <ChevronUp className="h-4 w-4 text-dark-400" /> : <ChevronDown className="h-4 w-4 text-dark-400" />}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-white font-medium text-sm truncate">Order #{order.id.slice(-8).toUpperCase()}</p>
                                  <p className="text-dark-400 text-xs truncate">{order.userName} • {order.userEmail}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="text-white font-semibold">${order.total.toFixed(2)}</span>
                                <select
                                  value={order.status}
                                  onChange={e => { e.stopPropagation(); updateOrderStatus(order.id, e.target.value as 'completed' | 'pending' | 'refunded'); showNotification('Order status updated'); }}
                                  onClick={e => e.stopPropagation()}
                                  className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer focus:outline-none ${
                                    order.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                    order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                    'bg-red-500/20 text-red-400 border-red-500/30'
                                  }`}
                                >
                                  <option value="completed">Completed</option>
                                  <option value="pending">Pending</option>
                                  <option value="refunded">Refunded</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <AnimatePresence>
                            {expandedOrder === order.id && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                <div className="px-5 pb-5 border-t border-dark-700">
                                  <table className="w-full mt-3">
                                    <thead>
                                      <tr className="text-dark-400 text-xs uppercase tracking-wider">
                                        <th className="text-left pb-2">Item</th>
                                        <th className="text-right pb-2">Qty</th>
                                        <th className="text-right pb-2">Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {order.items.map((item, i) => (
                                        <tr key={i} className="border-t border-dark-700">
                                          <td className="py-2 text-dark-200 text-sm">{item.name}</td>
                                          <td className="py-2 text-dark-300 text-sm text-right">{item.quantity}</td>
                                          <td className="py-2 text-white text-sm text-right">${(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-dark-600">
                                    <span className="text-dark-400 text-xs">{new Date(order.createdAt).toLocaleString()}</span>
                                    <span className="text-white font-semibold">Total: ${order.total.toFixed(2)}</span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))
                    )}
                  </div>
                )}

                {/* SITE SETTINGS */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    {/* General Settings */}
                    <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><Settings className="h-5 w-5 text-neon-pink" /> General Settings</h3>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-dark-300 mb-2">Site Name</label>
                          <input type="text" value={siteSettings.siteName} onChange={e => updateSiteSettings({ siteName: e.target.value })}
                            className="w-full px-4 py-3 bg-dark-700 border border-dark-500 rounded-xl text-white focus:outline-none focus:border-neon-pink/50 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-300 mb-2">Site Tagline</label>
                          <input type="text" value={siteSettings.siteTagline} onChange={e => updateSiteSettings({ siteTagline: e.target.value })}
                            className="w-full px-4 py-3 bg-dark-700 border border-dark-500 rounded-xl text-white focus:outline-none focus:border-neon-pink/50 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-300 mb-2">Admin Email</label>
                          <input type="email" value={siteSettings.adminEmail} onChange={e => updateSiteSettings({ adminEmail: e.target.value })}
                            className="w-full px-4 py-3 bg-dark-700 border border-dark-500 rounded-xl text-white focus:outline-none focus:border-neon-pink/50 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-300 mb-2">Currency</label>
                          <select value={siteSettings.currency} onChange={e => updateSiteSettings({ currency: e.target.value })}
                            className="w-full px-4 py-3 bg-dark-700 border border-dark-500 rounded-xl text-white focus:outline-none focus:border-neon-pink/50 transition-colors">
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="CAD">CAD ($)</option>
                            <option value="AUD">AUD ($)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Upload Settings */}
                    <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><Package className="h-5 w-5 text-neon-purple" /> Upload Settings</h3>
                      <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Max Upload Size (GB)</label>
                        <input type="number" value={siteSettings.maxUploadSizeGB} onChange={e => updateSiteSettings({ maxUploadSizeGB: parseInt(e.target.value) || 50 })}
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-500 rounded-xl text-white focus:outline-none focus:border-neon-pink/50 transition-colors" />
                        <p className="text-dark-400 text-xs mt-2">Maximum file size allowed for uploads in gigabytes.</p>
                      </div>
                    </div>

                    {/* Access Control */}
                    <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><Shield className="h-5 w-5 text-cyan-400" /> Access Control</h3>
                      <div className="space-y-5">
                        <div className="flex items-center justify-between py-3 border-b border-dark-700">
                          <div>
                            <p className="text-white font-medium">Allow New Sign-ups</p>
                            <p className="text-dark-400 text-sm">Allow new users to register on the website.</p>
                          </div>
                          <button onClick={() => updateSiteSettings({ allowSignups: !siteSettings.allowSignups })} className="flex-shrink-0">
                            {siteSettings.allowSignups
                              ? <ToggleRight className="h-8 w-8 text-neon-pink" />
                              : <ToggleLeft className="h-8 w-8 text-dark-500" />
                            }
                          </button>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-white font-medium">Maintenance Mode</p>
                            <p className="text-dark-400 text-sm">Put the site in maintenance mode. Only admins can access.</p>
                          </div>
                          <button onClick={() => updateSiteSettings({ maintenanceMode: !siteSettings.maintenanceMode })} className="flex-shrink-0">
                            {siteSettings.maintenanceMode
                              ? <ToggleRight className="h-8 w-8 text-yellow-500" />
                              : <ToggleLeft className="h-8 w-8 text-dark-500" />
                            }
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-dark-800 border border-red-500/30 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-red-400 mb-6 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Danger Zone</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-dark-700">
                          <div>
                            <p className="text-white font-medium">Clear All Products</p>
                            <p className="text-dark-400 text-sm">Remove all sound effects from the library.</p>
                          </div>
                          <button onClick={() => { if (window.confirm('Are you sure you want to delete ALL products?')) { sounds.forEach(s => removeSound(s.id)); showNotification('All products cleared'); } }}
                            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl text-sm hover:bg-red-500/20 transition-colors flex items-center gap-2">
                            <Trash2 className="h-4 w-4" /> Clear
                          </button>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-dark-700">
                          <div>
                            <p className="text-white font-medium">Clear All Blog Posts</p>
                            <p className="text-dark-400 text-sm">Remove all blog posts from the site.</p>
                          </div>
                          <button onClick={() => { if (window.confirm('Are you sure you want to delete ALL blog posts?')) { blogPosts.forEach(b => removeBlogPost(b.id)); showNotification('All blog posts cleared'); } }}
                            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl text-sm hover:bg-red-500/20 transition-colors flex items-center gap-2">
                            <Trash2 className="h-4 w-4" /> Clear
                          </button>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-dark-700">
                          <div>
                            <p className="text-white font-medium">Clear All Orders</p>
                            <p className="text-dark-400 text-sm">Remove all order history.</p>
                          </div>
                          <button onClick={() => { if (window.confirm('Are you sure you want to delete ALL orders?')) { localStorage.removeItem('soundcandy_orders'); window.location.reload(); } }}
                            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl text-sm hover:bg-red-500/20 transition-colors flex items-center gap-2">
                            <Trash2 className="h-4 w-4" /> Clear
                          </button>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-white font-medium">Reset Site Settings</p>
                            <p className="text-dark-400 text-sm">Reset all settings to default values.</p>
                          </div>
                          <button onClick={() => { if (window.confirm('Reset all site settings to defaults?')) { localStorage.removeItem('soundcandy_settings'); window.location.reload(); } }}
                            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl text-sm hover:bg-red-500/20 transition-colors flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" /> Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
