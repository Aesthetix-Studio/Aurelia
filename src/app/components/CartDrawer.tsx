import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useTheme, tc } from '../context/ThemeContext';

export const CartDrawer = () => {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useStore();
  const { isDark } = useTheme();
  const t = tc(isDark);
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className={`fixed inset-0 z-50 ${t.modalBackdrop}`}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-md ${t.drawerBg} border-l ${t.border} flex flex-col`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-6 py-6 border-b ${t.border}`}>
              <div className="flex items-center gap-3">
                <ShoppingBag size={17} className={t.text} />
                <span className={`text-sm tracking-widest uppercase ${t.text}`}>
                  Your Bag {cartCount > 0 && <span className={t.textDim}>({cartCount})</span>}
                </span>
              </div>
              <button onClick={() => setCartOpen(false)} className={`${t.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-6 text-center px-6"
                >
                  <ShoppingBag size={48} className={t.textDimmer} />
                  <div>
                    <p className={`${t.text} mb-2`}>Your bag is empty</p>
                    <p className={`${t.textMuted} text-sm`}>Discover our collection</p>
                  </div>
                  <button
                    onClick={() => { setCartOpen(false); navigate('/shop'); }}
                    className={`px-8 py-3 border ${t.borderStrong} text-xs tracking-widest uppercase ${t.text} ${isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-neutral-950 hover:text-white'} transition-all duration-300`}
                  >
                    Shop Now
                  </button>
                </motion.div>
              ) : (
                <div>
                  <AnimatePresence initial={false}>
                    {cartItems.map(item => (
                      <motion.div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-4 px-6 py-5 border-b ${t.border}`}
                      >
                        <div className={`w-20 h-24 flex-shrink-0 overflow-hidden ${t.cardBg}`}>
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <Link
                              to={`/product/${item.product.id}`}
                              onClick={() => setCartOpen(false)}
                              className={`text-sm ${t.text} ${isDark ? 'hover:text-neutral-300' : 'hover:text-neutral-600'} transition-colors line-clamp-1`}
                            >
                              {item.product.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                              className={`${t.textDimmer} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors ml-2 flex-shrink-0`}
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <p className={`text-xs ${t.textDim} mb-3`}>{item.size} · {item.color}</p>
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center gap-3 border ${t.borderMd}`}>
                              <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} className={`w-7 h-7 flex items-center justify-center ${t.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>
                                <Minus size={12} />
                              </button>
                              <span className={`text-sm ${t.text} w-4 text-center`}>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} className={`w-7 h-7 flex items-center justify-center ${t.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className={`text-sm ${t.text}`}>${(item.product.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className={`border-t ${t.border} px-6 py-6 space-y-4`}>
                <div className="flex justify-between items-center">
                  <span className={`text-xs tracking-widest uppercase ${t.textMuted}`}>Subtotal</span>
                  <span className={t.text}>${cartTotal.toLocaleString()}</span>
                </div>
                <p className={`text-xs ${t.textDimmer}`}>Shipping and taxes calculated at checkout</p>
                <button
                  onClick={() => { setCartOpen(false); navigate('/checkout'); }}
                  className={`w-full py-4 text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${t.btnPrimary}`}
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => { setCartOpen(false); navigate('/shop'); }}
                  className={`w-full py-3 border ${t.borderMd} text-xs tracking-widest uppercase ${t.textMuted} ${isDark ? 'hover:text-white hover:border-white/30' : 'hover:text-neutral-950 hover:border-black/30'} transition-all`}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
