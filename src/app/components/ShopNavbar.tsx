import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useTheme, tc } from '../context/ThemeContext';

const megaMenuData = {
  Women: {
    columns: [
      { title: 'Sarees', items: ['Banarasi Silk', 'Kanjeevaram', 'Chanderi', 'Bandhani', 'Ikat', 'Chiffon'] },
      { title: 'Lehengas & Suits', items: ['Bridal Lehenga', 'Festive Lehenga', 'Anarkali Suits', 'Palazzo Sets', 'Salwar Kameez'] },
      { title: 'By Occasion', items: ['Bridal', 'Wedding Guest', 'Festive', 'Daily Wear', 'Office Kurtas'] },
    ],
    featured: {
      label: 'New Sarees',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80',
    },
  },
  Men: {
    columns: [
      { title: 'Traditional', items: ['Sherwanis', 'Kurta Pyjama', 'Dhoti Kurta', 'Chikankari Kurtas'] },
      { title: 'Contemporary', items: ['Nehru Jackets', 'Bandhgala Suits', 'Indo-Western', 'Linen Kurtas'] },
      { title: 'By Occasion', items: ["Groom's Wear", 'Wedding Guest', 'Festive', 'Casual Ethnic'] },
    ],
    featured: {
      label: "New Men's",
      image: 'https://images.unsplash.com/photo-1755889820161-71c7659bad0a?w=400&q=80',
    },
  }
}

export const ShopNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();
  const { isDark, toggleTheme } = useTheme();
  const t = tc(isDark);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaMenu(null); }, [location]);

  const navItems = [
    { name: 'Shop All',   hasMega: false, to: '/shop' },
    { name: 'Women',      hasMega: true,  to: '/shop?category=Sarees' },
    { name: 'Men',        hasMega: true,  to: "/shop?category=Men's Wear" },
    { name: 'Bridal',     hasMega: false, to: '/shop?category=Bridal' },
    { name: 'New Season', hasMega: false, to: '/shop?category=New Season' },
    { name: 'Sale',       hasMega: false, to: '/shop?sale=true' },
  ];

  const badgeCls = `absolute -top-2 -right-2 w-4 h-4 text-[9px] rounded-full flex items-center justify-center font-medium ${isDark ? 'bg-[#c9a84c] text-[#0f0508]' : 'bg-[#7c1a2e] text-[#faf6ef]'}`;
  const iconCls  = `transition-colors ${isDark ? 'text-[#b89070] hover:text-[#faf6ef]' : 'text-[#8a5a40] hover:text-[#1a0808]'}`;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? `${t.navScrolled} backdrop-blur-md border-b py-4` : 'bg-transparent py-6'
        }`}
        onMouseLeave={() => setMegaMenu(null)}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex flex-col leading-none">
            <span
              className="tracking-[0.3em] uppercase"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: isDark ? '#faf6ef' : '#1a0808',
              }}
            >
              AURELIA
            </span>
            <span
              className="text-[8px] tracking-[0.25em] uppercase"
              style={{ fontFamily: 'Jost, sans-serif', color: isDark ? '#c9a84c' : '#9a6e10' }}
            >
              Luxury Indian Fashion
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map(item => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasMega ? setMegaMenu(item.name) : setMegaMenu(null)}
              >
                <Link
                  to={item.to}
                  className={`group flex items-center gap-1 text-[11px] tracking-widest uppercase transition-colors duration-200 ${iconCls}`}
                  style={{ fontFamily: 'Jost, sans-serif' }}
                >
                  {item.name}
                  {item.hasMega && (
                    <ChevronDown size={10} className={`transition-transform duration-200 ${megaMenu === item.name ? 'rotate-180' : ''}`} />
                  )}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: isDark ? '#c9a84c' : '#7c1a2e' }}
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(true)} className={`hidden md:block ${iconCls}`} aria-label="Search">
              <Search size={17} />
            </button>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className={`hidden md:flex items-center justify-center w-7 h-7 ${iconCls}`} aria-label="Toggle theme">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 30, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun size={17} /> : <Moon size={17} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <Link to="/account" className={`hidden md:block ${iconCls}`}><User size={17} /></Link>

            <Link to="/wishlist" className={`relative ${iconCls}`}>
              <Heart size={17} />
              {wishlist.length > 0 && <span className={badgeCls}>{wishlist.length}</span>}
            </Link>

            <button onClick={() => setCartOpen(true)} className={`relative ${iconCls}`} aria-label="Cart">
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className={badgeCls}>{cartCount}</motion.span>
              )}
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden ${iconCls}`}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {megaMenu && megaMenuData[megaMenu as keyof typeof megaMenuData] && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 backdrop-blur-xl border-b"
              style={{
                background: isDark ? 'rgba(15,5,8,0.98)' : 'rgba(250,246,239,0.98)',
                borderColor: isDark ? 'rgba(201,168,76,0.15)' : 'rgba(200,144,10,0.20)',
              }}
            >
              <div className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-4 gap-12">
                {megaMenuData[megaMenu as keyof typeof megaMenuData].columns.map(col => (
                  <div key={col.title}>
                    <p className="text-[10px] tracking-widest uppercase mb-4" style={{ color: isDark ? '#c9a84c' : '#9a6e10', fontFamily: 'Jost, sans-serif' }}>
                      {col.title}
                    </p>
                    <ul className="space-y-3">
                      {col.items.map(item => (
                        <li key={item}>
                          <Link
                            to={`/shop?subcategory=${item}`}
                            className="text-sm transition-colors"
                            style={{ fontFamily: 'Jost, sans-serif', color: isDark ? '#e8d4b0' : '#3c1414' }}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="relative overflow-hidden group cursor-pointer">
                  <img
                    src={megaMenuData[megaMenu as keyof typeof megaMenuData].featured.image}
                    alt="Featured"
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <span className="absolute bottom-4 left-4 text-xs tracking-widest uppercase text-white" style={{ fontFamily: 'Jost, sans-serif' }}>
                    {megaMenuData[megaMenu as keyof typeof megaMenuData].featured.label}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6"
            style={{ background: isDark ? '#0f0508' : '#faf6ef' }}
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link
                    to={item.to}
                    className="text-3xl tracking-tight transition-colors"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', color: isDark ? '#faf6ef' : '#1a0808' }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-auto pb-12 flex items-center gap-8">
              <button onClick={() => { setSearchOpen(true); setMobileOpen(false); }} className={`flex items-center gap-2 text-sm ${iconCls}`} style={{ fontFamily: 'Jost, sans-serif' }}>
                <Search size={16} /> Search
              </button>
              <button onClick={toggleTheme} className={`flex items-center gap-2 text-sm ${iconCls}`} style={{ fontFamily: 'Jost, sans-serif' }}>
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                {isDark ? 'Light' : 'Dark'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
