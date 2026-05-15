import type { RuleResult, RepositorySnapshot } from "../types.js";

export function evaluateTesting(snapshot: RepositorySnapshot): RuleResult {
  const hasTests = snapshot.files.some((file) => /(^|\/|\\)(__tests__|tests?|specs?)(\/|\\)/i.test(file));
  const hasTestScript = Boolean(snapshot.packageScripts?.test);

  if (hasTests || hasTestScript) {
    return { findings: [] };
  }

  return {
    findings: [
      {
        id: "missing-tests",
        title: "Automated tests not detected",
        severity: "warning",
        category: "Testing",
        description: "No obvious test directory or package test script was detected.",
        impact: -12,
        suggestion: "Add focused tests for the most important scoring and analysis rules."
      }
    ]
  };
}
