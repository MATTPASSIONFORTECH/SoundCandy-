import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Zap, Shield, Headphones, ArrowRight, Candy, Package, FileText, MessageSquare } from 'lucide-react';
import { useData } from '../store/DataContext';
import { useCart } from '../store/CartContext';

/* Microphone picking up audio signal animation */
const MicrophoneAudioVisualizer = () => {
  /* Generate random waveform data for the signal lines */
  const generateWavePoints = (seed: number, amplitude: number) => {
    const points: string[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 200;
      const y = Math.sin((i / steps) * Math.PI * 4 + seed) * amplitude * (i / steps);
      points.push(`${x},${50 + y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-3xl mx-auto h-48">
      {/* Microphone SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 flex-shrink-0"
      >
        <svg width="64" height="120" viewBox="0 0 64 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mic body */}
          <rect x="16" y="8" width="32" height="56" rx="16" className="fill-dark-700 stroke-neon-pink" strokeWidth="2" />
          {/* Mic grille lines */}
          {[20, 28, 36, 44, 52].map((y) => (
            <motion.line
              key={y}
              x1="22"
              y1={y}
              x2="42"
              y2={y}
              className="stroke-neon-pink"
              strokeWidth="1"
              strokeOpacity="0.4"
              animate={{ strokeOpacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: y * 0.03 }}
            />
          ))}
          {/* Mic indicator light */}
          <motion.circle
            cx="32"
            cy="14"
            r="2.5"
            className="fill-neon-pink"
            animate={{ opacity: [0.4, 1, 0.4], filter: ['drop-shadow(0 0 2px #ec4899)', 'drop-shadow(0 0 8px #ec4899)', 'drop-shadow(0 0 2px #ec4899)'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Mic stand connector */}
          <path d="M10 68 C10 82, 54 82, 54 68" className="stroke-dark-400" strokeWidth="2.5" fill="none" />
          {/* Mic stand */}
          <line x1="32" y1="82" x2="32" y2="108" className="stroke-dark-400" strokeWidth="2.5" />
          {/* Mic base */}
          <ellipse cx="32" cy="112" rx="18" ry="4" className="fill-dark-600" />
        </svg>

        {/* Pulsing glow behind mic */}
        <motion.div
          className="absolute inset-0 -m-4 rounded-full bg-neon-pink/10 blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Audio signal going RIGHT from mic */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative ml-4 flex-1 h-full overflow-hidden"
      >
        {/* Multiple wave lines flowing outward */}
        {[
          { delay: 0, color: 'from-neon-pink to-neon-pink/0', amp: 18, speed: 1.8, yOffset: -10 },
          { delay: 0.3, color: 'from-neon-purple to-neon-purple/0', amp: 25, speed: 2.2, yOffset: 0 },
          { delay: 0.6, color: 'from-neon-cyan to-neon-cyan/0', amp: 14, speed: 1.5, yOffset: 10 },
          { delay: 0.15, color: 'from-neon-pink/60 to-neon-pink/0', amp: 20, speed: 2.0, yOffset: -5 },
          { delay: 0.45, color: 'from-neon-purple/60 to-neon-purple/0', amp: 16, speed: 1.7, yOffset: 5 },
        ].map((wave, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{ top: `calc(50% + ${wave.yOffset}px)`, transform: 'translateY(-50%)' }}
          >
            <svg width="100%" height="100" viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full">
              <motion.polyline
                points={generateWavePoints(i * 2, wave.amp)}
                fill="none"
                className="stroke-neon-pink"
                style={{
                  stroke: `url(#gradient-right-${i})`,
                }}
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  strokeWidth: [1, 2.5, 1],
                }}
                transition={{ duration: wave.speed, repeat: Infinity, delay: wave.delay }}
              />
              <defs>
                <linearGradient id={`gradient-right-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#06b6d4'} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#06b6d4'} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}

        {/* Floating signal particles going right */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + Math.random() * 4,
              height: 3 + Math.random() * 4,
              background: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#06b6d4',
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={{
              x: [0, 300],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 1.5,
              repeat: Infinity,
              delay: i * 0.35,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Audio signal going LEFT from mic */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute right-1/2 mr-8 w-[calc(50%-48px)] h-full overflow-hidden"
        style={{ transform: 'scaleX(-1)' }}
      >
        {[
          { delay: 0.1, color: 'from-neon-pink to-neon-pink/0', amp: 18, speed: 1.8, yOffset: -10 },
          { delay: 0.4, color: 'from-neon-purple to-neon-purple/0', amp: 25, speed: 2.2, yOffset: 0 },
          { delay: 0.7, color: 'from-neon-cyan to-neon-cyan/0', amp: 14, speed: 1.5, yOffset: 10 },
          { delay: 0.25, color: 'from-neon-pink/60 to-neon-pink/0', amp: 20, speed: 2.0, yOffset: -5 },
          { delay: 0.55, color: 'from-neon-purple/60 to-neon-purple/0', amp: 16, speed: 1.7, yOffset: 5 },
        ].map((wave, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{ top: `calc(50% + ${wave.yOffset}px)`, transform: 'translateY(-50%)' }}
          >
            <svg width="100%" height="100" viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full">
              <motion.polyline
                points={generateWavePoints(i * 3 + 1, wave.amp)}
                fill="none"
                style={{
                  stroke: `url(#gradient-left-${i})`,
                }}
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  strokeWidth: [1, 2.5, 1],
                }}
                transition={{ duration: wave.speed, repeat: Infinity, delay: wave.delay }}
              />
              <defs>
                <linearGradient id={`gradient-left-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#06b6d4'} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#06b6d4'} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}

        {/* Floating signal particles going left (visually, since container is scaleX(-1)) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + Math.random() * 4,
              height: 3 + Math.random() * 4,
              background: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#06b6d4',
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={{
              x: [0, 300],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 1.5,
              repeat: Infinity,
              delay: i * 0.35 + 0.15,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Center mic positioning layer (place mic in center) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[calc(50%-16px)] h-full pointer-events-none" />
    </div>
  );
};

export function Home() {
  const { sounds, testimonials } = useData();
  const { addItem } = useCart();
  const featuredSounds = sounds.filter(s => s.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 via-transparent to-neon-purple/5" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-neon-pink/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-neon-purple/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-pink/20 bg-neon-pink/5 px-4 py-2 text-sm text-neon-pink"
            >
              <Candy className="h-4 w-4" /> The candy store for your ears.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-white">Sweet Sounds for</span>
              <br />
              <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
                Creative Minds
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-dark-200"
            >
              Discover high-quality, professionally recorded sound effects for your films,
              games, podcasts, and creative projects. Every sound crafted with care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/products"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 transition-shadow"
              >
                Browse Sounds
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 rounded-xl border border-dark-600 bg-dark-800 px-8 py-4 text-sm font-semibold text-white hover:bg-dark-700 transition-colors"
              >
                <Play className="h-4 w-4" /> Learn More
              </Link>
            </motion.div>

            {/* Microphone Audio Signal Animation */}
            <div className="mt-16">
              <MicrophoneAudioVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white">Why SoundCandy?</h2>
          <p className="mt-3 text-dark-200">Everything you need for professional sound design</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Headphones, title: 'Studio Quality', desc: 'Every sound, captured wild. Delivered sweet.' },
            { icon: Zap, title: 'Instant Download', desc: 'Purchase and download immediately. No subscription needed — own your sounds forever.' },
            { icon: Shield, title: 'Secure Payments', desc: 'Shop with confidence using our encrypted, secure payment system. Your data is always protected.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-dark-600/50 bg-dark-800/50 p-8 hover:border-neon-pink/30 hover:bg-dark-800 transition-all duration-300"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-pink/10 to-neon-purple/10 text-neon-pink group-hover:from-neon-pink/20 group-hover:to-neon-purple/20 transition-colors">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-dark-300 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Releases - dynamic, only shows when products exist */}
      {featuredSounds.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">New Releases</h2>
              <p className="mt-2 text-dark-200">Fresh sounds just added to the library</p>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-sm text-neon-pink hover:text-neon-pink/80 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredSounds.map((sound, i) => (
              <motion.div
                key={sound.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-dark-600/50 bg-dark-800/50 overflow-hidden hover:border-neon-pink/30 transition-all duration-300"
              >
                <div className="relative h-40 bg-gradient-to-br from-dark-700 to-dark-600 flex items-center justify-center">
                  <div className="flex items-end gap-0.5">
                    {Array.from({ length: 20 }).map((_, j) => (
                      <motion.div
                        key={j}
                        className="w-1 bg-gradient-to-t from-neon-pink/40 to-neon-purple/40 rounded-full"
                        animate={{ height: [`${8 + Math.random() * 20}px`, `${8 + Math.random() * 40}px`, `${8 + Math.random() * 20}px`] }}
                        transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: j * 0.05 }}
                      />
                    ))}
                  </div>
                  {sound.isNew && (
                    <span className="absolute top-3 right-3 rounded-full bg-neon-pink px-2.5 py-0.5 text-[10px] font-bold text-white">NEW</span>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs text-neon-pink font-medium">{sound.category}</span>
                  <h3 className="mt-1 font-semibold text-white truncate">{sound.name}</h3>
                  <p className="mt-1 text-xs text-dark-300 line-clamp-2">{sound.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-white">${sound.price.toFixed(2)}</span>
                    <button
                      onClick={() => addItem({ id: sound.id, name: sound.name, price: sound.price, category: sound.category })}
                      className="rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 text-xs font-semibold text-white hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials - dynamic, only shows when testimonials exist */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">What People Say</h2>
            <p className="mt-3 text-dark-200">Trusted by professionals worldwide</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-dark-600/50 bg-dark-800/50 p-6"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-sm text-dark-200 mb-4">&ldquo;{t.content}&rdquo;</p>
                <p className="text-sm font-semibold text-white">{t.userName}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Stats / Empty State Highlights */}
      {sounds.length === 0 && testimonials.length === 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white">Getting Started</h2>
            <p className="mt-3 text-dark-200">New flavors are being unwrapped — check back soon.</p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Package, title: 'Products Coming Soon', desc: 'Our library of premium sound effects is being curated. Browse the products page to see what\'s available.', link: '/products', linkText: 'View Products' },
              { icon: FileText, title: 'Blog Updates', desc: 'Stay tuned for news, tutorials, equipment reviews, and new release announcements on our blog.', link: '/blog', linkText: 'Visit Blog' },
              { icon: MessageSquare, title: 'Share Your Feedback', desc: 'Sign in and leave a testimonial on our Credits page. We\'d love to hear from you!', link: '/credits', linkText: 'Leave a Review' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-dark-600/50 bg-dark-800/50 p-8 hover:border-neon-pink/30 hover:bg-dark-800 transition-all duration-300 flex flex-col"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-pink/10 to-neon-purple/10 text-neon-pink group-hover:from-neon-pink/20 group-hover:to-neon-purple/20 transition-colors">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-dark-300 leading-relaxed mb-4 flex-1">{item.desc}</p>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1 text-sm text-neon-pink hover:text-neon-pink/80 font-medium transition-colors"
                >
                  {item.linkText} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 border border-neon-pink/20 p-12 text-center"
        >
          <div className="absolute top-0 left-1/3 h-64 w-64 rounded-full bg-neon-pink/5 blur-3xl" />
          <h2 className="relative text-3xl font-bold text-white mb-4">Ready to Sweeten Your Sound?</h2>
          <p className="relative text-dark-200 mb-8 max-w-xl mx-auto">
            Explore our full library of premium sound effects and find the perfect sounds for your next project.
          </p>
          <Link
            to="/products"
            className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 transition-shadow"
          >
            Explore Library <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
