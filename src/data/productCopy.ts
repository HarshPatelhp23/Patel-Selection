import { pick, type Lang, type T3 } from '../i18n'
import { CAT } from './categories'
import type { Kind, Product } from './products'

/** One or two sentences about the design, chosen by the product's "kind". */
const KIND: Record<Kind, T3> = {
  relax: ['It has a reclined, wide-slat relax-chair shape that lets you sit back comfortably, which is why it is popular for balconies, lawns and gardens.', 'इसकी झुकी हुई, चौड़ी स्लैट वाली रिलैक्स चेयर बनावट पीछे टिककर आराम से बैठने देती है, इसलिए यह बालकनी, लॉन और बगीचे में पसंद की जाती है।', 'તેનો પાછળ ઢળતો, પહોળી સ્લેટવાળો રિલેક્સ ચેરનો આકાર આરામથી પાછળ ટેકવીને બેસવા દે છે, એટલે તે બાલ્કની, લૉન અને બગીચામાં પસંદ થાય છે.'],
  weave: ['The back carries a woven, rattan-style pattern that looks richer than a plain plastic chair while staying as easy to wipe clean.', 'इसकी बैक पर वीव, रैटन जैसा पैटर्न है जो सादी प्लास्टिक कुर्सी से ज्यादा आकर्षक लगता है, फिर भी पोंछकर साफ करना उतना ही आसान है।', 'તેની બેક પર વીવ, રૅટન જેવી પૅટર્ન છે જે સાદી પ્લાસ્ટિક ખુરશી કરતાં વધુ આકર્ષક લાગે છે, છતાં લૂછીને સાફ કરવી એટલી જ સહેલી છે.'],
  slat: ['It is an armchair with a slatted back that lets air through, which keeps you cooler in warm Ahmedabad summers.', 'यह स्लैट वाली बैक की आर्मचेयर है, जिसमें से हवा आती-जाती है, इसलिए अहमदाबाद की गर्मियों में ज्यादा ठंडक रहती है।', 'આ સ્લેટવાળી બેકની આર્મચેર છે, જેમાંથી હવા આવ-જા કરે છે, એટલે અમદાવાદના ઉનાળામાં વધુ ઠંડક રહે છે.'],
  classic: ['It is a classic moulded armchair with a supportive back and armrests, a dependable all-round choice for the living room, shop or office.', 'यह सहारा देने वाली बैक और आर्मरेस्ट वाली क्लासिक मोल्डेड आर्मचेयर है, जो लिविंग रूम, दुकान या ऑफिस के लिए भरोसेमंद विकल्प है।', 'આ ટેકો આપતી બેક અને આર્મરેસ્ટવાળી ક્લાસિક મોલ્ડેડ આર્મચેર છે, જે લિવિંગ રૂમ, દુકાન કે ઓફિસ માટે ભરોસાપાત્ર વિકલ્પ છે.'],
  rect: ['It is a rectangular table that seats a family comfortably and gives you a wide, flat top for meals and homework.', 'यह आयताकार टेबल है जिस पर परिवार आराम से बैठ सकता है और खाने तथा होमवर्क के लिए चौड़ा समतल टॉप मिलता है।', 'આ લંબચોરસ ટેબલ છે જેના પર પરિવાર આરામથી બેસી શકે અને જમવા તથા હોમવર્ક માટે પહોળી સપાટ ટૉપ મળે.'],
  round: ['It is a round table, which saves floor space and lets everyone sit close, ideal for small and medium dining areas.', 'यह गोल टेबल है, जो फर्श की जगह बचाती है और सबको पास बैठने देती है, छोटे और मध्यम डाइनिंग एरिया के लिए सही।', 'આ ગોળ ટેબલ છે, જે ફર્શની જગ્યા બચાવે છે અને બધાને નજીક બેસવા દે છે, નાના અને મધ્યમ ડાઇનિંગ એરિયા માટે યોગ્ય.'],
  cross: ['It has cross-style legs that give the table a modern look and a firm stance.', 'इसके क्रॉस स्टाइल पैर टेबल को आधुनिक लुक और मजबूत पकड़ देते हैं।', 'તેના ક્રોસ સ્ટાઇલ પગ ટેબલને આધુનિક લુક અને મજબૂત પકડ આપે છે.'],
  trolley: ['It is a two-tier table on castor wheels, so it works as a center table and a tea trolley that rolls to the kitchen and back.', 'यह पहियों पर दो-मंज़िला टेबल है, इसलिए यह सेंटर टेबल और टी ट्रॉली दोनों का काम करती है और रसोई तक आसानी से जाती है।', 'આ પૈડાં પર બે-માળનું ટેબલ છે, એટલે તે સેન્ટર ટેબલ અને ટી ટ્રોલી બંનેનું કામ કરે છે અને રસોડા સુધી સરળતાથી જાય છે.'],
  shelf: ['It has a lower shelf under the top, handy for magazines, the remote or a tray, which keeps the living room tidy.', 'टॉप के नीचे एक शेल्फ है, जो पत्रिकाओं, रिमोट या ट्रे के काम आती है और लिविंग रूम को साफ रखती है।', 'ટૉપ નીચે એક શેલ્ફ છે, જે મેગેઝિન, રિમોટ કે ટ્રે માટે કામ લાગે છે અને લિવિંગ રૂમને વ્યવસ્થિત રાખે છે.'],
  glass: ['It pairs a moulded base with a glass top for a clean, modern look that still wipes down in seconds.', 'इसमें मोल्डेड बेस के साथ ग्लास टॉप है, जो साफ और आधुनिक लुक देता है और सेकंडों में पोंछा जा सकता है।', 'તેમાં મોલ્ડેડ બેઝ સાથે ગ્લાસ ટૉપ છે, જે સ્વચ્છ અને આધુનિક લુક આપે છે અને સેકન્ડોમાં લૂછી શકાય છે.'],
  cabinet: ['It is a two-door storage cabinet with shelves inside, a tidy home for utensils, shoes, clothes or tools.', 'यह अंदर शेल्फ वाली दो दरवाज़ों की स्टोरेज कैबिनेट है, जिसमें बर्तन, जूते, कपड़े या औज़ार सलीके से रखे जा सकते हैं।', 'આ અંદર શેલ્ફવાળી બે દરવાજાની સ્ટોરેજ કેબિનેટ છે, જેમાં વાસણ, બૂટ, કપડાં કે ઓજારો વ્યવસ્થિત રાખી શકાય.'],
  shoe: ['It is a closed shoe rack with doors, so shoes stay in order and dust stays out.', 'यह दरवाज़ों वाला बंद शू रैक है, जिसमें जूते क्रम में रहते हैं और धूल बाहर रहती है।', 'આ દરવાજાવાળો બંધ શૂ રેક છે, જેમાં બૂટ ક્રમમાં રહે છે અને ધૂળ બહાર રહે છે.'],
  step: ['It is a two-step stool with broad steps, built to help you reach high shelves safely.', 'यह चौड़ी सीढ़ियों वाला दो-स्टेप स्टूल है, जो ऊंची शेल्फ तक सुरक्षित पहुंचने में मदद करता है।', 'આ પહોળા પગથિયાંવાળું બે-સ્ટેપ સ્ટૂલ છે, જે ઊંચી શેલ્ફ સુધી સુરક્ષિત પહોંચવામાં મદદ કરે છે.'],
}

