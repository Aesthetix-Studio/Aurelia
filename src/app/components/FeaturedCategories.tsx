import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import { useTheme, tc } from '../context/ThemeContext';

export const FeaturedCategories = () => {
  const { isDark } = useTheme();
  const t = tc(isDark);

  return (
    <section className={`${t.pageBg} py-24 px-6`}>
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
              Our Collections
            </p>
            <h2
              className={`text-4xl md:text-5xl ${t.text}`}
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Shop by Category
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className=""
            >
              <Link
                to={`/shop?category=${cat.name}`}
                className="group relative block overflow-hidden aspect-[3/4]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  style={{ filter: 'brightness(0.88) saturate(1.1)' }}
                />
                {/* Warm gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(to top, rgba(26,8,8,0.82) 0%, rgba(26,8,8,0.15) 55%, transparent 100%)',
                  }}
                />
                {/* Gold border on hover */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ border: '1px solid rgba(201,168,76,0.45)' }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p
                    className="text-[9px] tracking-widest uppercase mb-1"
                    style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(201,168,76,0.85)' }}
                  >
                    {cat.count} pieces
                  </p>
                  <p
                    className="text-lg text-white"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {cat.name}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
