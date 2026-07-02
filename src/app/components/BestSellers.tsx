import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBestSellers } from '../data/products';
import { ProductCard } from './ProductCard';
import { useTheme, tc } from '../context/ThemeContext';

export const BestSellers = () => {
  const { isDark } = useTheme();
  const t = tc(isDark);
  const items = getBestSellers();

  return (
    <section className={`${t.pageBg} py-24 px-6 border-t ${t.border}`}>
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className={`text-[10px] tracking-widest uppercase ${t.gold} mb-3`} style={{ fontFamily: 'Jost, sans-serif' }}>
              Most Beloved
            </p>
            <h2
              className={`text-4xl md:text-5xl ${t.text}`}
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Best Sellers
            </h2>
          </div>
          <Link
            to="/shop"
            className={`hidden md:flex items-center gap-2 text-xs tracking-widest uppercase ${t.textMuted} transition-colors group`}
            style={{ fontFamily: 'Jost, sans-serif' }}
          >
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((product, i) => (
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
