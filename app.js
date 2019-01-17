var readline = require('readline-sync');
//import file reading and writing functions
var file = require('./file')
var englishWords;
var lang;
var langArray = ['en','ta','te','hi'];
var specialTranslation = {
   "ask a question from {0}": {
       "value": "{0} से प्रश्न पूछें",
       "isContainRegex": true,
       "regex": "ask a question from "
   },
   "frequently asked questions on {0}" :"{0} पर अक्सर पूछे जाने वाले प्रश्न",
   "recently expired offers on similar cars in {0}": "{0} में इसी तरह की कारों पर हाल ही में समाप्त ऑफर",
   "offers on similar cars in {0}":"{0} में इसी तरह की कारों पर ऑफर",
   "save upto {0}": {
       "value": "{0} तक बचाएं",
       "isContainRegex": true,
       "regex": "save upto "
   },
   "{0} find the best deals on used {1}": {
       "value": "{0} यूज़्ड़ {1} पर सबसे अच्छी डील खोजें",
       "isContainRegex": true,
       "regex": " find the best deals on used "
   },
   "interest calculated at {0}": {
       "value": "{0} ब्याज दर ",
       "isContainRegex": true,
       "regex": "interest calculated at "
   },
   "on-road price in {0}": "ओन रोड कीमत {0} में",
   "recently asked user questions about {0}": "{0} के बारे में हाल ही में पूछे गए उपयोगकर्ता के प्रश्न",
   "{0} comparison with similar cars": "{0} की तुलना उसके जैसी कारों के साथ",
   "{0} car dealers in {1}": {
       "value": "{1} में {0} कार डीलर",
       "isContainRegex": true,
       "regex": " car dealers in "
   },
   "{0}on road price list in{1}": "{1} में {0} की ऑन-रोड कीमत",
   "compare prices of {0}": {
       "value": "{0} की कीमतों की तुलना करें",
       "isContainRegex": true,
       "regex": "compare prices of "
   },
   "things we don't like in {0}": "{0} में वे चीजें जो हमें पसंद नहीं हैं",
   "things we like in {0}": "{0} में वे चीजें जो हमें पसंद हैं",
   "{0}, automatic, diesel, {1}": "{0} , स्वचालित, डीज़ल, {1}",
   "{0}, manual, petrol, {1}": "{0} , मैन्युअल, पेट्रोल, {1}",
   "{0}, manual, diesel, {1}": "{0} , मैन्युअल, डीज़ल, {1}",
   "{0}, automatic, petrol, {1}": "{0} , स्वचालित, पेट्रोल, {1}",
   "{0} month waiting": "{0} महीने का इंतजार",
   "discount offers for {0}": {
       "value": "{0} के लिए डिस्काउंट ऑफर",
       "isContainRegex": true,
       "regex": "discount offers for "
   },
   "compare specs of {0}": {
       "value": "{0} के स्पेसिफिकेशन की तुलना करें",
       "isContainRegex": true,
       "regex": "compare specs of "
   },
   "explore images of {0}": {
       "value": "{0} की फोटो देखें",
       "isContainRegex": true,
       "regex": "explore images of "
   },
   "explore 360 view of {0}": {
       "value": "{0} का 360 व्यू देखें",
       "isContainRegex": true,
       "regex": "explore 360 view of "
   },
   "explore videos of {0}": {
       "value": "{0} का वीडियो देखें",
       "isContainRegex": true,
       "regex": "explore videos of "
   },
   "user reviews on {0}": {
       "value": "{0} पर उपयोगकर्ताओं के रिव्यु",
       "isContainRegex": true,
       "regex": "user reviews on "
   },
   "find faq of {0}":{
       "value": "{0} के अक्सर पूछे जाने वाले प्रश्न",
       "isContainRegex": true,
       "regex": "find faq of "
   },
   "{0} ownership cost": {
       "value": "{0} की ओनरशिप कॉस्ट",
       "regex": " ownership cost$"
   },
   "pros & cons of {0}": "{0} के फायदे और नुकसान",
   "{0} latest update": {
       "value": "{0} पर लेटेस्ट अपडेट",
       "regex": " latest update$"
   },
   "{0} engine & transmission": {
       "value": "{0} का इंजन और ट्रांसमिशन",
       "regex": " engine & transmission$"
   },
   "{0} on road price in {1}": "{0} की ओन रोड कीमत {1} में",
   "{0} price in {1}": "{1} में {0} कीमत",
   "key specs of {0}": "{0} के प्रमुख स्पेक्स",
   "specifications of {0}": "{0} के स्पेक्स",
   "360º view of {0}": "{0} का 360 व्यू",
   "expert review of {0}": "{0} एक्सपर्ट रिव्यु",
   "expected launch {0}": "अपेक्षित लॉन्च {0}",
   "view all offers  in {0}": "{0} में सभी ऑफ़र देखें",
   "{0} dealer in {1}": "{1} में {0} डीलर",
   "{0} service centers" : "{0} सर्विस सेंटर्स",
   "variant launched : {0}": "वेरिएंट लॉन्च : {0}",
   "variants launched : {0}": "वेरिएंट लॉन्च : {0}",
   "must read articles before buying {0}": "{0} खरीदने से पहले लेख जरूर पढ़े",
   "{0} interior & exterior images": "{0} के इंटीरियर और एक्सटेरियर के फोटो",
   "write a comment on {0}": "{0} पर टिप्पणी लिखें",
   "variants of {0}": "{0} के वेरिएंट",
   "get call from authorised {0}": "ऑथोराइज़्ड {0} से कॉल प्राप्त करें",
   "{0} interior images": {
       "value": "{0} के इंटीरियर की फोटो",
       "regex": " interior images$"
   },
   "{0} interior": {
       "value": "{0} इंटीरियर",
       "regex": " interior$"
   },
   "{0} exterior images": {
       "value": "{0} के एक्सटीरियर की फोटो",
       "regex": " exterior images$"
   },
   "{0} specs, features and price": "{0} के स्पेसिफिकेशन, फीचर और कीमत",
   "show less {0}": {
       "value": "{0} कम दिखाएं",
       "regex": "^show less "
   },
   "{0} news & reviews": {
       "value": "{0} न्यूज और रिव्यूज",
       "regex": " news & reviews$"
   },
   "latest reviews on {0}": {
       "value": "{0} नवीनतम रिव्यूज",
       "isContainRegex": true,
       "regex": "latest reviews on "
   },
   "{0} available cars":"{0} उपलब्ध कारें",
   "{0} available car":"{0} उपलब्ध कार",
   "{0} further research": {
       "value": "आगे खोजें {0}",
       //"isContainRegex": true,
       "regex": " further research$"
   },
   "view all {0}": {
       "value": "{0} सभी देखें",
       "isContainRegex": true,
       "regex": "^view all "
   },
   "on road price of {0}": {
       "value": "{0} ऑन रोड प्राइस पर",
       "isContainRegex": true,
       "regex": "^on road price of "
   },
   "cars between {0}": {
       "value": "{0} तक की कारें",
       "isContainRegex": true,
       "regex": "^cars between "
   },
   "cars under {0}": {
       "value": "{0} से कम",
       "isContainRegex": true,
       "regex": "^cars under "
   },
   "view cars by {0}": {
       "value": "{0} द्वारा कारें देखें",
       "regex": "^view cars by "
   },
   /* "cars with {0} mileage": {
       "value": "{0} माइलेज वाली कारें",
       "isContainRegex": true,
       "regex": "^cars with"
   }, */
   "research more on {0}": {
       "value": "{0} पर अधिक शोध",
       "isContainRegex": true,
       "regex": "^research more on "
   },

   "used cars in {0}": {
       "value": "{0} में पुरानी कारें",
       "isContainRegex": true,
       "regex": "^used cars in "
   },
   "{0} cars in {1}": {
       "value": "{1} में {0} की कारें",
       "isContainRegex": true,
       "regex": " cars in "
   },
   "discontinued {0}":{
       "value": "बंद {0}",
       "isContainRegex": true,
       "regex": "^discontinued "
   },
   "about {0}":{
       "value": "{0} के बारे में",
       "isContainRegex": true,
       "regex": "^about "
   },
   "{0} with search options": {
       "value": "खोज विकल्पों के साथ {0}",
       "isContainRegex": true,
       "regex": " with search options"
   },
   "hurry! only {0}":{
       "value": "जल्दी करो! {0}",
       "isContainRegex": true,
       "regex": "^hurry! only "

   },
   "{0} days left": {
       "value": "{0} दिन बाकि",
       "regex": " days left$"
   },
   "{0} days": {
       "value": "{0} दिन",
       "regex": " days$"
   },
   "{0} user reviews": {
       "value": "{0} यूजर रिव्यु",
       "isContainRegex": true,
       "regex": " user reviews$"
   },
   "{0} on road price": {
       "value": "{0} ऑन रोड प्राइस",
       "regex": " on road price$"
   },
   "{0} images and videos":"{0} फोटो और वीडियो",

   "{0} videos": {
       "value": "{0} वीडियो",
       "regex": " videos$"
   },
   "{0} colours": {
       "value": "{0} कलर",
       "isContainRegex": true,
       "regex": " colours$"
   },
   "{0} expert reviews": {
       "value": "{0} एक्सपर्ट रिव्यु",
       "regex": " expert reviews$"
   },
   "{0} spare parts cost": {
       "value": "{0} स्पेयर पार्ट्स की लागत",
       "regex": " spare parts cost$"
   },
   "explore brochures of {0}": {
       "value": "{0} के ब्रोशर का पता लगाएं",
       "isContainRegex": true,
       "regex": "^explore brochures of "
   },
   "find spare parts cost of {0}": {
       "value": "{0} की स्पेयर पार्ट्स की लागत का पता लगाएं",
       "isContainRegex": true,
       "regex": "^find spare parts cost of "
   },
   "find service cost of {0}": {
       "value": "{0} की सेवा लागत का पता लगाएं",
       "isContainRegex": true,
       "regex": "^find service cost of "
   },
   "to consider {0}": {
       "value": "{0} विचार करे",
       "isContainRegex": true,
       "regex": "^to consider "
   },
   "approximate service cost for {0}": {
       "value": "{0} के लिए अनुमानित सेवा लागत",
       "isContainRegex": true,
       "regex": "^approximate service cost for "
   },
   "{0} service cost {1}":"{0} सर्विस कॉस्ट {1}",
   "{0} service cost": {
       "value": "{0} सर्विस कॉस्ट",
       "regex": " service cost$"
   },
   "{0} spareparts": {
       "value": "{0} स्पेयर पार्ट",
       "regex": " spareparts$"
   },
   "{0} spare parts": {
       "value": "{0} स्पेयर पार्ट",
       "regex": " spare parts$"
   },
   "{0} faq": {
       "value": "{0} के बारे में अक्सर पूछे जाने वाले प्रश्न",
       "regex": " faq$"
   },
   "{0} emi calculator": {
       "value": "{0} ईएमआई कैलकुलेटर",
       "regex": " emi calculator$"
   },

   "{0} brochures": {
       "value": "{0} ब्रोशर",
       "isContainRegex": true,
       "regex": " brochures$"
   },
   "download {0}": {
       "value": "{0} डाउनलोड",
       "regex": "^download "
   },
   "{0} dealers": {
       "value": "{0} डीलर",
       "isContainRegex": true,
       "regex": " dealers$"
   },
   "{0} loan": {
       "value": "{0} लोन",
       "regex": " loan$"
   },
   "{0} mileage": {
       "value": "{0} माइलेज",
       "regex": " mileage$"
   },
   "{0} specs": {
       "value": "{0} स्पेसिफिकेशन",
       "regex": " specs$"
   },
   "{0} images": {
       "value": "{0} फोटो",
       "isContainRegex": true,
       "regex": " images$"
   },
   "{0} specifications": {
       "value": "{0} स्पेसिफिकेशन",
       "regex": " specifications$"
   },
   "{0} features": {
       "value": "{0} फीचर",
       "regex": " features$"
   },
   "{0} variants": {
       "value": "{0} वेरिएंट",
       "regex": " variants$"
   },
   "{0} variant": {
       "value": "{0} वेरिएंट",
       "regex": " variant$"
   },
   "check {0}": {
       "value": "जांचे {0}",
       "isContainRegex": true,
       "regex": "^check "
   },
   "view {0}": {
       "value": "{0} देखें",
       "isContainRegex": true,
       "regex": "^view "
   },
   "{0} car models": {
       "value": "{0} कार मॉडल",
       "regex": " car models$"
   },
   "{0} lakh onwards": {
       "value": "{0} लाख से शुरू",
       "regex": " lakh onwards$"
   },
   "latest reviews {0}": {
       "value": "लेटेस्ट रिव्यु {0}",
       "regex": "^latest reviews "
   },
   "latest {0}": {
       "value": "नई {0}",
       "isContainRegex": true,
       "regex": "^latest "
   },
   "load {0}": {
       "value": "{0} देखें",
       "isContainRegex": true,
       "regex": "^load "
   },


   "{0} finance offers":" {0} फाइनेंस ऑफ़र",

   "{0} more offer": {
       "value": "{0} और ऑफ़र",
       "regex": " more offer$"
   },
   "{0} more offers": {
       "value": "{0} और ऑफ़र",
       "regex": " more offers$"
   },
   "{0} offers": {
       "value": "{0} ऑफर",
       "regex": " offers$"
   },
   "{0} offer": {
       "value": "{0} ऑफर",
       "regex": " offer$"
   },
   "{0} 360 view": {
       "value": "{0} 360 डिग्री व्यू",
       "regex": " 360 view$"
   },
   "{0} expert review": {
       "value": "{0} एक्सपर्ट रिव्यु",
       "regex": " expert review$"
   },
   "{0} 360": {
       "value": "{0} 360",
       "regex": " 360$"
   },
   "{0} car insurance": {
       "value": "{0} कार इनश्योरेंस",
       "regex": " car insurance$"
   },
   "{0} news": {
       "value": "{0} न्यूज़",
       "regex": " news$"
   },
   "trending {0}": {
       "value": "ट्रेंडिंग {0}",
       "isContainRegex": true,
       "regex": "^trending "
   },
   "most helpful reviews {0}": {
       "value": "सबसे उपयोगी रिव्यु {0}",
       "regex": "^most helpful reviews "
   },
   "market value of {0}": {
       "value": "{0} का बाजार मूल्य",
       "regex": "^market value of "
   },
   "interested in buying {0}": {
       "value": "{0} को खरीदने के इच्छुक हैं",
       "regex": "^interested in buying "
   },
   "{0} road test": {
       "value": "{0} रोड टेस्ट",
       "regex": " road test$"
   },
   "{0} review": {
       "value": "{0} रिव्यु",
       "regex": " review$"
   },
   "{0} pictures": {
       "value": "{0} तस्वीरें",
       "regex": " pictures$"
   },
   "{0} service centers": {
       "value": "{0} सर्विस सेंटर",
       "regex": " service centers$"
   },
   "{0} service center": {
       "value": "{0} सर्विस सेंटर",
       "regex": " service center$"
   },
   "{0} reviews": {
       "value": "{0} रिव्यूज",
       "regex": " reviews$"
   },
   "{0} design highlights": {
       "value": "{0} डिज़ाइन हाइलाइट",
       "regex": " design highlights$"
   },
   "{0} seater": {
       "value": "{0} सीटर",
       "isContainRegex": true,
       "regex": " seater$"
   },
   "{0} car workshop in nearest cities": "निकटतम शहरों में {0} कार कार्यशाला",
   "{0} car showrooms in nearest cities": {
       "value": "नजदीकी शहरों में {0} कार के शोरूम",
       "regex": " car showrooms in nearest cities$"
   },
   "{0} car dealers and showrooms": {
       "value": "{0} कार डीलर्स और शोरूम",
       "regex": " car dealers and showrooms$"
   },
   "{0} cars dealers and showrooms  in {1}": {
       "value": "{0} कार डीलर्स और शोरूम {1} में",
       "regex": " cars dealers and showrooms  in "
   },
   // "Used {0} Cars in {1}": {
   //     "value": "{0} कार डीलर्स और शोरूम {1} में",
   //     "regex": " cars dealers and showrooms  in "
   // },
   "upcoming {0}": {
       "value": "जल्द आने वाली {0}",
       "isContainRegex": true,
       "regex": "^upcoming "
   },
   "popular {0}": {
       "value": "पॉपुलर {0}",
       "isContainRegex": true,
       "regex": "^popular "
   },
   "rating of {0}": {
       "value": "{0} की रेटिंग",
       "regex": "^rating of "
   },
   "{0} views": {
       "value": "{0} व्यूज़",
       "regex": " views$"
   },
   "cars below {0}": {
       "value": "{0} से नीचे की कारें",
       "isContainRegex": true,
       "regex": "^cars below "
   },
   "best {0}": {
       "value": "सर्वश्रेष्ठ {0}",
       "isContainRegex": true,
       "regex": "^best "
   },
   "{0} used cars": {
       "value": "{0} पुरानी कारें",
       "regex": " used cars$"
   },
   "{0} cars": {
       "value": "{0} कारें",
       "regex": " cars$"
   },
   "{0} cr": {
       "value": "{0} करोड़",
       "regex": " cr$"
   },
   "{0} lakh": {
       "value": "{0} लाख",
       "isContainRegex": true,
       "regex": " lakh$"
   },
   "{0} lakh - {1}": {
       "value": "{0} लाख - {1}",
       "regex": " lakh - "
   },
   "{0} price": {
       "value": "{0} कीमत",
       "regex": " price$"
   },
   "{0} for {1}": {
       "value": "{0} के लिए {1}",
       "isContainRegex": true,
       "regex": " for "
   },
   "{0} months": {
       "value": "{0} महीने",
       "regex": " months$"
   },
   "{0} comment": {
       "value": "{0} कमेंट",
       "regex": " comment$"
   },
   "{0} comments": {
       "value": "{0} कमेंट",
       "regex": " comments$"
   },
   "search by {0}": {
       "value": "{0} द्वारा खोजें",
       "regex": "^search by "
   },
   "{0} offers available": {
       "value": "{0} ऑफ़र उपलब्ध हैं",
       "regex": " offers available$"
   },
   "{0} offers in {1}": {
       "value": "{1} में {0} ऑफर ",
       "isContainRegex":true,
       "regex": " offers in "
   },
   "{0} january":"{0} जनवरी",
   "{0} february": "{0} फरवरी",
   "{0} march": "{0} मार्च",
   "{0} april": "{0} अप्रैल",
   "{0} may": "{0} मई",
   "{0} june": "{0} जून",
   "{0} july": "{0} जुलाई",
   "{0} august": "{0} अगस्त",
   "{0} september": "{0} सितंबर",
   "{0} october": "{0} अक्टूबर",
   "{0} november": "{0} नवंबर",
   "{0} december": "{0} दिसंबर",
   "updated on {0}": "{0} को अपडेट किया गया",
   "{0} (reg)": "{0} (रजि।)",
   "{0} offers on {1}": {
       "value": "{1} पर {0} ऑफर",
       "regex": " offers on "
   },
   "{0} offer available": {
       "value": "{0} ऑफ़र उपलब्ध हैं",
       "regex": " offer available$"
   },
   "{0} comparison": {
       "value": "{0} तुलना",
       "isContainRegex": true,
       "regex": " comparison$"
   },
   "{0} showrooms in {1}": {
       "value": "{0} के शोरूम {1} में",
       "isContainRegex": true,
       "regex": " showrooms in "
   },
   "{0} dealers in {1}": {
       "value": "{0} डीलर्स {1} में",
       "isContainRegex": true,
       "regex": " dealers in "
   },
   "compare mileage of {0}":{
       "value": "{0} के माइलेज की तुलना करें",
       "isContainRegex": true,
       "regex": "^compare mileage of "
   },
   "{0} vs {1}": "{0} बनाम {1}",
   "{0} alternatives": {
       "value": "{0} विकल्प",
       "regex": " alternatives$"
   },
   "used {0}": {
       "value": "यूज़्ड़ {0}",
       "isContainRegex": true,
       "regex": "^used "
   },

   "{0} owners": {
       "value": "{0} ओनर्स",
       "regex": " owners$"
   },
   "{0} top model": {
       "value": "{0} शीर्ष मॉडल",
       "regex": " top model$"
   },
   "budget {0}": {
       "value": "{0} बजट",
       "isContainRegex": true,
       "regex": "^budget "
   },
   "certified {0}": {
       "value": "प्रमाणित {0}",
       "isContainRegex": true,
       "regex": "^certified "
   },
   "almost new {0}": {
       "value": "लगभग नई {0}",
       "isContainRegex": true,
       "regex": "^almost new "
   },
   "mileage of {0}": {
       "value": "{0} का माइलेज",
       "regex": "^mileage of "
   },
   "{0} maintenance cost": {
       "value": "{0} अनुरक्षण लागत",
       "regex": " maintenance cost$"
   },
   "find {0}": {
       "value": "{0} खोजें",
       "isContainRegex": true,
       "regex": "^find "
   },
   "{0} at lowest prices in your city": {
       "value": "अपने शहर में सबसे कम कीमतों पर {0}",
       "regex": " at lowest prices in your city$"
   },

   "{0} spare parts price list": {
       "value": "{0} स्पेयर पार्ट्स की मूल्य सूची",
       "regex": " spare parts price list$"
   },
   "service & maintenance schedule of {0}": {
       "value": "{0} की सेवा और रखरखाव अनुसूची",
       "regex": "^service & maintenance schedule of "
   },

   "calculate based on  {0}": {
       "value": "{0} के आधार पर गणना",
       "regex": "^calculate based on  "
   },
   "list of all {0}": {
       "value": "सभी {0} की सूची",
       "isContainRegex": true,
       "regex": "^list of all "
   },
   "{0} services & kms/months whichever is applicable": {
       "value": "{0} सेवाएं और किलोमीटर / महीने जो भी लागू हो",
       "regex": " services & kms/months whichever is applicable$"
   },
   "{0} in {1}": {
       "value": "{1} में {0}",
       "isContainRegex": true,
       "regex": " in "
   },
   "{0} year":"{0} वर्ष",
   "on {0}": {
       "value": "{0} पर",
       "isContainRegex": true,
       "regex": "^on "
   },
   "{0} :- get saving up to {1}": "{1} तक की बचत प्राप्त करें {0}",
   "swift {0}": "स्विफ्ट {0}",
   "{0}/{1}":"{0}/{1}",
   "{0} more":"{0} और",
   "select {0}": {
       "value": "{0} चुनें",
       "regex": "^select "
   },
   "{0} parts": {
       "value": "{0} पार्ट्स",
       "regex": " parts$"
   },
   "other {0}": {
       "value": "अन्य {0}",
       "regex": "^other "
   }
 }
