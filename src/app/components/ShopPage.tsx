import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, Grid2X2, LayoutList, X, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useTheme, tc } from '../context/ThemeContext';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest',   label: 'Newest' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',   label: 'Top Rated' },
];

const PRICE_RANGES = [
  { label: 'Under $200',      min: 0,    max: 200 },
  { label: '$200 – $500',     min: 200,  max: 500 },
  { label: '$500 – $1,000',   min: 500,  max: 1000 },
  { label: 'Over $1,000',     min: 1000, max: Infinity },
];

const ALL_CATEGORIES = ['All', 'Sarees', 'Lehengas', "Men's Wear", 'Bridal', 'Festive', 'Accessories', 'New Season'];

export const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const saleParam = searchParams.get('sale') === 'true';

  const { isDark } = useTheme();
  const t = tc(isDark);

  const [selectedCategory, setSelectedCategory] = useState(saleParam ? 'All' : categoryParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sort, setSort] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(saleParam);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
    if (showSaleOnly) result = result.filter(p => p.isSale);
    if (selectedPriceRange !== null) {
      const r = PRICE_RANGES[selectedPriceRange];
      result = result.filter(p => p.price >= r.min && p.price <= r.max);
    }
    switch (sort) {
      case 'newest':     result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew)); break;
      case 'price-asc':  result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating':     result = [...result].sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [selectedCategory, showSaleOnly, selectedPriceRange, sort]);

  const activeFilters = (selectedCategory !== 'All' ? 1 : 0) + (selectedPriceRange !== null ? 1 : 0) + (showSaleOnly ? 1 : 0);
  const clearFilters = () => { setSelectedCategory('All'); setSelectedPriceRange(null); setShowSaleOnly(false); };

  const accentColor = isDark ? '#c9a84c' : '#7c1a2e';
  const tabActive   = `border-b-2 text-[11px] tracking-widest uppercase transition-all flex-shrink-0 px-4 py-3 -mb-px`;

  return (
    <div className={`${t.pageBg} min-h-screen pt-24`}>
      {/* Header */}
      <div className={`max-w-[1400px] mx-auto px-6 py-12 border-b ${t.border}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className={`text-[10px] tracking-widest uppercase ${t.gold} mb-2`} style={{ fontFamily: 'Jost, sans-serif' }}>
            {showSaleOnly ? 'Special Offers' : selectedCategory === 'All' ? 'All Pieces' : selectedCategory}
          </p>
          <div className="flex items-end justify-between">
            <h1
              className={`text-4xl md:text-5xl ${t.text}`}
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {showSaleOnly ? 'The Sale Edit' : selectedCategory === 'All' ? 'The Shop' : selectedCategory}
            </h1>
            <span className={`text-sm ${t.textMuted}`} style={{ fontFamily: 'Jost, sans-serif' }}>
              {filtered.length} pieces
            </span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Category tabs */}
        <div className={`flex overflow-x-auto mb-8 border-b ${t.border}`} style={{ scrollbarWidth: 'none' }}>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setShowSaleOnly(false); }}
              className={tabActive}
              style={{
                fontFamily: 'Jost, sans-serif',
                color: selectedCategory === cat && !showSaleOnly ? accentColor : (isDark ? '#b89070' : '#8a5a40'),
                borderBottomColor: selectedCategory === cat && !showSaleOnly ? accentColor : 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => { setShowSaleOnly(true); setSelectedCategory('All'); }}
            className={tabActive}
            style={{
              fontFamily: 'Jost, sans-serif',
              color: showSaleOnly ? accentColor : (isDark ? '#b89070' : '#8a5a40'),
              borderBottomColor: showSaleOnly ? accentColor : 'transparent',
            }}
          >
            Sale
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-2 border text-xs tracking-widest uppercase transition-all"
              style={{
                fontFamily: 'Jost, sans-serif',
                borderColor: filtersOpen || activeFilters > 0 ? accentColor : (isDark ? 'rgba(201,168,76,0.2)' : 'rgba(200,144,10,0.25)'),
                color: filtersOpen || activeFilters > 0 ? accentColor : (isDark ? '#b89070' : '#8a5a40'),
              }}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilters > 0 && (
                <span className="w-4 h-4 text-[9px] rounded-full flex items-center justify-center" style={{ background: accentColor, color: isDark ? '#0f0508' : '#faf6ef' }}>
                  {activeFilters}
                </span>
              )}
            </button>
            {activeFilters > 0 && (
              <button onClick={clearFilters} className={`flex items-center gap-1 text-xs ${t.textDim}`} style={{ fontFamily: 'Jost, sans-serif' }}>
                <X size={12} /> Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className={`flex items-center gap-2 text-xs tracking-widest uppercase ${t.textMuted} transition-colors`}
                style={{ fontFamily: 'Jost, sans-serif' }}
              >
                {SORT_OPTIONS.find(o => o.value === sort)?.label}
                <ChevronDown size={12} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 top-full mt-2 w-48 ${t.cardBg} border ${t.borderMd} py-2 z-20`}
                  >
                    {SORT_OPTIONS.map(o => (
                      <button
                        key={o.value}
                        onClick={() => { setSort(o.value); setSortOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs transition-colors"
                        style={{ fontFamily: 'Jost, sans-serif', color: sort === o.value ? accentColor : (isDark ? '#b89070' : '#8a5a40') }}
                      >
                        {o.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-1">
              {[Grid2X2, LayoutList].map((Icon, i) => (
                <button
                  key={i}
                  onClick={() => setViewMode(i === 0 ? 'grid' : 'list')}
                  className="p-2 transition-colors"
                  style={{ color: viewMode === (i === 0 ? 'grid' : 'list') ? accentColor : (isDark ? '#6a4830' : '#c09060') }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className={`grid grid-cols-2 md:grid-cols-3 gap-8 py-6 border ${t.border} px-6`}>
                <div>
                  <p className={`text-[10px] tracking-widest uppercase ${t.gold} mb-4`} style={{ fontFamily: 'Jost, sans-serif' }}>Price</p>
                  <div className="space-y-2">
                    {PRICE_RANGES.map((r, i) => (
                      <button key={r.label} onClick={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                        className="block text-sm transition-colors"
                        style={{ fontFamily: 'Jost, sans-serif', color: selectedPriceRange === i ? accentColor : (isDark ? '#b89070' : '#8a5a40') }}
                      >
                        {selectedPriceRange === i && <span className="mr-2" style={{ color: isDark ? '#6a4830' : '#c09060' }}>×</span>}
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={`text-[10px] tracking-widest uppercase ${t.gold} mb-4`} style={{ fontFamily: 'Jost, sans-serif' }}>Offers</p>
                  <button
                    onClick={() => setShowSaleOnly(!showSaleOnly)}
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ fontFamily: 'Jost, sans-serif', color: showSaleOnly ? accentColor : (isDark ? '#b89070' : '#8a5a40') }}
                  >
                    <div
                      className="w-4 h-4 border flex items-center justify-center transition-all"
                      style={{
                        borderColor: showSaleOnly ? accentColor : (isDark ? 'rgba(201,168,76,0.25)' : 'rgba(200,144,10,0.3)'),
                        background: showSaleOnly ? accentColor : 'transparent',
                      }}
                    >
                      {showSaleOnly && <span className="text-[10px]" style={{ color: isDark ? '#0f0508' : '#faf6ef' }}>✓</span>}
                    </div>
                    Sale Items Only
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className={`${t.textMuted} mb-2`} style={{ fontFamily: 'Jost, sans-serif' }}>No pieces match your filters</p>
            <button onClick={clearFilters} className={`text-xs tracking-widest uppercase ${t.gold} underline underline-offset-4`} style={{ fontFamily: 'Jost, sans-serif' }}>
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div layout className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
            <AnimatePresence mode="popLayout">
              {filtered.map(product => (
                <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
