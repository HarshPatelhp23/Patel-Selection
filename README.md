# Patel Selection Website (React + Vite + TypeScript)

Updated version of your existing project. Same setup, same commands:

```bash
npm install
npm run dev      # development at http://localhost:5173
npm run build    # production files in /dist
```

## What changed
- New logo (`public/images/logo.svg`, used by `src/components/Logo.tsx`) and a site-wide palette limited to the logo's red, blue, navy and white.
- Full-width layout with animated hero (falling items + rotating 3D product), brand strips, feature cards, counters and footer.
- New "Live Showroom" for products: choose a product, then choose a company (brand filter with counts), optional price sort and an automatic "Live tour". The selected item shows on a spotlight turntable with a swinging price tag, and every item sits on an animated shelf.
- Each product has WhatsApp and Call buttons, and the free-delivery rule (10+ chairs) is shown.
- "Send a photo" section, and an Android-style bottom tab bar on phones.
- Removed the old `scenes/`, `StickyCTA.tsx` and the old `App.tsx`; they are replaced by `src/components/*` (products live in `Showroom.tsx` and `Stage.tsx`).
  `package.json` is unchanged, so `@react-three/*`, `drei` and `framer-motion` are no longer used and can be removed later with `npm uninstall`.

## 3D hero (WebGL) and effects
- `src/three/heroScene.ts`: the full-screen hero. A flowing shader background, 14 glossy furniture models lit with studio reflections, glowing orbit rings with bloom, particle dust, pointer-dodging physics, tap-to-scatter, phone tilt (Android), and a camera that dives as you scroll. Change the products shown in the `SPEC` list and the colours in `COLORS`.
- `src/components/Fx.tsx`: glowing cursor, magnetic buttons, card spotlight, scroll-speed skew on the brand strip (mouse effects are off on touch screens).
- Everything switches to a calm still picture when the visitor's device is set to "reduce motion".

## Enquiry list and WhatsApp photos
- Customers add showroom products (with quantity) and store departments to one "My list", then send everything in one WhatsApp message.
- For showroom products that have a real photo, the message contains the photo link, so WhatsApp shows the picture and you can recognise the exact item.
- WhatsApp cannot attach a file from a web link, so the photo travels as a link. The link only works when the website is published online (or while your ngrok link is running), because it points to `public/images/products/`.
- Chairs in the list fill a "free delivery" bar that unlocks at 10 chairs.

## Add real product photos
1. Put the photo in `public/images/products/` (any folder inside `public/images` also works).
2. Name it after the product: brand + model, for example `nilkamal-paradise.jpg`. Capital letters, spaces, `_` instead of `-`, and the type (`.jpg`, `.jpeg`, `.png`, `.webp`) do not matter, so `Nilkamal_Paradise.jpeg` works too.
3. That is all. While `npm run dev` is running the page reloads by itself. In a production build, run `npm run build` again.
4. The real photo replaces the sample 3D model on the shelf card and on the spotlight stage. Products without a photo keep the 3D model.
5. If a file in `images/products` matches no product, the browser console (F12) lists it with an example of a correct name.

### Turn-around view with real photos (optional)
Real 3D cannot be made from one photo. Add more angles with the same name plus `-2`, `-3` (or `_2`, `_3`): `nilkamal-paradise.jpg`, `nilkamal-paradise-2.jpg`, `nilkamal-paradise-3.jpg` ... The customer drags left or right to turn the product. Use 8 to 16 photos, same distance and height, for a smooth spin.

Tip: clear, plain-background photo, about 1200 px wide, under 300 KB.

