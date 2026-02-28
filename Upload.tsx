import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileAudio, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../store/DataContext';
import { useAuth } from '../store/AuthContext';
import { Navigate } from 'react-router-dom';

const soundCategories = ['Ambiences', 'Animals', 'Cinematic', 'Comedy & Toons', 'Cars', 'Destruction', 'Foley', 'Human', 'Nature', 'Technology', 'Transportation'];
const MAX_SIZE = 50 * 1024 * 1024 * 1024; // 50 GB

export function Upload() {
  const { user } = useAuth();
  const { addSound } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Ambiences', duration: '' });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!user?.isAdmin) return <Navigate to="/" replace />;

  const handleFile = (f: File) => {
    if (f.size > MAX_SIZE) {
      setError('File size exceeds 50 GB limit');
      return;
    }
    setFile(f);
    setError('');
    if (!form.name) {
      setForm(prev => ({ ...prev, name: f.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') }));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { setError('Please select an audio file'); return; }
    if (!form.price || parseFloat(form.price) <= 0) { setError('Please enter a valid price'); return; }

    setUploading(true);
    setTimeout(() => {
      addSound({
        id: `s-${Date.now()}`,
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        fileName: file.name,
        fileSize: file.size,
        duration: form.duration || undefined,
        uploadedAt: new Date().toISOString().split('T')[0],
        isNew: true,
      });
      setUploading(false);
      setSuccess(true);
      setFile(null);
      setForm({ name: '', description: '', price: '', category: 'Ambiences', duration: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1e9) return (bytes / 1e9).toFixed(2) + ' GB';
    if (bytes >= 1e6) return (bytes / 1e6).toFixed(1) + ' MB';
    return (bytes / 1e3).toFixed(0) + ' KB';
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white">Upload Sound Effect</h1>
        <p className="mt-2 text-dark-200">Add new sound effects to the SoundCandy library (up to 50 GB)</p>
      </motion.div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400"
        >
          <CheckCircle className="h-4 w-4" /> Sound effect uploaded successfully!
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle className="h-4 w-4" /> {error}
        </motion.div>
      )}

      <div className="rounded-2xl border border-dark-600/50 bg-dark-800/50 p-8">
        {/* Drop Zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all ${
            dragOver
              ? 'border-neon-pink bg-neon-pink/5'
              : file
                ? 'border-green-500/30 bg-green-500/5'
                : 'border-dark-500 hover:border-dark-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
            className="hidden"
          />
          {file ? (
            <div className="flex items-center justify-center gap-4">
              <FileAudio className="h-12 w-12 text-green-400" />
              <div className="text-left">
                <p className="font-semibold text-white">{file.name}</p>
                <p className="text-sm text-dark-300">{formatSize(file.size)}</p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); setFile(null); }}
                className="rounded-lg p-2 text-dark-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <>
              <UploadIcon className="mx-auto h-12 w-12 text-dark-400 mb-4" />
              <p className="text-base font-medium text-white mb-1">Drop your audio file here</p>
              <p className="text-sm text-dark-300">or click to browse • Any audio format • Up to 50 GB</p>
            </>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-1.5">Name</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="Sound effect name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white focus:border-neon-pink focus:outline-none transition-colors"
              >
                {soundCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-200 mb-1.5">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors resize-none"
              placeholder="Describe the sound effect..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-1.5">Price ($)</label>
              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="9.99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-1.5">Duration (optional)</label>
              <input
                type="text"
                value={form.duration}
                onChange={e => setForm({ ...form, duration: e.target.value })}
                className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="2:30"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={uploading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple py-3.5 text-sm font-semibold text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 transition-shadow disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Uploading...
              </>
            ) : (
              <>
                <UploadIcon className="h-4 w-4" /> Upload Sound Effect
              </>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
