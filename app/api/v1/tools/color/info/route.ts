import { NextResponse } from "next/server";
import ntc from "ntcjs";
import chroma from "chroma-js";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const hex = url.searchParams.get("hex");

  if (!hex) {
    return NextResponse.json({ error: "Missing hex query parameter" }, { status: 400 });
  }

  // Normalize and validate
  let formattedHex = hex.startsWith("#") ? hex : `#${hex}`;
  formattedHex = formattedHex.toUpperCase();

  // Support 3 or 6 digit hex
  if (!/^#([0-9A-F]{3}|[0-9A-F]{6})$/.test(formattedHex)) {
    return NextResponse.json({ error: "Invalid hex format. Use #RRGGBB or #RGB" }, { status: 400 });
  }

  const [name, exactMatch] = ntc.name(formattedHex);
  const color = chroma(formattedHex);

  // Extract color data
  const rgb = color.rgb();
  const hsl = color.hsl();
  const luminance = color.luminance();
  const contrastWhite = chroma.contrast(color, "white");
  const contrastBlack = chroma.contrast(color, "black");
  const isLight = luminance > 0.5;
  const textColor = isLight ? "#000000" : "#FFFFFF";

  // Auto-generate palette
  const palette = {
    complementary: color.set("hsl.h", hsl[0] + 180).hex(),
    shades: chroma.scale([color.darken(2), color]).colors(5),
    tints: chroma.scale([color, color.brighten(2)]).colors(5),
  };

  return NextResponse.json({
    input: hex,
    hex: color.hex(),
    name,
    exactMatch,
    rgb,
    hsl,
    luminance,
    isLight,
    bestTextColor: textColor,
    contrast: {
      white: contrastWhite,
      black: contrastBlack,
    },
    palette,
  });
}
