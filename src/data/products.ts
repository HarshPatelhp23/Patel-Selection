import { WA_NUMBER } from '../config'

export type ProductType = 'chair' | 'dining' | 'center' | 'cabinet' | 'shoe' | 'stool'
export type Category = 'Chairs' | 'Dining Tables' | 'Center Tables' | 'Cabinets' | 'Shoe Racks' | 'Step Stools'

export interface Product {
  slug: string // photo file name without extension, e.g. nilkamal-paradise
  category: Category
  type: ProductType
  brand: string
  name: string
  price?: number
}

export const CATEGORY_TYPE: Record<Category, ProductType> = {
  'Chairs': 'chair',
  'Dining Tables': 'dining',
  'Center Tables': 'center',
  'Cabinets': 'cabinet',
  'Shoe Racks': 'shoe',
  'Step Stools': 'stool',
}
export const CATEGORIES = Object.keys(CATEGORY_TYPE) as Category[]

/** Photo file name = brand + model, lowercase, words joined by "-" */
export const slugOf = (brand: string, name: string) =>
  `${brand} ${name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// ADD OR EDIT PRODUCTS HERE: [brand, model name, price]. Leave the price out to show "Ask for rate".
const RAW: Record<Category, Array<[string, string, number?]>> = {
  'Chairs': [
    ['Nilkamal', 'CHR2061'], ['Nilkamal', 'Paradise'], ['Nilkamal', 'Mystique'],
    ['National', 'Delhi Model'], ['National', 'Puna Unbreakable'], ['National', 'Spinnex'],
    ['National', 'Bentley (Relax Chair)'], ['National', 'Polo Baby Chair', 595],
    ['Cello', 'Unique'], ['Cello', 'Ultra Mac'], ['Cello', 'Comfort Easy'], ['Cello', 'Mayor (Very Premium)'],
    ['Muraj', 'Creata'], ['Muraj', 'Swift'], ['Muraj', 'Breazza'],
    ['Sky', 'Titan'], ['Sky', 'Cushion'], ['Sky', 'Spine Chair'], ['Sky', 'Megna'], ['Sky', 'Texas'],
    ['Radhey Gold', 'Club Chair',1699]
  ],
  'Dining Tables': [
    ['National', 'Jaipur Dining Table', 2599], ['National', 'Jaipur Roma Dining Table', 2899],
    ['National', 'Party Round Dining Table', 2499], ['National', 'Party Round Roma Dining Table', 2799],
    ['Nilkamal', 'Shahensha', 3199], ['Nilkamal', 'Shahensha Cross', 3599],
    ['Cello', 'Senator', 3099], ['Cello', 'Proline', 3499],
  ],
  'Center Tables': [
    ['National', 'Spectra', 1299], ['National', 'Rajkot', 1199], ['National', 'Elegant', 1899],
    ['Nilkamal', 'Breeze (Glass Top)', 3299], ['Nilkamal', 'Center Table 1 (With Glass)', 3999],
  ],
  'Cabinets': [
    ['National', 'Power Series, 4 Foot', 6399], ['National', 'Power Series, 2 Foot', 2499],
    ['Cello', 'Novelty, 2 Foot', 3499], ['Nilkamal', 'Freedom, 2 Foot', 3299],
  ],
  'Shoe Racks': [
    ['National', 'Power Small Shoe Rack', 3299], ['National', 'Power Big Shoe Rack', 6499],
  ],
  'Step Stools': [
    ['National', 'Sigma Step-In', 999], ['Nilkamal', 'Stool 21', 1499],
    ['Nilkamal', 'Stool 31', 1399], ['Seatex', 'Eiffel', 1349],
  ],
}

export const PRODUCTS: Product[] = CATEGORIES.flatMap(category =>
  RAW[category].map(([brand, name, price]) => ({
    slug: slugOf(brand, name), category, type: CATEGORY_TYPE[category], brand, name, price,
  })),
)

export const RANGES = ['Plastic Wares', 'Crockery', 'Thermo Wares', 'Kitchen Wares', 'Non-Stick Cook Wares', 'Moulded Furniture', 'Home Appliances']
export const BRANDS = ['Nilkamal', 'National', 'Cello', 'Muraj', 'Sky', 'Supreme', 'Varmora', 'Royal', 'Radhey Gold', 'Seatex']

export const waLink = (message: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
