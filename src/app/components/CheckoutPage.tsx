import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useTheme, tc } from '../context/ThemeContext';

const steps = ['Information', 'Shipping', 'Payment', 'Review'];

export const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useStore();
  const { isDark } = useTheme();
  const t = tc(isDark);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [info, setInfo] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [shipping, setShipping] = useState({ address: '', city: '', state: '', zip: '', country: '' });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [payment, setPayment] = useState({ card: '', expiry: '', cvv: '', name: '' });

  const shippingOptions = [
    { id: 'standard', label: 'Standard Shipping', duration: '3–5 business days', price: cartTotal >= 500 ? 0 : 25 },
    { id: 'express', label: 'Express Shipping', duration: '1–2 business days', price: 45 },
    { id: 'overnight', label: 'Overnight Shipping', duration: 'Next business day', price: 85 },
  ];

  const selectedShipping = shippingOptions.find(o => o.id === shippingMethod)!;
  const orderTotal = cartTotal + selectedShipping.price;

  const InputField = ({ label, placeholder, type = 'text', value, onChange }: { label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void }) => (
    <div>
      <label className={`block text-[10px] tracking-widest uppercase ${t.textDim} mb-2`}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full ${t.inputField} px-4 py-3 text-sm outline-none transition-colors`}
      />
    </div>
  );

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className={`${t.pageBg} min-h-screen flex items-center justify-center pt-24`}>
        <div className="text-center">
          <p className={`${t.textMuted} mb-4`}>Your bag is empty</p>
          <button onClick={() => navigate('/shop')} className={`px-8 py-3 border ${t.borderStrong} text-xs tracking-widest uppercase ${t.text} ${isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-neutral-950 hover:text-white'} transition-all`}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className={`${t.pageBg} min-h-screen flex items-center justify-center pt-24 px-6`}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="text-center max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className={`w-16 h-16 border ${t.borderStrong} rounded-full flex items-center justify-center mx-auto mb-8`}>
            <Check size={24} className={t.text} />
          </motion.div>
          <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-3`}>Order Confirmed</p>
          <h1 className={`text-4xl tracking-tighter ${t.text} mb-4`}>Thank You</h1>
          <p className={`${t.textMuted} text-sm mb-2`}>Your order has been placed successfully.</p>
          <p className={`${t.textDimmer} text-sm mb-10`}>A confirmation will be sent to {info.email || 'your email address'}.</p>
          <div className={`border ${t.border} px-6 py-4 mb-10`}>
            <p className={`text-xs ${t.textDim} mb-1`}>Order Reference</p>
            <p className={`${t.text} tracking-widest`}>AU-{Math.floor(Math.random() * 90000) + 10000}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/account')} className={`px-8 py-3 border ${t.borderMd} text-xs tracking-widest uppercase ${t.textMuted} ${isDark ? 'hover:bg-white/5' : 'hover:bg-neutral-100'} transition-all`}>
              Track Order
            </button>
            <button onClick={() => navigate('/shop')} className={`px-8 py-3 text-xs tracking-widest uppercase transition-all ${t.btnPrimary}`}>
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${t.pageBg} min-h-screen pt-20`}>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <button onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/shop')} className={`flex items-center gap-2 text-xs tracking-widest uppercase ${t.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>
            <ArrowLeft size={14} /> Back
          </button>
          <span className={`text-xl tracking-[0.35em] uppercase ${t.text}`}>AURELIA</span>
          <div className="w-16" />
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-0 mb-16">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center border transition-all text-xs ${
                  i < step ? `${isDark ? 'bg-white border-white text-black' : 'bg-neutral-950 border-neutral-950 text-white'}`
                  : i === step ? `${isDark ? 'border-white text-white' : 'border-neutral-950 text-neutral-950'}`
                  : `${t.borderMd} ${t.textDimmer}`
                }`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`text-[9px] tracking-widest uppercase mt-2 hidden md:block transition-colors ${i === step ? t.text : t.textDimmer}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 md:w-24 h-px mx-2 mb-5 transition-colors ${i < step ? `${isDark ? 'bg-white/30' : 'bg-black/30'}` : t.border}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <h2 className={`text-2xl tracking-tighter ${t.text} mb-8`}>Contact Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="First Name" placeholder="Alexandre" value={info.firstName} onChange={v => setInfo({...info, firstName: v})} />
                    <InputField label="Last Name" placeholder="Noir" value={info.lastName} onChange={v => setInfo({...info, lastName: v})} />
                  </div>
                  <InputField label="Email Address" placeholder="you@example.com" type="email" value={info.email} onChange={v => setInfo({...info, email: v})} />
                  <InputField label="Phone Number" placeholder="+1 (555) 000-0000" value={info.phone} onChange={v => setInfo({...info, phone: v})} />
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <h2 className={`text-2xl tracking-tighter ${t.text} mb-8`}>Shipping Address</h2>
                  <InputField label="Street Address" placeholder="123 Avenue de la Mode" value={shipping.address} onChange={v => setShipping({...shipping, address: v})} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="City" placeholder="New York" value={shipping.city} onChange={v => setShipping({...shipping, city: v})} />
                    <InputField label="State / Province" placeholder="NY" value={shipping.state} onChange={v => setShipping({...shipping, state: v})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="ZIP / Postal Code" placeholder="10001" value={shipping.zip} onChange={v => setShipping({...shipping, zip: v})} />
                    <InputField label="Country" placeholder="United States" value={shipping.country} onChange={v => setShipping({...shipping, country: v})} />
                  </div>
                  <div className="mt-8">
                    <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-4`}>Shipping Method</p>
                    <div className="space-y-2">
                      {shippingOptions.map(option => (
                        <label key={option.id} className={`flex items-center justify-between px-4 py-4 border cursor-pointer transition-all ${shippingMethod === option.id ? `${isDark ? 'border-white bg-white/5' : 'border-neutral-950 bg-neutral-50'}` : `${t.borderMd} ${isDark ? 'hover:border-white/20' : 'hover:border-black/20'}`}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${shippingMethod === option.id ? `${isDark ? 'border-white' : 'border-neutral-950'}` : t.borderMd}`}>
                              {shippingMethod === option.id && <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-neutral-950'}`} />}
                            </div>
                            <div>
                              <p className={`text-sm ${t.text}`}>{option.label}</p>
                              <p className={`text-xs ${t.textDim}`}>{option.duration}</p>
                            </div>
                          </div>
                          <span className={`text-sm ${t.text}`}>{option.price === 0 ? 'Free' : `$${option.price}`}</span>
                          <input type="radio" className="sr-only" checked={shippingMethod === option.id} onChange={() => setShippingMethod(option.id)} />
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-2xl tracking-tighter ${t.text}`}>Payment</h2>
                    <div className={`flex items-center gap-1 ${t.textDim} text-xs`}><Lock size={12} /> SSL Secured</div>
                  </div>
                  <InputField label="Card Number" placeholder="1234 5678 9012 3456" value={payment.card} onChange={v => setPayment({...payment, card: v})} />
                  <InputField label="Cardholder Name" placeholder="Alexandre Noir" value={payment.name} onChange={v => setPayment({...payment, name: v})} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Expiry Date" placeholder="MM / YY" value={payment.expiry} onChange={v => setPayment({...payment, expiry: v})} />
                    <InputField label="CVV" placeholder="123" value={payment.cvv} onChange={v => setPayment({...payment, cvv: v})} />
                  </div>
                  <div className={`border ${t.border} px-4 py-3`}>
                    <p className={`text-xs ${t.textDim}`}>Your payment information is encrypted and never stored.</p>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <h2 className={`text-2xl tracking-tighter ${t.text} mb-8`}>Review Order</h2>
                  <div className="space-y-3 mb-8">
                    {cartItems.map(item => (
                      <div key={`${item.product.id}-${item.size}`} className={`flex gap-4 border-b ${t.border} pb-4`}>
                        <div className={`w-16 h-20 ${t.cardBg} overflow-hidden flex-shrink-0`}>
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${t.text}`}>{item.product.name}</p>
                          <p className={`text-xs ${t.textDim} mt-1`}>{item.size} · {item.color} · Qty {item.quantity}</p>
                        </div>
                        <p className={`text-sm ${t.text}`}>${(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 mb-6">
                    {[['Ship to', `${shipping.address || '–'}, ${shipping.city || '–'}`], ['Method', selectedShipping.label], ['Email', info.email || '–']].map(([label, value]) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className={t.textDim}>{label}</span>
                        <span className={t.textSec}>{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8">
              {step < steps.length - 1 ? (
                <button onClick={() => setStep(s => s + 1)} className={`w-full py-4 text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${t.btnPrimary}`}>
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button onClick={() => { clearCart(); setOrderPlaced(true); }} className={`w-full py-4 text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${t.btnPrimary}`}>
                  <Lock size={14} /> Place Order — ${orderTotal.toLocaleString()}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className={`${t.cardBgMuted} border ${t.border} p-6 h-fit`}>
            <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-6`}>Order Summary</p>
            <div className="space-y-3 mb-6">
              {cartItems.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                  <div className={`w-12 h-14 ${t.cardBg} overflow-hidden flex-shrink-0 relative`}>
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover grayscale" />
                    <span className={`absolute -top-1.5 -right-1.5 w-4 h-4 ${isDark ? 'bg-white text-black' : 'bg-neutral-950 text-white'} text-[9px] rounded-full flex items-center justify-center`}>{item.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${t.text} truncate`}>{item.product.name}</p>
                    <p className={`text-[10px] ${t.textDim} mt-0.5`}>{item.size}</p>
                  </div>
                  <p className={`text-xs ${t.text} flex-shrink-0`}>${(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className={`border-t ${t.border} pt-4 space-y-2`}>
              <div className="flex justify-between text-sm">
                <span className={t.textDim}>Subtotal</span>
                <span className={t.text}>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={t.textDim}>Shipping</span>
                <span className={t.text}>{selectedShipping.price === 0 ? 'Free' : `$${selectedShipping.price}`}</span>
              </div>
              <div className={`border-t ${t.border} pt-3 flex justify-between`}>
                <span className={`text-sm ${t.textSec}`}>Total</span>
                <span className={t.text}>${orderTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