| Category | Product | Save the photo as (in `public/images/products/`) |
|---|---|---|
| Chairs | Nilkamal CHR2061 | `nilkamal-chr2061.jpg` |
| Chairs | Nilkamal Paradise | `nilkamal-paradise.jpg` |
| Chairs | Nilkamal Mystique | `nilkamal-mystique.jpg` |
| Chairs | National Delhi Model | `national-delhi-model.jpg` |
| Chairs | National Puna Unbreakable | `national-puna-unbreakable.jpg` |
| Chairs | National Spinnex | `national-spinnex.jpg` |
| Chairs | National Bentley (Relax Chair) | `national-bentley-relax-chair.jpg` |
| Chairs | National Polo Baby Chair | `national-polo-baby-chair.jpg` |
| Chairs | Cello Unique | `cello-unique.jpg` |
| Chairs | Cello Ultra Mac | `cello-ultra-mac.jpg` |
| Chairs | Cello Comfort Easy | `cello-comfort-easy.jpg` |
| Chairs | Cello Mayor (Very Premium) | `cello-mayor-very-premium.jpg` |
| Chairs | Muraj Creata | `muraj-creata.jpg` |
| Chairs | Muraj Swift | `muraj-swift.jpg` |
| Chairs | Muraj Breazza | `muraj-breazza.jpg` |
| Chairs | Sky Titan | `sky-titan.jpg` |
| Chairs | Sky Cushion | `sky-cushion.jpg` |
| Chairs | Sky Spine Chair | `sky-spine-chair.jpg` |
| Chairs | Sky Megna | `sky-megna.jpg` |
| Chairs | Sky Texas | `sky-texas.jpg` |
| Dining Tables | National Jaipur Dining Table | `national-jaipur-dining-table.jpg` |
| Dining Tables | National Jaipur Roma Dining Table | `national-jaipur-roma-dining-table.jpg` |
| Dining Tables | National Party Round Dining Table | `national-party-round-dining-table.jpg` |
| Dining Tables | National Party Round Roma Dining Table | `national-party-round-roma-dining-table.jpg` |
| Dining Tables | Nilkamal Shahensha | `nilkamal-shahensha.jpg` |
| Dining Tables | Nilkamal Shahensha Cross | `nilkamal-shahensha-cross.jpg` |
| Dining Tables | Cello Senator | `cello-senator.jpg` |
| Dining Tables | Cello Proline | `cello-proline.jpg` |
| Center Tables | National Spectra | `national-spectra.jpg` |
| Center Tables | National Rajkot | `national-rajkot.jpg` |
| Center Tables | National Elegant | `national-elegant.jpg` |
| Center Tables | Nilkamal Breeze (Glass Top) | `nilkamal-breeze-glass-top.jpg` |
| Center Tables | Nilkamal Center Table 1 (With Glass) | `nilkamal-center-table-1-with-glass.jpg` |
| Cabinets | National Power Series, 4 Foot | `national-power-series-4-foot.jpg` |
| Cabinets | National Power Series, 2 Foot | `national-power-series-2-foot.jpg` |
| Cabinets | Cello Novelty, 2 Foot | `cello-novelty-2-foot.jpg` |
| Cabinets | Nilkamal Freedom, 2 Foot | `nilkamal-freedom-2-foot.jpg` |
| Shoe Racks | National Power Small Shoe Rack | `national-power-small-shoe-rack.jpg` |
| Shoe Racks | National Power Big Shoe Rack | `national-power-big-shoe-rack.jpg` |
| Step Stools | National Sigma Step-In | `national-sigma-step-in.jpg` |
| Step Stools | Nilkamal Stool 21 | `nilkamal-stool-21.jpg` |
| Step Stools | Nilkamal Stool 31 | `nilkamal-stool-31.jpg` |
| Step Stools | Seatex Eiffel | `seatex-eiffel.jpg` |

For any new product, the name follows the same rule: `slugOf(brand, name)` in `src/data/products.ts`.

## Where to edit things
- Products, prices, brands, ranges: `src/data/products.ts` (leave the price out to show "Ask for rate")
- Phone number and WhatsApp number: `src/config.ts`
- Founder tribute text and photo (Visit section): `src/data/founder.ts` and `public/images/founder.jpg`
- Colours and layout: `src/index.css` (top of file)
- Shop photo: `public/images/shop.jpg`
- Logo: `src/components/logoSvg.ts` and `public/images/logo.svg`

## Structure
```
src/
  App.tsx                  page order
  config.ts                phone + image settings
  data/products.ts         products and prices
  three/models.ts          3D furniture models + thumbnails
  hooks/usePhoto.ts        finds real photos automatically
  components/              Hero, Showroom, Stage, Enquiry, Sections, Chrome, Logo, Icon
  state/Enquiry.tsx        the shared enquiry list + WhatsApp message builder
public/images/             logo, shop photo, products/ (your photos)
```

## Deploy
Run `npm run build` and upload the `dist` folder to any host (Vercel, Netlify, etc.).