const BRAND: Record<string, T3> = {
  Nilkamal: ['Nilkamal is one of India’s best-known makers of moulded plastic furniture, with chairs, tables, cabinets and stools sold across the country.', 'निलकमल भारत की जानी-मानी मोल्डेड प्लास्टिक फर्नीचर कंपनियों में से एक है, जिसकी कुर्सियां, टेबल, कैबिनेट और स्टूल पूरे देश में बिकते हैं।', 'નીલકમલ ભારતની જાણીતી મોલ્ડેડ પ્લાસ્ટિક ફર્નિચર કંપનીઓમાંની એક છે, જેની ખુરશી, ટેબલ, કેબિનેટ અને સ્ટૂલ આખા દેશમાં વેચાય છે.'],
  National: ['National is a moulded furniture brand from National Plastic Industries Limited (its product pictures say “Since 1952”), making chairs, tables, cabinets and stools for every budget.', 'नेशनल, नेशनल प्लास्टिक इंडस्ट्रीज़ लिमिटेड का मोल्डेड फर्नीचर ब्रांड है (इसकी प्रोडक्ट फोटो में “Since 1952” लिखा है), जो हर बजट के लिए कुर्सियां, टेबल, कैबिनेट और स्टूल बनाता है।', 'નેશનલ એ નેશનલ પ્લાસ્ટિક ઇન્ડસ્ટ્રીઝ લિમિટેડની મોલ્ડેડ ફર્નિચર બ્રાન્ડ છે (તેના પ્રોડક્ટ ફોટામાં “Since 1952” લખેલું છે), જે દરેક બજેટ માટે ખુરશી, ટેબલ, કેબિનેટ અને સ્ટૂલ બનાવે છે.'],
  Cello: ['Cello is a widely known Indian household-products brand whose range includes moulded furniture such as chairs, tables and cabinets.', 'सेलो जानी-मानी भारतीय घरेलू उत्पाद कंपनी है, जिसकी रेंज में कुर्सी, टेबल और कैबिनेट जैसा मोल्डेड फर्नीचर भी शामिल है।', 'સેલો જાણીતી ભારતીય ઘરેલુ ઉત્પાદનોની કંપની છે, જેની રેન્જમાં ખુરશી, ટેબલ અને કેબિનેટ જેવું મોલ્ડેડ ફર્નિચર પણ સામેલ છે.'],
  Muraj: ['Muraj is a moulded plastic chair brand; we stock its slatted armchairs.', 'मुराज मोल्डेड प्लास्टिक कुर्सी का ब्रांड है; हमारे यहां इसकी स्लैटेड आर्मचेयर उपलब्ध हैं।', 'મુરાજ મોલ્ડેડ પ્લાસ્ટિક ખુરશીની બ્રાન્ડ છે; અમારી પાસે તેની સ્લેટેડ આર્મચેર ઉપલબ્ધ છે.'],
  Sky: ['Sky is a moulded plastic chair brand; we stock a range of its armchairs in slatted and woven-back designs.', 'स्काई मोल्डेड प्लास्टिक कुर्सी का ब्रांड है; हमारे यहां इसकी स्लैट और वीव बैक वाली कई आर्मचेयर उपलब्ध हैं।', 'સ્કાય મોલ્ડેડ પ્લાસ્ટિક ખુરશીની બ્રાન્ડ છે; અમારી પાસે તેની સ્લેટ અને વીવ બેકવાળી ઘણી આર્મચેર ઉપલબ્ધ છે.'],
  'Radhey Gold': ['Radhey Gold is a plastic chair brand; we stock its club chair in a woven-back style.', 'राधे गोल्ड प्लास्टिक कुर्सी का ब्रांड है; हमारे यहां इसकी वीव बैक स्टाइल क्लब चेयर उपलब्ध है।', 'રાધે ગોલ્ડ પ્લાસ્ટિક ખુરશીની બ્રાન્ડ છે; અમારી પાસે તેની વીવ બેક સ્ટાઇલ ક્લબ ચેર ઉપલબ્ધ છે.'],
  Seatex: ['Seatex is a plastic furniture brand; we stock its Eiffel step stool.', 'सीटेक्स प्लास्टिक फर्नीचर ब्रांड है; हमारे यहां इसका एफिल स्टेप स्टूल उपलब्ध है।', 'સીટેક્સ પ્લાસ્ટિક ફર્નિચર બ્રાન્ડ છે; અમારી પાસે તેનું એફિલ સ્ટેપ સ્ટૂલ ઉપલબ્ધ છે.'],
}

