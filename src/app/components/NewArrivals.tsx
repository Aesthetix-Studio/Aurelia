import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getNewArrivals } from '../data/products';
import { ProductCard } from './ProductCard';
import { useTheme, tc } from '../context/ThemeContext';

export const NewArrivals = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const t = tc(isDark);
  const items = getNewArrivals();

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
  };

  const navBtnStyle = {
    borderColor: isDark ? 'rgba(201,168,76,0.22)' : 'rgba(200,144,10,0.28)',
    color: isDark ? '#b89070' : '#8a5a40',
  };

  return (
    <section className={`${t.sectionAlt} py-24 border-t ${t.border}`}>
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-12 px-6"
        >
          <div>
            <p className={`text-[10px] tracking-widest uppercase ${t.gold} mb-3`} style={{ fontFamily: 'Jost, sans-serif' }}>
              Just Arrived
            </p>
            <h2
              className={`text-4xl md:text-5xl ${t.text}`}
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              New Arrivals
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left')} className="w-10 h-10 border flex items-center justify-center transition-all" style={navBtnStyle}>
                <ArrowLeft size={16} />
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 border flex items-center justify-center transition-all" style={navBtnStyle}>
                <ArrowRight size={16} />
              </button>
            </div>
            <Link
              to="/shop?category=New Season"
              className={`hidden md:flex items-center gap-2 text-xs tracking-widest uppercase ${t.textMuted} transition-colors group`}
              style={{ fontFamily: 'Jost, sans-serif' }}
            >
              All New In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 px-6 snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex-shrink-0 w-[280px] snap-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}

          {/* View all card */}
          <Link
            to="/shop?category=New Season"
            className="flex-shrink-0 w-[280px] aspect-[3/4] flex flex-col items-center justify-center gap-4 border transition-all group"
            style={{
              background: isDark ? '#1e0d13' : '#f5ede0',
              borderColor: isDark ? 'rgba(201,168,76,0.15)' : 'rgba(200,144,10,0.20)',
            }}
          >
            <span
              className="w-12 h-12 border rounded-full flex items-center justify-center transition-all"
              style={{ borderColor: isDark ? 'rgba(201,168,76,0.3)' : 'rgba(200,144,10,0.35)' }}
            >
              <ArrowRight size={16} style={{ color: isDark ? '#c9a84c' : '#9a6e10' }} />
            </span>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: 'Jost, sans-serif', color: isDark ? '#c9a84c' : '#9a6e10' }}
            >
              View All
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
