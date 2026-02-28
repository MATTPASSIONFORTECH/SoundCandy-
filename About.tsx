import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Candy, Headphones, Award, Heart, ArrowRight, Mic, Volume2, Waves } from 'lucide-react';

export function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Hero */}
      <section className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple shadow-lg shadow-neon-pink/25"
        >
          <Candy className="h-10 w-10 text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
        >
          About SoundCandy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-dark-200 max-w-2xl mx-auto"
        >
          Some things are better unwrapped.
        </motion.p>
      </section>

      {/* About Me */}
      <section className="py-12">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-dark-700 to-dark-600 p-12 flex items-center justify-center">
                <div className="relative">
                  <div className="h-48 w-48 rounded-full bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center">
                    <div className="h-36 w-36 rounded-full bg-gradient-to-br from-neon-pink/30 to-neon-purple/30 flex items-center justify-center">
                      <Headphones className="h-16 w-16 text-neon-pink" />
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    <Mic className="absolute -top-2 left-1/2 -translate-x-1/2 h-6 w-6 text-neon-purple" />
                    <Volume2 className="absolute top-1/2 -right-2 -translate-y-1/2 h-6 w-6 text-neon-cyan" />
                    <Waves className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-6 w-6 text-neon-pink" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Hi, I&apos;m Matthew Calabrese</h2>
            <p className="text-dark-200 leading-relaxed mb-4">
              I&apos;m a professional sound designer and audio engineer with a deep passion for creating immersive 
              soundscapes. With years of experience in audio. I&apos;m eager to bring my talent and skills to a 
              professional setting and contribute to creating exceptional auditory experiences.
            </p>
            <p className="text-dark-200 leading-relaxed mb-4">
              SoundCandy was born from a simple vision: to make high-quality, professionally crafted sound effects 
              accessible to everyone — from indie creators to large studios. Every sound in our library is 
              meticulously recorded, edited, and processed to meet the highest industry standards.
            </p>
            <p className="text-dark-200 leading-relaxed mb-6">
              I believe that great sound design can transform any project. Whether you&apos;re creating a film, building 
              a game, producing a podcast, or working on any creative endeavor, the right sound can make all the 
              difference. That&apos;s why I&apos;m committed to delivering sounds that inspire creativity and elevate your work.
            </p>
            <div className="flex gap-3">
              <Link
                to="/products"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-neon-pink/25 transition-shadow"
              >
                Explore Library <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/support"
                className="flex items-center gap-2 rounded-xl border border-dark-600 bg-dark-800 px-6 py-3 text-sm font-semibold text-white hover:bg-dark-700 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-neon-pink/5 to-neon-purple/5 border border-neon-pink/10 p-12 text-center"
        >
          <Heart className="mx-auto h-10 w-10 text-neon-pink mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-dark-200 max-w-2xl mx-auto leading-relaxed">
            Premium audio, curated and ready — so you can spend less time searching and more time creating.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What Drives Us</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Award, title: 'Quality First', desc: 'Every sound is recorded with professional equipment and processed to the highest standards. We never compromise on quality.' },
            { icon: Heart, title: 'Creator-Focused', desc: 'We build for creators. Our library, licensing, and pricing are designed to support your creative workflow.' },
            { icon: Headphones, title: 'Always Listening', desc: 'We actively listen to our community. Your feedback shapes our library and drives us to continuously improve.' },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-dark-600/50 bg-dark-800/50 p-8 hover:border-neon-pink/30 transition-all duration-300 group"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-pink/10 to-neon-purple/10 text-neon-pink group-hover:from-neon-pink/20 group-hover:to-neon-purple/20 transition-colors">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-dark-300 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>



    </div>
  );
}
