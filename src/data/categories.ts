import type { T3 } from '../i18n'
import type { Category } from './products'

type A3 = readonly [string[], string[], string[]]
type QA = { q: T3; a: T3 }

export interface CatContent {
  name: T3          // plural, shown in menus
  one: T3           // singular, used in product titles
  short: T3
  h1: T3
  title: T3         // page <title>
  desc: T3          // meta description
  intro: T3
  features: A3
  uses: A3
  care: A3
  guide: A3
  faqs: QA[]
  searches: A3      // phrases customers type into Google, shown as a natural "also searched" list
}

export const CAT: Record<Category, CatContent> = {
  'Chairs': {
    name: ['Plastic Chairs', 'प्लास्टिक कुर्सियां', 'પ્લાસ્ટિક ખુરશીઓ'],
    one: ['Plastic Chair', 'प्लास्टिक कुर्सी', 'પ્લાસ્ટિક ખુરશી'],
    short: ['Chairs', 'कुर्सियां', 'ખુરશીઓ'],
    h1: ['Plastic Chairs in Bopal, Ahmedabad', 'बोपल, अहमदाबाद में प्लास्टिक की कुर्सियां', 'બોપલ, અમદાવાદમાં પ્લાસ્ટિક ખુરશીઓ'],
    title: ['Plastic Chairs in Ahmedabad: Nilkamal, Cello, Sky | Patel Selection', 'अहमदाबाद में प्लास्टिक कुर्सी: निलकमल, सेलो, स्काई | पटेल सेलेक्शन', 'અમદાવાદમાં પ્લાસ્ટિક ખુરશી: નીલકમલ, સેલો, સ્કાય | પટેલ સિલેક્શન'],
    desc: ['Buy Nilkamal, National, Cello, Muraj and Sky plastic armchairs, relax chairs and baby chairs at Patel Selection, Ambli-Bopal Road, Ahmedabad. Free delivery on 10+ chairs. Call 97125 92905.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद से निलकमल, नेशनल, सेलो, मुराज और स्काई की प्लास्टिक आर्मचेयर, रिलैक्स चेयर और बेबी चेयर खरीदें। 10+ कुर्सियों पर फ्री डिलीवरी। कॉल 97125 92905।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાંથી નીલકમલ, નેશનલ, સેલો, મુરાજ અને સ્કાયની પ્લાસ્ટિક આર્મચેર, રિલેક્સ ચેર અને બેબી ચેર ખરીદો. 10+ ખુરશી પર ફ્રી ડિલિવરી. કૉલ 97125 92905.'],
    intro: ['Looking for a strong, comfortable plastic chair at an honest price? Patel Selection stocks 21 armchair models from Nilkamal, National, Cello, Muraj, Sky and Radhey Gold, from everyday classic armchairs to wide-slat relax chairs and a baby chair. Compare the models below, add the ones you like to your list and send it to us on WhatsApp for today’s best rate. Orders of 10 or more chairs get free delivery.', 'मजबूत और आरामदायक प्लास्टिक कुर्सी सही दाम पर चाहिए? पटेल सेलेक्शन में निलकमल, नेशनल, सेलो, मुराज, स्काई और राधे गोल्ड के 21 आर्मचेयर मॉडल हैं, रोज़ इस्तेमाल की क्लासिक कुर्सियों से लेकर चौड़ी स्लैट वाली रिलैक्स चेयर और बेबी चेयर तक। नीचे मॉडल देखें, पसंद वाले लिस्ट में जोड़ें और आज का सबसे अच्छा रेट पाने के लिए हमें व्हाट्सऐप पर भेजें। 10 या ज्यादा कुर्सियों पर डिलीवरी फ्री है।', 'મજબૂત અને આરામદાયક પ્લાસ્ટિક ખુરશી યોગ્ય ભાવે જોઈએ છે? પટેલ સિલેક્શનમાં નીલકમલ, નેશનલ, સેલો, મુરાજ, સ્કાય અને રાધે ગોલ્ડના 21 આર્મચેર મોડલ છે, રોજિંદા ક્લાસિક આર્મચેરથી લઈને પહોળી સ્લેટવાળી રિલેક્સ ચેર અને બેબી ચેર સુધી. નીચે મોડલ જુઓ, ગમતા લિસ્ટમાં ઉમેરો અને આજનો શ્રેષ્ઠ ભાવ મેળવવા અમને વોટ્સએપ પર મોકલો. 10 કે વધુ ખુરશી પર ડિલિવરી ફ્રી છે.'],
    features: [
      ['Moulded plastic armchair design that is light to carry and easy to stack', 'Water-friendly, so rain and spills wipe off quickly', 'Strong one-piece style bodies from trusted makers', 'Plain, wood-look, weave-look and slatted back designs'],
      ['मोल्डेड प्लास्टिक आर्मचेयर डिज़ाइन, जो हल्की है और आसानी से स्टैक होती है', 'पानी से खराब नहीं होती, बारिश या गिरा पानी तुरंत पोंछ सकते हैं', 'भरोसेमंद कंपनियों की मजबूत वन-पीस जैसी बॉडी', 'सादी, वुड-लुक, वीव-लुक और स्लैट वाली बैक के डिज़ाइन'],
      ['મોલ્ડેડ પ્લાસ્ટિક આર્મચેર ડિઝાઇન, જે હલકી છે અને સરળતાથી સ્ટેક થાય છે', 'પાણીથી બગડતી નથી, વરસાદ કે ઢોળાયેલું પાણી તરત લૂછી શકાય', 'ભરોસાપાત્ર કંપનીઓની મજબૂત વન-પીસ જેવી બૉડી', 'સાદી, વુડ-લુક, વીવ-લુક અને સ્લેટવાળી બેક ડિઝાઇન'],
    ],
    uses: [
      ['Living room', 'Balcony and terrace', 'Garden and lawn', 'Shop and office', 'Weddings, parties and events'],
      ['लिविंग रूम', 'बालकनी और छत', 'बगीचा और लॉन', 'दुकान और ऑफिस', 'शादी, पार्टी और इवेंट'],
      ['લિવિંગ રૂમ', 'બાલ્કની અને ધાબું', 'બગીચો અને લૉન', 'દુકાન અને ઓફિસ', 'લગ્ન, પાર્ટી અને ઇવેન્ટ'],
    ],
    care: [
      ['Wipe with a soft cloth and mild soap water; avoid harsh acids and scrubbing powders', 'Keep out of strong direct sun for long periods to protect the colour', 'Stack no more chairs than the maker advises so the legs do not bend'],
      ['मुलायम कपड़े और हल्के साबुन के पानी से पोंछें; तेज़ एसिड और रगड़ने वाले पाउडर से बचें', 'रंग बचाने के लिए तेज़ धूप में लंबे समय तक न रखें', 'पैर मुड़ें नहीं, इसलिए कंपनी के बताए से ज्यादा कुर्सियां एक के ऊपर एक न रखें'],
      ['નરમ કપડા અને હળવા સાબુના પાણીથી લૂછો; તેજ એસિડ અને ઘસવાના પાવડરથી બચો', 'રંગ જાળવવા તેજ તડકામાં લાંબો સમય ન રાખો', 'પગ વળે નહીં એટલે કંપનીએ જણાવ્યા કરતાં વધુ ખુરશી એક પર એક ન મૂકો'],
    ],
    guide: [
      ['Arms and back: wide slatted backs suit lounging, plain classic backs suit dining and shops', 'Weight: check the load rating with us if the chair is for heavier users', 'Colour: dark brown and wood-look shades hide marks, light shades brighten a room', 'Quantity: for 10 or more chairs ask for the bulk rate and free delivery'],
      ['हत्थे और बैक: चौड़ी स्लैट वाली बैक आराम के लिए, सादी क्लासिक बैक डाइनिंग और दुकान के लिए', 'वज़न: ज्यादा वज़न वाले लोगों के लिए लोड क्षमता हमसे पूछ लें', 'रंग: गहरा भूरा और वुड-लुक शेड दाग छुपाते हैं, हल्के रंग कमरा खिला देते हैं', 'मात्रा: 10 या ज्यादा कुर्सियों पर थोक रेट और फ्री डिलीवरी पूछें'],
      ['હાથા અને બેક: પહોળી સ્લેટવાળી બેક આરામ માટે, સાદી ક્લાસિક બેક ડાઇનિંગ અને દુકાન માટે', 'વજન: વધુ વજનવાળા લોકો માટે લોડ ક્ષમતા અમને પૂછી લો', 'રંગ: ઘેરો ભૂરો અને વુડ-લુક શેડ ડાઘ છુપાવે છે, હળવા રંગ ઓરડો ખીલવે છે', 'જથ્થો: 10 કે વધુ ખુરશી પર જથ્થાબંધ ભાવ અને ફ્રી ડિલિવરી પૂછો'],
    ],
    faqs: [
      { q: ['What is the price of a plastic chair in Ahmedabad?', 'अहमदाबाद में प्लास्टिक कुर्सी का रेट क्या है?', 'અમદાવાદમાં પ્લાસ્ટિક ખુરશીનો ભાવ શું છે?'], a: ['Chair rates depend on the brand, model, colour and quantity, and they change often. Add the chairs you like to your list and send it on WhatsApp, or call 97125 92905, and we share today’s best rate.', 'कुर्सी का रेट ब्रांड, मॉडल, रंग और मात्रा पर निर्भर करता है और अक्सर बदलता है। पसंद की कुर्सियां लिस्ट में जोड़कर व्हाट्सऐप पर भेजें या 97125 92905 पर कॉल करें, हम आज का सबसे अच्छा रेट बताएंगे।', 'ખુરશીનો ભાવ બ્રાન્ડ, મોડલ, રંગ અને જથ્થા પર આધાર રાખે છે અને વારંવાર બદલાય છે. ગમતી ખુરશી લિસ્ટમાં ઉમેરી વોટ્સએપ પર મોકલો અથવા 97125 92905 પર કૉલ કરો, અમે આજનો શ્રેષ્ઠ ભાવ જણાવીશું.'] },
      { q: ['Which plastic chair brands are available?', 'कौन-कौन सी कंपनियों की प्लास्टिक कुर्सी मिलती है?', 'કઈ કંપનીઓની પ્લાસ્ટિક ખુરશી મળે છે?'], a: ['We show Nilkamal, National, Cello, Muraj, Sky and Radhey Gold models here. Supreme, Varmora and Royal models are available on request.', 'यहां निलकमल, नेशनल, सेलो, मुराज, स्काई और राधे गोल्ड के मॉडल दिखाए गए हैं। सुप्रीम, वरमोरा और रॉयल के मॉडल मांगने पर उपलब्ध हैं।', 'અહીં નીલકમલ, નેશનલ, સેલો, મુરાજ, સ્કાય અને રાધે ગોલ્ડના મોડલ બતાવ્યા છે. સુપ્રીમ, વરમોરા અને રોયલના મોડલ માંગવાથી મળે છે.'] },
      { q: ['Is delivery free for chairs?', 'क्या कुर्सियों पर डिलीवरी फ्री है?', 'શું ખુરશી પર ડિલિવરી ફ્રી છે?'], a: ['Yes, delivery is free on orders of 10 or more chairs. Smaller orders pay a delivery charge that we confirm when you order.', 'हां, 10 या ज्यादा कुर्सियों के ऑर्डर पर डिलीवरी फ्री है। छोटे ऑर्डर पर डिलीवरी चार्ज लगता है, जो ऑर्डर के समय बताया जाता है।', 'હા, 10 કે વધુ ખુરશીના ઓર્ડર પર ડિલિવરી ફ્રી છે. નાના ઓર્ડર પર ડિલિવરી ચાર્જ લાગે છે, જે ઓર્ડર વખતે જણાવાય છે.'] },
    ],
    searches: [
      ['plastic chair price in Ahmedabad', 'Nilkamal chair dealer Ahmedabad', 'plastic armchair near Bopal', 'Cello chair Ahmedabad', 'Sky plastic chair Ahmedabad', 'baby chair plastic', 'relax chair plastic', 'bulk plastic chairs for events'],
      ['प्लास्टिक कुर्सी अहमदाबाद', 'प्लास्टिक की कुर्सी का रेट', 'निलकमल कुर्सी अहमदाबाद', 'आर्मचेयर प्लास्टिक', 'बेबी चेयर', 'रिलैक्स चेयर', 'थोक में प्लास्टिक कुर्सी', 'plastic ki kursi'],
      ['પ્લાસ્ટિક ખુરશી અમદાવાદ', 'પ્લાસ્ટિકની ખુરશીનો ભાવ', 'નીલકમલ ખુરશી અમદાવાદ', 'આર્મચેર પ્લાસ્ટિક', 'બેબી ચેર', 'રિલેક્સ ચેર', 'જથ્થાબંધ પ્લાસ્ટિક ખુરશી', 'plastic khurshi'],
    ],
  },
  'Dining Tables': {
    name: ['Plastic Dining Tables', 'प्लास्टिक डाइनिंग टेबल', 'પ્લાસ્ટિક ડાઇનિંગ ટેબલ'],
    one: ['Plastic Dining Table', 'प्लास्टिक डाइनिंग टेबल', 'પ્લાસ્ટિક ડાઇનિંગ ટેબલ'],
    short: ['Dining Tables', 'डाइनिंग टेबल', 'ડાઇનિંગ ટેબલ'],
    h1: ['Plastic Dining Tables in Bopal, Ahmedabad', 'बोपल, अहमदाबाद में प्लास्टिक डाइनिंग टेबल', 'બોપલ, અમદાવાદમાં પ્લાસ્ટિક ડાઇનિંગ ટેબલ'],
    title: ['Plastic Dining Tables in Ahmedabad: Round and Rectangular | Patel Selection', 'अहमदाबाद में प्लास्टिक डाइनिंग टेबल: गोल और आयताकार | पटेल सेलेक्शन', 'અમદાવાદમાં પ્લાસ્ટિક ડાઇનિંગ ટેબલ: ગોળ અને લંબચોરસ | પટેલ સિલેક્શન'],
    desc: ['Round and rectangular plastic dining tables from National, Nilkamal and Cello at Patel Selection, Ambli-Bopal Road, Ahmedabad. Listed prices from Rs. 2,499. Call 97125 92905.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में नेशनल, निलकमल और सेलो की गोल और आयताकार प्लास्टिक डाइनिंग टेबल। लिस्टेड कीमत Rs. 2,499 से। कॉल 97125 92905।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં નેશનલ, નીલકમલ અને સેલોના ગોળ અને લંબચોરસ પ્લાસ્ટિક ડાઇનિંગ ટેબલ. લિસ્ટેડ ભાવ Rs. 2,499 થી. કૉલ 97125 92905.'],
    intro: ['A good dining table should clean in seconds and carry the whole family. We stock eight plastic dining tables from National, Nilkamal and Cello in round, rectangular and cross-legged designs, with listed prices you can see before you ask. Pair a table with matching chairs from our chair range and send the full list on WhatsApp.', 'अच्छी डाइनिंग टेबल सेकंडों में साफ हो और पूरे परिवार को संभाले। हमारे पास नेशनल, निलकमल और सेलो की आठ प्लास्टिक डाइनिंग टेबल हैं, गोल, आयताकार और क्रॉस-लेग डिज़ाइन में, और लिस्टेड कीमत पूछने से पहले ही दिखती है। टेबल के साथ मैचिंग कुर्सियां हमारी चेयर रेंज से चुनें और पूरी लिस्ट व्हाट्सऐप पर भेजें।', 'સારું ડાઇનિંગ ટેબલ સેકન્ડોમાં સાફ થાય અને આખા પરિવારને સંભાળે. અમારી પાસે નેશનલ, નીલકમલ અને સેલોના આઠ પ્લાસ્ટિક ડાઇનિંગ ટેબલ છે, ગોળ, લંબચોરસ અને ક્રોસ-લેગ ડિઝાઇનમાં, અને લિસ્ટેડ ભાવ પૂછ્યા પહેલાં જ દેખાય છે. ટેબલ સાથે મેચિંગ ખુરશી અમારી ચેર રેન્જમાંથી પસંદ કરો અને આખી લિસ્ટ વોટ્સએપ પર મોકલો.'],
    features: [
      ['Wipe-clean top that does not stain easily', 'Light enough to move when you clean the room', 'Rust-free, so it is safe for kitchens and open dining areas', 'Round tables suit small rooms, rectangular tables seat more'],
      ['साफ करने में आसान टॉप, आसानी से दाग नहीं लगता', 'सफाई के समय हिलाने लायक हल्की', 'जंग नहीं लगती, इसलिए किचन और खुले डाइनिंग एरिया में सुरक्षित', 'गोल टेबल छोटे कमरे में, आयताकार टेबल ज्यादा लोगों के लिए'],
      ['સાફ કરવામાં સહેલી ટૉપ, સહેલાઈથી ડાઘ પડતો નથી', 'સફાઈ વખતે ખસેડી શકાય તેટલું હલકું', 'કાટ લાગતો નથી, એટલે રસોડા અને ખુલ્લા ડાઇનિંગ એરિયામાં સુરક્ષિત', 'ગોળ ટેબલ નાના રૂમમાં, લંબચોરસ ટેબલ વધુ લોકો માટે'],
    ],
    uses: [['Home dining room', 'Kitchen corner', 'Café and tiffin centre', 'Restaurant and canteen', 'Terrace and garden'], ['घर का डाइनिंग रूम', 'किचन का कोना', 'कैफे और टिफिन सेंटर', 'रेस्टोरेंट और कैंटीन', 'छत और बगीचा'], ['ઘરનો ડાઇનિંગ રૂમ', 'રસોડાનો ખૂણો', 'કેફે અને ટિફિન સેન્ટર', 'રેસ્ટોરન્ટ અને કેન્ટીન', 'ધાબું અને બગીચો']],
    care: [
      ['Clean with a soft cloth and mild soap water', 'Do not place very hot vessels directly on the top; use a mat', 'Avoid sitting or standing on the table'],
      ['मुलायम कपड़े और हल्के साबुन के पानी से साफ करें', 'बहुत गर्म बर्तन सीधे टॉप पर न रखें; मैट इस्तेमाल करें', 'टेबल पर बैठें या खड़े न हों'],
      ['નરમ કપડા અને હળવા સાબુના પાણીથી સાફ કરો', 'બહુ ગરમ વાસણ સીધા ટૉપ પર ન મૂકો; મૅટ વાપરો', 'ટેબલ પર બેસો કે ઊભા ન રહો'],
    ],
    guide: [
      ['Count the people: a round table of about 870 mm suits 4, a rectangular table of about 1125 mm suits 4 to 6', 'Measure your room: leave about 800 mm around the table for chairs to move', 'Choose the leg style: cross legs look modern, straight legs save floor space', 'Match the chairs: ask us to pair a table with chairs in a matching colour'],
      ['लोग गिनें: करीब 870 मिमी की गोल टेबल 4 लोगों के लिए, करीब 1125 मिमी की आयताकार टेबल 4 से 6 लोगों के लिए', 'कमरा नापें: कुर्सियां हिलाने के लिए टेबल के चारों ओर करीब 800 मिमी जगह छोड़ें', 'पैरों का स्टाइल चुनें: क्रॉस पैर आधुनिक दिखते हैं, सीधे पैर जगह बचाते हैं', 'कुर्सियां मैच करें: टेबल के साथ मैचिंग रंग की कुर्सियां हमसे पूछें'],
      ['લોકો ગણો: લગભગ 870 મિમીનું ગોળ ટેબલ 4 લોકો માટે, લગભગ 1125 મિમીનું લંબચોરસ ટેબલ 4 થી 6 લોકો માટે', 'રૂમ માપો: ખુરશી ખસેડવા ટેબલની ચારે બાજુ લગભગ 800 મિમી જગ્યા છોડો', 'પગની સ્ટાઇલ પસંદ કરો: ક્રોસ પગ આધુનિક લાગે છે, સીધા પગ જગ્યા બચાવે છે', 'ખુરશી મેચ કરો: ટેબલ સાથે મેચિંગ રંગની ખુરશી અમને પૂછો'],
    ],
    faqs: [
      { q: ['What is the price of a plastic dining table?', 'प्लास्टिक डाइनिंग टेबल की कीमत क्या है?', 'પ્લાસ્ટિક ડાઇનિંગ ટેબલની કિંમત શું છે?'], a: ['Our listed prices run from Rs. 2,499 to Rs. 3,599 depending on the model. Prices can change, so we confirm the final rate when you order.', 'हमारी लिस्टेड कीमतें मॉडल के अनुसार Rs. 2,499 से Rs. 3,599 तक हैं। कीमत बदल सकती है, इसलिए ऑर्डर पर फाइनल रेट बताया जाता है।', 'અમારા લિસ્ટેડ ભાવ મોડલ પ્રમાણે Rs. 2,499 થી Rs. 3,599 સુધી છે. ભાવ બદલાઈ શકે છે, એટલે ઓર્ડર વખતે ફાઇનલ ભાવ જણાવાય છે.'] },
      { q: ['Do you sell round dining tables?', 'क्या गोल डाइनिंग टेबल मिलती है?', 'શું ગોળ ડાઇનિંગ ટેબલ મળે છે?'], a: ['Yes. The National Party Round and Party Round Roma tables are round plastic dining tables for small and medium rooms.', 'हां। नेशनल पार्टी राउंड और पार्टी राउंड रोमा गोल प्लास्टिक डाइनिंग टेबल हैं, जो छोटे और मध्यम कमरों के लिए ठीक हैं।', 'હા. નેશનલ પાર્ટી રાઉન્ડ અને પાર્ટી રાઉન્ડ રોમા ગોળ પ્લાસ્ટિક ડાઇનિંગ ટેબલ છે, જે નાના અને મધ્યમ રૂમ માટે યોગ્ય છે.'] },
      { q: ['Can I buy chairs to match the table?', 'क्या टेबल के साथ मैचिंग कुर्सियां मिल सकती हैं?', 'શું ટેબલ સાથે મેચિંગ ખુરશી મળી શકે?'], a: ['Yes. Tell us the table you like and we show chairs in matching colours from our chair range.', 'हां। जो टेबल पसंद है वह बताएं, हम चेयर रेंज से मैचिंग रंग की कुर्सियां दिखा देंगे।', 'હા. ગમતું ટેબલ જણાવો, અમે ચેર રેન્જમાંથી મેચિંગ રંગની ખુરશી બતાવીશું.'] },
    ],
    searches: [
      ['plastic dining table price Ahmedabad', 'round dining table plastic', '4 seater dining table plastic', 'Nilkamal dining table Ahmedabad', 'Cello dining table', 'National dining table', 'dining table for small kitchen', 'restaurant plastic table'],
      ['प्लास्टिक डाइनिंग टेबल अहमदाबाद', 'गोल डाइनिंग टेबल प्लास्टिक', '4 सीटर डाइनिंग टेबल', 'निलकमल डाइनिंग टेबल', 'सेलो डाइनिंग टेबल', 'खाने की टेबल', 'रेस्टोरेंट टेबल प्लास्टिक', 'dining table ka rate'],
      ['પ્લાસ્ટિક ડાઇનિંગ ટેબલ અમદાવાદ', 'ગોળ ડાઇનિંગ ટેબલ પ્લાસ્ટિક', '4 સીટર ડાઇનિંગ ટેબલ', 'નીલકમલ ડાઇનિંગ ટેબલ', 'સેલો ડાઇનિંગ ટેબલ', 'જમવાનું ટેબલ', 'રેસ્ટોરન્ટ ટેબલ પ્લાસ્ટિક', 'dining table no bhav'],
    ],
  },
  'Center Tables': {
    name: ['Center Tables', 'सेंटर टेबल', 'સેન્ટર ટેબલ'],
    one: ['Center Table', 'सेंटर टेबल', 'સેન્ટર ટેબલ'],
    short: ['Center Tables', 'सेंटर टेबल', 'સેન્ટર ટેબલ'],
    h1: ['Center Tables in Bopal, Ahmedabad', 'बोपल, अहमदाबाद में सेंटर टेबल', 'બોપલ, અમદાવાદમાં સેન્ટર ટેબલ'],
    title: ['Center Tables and Tea Trolleys in Ahmedabad | Patel Selection', 'अहमदाबाद में सेंटर टेबल और टी ट्रॉली | पटेल सेलेक्शन', 'અમદાવાદમાં સેન્ટર ટેબલ અને ટી ટ્રોલી | પટેલ સિલેક્શન'],
    desc: ['Plastic and glass-top center tables, tea trolley style tables with wheels from National and Nilkamal at Patel Selection, Bopal, Ahmedabad. From Rs. 1,199. Call 97125 92905.', 'पटेल सेलेक्शन, बोपल, अहमदाबाद में नेशनल और निलकमल की प्लास्टिक और ग्लास-टॉप सेंटर टेबल, पहियों वाली ट्रॉली स्टाइल टेबल। Rs. 1,199 से। कॉल 97125 92905।', 'પટેલ સિલેક્શન, બોપલ, અમદાવાદમાં નેશનલ અને નીલકમલના પ્લાસ્ટિક અને ગ્લાસ-ટૉપ સેન્ટર ટેબલ, પૈડાંવાળા ટ્રોલી સ્ટાઇલ ટેબલ. Rs. 1,199 થી. કૉલ 97125 92905.'],
    intro: ['A center table holds the tea tray, the remote and the newspaper, so it needs to be tough and easy to wipe. We have five models: two-tier tables on wheels from National that double as tea trolleys, shelf tables, and glass-top tables from Nilkamal. Pick one that fits your sofa set and send the list to us for the best rate.', 'सेंटर टेबल पर चाय की ट्रे, रिमोट और अखबार रहते हैं, इसलिए वह मजबूत और पोंछने में आसान होनी चाहिए। हमारे पास पांच मॉडल हैं: नेशनल की पहियों वाली दो-मंज़िला टेबल जो टी ट्रॉली का काम भी करती है, शेल्फ वाली टेबल और निलकमल की ग्लास-टॉप टेबल। अपने सोफे सेट के हिसाब से चुनें और सबसे अच्छे रेट के लिए लिस्ट हमें भेजें।', 'સેન્ટર ટેબલ પર ચાની ટ્રે, રિમોટ અને છાપું રહે છે, એટલે તે મજબૂત અને લૂછવામાં સહેલું હોવું જોઈએ. અમારી પાસે પાંચ મોડલ છે: નેશનલના પૈડાંવાળા બે-માળના ટેબલ જે ટી ટ્રોલીનું કામ પણ કરે છે, શેલ્ફવાળા ટેબલ અને નીલકમલના ગ્લાસ-ટૉપ ટેબલ. તમારા સોફા સેટ પ્રમાણે પસંદ કરો અને સૌથી સારા ભાવ માટે લિસ્ટ અમને મોકલો.'],
    features: [
      ['Lower shelf for magazines, trays and baskets', 'Wheeled trolley styles roll from kitchen to living room', 'Glass-top styles give a neat, modern look', 'Easy to wipe clean after tea and snacks'],
      ['पत्रिकाओं, ट्रे और टोकरी के लिए नीचे की शेल्फ', 'पहियों वाले ट्रॉली स्टाइल रसोई से लिविंग रूम तक आसानी से चलते हैं', 'ग्लास-टॉप स्टाइल साफ और आधुनिक लुक देते हैं', 'चाय-नाश्ते के बाद पोंछना आसान'],
      ['મેગેઝિન, ટ્રે અને ટોપલી માટે નીચે શેલ્ફ', 'પૈડાંવાળા ટ્રોલી સ્ટાઇલ રસોડાથી લિવિંગ રૂમ સુધી સરળતાથી ફરે છે', 'ગ્લાસ-ટૉપ સ્ટાઇલ સ્વચ્છ અને આધુનિક લુક આપે છે', 'ચા-નાસ્તા પછી લૂછવામાં સહેલું'],
    ],
    uses: [['Living room', 'Hall and guest room', 'Office reception', 'Shop waiting area', 'Balcony'], ['लिविंग रूम', 'हॉल और गेस्ट रूम', 'ऑफिस रिसेप्शन', 'दुकान का वेटिंग एरिया', 'बालकनी'], ['લિવિંગ રૂમ', 'હૉલ અને ગેસ્ટ રૂમ', 'ઓફિસ રિસેપ્શન', 'દુકાનનો વેઇટિંગ એરિયા', 'બાલ્કની']],
    care: [
      ['Wipe with a soft damp cloth; use a glass cleaner on glass tops', 'Do not place very hot vessels directly on the surface', 'Lock or guide the wheels when the trolley is loaded'],
      ['मुलायम गीले कपड़े से पोंछें; ग्लास टॉप पर ग्लास क्लीनर इस्तेमाल करें', 'बहुत गर्म बर्तन सीधे सतह पर न रखें', 'ट्रॉली पर सामान हो तो पहियों को संभालकर चलाएं'],
      ['નરમ ભીના કપડાથી લૂછો; ગ્લાસ ટૉપ પર ગ્લાસ ક્લીનર વાપરો', 'બહુ ગરમ વાસણ સીધા સપાટી પર ન મૂકો', 'ટ્રોલી પર સામાન હોય ત્યારે પૈડાં સંભાળીને ચલાવો'],
    ],
    guide: [
      ['Match the height: a center table about as high as your sofa seat is easiest to use', 'Pick storage: a lower shelf hides clutter, a trolley adds mobility', 'Glass or plastic top: glass looks sharper, plastic is lighter and safer around children', 'Leave about 400 mm between the table and the sofa'],
      ['ऊंचाई मिलाएं: सोफे की सीट जितनी ऊंची सेंटर टेबल सबसे आसान रहती है', 'स्टोरेज चुनें: नीचे की शेल्फ सामान छुपाती है, ट्रॉली चलने की सुविधा देती है', 'ग्लास या प्लास्टिक टॉप: ग्लास ज्यादा स्मार्ट दिखता है, प्लास्टिक हल्का और बच्चों के आसपास ज्यादा सुरक्षित', 'टेबल और सोफे के बीच करीब 400 मिमी जगह रखें'],
      ['ઊંચાઈ મેળવો: સોફાની સીટ જેટલી ઊંચાઈનું સેન્ટર ટેબલ સૌથી સરળ રહે છે', 'સ્ટોરેજ પસંદ કરો: નીચેની શેલ્ફ સામાન છુપાવે છે, ટ્રોલી હલનચલનની સુવિધા આપે છે', 'ગ્લાસ કે પ્લાસ્ટિક ટૉપ: ગ્લાસ વધુ સ્માર્ટ લાગે છે, પ્લાસ્ટિક હલકું અને બાળકો પાસે વધુ સુરક્ષિત', 'ટેબલ અને સોફા વચ્ચે લગભગ 400 મિમી જગ્યા રાખો'],
    ],
    faqs: [
      { q: ['Which center table is best for a small living room?', 'छोटे लिविंग रूम के लिए कौन-सी सेंटर टेबल ठीक है?', 'નાના લિવિંગ રૂમ માટે કયું સેન્ટર ટેબલ યોગ્ય છે?'], a: ['A two-tier trolley style table such as the National Spectra or Rajkot takes little space and can be rolled away when you need the room.', 'नेशनल स्पेक्ट्रा या राजकोट जैसी दो-मंज़िला ट्रॉली स्टाइल टेबल कम जगह लेती है और ज़रूरत पड़ने पर हटाई जा सकती है।', 'નેશનલ સ્પેક્ટ્રા કે રાજકોટ જેવું બે-માળનું ટ્રોલી સ્ટાઇલ ટેબલ ઓછી જગ્યા લે છે અને જરૂર પડે ત્યારે ખસેડી શકાય છે.'] },
      { q: ['Do you have glass top center tables?', 'क्या ग्लास टॉप सेंटर टेबल मिलती है?', 'શું ગ્લાસ ટૉપ સેન્ટર ટેબલ મળે છે?'], a: ['Yes. The Nilkamal Breeze (Glass Top) and Nilkamal Center Table 1 (With Glass) are glass-top models.', 'हां। निलकमल ब्रीज़ (ग्लास टॉप) और निलकमल सेंटर टेबल 1 (विद ग्लास) ग्लास-टॉप मॉडल हैं।', 'હા. નીલકમલ બ્રીઝ (ગ્લાસ ટૉપ) અને નીલકમલ સેન્ટર ટેબલ 1 (વિથ ગ્લાસ) ગ્લાસ-ટૉપ મોડલ છે.'] },
      { q: ['Can I see the table before buying?', 'क्या खरीदने से पहले टेबल देख सकते हैं?', 'શું ખરીદતા પહેલાં ટેબલ જોઈ શકાય?'], a: ['Yes, visit our shop on Ambli-Bopal Road, opposite the Tata Motors Show Room, or send us a message and we will share photos.', 'हां, अंबली-बोपल रोड पर टाटा मोटर्स शोरूम के सामने हमारी दुकान पर आएं, या मैसेज करें, हम फोटो भेज देंगे।', 'હા, અંબલી-બોપલ રોડ પર ટાટા મોટર્સ શોરૂમ સામે અમારી દુકાને આવો, અથવા મેસેજ કરો, અમે ફોટા મોકલીશું.'] },
    ],
    searches: [
      ['center table price Ahmedabad', 'plastic center table', 'glass top center table', 'tea trolley table with wheels', 'Nilkamal center table', 'National center table', 'living room table plastic', 'sofa center table Bopal'],
      ['सेंटर टेबल अहमदाबाद', 'प्लास्टिक सेंटर टेबल', 'ग्लास टॉप सेंटर टेबल', 'पहियों वाली टेबल', 'चाय की ट्रॉली टेबल', 'निलकमल सेंटर टेबल', 'सोफा सेंटर टेबल', 'center table ka rate'],
      ['સેન્ટર ટેબલ અમદાવાદ', 'પ્લાસ્ટિક સેન્ટર ટેબલ', 'ગ્લાસ ટૉપ સેન્ટર ટેબલ', 'પૈડાંવાળું ટેબલ', 'ચાની ટ્રોલી ટેબલ', 'નીલકમલ સેન્ટર ટેબલ', 'સોફા સેન્ટર ટેબલ', 'center table no bhav'],
    ],
  },
  'Cabinets': {
    name: ['Plastic Cabinets', 'प्लास्टिक कैबिनेट', 'પ્લાસ્ટિક કેબિનેટ'],
    one: ['Plastic Cabinet', 'प्लास्टिक कैबिनेट', 'પ્લાસ્ટિક કેબિનેટ'],
    short: ['Cabinets', 'कैबिनेट', 'કેબિનેટ'],
    h1: ['Plastic Cabinets in Bopal, Ahmedabad', 'बोपल, अहमदाबाद में प्लास्टिक कैबिनेट', 'બોપલ, અમદાવાદમાં પ્લાસ્ટિક કેબિનેટ'],
    title: ['Plastic Storage Cabinets in Ahmedabad: 2 Foot and 4 Foot | Patel Selection', 'अहमदाबाद में प्लास्टिक स्टोरेज कैबिनेट: 2 फुट और 4 फुट | पटेल सेलेक्शन', 'અમદાવાદમાં પ્લાસ્ટિક સ્ટોરેજ કેબિનેટ: 2 ફૂટ અને 4 ફૂટ | પટેલ સિલેક્શન'],
    desc: ['Two-door plastic storage cabinets, 2 foot and 4 foot, from National, Cello and Nilkamal at Patel Selection, Ambli-Bopal Road, Ahmedabad. Call 97125 92905.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में नेशनल, सेलो और निलकमल की दो दरवाज़ों वाली प्लास्टिक स्टोरेज कैबिनेट, 2 फुट और 4 फुट। कॉल 97125 92905।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં નેશનલ, સેલો અને નીલકમલની બે દરવાજાવાળી પ્લાસ્ટિક સ્ટોરેજ કેબિનેટ, 2 ફૂટ અને 4 ફૂટ. કૉલ 97125 92905.'],
    intro: ['A plastic cabinet does not rust, swell in the monsoon or attract termites, which makes it a smart choice for kitchens, balconies and utility areas in Ahmedabad homes. We stock 2 foot and 4 foot storage cabinets from National, Cello and Nilkamal. Add the one you like to your list for today’s rate.', 'प्लास्टिक कैबिनेट में जंग नहीं लगती, मानसून में फूलती नहीं और दीमक नहीं लगती, इसलिए अहमदाबाद के घरों में किचन, बालकनी और यूटिलिटी एरिया के लिए यह समझदारी का सौदा है। हमारे पास नेशनल, सेलो और निलकमल की 2 फुट और 4 फुट स्टोरेज कैबिनेट हैं। पसंद की कैबिनेट आज के रेट के लिए लिस्ट में जोड़ें।', 'પ્લાસ્ટિક કેબિનેટને કાટ લાગતો નથી, ચોમાસામાં ફૂલતી નથી અને ઉધઈ લાગતી નથી, એટલે અમદાવાદના ઘરોમાં રસોડા, બાલ્કની અને યુટિલિટી એરિયા માટે સમજદારીભર્યો વિકલ્પ છે. અમારી પાસે નેશનલ, સેલો અને નીલકમલની 2 ફૂટ અને 4 ફૂટ સ્ટોરેજ કેબિનેટ છે. ગમતી કેબિનેટ આજના ભાવ માટે લિસ્ટમાં ઉમેરો.'],
    features: [
      ['Rust-free and termite-free, unlike wood and metal', 'Two doors with shelves inside for everyday storage', 'Light enough to move when you clean', 'Wipe-clean finish that handles kitchen humidity'],
      ['लकड़ी और लोहे की तरह जंग और दीमक का डर नहीं', 'रोज़ के सामान के लिए अंदर शेल्फ और दो दरवाज़े', 'सफाई के समय सरकाने लायक हल्की', 'पोंछकर साफ होने वाली फिनिश, रसोई की नमी में भी ठीक'],
      ['લાકડા અને લોખંડની જેમ કાટ અને ઉધઈનો ડર નથી', 'રોજના સામાન માટે અંદર શેલ્ફ અને બે દરવાજા', 'સફાઈ વખતે ખસેડી શકાય તેટલી હલકી', 'લૂછીને સાફ થતી ફિનિશ, રસોડાના ભેજમાં પણ સારી'],
    ],
    uses: [['Kitchen', 'Balcony and utility area', 'Bedroom and kids room', 'Shop and godown', 'Office pantry'], ['रसोई', 'बालकनी और यूटिलिटी एरिया', 'बेडरूम और बच्चों का कमरा', 'दुकान और गोदाम', 'ऑफिस पैंट्री'], ['રસોડું', 'બાલ્કની અને યુટિલિટી એરિયા', 'બેડરૂમ અને બાળકોનો રૂમ', 'દુકાન અને ગોડાઉન', 'ઓફિસ પેન્ટ્રી']],
    care: [
      ['Wipe with a damp cloth; avoid strong chemicals', 'Spread the load across shelves instead of stacking everything on one', 'Place on a level floor so the doors close smoothly'],
      ['गीले कपड़े से पोंछें; तेज़ केमिकल से बचें', 'सारा वज़न एक शेल्फ पर न रखकर सभी शेल्फ में बांटें', 'समतल फर्श पर रखें ताकि दरवाज़े आसानी से बंद हों'],
      ['ભીના કપડાથી લૂછો; તેજ કેમિકલથી બચો', 'બધું વજન એક શેલ્ફ પર ન રાખી બધી શેલ્ફમાં વહેંચો', 'સમતલ ફર્શ પર મૂકો જેથી દરવાજા સરળતાથી બંધ થાય'],
    ],
    guide: [
      ['Choose the height: 2 foot cabinets fit under counters and in corners, 4 foot cabinets store much more', 'Check the floor space: the National 4 foot cabinet is about 550 mm wide and 355 mm deep', 'Think about what goes inside: shoes, utensils, clothes and tools need different shelf spacing', 'Choose a colour that blends with your wall or kitchen'],
      ['ऊंचाई चुनें: 2 फुट कैबिनेट काउंटर के नीचे और कोने में फिट होती है, 4 फुट कैबिनेट में ज्यादा सामान आता है', 'फर्श की जगह देखें: नेशनल 4 फुट कैबिनेट करीब 550 मिमी चौड़ी और 355 मिमी गहरी है', 'सोचें अंदर क्या रखना है: जूते, बर्तन, कपड़े और औज़ारों के लिए शेल्फ की दूरी अलग चाहिए', 'दीवार या किचन से मिलता रंग चुनें'],
      ['ઊંચાઈ પસંદ કરો: 2 ફૂટ કેબિનેટ કાઉન્ટર નીચે અને ખૂણામાં ફિટ થાય, 4 ફૂટ કેબિનેટમાં વધુ સામાન સમાય', 'ફર્શની જગ્યા જુઓ: નેશનલ 4 ફૂટ કેબિનેટ લગભગ 550 મિમી પહોળી અને 355 મિમી ઊંડી છે', 'વિચારો અંદર શું રાખવું છે: બૂટ, વાસણ, કપડાં અને ઓજારો માટે શેલ્ફનું અંતર અલગ જોઈએ', 'દીવાલ કે રસોડા સાથે મેળ ખાતો રંગ પસંદ કરો'],
    ],
    faqs: [
      { q: ['What sizes of plastic cabinets do you have?', 'प्लास्टिक कैबिनेट किन साइज़ में मिलती हैं?', 'પ્લાસ્ટિક કેબિનેટ કયા સાઇઝમાં મળે છે?'], a: ['We list 2 foot and 4 foot cabinets. The National Power Series 2 foot is about 590 x 355 x 638 mm and the 4 foot is about 550 x 355 x 1225 mm, as printed on the maker’s picture.', 'हम 2 फुट और 4 फुट कैबिनेट दिखाते हैं। निर्माता की फोटो के अनुसार नेशनल पावर सीरीज़ 2 फुट करीब 590 x 355 x 638 मिमी और 4 फुट करीब 550 x 355 x 1225 मिमी है।', 'અમે 2 ફૂટ અને 4 ફૂટ કેબિનેટ બતાવીએ છીએ. ઉત્પાદકના ફોટા મુજબ નેશનલ પાવર સિરીઝ 2 ફૂટ લગભગ 590 x 355 x 638 મિમી અને 4 ફૂટ લગભગ 550 x 355 x 1225 મિમી છે.'] },
      { q: ['Is a plastic cabinet good for the monsoon?', 'क्या मानसून के लिए प्लास्टिक कैबिनेट ठीक है?', 'શું ચોમાસા માટે પ્લાસ્ટિક કેબિનેટ યોગ્ય છે?'], a: ['Yes. Plastic does not rust, swell or get termites, so it stays in good shape through humid weather.', 'हां। प्लास्टिक में जंग, फूलना या दीमक नहीं होता, इसलिए नमी वाले मौसम में भी ठीक रहती है।', 'હા. પ્લાસ્ટિકમાં કાટ, ફૂલવું કે ઉધઈ નથી, એટલે ભેજવાળા હવામાનમાં પણ સારી રહે છે.'] },
      { q: ['Can a cabinet be used as a shoe cabinet?', 'क्या कैबिनेट को शू कैबिनेट की तरह इस्तेमाल कर सकते हैं?', 'શું કેબિનેટનો શૂ કેબિનેટ તરીકે ઉપયોગ થઈ શકે?'], a: ['Yes, many customers do. For dedicated shoe storage, see our shoe racks.', 'हां, कई ग्राहक ऐसा करते हैं। खास जूतों के लिए हमारे शू रैक देखें।', 'હા, ઘણા ગ્રાહકો એવું કરે છે. ખાસ બૂટ માટે અમારા શૂ રેક જુઓ.'] },
    ],
    searches: [
      ['plastic cabinet price Ahmedabad', 'plastic storage cabinet 2 door', '4 foot plastic cupboard', 'Nilkamal Freedom cabinet', 'Cello cabinet Ahmedabad', 'plastic almirah', 'kitchen storage cabinet plastic', 'plastic cupboard for balcony'],
      ['प्लास्टिक कैबिनेट अहमदाबाद', 'प्लास्टिक अलमारी', 'प्लास्टिक कपबोर्ड 4 फुट', 'दो दरवाज़े वाली कैबिनेट', 'निलकमल फ्रीडम कैबिनेट', 'किचन स्टोरेज कैबिनेट', 'बालकनी के लिए अलमारी', 'plastic almari ka rate'],
      ['પ્લાસ્ટિક કેબિનેટ અમદાવાદ', 'પ્લાસ્ટિક કબાટ', 'પ્લાસ્ટિક કપબોર્ડ 4 ફૂટ', 'બે દરવાજાવાળી કેબિનેટ', 'નીલકમલ ફ્રીડમ કેબિનેટ', 'કિચન સ્ટોરેજ કેબિનેટ', 'બાલ્કની માટે કબાટ', 'plastic kabat no bhav'],
    ],
  },
  'Shoe Racks': {
    name: ['Shoe Racks', 'शू रैक', 'શૂ રેક'],
    one: ['Shoe Rack', 'शू रैक', 'શૂ રેક'],
    short: ['Shoe Racks', 'शू रैक', 'શૂ રેક'],
    h1: ['Shoe Racks and Shoe Cabinets in Bopal, Ahmedabad', 'बोपल, अहमदाबाद में शू रैक और शू कैबिनेट', 'બોપલ, અમદાવાદમાં શૂ રેક અને શૂ કેબિનેટ'],
    title: ['Shoe Racks and Shoe Cabinets in Ahmedabad | Patel Selection', 'अहमदाबाद में शू रैक और शू कैबिनेट | पटेल सेलेक्शन', 'અમદાવાદમાં શૂ રેક અને શૂ કેબિનેટ | પટેલ સિલેક્શન'],
    desc: ['Small and big plastic shoe racks with doors from National at Patel Selection, Ambli-Bopal Road, Ahmedabad. Keep shoes tidy and dust-free. Call 97125 92905.', 'पटेल सेलेक्शन, अंबली-बोपल रोड, अहमदाबाद में नेशनल के दरवाज़े वाले छोटे और बड़े प्लास्टिक शू रैक। जूते साफ और धूल से दूर रखें। कॉल 97125 92905।', 'પટેલ સિલેક્શન, અંબલી-બોપલ રોડ, અમદાવાદમાં નેશનલના દરવાજાવાળા નાના અને મોટા પ્લાસ્ટિક શૂ રેક. બૂટ વ્યવસ્થિત અને ધૂળથી દૂર રાખો. કૉલ 97125 92905.'],
    intro: ['Shoes at the door make a home look untidy. A closed shoe rack keeps pairs in order, hides dust and keeps smells in. Patel Selection has a small and a big shoe rack from National, both with doors, so you can choose by the number of pairs your family has.', 'दरवाज़े पर बिखरे जूते घर को बिखरा दिखाते हैं। बंद शू रैक जोड़ियों को क्रम में रखता है, धूल से बचाता है और गंध अंदर रखता है। पटेल सेलेक्शन में नेशनल के दो दरवाज़े वाले शू रैक हैं, एक छोटा और एक बड़ा, ताकि आप परिवार की जोड़ियों के हिसाब से चुन सकें।', 'દરવાજે વેરવિખેર બૂટ ઘરને અવ્યવસ્થિત બતાવે છે. બંધ શૂ રેક જોડીઓને ક્રમમાં રાખે છે, ધૂળથી બચાવે છે અને ગંધ અંદર રાખે છે. પટેલ સિલેક્શનમાં નેશનલના બે દરવાજાવાળા શૂ રેક છે, એક નાનો અને એક મોટો, જેથી તમે પરિવારની જોડી પ્રમાણે પસંદ કરી શકો.'],
    features: [
      ['Doors keep dust and smell inside', 'Several shelves hold many pairs, with room for slippers and sandals', 'Rust-free and easy to wipe', 'Smooth edges and a safe door lock, as shown on the maker’s picture'],
      ['दरवाज़े धूल और गंध को अंदर रखते हैं', 'कई शेल्फ में ढेर सारी जोड़ियां, चप्पल-सैंडल की जगह भी', 'जंग नहीं लगती और पोंछना आसान', 'निर्माता की फोटो के अनुसार चिकने किनारे और सुरक्षित डोर लॉक'],
      ['દરવાજા ધૂળ અને ગંધ અંદર રાખે છે', 'ઘણી શેલ્ફમાં ઘણી જોડીઓ, ચંપલ-સેન્ડલ માટે જગ્યા પણ', 'કાટ લાગતો નથી અને લૂછવામાં સહેલું', 'ઉત્પાદકના ફોટા મુજબ લીસા કિનારા અને સુરક્ષિત ડોર લૉક'],
    ],
    uses: [['Near the main door', 'Passage and lobby', 'Shop and clinic entrance', 'Hostel and PG', 'Temple and school entrance'], ['मुख्य दरवाज़े के पास', 'गलियारा और लॉबी', 'दुकान और क्लिनिक का प्रवेश', 'हॉस्टल और पीजी', 'मंदिर और स्कूल का प्रवेश'], ['મુખ્ય દરવાજા પાસે', 'પેસેજ અને લોબી', 'દુકાન અને ક્લિનિકનો પ્રવેશ', 'હૉસ્ટેલ અને પીજી', 'મંદિર અને શાળાનો પ્રવેશ']],
    care: [['Let shoes dry before keeping them inside', 'Wipe the shelves with a damp cloth once a week', 'Keep a sachet or dry neem leaves inside to stay fresh'], ['जूते सूखने के बाद ही अंदर रखें', 'हफ्ते में एक बार शेल्फ को गीले कपड़े से पोंछें', 'ताज़गी के लिए अंदर सैशे या सूखी नीम की पत्ती रखें'], ['બૂટ સુકાયા પછી જ અંદર મૂકો', 'અઠવાડિયે એક વાર શેલ્ફ ભીના કપડાથી લૂછો', 'તાજગી માટે અંદર સૅશે કે સૂકા લીમડાનાં પાન રાખો']],
    guide: [
      ['Count your pairs: a family of four usually needs the big rack, a couple can use the small one', 'Check the doorway: leave room so the doors open fully', 'Think about tall shoes: boots and sports shoes need taller shelves', 'Choose a colour close to your door or wall'],
      ['जोड़ियां गिनें: चार लोगों के परिवार को आम तौर पर बड़ा रैक चाहिए, दो लोग छोटे रैक से काम चला सकते हैं', 'दरवाज़े की जगह देखें: दरवाज़े पूरे खुल सकें इतनी जगह छोड़ें', 'ऊंचे जूतों का ध्यान रखें: बूट और स्पोर्ट्स शूज़ को ऊंची शेल्फ चाहिए', 'दरवाज़े या दीवार से मिलता रंग चुनें'],
      ['જોડીઓ ગણો: ચાર લોકોના પરિવારને સામાન્ય રીતે મોટો રેક જોઈએ, બે લોકો નાના રેકથી ચલાવી શકે', 'દરવાજાની જગ્યા જુઓ: દરવાજા પૂરા ખુલી શકે તેટલી જગ્યા છોડો', 'ઊંચા બૂટનું ધ્યાન રાખો: બૂટ અને સ્પોર્ટ્સ શૂઝને ઊંચી શેલ્ફ જોઈએ', 'દરવાજા કે દીવાલ સાથે મળતો રંગ પસંદ કરો'],
    ],
    faqs: [
      { q: ['How many pairs does a shoe rack hold?', 'एक शू रैक में कितनी जोड़ियां आती हैं?', 'એક શૂ રેકમાં કેટલી જોડી સમાય?'], a: ['It depends on the size of the shoes and how you arrange them. Send us the number of pairs you have and we will suggest the small or the big rack.', 'यह जूतों के साइज़ और रखने के तरीके पर निर्भर है। आपके पास जितनी जोड़ियां हैं वह बताएं, हम छोटा या बड़ा रैक सुझा देंगे।', 'તે બૂટના સાઇઝ અને ગોઠવણી પર આધાર રાખે છે. તમારી પાસે કેટલી જોડી છે તે જણાવો, અમે નાનો કે મોટો રેક સૂચવીશું.'] },
      { q: ['Is the shoe rack lockable?', 'क्या शू रैक में लॉक है?', 'શું શૂ રેકમાં લૉક છે?'], a: ['National’s product picture for the big rack shows a safety lock. Ask us to confirm on the model in stock.', 'नेशनल की बड़े रैक की प्रोडक्ट फोटो में सेफ्टी लॉक दिखाया गया है। स्टॉक वाले मॉडल पर इसकी पुष्टि हमसे कर लें।', 'નેશનલના મોટા રેકના પ્રોડક્ટ ફોટામાં સેફ્ટી લૉક દર્શાવ્યું છે. સ્ટોકમાં રહેલા મોડલ પર તેની ખાતરી અમારી પાસેથી કરી લો.'] },
      { q: ['Do you deliver shoe racks?', 'क्या शू रैक की डिलीवरी होती है?', 'શું શૂ રેકની ડિલિવરી થાય છે?'], a: ['Yes, delivery is available with a charge confirmed when you order. Free delivery applies to orders of 10 or more chairs.', 'हां, डिलीवरी उपलब्ध है, चार्ज ऑर्डर के समय बताया जाता है। फ्री डिलीवरी 10 या ज्यादा कुर्सियों के ऑर्डर पर है।', 'હા, ડિલિવરી ઉપલબ્ધ છે, ચાર્જ ઓર્ડર વખતે જણાવાય છે. ફ્રી ડિલિવરી 10 કે વધુ ખુરશીના ઓર્ડર પર છે.'] },
    ],
    searches: [
      ['shoe rack price Ahmedabad', 'plastic shoe rack with door', 'shoe cabinet for home', 'big shoe rack plastic', 'small shoe rack', 'shoe stand near me', 'National shoe rack', 'shoe rack for main door'],
      ['शू रैक अहमदाबाद', 'दरवाज़े वाला शू रैक', 'जूते की अलमारी', 'बड़ा शू रैक प्लास्टिक', 'छोटा शू रैक', 'जूता स्टैंड', 'नेशनल शू रैक', 'shoe rack ka rate'],
      ['શૂ રેક અમદાવાદ', 'દરવાજાવાળો શૂ રેક', 'બૂટનું કબાટ', 'મોટો શૂ રેક પ્લાસ્ટિક', 'નાનો શૂ રેક', 'બૂટ સ્ટેન્ડ', 'નેશનલ શૂ રેક', 'shoe rack no bhav'],
    ],
  },
  'Step Stools': {
    name: ['Step Stools', 'स्टेप स्टूल', 'સ્ટેપ સ્ટૂલ'],
    one: ['Step Stool', 'स्टेप स्टूल', 'સ્ટેપ સ્ટૂલ'],
    short: ['Step Stools', 'स्टेप स्टूल', 'સ્ટેપ સ્ટૂલ'],
    h1: ['Plastic Step Stools in Bopal, Ahmedabad', 'बोपल, अहमदाबाद में प्लास्टिक स्टेप स्टूल', 'બોપલ, અમદાવાદમાં પ્લાસ્ટિક સ્ટેપ સ્ટૂલ'],
    title: ['Plastic Step Stools in Ahmedabad: 2-Step Stool | Patel Selection', 'अहमदाबाद में प्लास्टिक स्टेप स्टूल: 2 स्टेप | पटेल सेलेक्शन', 'અમદાવાદમાં પ્લાસ્ટિક સ્ટેપ સ્ટૂલ: 2 સ્ટેપ | પટેલ સિલેક્શન'],
    desc: ['Two-step plastic stools from National, Nilkamal and Seatex for kitchens, kids and reaching high shelves. From Rs. 999 at Patel Selection, Bopal, Ahmedabad. Call 97125 92905.', 'रसोई, बच्चों और ऊंची शेल्फ तक पहुंचने के लिए नेशनल, निलकमल और सीटेक्स के दो-स्टेप प्लास्टिक स्टूल। पटेल सेलेक्शन, बोपल, अहमदाबाद में Rs. 999 से। कॉल 97125 92905।', 'રસોડા, બાળકો અને ઊંચી શેલ્ફ સુધી પહોંચવા માટે નેશનલ, નીલકમલ અને સીટેક્સના બે-સ્ટેપ પ્લાસ્ટિક સ્ટૂલ. પટેલ સિલેક્શન, બોપલ, અમદાવાદમાં Rs. 999 થી. કૉલ 97125 92905.'],
    intro: ['A step stool is the safest way to reach the top kitchen shelf, hang a curtain or help a child wash hands. Our four step stools from National, Nilkamal and Seatex have two broad steps and a sturdy plastic body that is light to carry and easy to wipe.', 'रसोई की ऊपरी शेल्फ तक पहुंचने, पर्दा लगाने या बच्चे के हाथ धुलवाने के लिए स्टेप स्टूल सबसे सुरक्षित तरीका है। नेशनल, निलकमल और सीटेक्स के हमारे चार स्टेप स्टूल में दो चौड़ी सीढ़ियां और मजबूत प्लास्टिक बॉडी है, जो हल्की है और पोंछने में आसान।', 'રસોડાની ઉપરની શેલ્ફ સુધી પહોંચવા, પડદો લગાવવા કે બાળકના હાથ ધોવડાવવા સ્ટેપ સ્ટૂલ સૌથી સુરક્ષિત રીત છે. નેશનલ, નીલકમલ અને સીટેક્સના અમારા ચાર સ્ટેપ સ્ટૂલમાં બે પહોળા પગથિયાં અને મજબૂત પ્લાસ્ટિક બૉડી છે, જે હલકી અને લૂછવામાં સહેલી છે.'],
    features: [
      ['Two wide steps for a stable stance', 'Lightweight, easy to carry from room to room', 'Rust-free and wipe-clean, safe for wet kitchens and bathrooms', 'Can also be used as a seat for kids'],
      ['स्थिर खड़े होने के लिए दो चौड़ी सीढ़ियां', 'हल्का, एक कमरे से दूसरे में ले जाना आसान', 'जंग नहीं लगती, पोंछकर साफ; गीली रसोई और बाथरूम में सुरक्षित', 'बच्चों के बैठने के लिए भी इस्तेमाल हो सकता है'],
      ['સ્થિર ઊભા રહેવા બે પહોળા પગથિયાં', 'હલકું, એક રૂમથી બીજા રૂમમાં લઈ જવું સહેલું', 'કાટ લાગતો નથી, લૂછીને સાફ; ભીના રસોડા અને બાથરૂમમાં સુરક્ષિત', 'બાળકોને બેસવા માટે પણ વાપરી શકાય'],
    ],
    uses: [['Kitchen shelves', 'Bathroom', 'Kids’ wash-basin step', 'Wardrobe and curtain reach', 'Shop and godown'], ['रसोई की शेल्फ', 'बाथरूम', 'बच्चों के वॉश-बेसिन के लिए', 'अलमारी और पर्दे तक पहुंच', 'दुकान और गोदाम'], ['રસોડાની શેલ્ફ', 'બાથરૂમ', 'બાળકો માટે વૉશ-બેસિન પાસે', 'કબાટ અને પડદા સુધી પહોંચ', 'દુકાન અને ગોડાઉન']],
    care: [['Place on a flat dry floor before stepping on', 'Wipe off soap or oil so the steps are not slippery', 'One person at a time; do not stand on the top edge'], ['चढ़ने से पहले समतल सूखे फर्श पर रखें', 'साबुन या तेल पोंछ दें ताकि सीढ़ियां फिसलन वाली न रहें', 'एक बार में एक व्यक्ति; ऊपरी किनारे पर न खड़े हों'], ['ચઢતા પહેલાં સમતલ સૂકા ફર્શ પર મૂકો', 'સાબુ કે તેલ લૂછી નાખો જેથી પગથિયાં લપસણાં ન રહે', 'એક સમયે એક વ્યક્તિ; ઉપરની કિનારી પર ઊભા ન રહો']],
    guide: [
      ['Pick the height that suits your shelves: taller models reach further but take more space', 'Check the top step area for a firm foothold', 'Choose a model with a non-slip tread pattern', 'For kids, a lower and wider stool is steadier'],
      ['अपनी शेल्फ के हिसाब से ऊंचाई चुनें: ऊंचे मॉडल ज्यादा दूर पहुंचते हैं पर जगह ज्यादा लेते हैं', 'पैर टिकाने के लिए ऊपरी सीढ़ी का क्षेत्र मजबूत देखें', 'फिसलन रोकने वाले पैटर्न वाला मॉडल चुनें', 'बच्चों के लिए नीचा और चौड़ा स्टूल ज्यादा स्थिर रहता है'],
      ['તમારી શેલ્ફ પ્રમાણે ઊંચાઈ પસંદ કરો: ઊંચા મોડલ વધુ દૂર પહોંચે પણ વધુ જગ્યા લે', 'પગ ટેકવવા ઉપરના પગથિયાંનો ભાગ મજબૂત જુઓ', 'લપસતા અટકાવે તેવી પૅટર્નવાળું મોડલ પસંદ કરો', 'બાળકો માટે નીચું અને પહોળું સ્ટૂલ વધુ સ્થિર રહે'],
    ],
    faqs: [
      { q: ['What is the price of a plastic step stool?', 'प्लास्टिक स्टेप स्टूल की कीमत क्या है?', 'પ્લાસ્ટિક સ્ટેપ સ્ટૂલની કિંમત શું છે?'], a: ['Our listed prices run from Rs. 999 to Rs. 1,499. We confirm the final rate when you order.', 'हमारी लिस्टेड कीमतें Rs. 999 से Rs. 1,499 तक हैं। फाइनल रेट ऑर्डर के समय बताया जाता है।', 'અમારા લિસ્ટેડ ભાવ Rs. 999 થી Rs. 1,499 સુધી છે. ફાઇનલ ભાવ ઓર્ડર વખતે જણાવાય છે.'] },
      { q: ['Can children use a step stool?', 'क्या बच्चे स्टेप स्टूल इस्तेमाल कर सकते हैं?', 'શું બાળકો સ્ટેપ સ્ટૂલ વાપરી શકે?'], a: ['Yes, with an adult nearby. Choose a wide, low model and keep the floor dry.', 'हां, बड़े की निगरानी में। चौड़ा और नीचा मॉडल चुनें और फर्श सूखा रखें।', 'હા, મોટાની દેખરેખમાં. પહોળું અને નીચું મોડલ પસંદ કરો અને ફર્શ સૂકો રાખો.'] },
      { q: ['Is it safe in the bathroom?', 'क्या बाथरूम में सुरक्षित है?', 'શું બાથરૂમમાં સુરક્ષિત છે?'], a: ['Plastic does not rust, but wet soap makes any step slippery, so wipe the steps dry before using.', 'प्लास्टिक में जंग नहीं लगती, पर गीला साबुन किसी भी सीढ़ी को फिसलन वाला बना देता है, इसलिए इस्तेमाल से पहले सीढ़ियां सुखा लें।', 'પ્લાસ્ટિકમાં કાટ લાગતો નથી, પણ ભીનો સાબુ કોઈ પણ પગથિયાંને લપસણું બનાવે છે, એટલે વાપરતા પહેલાં પગથિયાં સૂકવી લો.'] },
    ],
    searches: [
      ['step stool plastic Ahmedabad', '2 step stool for kitchen', 'plastic stool price', 'Nilkamal stool', 'folding step ladder stool', 'kids bathroom stool', 'Seatex stool', 'plastic stool for kitchen shelf'],
      ['प्लास्टिक स्टेप स्टूल अहमदाबाद', 'रसोई के लिए 2 स्टेप स्टूल', 'प्लास्टिक स्टूल का रेट', 'निलकमल स्टूल', 'बच्चों का बाथरूम स्टूल', 'सीढ़ी वाला स्टूल', 'सीटेक्स स्टूल', 'stool ka bhav'],
      ['પ્લાસ્ટિક સ્ટેપ સ્ટૂલ અમદાવાદ', 'રસોડા માટે 2 સ્ટેપ સ્ટૂલ', 'પ્લાસ્ટિક સ્ટૂલનો ભાવ', 'નીલકમલ સ્ટૂલ', 'બાળકો માટે બાથરૂમ સ્ટૂલ', 'પગથિયાંવાળું સ્ટૂલ', 'સીટેક્સ સ્ટૂલ', 'stool no bhav'],
    ],
  },
}
