import type { RuleResult, RepositorySnapshot } from "../types.js";

export function evaluateArchitecture(snapshot: RepositorySnapshot): RuleResult {
  const hasArchitectureDocs = snapshot.files.some((file) => /(^|\/|\\)(architecture|adr|docs).*\.(md|mdx)$/i.test(file));

  if (hasArchitectureDocs) {
    return { findings: [] };
  }

  return {
    findings: [
      {
        id: "missing-architecture-documentation",
        title: "Architecture documentation not found",
        severity: "info",
        category: "Architecture",
        description: "No architecture notes or decision records were detected.",
        impact: -8,
        suggestion: "Document module boundaries, runtime dependencies and key decisions."
      }
    ]
  };
}
