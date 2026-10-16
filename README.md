# Patel Selection website

Multi-page, three-language (English, Hindi, Gujarati) website for Patel Selection, Ambli-Bopal Road, Ahmedabad.

## What changed and why

| Request | What was done |
|---|---|
| Separate pages for every navbar item | Real pages: `/products`, `/departments`, `/about`, `/send-a-photo`, `/visit`, `/my-list`, plus `/areas` |
| Category pages and product pages | `/products/chairs`, `/dining-tables`, `/center-tables`, `/cabinets`, `/shoe-racks`, `/step-stools`, and one page per product (44), each with description, features, details table, FAQ, related products |
| Better list experience | One "Add" button that turns into a - 1 + stepper in place, an "Added" message with a "View list" button, a list drawer with 3 clear steps, free-delivery progress bar, list saved on the phone, the WhatsApp message carries each product's page link |
| Page flashes/waits before the site shows | Every page is built as real HTML at build time, so content shows immediately. The 3D hero is optional and starts after the page is usable (large screens only). The old "Loading the showroom" placeholder is gone |
| Keywords customers search | Each page has its own title, description, headings and a "People also search for" list in English, Hindi, Gujarati and Hinglish, plus structured data (LocalBusiness, Product, Breadcrumb, FAQ) |
| Hindi and Gujarati | `/hi/...` and `/gu/...` versions of every page, linked with hreflang, language switch in the header |
| Local listing | See `LOCAL-LISTING.md` |

## Live animations and 3D (what makes the site different)

- **Live icons** (`src/components/LiveIcon.tsx`): the chair rocks, cabinet doors open, the pot lid bobs and steams, the pan tosses an egg, the flask steams, the truck drives. Plain CSS, no JavaScript.
- **3D hero**: floating chairs, tables and cabinets that dodge your pointer and fly when you tap (`src/three/heroScene.ts`).
- **Live showroom** (`src/components/LiveShowroom.tsx`): lit stage, swinging price tag, glowing ring, photo that tilts in 3D, optional spinning 3D model, shelf where products drop in, live tour.
- **3D showroom carousel** on the home page, **3D viewer + AR** on product pages, **dining set builder** (`/dining-set-builder`), **fly-to-list** animation.
- **Page effects** (`src/components/Fx.tsx`): glowing cursor, magnetic buttons, cards that light up and tilt, scroll progress bar, brand strip that skews with scroll speed. All switch off for visitors who ask for reduced motion.

## Commands

```
npm install
npm run dev        # work on the site locally
npm run build      # builds every page into /dist (about 195 HTML files) + sitemap.xml + robots.txt
npm run preview    # look at the built site
```

## Before you go live (important)

1. **Domain:** set your real address in `site.config.json` (`siteUrl`), then run `npm run build`. Everything (canonical links, hreflang, sitemap, share previews) uses it.
2. **Shop timings, phone, address:** edit `src/config.ts`. Fill `HOURS` and `SAME_AS` when you have them.
3. **Check the content marked below.** I wrote it from your business card, your old site and public product information, and I could not confirm everything.

## Please confirm these (I could not verify them)

- Prices in `src/data/products.ts` were carried over from the old site. Remove a price to show "Ask for rate".
- "Free delivery on 10+ chairs", "25+ years", "reply within 1 to 2 hours" and the list of brands "available on request" (Supreme, Varmora, Royal) were carried over from the old site.
- Department item lists (`src/data/departments.ts`, for example what "Home Appliances" includes) are typical items; edit them to match what you really stock.
- Product facts: only facts I could check on the maker's own listing or printed on the maker's product picture are shown as product-specific (Nilkamal Paradise, CHR2061, Shahenshah, Breeze, Freedom; sizes of National Jaipur table, Party Round Roma table and Power Series cabinets; the Muraj "4-year guarantee" printed in its picture). Everything else is general for that product type. Add more in `FACTS` in `src/data/products.ts`.
- **Hindi and Gujarati text should be read by a native speaker** (you or your family) before launch. A few small edits will make it sound more natural.
- A few product photos are very small (for example `cello-novelty-2-foot`). Replace them with larger photos using the same file name.

## How to add or edit things

- **Add a product:** put the photo in `public/images/products/` named `brand-model.jpeg` (lowercase, dashes, for example `sky-titan.jpeg`) and add one line in `src/data/products.ts`. The page, sitemap entry and Hindi/Gujarati versions are created automatically.
- **Change text:** category text is in `src/data/categories.ts`, department text in `src/data/departments.ts`, page text in `src/data/pages.ts`, buttons and labels in `src/i18n.tsx`. Each text has three versions in the order English, Hindi, Gujarati.

## Hosting

Works on Cloudflare Pages, Vercel and Netlify. Build command `npm run build`, output folder `dist`. Pages are saved as `name.html`, which all three serve at the clean address (`/products/chairs`, no `.html`). Unknown addresses show `404.html`.

## Other notes

- `.env.production` (it held a placeholder domain that overrode your real one) was removed; `site.config.json` is now the only place for the address.
- Missing files that the old HTML pointed to (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `og-image.jpg`) were created.
- Removed: the old `srcc` backup folder, the nested `patel-selection.zip`, and two unused images. The business card image moved to `assets-src/`.
- `/my-list` is set to "noindex" on purpose (it is personal and has no content for search).
