import { createContext, useContext } from 'react'

export const LANGS = ['en', 'hi', 'gu'] as const
export type Lang = (typeof LANGS)[number]
/** Text in three languages, always in the order English, Hindi, Gujarati */
export type T3 = readonly [string, string, string]
export const pick = (t: T3, l: Lang) => t[LANGS.indexOf(l)]

export const LANG_META: Record<Lang, { name: string; short: string; html: string; hreflang: string; og: string }> = {
  en: { name: 'English', short: 'EN', html: 'en-IN', hreflang: 'en-IN', og: 'en_IN' },
  hi: { name: 'हिन्दी', short: 'हिं', html: 'hi-IN', hreflang: 'hi-IN', og: 'hi_IN' },
  gu: { name: 'ગુજરાતી', short: 'ગુ', html: 'gu-IN', hreflang: 'gu-IN', og: 'gu_IN' },
}

export const LangCtx = createContext<Lang>('en')
export const useLang = () => useContext(LangCtx)

/** "/products" in English, "/hi/products" in Hindi, "/gu/products" in Gujarati */
export const langPath = (lang: Lang, path: string) => {
  const p = path === '/' ? '' : path
  return lang === 'en' ? (p || '/') : `/${lang}${p}`
}
/** Split "/hi/products/chairs" into { lang:'hi', path:'/products/chairs' } */
export function splitLang(pathname: string): { lang: Lang; path: string } {
  const m = pathname.match(/^\/(hi|gu)(\/.*)?$/)
  if (m) return { lang: m[1] as Lang, path: m[2] || '/' }
  return { lang: 'en', path: pathname || '/' }
}

