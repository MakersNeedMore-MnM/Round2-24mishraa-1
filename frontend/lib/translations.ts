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

  // Landing Page
  startAnalysis: string;
  howItWorks: string;
  heroSubtitle1: string;
  heroSubtitle2: string;
  heroDescription: string;
  heroBadge: string;
  problemTitle: string;
  problemBody: string;
  problemCard1: string;
  problemCard2: string;
  problemCard3: string;
  pipelineSub: string;
  pipeline1: string;
  pipeline2: string;
  pipeline3: string;
  pipeline4: string;
  pipeline5: string;
  pipeline6: string;
  capabilitiesTitle: string;
  cap1Desc: string;
  cap2Desc: string;
  cap3Desc: string;
  severityTitle: string;
  severityDesc: string;
  cap5Desc: string;
  cap6Desc: string;
  readyToStart: string;
  finalCtaSubtitle: string;
  footerText: string;

  // Farm Setup / Onboarding Page
  backLabel: string;
  setupTitle: string;
  setupSubtitle: string;
  basicInfoTitle: string;
  farmerNameLabel: string;
  farmerNamePlaceholder: string;
  locationTitle: string;
  selectStatePlaceholder: string;
  selectDistrictPlaceholder: string;
  firstSelectState: string;
  cropDetailsTitle: string;
  selectCropPlaceholder: string;
  cropStageLabel: string;
  cropStageHint: string;
  selectStagePlaceholder: string;
  soilWaterTitle: string;
  selectSoilPlaceholder: string;
  waterHint: string;
  selectWaterPlaceholder: string;
  submitFarmButton: string;
  submittingFarm: string;
  soilTestTitle: string;
  optionalBadge: string;
  soilTestHint: string;
  nitrogenLabel: string;
  phosphorusLabel: string;
  potassiumLabel: string;
  phLabel: string;
  updateLaterHint: string;

  // Common Crops & Options
  stages: Record<string, string>;
  soils: Record<string, string>;
  waterLevels: Record<string, string>;

  // Dashboard
  greeting: string;
  farmOverviewSub: string;
  farmLocation: string;
  cropLabel: string;
  stageLabel: string;
  soilLabel: string;
  waterLabel: string;
  todaysOverview: string;
  highestRisk: string;
  whatWouldYouLikeToDo: string;
  ready: string;
  getRecommendation: string;
  checkWeather: string;
  analyzeCrop: string;
  viewActions: string;
  trackProgress: string;

  // Disease Doctor
  diseaseTitle: string;
  diseaseSubtitle: string;
  uploadTitle: string;
  uploadSubtitle: string;
  uploadPlaceholder: string;
  uploadButton: string;
  takePhoto: string;
  chooseGallery: string;
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
  waterAvailabilityLabel: string;
  seasonLabel: string;
  evaluateButton: string;
  manualCropLabel: string;
  manualCropPlaceholder: string;
  customCropOption: string;
  suitabilityScore: string;
  riskLevel: string;
  factorsTitle: string;

  // Weather Page
  weatherTitle: string;
  weatherSubtitle: string;
  currentConditions: string;
  humidityLabel: string;
  windSpeedLabel: string;
  rainfallLabel: string;
  riskAlertsTitle: string;
  forecastTitle: string;

  // Action Plan Page
  actionTitle: string;
  actionSubtitle: string;
  actionProgress: string;
  tasksCompleted: string;
  recommendedSteps: string;
  timelineLabel: string;

  // Follow-up Page
  followupTitle: string;
  followupSubtitle: string;
  uploadFollowupTitle: string;
  uploadFollowupSub: string;
  compareButton: string;
  recoveryStatus: string;
  improvingStatus: string;
  stableStatus: string;
  worseningStatus: string;

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

    startAnalysis: "Start Farm Analysis",
    howItWorks: "How It Works",
    heroSubtitle1: "Don't just detect the problem.",
    heroSubtitle2: "Decide what to do next.",
    heroDescription: "Combining farm context, weather intelligence, and AI crop analysis to help farmers make informed decisions — from planting to follow-up.",
    heroBadge: "AI-POWERED FARMER DECISION SUPPORT",
    problemTitle: "The Problem",
    problemBody: "Most crop disease tools stop at detection. They tell you what the disease is — but not what to do about it. Without understanding severity, weather risk, and timing, detection alone isn't enough to protect your crop.",
    problemCard1: "Existing tools give you a disease name",
    problemCard2: "But not how severe it is or what to do",
    problemCard3: "And ignore weather, soil, and timing",
    pipelineSub: "From your farm data to actionable decisions — a complete pipeline.",
    pipeline1: "Farm Data",
    pipeline2: "Weather",
    pipeline3: "Crop Image",
    pipeline4: "AI Analysis",
    pipeline5: "Risk",
    pipeline6: "Decision",
    capabilitiesTitle: "Core Capabilities",
    cap1Desc: "Get crop suitability scores based on your soil, water availability, season, and expected weather — with transparent factor-by-factor breakdown.",
    cap2Desc: "Live weather data converted into farming-specific risk alerts — waterlogging risk, heat stress, dry spell warnings, and more.",
    cap3Desc: "Upload a crop leaf image for AI-powered disease classification with confidence scoring and estimated visible affected area.",
    severityTitle: "Severity Assessment",
    severityDesc: "Estimate the visible affected area of your crop using image analysis. Understand whether the situation is low, moderate, or high severity.",
    cap5Desc: "Context-aware recommendations: what to do now, what to monitor, and when to seek expert help — tailored to your crop, stage, and conditions.",
    cap6Desc: "Track your crop's recovery by comparing images over time. See whether conditions are improving, stable, or worsening.",
    readyToStart: "Ready to make better decisions for your farm?",
    finalCtaSubtitle: "Start with your farm profile. Get crop recommendations, weather alerts, and AI-powered disease analysis.",
    footerText: "Built by Team 24mishraa-1 for Morrow 1.0",

    backLabel: "Back",
    setupTitle: "Set Up Your Farm",
    setupSubtitle: "Tell us about your farm so we can provide relevant recommendations. Only a few fields are required.",
    basicInfoTitle: "Basic Information",
    farmerNameLabel: "Farmer Name",
    farmerNamePlaceholder: "Enter your name (optional)",
    locationTitle: "Location",
    selectStatePlaceholder: "Select your state",
    selectDistrictPlaceholder: "Select your district",
    firstSelectState: "First select your state",
    cropDetailsTitle: "Crop Details",
    selectCropPlaceholder: "Select your crop",
    cropStageLabel: "Crop Stage",
    cropStageHint: "What stage is your crop currently in?",
    selectStagePlaceholder: "Select current stage",
    soilWaterTitle: "Soil & Water",
    selectSoilPlaceholder: "Select soil type",
    waterHint: "How much irrigation water is available?",
    selectWaterPlaceholder: "Select water availability",
    submitFarmButton: "Create Farm Profile",
    submittingFarm: "Saving farm profile...",
    soilTestTitle: "Soil Test Values",
    optionalBadge: "Optional",
    soilTestHint: "If you have recent soil test results, entering them will improve crop recommendations.",
    nitrogenLabel: "Nitrogen (N)",
    phosphorusLabel: "Phosphorus (P)",
    potassiumLabel: "Potassium (K)",
    phLabel: "pH",
    updateLaterHint: "You can update your farm profile later.",

    stages: {
      Seedling: "Seedling / Sowing",
      Vegetative: "Vegetative Growth",
      Flowering: "Flowering / Fruiting",
      Fruiting: "Fruiting / Pod Formation",
      Harvest: "Maturation / Harvest",
    },
    soils: {
      Black: "Black Soil",
      Red: "Red Soil",
      Alluvial: "Alluvial Soil",
      Loamy: "Loamy Soil",
      Sandy: "Sandy Soil",
      Clay: "Clay Soil",
      Other: "Other Soil",
    },
    waterLevels: {
      Low: "Low (Rainfed / Limited)",
      Moderate: "Moderate (Canal / Borewell)",
      High: "High (Abundant Irrigation)",
    },
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
    },

    greeting: "Good day, Farmer",
    farmOverviewSub: "Here's your farm overview and tools.",
    farmLocation: "Farm Location",
    cropLabel: "Crop",
    stageLabel: "Stage",
    soilLabel: "Soil",
    waterLabel: "Water",
    todaysOverview: "Today's Overview",
    highestRisk: "HIGHEST RISK",
    whatWouldYouLikeToDo: "What would you like to do?",
    ready: "Ready",
    getRecommendation: "Get Recommendation →",
    checkWeather: "Check Weather →",
    analyzeCrop: "Analyze Crop →",
    viewActions: "View Actions →",
    trackProgress: "Track Progress →",

    diseaseTitle: "AI Disease Doctor 🔬",
    diseaseSubtitle: "Upload crop leaf photo for instant AI diagnosis & treatment.",
    uploadTitle: "Crop Leaf Upload",
    uploadSubtitle: "Upload a clear close-up photo of the affected plant leaf.",
    uploadPlaceholder: "Click to upload or drag & drop leaf photo",
    uploadButton: "Analyze Image 🔍",
    takePhoto: "📷 Take Photo (Camera)",
    chooseGallery: "🖼️ Choose from Gallery",
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
    waterAvailabilityLabel: "Water Availability",
    seasonLabel: "Sowing Season",
    evaluateButton: "Re-evaluate Suitability",
    manualCropLabel: "Enter Custom Crop Name",
    manualCropPlaceholder: "e.g. Dragon Fruit, Vanilla, Stevia...",
    customCropOption: "✍️ Custom / Other (Type Manually)",
    suitabilityScore: "Suitability Score",
    riskLevel: "Risk Level",
    factorsTitle: "Suitability Factors Breakdown",

    weatherTitle: "Weather Intelligence & Risk Alert 🌦️",
    weatherSubtitle: "Real-time microclimate metrics and agricultural hazard warnings.",
    currentConditions: "Current Weather Conditions",
    humidityLabel: "Humidity",
    windSpeedLabel: "Wind Speed",
    rainfallLabel: "Rainfall",
    riskAlertsTitle: "Agricultural Risk Alerts",
    forecastTitle: "5-Day Weather Forecast",

    actionTitle: "Smart Action Plan 📋",
    actionSubtitle: "Prioritized step-by-step decision support tailored to your crop and weather risks.",
    actionProgress: "Action Plan Progress",
    tasksCompleted: "tasks completed",
    recommendedSteps: "Recommended Action Steps",
    timelineLabel: "Timeline:",

    followupTitle: "Crop Recovery Monitoring 🔄",
    followupSubtitle: "Track treatment progress and leaf recovery over time.",
    uploadFollowupTitle: "Upload Follow-up Leaf Photo",
    uploadFollowupSub: "Upload a new photo of the treated leaf to evaluate recovery.",
    compareButton: "Compare Recovery Progress 🔍",
    recoveryStatus: "Recovery Status",
    improvingStatus: "IMPROVING",
    stableStatus: "STABLE",
    worseningStatus: "WORSENING"
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

    startAnalysis: "शुरू करें 🚀",
    howItWorks: "यह कैसे काम करता है",
    heroSubtitle1: "केवल बीमारी न पहचानें।",
    heroSubtitle2: "आगे क्या करना है, यह तय करें।",
    heroDescription: "खेत की जानकारी, मौसम पूर्वानुमान और AI फसल विश्लेषण को जोड़कर किसानों को सही निर्णय लेने में मदद करता है।",
    heroBadge: "AI-संचालित किसान निर्णय सहायता",
    problemTitle: "मुख्य समस्या",
    problemBody: "अधिकांश फसल रोग उपकरण केवल बीमारी की पहचान तक ही सीमित रहते हैं। वे आपको बताते हैं कि बीमारी क्या है — लेकिन यह नहीं कि आगे क्या करना है। गंभीरता और मौसम के जोखिम को समझे बिना केवल बीमारी पहचानना फसल बचाने के लिए पर्याप्त नहीं है।",
    problemCard1: "मौजूदा उपकरण केवल बीमारी का नाम बताते हैं",
    problemCard2: "लेकिन यह नहीं कि यह कितनी गंभीर है या क्या करें",
    problemCard3: "और मौसम, मिट्टी तथा समय को नज़रअंदाज़ करते हैं",
    pipelineSub: "खेत की जानकारी से लेकर सटीक निर्णय तक — एक संपूर्ण प्रक्रिया।",
    pipeline1: "खेत का डेटा",
    pipeline2: "मौसम",
    pipeline3: "फसल की फोटो",
    pipeline4: "AI विश्लेषण",
    pipeline5: "जोखिम",
    pipeline6: "सटीक निर्णय",
    capabilitiesTitle: "मुख्य विशेषताएं",
    cap1Desc: "अपनी मिट्टी, पानी की उपलब्धता, मौसम और जलवायु के आधार पर फसल उपयुक्तता स्कोर प्राप्त करें।",
    cap2Desc: "लाइव मौसम डेटा कृषि-विशिष्ट जोखिम चेतावनियों में परिवर्तित — जलभराव, गर्मी का तनाव, सूखा चेतावनी।",
    cap3Desc: "सटीक बीमारी पहचान और प्रभावित क्षेत्र के अनुमान के लिए फसल के पत्ते की फोटो अपलोड करें।",
    severityTitle: "गंभीरता का आकलन",
    severityDesc: "चित्र विश्लेषण के माध्यम से फसल के प्रभावित क्षेत्र का अनुमान लगाएं और स्थिति समझें।",
    cap5Desc: "संदर्भ-आधारित सिफारिशें: अभी क्या करें, किसकी निगरानी करें और विशेषज्ञ की मदद कब लें।",
    cap6Desc: "समय के साथ चित्रों की तुलना करके अपनी फसल के सुधार को ट्रैक करें।",
    readyToStart: "क्या आप अपने खेत के लिए बेहतर निर्णय लेने के लिए तैयार हैं?",
    finalCtaSubtitle: "अपने खेत की प्रोफाइल से शुरुआत करें। फसल सिफारिशें, मौसम अलर्ट और AI बीमारी विश्लेषण प्राप्त करें।",
    footerText: "टीम 24mishraa-1 द्वारा निर्मित — Morrow 1.0",

    backLabel: "वापस जाएं",
    setupTitle: "अपने खेत की जानकारी दर्ज करें",
    setupSubtitle: "अपने खेत के बारे में बताएं ताकि हम आपको सटीक सिफारिशें दे सकें। केवल कुछ फ़ील्ड आवश्यक हैं।",
    basicInfoTitle: "बुनियादी जानकारी",
    farmerNameLabel: "किसान का नाम",
    farmerNamePlaceholder: "अपना नाम दर्ज करें (वैकल्पिक)",
    locationTitle: "स्थान (Location)",
    selectStatePlaceholder: "अपना राज्य चुनें",
    selectDistrictPlaceholder: "अपना जिला चुनें",
    firstSelectState: "पहले अपना राज्य चुनें",
    cropDetailsTitle: "फसल का विवरण",
    selectCropPlaceholder: "अपनी फसल चुनें",
    cropStageLabel: "फसल का चरण",
    cropStageHint: "आपकी फसल अभी किस चरण में है?",
    selectStagePlaceholder: "वर्तमान चरण चुनें",
    soilWaterTitle: "मिट्टी और पानी",
    selectSoilPlaceholder: "मिट्टी का प्रकार चुनें",
    waterHint: "सिंचाई का कितना पानी उपलब्ध है?",
    selectWaterPlaceholder: "पानी की उपलब्धता चुनें",
    submitFarmButton: "फार्म प्रोफाइल बनाएं",
    submittingFarm: "फार्म प्रोफाइल सहेजा जा रहा है...",
    soilTestTitle: "मिट्टी परीक्षण मान (Soil Test Values)",
    optionalBadge: "वैकल्पिक",
    soilTestHint: "यदि आपके पास हाल ही के मिट्टी परीक्षण के परिणाम हैं, तो उन्हें दर्ज करने से सिफारिशें बेहतर होंगी।",
    nitrogenLabel: "नाइट्रोजन (N)",
    phosphorusLabel: "फास्फोरस (P)",
    potassiumLabel: "पोटेशियम (K)",
    phLabel: "pH (सामर्थ्य)",
    updateLaterHint: "आप बाद में भी अपनी फार्म प्रोफाइल को अपडेट कर सकते हैं।",

    stages: {
      Seedling: "अंकुरण / बुवाई (Seedling)",
      Vegetative: "शाकीय वृद्धि (Vegetative Growth)",
      Flowering: "फूल / फल लगना (Flowering)",
      Fruiting: "फल / फली बनना (Fruiting)",
      Harvest: "पकना / कटाई (Harvest)",
    },
    soils: {
      Black: "काली मिट्टी (Black Soil)",
      Red: "लाल मिट्टी (Red Soil)",
      Alluvial: "जलोढ़ मिट्टी (Alluvial Soil)",
      Loamy: "दोमट मिट्टी (Loamy Soil)",
      Sandy: "बलुई मिट्टी (Sandy Soil)",
      Clay: "चिकनी मिट्टी (Clay Soil)",
      Other: "अन्य मिट्टी (Other Soil)",
    },
    waterLevels: {
      Low: "कम (बारिश आधारित / सीमित)",
      Moderate: "मध्यम (नहर / ट्यूबवेल)",
      High: "अधिक (पर्याप्त सिंचाई)",
    },

    greeting: "नमस्ते, किसान भाई",
    farmOverviewSub: "यहाँ आपके खेत का विवरण और उपकरण दिए गए हैं।",
    farmLocation: "खेत का स्थान",
    cropLabel: "फसल",
    stageLabel: "चरण (Stage)",
    soilLabel: "मिट्टी",
    waterLabel: "पानी",
    todaysOverview: "आज की स्थिति (Today's Overview)",
    highestRisk: "उच्चतम जोखिम (Highest Risk)",
    whatWouldYouLikeToDo: "आप क्या करना चाहते हैं?",
    ready: "तैयार",
    getRecommendation: "फसल सिफारिश देखें →",
    checkWeather: "मौसम जांचें →",
    analyzeCrop: "फसल की जांच करें →",
    viewActions: "कार्य योजना देखें →",
    trackProgress: "प्रगति ट्रैक करें →",

    diseaseTitle: "AI फसल बीमारी डॉक्टर 🔬",
    diseaseSubtitle: "फसल के पत्ते की फोटो अपलोड करें और तुरंत सटीक इलाज पाएं।",
    uploadTitle: "पत्ते की फोटो अपलोड करें",
    uploadSubtitle: "प्रभावित फसल के पत्ते की साफ फोटो अपलोड करें।",
    uploadPlaceholder: "फोटो अपलोड करने के लिए क्लिक करें या खींचकर लाएं",
    uploadButton: "चित्र का विश्लेषण करें 🔍",
    takePhoto: "📷 फोटो खींचें (कैमरा)",
    chooseGallery: "🖼️ गैलरी से चुनें",
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
    waterAvailabilityLabel: "पानी की उपलब्धता",
    seasonLabel: "बुवाई का मौसम",
    evaluateButton: "उपयुक्तता की पुनः जांच करें",
    manualCropLabel: "अपनी फसल का नाम दर्ज करें",
    manualCropPlaceholder: "जैसे: ड्रैगन फ्रूट, स्टीविया, मशरूम...",
    customCropOption: "✍️ अन्य फसल (खुद नाम लिखें)",
    suitabilityScore: "उपयुक्तता स्कोर",
    riskLevel: "जोखिम स्तर (Risk Level)",
    factorsTitle: "उपयुक्तता कारणों का विवरण",

    weatherTitle: "मौसम पूर्वानुमान व जोखिम अलर्ट 🌦️",
    weatherSubtitle: "मौसम की स्थिति, वर्षा का अनुमान और कृषि सुरक्षा चेतावनी।",
    currentConditions: "वर्तमान मौसम की स्थिति",
    humidityLabel: "नमी (Humidity)",
    windSpeedLabel: "हवा की गति",
    rainfallLabel: "बारिश (Rainfall)",
    riskAlertsTitle: "कृषि जोखिम चेतावनियां",
    forecastTitle: "5-दिन का मौसम पूर्वानुमान",

    actionTitle: "स्मार्ट कार्य योजना 📋",
    actionSubtitle: "आपकी फसल और मौसम के अनुसार प्राथमिकता-आधारित कदम।",
    actionProgress: "कार्य योजना की प्रगति",
    tasksCompleted: "कार्य पूरे हुए",
    recommendedSteps: "अनुशंसित कदम",
    timelineLabel: "समय सीमा:",

    followupTitle: "फसल सुधार निगरानी 🔄",
    followupSubtitle: "इलाज के बाद फसल और पत्ते के सुधार की जांच करें।",
    uploadFollowupTitle: "सुधार जांच के लिए पत्ते की फोटो अपलोड करें",
    uploadFollowupSub: "उपचारित पत्ते की नई फोटो अपलोड करके सुधार का आकलन करें।",
    compareButton: "सुधार की तुलना करें 🔍",
    recoveryStatus: "सुधार की स्थिति (Status)",
    improvingStatus: "सुधार हो रहा है (IMPROVING)",
    stableStatus: "स्थिर है (STABLE)",
    worseningStatus: "स्थिति बिगड़ रही है (WORSENING)",

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

    startAnalysis: "सुरू करा 🚀",
    howItWorks: "हे कसे कार्य करते",
    heroSubtitle1: "फक्त रोग शोधू नका.",
    heroSubtitle2: "पुढे काय करायचे ते ठरवा.",
    heroDescription: "शेताची माहिती, हवामान अंदाज आणि AI पिक विश्लेषण एकत्र करून शेतकऱ्यांना अचूक निर्णय घेण्यास मदत करते.",
    heroBadge: "AI-आधारित शेतकरी निर्णय सहाय्यक",
    problemTitle: "मुख्य समस्या",
    problemBody: "बहुतांश पिक रोग साधने फक्त रोगाचे निदान करतात. ते रोग कोणता आहे हे सांगतात — पण पुढे काय करायचे ते सांगत नाहीत. रोगाची तीव्रता आणि हवामानाचा धोका समजून घेतल्याशिवाय फक्त निदान पुरेसे नाही.",
    problemCard1: "सध्याची साधने फक्त रोगाचे नाव देतात",
    problemCard2: "पण ते किती गंभीर आहे किंवा काय करावे हे सांगत नाहीत",
    problemCard3: "आणि हवामान, माती आणि वेळेकडे दुर्लक्ष करतात",
    pipelineSub: "शेताच्या माहितीपासून अचूक निर्णयापर्यंत — एक संपूर्ण प्रक्रिया.",
    pipeline1: "शेताची माहिती",
    pipeline2: "हवामान",
    pipeline3: "पिकाचा फोटो",
    pipeline4: "AI विश्लेषण",
    pipeline5: "धोका",
    pipeline6: "अचूक निर्णय",
    capabilitiesTitle: "प्रमुख वैशिष्ट्ये",
    cap1Desc: "तुमची माती, पाण्याची उपलब्धता आणि हवामानानुसार पिकाची योग्यता आणि गुण मिळवा.",
    cap2Desc: "थेट हवामान माहिती शेती-विशिष्ट धोका इशारांमध्ये रुपांतरित — पाणी साचणे, उष्णतेचा ताण आणि दुष्काळ इशारे.",
    cap3Desc: "अचूक रोग निदान आणि प्रभावित क्षेत्राच्या अंदाजासाठी पिकाच्या पानाचा फोटो अपलोड करा.",
    severityTitle: "तीव्रतेचे मूल्यमापन",
    severityDesc: "फोटो विश्लेषणाद्वारे पिकाच्या प्रभावित भागाचा अंदाज घ्या आणि परिस्थिती समजा.",
    cap5Desc: "संदर्भ-आधारित शिफारसी: आता काय करावे, कशावर लक्ष ठेवावे आणि तज्ज्ञांचा सल्ला कधी घ्यावा.",
    cap6Desc: "वेळेनुसार फोटोंची तुलना करून तुमच्या पिकाच्या सुधारणेचा पाठपुरावा करा.",
    readyToStart: "तुमच्या शेतासाठी योग्य निर्णय घेण्यास तयार आहात का?",
    finalCtaSubtitle: "तुमच्या शेताच्या प्रोफाईलपासून सुरुवात करा. पिक शिफारसी, हवामान इशारे आणि AI रोग विश्लेषण मिळवा.",
    footerText: "टीम 24mishraa-1 द्वारे निर्मित — Morrow 1.0",

    backLabel: "मागे जा",
    setupTitle: "तुमच्या शेताची माहिती प्रविष्ट करा",
    setupSubtitle: "तुमच्या शेताविषयी सांगा जेणेकरून आम्ही अचूक शिफारसी देऊ शकू. फक्त काही माहिती आवश्यक आहे.",
    basicInfoTitle: "मूलभूत माहिती",
    farmerNameLabel: "शेतकऱ्याचे नाव",
    farmerNamePlaceholder: "तुमचे नाव टाका (पर्यायी)",
    locationTitle: "ठिकाण (Location)",
    selectStatePlaceholder: "तुमचे राज्य निवडा",
    selectDistrictPlaceholder: "तुमचा जिल्हा निवडा",
    firstSelectState: "आधी तुमचे राज्य निवडा",
    cropDetailsTitle: "पिकाची माहिती",
    selectCropPlaceholder: "तुमचे पिक निवडा",
    cropStageLabel: "पिकाचा टप्पा",
    cropStageHint: "तुमचे पिक सध्या कोणत्या टप्प्यात आहे?",
    selectStagePlaceholder: "सध्याचा टप्पा निवडा",
    soilWaterTitle: "माती आणि पाणी",
    selectSoilPlaceholder: "मातीचा प्रकार निवडा",
    waterHint: "सिंचनासाठी किती पाणी उपलब्ध आहे?",
    selectWaterPlaceholder: "पाण्याची उपलब्धता निवडा",
    submitFarmButton: "शेताचे प्रोफाईल तयार करा",
    submittingFarm: "प्रोफाईल जतन केले जात आहे...",
    soilTestTitle: "माती चाचणी मूल्ये (Soil Test Values)",
    optionalBadge: "पर्यायी",
    soilTestHint: "तुमच्याकडे नुकतीच माती चाचणी केली असल्यास, ती नोंदवल्यास शिफारसी अधिक अचूक मिळतील.",
    nitrogenLabel: "नत्र / नायट्रोजन (N)",
    phosphorusLabel: "स्फुरद / फॉस्फरस (P)",
    potassiumLabel: "पालाश / पोटॅशियम (K)",
    phLabel: "pH (सामू)",
    updateLaterHint: "तुम्ही नंतरही तुमच्या शेताचे प्रोफाईल अपडेट करू शकता.",

    stages: {
      Seedling: "रोप / पेरणी (Seedling)",
      Vegetative: "शाकीय वाढ (Vegetative Growth)",
      Flowering: "फूल / फळधारणा (Flowering)",
      Fruiting: "फळ / शेंग धारणा (Fruiting)",
      Harvest: "पक्वता / काढणी (Harvest)",
    },
    soils: {
      Black: "काळी माती (Black Soil)",
      Red: "लाल माती (Red Soil)",
      Alluvial: "गाळाची माती (Alluvial Soil)",
      Loamy: "दुमट माती (Loamy Soil)",
      Sandy: "वाळूमय माती (Sandy Soil)",
      Clay: "चिकण माती (Clay Soil)",
      Other: "इतर माती (Other Soil)",
    },
    waterLevels: {
      Low: "कमी (पावसावर आधारित / मर्यादित)",
      Moderate: "मध्यम (कालवा / कूपनलिका)",
      High: "भरपूर (भरपूर सिंचन)",
    },

    greeting: "नमस्कार, शेतकरी बांधवांनो",
    farmOverviewSub: "येथे तुमच्या शेताची माहिती आणि साधने दिली आहेत.",
    farmLocation: "शेताचे ठिकाण",
    cropLabel: "पिक",
    stageLabel: "टप्पा (Stage)",
    soilLabel: "माती",
    waterLabel: "पाणी",
    todaysOverview: "आजची परिस्थिती (Today's Overview)",
    highestRisk: "सर्वाधिक धोका (Highest Risk)",
    whatWouldYouLikeToDo: "तुम्हाला काय करायचे आहे?",
    ready: "तयार",
    getRecommendation: "पिक शिफारस पहा →",
    checkWeather: "हवामान तपासा →",
    analyzeCrop: "पानाची तपासणी करा →",
    viewActions: "कृती योजना पहा →",
    trackProgress: "प्रगती तपासा →",

    diseaseTitle: "AI पिक रोग डॉक्टर 🔬",
    diseaseSubtitle: "पिकाच्या पानाचा फोटो अपलोड करा आणि अचूक निदान व उपाय मिळवा.",
    uploadTitle: "पानाचा फोटो अपलोड करा",
    uploadSubtitle: "बाधित पिकाच्या पानाचा स्पष्ट फोटो अपलोड करा.",
    uploadPlaceholder: "फोटो अपलोड करण्यासाठी क्लिक करा",
    uploadButton: "निदान करा 🔍",
    takePhoto: "📷 फोटो काढा (कॅमेरा)",
    chooseGallery: "🖼️ गॅलरीमधून निवडा",
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
    waterAvailabilityLabel: "पाण्याची उपलब्धता",
    seasonLabel: "पेरणीचा हंगाम",
    evaluateButton: "योग्यतेची तपासणी करा",
    manualCropLabel: "पिकाचे नाव टाका",
    manualCropPlaceholder: "उदा: ड्रॅगन फ्रूट, हळद...",
    customCropOption: "✍️ इतर पिक (स्वतः नाव लिहा)",
    suitabilityScore: "योग्यतेचे गुण (Suitability)",
    riskLevel: "धोक्याची पातळी (Risk)",
    factorsTitle: "योग्यतेचे घटक",

    weatherTitle: "हवामान अंदाज आणि धोका इशारे 🌦️",
    weatherSubtitle: "हवामानाची माहिती, पावसाचा अंदाज आणि शेती सुरक्षेच्या सूचना.",
    currentConditions: "सध्याचे हवामान",
    humidityLabel: "आर्द्रता (Humidity)",
    windSpeedLabel: "वाऱ्याचा वेग",
    rainfallLabel: "पाऊस (Rainfall)",
    riskAlertsTitle: "शेती धोक्याचे इशारे",
    forecastTitle: "५ दिवसांचा हवामान अंदाज",

    actionTitle: "स्मार्ट कृती योजना 📋",
    actionSubtitle: "पिक आणि हवामानानुसार टप्प्याटप्प्याने मार्गदर्शक कृती.",
    actionProgress: "कृती योजनेची प्रगती",
    tasksCompleted: "कामे पूर्ण झाली",
    recommendedSteps: "सुचवलेल्या कृती",
    timelineLabel: "कालावधी:",

    followupTitle: "पिक सुधारणा पाठपुरावा 🔄",
    followupSubtitle: "औषध फवारणीनंतर पानातील सुधारणा तपासा.",
    uploadFollowupTitle: "सुधारणा तपासण्यासाठी पानाचा नवा फोटो अपलोड करा",
    uploadFollowupSub: "नवीन फोटो अपलोड करून रोगातील घट तपासा.",
    compareButton: "सुधारणेची तुलना करा 🔍",
    recoveryStatus: "सुधारणेची स्थिती",
    improvingStatus: "सुधारणा होत आहे (IMPROVING)",
    stableStatus: "स्थिर आहे (STABLE)",
    worseningStatus: "स्थिती बिघडत आहे (WORSENING)",

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

    startAnalysis: "ప్రారంభించండి 🚀",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    heroSubtitle1: "సమస్యను గుర్తించడమే కాదు.",
    heroSubtitle2: "తదుపరి ఏమి చేయాలో నిర్ణయించండి.",
    heroDescription: "నేల, వాతావరణం మరియు AI విశ్లేషణను ఉపయోగించి రైతులకు సరైన నిర్ణయాలు తీసుకోవడంలో సహాయపడుతుంది.",
    heroBadge: "AI-ఆధారిత రైతు నిర్ణయ సహాయ వ్యవస్థ",
    problemTitle: "ప్రధాన సమస్య",
    problemBody: "చాలా పంట తెగులు సాధనాలు కేవలం సమస్యను గుర్తించడంతోనే ఆగిపోతాయి. తెగులు ఏంటో చెప్తాయి — కానీ నివారణ చర్యలు చెప్పవు.",
    problemCard1: "ఉన్న సాధనాలు కేవలం తెगुలు పేరు మాత్రమే ఇస్తాయి",
    problemCard2: "కానీ ఎంత తీవ్రంగా ఉందో లేదా ఏమి చేయాలో చెప్పవు",
    problemCard3: "మరియు వాతావరణం, నేల, సమయాన్ని విస్మరిస్తాయి",
    pipelineSub: "మీ పొలం వివరాల నుండి కార్యాచరణ నిర్ణయాల వరకు — పూర్తి ప్రక్రియ.",
    pipeline1: "పొలం వివరాలు",
    pipeline2: "వాతావరణం",
    pipeline3: "పంట చిత్రం",
    pipeline4: "AI విశ్లేషణ",
    pipeline5: "ప్రమాదం",
    pipeline6: "నిర్ణయం",
    capabilitiesTitle: "ముఖ్యమైన సేవలు",
    cap1Desc: "మీ నేల, నీటి లభ్యత మరియు వాతావరణం ఆధారంగా పంట అనుకూలత స్కోర్‌లను పొందండి.",
    cap2Desc: "లైవ్ వాతావరణ డేటా వ్యవసాయ-నిర్దిష్ట ప్రమాద హెచ్చరికలుగా మార్చబడింది.",
    cap3Desc: "విశ్వాస స్కోరింగ్ మరియు అంచనా వేసిన ప్రభావిత ప్రాంతంతో AI-ఆధారిత వ్యాధి వర్గీకరణ కోసం పంట ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    severityTitle: "తీవ్రత అంచనా",
    severityDesc: "చిత్ర విశ్లేషణ ద్వారా మీ పంట యొక్క ప్రభావిత ప్రాంతాన్ని అంచనా వేయండి.",
    cap5Desc: "సందర్భోచిత రికమండేషన్లు: ఇప్పుడు ఏమి చేయాలి, ఏమి పర్యవేక్షించాలో తెలుసుకోండి.",
    cap6Desc: "సమయంతో పాటు చిత్రాలను పోల్చడం ద్వారా మీ పంట కోలుకోవడాన్ని ట్రాక్ చేయండి.",
    readyToStart: "మీ పొలం కోసం ఉత్తమ నిర్ణయాలు తీసుకోవడానికి సిద్ధంగా ఉన్నారా?",
    finalCtaSubtitle: "మీ ఫారమ్ ప్రొఫైల్‌తో ప్రారంభించండి. పంట సిఫార్సులు, వాతావరణ హెచ్చరికలు మరియు AI వ్యాధి విశ్లేషణ పొందండి.",
    footerText: "టీమ్ 24mishraa-1 ద్వారా నిర్మించబడింది — Morrow 1.0",

    backLabel: "వెనుకకు",
    setupTitle: "మీ పొలం వివరాలను నమోదు చేయండి",
    setupSubtitle: "మీ పొలం గురించి వివరించండి తద్వారా మేము సరైన సిఫార్సులు అందిస్తాము. కొన్ని వివరాలు మాత్రమే అవసరం.",
    basicInfoTitle: "ప్రాథమిక సమాచారం",
    farmerNameLabel: "రైతు పేరు",
    farmerNamePlaceholder: "మీ పేరు నమోదు చేయండి (ఐచ్ఛికం)",
    locationTitle: "ప్రదేశం (Location)",
    selectStatePlaceholder: "మీ రాష్ట్రాన్ని ఎంచుకోండి",
    selectDistrictPlaceholder: "మీ జిల్లాను ఎంచుకోండి",
    firstSelectState: "ముందుగా మీ రాష్ట్రాన్ని ఎంచుకోండి",
    cropDetailsTitle: "పంట వివరాలు",
    selectCropPlaceholder: "మీ పంటను ఎంచుకోండి",
    cropStageLabel: "పంట దశ",
    cropStageHint: "మీ పంట ప్రస్తుతం ఏ దశలో ఉంది?",
    selectStagePlaceholder: "ప్రస్తుత దశను ఎంచుకోండి",
    soilWaterTitle: "నేల మరియు నీరు",
    selectSoilPlaceholder: "నేల రకాన్ని ఎంచుకోండి",
    waterHint: "సాగునీరు ఎంత లభ్యతగా ఉంది?",
    selectWaterPlaceholder: "నీటి లభ్యతను ఎంచుకోండి",
    submitFarmButton: "పొలం ప్రొఫైల్ సృష్టించండి",
    submittingFarm: "ప్రొఫైల్ సేవ్ చేయబడుతోంది...",
    soilTestTitle: "నేల పరీక్ష విలువలు (Soil Test Values)",
    optionalBadge: "ఐచ్ఛికం",
    soilTestHint: "మీ దగ్గర నేల పరీక్ష ఫలితాలు ఉంటే, వాటిని నమోదు చేయడం వల్ల పంట సిఫార్సులు మెరుగవుతాయి.",
    nitrogenLabel: "నత్రజని (N)",
    phosphorusLabel: "భాస్వరం (P)",
    potassiumLabel: "పొటాషియం (K)",
    phLabel: "pH",
    updateLaterHint: "మీరు తర్వాత కూడా మీ ఫారమ్ ప్రొఫైల్‌ను అప్‌డేట్ చేయవచ్చు.",

    stages: {
      Seedling: "విత్తనం / మొలక (Seedling)",
      Vegetative: "శాఖీయ పెరుగుదల (Vegetative Growth)",
      Flowering: "పువ్వులు / కాయలు (Flowering)",
      Fruiting: "కాయ దశ (Fruiting)",
      Harvest: "కోత సమయం (Harvest)",
    },
    soils: {
      Black: "నల్ల నేల (Black Soil)",
      Red: "ఎర్ర నేల (Red Soil)",
      Alluvial: "ఒండ్రు నేల (Alluvial Soil)",
      Loamy: "రేగడి నేల (Loamy Soil)",
      Sandy: "ఇసుక నేల (Sandy Soil)",
      Clay: "జిగట నేల (Clay Soil)",
      Other: "ఇతర నేల (Other Soil)",
    },
    waterLevels: {
      Low: "తక్కువ (వర్షాధారం / పరిమితం)",
      Moderate: "మధ్యస్థం (కాల్వ / బోర్‌వెల్)",
      High: "ఎక్కువ (సమృద్ధిగా నీటిపారుదల)",
    },

    greeting: "నమస్కారం, రైతు సోదరా",
    farmOverviewSub: "ఇక్కడ మీ పొలం వివరాలు మరియు సాధనాలు ఉన్నాయి.",
    farmLocation: "పొలం ప్రదేశం",
    cropLabel: "పంట",
    stageLabel: "దశ (Stage)",
    soilLabel: "నేల",
    waterLabel: "నీరు",
    todaysOverview: "ఈరోజు సమాచారం (Today's Overview)",
    highestRisk: "అత్యధిక ప్రమాదం (Highest Risk)",
    whatWouldYouLikeToDo: "మీరు ఏమి చేయాలనుకుంటున్నారు?",
    ready: "సిద్ధంగా ఉంది",
    getRecommendation: "పంట సిఫార్సు చూడండి →",
    checkWeather: "వాతావరణం చూడండి →",
    analyzeCrop: "ఆకును విశ్లేషించండి →",
    viewActions: "కార్యాచరణ చూడండి →",
    trackProgress: "పురోగతి చూడండి →",

    diseaseTitle: "AI పంట తెగులు డాక్టర్ 🔬",
    diseaseSubtitle: "పంట ఆకు ఫోటో అప్‌లోడ్ చేసి తక్షణ నివారణ పొందండి.",
    uploadTitle: "ఆకు ఫోటో అప్‌లోడ్ చేయండి",
    uploadSubtitle: "బాధిత ఆకు స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.",
    uploadPlaceholder: "ఫోటో అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
    uploadButton: "విశ్లేషించండి 🔍",
    takePhoto: "📷 ఫోటో తీయండి (కెమెరా)",
    chooseGallery: "🖼️ గ్యాలరీ నుండి ఎంచుకోండి",
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
    waterAvailabilityLabel: "నీటి లభ్యత",
    seasonLabel: "పంట కాలం (Season)",
    evaluateButton: "మళ్లీ తనిఖీ చేయండి",
    manualCropLabel: "పంట పేరు నమోదు చేయండి",
    manualCropPlaceholder: "ఉదా: డ్రాగన్ ఫ్రూట్, పసుపు...",
    customCropOption: "✍️ ఇతర పంట (మాన్యువల్‌గా నమోదు చేయండి)",
    suitabilityScore: "అనుకూలత స్కోరు",
    riskLevel: "ప్రమాద స్థాయి (Risk Level)",
    factorsTitle: "అనుకూలత విశ్లేషణ",

    weatherTitle: "వాతావరణం మరియు ప్రమాద హెచ్చరికలు 🌦️",
    weatherSubtitle: "తక్షణ వాతావరణం మరియు వ్యవసాయ భద్రతా హెచ్చరికలు.",
    currentConditions: "ప్రస్తుత వాతావరణం",
    humidityLabel: "తేమ (Humidity)",
    windSpeedLabel: "గాలి వేగం",
    rainfallLabel: "వర్షపాతం (Rainfall)",
    riskAlertsTitle: "వ్యవసాయ ప్రమాద హెచ్చరికలు",
    forecastTitle: "5 రోజు అంచనా",

    actionTitle: "కార్యాచరణ ప్రణాళిక 📋",
    actionSubtitle: "మీ పంట ఆధారంగా దశలవారీ నివారణ చర్యలు.",
    actionProgress: "ప్రణాళిక పురోగతి",
    tasksCompleted: "పూర్తయిన పనులు",
    recommendedSteps: "సిఫార్సు చేసిన చర్యలు",
    timelineLabel: "సమయం:",

    followupTitle: "పంట కోలుకునే ప్రక్రియ 🔄",
    followupSubtitle: "చికిత్స తర్వాత ఆకు కోలుకునే విధానాన్ని పరిశీలించండి.",
    uploadFollowupTitle: "కొత్త ఆకు ఫోటోను అప్‌లోడ్ చేయండి",
    uploadFollowupSub: "మార్పులను పరిశీలించడానికి కొత్త ఫోటోను ఉపయోగించండి.",
    compareButton: "పోల్చి చూడండి 🔍",
    recoveryStatus: "కోలుకునే స్థితి",
    improvingStatus: "మెరుగుపడుతోంది (IMPROVING)",
    stableStatus: "స్థిరంగా ఉంది (STABLE)",
    worseningStatus: "పాడవుతోంది (WORSENING)",

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

    startAnalysis: "தொடங்கவும் 🚀",
    howItWorks: "இது எவ்வாறு இயங்குகிறது",
    heroSubtitle1: "பிரச்சனையை மட்டும் கண்டறிய வேண்டாம்.",
    heroSubtitle2: "அடுத்து என்ன செய்வது என்று தீர்மானியுங்கள்.",
    heroDescription: "மண், வானிலை மற்றும் AI ஆய்வை பயன்படுத்தி விவசாயிகள் சரியான முடிவுகளை எடுக்க உதவுகிறது.",
    heroBadge: "AI-இயங்கும் விவசாயி முடிவு ஆதரவு",
    problemTitle: "முக்கிய பிரச்சனை",
    problemBody: "பெரும்பாலான பயிர் நோய் கருவிகள் நோயைக் கண்டறிவதோடு நின்றுவிடுகின்றன. நோய் என்னவென்று சொல்கின்றன — ஆனால் அடுத்து என்ன செய்வது என்று சொல்வதில்லை.",
    problemCard1: "தற்போதுள்ள கருவிகள் நோயின் பெயரை மட்டுமே தருகின்றன",
    problemCard2: "ஆனால் எவ்வளவு தீவிரமானது அல்லது என்ன செய்வது என்று சொல்வதில்லை",
    problemCard3: "மேலும் வானிலை, மண் மற்றும் நேரத்தைப் புறக்கணிக்கின்றன",
    pipelineSub: "உங்கள் பண்ணை தரவிலிருந்து செயல் முடிவுகள் வரை — முழுமையான செயல்முறை.",
    pipeline1: "பண்ணைத் தரவு",
    pipeline2: "வானிலை",
    pipeline3: "பயிர் படம்",
    pipeline4: "AI ஆய்வு",
    pipeline5: "அபாயம்",
    pipeline6: "முடிவு",
    capabilitiesTitle: "முக்கிய அம்சங்கள்",
    cap1Desc: "உங்கள் மண், நீர் இருப்பு மற்றும் வானிலை ஆகியவற்றின் அடிப்படையில் பயிர் தகுதி மதிப்பெண்களைப் பெறுங்கள்.",
    cap2Desc: "நேரடி வானிலை தரவு விவசாய-குறிப்பிட்ட ஆபத்து எச்சரிக்கைகளாக மாற்றப்படுகிறது.",
    cap3Desc: "நம்பகத்தன்மை மதிப்பெண் மற்றும் பாதிக்கப்பட்ட பகுதியுடன் AI-இயங்கும் நோய் பகுப்பாய்விற்கு பயிர் இலை படத்தை பதிவேற்றவும்.",
    severityTitle: "தீவிர மதிப்பீடு",
    severityDesc: "படப் பகுப்பாய்வைப் பயன்படுத்தி உங்கள் பயிரின் பாதிக்கப்பட்ட பகுதியை மதிப்பிடவும்.",
    cap5Desc: "சூழ்நிலை சார்ந்த பரிந்துரைகள்: இப்போது என்ன செய்வது, எதைக் கண்காணிப்பது என்று அறியவும்.",
    cap6Desc: "காலப்போக்கில் படங்களை ஒப்பிடுவதன் மூலம் உங்கள் பயிரின் மீட்சியைக் கண்காணிக்கவும்.",
    readyToStart: "உங்கள் பண்ணைக்கு சிறந்த முடிவுகளை எடுக்கத் தயாரா?",
    finalCtaSubtitle: "உங்கள் பண்ணை சுயவிவரத்துடன் தொடங்கவும். பயிர் பரிந்துரைகள், வானிலை எச்சரிக்கைகள் பெறவும்.",
    footerText: "குழு 24mishraa-1 உருவாக்கியது — Morrow 1.0",

    backLabel: "பின்னால்",
    setupTitle: "உங்கள் பண்ணையை அமைக்கவும்",
    setupSubtitle: "பொருத்தமான பரிந்துரைகளை வழங்க உங்கள் பண்ணையைப் பற்றி எங்களிடம் கூறுங்கள். சில தகவல்கள் மட்டுமே தேவை.",
    basicInfoTitle: "அடிப்படை தகவல்",
    farmerNameLabel: "விவசாயி பெயர்",
    farmerNamePlaceholder: "உங்கள் பெயரை உள்ளிடவும் (விருப்பமானது)",
    locationTitle: "இடம் (Location)",
    selectStatePlaceholder: "உங்கள் மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    selectDistrictPlaceholder: "உங்கள் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
    firstSelectState: "முதலில் உங்கள் மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    cropDetailsTitle: "பயிர் விவரங்கள்",
    selectCropPlaceholder: "உங்கள் பயிரைத் தேர்ந்தெடுக்கவும்",
    cropStageLabel: "பயிர் நிலை",
    cropStageHint: "உங்கள் பயிர் தற்போது எந்த நிலையில் உள்ளது?",
    selectStagePlaceholder: "தற்போதைய நிலையைத் தேர்ந்தெடுக்கவும்",
    soilWaterTitle: "மண் மற்றும் நீர்",
    selectSoilPlaceholder: "மண் வகையைத் தேர்ந்தெடுக்கவும்",
    waterHint: "பாசன நீர் எவ்வளவு கிடைக்கிறது?",
    selectWaterPlaceholder: "நீர் கிடைப்பதைத் தேர்ந்தெடுக்கவும்",
    submitFarmButton: "பண்ணை சுயவிவரத்தை உருவாக்கவும்",
    submittingFarm: "சுயவிவரம் சேமிக்கப்படுகிறது...",
    soilTestTitle: "மண் பரிசோதனை மதிப்புகள் (Soil Test Values)",
    optionalBadge: "விருப்பமானது",
    soilTestHint: "சமீபத்திய மண் பரிசோதனை முடிவுகள் இருந்தால், அவற்றை உள்ளிடுவது பரிந்துரைகளை மேம்படுத்தும்.",
    nitrogenLabel: "நைட்ரஜன் (N)",
    phosphorusLabel: "பாஸ்பரஸ் (P)",
    potassiumLabel: "பொட்டாசியம் (K)",
    phLabel: "pH",
    updateLaterHint: "உங்கள் பண்ணை சுயவிவரத்தை பின்னர் புதுப்பிக்கலாம்.",

    stages: {
      Seedling: "விதைப்பு / நாற்று (Seedling)",
      Vegetative: "வளர்ச்சி நிலை (Vegetative Growth)",
      Flowering: "பூக்கும் நிலை (Flowering)",
      Fruiting: "காய்க்கும் நிலை (Fruiting)",
      Harvest: "அறுவடை நிலை (Harvest)",
    },
    soils: {
      Black: "கரிசல் மண் (Black Soil)",
      Red: "செம்மண் (Red Soil)",
      Alluvial: "வண்டல் மண் (Alluvial Soil)",
      Loamy: "வண்டல் மண் (Loamy Soil)",
      Sandy: "மணல் மண் (Sandy Soil)",
      Clay: "களிமண் (Clay Soil)",
      Other: "மற்ற மண் (Other Soil)",
    },
    waterLevels: {
      Low: "குறைந்த (மழைசார்ந்தது / வரம்பிற்குட்பட்ட)",
      Moderate: "மிதமான (கால்வாய் / கிணறு)",
      High: "அதிக (நிறைய பாசனம்)",
    },

    greeting: "வணக்கம், விவசாய தோழரே",
    farmOverviewSub: "இங்கே உங்கள் பண்ணை கண்ணோட்டம் மற்றும் கருவிகள் உள்ளன.",
    farmLocation: "பண்ணை இடம்",
    cropLabel: "பயிர்",
    stageLabel: "நிலை (Stage)",
    soilLabel: "மண்",
    waterLabel: "நீர்",
    todaysOverview: "இன்றைய கண்ணோட்டம் (Today's Overview)",
    highestRisk: "அதிகபட்ச அபாயம் (Highest Risk)",
    whatWouldYouLikeToDo: "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
    ready: "தயார்",
    getRecommendation: "பரிந்துரை பெறுக →",
    checkWeather: "வானிலை பார்க்க →",
    analyzeCrop: "இலையை ஆய்வு செய்ய →",
    viewActions: "செயல் திட்டம் பார்க்க →",
    trackProgress: "முன்னேற்றம் பார்க்க →",

    diseaseTitle: "AI பயிர் நோய் மருத்துவர் 🔬",
    diseaseSubtitle: "பயிர் இலையின் புகைப்படத்தைப் பதிவேற்றி உடனடி தீர்வு பெறவும்.",
    uploadTitle: "இலை புகைப்படத்தைப் பதிவேற்றவும்",
    uploadSubtitle: "பாதிக்கப்பட்ட இலையின் தெளிவான புகைப்படத்தைப் பதிவேற்றவும்.",
    uploadPlaceholder: "புகைப்படத்தைப் பதிவேற்ற கிளிக் செய்யவும்",
    uploadButton: "ஆய்வு செய் 🔍",
    takePhoto: "📷 படம் எடுக்கவும் (கேமரா)",
    chooseGallery: "🖼️ கேலரியில் இருந்து தேர்வு செய்",
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
    waterAvailabilityLabel: "நீர் उपलब्धता",
    seasonLabel: "பருவம் (Season)",
    evaluateButton: "மீண்டும் ஆய்வு செய்",
    manualCropLabel: "பயிரின் பெயரை உள்ளிடவும்",
    manualCropPlaceholder: "எ.கா: டிராகன் பழம், மஞ்சள்...",
    customCropOption: "✍️ மற்ற பயிர் (கைமுறையாக தட்டச்சு செய்யவும்)",
    suitabilityScore: "பொருத்தமான மதிப்பெண்",
    riskLevel: "அபாய நிலை",
    factorsTitle: "காரணிகள் பகுப்பாய்வு",

    weatherTitle: "வானிலை மற்றும் அபாய எச்சரிக்கைகள் 🌦️",
    weatherSubtitle: "நிகழ்நேர காலநிலை மற்றும் விவசாய பாதுகாப்பு எச்சரிக்கைகள்.",
    currentConditions: "தற்போதைய வானிலை",
    humidityLabel: "ஈரப்பதம் (Humidity)",
    windSpeedLabel: "காற்றின் வேகம்",
    rainfallLabel: "மழை அளவு (Rainfall)",
    riskAlertsTitle: "விவசாய அபாய எச்சரிக்கைகள்",
    forecastTitle: "5 நாள் கணிப்பு",

    actionTitle: "செயல் திட்டம் 📋",
    actionSubtitle: "உங்கள் பயிருக்கு ஏற்ற முன்னுரிமை நடவடிக்கைகள்.",
    actionProgress: "திட்ட முன்னேற்றம்",
    tasksCompleted: "முடிந்த பணிகள்",
    recommendedSteps: "பரிந்துரைக்கப்பட்ட படிகள்",
    timelineLabel: "காலக்கெடு:",

    followupTitle: "பயிர் மீட்பு கண்காணிப்பு 🔄",
    followupSubtitle: "சிகிச்சைக்குப் பின் இலையின் மீட்பைக் கண்காணிக்கவும்.",
    uploadFollowupTitle: "புதிய புகைப்படத்தைப் பதிவேற்றவும்",
    uploadFollowupSub: "மீட்பை மதிப்பிட புதிய படத்தைப் பயன்படுத்தவும்.",
    compareButton: "ஒப்பிட்டுப் பார்க்க 🔍",
    recoveryStatus: "மீட்பு நிலை",
    improvingStatus: "மேம்படுகிறது (IMPROVING)",
    stableStatus: "சீராக உள்ளது (STABLE)",
    worseningStatus: "மோசமடைகிறது (WORSENING)",

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
