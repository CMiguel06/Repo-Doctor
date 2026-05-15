export type FindingSeverity = "critical" | "warning" | "info";

export type RuleCategory =
  | "Documentation"
  | "Security"
  | "Architecture"
  | "Testing"
  | "Automation"
  | "Maintainability"
  | "Portfolio Readiness";

export interface CoreFinding {
  id: string;
  title: string;
  severity: FindingSeverity;
  category: RuleCategory;
  description: string;
  impact: number;
  suggestion: string;
}

export interface RepositorySnapshot {
  files: string[];
  packageScripts?: Record<string, string>;
}

export interface RuleResult {
  findings: CoreFinding[];
}
