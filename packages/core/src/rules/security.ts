import type { RuleResult, RepositorySnapshot } from "../types.js";

export function evaluateSecurity(snapshot: RepositorySnapshot): RuleResult {
  const hasSecurityPolicy = snapshot.files.some((file) => /^security\.md$/i.test(file));

  if (hasSecurityPolicy) {
    return { findings: [] };
  }

  return {
    findings: [
      {
        id: "missing-security-policy",
        title: "SECURITY.md not found",
        severity: "warning",
        category: "Security",
        description: "No vulnerability disclosure process is documented.",
        impact: -6,
        suggestion: "Add SECURITY.md with reporting instructions and supported versions."
      }
    ]
  };
}
