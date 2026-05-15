import type { RuleResult, RepositorySnapshot } from "../types.js";

export function evaluateDocumentation(snapshot: RepositorySnapshot): RuleResult {
  const hasReadme = snapshot.files.some((file) => /^readme\.md$/i.test(file));

  if (hasReadme) {
    return { findings: [] };
  }

  return {
    findings: [
      {
        id: "missing-readme",
        title: "README.md not found",
        severity: "warning",
        category: "Documentation",
        description: "The repository does not include a README entry point.",
        impact: -12,
        suggestion: "Add a README.md with overview, setup, usage and contribution notes."
      }
    ]
  };
}
