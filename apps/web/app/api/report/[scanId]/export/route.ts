import { NextResponse } from "next/server";
import { getReport } from "@/lib/repo-analyzer";

export async function GET(request: Request, { params }: { params: { scanId: string } }) {
  const report = getReport(params.scanId);
  if (!report) return NextResponse.json({ error: "Report not found." }, { status: 404 });
  const format = new URL(request.url).searchParams.get("format") ?? "json";
  if (format === "markdown") return new NextResponse(report.report.markdown, { headers: { "Content-Type": "text/markdown" } });
  return NextResponse.json(report);
}
