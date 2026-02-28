import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, BookOpen, Mail, FileText, ChevronDown, Send, CheckCircle } from 'lucide-react';

const supportTabs = [
  { name: 'FAQ', icon: HelpCircle },
  { name: 'Tutorials', icon: BookOpen },
  { name: 'Contact', icon: Mail },
  { name: 'Terms & Conditions', icon: FileText },
];

const faqs = [
  { q: 'What audio formats are available?', a: 'We provide sound effects in WAV (24-bit/96kHz), MP3 (320kbps), AIFF, FLAC, and OGG formats. WAV is our primary format for the highest quality.' },
  { q: 'Do you offer refunds?', a: 'Due to the digital nature of our products, we generally do not offer refunds after download. However, if you experience technical issues, please contact support and we will help resolve the problem.' },
  { q: 'Can I request custom sound effects?', a: 'Absolutely! We offer custom sound design services. Contact us through the support form with your requirements and we will provide a quote.' },
  { q: 'How do I download my purchased sounds?', a: 'After completing your purchase, you will receive download links via email. You can also access your purchases through your account dashboard.' },
  { q: 'Do you offer bulk pricing?', a: 'Yes, we offer discounts for bulk purchases. Contact us for custom pricing on large orders.' },
];

const tutorials: { title: string; desc: string; duration: string }[] = [];

export function Support() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setContactSent(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white">Support</h1>
        <p className="mt-2 text-dark-200">Get help, learn, and stay informed</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {supportTabs.map((tab, i) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(i)}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
              activeTab === i
                ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-lg shadow-neon-pink/20'
                : 'bg-dark-700 text-dark-200 hover:text-white hover:bg-dark-600'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* FAQ */}
      {activeTab === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-dark-600/50 bg-dark-800/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-white hover:bg-dark-700/50 transition-colors"
              >
                {faq.q}
                <ChevronDown className={`h-4 w-4 text-dark-300 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm text-dark-300 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Tutorials */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {tutorials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dark-700">
                <BookOpen className="h-8 w-8 text-dark-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No Tutorials Yet</h3>
              <p className="text-sm text-dark-400 max-w-sm">Tutorials will be added here soon. Check back later for guides on sound design, recording techniques, and more.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tutorials.map((tut, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl border border-dark-600/50 bg-dark-800/50 p-6 hover:border-neon-pink/30 transition-all duration-300"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neon-pink/10 to-neon-purple/10 text-neon-pink group-hover:from-neon-pink/20 group-hover:to-neon-purple/20 transition-colors">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{tut.title}</h3>
                  <p className="text-sm text-dark-300 mb-3">{tut.desc}</p>
                  <span className="text-xs text-dark-400">{tut.duration}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Contact */}
      {activeTab === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg">
          <div className="rounded-2xl border border-dark-600/50 bg-dark-800/50 p-8">
            <h3 className="text-xl font-semibold text-white mb-2">Get in Touch</h3>
            <p className="text-sm text-dark-300 mb-6">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

            {contactSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-sm text-dark-300">We&apos;ll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleContact} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1.5">Name</label>
                    <input
                      required
                      type="text"
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-1.5">Subject</label>
                  <input
                    required
                    type="text"
                    value={contactForm.subject}
                    onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full rounded-xl border border-dark-600 bg-dark-700 py-3 px-4 text-sm text-white placeholder-dark-400 focus:border-neon-pink focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more..."
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple py-3 text-sm font-semibold text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 transition-shadow"
                >
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </motion.div>
      )}

      {/* Terms */}
      {activeTab === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
          <div className="rounded-2xl border border-dark-600/50 bg-dark-800/50 p-8 prose prose-invert prose-sm max-w-none">
            <h2 className="text-xl font-bold text-white mb-4">Terms & Conditions</h2>
            <p className="text-dark-300 mb-4">Last updated: January 2024</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">1. License Agreement</h3>
            <p className="text-sm text-dark-300 leading-relaxed mb-4">
              By purchasing sound effects from SoundCandy, you are granted a non-exclusive, worldwide, royalty-free license to use the sounds in unlimited personal and commercial projects. This license is perpetual and does not require attribution.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">2. Permitted Uses</h3>
            <p className="text-sm text-dark-300 leading-relaxed mb-4">
              You may use purchased sounds in films, television, video games, podcasts, music productions, advertisements, mobile apps, websites, presentations, and any other media format.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">3. Restrictions</h3>
            <p className="text-sm text-dark-300 leading-relaxed mb-4">
              You may not resell, redistribute, or share the original sound files. You may not create a competing sound effects library using our sounds. The sounds must be incorporated into a larger project and cannot be sold as standalone audio files.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">4. Refund Policy</h3>
            <p className="text-sm text-dark-300 leading-relaxed mb-4">
              Due to the digital nature of our products, all sales are final. If you experience technical issues with a download, please contact our support team for assistance.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">5. Intellectual Property</h3>
            <p className="text-sm text-dark-300 leading-relaxed mb-4">
              All sound effects, recordings, and associated materials are the intellectual property of SoundCandy. The license grants usage rights but does not transfer ownership.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">6. Privacy</h3>
            <p className="text-sm text-dark-300 leading-relaxed mb-4">
              We respect your privacy. Personal information collected during registration and purchases is used solely for providing our services and will not be shared with third parties without your consent.
            </p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">7. Contact</h3>
            <p className="text-sm text-dark-300 leading-relaxed">
              For any questions about these terms, please contact us at matthewcalabresecareers@gmail.com.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
