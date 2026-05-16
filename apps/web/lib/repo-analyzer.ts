import { execFile } from "node:child_process";
import { mkdtemp, readdir, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, extname, join, relative } from "node:path";
import { promisify } from "node:util";
import type { Finding, FixRecommendation, Metric, ScanLogEntry, ScanResult, SourceType } from "@/types/repo-doctor";

const execFileAsync = promisify(execFile);
const MAX_FILES = 1200;
const MAX_FILE_SIZE = 1024 * 1024;
const EXCLUDED = new Set([".git", "node_modules", "dist", "build", ".next", "vendor", "coverage"]);

const store = new Map<string, ScanResult>();
export const getReport = (id: string) => store.get(id);

export async function analyzeFromGit(url: string): Promise<ScanResult> {
  if (!url) throw new Error("URL is required.");
  try { new URL(url); } catch { throw new Error("Invalid URL."); }
  if (!url.endsWith(".git")) throw new Error("Repository URL must end with .git.");
  const root = await mkdtemp(join(tmpdir(), "repo-doctor-git-"));
  const logs: ScanLogEntry[] = [];
  const log = (message: string) => logs.push({ timestamp: new Date().toISOString(), message });
  try {
    log("Validating repository input...");
    log("Connecting to remote repository...");
    await execFileAsync("git", ["clone", "--depth", "1", "--filter=blob:none", url, root], { timeout: 90000 });
    log("Fetching repository...");
    const result = await analyzeDirectory(root, "git", url, logs);
    store.set(result.scanId, result);
    return result;
  } catch {
    throw new Error("Failed to clone or access repository.");
  } finally { await rm(root, { recursive: true, force: true }); }
}

export async function analyzeFromZip(filePath: string, fileName: string): Promise<ScanResult> {
  const extractRoot = await mkdtemp(join(tmpdir(), "repo-doctor-zip-"));
  const logs: ScanLogEntry[] = [];
  const log = (message: string) => logs.push({ timestamp: new Date().toISOString(), message });
  try {
    log("Validating repository input...");
    log("Extracting files...");
    await execFileAsync("unzip", ["-qq", filePath, "-d", extractRoot], { timeout: 60000 });
    const result = await analyzeDirectory(extractRoot, "zip", fileName, logs);
    store.set(result.scanId, result);
    return result;
  } catch {
    throw new Error("Invalid, empty, or corrupted ZIP file.");
  } finally { await rm(extractRoot, { recursive: true, force: true }); }
}

async function analyzeDirectory(root: string, sourceType: SourceType, source: string, logs: ScanLogEntry[]): Promise<ScanResult> {
  logs.push({ timestamp: new Date().toISOString(), message: "Reading source files..." });
  const files = await walk(root, root);
  if (!files.length) throw new Error("Repository has no analyzable files.");
  logs.push({ timestamp: new Date().toISOString(), message: "Running checks..." });

  const findings: Finding[] = [];
  const dependencies = new Set<string>();
  const languages = new Set<string>();
  for (const file of files.slice(0, MAX_FILES)) {
    const content = await readFile(join(root, file), "utf8").catch(() => "");
    const lines = content.split("\n").length;
    const ext = extname(file);
    if (ext) languages.add(ext);
    if (file.endsWith("package.json") && content) {
      const pkg = JSON.parse(content);
      Object.keys(pkg.dependencies || {}).forEach((d) => dependencies.add(d));
    }
    checkPatterns(file, content, lines, findings);
  }
  logs.push({ timestamp: new Date().toISOString(), message: "Generating report..." });

  const metrics: Metric[] = [
    { id: "codeQuality", label: "Code Quality", score: scoreFrom(findings, "Code Quality") },
    { id: "security", label: "Security", score: scoreFrom(findings, "Security") },
    { id: "maintainability", label: "Maintainability", score: scoreFrom(findings, "Maintainability") },
    { id: "performance", label: "Performance", score: scoreFrom(findings, "Performance") },
    { id: "testing", label: "Testing", score: scoreFrom(findings, "Testing") },
    { id: "documentation", label: "Documentation", score: scoreFrom(findings, "Documentation") }
  ];
  const overallScore = Math.round(metrics.reduce((a, b) => a + b.score, 0) / metrics.length);
  const classification = overallScore < 40 ? "Poor" : overallScore < 60 ? "Fair" : overallScore < 80 ? "Good" : "Excellent";
  const fixes: FixRecommendation[] = findings.slice(0, 12).map((f) => ({ id: f.id, title: f.title, file: f.file, line: f.line, severity: f.severity, category: f.category, description: f.description, suggestion: f.recommendation || "Review finding and apply fix" }));
  logs.push({ timestamp: new Date().toISOString(), message: "Scan complete." });
  const scanId = crypto.randomUUID();
  return { scanId, metadata: { repositoryName: basename(source).replace(".git", ""), source, sourceType, analyzedAt: new Date().toISOString(), analyzedFiles: files.length, detectedLanguages: [...languages], dependencies: [...dependencies] }, overallScore, classification, metrics, findings, fixes, scanLog: logs, report: { executiveSummary: `Analysis completed with score ${overallScore}/100 (${classification}).`, riskOverview: `${findings.filter((f) => f.severity === "critical").length} critical findings identified.`, appendix: `Files analyzed: ${files.length}.`, markdown: `# Generated Report\n\nOverall score: ${overallScore}/100` } };
}

function checkPatterns(file: string, content: string, lines: number, findings: Finding[]) {
  const push = (title: string, severity: "critical"|"warning"|"info", category: string, description: string, recommendation: string) => findings.push({ id: crypto.randomUUID(), title, severity, category, description, file, recommendation, technicalJustification: description });
  if (lines > 400) push("Long file detected", "warning", "Code Quality", "File exceeds 400 lines.", "Split file into smaller modules.");
  if (/TODO|FIXME|HACK/.test(content)) push("Technical debt markers", "info", "Maintainability", "TODO/FIXME/HACK markers found.", "Track and resolve debt items.");
  if (/eval\(/.test(content)) push("Unsafe eval usage", "warning", "Security", "eval() call detected.", "Replace eval with safe parser or explicit logic.");
  if (/innerHTML\s*=/.test(content)) push("Unsafe innerHTML assignment", "warning", "Security", "innerHTML assignment detected.", "Use textContent or sanitize inputs.");
  if (/api[_-]?key|secret|password\s*=|BEGIN PRIVATE KEY/i.test(content)) push("Potential secret exposure", "critical", "Security", "Potential credential pattern found.", "Move secret to environment variables and rotate credentials.");
  if (!/test|spec/i.test(file) && /describe\(|it\(/.test(content)) push("Testing file naming", "info", "Testing", "Test-like code in non-test file.", "Move tests to *.test or *.spec files.");
}

function scoreFrom(findings: Finding[], categoryLabel: string) {
  type Severity = "critical"|"warning"|"info";
  const map: Record<Severity, number> = { critical: 25, warning: 10, info: 3 };
  const penalty = findings.filter((f) => f.category === categoryLabel).reduce((acc, f) => acc + map[f.severity], 0);
  return Math.max(0, 100 - penalty);
}

async function walk(root: string, dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const e of entries) {
    if (EXCLUDED.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(root, full)));
    else {
      const s = await stat(full);
      if (s.size <= MAX_FILE_SIZE) out.push(relative(root, full));
    }
  }
  return out;
}
