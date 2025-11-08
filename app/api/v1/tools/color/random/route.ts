import { NextResponse } from "next/server";

// Helper to generate random hex
const randomHex = () => {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
  return `#${hex}`;
};

export async function GET() {
  const hex = randomHex();
  const rgb = `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
  return NextResponse.json({ hex, rgb });
}
