export type Language = "en" | "hi" | "mr" | "te" | "ta";

export interface Translations {
  appName: string;
  tagline: string;
  navDashboard: string;
  navRecommendation: string;
  navWeather: string;
  navDisease: string;
  navActionPlan: string;
  navFollowUp: string;
  selectLanguage: string;
  
  // Disease Doctor
  diseaseTitle: string;
  diseaseSubtitle: string;
  uploadTitle: string;
  uploadSubtitle: string;
  uploadPlaceholder: string;
  uploadButton: string;
  analyzingText: string;
  primaryDiagnosis: string;
  diseaseSummary: string;
  recommendedAction: string;
  predictionsBreakdown: string;
  reset: string;
  nonPlantErrorTitle: string;
  nonPlantErrorDesc: string;

  // Recommendation
  recTitle: string;
  recSubtitle: string;
  stateLabel: string;
  districtLabel: string;
  targetCropLabel: string;
  soilTypeLabel: string;
  waterLabel: string;
  seasonLabel: string;
  evaluateButton: string;
  manualCropLabel: string;
  manualCropPlaceholder: string;
  customCropOption: string;
  suitabilityScore: string;
  riskLevel: string;
  factorsTitle: string;

  // Common Crops
  crops: Record<string, string>;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: "KIsanIQ",
    tagline: "Don't just detect the problem. Decide what to do next.",
    navDashboard: "Dashboard",
    navRecommendation: "Crop Recommendation",
    navWeather: "Weather",
    navDisease: "Disease Doctor",
    navActionPlan: "Action Plan",
    navFollowUp: "Follow-up",
    selectLanguage: "Language / भाषा",

    diseaseTitle: "AI Disease Doctor 🔬",
    diseaseSubtitle: "Upload crop leaf photo for instant AI diagnosis & treatment.",
    uploadTitle: "Crop Leaf Upload",
    uploadSubtitle: "Upload a clear close-up photo of the affected plant leaf.",
    uploadPlaceholder: "Click to upload or drag & drop leaf photo",
    uploadButton: "Analyze Image 🔍",
    analyzingText: "Analyzing Leaf Image...",
    primaryDiagnosis: "Primary Diagnosis",
    diseaseSummary: "Disease Summary",
    recommendedAction: "Recommended Action",
    predictionsBreakdown: "Top ML Predictions Breakdown",
    reset: "Reset",
    nonPlantErrorTitle: "Invalid Image: No Crop Leaf Detected ⚠️",
    nonPlantErrorDesc: "The uploaded photo appears to be a non-agricultural image (e.g. jewelry, human face, document, or non-plant object). Please upload a clear photo of a crop leaf.",

    recTitle: "Crop Recommendation Engine 🌾",
    recSubtitle: "Evaluate crop suitability and risk based on soil, water, season, and climate.",
    stateLabel: "State",
    districtLabel: "District",
    targetCropLabel: "Target Crop",
    soilTypeLabel: "Soil Type",
    waterLabel: "Water Availability",
    seasonLabel: "Sowing Season",
    evaluateButton: "Re-evaluate Suitability",
    manualCropLabel: "Enter Custom Crop Name",
    manualCropPlaceholder: "e.g. Dragon Fruit, Vanilla, Stevia...",
    customCropOption: "✍️ Custom / Other (Type Manually)",
    suitabilityScore: "Suitability Score",
    riskLevel: "Risk Level",
    factorsTitle: "Suitability Factors Breakdown",

