"use client";
import { useMemo, useState } from "react";
import type { ScanResult, ScanStatus } from "@/types/repo-doctor";

const steps = ["Connecting", "Fetching repository", "Reading files", "Running checks", "Generating report", "Complete"];

export default function Home() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const step = useMemo(() => Math.min(steps.length - 1, Math.floor((progress / 100) * steps.length)), [progress]);

  async function scanGit() {
    setError("");
    if (!url) return setError("Repository URL is required.");
    try { new URL(url); } catch { return setError("Invalid repository URL."); }
    if (!url.endsWith(".git")) return setError("Repository URL must end with .git.");
    setStatus("fetching"); setProgress(10);
    const timer = setInterval(() => setProgress((p) => Math.min(92, p + 8)), 400);
    const res = await fetch("/api/scan/git", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
    clearInterval(timer);
    const data = await res.json();
    if (!res.ok) { setStatus("error"); setError(data.error || "Scan failed."); return; }
    setResult(data); setProgress(100); setStatus("complete");
  }

  async function onZip(file: File) {
    if (!file.name.endsWith(".zip")) return setError("Only .zip files are accepted.");
    setStatus("extracting"); setProgress(12); setError("");
    const form = new FormData(); form.append("file", file);
    const timer = setInterval(() => setProgress((p) => Math.min(90, p + 10)), 450);
    const res = await fetch("/api/scan/zip", { method: "POST", body: form });
    clearInterval(timer);
    const data = await res.json();
    if (!res.ok) { setStatus("error"); setError(data.error || "ZIP scan failed."); return; }
    setResult(data); setProgress(100); setStatus("complete");
  }

  return <main className="min-h-screen bg-white text-slate-900 p-6">
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="flex justify-between"><b>Repo Doctor</b><nav className="space-x-4 text-sm"><span>Features</span><span>Docs</span><span>Blog</span><span>Changelog</span></nav></header>
      <section className="grid lg:grid-cols-2 gap-6 p-6 rounded-2xl border">
        <div className="space-y-4"><p className="text-blue-600 text-sm">Repository health analysis for engineering teams</p><h1 className="text-4xl font-semibold">Diagnose your repository before it fails in public.</h1>
          <p className="text-slate-600">Analyze real repositories via .git URL or ZIP upload and receive actionable findings.</p>
          <div className="flex gap-2"><input className="border rounded-lg px-3 py-2 flex-1" placeholder="https://github.com/org/repo.git" value={url} onChange={(e)=>setUrl(e.target.value)} /><button onClick={scanGit} className="bg-blue-600 text-white px-4 rounded-lg">Scan repository</button></div>
          <label className="block border-2 border-dashed rounded-xl p-6 text-center hover:border-blue-500">Drop your repository ZIP to start scanning<input type="file" accept=".zip" className="hidden" onChange={(e)=>e.target.files?.[0] && onZip(e.target.files[0])} /></label>
          {error && <p className="text-red-600">{error}</p>}
        </div>
        <div className="rounded-2xl border p-4"><p className="font-semibold">Repository Health Score</p><p className="text-5xl font-bold my-4">{result?.overallScore ?? 0}</p><p>{result?.classification ?? "-"}</p></div>
      </section>
      <section className="rounded-2xl border p-6"><h2 className="font-semibold">{status==="error"?"Repository Scan failed":status==="complete"?"Repository Scan complete":"Repository Scan in progress"}</h2><p className="text-sm text-slate-600">{result?.metadata.source || url || "-"}</p>
        <div className="h-2 bg-slate-100 rounded mt-4"><div className="h-2 bg-blue-600 rounded" style={{width:`${progress}%`}} /></div><p className="text-sm mt-2">{progress}% · {steps[step]}</p></section>
      {result && <section className="grid lg:grid-cols-2 gap-6"><div className="border rounded-2xl p-4"><h3 className="font-semibold">Top Findings</h3>{result.findings.slice(0,8).map(f=><div key={f.id} className="py-2 border-b text-sm">{f.severity} · {f.title} · {f.file}</div>)}</div><div className="border rounded-2xl p-4"><h3 className="font-semibold">Recommended Fixes</h3>{result.fixes.slice(0,8).map(f=><div key={f.id} className="py-2 border-b text-sm">{f.title} — {f.suggestion}</div>)}</div></section>}
    </div>
  </main>;
}
