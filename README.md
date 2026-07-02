# Aurelia — Luxury Indian Fashion E-Commerce

A premium e-commerce frontend for Indian ethnic clothing, featuring a rich, immersive shopping experience with a warm gold-and-cream design language.

**Live Site:** [https://aesthetix-studio.github.io/Aurelia/](https://aesthetix-studio.github.io/Aurelia/)

---

## Features

- **Homepage** — Hero banner, featured categories, best sellers, new arrivals, flash sale, testimonials, and newsletter
- **Shop Page** — Category filtering, price range, sorting, sale items, and responsive product grid
- **Product Detail** — Image gallery, size/color selection, ratings, reviews, and related products
- **Cart & Checkout** — Slide-out cart drawer, wishlist, multi-step checkout flow
- **Account Page** — User profile and order management
- **Dark/Light Theme** — Full theme toggle with warm gold accent palette
- **Search Modal** — Global product search with real-time results
- **Responsive Design** — Optimized for mobile, tablet, and desktop

## Product Categories

| Category | Items |
|----------|-------|
| Sarees | Banarasi, Kanjeevaram, Chanderi, Bandhani |
| Lehengas | Bridal, Festive, Anarkali |
| Men's Wear | Sherwanis, Nehru Jackets, Kurta Sets, Bandhgala |
| Bridal | Complete Bridal Sets, Bridal Sarees |
| Festive | Anarkali Suits, Palazzo Sets |
| Accessories | Jewellery, Bags, Dupattas |

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 with custom theme tokens
- **UI Components:** Radix UI primitives (shadcn/ui pattern)
- **Routing:** React Router v7 (HashRouter for GitHub Pages)
- **Animations:** Motion (Framer Motion)
- **State:** React Context (cart, wishlist, theme)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── app/
│   ├── components/        # Page-level components
│   │   ├── ui/            # Reusable UI primitives (shadcn)
│   │   └── figma/         # Image fallback utilities
│   ├── context/           # React Context providers
│   ├── data/              # Product catalog and category data
│   └── styles/            # Global CSS, theme, fonts
├── main.tsx               # Entry point
└── styles/                # Tailwind and global styles
```

## License

This project was originally based on a [Figma design](https://www.figma.com/design/tzRSGTtwurQtlKE1L79uDB/Portfolio-website---awwwwards--style) and has been transformed into a full e-commerce experience by Aesthetix Studio.
