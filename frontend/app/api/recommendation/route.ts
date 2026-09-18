import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { state = "Maharashtra", district = "Nagpur", soil_type = "Black Soil", water_availability = "Moderate", crop, season = "Kharif" } = body;

    const recommendedCrop = crop || (soil_type.toLowerCase().includes("black") ? "Cotton" : soil_type.toLowerCase().includes("red") ? "Groundnut" : "Soybean");

    return NextResponse.json({
      success: true,
      data: {
        recommended_crop: recommendedCrop,
        suitability_score: 93,
        risk_level: "Low",
        explanation: `${recommendedCrop} demonstrates high suitability for ${district}, ${state} based on ${soil_type} profile, ${water_availability.toLowerCase()} irrigation access, and ${season} climatic conditions.`,
        factors: [
          {
            name: "Soil Texture & Nutrient Retention",
            score: 96,
            status: "good",
            detail: `${soil_type} offers high cation-exchange capacity and optimal organic matter retention for ${recommendedCrop}.`
          },
          {
            name: "Water Availability & Drainage",
            score: 91,
            status: "good",
            detail: `${water_availability} irrigation supply supports critical root elongation and flowering stages.`
          },
          {
            name: "Agro-Climatic Thermal Unit Alignment",
            score: 92,
            status: "good",
            detail: `${season} growing season provides necessary cumulative Growing Degree Days (GDD).`
          }
        ]
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { code: "RECOMMENDATION_ERROR", message: "Failed to generate crop recommendation" }
    }, { status: 500 });
  }
}
