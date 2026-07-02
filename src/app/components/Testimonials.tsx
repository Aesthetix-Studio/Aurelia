import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme, tc } from '../context/ThemeContext';

const reviews = [
  {
    id: 1,
    name: 'Priya Mehta',
    location: 'Mumbai, India',
    rating: 5,
    text: 'The Banarasi Katan Silk Saree from Aurelia is simply extraordinary. The Zari work catches light in the most breathtaking way — I wore it to my cousin\'s wedding and received compliments the entire evening. This is heirloom quality.',
    product: 'Banarasi Katan Silk Saree',
    avatar: 'PM',
  },
  {
    id: 2,
    name: 'Arjun Kapoor',
    location: 'Delhi, India',
    rating: 5,
    text: 'The Ivory Sherwani arrived immaculately packaged. The Tilla embroidery is so fine it looks painted on. I wore it for my reception and it was everything I dreamed of. Aurelia understands groom\'s fashion at a completely different level.',
    product: 'Ivory Zari Sherwani',
    avatar: 'AK',
  },
  {
    id: 3,
    name: 'Ananya Singh',
    location: 'Bangalore, India',
    rating: 5,
    text: 'The Zardozi Bridal Lehenga was my wedding dream made real. I consulted with their team for months and the result was absolutely perfect — the embellishment detail was beyond anything I had seen at that price point.',
    product: 'Zardozi Bridal Lehenga',
    avatar: 'AS',
  },
  {
    id: 4,
    name: 'Kavita Nair',
    location: 'Chennai, India',
    rating: 5,
    text: 'My Kanjeevaram saree is so authentic I could feel the difference the moment I draped it. The korvai border is pristine. Aurelia truly sources from master weavers — this is not mass production. It is craft.',
    product: 'Kanjeevaram Silk Saree',
    avatar: 'KN',
  },
];

export const Testimonials = () => {
  const [active, setActive] = useState(0);
  const { isDark } = useTheme();
  const t = tc(isDark);

  const prev = () => setActive(a => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive(a => (a + 1) % reviews.length);

  return (
    <section className={`${t.sectionAlt2} py-24 px-6 border-t ${t.border}`}>
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className={`text-[10px] tracking-widest uppercase ${t.gold} mb-3`} style={{ fontFamily: 'Jost, sans-serif' }}>
            Testimonials
          </p>
          <h2 className={`text-4xl md:text-5xl ${t.text}`} style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            Worn & Cherished
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: reviews[active].rating }).map((_, i) => (
                  <Star key={i} size={14} style={{ fill: isDark ? '#c9a84c' : '#9a6e10', color: isDark ? '#c9a84c' : '#9a6e10' }} />
                ))}
              </div>

              <p
                className={`text-lg md:text-xl leading-relaxed mb-10 italic ${t.textSec}`}
                style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif' }}
              >
                "{reviews[active].text}"
              </p>

              <div
                className="inline-block px-3 py-1 border text-[10px] tracking-widest uppercase mb-8"
                style={{
                  borderColor: isDark ? 'rgba(201,168,76,0.3)' : 'rgba(200,144,10,0.3)',
                  color: isDark ? '#c9a84c' : '#9a6e10',
                  fontFamily: 'Jost, sans-serif',
                }}
              >
                {reviews[active].product}
              </div>

              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center text-xs rounded-full"
                  style={{
                    background: isDark ? '#1e0d13' : '#f0e4d0',
                    border: `1px solid ${isDark ? 'rgba(201,168,76,0.2)' : 'rgba(200,144,10,0.25)'}`,
                    color: isDark ? '#c9a84c' : '#9a6e10',
                    fontFamily: 'Jost, sans-serif',
                  }}
                >
                  {reviews[active].avatar}
                </div>
                <div className="text-left">
                  <p className={`text-sm ${t.text}`} style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                    {reviews[active].name}
                  </p>
                  <p className={`text-xs ${t.textDim}`} style={{ fontFamily: 'Jost, sans-serif' }}>
                    {reviews[active].location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center border transition-all"
              style={{
                borderColor: isDark ? 'rgba(201,168,76,0.25)' : 'rgba(200,144,10,0.25)',
                color: isDark ? '#b89070' : '#8a5a40',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === active ? '1.5rem' : '0.25rem',
                    height: '0.25rem',
                    borderRadius: i === active ? 0 : '50%',
                    background: i === active
                      ? (isDark ? '#c9a84c' : '#7c1a2e')
                      : (isDark ? 'rgba(201,168,76,0.25)' : 'rgba(124,26,46,0.25)'),
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center border transition-all"
              style={{
                borderColor: isDark ? 'rgba(201,168,76,0.25)' : 'rgba(200,144,10,0.25)',
                color: isDark ? '#b89070' : '#8a5a40',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
