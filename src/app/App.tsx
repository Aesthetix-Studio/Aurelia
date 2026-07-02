import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';

import { StoreProvider } from './context/StoreContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ShopNavbar } from './components/ShopNavbar';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ShopFooter } from './components/ShopFooter';

import { FashionHero } from './components/FashionHero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { BestSellers } from './components/BestSellers';
import { NewArrivals } from './components/NewArrivals';
import { FlashSale } from './components/FlashSale';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';

import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { WishlistPage } from './components/WishlistPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountPage } from './components/AccountPage';

// ─── Preloader ─────────────────────────────────────────────────────────────────
// Warm cream background with Playfair Display brand name + horizontal shimmer line
const Preloader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
    className="fixed inset-0 z-[999] flex items-center justify-center"
    style={{ background: '#faf6ef' }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-5"
    >
      {/* Brand name */}
      <div className="flex flex-col items-center gap-1">
        <h1
          className="tracking-[0.45em] uppercase"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#1a0808',
          }}
        >
          AURELIA
        </h1>
        <p
          className="text-[9px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'Jost, sans-serif', color: '#9a6e10' }}
        >
          Luxury Indian Fashion
        </p>
      </div>

      {/* Horizontal shimmer line — the animated line from the hero, placed here */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden"
        style={{ width: '10rem', height: '1px', background: 'rgba(200,144,10,0.25)' }}
      >
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear', delay: 0.6 }}
          className="absolute inset-0 w-1/2"
          style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.9), transparent)' }}
        />
      </motion.div>
    </motion.div>
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const HomePage = () => (
  <>
    <FashionHero />
    <FeaturedCategories />
    <BestSellers />
    <NewArrivals />
    <FlashSale />
    <Testimonials />
    <Newsletter />
  </>
);

const AppLayout = ({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) => (
  <>
    <ShopNavbar />
    <CartDrawer />
    <SearchModal />
    {children}
    {!hideFooter && <ShopFooter />}
  </>
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"           element={<AppLayout><HomePage /></AppLayout>} />
      <Route path="/shop"       element={<AppLayout><ShopPage /></AppLayout>} />
      <Route path="/product/:id"element={<AppLayout><ProductDetailPage /></AppLayout>} />
      <Route path="/wishlist"   element={<AppLayout><WishlistPage /></AppLayout>} />
      <Route path="/checkout"   element={<AppLayout hideFooter><CheckoutPage /></AppLayout>} />
      <Route path="/account"    element={<AppLayout><AccountPage /></AppLayout>} />
    </Routes>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <div
          className="min-h-screen"
          style={{ background: isDark ? '#0f0508' : '#faf6ef' }}
        >
          <Router>
            <ScrollToTop />
            <AppRoutes />
          </Router>
        </div>
      )}

      <Toaster
        theme={isDark ? 'dark' : 'light'}
        position="bottom-right"
        toastOptions={{
          style: {
            background:  isDark ? '#1e0d13' : '#faf6ef',
            border:      `1px solid ${isDark ? 'rgba(201,168,76,0.18)' : 'rgba(200,144,10,0.22)'}`,
            color:       isDark ? '#faf6ef' : '#1a0808',
            fontFamily:  'Jost, sans-serif',
          },
        }}
      />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