var newTranslations={
  "ask a question from {0}": "{0} నుండి ఒక ప్రశ్నను అడగండి",
  "save upto {0}": "{0} వరకు సేవ్ చేయండి",
  "{0} find the best deals on used {1}": "{0} ఉపయోగించిన ఉత్తమ ఒప్పందాలను కనుగొనండి",
  "interest calculated at {0}": "{0} వద్ద లెక్కించబడిన వడ్డీ",
  "recently asked user questions about {0}": "ఇటీవల {0} గురించి వినియోగదారులు ప్రశ్నలను అడిగారు",
  "{0} comparison with similar cars": "{0} ఇలాంటి కార్లుతో సరిపోల్చండి",
  "{0} car dealers in {1}": "{0} {1}లో కార్ డీలర్లు",
  "{0}on road price list in{1}": "{0} {1}లో ఆన్ రోడ్ ధరల జాబితా",
  "compare prices of {0}": "{0} యొక్క ధరలను సరిపోల్చండి",
  "compare specs of {0}": "{0} యొక్క నిర్ధేశాలను సరిపోల్చండి",
  "explore images of {0}": "{0} యొక్క చిత్రాలను అన్వేషించండి",
  "explore 360 view of {0}": "{0} యొక్క 360 దృశ్యాన్ని అన్వేషించండి",
  "explore videos of {0}": "{0} యొక్క వీడియోలు అన్వేషించండి",
  "user reviews on {0}": "{0} యొక్క వినియోగదారుని సమీక్షలు",
  "{0} ownership cost": "{0} లో యాజమాన్యం ఖర్చు",
  "pros & cons of {0}": "{0} యొక్క అనుకూలతలు & ప్రతికూలతలు",
  "{0} latest update": "{0} తాజా నవీకరణ",
  "{0} engine & transmission": "{0} ఇంజిన్ & ట్రాన్స్మిషన్",
  "key specs of {0}": "{0} యొక్క కిలకమైన నిర్ధేశాలు",
  "specifications of {0}": "{0} యొక్క నిర్ధేశాలు",
  "360º view of {0}": "{0} యొక్క 360º వీక్షణ",
  "expert review of {0}": "{0} యొక్క నిపుణుడి సమీక్ష",
  "expected launch {0}": "{0} ఊహించిన పరిచయం",
  "{0} dealer in {1}": "{0} {1} లో డీలర్",
  "must read articles before buying {0}": "{0} కొనుగోలు ముందు కథనాలను చదవాలి",
  "{0} price in {1}": "{0} {1} లో ధర",
  "{0} interior & exterior images": "{0} లోపలి & బాహ్య చిత్రాలు",
  "write a comment on {0}": "{0} వ్యాఖ్యానం వ్రాయండి",
  "variants of {0}": "{0} యొక్క వేరియంట్లు",
  "get call from authorised {0}": "{0} అధికారం నుండి కాల్ ను పొందండి",
  "{0} interior images": "{0} లోపలి చిత్రాలు",
  "{0} specs, features and price": "{0} నిర్ధేశాలు, లక్షణాలు మరియు ధర",
  "show less {0}": "{0} తక్కువ చూపించు",
  "view all {0}": "{0} అన్నింటిని చూపండి",
  "used cars in {0}": "{0} లో ఉపయోగించిన కార్లు",
  "{0} days left": "{0} రోజులు మిగిలి ఉన్నాయి",
  "{0} days": "{0} రోజులు",
  "{0} user reviews": "{0} వినియోగదారుని సమీక్షలు",
  "{0} videos": "{0} వీడియోలు",
  "{0} colours": "{0} రంగులు",
  "{0} expert reviews": "{0} నిపుణుడి సమీక్షలు",
  "{0} service cost": "{0} సర్వీస్ ఖర్చు",
  "{0} spareparts": "{0} స్పేర్ పార్ర్ట్లు",
  "{0} faq": "{0} తరచుగా అడిగే ప్రశ్నలు",
  "{0} emi calculator": "{0} ఈఎంఐ కాలిక్యులేటర్",
  "{0} brochures": "{0} బ్రోచర్లు",
  "{0} dealers": "{0} డీలర్స్",
  "{0} loan": "{0} రుణం",
  "{0} mileage": "{0} మైలేజ్",
  "{0} images": "{0} చిత్రాలు",
  "{0} specifications": "{0} నిర్ధేశాలు",
  "{0} features": "{0} లక్షణాలు",
  "{0} variants": "{0} వేరియంట్లు",
  "check {0}": "తనిఖీ {0}",
  "view {0}": "వీక్షించండి {0}",
  "{0} offers": "{0} ఆఫర్లు",
  "{0} offer": "{0} ఆఫర్",
  "{0} 360 view": "{0} 360 వీక్షణ",
  "{0} expert review": "{0} నిపుణుడి సమీక్ష",
  "{0} 360": "{0} 360",
  "{0} car insurance": "{0} కారు భీమా",
  "{0} news": "{0} వార్తలు",
  "trending {0}": "ట్రెండింగ్ {0}",
  "{0} road test": "{0} రహదారి పరీక్ష",
  "{0} review": "{0} సమీక్ష",
  "{0} design highlights": "{0} డిజైన్ ముఖ్యాంశాలు",
  "popular {0}": "జనాదరణ పొందిన {0}",
  "{0} used cars": "{0} ఉపయోగించిన కార్లు",
  "{0}cars": "{0} కార్లు",
  "{0} price": "{0} ధర",
  "{0} for {1}": "{0} కోసం {1}",
  "{0} months": "{0} నెలలు",
  "{0} comparison": "{0} పోలిక",
  "{0} vs {1}": "{0} వర్సెస్ {1}",
  "{0} alternatives": "{0} ప్రత్యామ్నాయాలు",
  "used {0}": "ఉపయోగించిన {0}",
  "{0} owners": "{0} యజమానులు",
  "{0} in {1}": "{0} లో {0}"
}
// findPrimaryColors = function(colorsJson){
//   for(var i in colorsJson){
//     if(colorsJson[i]>9)
//       console.log(JSON.stringify(i)+ ',');
//   }
// }