export const BRAND_HI: Record<string, string> = { Nilkamal: 'निलकमल', National: 'नेशनल', Cello: 'सेलो', Muraj: 'मुराज', Sky: 'स्काई', 'Radhey Gold': 'राधे गोल्ड', Seatex: 'सीटेक्स' }
export const BRAND_GU: Record<string, string> = { Nilkamal: 'નીલકમલ', National: 'નેશનલ', Cello: 'સેલો', Muraj: 'મુરાજ', Sky: 'સ્કાય', 'Radhey Gold': 'રાધે ગોલ્ડ', Seatex: 'સીટેક્સ' }
const brandIn = (b: string, l: Lang) => (l === 'hi' ? BRAND_HI[b] : l === 'gu' ? BRAND_GU[b] : b) ?? b

const WHY: T3[] = [
  ['Real shop on Ambli-Bopal Road, Ahmedabad: see the product before you buy', 'अंबली-बोपल रोड, अहमदाबाद पर असली दुकान: खरीदने से पहले प्रोडक्ट देखें', 'અંબલી-બોપલ રોડ, અમદાવાદ પર સાચી દુકાન: ખરીદતા પહેલાં પ્રોડક્ટ જુઓ'],
  ['Today’s rate on WhatsApp or phone, usually within 1 to 2 hours', 'आज का रेट व्हाट्सऐप या फोन पर, आम तौर पर 1 से 2 घंटे में', 'આજનો ભાવ વોટ્સએપ કે ફોન પર, સામાન્ય રીતે 1 થી 2 કલાકમાં'],
  ['Free delivery on 10 or more chairs', '10 या ज्यादा कुर्सियों पर फ्री डिलीवरी', '10 કે વધુ ખુરશી પર ફ્રી ડિલિવરી'],
  ['25+ years of trust, run by Arvind Patel himself', '25+ साल का भरोसा, खुद अरविंद पटेल की देखरेख में', '25+ વર્ષનો ભરોસો, જાતે અરવિંદ પટેલની દેખરેખમાં'],
]
export const whyBuy = (l: Lang) => WHY.map(t => pick(t, l))

