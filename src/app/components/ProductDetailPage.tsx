import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Star, ChevronDown, ArrowLeft, Share2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { useTheme, tc } from '../context/ThemeContext';
import { ProductCard } from './ProductCard';
import { toast } from 'sonner';

const AccordionItem = ({ title, children, t, isDark }: { title: string; children: React.ReactNode; t: ReturnType<typeof tc>; isDark: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b ${t.border}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className={`text-xs tracking-widest uppercase ${t.textSec}`}>{title}</span>
        <ChevronDown size={14} className={`${t.textDim} transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const { isDark } = useTheme();
  const t = tc(isDark);

  const product = getProductById(id || '');
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className={`${t.pageBg} min-h-screen flex items-center justify-center pt-24`}>
        <div className="text-center">
          <p className={`${t.textMuted} mb-4`}>Product not found</p>
          <button onClick={() => navigate('/shop')} className={`px-6 py-3 border ${t.borderStrong} text-xs tracking-widest uppercase ${t.text} ${isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-neutral-950 hover:text-white'} transition-all`}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    const color = selectedColor || product.colors[0].name;
    addToCart(product, selectedSize, color, quantity);
    toast.success(`${product.name} added to bag`, { description: `${selectedSize} · ${color}` });
    setSizeError(false);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist', { duration: 1500 });
  };

  return (
    <div className={`${t.pageBg} min-h-screen pt-20`}>
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <button onClick={() => navigate(-1)} className={`flex items-center gap-2 text-xs tracking-widest uppercase ${t.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 overflow-hidden flex-shrink-0 border transition-all ${activeImage === i ? `${isDark ? 'border-white' : 'border-neutral-950'}` : `${t.border} ${isDark ? 'hover:border-white/20' : 'hover:border-black/20'}`}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover grayscale" />
                </button>
              ))}
            </div>

            <div className={`flex-1 relative aspect-[3/4] overflow-hidden ${t.cardBg}`}>
              <AnimatePresence mode="wait">
                <motion.img key={activeImage} src={product.images[activeImage]} alt={product.name}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="px-2 py-1 bg-white text-black text-[9px] tracking-widest uppercase">New In</span>}
                {product.isSale && discount && (
                  <span className={`px-2 py-1 ${isDark ? 'bg-neutral-800 border-white/20' : 'bg-neutral-950'} border text-white text-[9px] tracking-widest uppercase`}>-{discount}%</span>
                )}
              </div>

              <button onClick={handleWishlist} className={`absolute top-4 right-4 w-10 h-10 ${isDark ? 'bg-neutral-950/80' : 'bg-white/90'} backdrop-blur-sm border ${t.borderMd} flex items-center justify-center hover:opacity-100 transition-all`}>
                <Heart size={16} className={`${wishlisted ? `${isDark ? 'fill-white text-white' : 'fill-neutral-950 text-neutral-950'}` : t.text}`} />
              </button>
            </div>
          </div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col">
            <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-2`}>{product.category} · {product.subcategory}</p>
            <h1 className={`text-3xl md:text-4xl tracking-tighter ${t.text} mb-4`}>{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <span className={`text-2xl ${t.text}`}>${product.price}</span>
              {product.originalPrice && <span className={`text-lg ${t.textDimmer} line-through`}>${product.originalPrice}</span>}
              {discount && <span className="text-sm text-green-500">Save {discount}%</span>}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className={i < Math.floor(product.rating) ? `${isDark ? 'fill-white text-white' : 'fill-neutral-950 text-neutral-950'}` : `${isDark ? 'text-neutral-700' : 'text-neutral-300'}`} />
                ))}
              </div>
              <span className={`text-xs ${t.textDim}`}>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className={`${t.textMuted} text-sm leading-relaxed mb-8`}>{product.description}</p>

            {/* Colors */}
            <div className="mb-6">
              <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-3`}>
                Colour: <span className={t.textSec}>{selectedColor || 'Select'}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button key={color.name} onClick={() => setSelectedColor(color.name)} title={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.name ? `${isDark ? 'border-white' : 'border-neutral-950'} scale-110` : `border-transparent ${isDark ? 'hover:border-white/40' : 'hover:border-black/30'}`}`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className={`text-[10px] tracking-widest uppercase ${sizeError ? 'text-red-400' : t.textDim}`}>
                  Size: <span className={t.textSec}>{selectedSize || (sizeError ? 'Please select a size' : 'Select')}</span>
                </p>
                <button className={`text-[10px] tracking-widest uppercase ${t.textDimmer} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`px-4 py-2 text-xs border transition-all ${
                      selectedSize === size
                        ? `${isDark ? 'border-white text-white bg-white/5' : 'border-neutral-950 text-neutral-950 bg-neutral-100'}`
                        : sizeError
                        ? `border-red-900/50 ${t.textMuted} ${isDark ? 'hover:border-white/30 hover:text-white' : 'hover:border-black/30 hover:text-neutral-950'}`
                        : `${t.borderMd} ${t.textMuted} ${isDark ? 'hover:border-white/30 hover:text-white' : 'hover:border-black/30 hover:text-neutral-950'}`
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className={`flex items-center border ${t.borderMd} w-fit mb-6`}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className={`w-10 h-10 flex items-center justify-center ${t.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors text-lg`}>−</button>
              <span className={`w-10 text-center text-sm ${t.text}`}>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className={`w-10 h-10 flex items-center justify-center ${t.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors text-lg`}>+</button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button onClick={handleAddToCart} className={`flex-1 py-4 text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${t.btnPrimary}`}>
                <ShoppingBag size={14} /> Add to Bag
              </button>
              <button onClick={handleWishlist} className={`w-14 flex items-center justify-center border transition-all ${wishlisted ? `${isDark ? 'border-white bg-white/5' : 'border-neutral-950 bg-neutral-100'} ${t.text}` : `${t.borderMd} ${t.textMuted} ${isDark ? 'hover:border-white/30 hover:text-white' : 'hover:border-black/30 hover:text-neutral-950'}`}`}>
                <Heart size={16} className={wishlisted ? `${isDark ? 'fill-white' : 'fill-neutral-950'}` : ''} />
              </button>
              <button className={`w-14 flex items-center justify-center border ${t.borderMd} ${t.textMuted} ${isDark ? 'hover:border-white/30 hover:text-white' : 'hover:border-black/30 hover:text-neutral-950'} transition-all`}>
                <Share2 size={16} />
              </button>
            </div>

            <div className={`border ${t.border} px-4 py-3 mb-8`}>
              <p className={`text-xs ${t.textMuted}`}>Free shipping on orders over $500. Complimentary returns within 30 days.</p>
            </div>

            <div>
              <AccordionItem title="Product Details" t={t} isDark={isDark}>
                <ul className="space-y-1.5">
                  {product.details.map(detail => (
                    <li key={detail} className={`text-sm ${t.textMuted} flex items-start gap-2`}>
                      <span className={`${t.textDimmer} mt-1.5`}>–</span>{detail}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
              <AccordionItem title="Shipping & Returns" t={t} isDark={isDark}>
                <div className={`space-y-2 text-sm ${t.textMuted}`}>
                  <p>Standard shipping: 3–5 business days</p>
                  <p>Express shipping: 1–2 business days</p>
                  <p>Free returns within 30 days of receipt</p>
                </div>
              </AccordionItem>
              <AccordionItem title="Care Instructions" t={t} isDark={isDark}>
                <div className={`space-y-2 text-sm ${t.textMuted}`}>
                  <p>To preserve the integrity of this piece, we recommend professional cleaning.</p>
                  <p>Store in the provided garment bag. Avoid prolonged exposure to direct sunlight.</p>
                </div>
              </AccordionItem>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <div className={`mt-24 border-t ${t.border} pt-16`}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-3`}>You May Also Like</p>
              <h2 className={`text-3xl tracking-tighter ${t.text} mb-10`}>Complete the Look</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
