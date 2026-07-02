import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSaleItems } from '../data/products';
import { ProductCard } from './ProductCard';
import { useTheme, tc } from '../context/ThemeContext';

const useCountdown = (targetHours = 23) => {
  const [time, setTime] = useState({ h: targetHours, m: 59, s: 59 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
};

const Digit = ({ value, label, isDark }: { value: number; label: string; isDark: boolean }) => {
  const t = tc(isDark);
  return (
    <div className="flex flex-col items-center">
      <div className={`${t.cardBg} border ${t.borderMd} px-4 py-3 min-w-[64px] text-center`}>
        <motion.span
          key={value}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={`text-3xl md:text-4xl ${t.text} block`}
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className={`text-[9px] tracking-widest uppercase ${t.textDimmer} mt-2`} style={{ fontFamily: 'Jost, sans-serif' }}>
        {label}
      </span>
    </div>
  );
};

export const FlashSale = () => {
  const { isDark } = useTheme();
  const t = tc(isDark);
  const time = useCountdown(23);
  const saleItems = getSaleItems();

  return (
    <section className={`${t.pageBg} py-24 px-6 border-t ${t.border} relative overflow-hidden`}>
      {/* Warm gold glow accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: isDark ? 'rgba(201,168,76,0.06)' : 'rgba(200,144,10,0.08)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[100px]"
          style={{ background: isDark ? 'rgba(124,26,46,0.08)' : 'rgba(124,26,46,0.06)' }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className={`text-[10px] tracking-widest uppercase ${t.gold} mb-3`} style={{ fontFamily: 'Jost, sans-serif' }}>
              Limited Time
            </p>
            <h2
              className={`text-5xl md:text-7xl ${t.text} mb-2 leading-[0.9]`}
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Festive<br />
              <em style={{ color: isDark ? '#c9a84c' : '#7c1a2e' }}>Sale</em>
            </h2>
            <p className={`${t.textMuted} text-sm mt-4`} style={{ fontFamily: 'Jost, sans-serif' }}>
              Up to 30% off selected handcrafted pieces. Celebrating the season of craft.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className={`text-[10px] tracking-widest uppercase ${t.gold} mb-6`} style={{ fontFamily: 'Jost, sans-serif' }}>
              Offer Ends In
            </p>
            <div className="flex items-end gap-3">
              <Digit value={time.h} label="Hours"   isDark={isDark} />
              <span className={`${t.textDimmer} text-2xl pb-7`}>:</span>
              <Digit value={time.m} label="Minutes" isDark={isDark} />
              <span className={`${t.textDimmer} text-2xl pb-7`}>:</span>
              <Digit value={time.s} label="Seconds" isDark={isDark} />
            </div>
            <Link
              to="/shop?sale=true"
              className={`mt-8 group flex items-center gap-2 text-xs tracking-widest uppercase ${t.textMuted} transition-colors`}
              style={{ fontFamily: 'Jost, sans-serif' }}
            >
              Shop the Sale <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {saleItems.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
