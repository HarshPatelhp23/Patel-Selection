import { WA_NUMBER } from '../config'
import type { T3 } from '../i18n'

export type ProductType = 'chair' | 'dining' | 'center' | 'cabinet' | 'shoe' | 'stool'
export type Category = 'Chairs' | 'Dining Tables' | 'Center Tables' | 'Cabinets' | 'Shoe Racks' | 'Step Stools'

/** Style of the product, used to write a fitting description. */
export type Kind =
  | 'relax' | 'weave' | 'slat' | 'classic'          // chairs
  | 'rect' | 'round' | 'cross'                        // dining tables
  | 'trolley' | 'shelf' | 'glass'                     // center tables
  | 'cabinet' | 'shoe' | 'step'

export interface Product {
  slug: string        // also the photo file name without extension, e.g. nilkamal-paradise
  category: Category
  type: ProductType
  brand: string
  name: string
  price?: number
  kind: Kind
  dims?: string       // only filled where the size is printed on a manufacturer brochure/photo
  fact?: T3           // one product-specific fact that was checked against the maker's own listing
}

export const CATEGORY_TYPE: Record<Category, ProductType> = {
  'Chairs': 'chair', 'Dining Tables': 'dining', 'Center Tables': 'center',
  'Cabinets': 'cabinet', 'Shoe Racks': 'shoe', 'Step Stools': 'stool',
}
export const CATEGORIES = Object.keys(CATEGORY_TYPE) as Category[]
/** URL part of each category: /products/chairs */
export const CAT_SLUG: Record<Category, string> = {
  'Chairs': 'chairs', 'Dining Tables': 'dining-tables', 'Center Tables': 'center-tables',
  'Cabinets': 'cabinets', 'Shoe Racks': 'shoe-racks', 'Step Stools': 'step-stools',
}
export const catFromSlug = (s: string) => CATEGORIES.find(c => CAT_SLUG[c] === s)