    crops: {
      cotton: "Cotton",
      rice: "Rice / Paddy",
      wheat: "Wheat",
      maize: "Maize / Corn",
      sugarcane: "Sugarcane",
      soybean: "Soybean",
      chickpea: "Chickpea / Gram",
      groundnut: "Groundnut / Peanut",
      mustard: "Mustard",
      tomato: "Tomato",
      potato: "Potato",
      onion: "Onion",
      chilli: "Chilli / Pepper",
      turmeric: "Turmeric",
      mango: "Mango",
      banana: "Banana",
      grapes: "Grapes",
      custom: "Custom / Other (Type Manually)"
    }
  },
  hi: {
    appName: "KIsanIQ (किसानIQ)",
    tagline: "केवल बीमारी न पहचानें। आगे क्या करना है, यह तय करें।",
    navDashboard: "डैशबोर्ड (Dashboard)",
    navRecommendation: "फसल सिफारिश (Crop Recommendation)",
    navWeather: "मौसम पूर्वानुमान (Weather)",
    navDisease: "बीमारी डॉक्टर (Disease Doctor)",
    navActionPlan: "कार्य योजना (Action Plan)",
    navFollowUp: "निगरानी (Follow-up)",
    selectLanguage: "भाषा चुनें (Language)",

    diseaseTitle: "AI फसल बीमारी डॉक्टर 🔬",
    diseaseSubtitle: "फसल के पत्ते की फोटो अपलोड करें और तुरंत सटीक इलाज पाएं।",
    uploadTitle: "पत्ते की फोटो अपलोड करें",
    uploadSubtitle: "प्रभावित फसल के पत्ते की साफ फोटो अपलोड करें।",
    uploadPlaceholder: "फोटो अपलोड करने के लिए क्लिक करें या खींचकर लाएं",
    uploadButton: "चित्र का विश्लेषण करें 🔍",
    analyzingText: "पत्ते का विश्लेषण हो रहा है...",
    primaryDiagnosis: "मुख्य बीमारी की पहचान",
    diseaseSummary: "बीमारी का विवरण",
    recommendedAction: "अनुशंसित इलाज व उपाय",
    predictionsBreakdown: "संभावित बीमारियों का प्रतिशत",
    reset: "पुनः सेट करें",
    nonPlantErrorTitle: "अमान्य फोटो: फसल का पत्ता नहीं मिला ⚠️",
    nonPlantErrorDesc: "अपलोड की गई फोटो फसल/पत्ते की नहीं है (जैसे गहने, चेहरा या अन्य वस्तु)। कृपया फसल के पत्ते की साफ फोटो अपलोड करें।",

    recTitle: "फसल सिफारिश इंजन 🌾",
    recSubtitle: "मिट्टी, पानी, मौसम और जलवायु के आधार पर अपनी फसल की उपयुक्तता जांचें।",
    stateLabel: "राज्य (State)",
    districtLabel: "जिला (District)",
    targetCropLabel: "चुनी गई फसल",
    soilTypeLabel: "मिट्टी का प्रकार",
    waterLabel: "पानी की उपलब्धता",
    seasonLabel: "बुवाई का मौसम",
    evaluateButton: "उपयुक्तता की पुनः जांच करें",
    manualCropLabel: "अपनी फसल का नाम दर्ज करें",
    manualCropPlaceholder: "जैसे: ड्रैगन फ्रूट, स्टीविया, मशरूम...",
    customCropOption: "✍️ अन्य फसल (खुद नाम लिखें)",
    suitabilityScore: "उपयुक्तता स्कोर",
    riskLevel: "जोखिम स्तर (Risk Level)",
    factorsTitle: "उपयुक्तता कारणों का विवरण",

    crops: {
      cotton: "कपास (Cotton)",
      rice: "धान / चावल (Rice)",
      wheat: "गेहूं (Wheat)",
      maize: "मक्का (Maize)",
      sugarcane: "गन्ना (Sugarcane)",
      soybean: "सोयाबीन (Soybean)",
      chickpea: "चना (Chickpea)",
      groundnut: "मूंगफली (Groundnut)",
      mustard: "सरसों (Mustard)",
      tomato: "टमाटर (Tomato)",
      potato: "आलू (Potato)",
      onion: "प्याज़ (Onion)",
      chilli: "मिर्च (Chilli)",
      turmeric: "हल्दी (Turmeric)",
      mango: "आम (Mango)",
      banana: "केला (Banana)",
      grapes: "अंगूर (Grapes)",
      custom: "✍️ अन्य फसल (खुद नाम लिखें)"
    }
  },
  mr: {
    appName: "KIsanIQ (किसानIQ)",
    tagline: "फक्त रोग शोधू नका. पुढे काय करायचे ते ठरवा.",
    navDashboard: "डॅशबोर्ड (Dashboard)",
    navRecommendation: "पिक शिफारस (Crop Recommendation)",
    navWeather: "हवामान (Weather)",
    navDisease: "पिक रोग डॉक्टर (Disease Doctor)",
    navActionPlan: "कृती योजना (Action Plan)",
    navFollowUp: "पाठपुरावा (Follow-up)",
    selectLanguage: "भाषा निवडा (Language)",

    diseaseTitle: "AI पिक रोग डॉक्टर 🔬",
    diseaseSubtitle: "पिकाच्या पानाचा फोटो अपलोड करा आणि अचूक निदान व उपाय मिळवा.",
    uploadTitle: "पानाचा फोटो अपलोड करा",
    uploadSubtitle: "बाधित पिकाच्या पानाचा स्पष्ट फोटो अपलोड करा.",
    uploadPlaceholder: "फोटो अपलोड करण्यासाठी क्लिक करा",
    uploadButton: "निदान करा 🔍",
    analyzingText: "पानाचे विश्लेषण सुरू आहे...",
    primaryDiagnosis: "प्रमुख रोगाचे निदान",
    diseaseSummary: "रोगाची माहिती",
    recommendedAction: "सुचवलेले उपाय व औषधे",
    predictionsBreakdown: "संभाव्य रोगांचे प्रमाण",
    reset: "पुन्हा सुरू करा",
    nonPlantErrorTitle: "अवैध फोटो: पानाचा फोटो आढळला नाही ⚠️",
    nonPlantErrorDesc: "अपलोड केलेला फोटो पिकाचा नाही (उदा. दागिने, चेहरा किंवा इतर वस्तू). कृपया पिकाच्या पानाचा स्पष्ट फोटो अपलोड करा.",

    recTitle: "पिक शिफारस इंजिन 🌾",
    recSubtitle: "माती, पाणी आणि हवामानानुसार योग्य पिकाची निवड करा.",
    stateLabel: "राज्य (State)",
    districtLabel: "जिल्हा (District)",
    targetCropLabel: "निवडलेले पिक",
    soilTypeLabel: "मातीचा प्रकार",
    waterLabel: "पाण्याची उपलब्धता",
    seasonLabel: "पेरणीचा हंगाम",
    evaluateButton: "योग्यतेची तपासणी करा",
    manualCropLabel: "पिकाचे नाव टाका",
    manualCropPlaceholder: "उदा: ड्रॅगन फ्रूट, हळद...",
    customCropOption: "✍️ इतर पिक (स्वतः नाव लिहा)",
    suitabilityScore: "योग्यतेचे गुण (Suitability)",
    riskLevel: "धोक्याची पातळी (Risk)",
    factorsTitle: "योग्यतेचे घटक",

    crops: {
      cotton: "कापूस (Cotton)",
      rice: "भात / तांदूळ (Rice)",
      wheat: "गहू (Wheat)",
      maize: "मका (Maize)",
      sugarcane: "ऊस (Sugarcane)",
      soybean: "सोयाबीन (Soybean)",
      chickpea: "हरभरा / नाचणी (Chickpea)",
      groundnut: "भुईमूग / शेंगदाणा (Groundnut)",
      mustard: "मोहरी (Mustard)",
      tomato: "टोमॅटो (Tomato)",
      potato: "बटाटा (Potato)",
      onion: "कांदा (Onion)",
      chilli: "मिरची (Chilli)",
      turmeric: "हळद (Turmeric)",
      mango: "आंबा (Mango)",
      banana: "केळी (Banana)",
      grapes: "द्राक्षे (Grapes)",
      custom: "✍️ इतर पिक (स्वतः नाव लिहा)"
    }
  },
  te: {
    appName: "KIsanIQ (కిసాన్IQ)",
    tagline: "సమస్యను గుర్తించడమే కాదు. తదుపరి ఏమి చేయాలో నిర్ణయించండి.",
    navDashboard: "డాష్‌బోర్డ్ (Dashboard)",
    navRecommendation: "పంట రికమండేషన్ (Recommendation)",
    navWeather: "వాతావరణం (Weather)",
    navDisease: "తెగులు డాక్టర్ (Disease Doctor)",
    navActionPlan: "కార్యాచరణ ప్రణాళిక (Action Plan)",
    navFollowUp: "ఫాలో-అప్ (Follow-up)",
    selectLanguage: "భాష ఎంచుకోండి (Language)",

    diseaseTitle: "AI పంట తెగులు డాక్టర్ 🔬",
    diseaseSubtitle: "పంట ఆకు ఫోటో అప్‌లోడ్ చేసి తక్షణ నివారణ పొందండి.",
    uploadTitle: "ఆకు ఫోటో అప్‌లోడ్ చేయండి",
    uploadSubtitle: "బాధిత ఆకు స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.",
    uploadPlaceholder: "ఫోటో అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
    uploadButton: "విశ్లేషించండి 🔍",
    analyzingText: "ఆకు విశ్లేషించబడుతోంది...",
    primaryDiagnosis: "ప్రధాన తెగులు గుర్తింపు",
    diseaseSummary: "తెగులు వివరాలు",
    recommendedAction: "సిఫార్సు చేసిన నివారణ చర్యలు",
    predictionsBreakdown: "తెగుళ్ల శాతం",
    reset: "రీసెట్",
    nonPlantErrorTitle: "చెల్లని ఫోటో: ఆకు కనుగొనబడలేదు ⚠️",
    nonPlantErrorDesc: "అప్‌లోడ్ చేసిన ఫోటో పంట ఆకు కాదు (నగలు లేదా ముఖం కాదు). దయచేసి పంట ఆకు స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.",

    recTitle: "పంట సిఫార్సు ఇంజిన్ 🌾",
    recSubtitle: "నేల, నీరు మరియు వాతావరణం ఆధారంగా సరైన పంటను ఎంచుకోండి.",
    stateLabel: "రాష్ట్రం (State)",
    districtLabel: "జిల్లా (District)",
    targetCropLabel: "ఎంచుకున్న పంట",
    soilTypeLabel: "నేల రకం",
    waterLabel: "నీటి లభ్యత",
    seasonLabel: "పంట కాలం (Season)",
    evaluateButton: "మళ్లీ తనిఖీ చేయండి",
    manualCropLabel: "పంట పేరు నమోదు చేయండి",
    manualCropPlaceholder: "ఉదా: డ్రాగన్ ఫ్రూట్, పసుపు...",
    customCropOption: "✍️ ఇతర పంట (మాన్యువల్‌గా నమోదు చేయండి)",
    suitabilityScore: "అనుకూలత స్కోరు",
    riskLevel: "ప్రమాద స్థాయి (Risk Level)",
    factorsTitle: "అనుకూలత విశ్లేషణ",

    crops: {
      cotton: "పత్తి (Cotton)",
      rice: "వరి / బియ్యం (Rice)",
      wheat: "గోధుమ (Wheat)",
      maize: "జొన్న / మొక్కజొన్న (Maize)",
      sugarcane: "చెరకు (Sugarcane)",
      soybean: "సోయాబీన్ (Soybean)",
      chickpea: "శనగలు (Chickpea)",
      groundnut: "వేరుశనగ (Groundnut)",
      mustard: "ఆవాలు (Mustard)",
      tomato: "టమోటా (Tomato)",
      potato: "బంగాళాదుంప (Potato)",
      onion: "ఉల్లిపాయ (Onion)",
      chilli: "మిరపకాయ (Chilli)",
      turmeric: "పసుపు (Turmeric)",
      mango: "మామిడి (Mango)",
      banana: "అరటి (Banana)",
      grapes: "ద్రాక్ష (Grapes)",
      custom: "✍️ ఇతర పంట (మాన్యువల్‌గా నమోదు చేయండి)"
    }
  },
  ta: {
    appName: "KIsanIQ (கிசான்IQ)",
    tagline: "பிரச்சனையை மட்டும் கண்டறிய வேண்டாம். அடுத்து என்ன செய்வது என்று నిర్ణயியுங்கள்.",
    navDashboard: "டாஷ்போர்டு (Dashboard)",
    navRecommendation: "பயிர் பரிந்துரை (Recommendation)",
    navWeather: "வானிலை (Weather)",
    navDisease: "நோய் மருத்துவர் (Disease Doctor)",
    navActionPlan: "செயல் திட்டம் (Action Plan)",
    navFollowUp: "பின்தொடர்தல் (Follow-up)",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",

    diseaseTitle: "AI பயிர் நோய் மருத்துவர் 🔬",
    diseaseSubtitle: "பயிர் இலையின் புகைப்படத்தைப் பதிவேற்றி உடனடி தீர்வு பெறவும்.",
    uploadTitle: "இலை புகைப்படத்தைப் பதிவேற்றவும்",
    uploadSubtitle: "பாதிக்கப்பட்ட இலையின் தெளிவான புகைப்படத்தைப் பதிவேற்றவும்.",
    uploadPlaceholder: "புகைப்படத்தைப் பதிவேற்ற கிளிக் செய்யவும்",
    uploadButton: "ஆய்வு செய் 🔍",
    analyzingText: "இலை ஆய்வு செய்யப்படுகிறது...",
    primaryDiagnosis: "முதன்மை நோய் கண்டறிதல்",
    diseaseSummary: "நோய் விவரம்",
    recommendedAction: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
    predictionsBreakdown: "நோய்களின் சதவீதம்",
    reset: "ரீசெட்",
    nonPlantErrorTitle: "தவறான படம்: இலை கண்டறியப்படவில்லை ⚠️",
    nonPlantErrorDesc: "பதிவேற்றப்பட்ட படம் பயிர் இலையல்ல (நகைகள் அல்லது மனித முகம் போன்றவை). தயவுசெய்து தெளிவான பயிர் இலை புகைப்படத்தைப் பதிவேற்றவும்.",

    recTitle: "பயிர் பரிந்துரை இயந்திரம் 🌾",
    recSubtitle: "மண், நீர் மற்றும் காலநிலையின் அடிப்படையில் பொருத்தமான பயிரைத் தேர்ந்தெடுக்கவும்.",
    stateLabel: "மாநிலம் (State)",
    districtLabel: "மாவட்டம் (District)",
    targetCropLabel: "தேர்ந்தெடுக்கப்பட்ட பயிர்",
    soilTypeLabel: "மண் வகை",
    waterLabel: "நீர் उपलब्धता",
    seasonLabel: "பருவம் (Season)",
    evaluateButton: "மீண்டும் ஆய்வு செய்",
    manualCropLabel: "பயிரின் பெயரை உள்ளிடவும்",
    manualCropPlaceholder: "எ.கா: டிராகன் பழம், மஞ்சள்...",
    customCropOption: "✍️ மற்ற பயிர் (கைமுறையாக தட்டச்சு செய்யவும்)",
    suitabilityScore: "பொருத்தமான மதிப்பெண்",
    riskLevel: "அபாய நிலை",
    factorsTitle: "காரணிகள் பகுப்பாய்வு",

    crops: {
      cotton: "பருத்தி (Cotton)",
      rice: "நெல் / அரிசி (Rice)",
      wheat: "கோதுமை (Wheat)",
      maize: "சோளம் (Maize)",
      sugarcane: "கரும்பு (Sugarcane)",
      soybean: "சோயாபீன் (Soybean)",
      chickpea: "கொண்டைக்கடலை (Chickpea)",
      groundnut: "நிலக்கடலை (Groundnut)",
      mustard: "கடுகு (Mustard)",
      tomato: "தக்காளி (Tomato)",
      potato: "உருளைக்கிழங்கு (Potato)",
      onion: "வெங்காயம் (Onion)",
      chilli: "மிளகாய் (Chilli)",
      turmeric: "மஞ்சள் (Turmeric)",
      mango: "மாம்பழம் (Mango)",
      banana: "வாழை (Banana)",
      grapes: "திராட்சை (Grapes)",
      custom: "✍️ மற்ற பயிர் (கைமுறையாக தட்டச்சு செய்யவும்)"
    }
  }
};
