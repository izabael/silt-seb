import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.REVALIDATE_SECRET || "seb-refresh-2026";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }
  revalidatePath("/");
  return NextResponse.json({ revalidated: true, now: new Date().toISOString() });
}
