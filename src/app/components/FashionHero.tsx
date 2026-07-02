import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme, tc } from '../context/ThemeContext';

// Thin ornamental divider line — inspired by Indian rangoli / mehndi borders
const OrnamentalLine = ({ isDark }: { isDark: boolean }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className={`h-px flex-1 ${isDark ? 'bg-[#c9a84c]/30' : 'bg-[#c8900a]/30'}`} />
    <div className={`w-1.5 h-1.5 rotate-45 ${isDark ? 'bg-[#c9a84c]/60' : 'bg-[#c8900a]/60'}`} />
    <div className={`h-px w-6 ${isDark ? 'bg-[#c9a84c]/50' : 'bg-[#c8900a]/50'}`} />
    <div className={`w-2 h-2 rotate-45 border ${isDark ? 'border-[#c9a84c]/70' : 'border-[#c8900a]/70'}`} />
    <div className={`h-px w-6 ${isDark ? 'bg-[#c9a84c]/50' : 'bg-[#c8900a]/50'}`} />
    <div className={`w-1.5 h-1.5 rotate-45 ${isDark ? 'bg-[#c9a84c]/60' : 'bg-[#c8900a]/60'}`} />
    <div className={`h-px flex-1 ${isDark ? 'bg-[#c9a84c]/30' : 'bg-[#c8900a]/30'}`} />
  </div>
);

export const FashionHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { isDark } = useTheme();
  const t = tc(isDark);

  const yText    = useTransform(scrollY, [0, 500], [0, 140]);
  const yBg      = useTransform(scrollY, [0, 500], [0, 70]);
  const yImg     = useTransform(scrollY, [0, 500], [0, 55]);
  const opacityT = useTransform(scrollY, [0, 350], [1, 0]);
  const scaleImg = useTransform(scrollY, [0, 500], [1, 1.06]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: isDark ? '#0f0508' : '#faf6ef' }}
    >
      {/* Warm atmospheric glows */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.035] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        {isDark ? (
          <>
            <div className="absolute top-[-15%] left-[5%]  w-[50vw] h-[50vw] bg-[#7c1a2e]/20 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '9s' }} />
            <div className="absolute bottom-[-15%] right-[5%] w-[40vw] h-[40vw] bg-[#c9a84c]/10 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '11s' }} />
          </>
        ) : (
          <>
            <div className="absolute top-[-15%] left-[5%]  w-[50vw] h-[50vw] bg-amber-100/70 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-15%] right-[5%] w-[40vw] h-[40vw] bg-rose-100/50  rounded-full blur-[140px]" />
          </>
        )}
      </motion.div>

      {/* Subtle geometric grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to right,rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(201,168,76,0.04) 1px,transparent 1px)'
            : 'linear-gradient(to right,rgba(124,26,46,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(124,26,46,0.04) 1px,transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,#000 55%,transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">

        {/* Left: editorial text */}
        <motion.div style={{ y: yText, opacity: opacityT }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p
              className="text-[10px] tracking-[0.35em] uppercase mb-6"
              style={{ color: isDark ? '#c9a84c' : '#9a6e10', fontFamily: 'Jost, sans-serif' }}
            >
              Heritage Couture · New Season 2026
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="leading-[0.88] tracking-tight mb-6"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(3.2rem,7.5vw,7.5rem)',
              color: isDark ? '#faf6ef' : '#1a0808',
            }}
          >
            Where<br />
            <em style={{ color: isDark ? '#c9a84c' : '#7c1a2e' }}>Tradition</em><br />
            Meets Luxury
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <OrnamentalLine isDark={isDark} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="leading-relaxed mb-10 text-sm max-w-sm"
            style={{ fontFamily: 'Jost, sans-serif', color: isDark ? '#b89070' : '#8a5a40' }}
          >
            Handcrafted Indian ethnic wear celebrating centuries of artisanal craft — from the looms of Varanasi to the workshops of Jaipur.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <Link
              to="/shop"
              className="group flex items-center gap-3 px-8 py-4 text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                background: isDark ? '#c9a84c' : '#7c1a2e',
                color:      isDark ? '#0f0508' : '#faf6ef',
                fontFamily: 'Jost, sans-serif',
              }}
            >
              Explore Collection
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/shop?category=New Season"
              className="px-8 py-4 text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                border:    `1px solid ${isDark ? 'rgba(201,168,76,0.40)' : 'rgba(124,26,46,0.35)'}`,
                color:     isDark ? '#c9a84c' : '#7c1a2e',
                fontFamily:'Jost, sans-serif',
              }}
            >
              New Arrivals
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mt-14 flex items-center gap-8"
          >
            {[
              ['500+', 'Artisan Families'],
              ['22', 'Craft Traditions'],
              ['15yr', 'Heritage'],
            ].map(([val, label]) => (
              <div key={label}>
                <p
                  className="text-sm mb-0.5"
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: isDark ? '#c9a84c' : '#7c1a2e',
                  }}
                >
                  {val}
                </p>
                <p
                  className="text-[9px] tracking-widest uppercase"
                  style={{ fontFamily: 'Jost, sans-serif', color: isDark ? '#6a4830' : '#c09060' }}
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: editorial image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ y: yImg, scale: scaleImg }}
          className="relative hidden md:block h-[82vh] overflow-hidden"
        >
          {/* Thin gold frame */}
          <div
            className="absolute inset-2 z-10 pointer-events-none"
            style={{ border: `1px solid ${isDark ? 'rgba(201,168,76,0.25)' : 'rgba(124,26,46,0.18)'}` }}
          />

          <img
            src="https://images.unsplash.com/photo-1717835806988-3739f9e55926?w=1080&q=80"
            alt="Aurelia — Indian Ethnic Fashion"
            className="w-full h-full object-cover"
          />

          {/* Gradient fade into bg */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? 'linear-gradient(to top, #0f0508 0%, transparent 35%), linear-gradient(to right, #0f0508 0%, transparent 30%)'
                : 'linear-gradient(to top, #faf6ef 0%, transparent 35%), linear-gradient(to right, #faf6ef 0%, transparent 28%)',
            }}
          />

          {/* Product callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="absolute bottom-8 right-6 backdrop-blur-md px-4 py-3"
            style={{
              background: isDark ? 'rgba(15,5,8,0.85)' : 'rgba(250,246,239,0.92)',
              border: `1px solid ${isDark ? 'rgba(201,168,76,0.25)' : 'rgba(200,144,10,0.28)'}`,
            }}
          >
            <p className="text-[9px] tracking-widest uppercase mb-1" style={{ color: isDark ? '#c9a84c' : '#9a6e10', fontFamily: 'Jost, sans-serif' }}>
              Featured
            </p>
            <p className="text-sm" style={{ fontFamily: '"Playfair Display", Georgia, serif', color: isDark ? '#faf6ef' : '#1a0808' }}>
              Banarasi Katan Saree
            </p>
            <p className="text-xs mt-0.5" style={{ color: isDark ? '#b89070' : '#8a5a40', fontFamily: 'Jost, sans-serif' }}>
              From ₹22,500
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
