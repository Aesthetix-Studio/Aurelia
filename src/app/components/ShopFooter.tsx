import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';
import { useTheme, tc } from '../context/ThemeContext';

const footerLinks = {
  Shop: ['Sarees', 'Lehengas', "Men's Wear", 'Bridal', 'Accessories', 'Sale'],
  Craft: ['Our Artisans', 'Weaving Heritage', 'Care Guide', 'Sizing Guide', 'Authenticity Pledge'],
  Company: ['Our Story', 'Sustainability', 'Careers', 'Press', 'Stockists'],
};

export const ShopFooter = () => {
  const { isDark } = useTheme();
  const t = tc(isDark);

  return (
    <footer className={`${t.pageBg} border-t ${t.border} pt-16 pb-8 px-6`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="block mb-1">
              <span
                className={`tracking-[0.3em] uppercase ${t.text}`}
                style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.1rem', fontWeight: 600 }}
              >
                AURELIA
              </span>
            </Link>
            <p
              className="text-[9px] tracking-widest uppercase mb-4"
              style={{ fontFamily: 'Jost, sans-serif', color: isDark ? '#c9a84c' : '#9a6e10' }}
            >
              Luxury Indian Fashion
            </p>
            <p className={`${t.textMuted} text-sm leading-relaxed max-w-xs`} style={{ fontFamily: 'Jost, sans-serif' }}>
              Celebrating five centuries of Indian artisanal excellence — from the looms of Varanasi to the ateliers of Jaipur.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center border transition-all"
                  style={{
                    borderColor: isDark ? 'rgba(201,168,76,0.2)' : 'rgba(200,144,10,0.25)',
                    color: isDark ? '#b89070' : '#8a5a40',
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p
                className="text-[10px] tracking-widest uppercase mb-5"
                style={{ fontFamily: 'Jost, sans-serif', color: isDark ? '#c9a84c' : '#9a6e10' }}
              >
                {title}
              </p>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <Link
                      to={['Sarees', 'Lehengas', "Men's Wear", 'Bridal', 'Accessories', 'Sale'].includes(link)
                        ? `/shop?${link === 'Sale' ? 'sale=true' : `category=${link}`}`
                        : '#'
                      }
                      className={`text-sm ${t.textMuted} transition-colors`}
                      style={{ fontFamily: 'Jost, sans-serif' }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={`border-t ${t.border} pt-8 flex flex-col md:flex-row justify-between items-center gap-4`}>
          <p className={`text-xs ${t.textDimmer}`} style={{ fontFamily: 'Jost, sans-serif' }}>
            © {new Date().getFullYear()} AURELIA. All rights reserved. Crafted with love in India.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a
                key={item}
                href="#"
                className={`text-xs ${t.textDimmer} transition-colors`}
                style={{ fontFamily: 'Jost, sans-serif' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
