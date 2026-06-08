# Rang Mahal — Nuxt 3 Storefront

Handwoven ethnic-wear storefront built with Nuxt 3. Every button works: cart, wishlist, search, filters, checkout, promo codes, order tracking, account — all persisted in your browser (no backend needed).

## Run on localhost

```bash
cd rang-mahal
npm install
npm run dev
```

Open http://localhost:3000

Or on Windows, just double-click `run.bat`.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/shop` (+ `?cat=` / `?q=`) | Shop with filters, sort, search |
| `/product/:id` | Product detail (sizes, qty, add/buy now) |
| `/cart` | Bag — qty, remove, promo `MAHAL10`, checkout |
| `/wishlist` | Saved pieces |
| `/account` | Sign in / register (demo, browser-only) |
| `/lookbook` | Lookbook |
| `/about` | Our story + artisans |
| `/contact` | Contact form |
| `/help` | Size guide · Shipping · Returns · Track order |

## Build for production

```bash
npm run build
npm run preview
```
