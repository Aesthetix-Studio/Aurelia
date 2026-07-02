import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useTheme, tc } from '../context/ThemeContext';
import { ProductCard } from './ProductCard';
import { toast } from 'sonner';

export const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const { isDark } = useTheme();
  const t = tc(isDark);

  const handleMoveToCart = (product: typeof wishlist[0]) => {
    addToCart(product, product.sizes[0], product.colors[0].name);
    toggleWishlist(product);
    toast.success(`${product.name} added to bag`);
  };

  return (
    <div className={`${t.pageBg} min-h-screen pt-24 px-6 pb-24`}>
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`py-12 border-b ${t.border} mb-12`}
        >
          <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-2`}>Your Curation</p>
          <div className="flex items-end justify-between">
            <h1 className={`text-4xl md:text-5xl tracking-tighter ${t.text}`}>WISHLIST</h1>
            <span className={`text-sm ${t.textMuted}`}>{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</span>
          </div>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <Heart size={48} className={t.textDimmer} />
            <p className={`${t.textMuted} mb-2 text-lg mt-6`}>Your wishlist is empty</p>
            <p className={`${t.textDimmer} text-sm mb-8`}>Save pieces you love and return to them whenever you're ready.</p>
            <Link
              to="/shop"
              className={`px-8 py-4 border ${t.borderStrong} text-xs tracking-widest uppercase ${t.text} ${isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-neutral-950 hover:text-white'} transition-all`}
            >
              Discover the Collection
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <AnimatePresence mode="popLayout">
                {wishlist.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ProductCard product={product} />
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className={`mt-3 w-full py-2.5 border ${t.borderMd} text-[10px] tracking-widest uppercase ${t.textMuted} ${isDark ? 'hover:text-white hover:border-white/30' : 'hover:text-neutral-950 hover:border-black/30'} transition-all flex items-center justify-center gap-2`}
                    >
                      <ShoppingBag size={11} /> Move to Bag
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className={`border-t ${t.border} pt-8 flex justify-end`}>
              <button
                onClick={() => {
                  wishlist.forEach(p => addToCart(p, p.sizes[0], p.colors[0].name));
                  wishlist.forEach(p => toggleWishlist(p));
                  toast.success('All items added to bag');
                }}
                className={`px-10 py-4 text-xs tracking-widest uppercase transition-colors flex items-center gap-2 ${t.btnPrimary}`}
              >
                <ShoppingBag size={14} /> Add All to Bag
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
