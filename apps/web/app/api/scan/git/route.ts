import { NextResponse } from "next/server";
import { analyzeFromGit } from "@/lib/repo-analyzer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await analyzeFromGit(body.url ?? "");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Scan failed." }, { status: 400 });
  }
}
