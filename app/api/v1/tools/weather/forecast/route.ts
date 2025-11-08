import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);

    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    const city = url.searchParams.get("city");

    const unit = url.searchParams.get("unit") || "metric";
    const days = url.searchParams.get("days") || "1";

    if (parseInt(days) > 5) {
        return NextResponse.json({ error: "Max 5 days" }, { status: 400 });
    }

    const cnt = parseInt(days) * 8;



    let response = null;

    if (!city && lat && lon) {
        response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=${unit}`);
    } else if (city) {
        response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${cnt}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=${unit}`);
    } else {
        return NextResponse.json({ error: "Missing city or lat and lon query parameter" }, { status: 400 });
    }
    const data = await response.json();

    return NextResponse.json(data);
}