import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseServer";

export async function GET() {
    const snapshot = await adminDb.collection("sites").get();
    const data = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json({
        "success": true,
        "sites": data,
        timestamp: new Date().toISOString(),
    });
}
