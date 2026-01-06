import { NextResponse } from "next/server";
import { fetcher } from "@/lib/coingecko.actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) return NextResponse.json({ coins: [] });

  const data = await fetcher("search", { query });
  return NextResponse.json(data);
}
