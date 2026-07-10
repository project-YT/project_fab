
# Aurelle — Women's Fashion Boutique

Premium mobile-first storefront + non-technical admin dashboard. Sky Blue × Blush Pink palette, editorial minimal feel inspired by Zara & Nykaa Fashion. Firebase (Auth + Firestore) + Cloudinary + Vercel. No Lovable Cloud, no Firebase Storage, no Supabase.

## Design system

- Palette (oklch tokens in `src/styles.css`):
  - `--background` soft ivory `#fdfcfb`, `--foreground` deep ink `#1a1a2e`
  - `--primary` sky blue `#a8d0e6`, `--accent` blush pink `#f7c6d0`
  - `--muted` `#f5efeb`, subtle gradient tokens `--gradient-hero`, `--gradient-card`
  - Elegant shadows `--shadow-soft`, `--shadow-elevated`
- Typography: Cormorant Garamond (display) + Inter (body), loaded via `<link>` in `__root.tsx`
- Rounded cards (`--radius: 1.25rem`), generous whitespace, motion via `framer-motion`
- Fully responsive, mobile-first bottom nav bar on storefront

## Storefront routes (`src/routes/`)

- `/` — hero, featured categories, new arrivals, editorial banner, brand story
- `/shop` — filterable grid (category, brand, price, size)
- `/categories` + `/categories/$slug`
- `/product/$id` — gallery, size selector, add to cart/wishlist, related
- `/search` — instant filter from Firestore
- `/wishlist`, `/cart`, `/checkout` (Cash on Delivery)
- `/account` — orders, addresses, profile (auth-gated via `_authenticated` layout)
- `/about`, `/contact`, `/auth` (login/register)
- Global: sticky header, mobile bottom nav, footer
- SEO: per-route `head()` with title, description, og tags, JSON-LD

## Admin dashboard (`/admin/*`)

Gated layout `_admin.tsx` checks `VITE_FIREBASE_ADMIN_EMAILS` against the logged-in Firebase user's email.

- `/admin` — revenue, orders, low-stock, top products (Recharts)
- `/admin/products` — CRUD, drag-drop multi-image upload to Cloudinary with previews + progress bar + Zod validation
- `/admin/categories`, `/admin/brands`, `/admin/banners` — CRUD
- `/admin/orders` — status pipeline (pending → confirmed → shipped → delivered)
- `/admin/customers` — list, block/unblock flag
- `/admin/inventory` — stock levels, quick adjust
- `/admin/coupons` — code, %/flat, expiry, min order
- `/admin/settings` — store info, contact, shipping fee

All admin UI uses shadcn (Card, Table, Dialog, Form) with a soft sidebar sized for tablets/desktops.

## Data layer (Firestore collections)

`products`, `categories`, `brands`, `banners`, `orders`, `users`, `wishlists`, `carts`, `coupons`, `settings`.

- Client: `src/lib/firebase.ts` initializes app from `VITE_FIREBASE_*` envs
- Hooks: `useCollection`, `useDoc`, `useAuth` (React Query + Firestore SDK)
- Cart & wishlist: Firestore when logged in, localStorage fallback for guests, merged on login
- Cloudinary upload: unsigned preset from `VITE_CLOUDINARY_CLOUD_NAME` + `VITE_CLOUDINARY_UPLOAD_PRESET`; only `secure_url` + `public_id` stored in Firestore
- Firestore Security Rules bundled in `firestore.rules` — public read on catalog, owner writes on cart/wishlist/orders, admin writes on catalog gated by email allow-list

## Environment variables

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_ADMIN_EMAILS=projectet235@gmail.com
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET
```

`.env.example` committed; real values added by the user before deploy.

## Documentation (repo root)

- `README.md` — overview, features, stack, quickstart, project structure
- `docs/firebase-setup.md` — project creation, enable Email/Password auth, create Firestore, security rules paste, env vars, admin account creation, local dev, Vercel deploy, troubleshooting
- `docs/cloudinary-setup.md` — account, unsigned upload preset (folder `aurelle`), env vars, upload flow, troubleshooting
- `docs/vercel-deployment.md` — GitHub import, env vars, build settings (`bun run build`), custom domain, production deploy, troubleshooting
- `docs/admin-guide.md` — non-technical walkthrough with screenshots-worthy prose: login, add product, upload images, edit, manage orders, banners, inventory

## Packages to install

`firebase`, `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers`, `framer-motion`, `recharts`, `react-dropzone`, `sonner` (already), `lucide-react` (already), shadcn components as needed.

## Delivery order

1. Design tokens + fonts + shadcn theme
2. Firebase + Cloudinary lib + auth context + admin gate
3. Storefront routes + layout/nav + product/cart/wishlist/checkout
4. Admin dashboard + CRUD + uploader
5. SEO metadata + sitemap + robots
6. Documentation + `.env.example` + `firestore.rules`

## Notes for user

- You'll need to (1) create the Firebase project, (2) create the Cloudinary unsigned preset, (3) paste the env vars into Vercel, (4) sign up once with `projectet235@gmail.com` to activate the admin account. Full step-by-step in `docs/`.
- Cash on Delivery only — no payment gateway wired.
- Product images are uploaded directly from the browser to Cloudinary; Firestore only stores the returned secure URLs.
