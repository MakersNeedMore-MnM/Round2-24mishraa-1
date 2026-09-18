import { NextRequest, NextResponse } from "next/server";

interface CropProfile {
  idealSoils: string[];
  secondarySoils: string[];
  idealWater: string[];
  idealSeasons: string[];
  description: string;
}

const CROP_DATABASE: Record<string, CropProfile> = {
  rice: {
    idealSoils: ["clay", "alluvial"],
    secondarySoils: ["loam"],
    idealWater: ["high"],
    idealSeasons: ["kharif", "rainy"],
    description: "High moisture-intensive cereal requiring clayey or alluvial soil with high standing water."
  },
  wheat: {
    idealSoils: ["loam", "alluvial"],
    secondarySoils: ["black", "clay loam"],
    idealWater: ["moderate", "high"],
    idealSeasons: ["rabi", "winter"],
    description: "Cool season cereal crop thriving in well-drained loamy soils under moderate irrigation."
  },
  cotton: {
    idealSoils: ["black"],
    secondarySoils: ["alluvial", "deep loam"],
    idealWater: ["moderate", "high"],
    idealSeasons: ["kharif"],
    description: "Commercial cash crop optimal for deep, moisture-retentive black cotton soil."
  },
  chickpea: {
    idealSoils: ["black", "loam"],
    secondarySoils: ["sandy loam", "red"],
    idealWater: ["low", "moderate"],
    idealSeasons: ["rabi"],
    description: "Drought-tolerant pulse crop that performs best in light to medium soils with minimal water."
  },
  groundnut: {
    idealSoils: ["sandy", "red"],
    secondarySoils: ["loam", "light black"],
    idealWater: ["low", "moderate"],
    idealSeasons: ["kharif", "summer"],
    description: "Legume crop preferring friable sandy/red soil for optimal subterranean pod development."
  },
  sugarcane: {
    idealSoils: ["alluvial", "black"],
    secondarySoils: ["loam"],
    idealWater: ["high"],
    idealSeasons: ["kharif", "annual"],
    description: "Heavy feeder cash crop requiring abundant year-round water supply and fertile soil."
  },
  maize: {
    idealSoils: ["loam", "alluvial"],
    secondarySoils: ["black", "red"],
    idealWater: ["moderate"],
    idealSeasons: ["kharif", "rabi"],
    description: "Versatile cereal crop requiring well-drained fertile soils and moderate moisture."
  },
  soybean: {
    idealSoils: ["black", "loam"],
    secondarySoils: ["alluvial"],
    idealWater: ["moderate"],
    idealSeasons: ["kharif"],
    description: "Oilseed crop thriving in deep black soils with good natural organic content."
  },
  tomato: {
    idealSoils: ["loam", "red"],
    secondarySoils: ["alluvial"],
    idealWater: ["moderate"],
    idealSeasons: ["kharif", "rabi", "summer"],
    description: "Horticultural crop requiring well-drained fertile loam and uniform drip irrigation."
  },
  potato: {
    idealSoils: ["sandy loam", "loam"],
    secondarySoils: ["alluvial"],
    idealWater: ["moderate"],
    idealSeasons: ["rabi"],
    description: "Tuber crop requiring loose friable soil and cool night temperatures."
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      state = "Maharashtra",
      district = "Nagpur",
      soil_type = "Black",
      water_availability = "Moderate",
      crop = "Cotton",
      season = "Kharif"
    } = body;

    const cropKey = crop.toLowerCase().trim();
    const profile = CROP_DATABASE[cropKey] || CROP_DATABASE["cotton"];

    const userSoil = soil_type.toLowerCase();
    const userWater = water_availability.toLowerCase();
    const userSeason = season.toLowerCase();

    // 1. Soil Score
    let soilScore = 40;
    let soilStatus: "good" | "warning" | "critical" = "warning";
    let soilDetail = `${soil_type} soil provides limited drainage for ${crop}.`;

    if (profile.idealSoils.some(s => userSoil.includes(s))) {
      soilScore = 95;
      soilStatus = "good";
      soilDetail = `${soil_type} soil offers optimal texture and nutrient retention for ${crop}.`;
    } else if (profile.secondarySoils.some(s => userSoil.includes(s))) {
      soilScore = 72;
      soilStatus = "good";
      soilDetail = `${soil_type} soil is moderately compatible for ${crop} with organic amendments.`;
    } else {
      soilScore = 42;
      soilStatus = "critical";
      soilDetail = `${soil_type} soil exhibits physical/chemical constraints for optimal ${crop} root growth.`;
    }

    // 2. Water Availability Score
    let waterScore = 35;
    let waterStatus: "good" | "warning" | "critical" = "warning";
    let waterDetail = `${water_availability} water availability is insufficient for ${crop}.`;

    if (profile.idealWater.some(w => userWater.includes(w))) {
      waterScore = 94;
      waterStatus = "good";
      waterDetail = `Water availability (${water_availability}) matches the crop water requirement.`;
    } else if (userWater.includes("high") && profile.idealWater.includes("moderate")) {
      waterScore = 80;
      waterStatus = "good";
      waterDetail = `Water supply is ample, but ensure proper field drainage to avoid waterlogging.`;
    } else if (userWater.includes("low") && profile.idealWater.includes("high")) {
      waterScore = 28;
      waterStatus = "critical";
      waterDetail = `CRITICAL: Low water supply is severely insufficient for moisture-intensive ${crop}. High risk of drought stress.`;
    } else {
      waterScore = 55;
      waterStatus = "warning";
      waterDetail = `${water_availability} irrigation supply requires precision scheduling for ${crop}.`;
    }

    // 3. Seasonal Score
    let seasonScore = 50;
    let seasonStatus: "good" | "warning" | "critical" = "warning";
    let seasonDetail = `${season} season presents non-ideal thermal conditions for ${crop}.`;

    if (profile.idealSeasons.some(s => userSeason.includes(s))) {
      seasonScore = 92;
      seasonStatus = "good";
      seasonDetail = `Sowing season (${season}) aligns with ideal thermal and daylight hours for ${crop}.`;
    } else {
      seasonScore = 48;
      seasonStatus = "warning";
      seasonDetail = `${season} season lacks optimal temperature range for peak ${crop} yields.`;
    }

    // Weighted Overall Score: 35% Soil, 40% Water, 25% Season
    const overallScore = Math.round(soilScore * 0.35 + waterScore * 0.40 + seasonScore * 0.25);

    let riskLevel: "Low" | "Moderate" | "High" = "Low";
    if (overallScore < 60) {
      riskLevel = "High";
    } else if (overallScore < 80) {
      riskLevel = "Moderate";
    }

    const summaryExplanation = overallScore < 60
      ? `WARNING: ${crop} has a LOW suitability score of ${overallScore}% (${riskLevel} Risk) in ${district}, ${state} under ${soil_type} soil, ${water_availability} water supply, and ${season} season.`
      : `${crop} is well-suited (${overallScore}% Suitability, ${riskLevel} Risk) for ${district}, ${state} based on ${soil_type} soil and climate parameters.`;

    return NextResponse.json({
      success: true,
      data: {
        recommended_crop: crop,
        suitability_score: overallScore,
        risk_level: riskLevel,
        explanation: summaryExplanation,
        factors: [
          {
            name: "Soil Compatibility",
            score: soilScore,
            status: soilStatus,
            detail: soilDetail
          },
          {
            name: "Water Availability",
            score: waterScore,
            status: waterStatus,
            detail: waterDetail
          },
          {
            name: "Seasonal Timing",
            score: seasonScore,
            status: seasonStatus,
            detail: seasonDetail
          }
        ]
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { code: "RECOMMENDATION_ERROR", message: "Failed to evaluate crop recommendation" }
    }, { status: 500 });
  }
}
