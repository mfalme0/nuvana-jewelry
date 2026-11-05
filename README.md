# Nuvana Jewellery

A small online store for handcrafted botanical jewellery, built with **Nuxt 3**, **Tailwind CSS**, and a lightweight Nitro server API backed by a JSON product database.

## Live site

https://nuvana-jewellery.example.com (deployed link to be added)

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Nuxt 3 (Vue 3) |
| Styling | Tailwind CSS + Botanical design system |
| Backend / API | Nitro server routes (`server/api/`) |
| Database | JSON file (`data/products.ts`) |
| Images | Nuxt Image (ipx) with WebP presets |
| Sitemap | `@nuxtjs/sitemap` |
| Fonts | EB Garamond (display) + Instrument Sans (reading), via Google Fonts |
| Cart | localStorage-backed composable (`composables/useCart.ts`) |

## Design system — "Botanical"

The site follows the Botanical design system:

- **Ground:** cream `#f5efdf`; **ink:** forest green `#1e382c`
- **Panel:** sage `#e0e5d3`; **warm field:** pale clay `#e6cbb8`; **accent:** terracotta `#895440`
- **Typography:** EB Garamond for display/headings, Instrument Sans for reading text and controls
- **Images:** arched photographs with a fine arch ornament line, circular object portraits, subtle paper grain
- **Motion:** interaction token `0.35s` ease; reduced-motion preferences respected (no transitions/transforms)

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero with large serif copy and arched photograph, featured products |
| `/products` | Product listing with category filters |
| `/products/[slug]` | Product detail with gallery, structured data, Open Graph |
| `/cart` | Shopping cart (localStorage persisted) |
| `/checkout` | Mock checkout (no real payment) |

## SEO

- Unique `<title>` and meta description per page (via `useHead`)
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:image`, `product:price:amount`, `product:price:currency`)
- JSON-LD **Product** structured data on every product detail page
- Clean, readable URLs (`/products/dogwood-blossom-necklace`)
- Sitemap generated at `/sitemap.xml` from `/api/_sitemap`
- Fast images: Nuxt Image with WebP presets, lazy loading, preloading of hero images, reserved dimensions, meaningful `alt` text

## Getting started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The dev server runs at `http://localhost:3000`.

## Project structure

```
nuvana/
├── app/              # App root (app.vue)
├── assets/css/       # Botanical design-system CSS variables
├── components/       # Vue components (cards, gallery, cart, etc.)
├── composables/      # useCart cart state composable
├── data/             # Product database (JSON)
├── layouts/          # Default layout
├── pages/            # Nuxt pages (routes)
├── public/           # Static assets (favicon, robots.txt)
├── server/api/       # Nitro server routes (products, sitemap)
├── types/            # TypeScript types
├── nuxt.config.ts    # Nuxt configuration
├── tailwind.config.js# Tailwind config with Botanical tokens
└── package.json
```

## Cart & checkout

The cart persists in `localStorage` and survives page reloads. Adding an item, updating quantities, and removing items all update the badge in the header. Checkout is mocked — no payment is processed; the checkout page confirms the order and offers to continue shopping.

## Deployment

This is a standard Nuxt 3 app and can be deployed to any platform that supports Node.js (Vercel, Netlify, Render, Railway, etc.):

```bash
npm run build
npm run preview   # locally verify the production build
```

For static hosting, use `npm run generate` (nuxt generate) and deploy the `.output/public` folder.

## AI usage

This project was built with AI assistance for scaffolding, boilerplate, and component generation. All architectural decisions (stack, Nuxt 3 + Tailwind + Nitro, JSON database, Botanical design system, SEO strategy, image strategy) and all copywriting were made by me. AI was used to accelerate repetitive implementation (config files, component skeletons, boilerplate TypeScript), which I then reviewed, adapted to the design system, and integrated myself.

## License

MIT