import type { T3 } from '../i18n'
import type { IconName } from '../components/Icon'

type A3 = readonly [string[], string[], string[]]
export interface Dept {
  slug: string
  key: string            // used as the item key in "My list"
  icon: IconName
  name: T3
  title: T3
  desc: T3
  intro: T3
  items: A3              // what customers usually ask for in this department
  searches: A3
}

export const DEPTS: Dept[] = [
  {
    slug: 'plastic-wares', key: 'Plastic Wares', icon: 'bucket',
    name: ['Plastic Wares', 'प्लास्टिक वेयर', 'પ્લાસ્ટિક વેર'],
    title: ['Plastic Wares in Bopal, Ahmedabad: Buckets, Containers, Dustbins | Patel Selection', 'बोपल, अहमदाबाद में प्लास्टिक वेयर: बाल्टी, कंटेनर, डस्टबिन | पटेल सेलेक्शन', 'બોપલ, અમદાવાદમાં પ્લાસ્ટિક વેર: ડોલ, કન્ટેનર, ડસ્ટબિન | પટેલ સિલેક્શન'],
    desc: ['Everyday plastic wares at Patel Selection, Ambli-Bopal Road, Ahmedabad: buckets, mugs, tubs, storage containers, baskets and dustbins. Call 97125 92905 to ask for today’s rate.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में रोज़ के प्लास्टिक वेयर: बाल्टी, मग, टब, स्टोरेज कंटेनर, टोकरी और डस्टबिन। आज का रेट पूछने के लिए 97125 92905 पर कॉल करें।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં રોજિંદા પ્લાસ્ટિક વેર: ડોલ, મગ, ટબ, સ્ટોરેજ કન્ટેનર, ટોપલી અને ડસ્ટબિન. આજનો ભાવ પૂછવા 97125 92905 પર કૉલ કરો.'],
    intro: ['Plastic wares are the quiet workhorses of every home: the bucket in the bathroom, the container in the kitchen, the dustbin by the door. Patel Selection has been supplying households and shops with plastic wares for over 25 years. Tell us what you need and we confirm what is in stock and the best rate.', 'प्लास्टिक वेयर हर घर के चुपचाप काम करने वाले साथी हैं: बाथरूम की बाल्टी, रसोई का कंटेनर, दरवाज़े के पास का डस्टबिन। पटेल सेलेक्शन 25 साल से ज्यादा समय से घरों और दुकानों को प्लास्टिक वेयर दे रहा है। जो चाहिए बताएं, हम स्टॉक और सबसे अच्छा रेट बताएंगे।', 'પ્લાસ્ટિક વેર દરેક ઘરના શાંતિથી કામ કરતા સાથી છે: બાથરૂમની ડોલ, રસોડાનું કન્ટેનર, દરવાજા પાસેનું ડસ્ટબિન. પટેલ સિલેક્શન 25 વર્ષથી વધુ સમયથી ઘરો અને દુકાનોને પ્લાસ્ટિક વેર આપે છે. જે જોઈએ તે જણાવો, અમે સ્ટોક અને શ્રેષ્ઠ ભાવ જણાવીશું.'],
    items: [['Buckets and mugs', 'Tubs and basins', 'Storage containers', 'Baskets and trays', 'Dustbins', 'Water jugs and bottles'], ['बाल्टी और मग', 'टब और बेसिन', 'स्टोरेज कंटेनर', 'टोकरी और ट्रे', 'डस्टबिन', 'पानी के जग और बोतल'], ['ડોલ અને મગ', 'ટબ અને બેસિન', 'સ્ટોરેજ કન્ટેનર', 'ટોપલી અને ટ્રે', 'ડસ્ટબિન', 'પાણીના જગ અને બોટલ']],
    searches: [['plastic items shop Bopal', 'plastic bucket price', 'plastic storage container', 'plastic dustbin Ahmedabad', 'household plastic items'], ['प्लास्टिक का सामान बोपल', 'प्लास्टिक बाल्टी', 'प्लास्टिक डिब्बे', 'प्लास्टिक डस्टबिन अहमदाबाद', 'घरेलू प्लास्टिक सामान'], ['પ્લાસ્ટિકનો સામાન બોપલ', 'પ્લાસ્ટિક ડોલ', 'પ્લાસ્ટિક ડબ્બા', 'પ્લાસ્ટિક ડસ્ટબિન અમદાવાદ', 'ઘરેલુ પ્લાસ્ટિકનો સામાન']],
  },
  {
    slug: 'crockery', key: 'Crockery', icon: 'plate',
    name: ['Crockery', 'क्रॉकरी', 'ક્રોકરી'],
    title: ['Crockery in Bopal, Ahmedabad: Dinner Sets, Cups, Plates | Patel Selection', 'बोपल, अहमदाबाद में क्रॉकरी: डिनर सेट, कप, प्लेट | पटेल सेलेक्शन', 'બોપલ, અમદાવાદમાં ક્રોકરી: ડિનર સેટ, કપ, પ્લેટ | પટેલ સિલેક્શન'],
    desc: ['Crockery at Patel Selection, Ambli-Bopal Road, Ahmedabad: dinner sets, plates, bowls, cups and saucers, glasses and serving ware. Call 97125 92905.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में क्रॉकरी: डिनर सेट, प्लेट, कटोरी, कप-प्लेट, गिलास और सर्विंग वेयर। कॉल 97125 92905।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં ક્રોકરી: ડિનર સેટ, પ્લેટ, વાટકી, કપ-રકાબી, ગ્લાસ અને સર્વિંગ વેર. કૉલ 97125 92905.'],
    intro: ['Good crockery makes everyday meals feel special and makes gifting easy. Visit us on Ambli-Bopal Road or message us with what you are looking for, such as a dinner set for a new home or cups for guests, and we show you the options in stock.', 'अच्छी क्रॉकरी रोज़ के खाने को खास बना देती है और गिफ्ट देना आसान करती है। अंबली-बोपल रोड पर आएं या बताएं कि क्या चाहिए, जैसे नए घर के लिए डिनर सेट या मेहमानों के लिए कप, हम स्टॉक वाले विकल्प दिखाएंगे।', 'સારી ક્રોકરી રોજના જમવાને ખાસ બનાવે છે અને ભેટ આપવી સહેલી કરે છે. અંબલી-બોપલ રોડ પર આવો અથવા જણાવો કે શું જોઈએ છે, જેમ કે નવા ઘર માટે ડિનર સેટ કે મહેમાનો માટે કપ, અમે સ્ટોકના વિકલ્પો બતાવીશું.'],
    items: [['Dinner sets', 'Plates and bowls', 'Cups, mugs and saucers', 'Glasses and tumblers', 'Serving bowls and trays', 'Gift sets'], ['डिनर सेट', 'प्लेट और कटोरी', 'कप, मग और प्लेट', 'गिलास और टम्बलर', 'सर्विंग बाउल और ट्रे', 'गिफ्ट सेट'], ['ડિનર સેટ', 'પ્લેટ અને વાટકી', 'કપ, મગ અને રકાબી', 'ગ્લાસ અને ટમ્બલર', 'સર્વિંગ બાઉલ અને ટ્રે', 'ગિફ્ટ સેટ']],
    searches: [['crockery shop Bopal Ahmedabad', 'dinner set price', 'crockery shop near me', 'cup and saucer set', 'crockery for gifting'], ['क्रॉकरी की दुकान बोपल', 'डिनर सेट का रेट', 'क्रॉकरी शॉप पास में', 'कप प्लेट सेट', 'गिफ्ट के लिए क्रॉकरी'], ['ક્રોકરીની દુકાન બોપલ', 'ડિનર સેટનો ભાવ', 'નજીકમાં ક્રોકરી શોપ', 'કપ રકાબી સેટ', 'ભેટ માટે ક્રોકરી']],
  },
  {
    slug: 'thermo-wares', key: 'Thermo Wares', icon: 'flask',
    name: ['Thermo Wares', 'थर्मो वेयर', 'થર્મો વેર'],
    title: ['Thermo Wares in Bopal, Ahmedabad: Flasks, Casseroles, Bottles | Patel Selection', 'बोपल, अहमदाबाद में थर्मो वेयर: फ्लास्क, कैसरोल, बोतल | पटेल सेलेक्शन', 'બોપલ, અમદાવાદમાં થર્મો વેર: ફ્લાસ્ક, કેસરોલ, બોટલ | પટેલ સિલેક્શન'],
    desc: ['Thermo wares at Patel Selection, Ambli-Bopal Road, Ahmedabad: insulated flasks, bottles, casseroles and hot-pots that keep food and drinks hot or cold. Call 97125 92905.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में थर्मो वेयर: इंसुलेटेड फ्लास्क, बोतल, कैसरोल और हॉट-पॉट जो खाना और पेय गर्म या ठंडा रखते हैं। कॉल 97125 92905।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં થર્મો વેર: ઇન્સ્યુલેટેડ ફ્લાસ્ક, બોટલ, કેસરોલ અને હૉટ-પૉટ જે ખાવા-પીવાનું ગરમ કે ઠંડું રાખે છે. કૉલ 97125 92905.'],
    intro: ['Thermo wares keep rotis soft, tea hot and water cold for hours, which is why they are in every Indian kitchen and office bag. Ask us for flasks, bottles and casseroles and we show you the sizes and makes in stock today.', 'थर्मो वेयर रोटी को नरम, चाय को गर्म और पानी को घंटों ठंडा रखते हैं, इसीलिए ये हर भारतीय रसोई और ऑफिस बैग में मिलते हैं। फ्लास्क, बोतल और कैसरोल मांगें, हम आज स्टॉक में मौजूद साइज़ और कंपनियां दिखाएंगे।', 'થર્મો વેર રોટલી નરમ, ચા ગરમ અને પાણી કલાકો સુધી ઠંડું રાખે છે, એટલે જ તે દરેક ભારતીય રસોડા અને ઓફિસ બેગમાં મળે છે. ફ્લાસ્ક, બોટલ અને કેસરોલ માંગો, અમે આજે સ્ટોકમાં રહેલા સાઇઝ અને કંપનીઓ બતાવીશું.'],
    items: [['Insulated casseroles for rotis', 'Flasks for tea and coffee', 'Hot and cold water bottles', 'Lunch boxes and tiffins', 'Ice buckets'], ['रोटी के लिए इंसुलेटेड कैसरोल', 'चाय-कॉफी के लिए फ्लास्क', 'गर्म और ठंडे पानी की बोतल', 'लंच बॉक्स और टिफिन', 'आइस बकेट'], ['રોટલી માટે ઇન્સ્યુલેટેડ કેસરોલ', 'ચા-કૉફી માટે ફ્લાસ્ક', 'ગરમ અને ઠંડા પાણીની બોટલ', 'લંચ બૉક્સ અને ટિફિન', 'આઇસ બકેટ']],
    searches: [['thermoware shop Ahmedabad', 'casserole for roti', 'flask for tea', 'insulated water bottle', 'hot pot casserole price'], ['थर्मोवेयर दुकान अहमदाबाद', 'रोटी के लिए कैसरोल', 'चाय का फ्लास्क', 'इंसुलेटेड पानी की बोतल', 'हॉट पॉट कैसरोल का रेट'], ['થર્મોવેર દુકાન અમદાવાદ', 'રોટલી માટે કેસરોલ', 'ચાનો ફ્લાસ્ક', 'ઇન્સ્યુલેટેડ પાણીની બોટલ', 'હૉટ પૉટ કેસરોલનો ભાવ']],
  },
  {
    slug: 'kitchen-wares', key: 'Kitchen Wares', icon: 'pot',
    name: ['Kitchen Wares', 'किचन वेयर', 'કિચન વેર'],
    title: ['Kitchen Wares in Bopal, Ahmedabad: Containers, Tiffins, Tools | Patel Selection', 'बोपल, अहमदाबाद में किचन वेयर: कंटेनर, टिफिन, किचन टूल्स | पटेल सेलेक्शन', 'બોપલ, અમદાવાદમાં કિચન વેર: કન્ટેનર, ટિફિન, કિચન ટૂલ્સ | પટેલ સિલેક્શન'],
    desc: ['Kitchen wares at Patel Selection, Ambli-Bopal Road, Ahmedabad: storage containers, tiffins, utensils, racks and everyday kitchen tools. Call 97125 92905.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में किचन वेयर: स्टोरेज कंटेनर, टिफिन, बर्तन, रैक और रोज़ के किचन टूल्स। कॉल 97125 92905।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં કિચન વેર: સ્ટોરેજ કન્ટેનર, ટિફિન, વાસણ, રેક અને રોજિંદા કિચન ટૂલ્સ. કૉલ 97125 92905.'],
    intro: ['A tidy, well-stocked kitchen saves time every day. Patel Selection has kitchen wares for storing, serving and cooking prep, from airtight containers to tiffins and utensils. Send us a list and we tell you what is available and the rate.', 'व्यवस्थित और पूरी तरह तैयार रसोई रोज़ समय बचाती है। पटेल सेलेक्शन में स्टोर करने, परोसने और खाना बनाने की तैयारी के किचन वेयर हैं, एयरटाइट कंटेनर से लेकर टिफिन और बर्तन तक। अपनी लिस्ट भेजें, हम उपलब्धता और रेट बताएंगे।', 'વ્યવસ્થિત અને પૂરેપૂરું તૈયાર રસોડું રોજ સમય બચાવે છે. પટેલ સિલેક્શનમાં સંગ્રહ, પીરસવા અને રસોઈની તૈયારી માટેના કિચન વેર છે, એરટાઇટ કન્ટેનરથી લઈને ટિફિન અને વાસણ સુધી. તમારી લિસ્ટ મોકલો, અમે ઉપલબ્ધતા અને ભાવ જણાવીશું.'],
    items: [['Airtight storage containers', 'Tiffins and lunch boxes', 'Spice boxes and racks', 'Serving and mixing bowls', 'Kitchen tools and organisers'], ['एयरटाइट स्टोरेज कंटेनर', 'टिफिन और लंच बॉक्स', 'मसाला डिब्बे और रैक', 'सर्विंग और मिक्सिंग बाउल', 'किचन टूल्स और ऑर्गनाइज़र'], ['એરટાઇટ સ્ટોરેજ કન્ટેનર', 'ટિફિન અને લંચ બૉક્સ', 'મસાલા ડબ્બા અને રેક', 'સર્વિંગ અને મિક્સિંગ બાઉલ', 'કિચન ટૂલ્સ અને ઓર્ગેનાઇઝર']],
    searches: [['kitchenware shop Bopal', 'kitchen items near me', 'airtight container price', 'tiffin box shop Ahmedabad', 'masala box'], ['किचन वेयर शॉप बोपल', 'रसोई का सामान पास में', 'एयरटाइट डिब्बे का रेट', 'टिफिन बॉक्स दुकान अहमदाबाद', 'मसाला डिब्बा'], ['કિચન વેર શૉપ બોપલ', 'રસોડાનો સામાન નજીકમાં', 'એરટાઇટ ડબ્બાનો ભાવ', 'ટિફિન બૉક્સ દુકાન અમદાવાદ', 'મસાલા ડબ્બો']],
  },
  {
    slug: 'non-stick-cook-wares', key: 'Non-Stick Cook Wares', icon: 'pan',
    name: ['Non-Stick Cook Wares', 'नॉन-स्टिक कुकवेयर', 'નોન-સ્ટિક કુકવેર'],
    title: ['Non-Stick Cookware in Bopal, Ahmedabad: Tawa, Kadhai, Pans | Patel Selection', 'बोपल, अहमदाबाद में नॉन-स्टिक कुकवेयर: तवा, कढ़ाई, पैन | पटेल सेलेक्शन', 'બોપલ, અમદાવાદમાં નોન-સ્ટિક કુકવેર: તવો, કડાઈ, પૅન | પટેલ સિલેક્શન'],
    desc: ['Non-stick cook wares at Patel Selection, Ambli-Bopal Road, Ahmedabad: tawa, kadhai, frying pans and cook sets for low-oil cooking. Call 97125 92905.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में नॉन-स्टिक कुकवेयर: तवा, कढ़ाई, फ्राइंग पैन और कुक सेट, कम तेल की कुकिंग के लिए। कॉल 97125 92905।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં નોન-સ્ટિક કુકવેર: તવો, કડાઈ, ફ્રાઇંગ પૅન અને કુક સેટ, ઓછા તેલની રસોઈ માટે. કૉલ 97125 92905.'],
    intro: ['Non-stick cookware means less oil, less sticking and faster cleaning. Whether you need a single tawa for rotis or a full cook set for a new kitchen, ask us and we show what is in stock with the best rate.', 'नॉन-स्टिक कुकवेयर यानी कम तेल, कम चिपकना और जल्दी सफाई। चाहे रोटी के लिए एक तवा चाहिए या नई रसोई के लिए पूरा कुक सेट, हमसे पूछें, हम स्टॉक और सबसे अच्छा रेट बताएंगे।', 'નોન-સ્ટિક કુકવેર એટલે ઓછું તેલ, ઓછું ચોંટવું અને ઝડપી સફાઈ. રોટલી માટે એક તવો જોઈએ કે નવા રસોડા માટે આખો કુક સેટ, અમને પૂછો, અમે સ્ટોક અને શ્રેષ્ઠ ભાવ જણાવીશું.'],
    items: [['Tawa and dosa tawa', 'Kadhai and wok', 'Frying and grill pans', 'Cook sets', 'Appam patra and mini pans'], ['तवा और डोसा तवा', 'कढ़ाई और वोक', 'फ्राइंग और ग्रिल पैन', 'कुक सेट', 'अप्पम पात्र और मिनी पैन'], ['તવો અને ઢોસા તવો', 'કડાઈ અને વૉક', 'ફ્રાઇંગ અને ગ્રિલ પૅન', 'કુક સેટ', 'અપ્પમ પાત્ર અને મિની પૅન']],
    searches: [['non stick tawa price', 'non stick cookware set Ahmedabad', 'non stick kadhai', 'cookware shop Bopal', 'frying pan near me'], ['नॉन स्टिक तवा का रेट', 'नॉन स्टिक कुकवेयर सेट अहमदाबाद', 'नॉन स्टिक कढ़ाई', 'कुकवेयर शॉप बोपल', 'फ्राइंग पैन पास में'], ['નોન સ્ટિક તવાનો ભાવ', 'નોન સ્ટિક કુકવેર સેટ અમદાવાદ', 'નોન સ્ટિક કડાઈ', 'કુકવેર શૉપ બોપલ', 'ફ્રાઇંગ પૅન નજીકમાં']],
  },
  {
    slug: 'moulded-furniture', key: 'Moulded Furniture', icon: 'sofa',
    name: ['Moulded Furniture', 'मोल्डेड फर्नीचर', 'મોલ્ડેડ ફર્નિચર'],
    title: ['Moulded Plastic Furniture in Bopal, Ahmedabad | Patel Selection', 'बोपल, अहमदाबाद में मोल्डेड प्लास्टिक फर्नीचर | पटेल सेलेक्शन', 'બોપલ, અમદાવાદમાં મોલ્ડેડ પ્લાસ્ટિક ફર્નિચર | પટેલ સિલેક્શન'],
    desc: ['Moulded plastic furniture at Patel Selection, Ambli-Bopal Road, Ahmedabad: chairs, dining tables, center tables, cabinets, shoe racks and stools from Nilkamal, National, Cello, Muraj and Sky.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में मोल्डेड प्लास्टिक फर्नीचर: निलकमल, नेशनल, सेलो, मुराज और स्काई की कुर्सियां, डाइनिंग टेबल, सेंटर टेबल, कैबिनेट, शू रैक और स्टूल।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં મોલ્ડેડ પ્લાસ્ટિક ફર્નિચર: નીલકમલ, નેશનલ, સેલો, મુરાજ અને સ્કાયની ખુરશી, ડાઇનિંગ ટેબલ, સેન્ટર ટેબલ, કેબિનેટ, શૂ રેક અને સ્ટૂલ.'],
    intro: ['Moulded furniture is made in one pressed shape from strong plastic, so it is light, rust-free and easy to clean. It is our biggest range, and every product has its own page with photos and details. Pick a type below.', 'मोल्डेड फर्नीचर मजबूत प्लास्टिक से एक ही सांचे में बनता है, इसलिए हल्का, जंग-रहित और साफ करने में आसान होता है। यह हमारी सबसे बड़ी रेंज है और हर प्रोडक्ट का अपना पेज है जिसमें फोटो और विवरण हैं। नीचे से प्रकार चुनें।', 'મોલ્ડેડ ફર્નિચર મજબૂત પ્લાસ્ટિકમાંથી એક જ સાંચામાં બને છે, એટલે હલકું, કાટ વિનાનું અને સાફ કરવામાં સહેલું હોય છે. આ અમારી સૌથી મોટી રેન્જ છે અને દરેક પ્રોડક્ટનું પોતાનું પેજ છે જેમાં ફોટા અને વિગત છે. નીચેથી પ્રકાર પસંદ કરો.'],
    items: [['Plastic chairs and armchairs', 'Dining tables', 'Center tables and trolleys', 'Storage cabinets', 'Shoe racks', 'Step stools'], ['प्लास्टिक कुर्सियां और आर्मचेयर', 'डाइनिंग टेबल', 'सेंटर टेबल और ट्रॉली', 'स्टोरेज कैबिनेट', 'शू रैक', 'स्टेप स्टूल'], ['પ્લાસ્ટિક ખુરશી અને આર્મચેર', 'ડાઇનિંગ ટેબલ', 'સેન્ટર ટેબલ અને ટ્રોલી', 'સ્ટોરેજ કેબિનેટ', 'શૂ રેક', 'સ્ટેપ સ્ટૂલ']],
    searches: [['moulded furniture Ahmedabad', 'plastic furniture shop Bopal', 'plastic furniture near me', 'Nilkamal furniture dealer Ahmedabad', 'plastic furniture price'], ['मोल्डेड फर्नीचर अहमदाबाद', 'प्लास्टिक फर्नीचर दुकान बोपल', 'प्लास्टिक फर्नीचर पास में', 'निलकमल फर्नीचर डीलर अहमदाबाद', 'प्लास्टिक फर्नीचर का रेट'], ['મોલ્ડેડ ફર્નિચર અમદાવાદ', 'પ્લાસ્ટિક ફર્નિચર દુકાન બોપલ', 'પ્લાસ્ટિક ફર્નિચર નજીકમાં', 'નીલકમલ ફર્નિચર ડીલર અમદાવાદ', 'પ્લાસ્ટિક ફર્નિચરનો ભાવ']],
  },
  {
    slug: 'home-appliances', key: 'Home Appliances', icon: 'plug',
    name: ['Home Appliances', 'होम अप्लायंस', 'હોમ એપ્લાયન્સ'],
    title: ['Home Appliances in Bopal, Ahmedabad | Patel Selection', 'बोपल, अहमदाबाद में होम अप्लायंस | पटेल सेलेक्शन', 'બોપલ, અમદાવાદમાં હોમ એપ્લાયન્સ | પટેલ સિલેક્શન'],
    desc: ['Home appliances at Patel Selection, Ambli-Bopal Road, Ahmedabad. Tell us what you need and we confirm what is in stock and the best rate. Call 97125 92905.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में होम अप्लायंस। जो चाहिए बताएं, हम स्टॉक और सबसे अच्छा रेट बताएंगे। कॉल 97125 92905।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં હોમ એપ્લાયન્સ. જે જોઈએ તે જણાવો, અમે સ્ટોક અને શ્રેષ્ઠ ભાવ જણાવીશું. કૉલ 97125 92905.'],
    intro: ['From the kitchen to the living room, small home appliances make daily work easier. Our appliance stock changes, so the quickest way is to message us the item you want, ideally with a photo, and we confirm the model, warranty and the best rate.', 'रसोई से लिविंग रूम तक, छोटे होम अप्लायंस रोज़ का काम आसान करते हैं। हमारा अप्लायंस स्टॉक बदलता रहता है, इसलिए सबसे तेज़ तरीका है कि चाहिए वाला आइटम, हो सके तो फोटो के साथ, मैसेज करें; हम मॉडल, वारंटी और सबसे अच्छा रेट बताएंगे।', 'રસોડાથી લિવિંગ રૂમ સુધી, નાના હોમ એપ્લાયન્સ રોજનું કામ સહેલું કરે છે. અમારો એપ્લાયન્સ સ્ટોક બદલાતો રહે છે, એટલે સૌથી ઝડપી રીત છે કે જોઈતી વસ્તુ, બને તો ફોટા સાથે, મેસેજ કરો; અમે મોડલ, વૉરંટી અને શ્રેષ્ઠ ભાવ જણાવીશું.'],
    items: [['Kitchen appliances', 'Cooking and heating', 'Cooling and air movement', 'Small personal appliances', 'Ask us for a specific model'], ['किचन अप्लायंस', 'कुकिंग और हीटिंग', 'ठंडक और हवा', 'छोटे पर्सनल अप्लायंस', 'किसी खास मॉडल के लिए हमसे पूछें'], ['કિચન એપ્લાયન્સ', 'કુકિંગ અને હીટિંગ', 'ઠંડક અને હવા', 'નાના પર્સનલ એપ્લાયન્સ', 'કોઈ ખાસ મોડલ માટે અમને પૂછો']],
    searches: [['home appliances shop Bopal', 'kitchen appliances Ahmedabad', 'appliance dealer near me', 'small appliances price'], ['होम अप्लायंस शॉप बोपल', 'किचन अप्लायंस अहमदाबाद', 'अप्लायंस डीलर पास में', 'छोटे अप्लायंस का रेट'], ['હોમ એપ્લાયન્સ શૉપ બોપલ', 'કિચન એપ્લાયન્સ અમદાવાદ', 'એપ્લાયન્સ ડીલર નજીકમાં', 'નાના એપ્લાયન્સનો ભાવ']],
  },
]
export const deptBySlug = (s: string) => DEPTS.find(d => d.slug === s)