/** Photo file name = brand + model, lowercase, words joined by "-" */
export const slugOf = (brand: string, name: string) =>
  `${brand} ${name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// ADD OR EDIT PRODUCTS HERE: [brand, model name, kind, price?, size?]. Leave the price out to show "Ask for rate".
type Row = [string, string, Kind, number?, string?]
const RAW: Record<Category, Row[]> = {
  'Chairs': [
    ['Nilkamal', 'CHR2061', 'classic'], ['Nilkamal', 'Paradise', 'classic'], ['Nilkamal', 'Mystique', 'classic'],
    ['National', 'Delhi Model', 'classic'], ['National', 'Puna Unbreakable', 'classic'], ['National', 'Spinnex', 'classic'],
    ['National', 'Bentley (Relax Chair)', 'relax'], ['National', 'Polo Baby Chair', 'relax', 595],
    ['Cello', 'Unique', 'classic'], ['Cello', 'Ultra Mac', 'slat'], ['Cello', 'Comfort Easy', 'relax'], ['Cello', 'Mayor (Very Premium)', 'weave'],
    ['Muraj', 'Creata', 'slat'], ['Muraj', 'Swift', 'slat'], ['Muraj', 'Breazza', 'slat'],
    ['Sky', 'Titan', 'slat'], ['Sky', 'Cushion', 'weave'], ['Sky', 'Spine Chair', 'slat'], ['Sky', 'Megna', 'slat'], ['Sky', 'Texas', 'weave'],
    ['Radhey Gold', 'Club Chair', 'weave', 1699],
  ],
  'Dining Tables': [
    ['National', 'Jaipur Dining Table', 'rect', 2599, '1125 x 700 x 705'], ['National', 'Jaipur Roma Dining Table', 'cross', 2899],
    ['National', 'Party Round Dining Table', 'round', 2499], ['National', 'Party Round Roma Dining Table', 'round', 2799, '870 x 870 x 705'],
    ['Nilkamal', 'Shahensha', 'rect', 3199], ['Nilkamal', 'Shahensha Cross', 'cross', 3599],
    ['Cello', 'Senator', 'rect', 3099], ['Cello', 'Proline', 'cross', 3499],
  ],
  'Center Tables': [
    ['National', 'Spectra', 'trolley', 1299], ['National', 'Rajkot', 'trolley', 1199], ['National', 'Elegant', 'shelf', 1899],
    ['Nilkamal', 'Breeze (Glass Top)', 'glass', 3299], ['Nilkamal', 'Center Table 1 (With Glass)', 'shelf', 3999],
  ],
  'Cabinets': [
    ['National', 'Power Series, 4 Foot', 'cabinet', 6399, '550 x 355 x 1225'], ['National', 'Power Series, 2 Foot', 'cabinet', 2499, '590 x 355 x 638'],
    ['Cello', 'Novelty, 2 Foot', 'cabinet', 3499], ['Nilkamal', 'Freedom, 2 Foot', 'cabinet', 3299],
  ],
  'Shoe Racks': [
    ['National', 'Power Small Shoe Rack', 'shoe', 3299], ['National', 'Power Big Shoe Rack', 'shoe', 6499],
  ],
  'Step Stools': [
    ['National', 'Sigma Step-In', 'step', 999], ['Nilkamal', 'Stool 21', 'step', 1499],
    ['Nilkamal', 'Stool 31', 'step', 1399], ['Seatex', 'Eiffel', 'step', 1349],
  ],
}

/** Facts checked against the maker's own product listing (Nilkamal website) or printed on the maker's product picture. Add more as you confirm them. */
const FACTS: Record<string, T3> = {
  'nilkamal-paradise': [
    'Nilkamal presents the Paradise as India’s first tri-colour injection-moulded plastic chair, with a dual-tone backrest and comfortable armrests.',
    'निलकमल पैराडाइज़ को भारत की पहली ट्राई-कलर इंजेक्शन-मोल्डेड प्लास्टिक कुर्सी के रूप में पेश करता है, जिसमें डुअल-टोन बैकरेस्ट और आरामदायक आर्मरेस्ट हैं।',
    'નીલકમલ પૅરેડાઇઝને ભારતની પ્રથમ ટ્રાઇ-કલર ઇન્જેક્શન-મોલ્ડેડ પ્લાસ્ટિક ખુરશી તરીકે રજૂ કરે છે, જેમાં ડ્યુઅલ-ટોન બેકરેસ્ટ અને આરામદાયક આર્મરેસ્ટ છે.',
  ],
  'nilkamal-chr2061': [
    'Nilkamal lists the CHR2061 as a virgin-plastic armchair with a 125 kg load capacity that is light enough to stack and move, for use indoors or outdoors.',
    'निलकमल इस CHR2061 को वर्जिन प्लास्टिक की आर्मचेयर बताता है, जिसकी लोड क्षमता 125 किलो है और जो इतनी हल्की है कि स्टैक करके कहीं भी ले जाई जा सकती है।',
    'નીલકમલ આ CHR2061 ને વર્જિન પ્લાસ્ટિકની આર્મચેર ગણાવે છે, જેની લોડ ક્ષમતા 125 કિલો છે અને જે સ્ટેક કરી ક્યાંય લઈ જઈ શકાય તેટલી હલકી છે.',
  ],
  'nilkamal-shahensha': [
    'Nilkamal describes the Shahenshah plastic dining table (also spelt Shahensha) as lightweight, contemporary and easy to assemble, a good fit for homes, cafés and restaurants.',
    'निलकमल शहंशाह (शहंशा) प्लास्टिक डाइनिंग टेबल को हल्का, आधुनिक और आसानी से जुड़ने वाला बताता है, जो घर, कैफे और रेस्टोरेंट के लिए ठीक रहता है।',
    'નીલકમલ શહેનશાહ (શહેનશા) પ્લાસ્ટિક ડાઇનિંગ ટેબલને હલકું, આધુનિક અને સરળતાથી જોડાય તેવું ગણાવે છે, જે ઘર, કેફે અને રેસ્ટોરન્ટ માટે યોગ્ય છે.',
  ],
  'nilkamal-shahensha-cross': [
    'The Shahenshah Kross is the cross-legged version of Nilkamal’s lightweight, easy-to-assemble Shahenshah dining table, suited to dining rooms, cafés and restaurants.',
    'शहंशाह क्रॉस, निलकमल की हल्की और आसानी से जुड़ने वाली शहंशाह डाइनिंग टेबल का क्रॉस-लेग वर्ज़न है, जो डाइनिंग रूम, कैफे और रेस्टोरेंट के लिए ठीक है।',
    'શહેનશાહ ક્રોસ એ નીલકમલના હલકા અને સરળતાથી જોડાતા શહેનશાહ ડાઇનિંગ ટેબલનું ક્રોસ-લેગ વર્ઝન છે, જે ડાઇનિંગ રૂમ, કેફે અને રેસ્ટોરન્ટ માટે યોગ્ય છે.',
  ],
  'nilkamal-breeze-glass-top': [
    'Nilkamal’s Breeze range is made for patios and outdoor seating, where a glass-top centre table sits between two cushioned chairs.',
    'निलकमल की ब्रीज़ रेंज पैटियो और आउटडोर बैठक के लिए बनी है, जहां दो गद्देदार कुर्सियों के बीच ग्लास-टॉप सेंटर टेबल रखी जाती है।',
    'નીલકમલની બ્રીઝ રેન્જ પૅટિયો અને આઉટડોર બેઠક માટે બનેલી છે, જ્યાં બે ગાદીવાળી ખુરશી વચ્ચે ગ્લાસ-ટૉપ સેન્ટર ટેબલ મુકાય છે.',
  ],
  'nilkamal-freedom-2-foot': [
    'Nilkamal makes the Freedom cabinet range in mini and big sizes, used as storage cabinets and shoe cabinets.',
    'निलकमल फ्रीडम कैबिनेट रेंज मिनी और बिग साइज़ में बनाता है, जिन्हें स्टोरेज कैबिनेट और शू कैबिनेट की तरह इस्तेमाल किया जाता है।',
    'નીલકમલ ફ્રીડમ કેબિનેટ રેન્જ મિની અને બિગ સાઇઝમાં બનાવે છે, જેનો સ્ટોરેજ કેબિનેટ અને શૂ કેબિનેટ તરીકે ઉપયોગ થાય છે.',
  ],
  'national-power-big-shoe-rack': [
    'National’s product picture for this rack highlights multiple storage shelves, smooth edges, door handles and a safety lock.',
    'नेशनल की प्रोडक्ट फोटो में इस रैक की कई स्टोरेज शेल्फ, चिकने किनारे, डोर हैंडल और सेफ्टी लॉक दिखाए गए हैं।',
    'નેશનલના પ્રોડક્ટ ફોટામાં આ રેકની ઘણી સ્ટોરેજ શેલ્ફ, લીસા કિનારા, ડોર હેન્ડલ અને સેફ્ટી લૉક દર્શાવ્યા છે.',
  ],
  'muraj-creata': [
    'Muraj’s own product picture for this slatted armchair advertises a 4-year guarantee; please ask us for the guarantee terms.',
    'मुराज की अपनी प्रोडक्ट फोटो में इस स्लैटेड आर्मचेयर पर 4 साल की गारंटी का जिक्र है; गारंटी की शर्तें हमसे पूछ लें।',
    'મુરાજના પોતાના પ્રોડક્ટ ફોટામાં આ સ્લેટેડ આર્મચેર પર 4 વર્ષની ગેરંટીનો ઉલ્લેખ છે; ગેરંટીની શરતો અમને પૂછી લો.',
  ],
  'muraj-breazza': [
    'Muraj’s own product picture for this slatted armchair advertises a 4-year guarantee; please ask us for the guarantee terms.',
    'मुराज की अपनी प्रोडक्ट फोटो में इस स्लैटेड आर्मचेयर पर 4 साल की गारंटी का जिक्र है; गारंटी की शर्तें हमसे पूछ लें।',
    'મુરાજના પોતાના પ્રોડક્ટ ફોટામાં આ સ્લેટેડ આર્મચેર પર 4 વર્ષની ગેરંટીનો ઉલ્લેખ છે; ગેરંટીની શરતો અમને પૂછી લો.',
  ],
}

export const PRODUCTS: Product[] = CATEGORIES.flatMap(category =>
  RAW[category].map(([brand, name, kind, price, dims]) => {
    const slug = slugOf(brand, name)
    return { slug, category, type: CATEGORY_TYPE[category], brand, name, price, kind, dims, fact: FACTS[slug] } as Product
  }),
)
export const productBySlug = (s: string) => PRODUCTS.find(p => p.slug === s)
export const productsIn = (c: Category) => PRODUCTS.filter(p => p.category === c)
/** Page address of a product, without the language prefix */
export const productPath = (p: Product) => `/products/${CAT_SLUG[p.category]}/${p.slug}`
export const categoryPath = (c: Category) => `/products/${CAT_SLUG[c]}`

export const RANGES = ['Plastic Wares', 'Crockery', 'Thermo Wares', 'Kitchen Wares', 'Non-Stick Cook Wares', 'Moulded Furniture', 'Home Appliances']
export const BRANDS = ['Nilkamal', 'National', 'Cello', 'Muraj', 'Sky', 'Supreme', 'Varmora', 'Royal', 'Radhey Gold', 'Seatex']

export const waLink = (message: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
