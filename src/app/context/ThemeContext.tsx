import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem('aurelia-theme') as Theme) || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    localStorage.setItem('aurelia-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

// ─────────────────────────────────────────────────────────────────────────────
// Royal Indian palette
//   Light  = warm ivory cream + deep maroon + antique gold
//   Dark   = deep maroon-black ("Durbar Night") + cream + antique gold
// ─────────────────────────────────────────────────────────────────────────────
export const tc = (isDark: boolean) => ({
  // Backgrounds
  pageBg:       isDark ? 'bg-[#0f0508]'        : 'bg-[#faf6ef]',
  sectionAlt:   isDark ? 'bg-[#170a0f]'        : 'bg-[#f5ede0]',
  sectionAlt2:  isDark ? 'bg-[#1c0c12]'        : 'bg-[#f0e4d0]',
  cardBg:       isDark ? 'bg-[#1e0d13]'        : 'bg-[#f5ede0]',
  cardBgMuted:  isDark ? 'bg-[#180b10]'        : 'bg-[#f0e6d4]',
  inputBg:      isDark ? 'bg-[#1e0d13]'        : 'bg-[#f5ede0]',

  // Text
  text:         isDark ? 'text-[#faf6ef]'      : 'text-[#1a0808]',
  textSec:      isDark ? 'text-[#e8d4b0]'      : 'text-[#3c1414]',
  textMuted:    isDark ? 'text-[#b89070]'      : 'text-[#8a5a40]',
  textDim:      isDark ? 'text-[#9a7050]'      : 'text-[#a07050]',
  textDimmer:   isDark ? 'text-[#6a4830]'      : 'text-[#c09060]',

  // Borders (warm gold undertone)
  border:       isDark ? 'border-[#c8900a]/10' : 'border-[#c8900a]/18',
  borderMd:     isDark ? 'border-[#c8900a]/18' : 'border-[#c8900a]/30',
  borderStrong: isDark ? 'border-[#c8900a]/30' : 'border-[#c8900a]/50',

  // Buttons
  btnPrimary:   isDark
    ? 'bg-[#c9a84c] text-[#0f0508] hover:bg-[#b8962e]'
    : 'bg-[#7c1a2e] text-[#faf6ef] hover:bg-[#6b1520]',
  btnOutline:   isDark
    ? 'border border-[#c9a84c]/40 text-[#faf6ef] hover:border-[#c9a84c]/70 hover:bg-[#c9a84c]/8'
    : 'border border-[#7c1a2e]/35 text-[#7c1a2e] hover:border-[#7c1a2e]/70 hover:bg-[#7c1a2e]/5',

  // Input fields
  inputField:   isDark
    ? 'bg-[#1e0d13] border border-[#c9a84c]/15 text-[#faf6ef] placeholder-[#9a7050] focus:border-[#c9a84c]/45'
    : 'bg-[#f5ede0] border border-[#c8900a]/25 text-[#1a0808] placeholder-[#a07050] focus:border-[#7c1a2e]/50',

  // Navbar / overlays
  navScrolled:  isDark
    ? 'bg-[#0f0508]/95 border-[#c9a84c]/12'
    : 'bg-[#faf6ef]/96 border-[#c8900a]/20',
  overlayBg:    isDark ? 'bg-[#0f0508]/98 backdrop-blur-xl' : 'bg-[#faf6ef]/98 backdrop-blur-xl',
  drawerBg:     isDark ? 'bg-[#0f0508]'   : 'bg-[#faf6ef]',
  modalBackdrop:isDark ? 'bg-black/65 backdrop-blur-sm' : 'bg-[#1a0808]/25 backdrop-blur-sm',

  // Accent tokens (Indian brand)
  gold:         isDark ? 'text-[#c9a84c]'  : 'text-[#9a6e10]',
  goldBg:       isDark ? 'bg-[#c9a84c]'   : 'bg-[#9a6e10]',
  maroon:       'text-[#7c1a2e]',
  maroonBg:     'bg-[#7c1a2e]',
});
