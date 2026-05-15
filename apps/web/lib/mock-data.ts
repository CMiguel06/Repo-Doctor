import type { CategoryScore, Finding, RecommendedFix, RepositoryReport, ScanPhase } from "@/types/repo-doctor";
import { calculateRepositoryScore, getRiskLevel } from "@/lib/scoring";

export const initialScanPhases: ScanPhase[] = [
  { id: "structure", label: "Reading repository structure", status: "pending" },
  { id: "docs", label: "Checking documentation", status: "pending" },
  { id: "security", label: "Inspecting security hygiene", status: "pending" },
  { id: "architecture", label: "Evaluating architecture", status: "pending" },
  { id: "tests", label: "Checking tests and automation", status: "pending" },
  { id: "score", label: "Computing repository health score", status: "pending" },
  { id: "report", label: "Generating report", status: "pending" }
];

export const findings: Finding[] = [
  {
    id: "missing-ci",
    title: "Missing CI/CD workflow",
    severity: "warning",
    category: "Automation",
    description: "This repository does not include an automated workflow for build or tests.",
    impact: -10,
    suggestion: "Add a GitHub Actions workflow to run install, lint, build and tests."
  },
  {
    id: "missing-architecture-docs",
    title: "No architecture documentation found",
    severity: "warning",
    category: "Architecture",
    description: "The repository does not explain its system boundaries, modules or technical decisions.",
    impact: -8,
    suggestion: "Create docs/architecture.md with the application structure, data flow and key tradeoffs."
  },
  {
    id: "readme-setup",
    title: "README exists but lacks setup instructions",
    severity: "info",
    category: "Documentation",
    description: "The project overview is present, but a reviewer may not know how to install and run it.",
    impact: -5,
    suggestion: "Add installation, development, build and Docker commands to the README."
  },
  {
    id: "missing-tests",
    title: "No test folder detected",
    severity: "warning",
    category: "Testing",
    description: "No obvious automated test structure was found in the repository.",
    impact: -12,
    suggestion: "Introduce unit or integration tests for core scoring and repository rule evaluation."
  },
  {
    id: "ai-metadata",
    title: "Possible AI metadata folder detected",
    severity: "info",
    category: "Maintainability",
    description: "Tooling metadata can leak implementation context or clutter a public repository.",
    impact: -3,
    suggestion: "Keep local tool metadata out of version control through .gitignore and pre-publish checks."
  },
  {
    id: "missing-security",
    title: "No SECURITY.md file found",
    severity: "warning",
    category: "Security",
    description: "The project does not provide a clear process for reporting vulnerabilities.",
    impact: -6,
    suggestion: "Add SECURITY.md with supported versions and a responsible disclosure contact."
  }
];

export const categories: CategoryScore[] = [
  {
    id: "documentation",
    name: "Documentation",
    score: 74,
    description: "Readable overview exists, but setup and architecture notes need more detail."
  },
  {
    id: "security",
    name: "Security",
    score: 70,
    description: "Basic hygiene is present, with room for disclosure and secret handling policies."
  },
  {
    id: "architecture",
    name: "Architecture",
    score: 68,
    description: "Structure is understandable, but design decisions are not yet documented."
  },
  {
    id: "testing",
    name: "Testing",
    score: 62,
    description: "Automated test coverage should be introduced before public release."
  },
  {
    id: "automation",
    name: "Automation",
    score: 58,
    description: "CI/CD is the highest leverage improvement for reliability."
  },
  {
    id: "maintainability",
    name: "Maintainability",
    score: 82,
    description: "The repository is small and readable, with manageable technical surface."
  },
  {
    id: "portfolio-readiness",
    name: "Portfolio Readiness",
    score: 78,
    description: "The project is close to review-ready once setup and quality signals improve."
  }
];

export const recommendedFixes: RecommendedFix[] = [
  {
    id: "fix-ci",
    priority: 1,
    title: "Add a CI workflow",
    description: "Run install, lint, build and tests on every pull request.",
    estimatedGain: 10
  },
  {
    id: "fix-tests",
    priority: 2,
    title: "Add test coverage",
    description: "Cover scoring logic and repository rules with focused automated tests.",
    estimatedGain: 12
  },
  {
    id: "fix-architecture",
    priority: 3,
    title: "Document architecture",
    description: "Explain modules, data flow, persistence and planned analysis pipeline.",
    estimatedGain: 8
  },
  {
    id: "fix-security",
    priority: 4,
    title: "Add SECURITY.md",
    description: "Clarify responsible disclosure and supported versions.",
    estimatedGain: 6
  },
  {
    id: "fix-readme",
    priority: 5,
    title: "Improve README setup instructions",
    description: "Make the project easy to install, run, build and review.",
    estimatedGain: 5
  }
];

const score = calculateRepositoryScore(findings, 122);

export const sampleReport: RepositoryReport = {
  repositoryName: "Repo Doctor Demo Repository",
  scanDate: "2026-05-16",
  score,
  riskLevel: getRiskLevel(score),
  summary: "Healthy, but needs automation and security improvements",
  findings,
  recommendedFixes,
  categories
};
