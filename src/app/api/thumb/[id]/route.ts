import { NextRequest, NextResponse } from "next/server";

/** Proxies Google Drive thumbnails so the browser only talks to our origin.
 *  Avoids Drive hotlink/rate-limit flakiness and lets us cache aggressively. */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!/^[\w-]{10,60}$/.test(id)) {
    return NextResponse.json({ error: "bad id" }, { status: 400 });
  }

  const res = await fetch(
    `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
    { next: { revalidate: 60 * 60 * 24 } }
  );
  const type = res.headers.get("Content-Type") ?? "";
  if (!res.ok || !type.startsWith("image/")) {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  const buf = await res.arrayBuffer();
  return new NextResponse(buf, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
    },
  });
}
