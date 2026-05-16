import { NextResponse } from "next/server";
import { getReport } from "@/lib/repo-analyzer";

export async function GET(_: Request, { params }: { params: { scanId: string } }) {
  const report = getReport(params.scanId);
  if (!report) return NextResponse.json({ error: "Report not found." }, { status: 404 });
  return NextResponse.json(report);
}
