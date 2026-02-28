import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface SoundEffect {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  fileName: string;
  fileSize: number;
  duration?: string;
  uploadedAt: string;
  audioUrl?: string;
  isNew?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  excerpt: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  userName: string;
  rating: number;
  content: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userEmail: string;
  userName: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  total: number;
  status: 'completed' | 'pending' | 'refunded';
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  adminEmail: string;
  currency: string;
  maintenanceMode: boolean;
  allowSignups: boolean;
  maxUploadSizeGB: number;
}

interface DataContextType {
  sounds: SoundEffect[];
  addSound: (s: SoundEffect) => void;
  removeSound: (id: string) => void;
  updateSound: (id: string, data: Partial<SoundEffect>) => void;
  blogPosts: BlogPost[];
  addBlogPost: (p: BlogPost) => void;
  removeBlogPost: (id: string) => void;
  updateBlogPost: (id: string, data: Partial<BlogPost>) => void;
  testimonials: Testimonial[];
  addTestimonial: (t: Testimonial) => void;
  removeTestimonial: (id: string) => void;
  orders: Order[];
  addOrder: (o: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (s: Partial<SiteSettings>) => void;
}

const DataContext = createContext<DataContextType | null>(null);

const defaultSettings: SiteSettings = {
  siteName: 'SoundCandy',
  siteTagline: 'The candy store for your ears.',
  adminEmail: 'matthewcalabresecareers@gmail.com',
  currency: 'USD',
  maintenanceMode: false,
  allowSignups: true,
  maxUploadSizeGB: 50,
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [sounds, setSounds] = useState<SoundEffect[]>(() => {
    try { const s = localStorage.getItem('soundcandy_sounds'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try { const b = localStorage.getItem('soundcandy_blogs'); return b ? JSON.parse(b) : []; } catch { return []; }
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try { const t = localStorage.getItem('soundcandy_testimonials'); return t ? JSON.parse(t) : []; } catch { return []; }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    try { const o = localStorage.getItem('soundcandy_orders'); return o ? JSON.parse(o) : []; } catch { return []; }
  });
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try { const s = localStorage.getItem('soundcandy_settings'); return s ? JSON.parse(s) : defaultSettings; } catch { return defaultSettings; }
  });

  useEffect(() => { localStorage.setItem('soundcandy_sounds', JSON.stringify(sounds)); }, [sounds]);
  useEffect(() => { localStorage.setItem('soundcandy_blogs', JSON.stringify(blogPosts)); }, [blogPosts]);
  useEffect(() => { localStorage.setItem('soundcandy_testimonials', JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem('soundcandy_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('soundcandy_settings', JSON.stringify(siteSettings)); }, [siteSettings]);

  const addSound = (s: SoundEffect) => setSounds(prev => [s, ...prev]);
  const removeSound = (id: string) => setSounds(prev => prev.filter(s => s.id !== id));
  const updateSound = (id: string, data: Partial<SoundEffect>) => setSounds(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  const addBlogPost = (p: BlogPost) => setBlogPosts(prev => [p, ...prev]);
  const removeBlogPost = (id: string) => setBlogPosts(prev => prev.filter(p => p.id !== id));
  const updateBlogPost = (id: string, data: Partial<BlogPost>) => setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  const addTestimonial = (t: Testimonial) => setTestimonials(prev => [t, ...prev]);
  const removeTestimonial = (id: string) => setTestimonials(prev => prev.filter(t => t.id !== id));
  const addOrder = (o: Order) => setOrders(prev => [o, ...prev]);
  const updateOrderStatus = (id: string, status: Order['status']) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  const updateSiteSettings = (s: Partial<SiteSettings>) => setSiteSettings(prev => ({ ...prev, ...s }));

  return (
    <DataContext.Provider value={{ sounds, addSound, removeSound, updateSound, blogPosts, addBlogPost, removeBlogPost, updateBlogPost, testimonials, addTestimonial, removeTestimonial, orders, addOrder, updateOrderStatus, siteSettings, updateSiteSettings }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
