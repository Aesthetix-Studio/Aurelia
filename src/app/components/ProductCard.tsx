import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import { useTheme, tc } from '../context/ThemeContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const { isDark } = useTheme();
  const t = tc(isDark);
  const [hovered, setHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, product.sizes[0], product.colors[0].name);
    toast.success(`${product.name} added to bag`, { description: `${product.sizes[0]} · ${product.colors[0].name}`, duration: 2000 });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    toast(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist', { duration: 1500 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        {/* Image */}
        <div className={`relative overflow-hidden aspect-[3/4] ${t.cardBg} mb-4`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2 py-0.5 bg-white text-black text-[9px] tracking-widest uppercase">New</span>
            )}
            {product.isSale && (
              <span className={`px-2 py-0.5 text-[9px] tracking-widest uppercase border ${isDark ? 'bg-neutral-800 text-white border-white/20' : 'bg-neutral-950 text-white border-transparent'}`}>
                Sale
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center ${isDark ? 'bg-neutral-950/60' : 'bg-white/80'} backdrop-blur-sm border ${t.borderMd} opacity-0 group-hover:opacity-100 transition-all duration-200`}
            aria-label="Add to wishlist"
          >
            <Heart size={13} className={`transition-colors ${wishlisted ? `${isDark ? 'fill-white text-white' : 'fill-neutral-950 text-neutral-950'}` : t.text}`} />
          </button>

          {/* Quick Add */}
          <AnimatePresence>
            {hovered && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                onClick={handleQuickAdd}
                className={`absolute bottom-3 left-3 right-3 py-2.5 ${isDark ? 'bg-neutral-950/90 border-white/20 text-white hover:bg-white hover:text-black' : 'bg-white/90 border-black/15 text-neutral-950 hover:bg-neutral-950 hover:text-white'} backdrop-blur-sm border text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 transition-colors`}
              >
                <ShoppingBag size={12} /> Quick Add
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Info */}
        <div className="flex justify-between items-start">
          <div className="min-w-0 flex-1 mr-3">
            <p className={`text-xs ${t.textDim} mb-0.5`}>{product.category}</p>
            <p className={`text-sm ${t.text} truncate ${isDark ? 'group-hover:text-neutral-300' : 'group-hover:text-neutral-600'} transition-colors`}>{product.name}</p>
          </div>
          <div className="text-right flex-shrink-0">
            {product.originalPrice && (
              <p className={`text-xs ${t.textDimmer} line-through`}>${product.originalPrice}</p>
            )}
            <p className={`text-sm ${t.text}`}>${product.price}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} className={i < Math.floor(product.rating)
                ? `${isDark ? 'fill-white text-white' : 'fill-neutral-950 text-neutral-950'}`
                : `${isDark ? 'text-neutral-700' : 'text-neutral-300'}`}
              />
            ))}
          </div>
          <span className={`text-[10px] ${t.textDimmer}`}>({product.reviews})</span>
        </div>

        {/* Color swatches */}
        <div className="flex gap-1.5 mt-2">
          {product.colors.slice(0, 4).map(color => (
            <div
              key={color.name}
              title={color.name}
              className={`w-3 h-3 rounded-full border ${t.borderMd}`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </Link>
    </motion.div>
  );
};
