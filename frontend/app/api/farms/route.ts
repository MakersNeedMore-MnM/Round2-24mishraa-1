import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const farmId = `farm_${Date.now()}`;

    const newFarm = {
      id: farmId,
      name: body.name || "My Farm Plot",
      state: body.state || "Maharashtra",
      district: body.district || "Nagpur",
      area_acres: body.area_acres || 5.0,
      soil_type: body.soil_type || "Black Soil",
      water_availability: body.water_availability || "Moderate",
      crops: body.crops || [
        {
          id: `crop_${Date.now()}`,
          name: body.crop_name || "Cotton",
          stage: body.crop_stage || "Vegetative",
          sowing_date: body.sowing_date || new Date().toISOString().split("T")[0]
        }
      ],
      created_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newFarm
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { code: "CREATE_FARM_ERROR", message: "Failed to create farm" }
    }, { status: 500 });
  }
}
