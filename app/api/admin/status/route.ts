import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseServer"; 

const db = adminDb;

export async function GET(req: NextRequest) {
    try {
        const snapshot = await db.collection("sites").get();
        const sites = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json({ success: true, sites });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { password, updates } = await req.json();

    // Verify password against ENV
    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const batch = db.batch();
        updates.forEach((update: any) => {
            const ref = db.collection("sites").doc(update.id);
            batch.set(ref, update, { merge: true });
        });
        await batch.commit();

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
