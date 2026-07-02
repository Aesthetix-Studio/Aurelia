import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme, tc } from '../context/ThemeContext';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { isDark } = useTheme();
  const t = tc(isDark);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitted(true);
    toast.success('You\'re on the list.', { description: 'Expect the extraordinary.', duration: 3000 });
    setEmail('');
  };

  return (
    <section className={`${t.pageBg} py-32 px-6 border-t ${t.border} relative overflow-hidden`}>
      {/* Warm ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px]"
          style={{ background: isDark ? 'rgba(201,168,76,0.06)' : 'rgba(200,144,10,0.07)' }}
        />
      </div>

      <div className="max-w-2xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={`text-[10px] tracking-widest uppercase ${t.gold} mb-4`} style={{ fontFamily: 'Jost, sans-serif' }}>
            The Inner Circle
          </p>
          <h2
            className={`text-5xl md:text-6xl ${t.text} mb-4 leading-tight`}
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Join the<br />
            <em style={{ color: isDark ? '#c9a84c' : '#7c1a2e' }}>Craft Circle</em>
          </h2>
          <p className={`${t.textMuted} text-sm mb-10 leading-relaxed`} style={{ fontFamily: 'Jost, sans-serif' }}>
            Early access to new collections. Private sale invitations. Stories from our artisan workshops.
            Letters from the looms of India.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`py-4 border ${t.borderMd} text-sm ${t.textSec} tracking-widest`}
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Welcome to the circle. Watch this space.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className={`flex-1 ${t.inputField} px-5 py-4 text-sm outline-none transition-colors`}
                style={{ fontFamily: 'Jost, sans-serif' }}
                required
              />
              <button
                type="submit"
                className={`px-8 py-4 text-xs tracking-widest uppercase transition-colors flex items-center gap-2 justify-center flex-shrink-0 ${t.btnPrimary}`}
                style={{ fontFamily: 'Jost, sans-serif' }}
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          )}

          <p className={`text-xs ${t.textDimmer} mt-4`} style={{ fontFamily: 'Jost, sans-serif' }}>
            No spam. Unsubscribe anytime. We honour your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
