import type { CoreFinding } from "./types.js";

export function calculateScore(findings: CoreFinding[], baseline = 100): number {
  const impact = findings.reduce((total, finding) => total + Math.abs(finding.impact), 0);
  return Math.max(0, Math.min(100, baseline - impact));
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Healthy";
  if (score >= 50) return "Needs attention";
  return "High risk";
}