// var menu = function(t,d){
//     //console.log(specialTranslation,teluguTranslatiosn);
//   // console.log(t,d);
//   // console.log(t,d);
//   //  console.log(specialTranslation,newTranslations);
//     //file.write(specialTranslation,newTranslations);
//     file.write(t)
//   //  findPrimaryColors(t);
//     //file.write(t,d);
//   //  englishWords  = englishWords1;
//     //lang = readline.question('enter the lang you want to translate english file into json');
//     //authenticate();
//
// }
//menu();
//convert json file into txt and find out primary colors
//file.read('colors.json',menu);
var MakeJson = function(choice){
  file.read('onlyKeys.txt',choice,function(t){
    file.read('hindi.txt',choice,function(d){
      file.write(t,choice,d);
    });
  });
}
var generateSpecialTranslations = function(choice){
  file.read('hindiSpecial.json',choice,function(t){
    file.read('newJson.json',choice,function(d){
      file.write(t,choice,d);
    });
  });
}
var removeDuplicateKeys = function(choice){
  file.read('translation.json',choice,function(t){
    var newJson={};
    for(i in t){
        newJson[i.toLowerCase()] = t[i];
      }
    file.write(newJson,choice);
  });
}
var extractKey = function(choice){
  file.read('optimize.json',choice,function(t){
    var onlyKeys = " "
    for(key in t){
      onlyKeys+=key+'\n';
    }
    file.write(onlyKeys,choice);
  })

}
// const ordered = {};
// Object.keys(unordered).sort().forEach(function(key) {
//   ordered[key] = unordered[key];
// });
var removeEmptyKeyFromArray =function(tempKeys){
        var finalArray=[];
        if(tempKeys.length>0){
                    for(let i in tempKeys){
                        if (tempKeys[i].length <= 0) {
                            continue;
                        }
                        finalArray.push(tempKeys[i]);
                    }
                }
        return finalArray;
    }
