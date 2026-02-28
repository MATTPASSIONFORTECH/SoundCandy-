import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Filter, Package } from 'lucide-react';
import { useData } from '../store/DataContext';
import { useCart } from '../store/CartContext';
import { useAuth } from '../store/AuthContext';

const categories = ['All', 'Ambiences', 'Animals', 'Cinematic', 'Comedy & Toons', 'Cars', 'Destruction', 'Foley', 'Human', 'Nature', 'Technology', 'Transportation'];
const tabs = ['All Products', 'New Releases'];

export function Products() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { sounds, removeSound } = useData();
  const { addItem } = useCart();
  const { user } = useAuth();

  const filtered = sounds.filter(s => {
    const matchTab = activeTab === 0 || s.isNew;
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchCat && matchSearch;
  });

  const formatSize = (bytes: number) => {
    if (bytes >= 1e9) return (bytes / 1e9).toFixed(1) + ' GB';
    return (bytes / 1e6).toFixed(1) + ' MB';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white">Sound Library</h1>
        <p className="mt-2 text-dark-200">Explore our collection of premium sound effects</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
              activeTab === i
                ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-lg shadow-neon-pink/20'
                : 'bg-dark-700 text-dark-200 hover:text-white hover:bg-dark-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
          <input
            type="text"
            placeholder="Search sound effects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 pl-10 pr-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-dark-300">
          <Filter className="h-4 w-4" />
          {filtered.length} results
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
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

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Package className="mx-auto h-12 w-12 text-dark-400 mb-4" />
          <p className="text-dark-300">No sound effects found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((sound, i) => (
            <motion.div
              key={sound.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.5) }}
              className="group rounded-2xl border border-dark-600/50 bg-dark-800/50 overflow-hidden hover:border-neon-pink/30 transition-all duration-300"
            >
              <div className="relative h-32 bg-gradient-to-br from-dark-700 to-dark-600 flex items-center justify-center">
                <div className="flex items-end gap-0.5">
                  {Array.from({ length: 24 }).map((_, j) => (
                    <motion.div
                      key={j}
                      className="w-0.5 bg-gradient-to-t from-neon-pink/30 to-neon-purple/30 rounded-full"
                      style={{ height: `${6 + Math.sin(j * 0.5 + i) * 15 + 15}px` }}
                    />
                  ))}
                </div>
                {sound.isNew && (
                  <span className="absolute top-3 right-3 rounded-full bg-neon-pink px-2.5 py-0.5 text-[10px] font-bold text-white">NEW</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-neon-pink font-semibold">{sound.category}</span>
                  {sound.duration && <span className="text-[10px] text-dark-400">{sound.duration}</span>}
                </div>
                <h3 className="font-semibold text-white truncate">{sound.name}</h3>
                <p className="mt-1 text-xs text-dark-300 line-clamp-2">{sound.description}</p>
                <div className="mt-1 text-[10px] text-dark-400">
                  {sound.fileName} • {formatSize(sound.fileSize)}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-white">${sound.price.toFixed(2)}</span>
                  <div className="flex gap-2">
                    {user?.isAdmin && (
                      <button
                        onClick={() => removeSound(sound.id)}
                        className="rounded-lg border border-red-500/30 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                    <button
                      onClick={() => addItem({ id: sound.id, name: sound.name, price: sound.price, category: sound.category })}
                      className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 text-xs font-semibold text-white hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Add
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
