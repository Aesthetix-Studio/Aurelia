import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useTheme, tc } from '../context/ThemeContext';
import { products } from '../data/products';

const popularSearches = ['Black blazer', 'Silk dress', 'Leather bag', 'Cashmere coat', 'New arrivals'];

export const SearchModal = () => {
  const { searchOpen, setSearchOpen } = useStore();
  const { isDark } = useTheme();
  const t = tc(isDark);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['Noir column dress', 'Phantom bomber']);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery('');
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setSearchOpen]);

  const results = query.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  const handleSearch = (term: string) => {
    if (term.trim()) {
      setRecentSearches(prev => [term, ...prev.filter(s => s !== term)].slice(0, 5));
      setSearchOpen(false);
    }
  };

  const termCls = `flex items-center justify-between w-full group text-left`;

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-50 ${t.overlayBg} flex flex-col`}
        >
          {/* Header */}
          <div className={`border-b ${t.border} px-6 md:px-12 py-6`}>
            <div className="max-w-3xl mx-auto flex items-center gap-4">
              <Search size={20} className={t.textDim} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
                placeholder="Search for products, styles, collections..."
                className={`flex-1 bg-transparent text-lg placeholder-neutral-400 outline-none ${t.text}`}
              />
              {query && (
                <button onClick={() => setQuery('')} className={`${t.textDim} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors`}>
                  <X size={18} />
                </button>
              )}
              <button onClick={() => setSearchOpen(false)} className={`${t.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'} transition-colors ml-2`}>
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8">
            <div className="max-w-3xl mx-auto">
              {query.length <= 1 ? (
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp size={14} className={t.textDim} />
                      <span className={`text-xs tracking-widest uppercase ${t.textDim}`}>Popular</span>
                    </div>
                    <div className="space-y-3">
                      {popularSearches.map(term => (
                        <button key={term} onClick={() => { setQuery(term); handleSearch(term); }} className={termCls}>
                          <span className={`${t.textSec} ${isDark ? 'group-hover:text-white' : 'group-hover:text-neutral-950'} transition-colors`}>{term}</span>
                          <ArrowRight size={14} className={`${t.textDimmer} ${isDark ? 'group-hover:text-white' : 'group-hover:text-neutral-950'} transition-colors`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Clock size={14} className={t.textDim} />
                        <span className={`text-xs tracking-widest uppercase ${t.textDim}`}>Recent</span>
                      </div>
                      <div className="space-y-3">
                        {recentSearches.map(term => (
                          <button key={term} onClick={() => { setQuery(term); handleSearch(term); }} className={termCls}>
                            <span className={`${t.textMuted} ${isDark ? 'group-hover:text-white' : 'group-hover:text-neutral-950'} transition-colors`}>{term}</span>
                            <X size={12} className={t.textDimmer} onClick={e => { e.stopPropagation(); setRecentSearches(prev => prev.filter(s => s !== term)); }} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {results.length === 0 ? (
                    <div className="text-center py-16">
                      <p className={t.textMuted}>No results for "<span className={t.text}>{query}</span>"</p>
                      <p className={`${t.textDimmer} text-sm mt-2`}>Try a different term or browse our collections</p>
                    </div>
                  ) : (
                    <>
                      <p className={`text-xs tracking-widest uppercase ${t.textDim} mb-6`}>{results.length} result{results.length !== 1 ? 's' : ''}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {results.map(product => (
                          <Link key={product.id} to={`/product/${product.id}`} onClick={() => { handleSearch(query); setSearchOpen(false); }} className="group">
                            <div className={`aspect-[3/4] overflow-hidden ${t.cardBg} mb-3`}>
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                            </div>
                            <p className={`text-sm ${t.text} ${isDark ? 'group-hover:text-neutral-300' : 'group-hover:text-neutral-600'} transition-colors`}>{product.name}</p>
                            <p className={`text-sm ${t.textDim}`}>${product.price}</p>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
