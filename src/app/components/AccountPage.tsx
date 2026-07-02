import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Heart, MapPin, User, Settings, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useTheme, tc } from '../context/ThemeContext';
import { products } from '../data/products';

const mockOrders = [
  { id: 'AU-48291', date: 'Jun 15, 2026', status: 'Delivered', items: 2, total: 970, product: products[0] },
  { id: 'AU-43875', date: 'May 28, 2026', status: 'In Transit', items: 1, total: 695, product: products[6] },
  { id: 'AU-39102', date: 'Apr 10, 2026', status: 'Delivered', items: 3, total: 1560, product: products[11] },
];

const statusConfig: Record<string, { text: string; cls: string }> = {
  Delivered: { text: 'Delivered', cls: 'text-green-500 bg-green-500/10' },
  'In Transit': { text: 'In Transit', cls: 'text-blue-400 bg-blue-400/10' },
  Processing: { text: 'Processing', cls: 'text-yellow-400 bg-yellow-400/10' },
};

type Tab = 'overview' | 'orders' | 'wishlist' | 'addresses' | 'profile';

export const AccountPage = () => {
  const [tab, setTab] = useState<Tab>('overview');
  const { wishlist } = useStore();
  const { isDark } = useTheme();
  const t = tc(isDark);

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: User },
    { id: 'orders' as Tab, label: 'Orders', icon: Package },
    { id: 'wishlist' as Tab, label: 'Wishlist', icon: Heart },
    { id: 'addresses' as Tab, label: 'Addresses', icon: MapPin },
    { id: 'profile' as Tab, label: 'Profile', icon: Settings },
  ];

  return (
    <div className={`${t.pageBg} min-h-screen pt-24 pb-24`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className={`py-12 border-b ${t.border} mb-12`}>
          <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-2`}>Welcome Back</p>
          <h1 className={`text-4xl tracking-tighter ${t.text}`}>MY ACCOUNT</h1>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-1">
              {tabs.map(tb => (
                <button key={tb.id} onClick={() => setTab(tb.id)}
                  className={`flex items-center gap-3 py-3 text-xs tracking-widest uppercase transition-all text-left border-l-2 pl-3 ${
                    tab === tb.id
                      ? `${t.text} ${isDark ? 'border-white' : 'border-neutral-950'}`
                      : `${t.textMuted} border-transparent ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'}`
                  }`}
                >
                  <tb.icon size={14} />
                  {tb.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <motion.div key={tab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>

              {tab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    {[{ label: 'Total Orders', value: mockOrders.length }, { label: 'Wishlist Items', value: wishlist.length }, { label: 'Loyalty Points', value: '2,840' }].map(stat => (
                      <div key={stat.label} className={`${t.cardBgMuted} border ${t.border} p-5`}>
                        <p className={`text-2xl ${t.text} mb-1`}>{stat.value}</p>
                        <p className={`text-[10px] tracking-widest uppercase ${t.textDim}`}>{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className={`text-[10px] tracking-widest uppercase ${t.textDim}`}>Recent Orders</p>
                      <button onClick={() => setTab('orders')} className={`text-[10px] tracking-widest uppercase ${t.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>View All</button>
                    </div>
                    <div className="space-y-2">
                      {mockOrders.slice(0, 2).map(order => (
                        <div key={order.id} className={`flex items-center gap-4 border ${t.border} p-4 ${isDark ? 'hover:border-white/10' : 'hover:border-black/10'} transition-colors`}>
                          <div className={`w-12 h-14 ${t.cardBg} overflow-hidden flex-shrink-0`}>
                            <img src={order.product.image} alt="" className="w-full h-full object-cover grayscale" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${t.text}`}>{order.id}</p>
                            <p className={`text-xs ${t.textDim} mt-0.5`}>{order.date} · {order.items} item{order.items !== 1 ? 's' : ''}</p>
                          </div>
                          <span className={`text-[10px] px-2 py-1 rounded-sm ${statusConfig[order.status].cls}`}>{statusConfig[order.status].text}</span>
                          <span className={`text-sm ${t.text}`}>${order.total}</span>
                          <ChevronRight size={14} className={t.textDimmer} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'orders' && (
                <div>
                  <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-6`}>Order History</p>
                  <div className="space-y-3">
                    {mockOrders.map(order => (
                      <div key={order.id} className={`border ${t.border} overflow-hidden ${isDark ? 'hover:border-white/10' : 'hover:border-black/10'} transition-colors`}>
                        <div className={`flex items-center justify-between px-5 py-4 border-b ${t.border}`}>
                          <div>
                            <p className={`text-sm ${t.text}`}>{order.id}</p>
                            <p className={`text-xs ${t.textDim} mt-0.5`}>{order.date}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-[10px] px-2 py-1 rounded-sm ${statusConfig[order.status].cls}`}>{statusConfig[order.status].text}</span>
                            <span className={`text-sm ${t.text}`}>${order.total}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 px-5 py-3">
                          <img src={order.product.image} alt="" className={`w-10 h-12 object-cover grayscale`} />
                          <p className={`text-xs ${t.textMuted}`}>{order.product.name}{order.items > 1 ? ` + ${order.items - 1} more` : ''}</p>
                          <div className="ml-auto flex gap-3">
                            <button className={`text-[10px] tracking-widest uppercase ${t.textDim} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>Reorder</button>
                            <button className={`text-[10px] tracking-widest uppercase ${t.textDim} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>Track</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'wishlist' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p className={`text-[10px] tracking-widest uppercase ${t.textDim}`}>Saved Items ({wishlist.length})</p>
                    <Link to="/wishlist" className={`text-[10px] tracking-widest uppercase ${t.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>View Full Wishlist</Link>
                  </div>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-16">
                      <Heart size={32} className={`${t.textDimmer} mx-auto mb-4`} />
                      <p className={`${t.textDim} text-sm`}>No saved items yet</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {wishlist.slice(0, 6).map(product => (
                        <Link key={product.id} to={`/product/${product.id}`} className="group">
                          <div className={`aspect-[3/4] overflow-hidden ${t.cardBg} mb-2`}>
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                          </div>
                          <p className={`text-xs ${t.text}`}>{product.name}</p>
                          <p className={`text-xs ${t.textDim}`}>${product.price}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === 'addresses' && (
                <div>
                  <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-6`}>Saved Addresses</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`border ${t.borderMd} p-5 relative`}>
                      <div className="absolute top-3 right-3">
                        <span className={`text-[9px] tracking-widest uppercase ${t.cardBgMuted} ${t.textMuted} px-2 py-0.5 border ${t.border}`}>Default</span>
                      </div>
                      <p className={`text-sm ${t.text} mb-3`}>Home</p>
                      <div className={`text-xs ${t.textMuted} space-y-0.5`}>
                        <p>Alexandre Noir</p><p>123 Avenue de la Mode</p><p>New York, NY 10001</p><p>United States</p>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <button className={`text-[10px] tracking-widest uppercase ${t.textDim} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>Edit</button>
                        <button className={`text-[10px] tracking-widest uppercase ${t.textDim} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>Delete</button>
                      </div>
                    </div>
                    <button className={`border border-dashed ${t.borderMd} p-5 flex flex-col items-center justify-center gap-2 ${t.textDimmer} ${isDark ? 'hover:text-white hover:border-white/20' : 'hover:text-neutral-950 hover:border-black/20'} transition-all`}>
                      <span className="text-2xl leading-none">+</span>
                      <span className="text-[10px] tracking-widest uppercase">Add Address</span>
                    </button>
                  </div>
                </div>
              )}

              {tab === 'profile' && (
                <div className="space-y-6">
                  <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-2`}>Personal Information</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[{ label: 'First Name', value: 'Alexandre' }, { label: 'Last Name', value: 'Noir' }].map(field => (
                      <div key={field.label}>
                        <label className={`block text-[10px] tracking-widest uppercase ${t.textDim} mb-2`}>{field.label}</label>
                        <input type="text" defaultValue={field.value} className={`w-full ${t.inputField} px-4 py-3 text-sm outline-none transition-colors`} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className={`block text-[10px] tracking-widest uppercase ${t.textDim} mb-2`}>Email Address</label>
                    <input type="email" defaultValue="alexandre@example.com" className={`w-full ${t.inputField} px-4 py-3 text-sm outline-none transition-colors`} />
                  </div>
                  <div className={`border-t ${t.border} pt-6`}>
                    <p className={`text-[10px] tracking-widest uppercase ${t.textDim} mb-4`}>Change Password</p>
                    {['Current Password', 'New Password', 'Confirm Password'].map(label => (
                      <div key={label} className="mb-4">
                        <label className={`block text-[10px] tracking-widest uppercase ${t.textDim} mb-2`}>{label}</label>
                        <input type="password" placeholder="••••••••" className={`w-full ${t.inputField} px-4 py-3 text-sm outline-none transition-colors`} />
                      </div>
                    ))}
                  </div>
                  <button className={`px-8 py-3 text-xs tracking-widest uppercase transition-colors ${t.btnPrimary}`}>Save Changes</button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