var extractBrandAndModel = function(choice){
  const ordered = {};
  file.read('brandAndModel.json',choice,function(t){
    Object.keys(t).sort().forEach(function(key) {
      ordered[key] = t[key];
    });
    var brandAndModel ={};
      for(var key in ordered){
          if(!key.includes(" ")){
            brandAndModel[key] = ordered[key];
            continue;
          }
          var arrayKey = removeEmptyKeyFromArray(key.split(" "));

          var arrayVal = removeEmptyKeyFromArray(ordered[key].split(" "));
          for(var i in arrayKey){
            brandAndModel[arrayKey[i]]= arrayVal[i];
          }
        }
    //       var str = key;
    //       var val = ordered[key];
    //       for(var i in brandAndModel){
    //
    //         if(str.includes(brandAndModel[i])){
    //           str=str.replace(i+" ","");
    //           val = val.replace(brandAndModel[i]+" ","");
    //         }
    //         console.log(str);
    //       }
    //       console.log(str);
    //       if(!str.includes(" "))
    //         brandAndModel[str]=val;
    //     }
    file.write(brandAndModel,choice);
  })
}

var menu = function(){
  var choice = readline.question('enter choice \n 1.Make Json from two txt file \n 2.Generate special translation file \n 3.Remove Duplictae Keys and generate file\n 4.Extract keys from Json file\n 5.Extract space separated brand,model\n');
  if(choice==1)
    MakeJson(choice);
  if(choice==2)
    generateSpecialTranslations(choice);
  if(choice==3)
    removeDuplicateKeys(choice);
  if(choice==4)
    extractKey(choice);
  if(choice==5)
    extractBrandAndModel(choice);

}
menu();