const UI = {
  home: ['Home', 'होम', 'હોમ'],
  products: ['Products', 'प्रोडक्ट्स', 'પ્રોડક્ટ્સ'],
  departments: ['Departments', 'विभाग', 'વિભાગો'],
  myList: ['My list', 'मेरी लिस्ट', 'મારી લિસ્ટ'],
  about: ['About us', 'हमारे बारे में', 'અમારા વિશે'],
  sendPhoto: ['Send a photo', 'फोटो भेजें', 'ફોટો મોકલો'],
  visit: ['Visit us', 'हमसे मिलें', 'અમને મળો'],
  areas: ['Areas we serve', 'सेवा क्षेत्र', 'સેવા વિસ્તારો'],
  callNow: ['Call now', 'अभी कॉल करें', 'હમણાં કૉલ કરો'],
  call: ['Call', 'कॉल', 'કૉલ'],
  whatsapp: ['WhatsApp', 'व्हाट्सऐप', 'વોટ્સએપ'],
  menu: ['Menu', 'मेनू', 'મેનુ'],
  close: ['Close', 'बंद करें', 'બંધ કરો'],
  language: ['Language', 'भाषा', 'ભાષા'],
  skip: ['Skip to content', 'सीधे कंटेंट पर जाएं', 'સીધા કન્ટેન્ટ પર જાઓ'],
  breadcrumb: ['Breadcrumb', 'ब्रेडक्रम्ब', 'બ્રેડક્રમ્બ'],

  // list / enquiry
  addToList: ['Add to my list', 'लिस्ट में जोड़ें', 'લિસ્ટમાં ઉમેરો'],
  add: ['Add', 'जोड़ें', 'ઉમેરો'],
  inList: ['In your list', 'आपकी लिस्ट में है', 'તમારી લિસ્ટમાં છે'],
  removeItem: ['Remove', 'हटाएं', 'કાઢી નાખો'],
  less: ['Less', 'कम', 'ઓછું'],
  more: ['More', 'ज्यादा', 'વધુ'],
  addedToast: ['Added to your list', 'लिस्ट में जुड़ गया', 'લિસ્ટમાં ઉમેરાઈ ગયું'],
  viewList: ['View list', 'लिस्ट देखें', 'લિસ્ટ જુઓ'],
  listEmptyTitle: ['Your list is empty', 'आपकी लिस्ट खाली है', 'તમારી લિસ્ટ ખાલી છે'],
  listEmptyText: ['Tap “Add” on any product. When you are done, send the whole list to us on WhatsApp and we reply with today’s best rates.', 'किसी भी प्रोडक्ट पर “जोड़ें” दबाएं। फिर पूरी लिस्ट हमें व्हाट्सऐप पर भेजें, हम आज का सबसे अच्छा रेट बताएंगे।', 'કોઈ પણ પ્રોડક્ટ પર “ઉમેરો” દબાવો. પછી આખી લિસ્ટ અમને વોટ્સએપ પર મોકલો, અમે આજનો શ્રેષ્ઠ ભાવ જણાવીશું.'],
  listStep1: ['Check your items', 'अपने आइटम देखें', 'તમારી વસ્તુઓ તપાસો'],
  listStep2: ['Add your name (optional)', 'अपना नाम लिखें (वैकल्पिक)', 'તમારું નામ લખો (વૈકલ્પિક)'],
  listStep3: ['Send on WhatsApp', 'व्हाट्सऐप पर भेजें', 'વોટ્સએપ પર મોકલો'],
  yourName: ['Your name', 'आपका नाम', 'તમારું નામ'],
  yourArea: ['Delivery area (optional)', 'डिलीवरी का इलाका (वैकल्पिक)', 'ડિલિવરી વિસ્તાર (વૈકલ્પિક)'],
  sendList: ['Send list on WhatsApp', 'लिस्ट व्हाट्सऐप पर भेजें', 'લિસ્ટ વોટ્સએપ પર મોકલો'],
  clearAll: ['Clear all', 'सब हटाएं', 'બધું કાઢો'],
  itemsCount: ['items', 'आइटम', 'વસ્તુઓ'],
  addMoreProducts: ['Add more products', 'और प्रोडक्ट जोड़ें', 'વધુ પ્રોડક્ટ ઉમેરો'],
  otherDepartments: ['Other departments (tap to add)', 'अन्य विभाग (जोड़ने के लिए दबाएं)', 'અન્ય વિભાગો (ઉમેરવા દબાવો)'],
  freeDelivOk: ['Free delivery unlocked for your chairs', 'आपकी कुर्सियों पर फ्री डिलीवरी मिलेगी', 'તમારી ખુરશીઓ પર ફ્રી ડિલિવરી મળશે'],
  freeDelivMore: ['Add {n} more chair(s) for free delivery', 'फ्री डिलीवरी के लिए {n} कुर्सी और जोड़ें', 'ફ્રી ડિલિવરી માટે {n} ખુરશી વધુ ઉમેરો'],
  listNote: ['Each product goes with its page link, so we see the exact photo and model.', 'हर प्रोडक्ट के साथ उसका पेज लिंक जाता है, जिससे हमें सही फोटो और मॉडल दिखता है।', 'દરેક પ્રોડક્ટ સાથે તેની પેજ લિંક જાય છે, જેથી અમને સાચો ફોટો અને મોડલ દેખાય.'],
  saveNote: ['Your list stays saved on this phone.', 'आपकी लिस्ट इसी फोन में सेव रहती है।', 'તમારી લિસ્ટ આ ફોનમાં સેવ રહે છે.'],
  waHello: ['Hello Patel Selection', 'नमस्ते पटेल सेलेक्शन', 'નમસ્તે પટેલ સિલેક્શન'],
  waIAm: ['I am {name}.', 'मैं {name} हूं।', 'હું {name} છું.'],
  waArea: ['Delivery area: {area}', 'डिलीवरी का इलाका: {area}', 'ડિલિવરી વિસ્તાર: {area}'],
  waShareRates: ['Please share the best rates for:', 'कृपया इनका सबसे अच्छा रेट बताएं:', 'કૃપા કરીને આનો શ્રેષ્ઠ ભાવ જણાવો:'],
  waRateOne: ['Please share today’s best rate for {name}.', 'कृपया {name} का आज का सबसे अच्छा रेट बताएं।', 'કૃપા કરીને {name} નો આજનો શ્રેષ્ઠ ભાવ જણાવો.'],
  waGeneral: ['Please share today’s best rates.', 'कृपया आज का सबसे अच्छा रेट बताएं।', 'કૃપા કરીને આજનો શ્રેષ્ઠ ભાવ જણાવો.'],
  waPhoto: ['I am sending a photo of the product I need.', 'मैं जो प्रोडक्ट चाहता/चाहती हूं उसकी फोटो भेज रहा/रही हूं।', 'મને જે પ્રોડક્ટ જોઈએ છે તેનો ફોટો મોકલું છું.'],
  askRate: ['Ask rate on WhatsApp', 'व्हाट्सऐप पर रेट पूछें', 'વોટ્સએપ પર ભાવ પૂછો'],
  askRateShort: ['Ask rate', 'रेट पूछें', 'ભાવ પૂછો'],
  department: ['Department', 'विभाग', 'વિભાગ'],

  // products
  listedPrice: ['Listed price', 'लिस्टेड कीमत', 'લિસ્ટેડ ભાવ'],
  priceNote: ['Listed rates can change. We confirm the final rate when you order.', 'लिस्टेड रेट बदल सकते हैं। ऑर्डर करते समय फाइनल रेट बताया जाता है।', 'લિસ્ટેડ ભાવ બદલાઈ શકે છે. ઓર્ડર વખતે ફાઇનલ ભાવ જણાવાય છે.'],
  rateOnRequest: ['Ask for today’s rate', 'आज का रेट पूछें', 'આજનો ભાવ પૂછો'],
  viewDetails: ['View details', 'डिटेल देखें', 'વિગત જુઓ'],
  allBrands: ['All brands', 'सभी ब्रांड', 'બધી બ્રાન્ડ'],
  sortBy: ['Sort', 'क्रम', 'ક્રમ'],
  sortFeatured: ['Featured', 'चुनिंदा', 'ખાસ'],
  sortLow: ['Price: low to high', 'कीमत: कम से ज्यादा', 'ભાવ: ઓછાથી વધુ'],
  sortHigh: ['Price: high to low', 'कीमत: ज्यादा से कम', 'ભાવ: વધુથી ઓછા'],
  modelsCount: ['{n} models', '{n} मॉडल', '{n} મોડલ'],
  showing: ['Showing {n} products', '{n} प्रोडक्ट दिख रहे हैं', '{n} પ્રોડક્ટ દેખાય છે'],
  searchPlaceholder: ['Search chairs, tables, cabinets or a brand…', 'कुर्सी, टेबल, कैबिनेट या ब्रांड खोजें…', 'ખુરશી, ટેબલ, કેબિનેટ કે બ્રાન્ડ શોધો…'],
  noResults: ['No product found. Send us a photo and we will arrange it.', 'कोई प्रोडक्ट नहीं मिला। हमें फोटो भेजें, हम मंगवा देंगे।', 'કોઈ પ્રોડક્ટ મળી નહીં. અમને ફોટો મોકલો, અમે મંગાવી આપીશું.'],
  aboutProduct: ['About this product', 'इस प्रोडक्ट के बारे में', 'આ પ્રોડક્ટ વિશે'],
  keyFeatures: ['Key features', 'मुख्य खूबियां', 'મુખ્ય ખાસિયતો'],
  specs: ['Details', 'विवरण', 'વિગતો'],
  whereUse: ['Where you can use it', 'कहां इस्तेमाल करें', 'ક્યાં વાપરી શકાય'],
  careTips: ['Care and cleaning', 'देखभाल और सफाई', 'સંભાળ અને સફાઈ'],
  whyBuy: ['Why buy from Patel Selection', 'पटेल सेलेक्शन से क्यों खरीदें', 'પટેલ સિલેક્શનમાંથી કેમ ખરીદવું'],
  related: ['More {cat} you may like', 'ये {cat} भी देखें', 'આ {cat} પણ જુઓ'],
  faqTitle: ['Questions customers ask us', 'ग्राहकों के सवाल', 'ગ્રાહકોના સવાલો'],
  alsoSearched: ['People also search for', 'लोग यह भी खोजते हैं', 'લોકો આ પણ શોધે છે'],
  buyingGuide: ['How to choose', 'कैसे चुनें', 'કેવી રીતે પસંદ કરવું'],
  allProductsIn: ['See all {cat}', '{cat}: सभी देखें', '{cat}: બધું જુઓ'],
  browseCats: ['Browse by product type', 'प्रोडक्ट के प्रकार से देखें', 'પ્રોડક્ટના પ્રકાર પ્રમાણે જુઓ'],
  brand: ['Brand', 'ब्रांड', 'બ્રાન્ડ'],
  type: ['Type', 'प्रकार', 'પ્રકાર'],
  material: ['Material', 'सामग्री', 'સામગ્રી'],
  dimensions: ['Size (mm)', 'साइज़ (मिमी)', 'સાઇઝ (મિમી)'],
  price: ['Price', 'कीमत', 'ભાવ'],
  colours: ['Colours', 'रंग', 'રંગો'],
  coloursVal: ['Several; ask what is in stock', 'कई रंग; स्टॉक पूछें', 'ઘણા રંગો; સ્ટોક પૂછો'],
  availability: ['Availability', 'उपलब्धता', 'ઉપલબ્ધતા'],
  availabilityVal: ['Ask on WhatsApp or call', 'व्हाट्सऐप या कॉल पर पूछें', 'વોટ્સએપ કે કૉલ પર પૂછો'],
  freeDeliveryChairs: ['Free delivery on 10 or more chairs', '10 या ज्यादा कुर्सियों पर फ्री डिलीवरी', '10 કે વધુ ખુરશી પર ફ્રી ડિલિવરી'],
  freeDeliveryDetail: ['For smaller orders a delivery charge applies and is confirmed when you order.', 'छोटे ऑर्डर पर डिलीवरी चार्ज लगता है, जो ऑर्डर के समय बता दिया जाता है।', 'નાના ઓર્ડર પર ડિલિવરી ચાર્જ લાગે છે, જે ઓર્ડર વખતે જણાવાય છે.'],

  // home
  seeAll: ['See all', 'सब देखें', 'બધું જુઓ'],
  popular: ['Popular products', 'लोकप्रिय प्रोडक्ट', 'લોકપ્રિય પ્રોડક્ટ'],
  whyUs: ['Why customers choose us', 'ग्राहक हमें क्यों चुनते हैं', 'ગ્રાહકો અમને કેમ પસંદ કરે છે'],
  trustedBrands: ['Brands we sell', 'हमारे ब्रांड', 'અમારી બ્રાન્ડ'],
  haveProduct: ['Have a product in mind?', 'कोई प्रोडक्ट पसंद है?', 'કોઈ પ્રોડક્ટ ગમી છે?'],
  bulkOrder: ['Ordering in bulk?', 'थोक में ऑर्डर करना है?', 'જથ્થામાં ઓર્ડર આપવો છે?'],
  years: ['years in Ahmedabad', 'साल अहमदाबाद में', 'વર્ષ અમદાવાદમાં'],
  ranges: ['product ranges', 'प्रोडक्ट रेंज', 'પ્રોડક્ટ રેન્જ'],
  brandsStat: ['leading brands', 'बड़े ब्रांड', 'મોટી બ્રાન્ડ'],
  replyStat: ['hours or less to reply', 'घंटे या कम में जवाब', 'કલાક કે ઓછામાં જવાબ'],
  howOrder: ['How to order', 'ऑर्डर कैसे करें', 'ઓર્ડર કેવી રીતે કરવો'],
  howOrder1: ['Choose products and tap “Add”.', 'प्रोडक्ट चुनें और “जोड़ें” दबाएं।', 'પ્રોડક્ટ પસંદ કરો અને “ઉમેરો” દબાવો.'],
  howOrder2: ['Open “My list” and send it on WhatsApp.', '“मेरी लिस्ट” खोलें और व्हाट्सऐप पर भेजें।', '“મારી લિસ્ટ” ખોલો અને વોટ્સએપ પર મોકલો.'],
  howOrder3: ['We reply with the best rate and delivery details.', 'हम सबसे अच्छा रेट और डिलीवरी की जानकारी बताएंगे।', 'અમે શ્રેષ્ઠ ભાવ અને ડિલિવરીની માહિતી જણાવીશું.'],

  // send a photo
  photoStep1: ['Take a clear photo of the product.', 'प्रोडक्ट की साफ फोटो लें।', 'પ્રોડક્ટનો સ્પષ્ટ ફોટો લો.'],
  photoStep2: ['Send it to us on WhatsApp.', 'हमें व्हाट्सऐप पर भेजें।', 'અમને વોટ્સએપ પર મોકલો.'],
  photoStep3: ['We confirm availability and the best rate.', 'हम उपलब्धता और सबसे अच्छा रेट बताएंगे।', 'અમે ઉપલબ્ધતા અને શ્રેષ્ઠ ભાવ જણાવીશું.'],
  choosePhoto: ['Choose a photo to send', 'भेजने के लिए फोटो चुनें', 'મોકલવા માટે ફોટો પસંદ કરો'],
  photoHelp: ['On most phones this opens WhatsApp with your photo ready to send. If it does not, open WhatsApp and attach the photo to our chat.', 'ज्यादातर फोन में यह आपकी फोटो के साथ व्हाट्सऐप खोल देगा। न खुले तो व्हाट्सऐप खोलकर हमारी चैट में फोटो अटैच करें।', 'મોટા ભાગના ફોનમાં આ તમારા ફોટા સાથે વોટ્સએપ ખોલશે. ન ખુલે તો વોટ્સએપ ખોલી અમારી ચેટમાં ફોટો જોડો.'],
  openWhatsApp: ['Open WhatsApp chat', 'व्हाट्सऐप चैट खोलें', 'વોટ્સએપ ચેટ ખોલો'],

  // visit
  address: ['Address', 'पता', 'સરનામું'],
  getDirections: ['Get directions', 'रास्ता देखें', 'રસ્તો જુઓ'],
  owner: ['Owner', 'मालिक', 'માલિક'],
  timings: ['Shop timings', 'दुकान का समय', 'દુકાનનો સમય'],
  timingsAsk: ['Please call before you visit to confirm timings.', 'आने से पहले कॉल करके समय पूछ लें।', 'આવતા પહેલાં કૉલ કરી સમય પૂછી લો.'],
  landmark: ['Opposite Tata Motors Show Room, near Mercedes Show Room', 'टाटा मोटर्स शोरूम के सामने, मर्सिडीज शोरूम के पास', 'ટાટા મોટર્સ શોરૂમ સામે, મર્સિડીઝ શોરૂમ પાસે'],
  mapTitle: ['Map showing Patel Selection on Ambli-Bopal Road, Ahmedabad', 'अंबली-बोपल रोड, अहमदाबाद पर पटेल सेलेक्शन का नक्शा', 'અંબલી-બોપલ રોડ, અમદાવાદ પર પટેલ સિલેક્શનનો નકશો'],

  // footer / misc
  footerAbout: ['Plastic wares, crockery, thermo wares, kitchen wares, non-stick cook wares, moulded furniture and home appliances in Bopal, Ahmedabad.', 'बोपल, अहमदाबाद में प्लास्टिक वेयर, क्रॉकरी, थर्मो वेयर, किचन वेयर, नॉन-स्टिक कुकवेयर, मोल्डेड फर्नीचर और होम अप्लायंस।', 'બોપલ, અમદાવાદમાં પ્લાસ્ટિક વેર, ક્રોકરી, થર્મો વેર, કિચન વેર, નોન-સ્ટિક કુકવેર, મોલ્ડેડ ફર્નિચર અને હોમ એપ્લાયન્સ.'],
  quickLinks: ['Quick links', 'मुख्य लिंक', 'મુખ્ય લિંક'],
  notFoundTitle: ['This page was not found', 'यह पेज नहीं मिला', 'આ પેજ મળ્યું નહીં'],
  notFoundText: ['The page may have moved. Try our products or call us.', 'पेज हट गया होगा। हमारे प्रोडक्ट देखें या कॉल करें।', 'પેજ ખસેડાયું હશે. અમારા પ્રોડક્ટ જુઓ અથવા કૉલ કરો.'],
  freeDeliveryBadge: ['Free delivery on 10+ chairs', '10+ कुर्सियों पर फ्री डिलीवरी', '10+ ખુરશી પર ફ્રી ડિલિવરી'],

  // 3D
  view3d: ['See it in 3D', '3D में देखें', '3D માં જુઓ'],
  viewPhoto: ['Photo', 'फोटो', 'ફોટો'],
  dragHint: ['Drag to turn · pinch or scroll to zoom', 'घुमाने के लिए खींचें · ज़ूम के लिए पिंच या स्क्रॉल करें', 'ફેરવવા ખેંચો · ઝૂમ માટે પિંચ કે સ્ક્રોલ કરો'],
  tryColour: ['Try a colour', 'रंग आज़माएं', 'રંગ અજમાવો'],
  autoSpin: ['Auto-spin', 'ऑटो-स्पिन', 'ઑટો-સ્પિન'],
  arBtn: ['See it in your room (AR)', 'अपने कमरे में देखें (AR)', 'તમારા રૂમમાં જુઓ (AR)'],
  arHelp: ['Point your phone at the floor, then tap to place it.', 'फोन को फर्श की तरफ करें, फिर रखने के लिए टैप करें।', 'ફોનને ફર્શ તરફ રાખો, પછી મૂકવા ટૅપ કરો.'],
  threeNote: ['The 3D view is an illustration of the product type. Real colours and exact design can differ, so check the photo.', '3D व्यू प्रोडक्ट के प्रकार का चित्रण है। असली रंग और डिज़ाइन अलग हो सकते हैं, इसलिए फोटो भी देखें।', '3D વ્યૂ પ્રોડક્ટના પ્રકારનું ચિત્ર છે. અસલી રંગ અને ડિઝાઇન અલગ હોઈ શકે, એટલે ફોટો પણ જુઓ.'],
  loading3d: ['Loading 3D…', '3D लोड हो रहा है…', '3D લોડ થઈ રહ્યું છે…'],
  no3d: ['3D is not available on this device. The photo shows the product.', 'इस डिवाइस पर 3D उपलब्ध नहीं है। फोटो में प्रोडक्ट देखें।', 'આ ડિવાઇસ પર 3D ઉપલબ્ધ નથી. ફોટામાં પ્રોડક્ટ જુઓ.'],
  showroomTitle: ['Spin our 3D showroom', 'हमारा 3D शोरूम घुमाएं', 'અમારો 3D શોરૂમ ફેરવો'],
  showroomHint: ['Drag to spin · tap the front item to open it', 'घुमाने के लिए खींचें · सामने वाले आइटम को खोलने के लिए टैप करें', 'ફેરવવા ખેંચો · આગળની વસ્તુ ખોલવા ટૅપ કરો'],
  openRange: ['Open {cat}', '{cat} खोलें', '{cat} ખોલો'],
  prev: ['Previous', 'पिछला', 'પાછળનું'],
  next: ['Next', 'अगला', 'આગળનું'],
  builderLink: ['Build your dining set', 'अपना डाइनिंग सेट बनाएं', 'તમારો ડાઇનિંગ સેટ બનાવો'],
  bShape: ['Table shape', 'टेबल का आकार', 'ટેબલનો આકાર'],
  bRound: ['Round', 'गोल', 'ગોળ'],
  bRect: ['Rectangular', 'आयताकार', 'લંબચોરસ'],
  bTable: ['Table model', 'टेबल मॉडल', 'ટેબલ મોડલ'],
  bChair: ['Chair model', 'कुर्सी मॉडल', 'ખુરશી મોડલ'],
  bCount: ['Number of chairs', 'कुर्सियों की संख्या', 'ખુરશીઓની સંખ્યા'],
  bChairCol: ['Chair colour (preview)', 'कुर्सी का रंग (प्रीव्यू)', 'ખુરશીનો રંગ (પ્રીવ્યૂ)'],
  bTableCol: ['Table colour (preview)', 'टेबल का रंग (प्रीव्यू)', 'ટેબલનો રંગ (પ્રીવ્યૂ)'],
  bAdd: ['Add this set to my list', 'यह सेट मेरी लिस्ट में जोड़ें', 'આ સેટ મારી લિસ્ટમાં ઉમેરો'],
  bSummary: ['Your set', 'आपका सेट', 'તમારો સેટ'],
  bTableLine: ['1 table', '1 टेबल', '1 ટેબલ'],
  bChairsLine: ['{n} chairs', '{n} कुर्सियां', '{n} ખુરશીઓ'],
  bTotal: ['Listed total', 'लिस्टेड कुल', 'લિસ્ટેડ કુલ'],
  bChairsAsk: ['chair rate on request', 'कुर्सी का रेट पूछें', 'ખુરશીનો ભાવ પૂછો'],
  bAdded: ['Set added to your list', 'सेट आपकी लिस्ट में जुड़ गया', 'સેટ તમારી લિસ્ટમાં ઉમેરાઈ ગયો'],
  bColourNote: ['Colours here are a preview. Tell us the colour you want when you send the list.', 'यहां के रंग सिर्फ प्रीव्यू हैं। लिस्ट भेजते समय अपना पसंदीदा रंग बताएं।', 'અહીંના રંગ ફક્ત પ્રીવ્યૂ છે. લિસ્ટ મોકલતી વખતે તમારો પસંદગીનો રંગ જણાવો.'],

  // live showroom + hero + stats
  liveBadge: ['LIVE SHOWROOM', 'लाइव शोरूम', 'લાઇવ શોરૂમ'],
  walkTitle: ['Walk through our showroom', 'हमारे शोरूम में घूमें', 'અમારા શોરૂમમાં ફરો'],
  walkSub: ['Pick a product, then a company. Tap any item on the shelf to see it on the stage.', 'पहले प्रोडक्ट, फिर कंपनी चुनें। शेल्फ पर किसी भी आइटम को दबाकर उसे स्टेज पर देखें।', 'પહેલા પ્રોડક્ટ, પછી કંપની પસંદ કરો. શેલ્ફ પરની કોઈ પણ વસ્તુ દબાવી તેને સ્ટેજ પર જુઓ.'],
  step1: ['Choose a product', 'प्रोडक्ट चुनें', 'પ્રોડક્ટ પસંદ કરો'],
  step2: ['Choose a company', 'कंपनी चुनें', 'કંપની પસંદ કરો'],
  liveTour: ['Live tour', 'लाइव टूर', 'લાઇવ ટૂર'],
  stopTour: ['Stop tour', 'टूर रोकें', 'ટૂર રોકો'],
  tiltHint: ['Move your finger or mouse over the photo to tilt it in 3D.', 'फोटो पर उंगली या माउस घुमाकर उसे 3D में झुकाएं।', 'ફોટા પર આંગળી કે માઉસ ફેરવી તેને 3D માં નમાવો.'],
  onShelf: ['{n} products on the shelf', '{n} प्रोडक्ट शेल्फ पर', '{n} પ્રોડક્ટ શેલ્ફ પર'],
  fullDetails: ['Full details', 'पूरी जानकारी', 'પૂરી માહિતી'],
  jumpTo: ['Jump to a product', 'सीधे प्रोडक्ट पर जाएं', 'સીધા પ્રોડક્ટ પર જાઓ'],
  heroHint: ['Move your mouse or finger near the furniture. Tap anywhere to make it fly.', 'माउस या उंगली को फर्नीचर के पास ले जाएं। कहीं भी टैप करें और उन्हें उड़ता देखें।', 'માઉસ કે આંગળી ફર્નિચર પાસે લઈ જાઓ. ક્યાંય પણ ટૅપ કરો અને તેમને ઊડતા જુઓ.'],
  scrollCue: ['Scroll', 'स्क्रॉल', 'સ્ક્રોલ'],
  badgeText: ['FREE DELIVERY ON 10+ CHAIRS ✦', '10+ कुर्सियों पर फ्री डिलीवरी ✦', '10+ ખુરશી પર ફ્રી ડિલિવરી ✦'],
  modelsOnline: ['models to browse online', 'मॉडल ऑनलाइन देखें', 'મોડલ ઓનલાઇન જુઓ'],
  deliveryStrip: ['Free delivery on 10 or more chairs, right to your door', '10 या ज्यादा कुर्सियों पर फ्री डिलीवरी, सीधे आपके दरवाज़े तक', '10 કે વધુ ખુરશી પર ફ્રી ડિલિવરી, સીધી તમારા દરવાજા સુધી'],
  founderLabel: ['Arvind Patel, owner', 'अरविंद पटेल, मालिक', 'અરવિંદ પટેલ, માલિક'],
} as const satisfies Record<string, T3>

export type UIKey = keyof typeof UI

/** Translate a UI string. Use {n}, {name}, {cat} placeholders with the second argument. */
export function useT() {
  const lang = useLang()
  return (key: UIKey, vars?: Record<string, string | number>) => tUI(lang, key, vars)
}
export function tUI(lang: Lang, key: UIKey, vars?: Record<string, string | number>) {
  let s = pick(UI[key], lang)
  if (vars) for (const k in vars) s = s.split(`{${k}}`).join(String(vars[k]))
  return s
}
