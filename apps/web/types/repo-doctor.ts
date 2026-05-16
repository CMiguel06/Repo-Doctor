export type ScanStatus = "idle" | "dragging" | "validating" | "fetching" | "extracting" | "scanning" | "generating_report" | "complete" | "error" | "running" | "completed";
export type SourceType = "git" | "zip";
export type Severity = "Critical" | "High" | "Medium" | "Low" | "Informational" | "critical" | "warning" | "info";

export interface RepositoryMetadata {
  repositoryName: string;
  source: string;
  sourceType: SourceType;
  analyzedAt: string;
  branch?: string;
  commitHash?: string;
  analyzedFiles: number;
  detectedLanguages: string[];
  dependencies: string[];
}

export interface Metric {
  id: "codeQuality" | "security" | "maintainability" | "performance" | "testing" | "documentation";
  label: string;
  score: number;
}

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: "critical"|"warning"|"info";
  category: string;
  file?: string;
  line?: number;
  recommendation?: string;
  technicalJustification?: string;
  impact?: number;
  suggestion?: string;
}

export interface FixRecommendation {
  id: string;
  title: string;
  file?: string;
  line?: number;
  severity: "critical"|"warning"|"info";
  category: string;
  description: string;
  suggestion: string;
}

export interface ScanLogEntry {
  timestamp: string;
  message: string;
}

export interface GeneratedReport {
  executiveSummary: string;
  riskOverview: string;
  appendix: string;
  markdown: string;
}

export interface ScanResult {
  scanId: string;
  metadata: RepositoryMetadata;
  overallScore: number;
  classification: "Poor" | "Fair" | "Good" | "Excellent";
  metrics: Metric[];
  findings: Finding[];
  fixes: FixRecommendation[];
  report: GeneratedReport;
  scanLog: ScanLogEntry[];
}

export interface CategoryScore { id: string; name: string; score: number; description: string; }
export interface RecommendedFix { id: string; priority: number; title: string; description: string; estimatedGain: number; }
export interface RepositoryReport { repositoryName: string; scanDate: string; score: number; riskLevel: "low"|"medium"|"high"; summary: string; findings: Finding[]; recommendedFixes: RecommendedFix[]; categories: CategoryScore[]; }
export type ScanPhase = { id: string; label: string; status: "pending"|"running"|"completed" };
export type FindingSeverity = "critical"|"warning"|"info";
export type RiskLevel = "low"|"medium"|"high";
