import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: farmId } = await context.params;
    return NextResponse.json({
      success: true,
      data: {
        id: farmId,
        name: "Green Valley Farm",
        state: "Maharashtra",
        district: "Nagpur",
        area_acres: 5.5,
        soil_type: "Black Soil",
        water_availability: "Moderate",
        crops: [
          {
            id: "crop_101",
            name: "Cotton",
            stage: "Vegetative",
            sowing_date: "2026-06-15"
          }
        ],
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { code: "GET_FARM_ERROR", message: "Failed to fetch farm details" }
    }, { status: 500 });
  }
}
