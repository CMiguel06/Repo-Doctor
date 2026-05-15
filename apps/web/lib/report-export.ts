import type { RepositoryReport } from "@/types/repo-doctor";

function downloadFile(filename: string, content: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function exportReportAsJson(report: RepositoryReport): void {
  downloadFile("repo-doctor-sample-report.json", JSON.stringify(report, null, 2), "application/json");
}

export function exportReportAsMarkdown(report: RepositoryReport): void {
  const findings = report.findings
    .map(
      (finding) =>
        `- **${finding.title}** (${finding.severity}, ${finding.category}): ${finding.description} Impact: ${finding.impact} points. Suggestion: ${finding.suggestion}`
    )
    .join("\n");

  const fixes = report.recommendedFixes
    .map((fix) => `${fix.priority}. ${fix.title} — +${fix.estimatedGain} points\n   ${fix.description}`)
    .join("\n");

  const markdown = `# Repo Doctor Sample Report

Repository: ${report.repositoryName}
Scan date: ${report.scanDate}
Score: ${report.score}/100
Risk level: ${report.riskLevel}

## Summary

${report.summary}

## Main findings

${findings}

## Recommended next steps

${fixes}
`;

  downloadFile("repo-doctor-sample-report.md", markdown, "text/markdown");
}
