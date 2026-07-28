import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { verifyDownloadToken } from "@/lib/token";
import { ZIP_FILENAME, zipPath } from "@/lib/asset";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const payload = verifyDownloadToken(token);

  if (!payload) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }

  let file: Buffer;
  try {
    file = await readFile(zipPath());
  } catch (err) {
    console.error("[download] zip read failed:", err);
    return NextResponse.json({ error: "file_unavailable" }, { status: 500 });
  }

  return new NextResponse(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${ZIP_FILENAME}"`,
      "Content-Length": String(file.length),
      "Cache-Control": "no-store",
    },
  });
}
