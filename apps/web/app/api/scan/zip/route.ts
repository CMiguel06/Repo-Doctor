import { writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { analyzeFromZip } from "@/lib/repo-analyzer";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "ZIP file is required." }, { status: 400 });
  if (!file.name.endsWith(".zip")) return NextResponse.json({ error: "Only .zip files are accepted." }, { status: 400 });
  const temp = join(tmpdir(), `${Date.now()}-${file.name}`);
  try {
    await writeFile(temp, Buffer.from(await file.arrayBuffer()));
    const result = await analyzeFromZip(temp, file.name);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "ZIP scan failed." }, { status: 400 });
  } finally {
    await rm(temp, { force: true });
  }
}
