import { NextResponse } from "next/server";
import chroma from "chroma-js";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const hex1 = url.searchParams.get("hex1");
  const hex2 = url.searchParams.get("hex2");

  if (!hex1 || !hex2) {
    return NextResponse.json({ error: "Missing hex1 or hex2 query parameters" }, { status: 400 });
  }

  const formatHex = (hex: string) => (hex.startsWith("#") ? hex : `#${hex}`);

  try {
    const color1 = chroma(formatHex(hex1));
    const color2 = chroma(formatHex(hex2));

    const contrastRatio = chroma.contrast(color1, color2);

    // Determine WCAG compliance
    const wcag = {
      AA: contrastRatio >= 4.5,
      AAA: contrastRatio >= 7,
      "AA-large": contrastRatio >= 3,
    };

    return NextResponse.json({
      hex1: formatHex(hex1),
      hex2: formatHex(hex2),
      contrastRatio: parseFloat(contrastRatio.toFixed(2)),
      wcag,
    });
  } catch (err) {
    return NextResponse.json({ error: "Invalid hex values" }, { status: 400 });
  }
}
