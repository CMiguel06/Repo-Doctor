export type ScanStatus = "idle" | "running" | "completed";

export type PhaseStatus = "pending" | "running" | "completed";

export type FindingSeverity = "critical" | "warning" | "info";

export type RiskLevel = "low" | "medium" | "high";

export interface ScanPhase {
  id: string;
  label: string;
  status: PhaseStatus;
}

export interface Finding {
  id: string;
  title: string;
  severity: FindingSeverity;
  category: string;
  description: string;
  impact: number;
  suggestion: string;
}

export interface CategoryScore {
  id: string;
  name: string;
  score: number;
  description: string;
}

export interface RecommendedFix {
  id: string;
  priority: number;
  title: string;
  description: string;
  estimatedGain: number;
}

export interface RepositoryReport {
  repositoryName: string;
  scanDate: string;
  score: number;
  riskLevel: RiskLevel;
  summary: string;
  findings: Finding[];
  recommendedFixes: RecommendedFix[];
  categories: CategoryScore[];
}
