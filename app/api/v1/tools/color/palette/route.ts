import { NextResponse } from "next/server";
import chroma from "chroma-js";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const baseHex = url.searchParams.get("base");
  const count = parseInt(url.searchParams.get("count") || "5");

  if (!baseHex) {
    return NextResponse.json({ error: "Missing base color" }, { status: 400 });
  }

  const formatHex = (hex: string) => (hex.startsWith("#") ? hex : `#${hex}`);

  try {
    const base = chroma(formatHex(baseHex));
    const baseHSL = base.hsl();

    const getColorInfo = (c: chroma.Color) => {
      const luminance = c.luminance();
      const isLight = luminance > 0.5;
      return {
        hex: c.hex(),
        rgb: c.rgb(),
        hsl: c.hsl(),
        luminance,
        isLight,
        bestTextColor: isLight ? "#000000" : "#FFFFFF",
      };
    };

    // Utility to shift hue
    const shiftHue = (c: chroma.Color, deg: number) => {
      const [h, s, l] = c.hsl();
      return chroma.hsl((h + deg + 360) % 360, s, l);
    };

    // Generate harmonies
    const analogous = [-30, 0, 30].map((deg) => shiftHue(base, deg));
    const complementary = [base, shiftHue(base, 180)];
    const triad = [base, shiftHue(base, 120), shiftHue(base, 240)];
    const tetrad = [base, shiftHue(base, 90), shiftHue(base, 180), shiftHue(base, 270)];
    const splitComplementary = [base, shiftHue(base, 150), shiftHue(base, 210)];

    // Tonal scale (light → dark)
    const tonalScale = chroma.scale([base.brighten(2), base.darken(2)]).mode("lab").colors(count);

    // Monochrome (grayscale + base)
    const monochrome = chroma.scale(["white", base.hex(), "black"]).colors(count);

    const palette = {
      input: baseHex,
      base: getColorInfo(base),
      harmonies: {
        monochrome: monochrome.map((h) => getColorInfo(chroma(h))),
        analogous: analogous.map(getColorInfo),
        complementary: complementary.map(getColorInfo),
        triad: triad.map(getColorInfo),
        tetrad: tetrad.map(getColorInfo),
        splitComplementary: splitComplementary.map(getColorInfo),
      },
      tonalScale: tonalScale.map((h) => getColorInfo(chroma(h))),
    };

    return NextResponse.json(palette);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid color value" }, { status: 400 });
  }
}
