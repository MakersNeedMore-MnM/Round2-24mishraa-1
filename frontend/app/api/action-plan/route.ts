import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const crop = searchParams.get("crop") || "Crop";
    const cropStage = searchParams.get("crop_stage") || "Vegetative";
    const diseaseName = searchParams.get("disease_name") || "Early Blight";
    const weatherRisk = searchParams.get("weather_risk") || "High Humidity";

    const cleanDisease = diseaseName.replace(/.*___/, "").replace(/_/g, " ");

    const actionPlan = [
      {
        id: "act-1",
        title: `Isolate Foliage & Apply Protective Spray for ${crop}`,
        category: "Treatment",
        priority: "high",
        timeline: "Immediate (Next 24h)",
        description: `Apply targeted Copper Oxychloride (2.5g/L) or Mancozeb spray to treat ${cleanDisease}. Ensure full canopy under-leaf coverage before noon.`
      },
      {
        id: "act-2",
        title: `Mitigate Moisture & Drainage Channels`,
        category: "Irrigation",
        priority: "high",
        timeline: "Day 1-2",
        description: `Address ${weatherRisk} risk. Clear drainage furrows and suspend overhead irrigation to reduce canopy wetness duration.`
      },
      {
        id: "act-3",
        title: `Targeted NPK Fertigation for ${cropStage} Stage`,
        category: "Soil Care",
        priority: "medium",
        timeline: "This Week",
        description: `Apply top-dressing of Potassium Nitrate (13-0-45) at 5kg/acre during ${cropStage} stage to reinforce plant cell wall resistance.`
      },
      {
        id: "act-4",
        title: "Bio-Sentinel Monitoring & Scouting",
        category: "Prevention",
        priority: "low",
        timeline: "Every 3 Days",
        description: "Scout 20 random plants per acre across a zigzag pattern to monitor lesion progression and pest egg clusters."
      }
    ];

    return NextResponse.json({
      success: true,
      data: actionPlan
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { code: "ACTION_PLAN_ERROR", message: "Failed to generate action plan" }
    }, { status: 500 });
  }
}