const MATERIAL: Record<'plain' | 'glass', T3> = {
  plain: ['Moulded plastic', 'मोल्डेड प्लास्टिक', 'મોલ્ડેડ પ્લાસ્ટિક'],
  glass: ['Moulded plastic with glass top', 'मोल्डेड प्लास्टिक, ग्लास टॉप के साथ', 'મોલ્ડેડ પ્લાસ્ટિક, ગ્લાસ ટૉપ સાથે'],
}

export const fmtPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`

export function fullName(p: Product) { return `${p.brand} ${p.name}` }

export function productCopy(p: Product, l: Lang) {
  const c = CAT[p.category]
  const full = fullName(p)
  const one = pick(c.one, l)
  const oneEn = c.one[0]
  const needsNoun = l !== 'en' || !/chair|table|cabinet|rack|stool/i.test(p.name)
  const h1 = needsNoun ? `${full} ${one}` : full
  const b = brandIn(p.brand, l)
  const priceLine: T3 = p.price
    ? [`The listed price is ${fmtPrice(p.price)}. Rates can change with colour and stock, so we confirm the final rate when you order.`, `लिस्टेड कीमत ${fmtPrice(p.price)} है। रंग और स्टॉक के साथ रेट बदल सकते हैं, इसलिए ऑर्डर पर फाइनल रेट बताया जाता है।`, `લિસ્ટેડ ભાવ ${fmtPrice(p.price)} છે. રંગ અને સ્ટોક સાથે ભાવ બદલાઈ શકે છે, એટલે ઓર્ડર વખતે ફાઇનલ ભાવ જણાવાય છે.`]
    : ['The rate changes with colour and quantity, so please ask for today’s rate on WhatsApp or by phone.', 'रेट रंग और मात्रा के साथ बदलता है, इसलिए आज का रेट व्हाट्सऐप या फोन पर पूछें।', 'ભાવ રંગ અને જથ્થા સાથે બદલાય છે, એટલે આજનો ભાવ વોટ્સએપ કે ફોન પર પૂછો.']
  const where: T3 = [
    `You can see the ${full} at Patel Selection on Ambli-Bopal Road, Ahmedabad, opposite the Tata Motors Show Room and close to Bopal, South Bopal and Ambli.`,
    `${full} आप पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद (टाटा मोटर्स शोरूम के सामने, बोपल, साउथ बोपल और अंबली के पास) में देख सकते हैं।`,
    `${full} તમે પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદ (ટાટા મોટર્સ શોરૂમ સામે, બોપલ, સાઉથ બોપલ અને અંબલી પાસે) માં જોઈ શકો છો.`,
  ]
  const intro: T3 = [
    `The ${full} is a ${one.toLowerCase()} from ${p.brand}. ${KIND[p.kind][0]}`,
    `${full}, ${b} की ${one} है। ${KIND[p.kind][1]}`,
    `${full}, ${b} ની ${one} છે. ${KIND[p.kind][2]}`,
  ]
  const about = [pick(intro, l), p.fact ? pick(p.fact, l) : '', pick(BRAND[p.brand] ?? ['', '', ''], l), `${pick(priceLine, l)} ${pick(where, l)}`].filter(Boolean)

  const specs: Array<[string, string]> = [
    ['brand', p.brand],
    ['type', one],
    ['material', pick(MATERIAL[p.kind === 'glass' || p.name.toLowerCase().includes('glass') ? 'glass' : 'plain'], l)],
  ]
  if (p.dims) specs.push(['dimensions', p.dims])
  specs.push(['price', p.price ? fmtPrice(p.price) : ''])
  specs.push(['colours', ''], ['availability', ''])

  const dimNote: T3 = ['Size as printed on the maker’s product picture (length x width x height); it can vary slightly.', 'साइज़ निर्माता की प्रोडक्ट फोटो के अनुसार (लंबाई x चौड़ाई x ऊंचाई); थोड़ा अलग हो सकता है।', 'સાઇઝ ઉત્પાદકના પ્રોડક્ટ ફોટા મુજબ (લંબાઈ x પહોળાઈ x ઊંચાઈ); થોડું અલગ હોઈ શકે.']

  const faqs: Array<{ q: string; a: string }> = [
    { q: pick([`What is the price of ${full} in Ahmedabad?`, `अहमदाबाद में ${full} की कीमत क्या है?`, `અમદાવાદમાં ${full} ની કિંમત શું છે?`], l), a: pick(priceLine, l) },
    { q: pick([`Where can I buy ${full} near Bopal?`, `बोपल के पास ${full} कहां खरीदें?`, `બોપલ પાસે ${full} ક્યાં ખરીદવું?`], l), a: pick(where, l) },
    { q: pick([`Can ${full} be delivered to my home?`, `क्या ${full} घर पर डिलीवर हो सकता है?`, `શું ${full} ઘરે ડિલિવર થઈ શકે?`], l), a: pick(p.category === 'Chairs'
      ? ['Yes. Delivery is free on orders of 10 or more chairs; smaller orders pay a delivery charge that we confirm when you order.', 'हां। 10 या ज्यादा कुर्सियों के ऑर्डर पर डिलीवरी फ्री है; छोटे ऑर्डर पर डिलीवरी चार्ज लगता है जो ऑर्डर के समय बताया जाता है।', 'હા. 10 કે વધુ ખુરશીના ઓર્ડર પર ડિલિવરી ફ્રી છે; નાના ઓર્ડર પર ડિલિવરી ચાર્જ લાગે છે જે ઓર્ડર વખતે જણાવાય છે.']
      : ['Yes, delivery is available. The delivery charge depends on your area and is confirmed when you order.', 'हां, डिलीवरी उपलब्ध है। डिलीवरी चार्ज आपके इलाके पर निर्भर है और ऑर्डर के समय बताया जाता है।', 'હા, ડિલિવરી ઉપલબ્ધ છે. ડિલિવરી ચાર્જ તમારા વિસ્તાર પર આધાર રાખે છે અને ઓર્ડર વખતે જણાવાય છે.'], l) },
  ]

  const searches = ([
    [`${full} price`, `${full} Ahmedabad`, `${p.brand} ${oneEn.toLowerCase()} Bopal`, `buy ${full} near me`],
    [`${full} का रेट`, `${full} अहमदाबाद`, `${b} ${one} बोपल`, `${full} खरीदें`],
    [`${full} નો ભાવ`, `${full} અમદાવાદ`, `${b} ${one} બોપલ`, `${full} ખરીદો`],
  ] as string[][])[['en', 'hi', 'gu'].indexOf(l)]

  const title = pick([
    `${h1} Price in Ahmedabad | Patel Selection`,
    `${h1} का रेट, अहमदाबाद | पटेल सेलेक्शन`,
    `${h1} નો ભાવ, અમદાવાદ | પટેલ સિલેક્શન`,
  ], l)
  const desc = pick([
    `${full} ${oneEn.toLowerCase()} at Patel Selection, Ambli-Bopal Road, Ahmedabad.${p.price ? ` Listed price ${fmtPrice(p.price)}.` : ' Ask for today’s rate.'} Photos, details, WhatsApp and call: 97125 92905.`,
    `${full} ${one} पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में।${p.price ? ` लिस्टेड कीमत ${fmtPrice(p.price)}।` : ' आज का रेट पूछें।'} फोटो, विवरण, व्हाट्सऐप और कॉल: 97125 92905।`,
    `${full} ${one} પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં.${p.price ? ` લિસ્ટેડ ભાવ ${fmtPrice(p.price)}.` : ' આજનો ભાવ પૂછો.'} ફોટા, વિગત, વોટ્સએપ અને કૉલ: 97125 92905.`,
  ], l)
  return { full, h1, about, specs, dimNote: pick(dimNote, l), faqs, searches, title, desc, alt: `${full} ${oneEn.toLowerCase()}`, one }
}
