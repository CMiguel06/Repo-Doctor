import type { Finding, RiskLevel } from "@/types/repo-doctor";

export function calculateRepositoryScore(findings: Finding[], baseline = 100): number {
  const penalty = findings.reduce((total, finding) => total + Math.abs(finding.impact), 0);
  return Math.max(0, Math.min(100, baseline - penalty));
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return "low";
  if (score >= 60) return "medium";
  return "high";
}
