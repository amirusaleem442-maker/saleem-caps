# SALEEM CAPS — Premium E-Commerce Website

**QUALITY • STYLE • TRADITION**
A complete, mobile-first online store for premium traditional Hausa embroidered caps (Kufi / Topi).

Live pages: `index.html` · `shop.html` · `product.html` · `about.html` · `contact.html` · `cart.html` · `checkout.html` · `admin.html`

---

## 1. Run it

**Easiest:** open `index.html` in any browser — everything works offline (no build step, no dependencies).

**Recommended (best behaviour):** serve the folder so it behaves exactly like a live website:

```bash
cd saleem-caps
python3 -m http.server 8080
# then visit http://localhost:8080
```

To publish: upload the whole `saleem-caps` folder to any host (Netlify, Vercel, GitHub Pages, cPanel, Namecheap…). Drag-and-drop deploy on Netlify works with zero configuration.

---

## 2. The 19 product photographs (please read)

Your 19 original photos were **not** uploaded to this workspace, so the site currently ships with **19 elegant, clearly-labelled placeholder frames** (one per cap, each showing its number, name and size). Nothing is AI-imagined product photography — they are neutral gold-on-dark slots waiting for your photos.

### How to add your real photographs — two options

**Option A — Admin Dashboard (no code, recommended)**
1. Open `admin.html`, password **`saleem2026`** (change it in **Settings → Security**).
2. **Products** tab → press **Photo** on a row → choose your photo. It is cropped square, compressed and saved instantly.
3. For a whole new cap: **Add / Upload** tab → upload a photo → set name, size, price → Save.
4. Bulk: **Add / Upload → Bulk Upload** accepts many photos at once.

**Option B — overwrite the files (permanent, best quality/speed)**
Drop your photos into `saleem-caps/images/caps/` using these exact names, keeping the same sizes:

| File | Size | Cap name | File | Size | Cap name |
|------|------|----------|------|------|----------|
| `cap-01.svg` | 21½ | Sarkin Sarauta | `cap-11.svg` | 22½ | Masari Prestige |
| `cap-02.svg` | 22 | Makera Heritage | `cap-12.svg` | 22½ | Arewa Grand |
| `cap-03.svg` | 22 | Kafur Royal | `cap-13.svg` | 22½ | Danfodio Legacy |
| `cap-04.svg` | 22 | Zaria Classic | `cap-14.svg` | 23 | Galadima Gold |
| `cap-05.svg` | 22 | Daura Emblem | `cap-15.svg` | 23 | Alkali Ivory |
| `cap-06.svg` | 22 | Katsina Crest | `cap-16.svg` | 23 | Tafawa Noble |
| `cap-07.svg` | 22½ | Sokoto Regal | `cap-17.svg` | 23 | Amir Supreme |
| `cap-08.svg` | 22½ | Kano Signature | `cap-18.svg` | 23½ | Zaki Royal |
| `cap-09.svg` | 22½ | Hausa Noble | `cap-19.svg` | 24 | Bakandamiya |
| `cap-10.svg` | 22½ | Sarki Elegance | | | |

You can keep the `.svg` name and put a JPEG inside only if you also edit `js/data.js`; the clean way is to use **.jpg** files and update the paths — or just use Option A, which is safest.

**Size distribution is exactly as specified:** 21½ ×1 · 22 ×5 · 22½ ×7 · 23 ×4 · 23½ ×1 · 24 ×1 = **19 caps**.

---

## 3. Pricing

Every cap is **₦18,000**. Change prices any time:

- **Per cap:** Admin → Products → edit the price field → **Save**.
- **Every cap at once:** Admin → Settings → “Set ALL products to this price” → **Apply price to all caps**.
- New caps default to the price in Settings → Pricing.

Prices render in Nigerian Naira (`₦18,000`) everywhere: product cards, product page, cart, checkout, WhatsApp messages.

---

## 4. WhatsApp ordering — +234 813 809 6960

All order buttons open WhatsApp with a pre-written message containing:

- **Customer name**
- **Product name**
- **Cap size**
- **Quantity**
- **Total price**

plus phone, delivery address and order number at checkout. Configured in `js/data.js` (`whatsapp: "2348138096960"`) or Admin → Settings.

---

## 5. What the site does

**Storefront**
- Hero: “DISCOVER THE BEAUTY OF TRADITION” + gold **SHOP NOW** button
- Featured caps, New Arrivals, complete 19-cap collection, size showcase, brand story, testimonials
- Size filter (21½ → 24), live search, sorting (size / newest / name / price)
- Product pages: gallery, price, stock status, quantity selector, Add to Cart, Buy Now, Order on WhatsApp, care/delivery/shipping accordions, related caps
- Slide-out cart drawer + full cart page with quantity editing
- Mobile-friendly checkout (validated form, payment method choice, order summary)
- Orders are recorded and the message is handed to WhatsApp in one step
- Floating WhatsApp button, sticky mobile buy bar, toasts, responsive from 320px to ultrawide
- Size guide, FAQ, contact form (sends to WhatsApp), business details everywhere

**Admin Dashboard (`admin.html`)** — password protected
- Overview: products, current price, orders, revenue, stock, catalogue by size
- Products: change **price**, **size**, **stock**, flags (featured / new / in stock), **upload photo** per product, **delete product**, restore the 19 originals
- Add / Upload: photo upload (drag-drop, auto square + compress), name, size, price, stock, colourway, description; bulk upload
- Orders: status workflow (new → confirmed → shipped → delivered / cancelled), full order detail, WhatsApp the customer, delete
- Customers: name, phone, email, location, order count, spend, one-tap WhatsApp/call
- Settings: default price, apply price to all, WhatsApp/phone/email/address, delivery fee, change password, JSON backup export/import

---

## 6. Important notes

- **Data lives in the browser** (localStorage). Products, orders and settings persist on the device/browser where they were created. That makes the site fully functional as a self-contained store with no server — but orders placed on a customer's phone are delivered to you **through WhatsApp**, which is the source of truth for fulfilment; the Orders tab shows orders placed on your own device.
- To become a multi-device store with server-side order history, plug the functions in `js/store.js` into a backend (e.g. Supabase/Firebase) — every read/write already goes through that one file.
- Change the admin password immediately (Admin → Settings → Security). Default: `saleem2026`.
- Product photos uploaded via the dashboard are compressed to ~1000px squares to fit browser storage. If you upload a lot of photos and see a “storage is full” warning, use Option B (files in `images/caps/`) instead.
- Fonts are system serif/sans for instant loading and perfect offline behaviour — no external CDN required.

File map: `css/styles.css` (design system) · `js/data.js` (brand, price, 19 products) · `js/store.js` (cart/orders/admin logic) · `js/ui.js` (header, footer, cards, drawer) · `js/home.js`, `shop.js`, `product.js`, `cart.js`, `checkout.js`, `contact.js`, `admin.js` · `tools/` (regenerate logo/placeholders).
