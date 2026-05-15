import type { RuleResult, RepositorySnapshot } from "../types.js";

export function evaluateAutomation(snapshot: RepositorySnapshot): RuleResult {
  const hasWorkflow = snapshot.files.some((file) => /^\.github(\/|\\)workflows(\/|\\).+\.ya?ml$/i.test(file));

  if (hasWorkflow) {
    return { findings: [] };
  }

  return {
    findings: [
      {
        id: "missing-ci-workflow",
        title: "CI workflow not found",
        severity: "warning",
        category: "Automation",
        description: "No GitHub Actions workflow was detected.",
        impact: -10,
        suggestion: "Add a workflow that installs dependencies and runs lint, tests and build."
      }
    ]
  };
}
