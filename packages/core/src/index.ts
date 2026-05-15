export type { CoreFinding, FindingSeverity, RepositorySnapshot, RuleCategory, RuleResult } from "./types.js";
export { calculateScore, getScoreLabel } from "./scoring.js";
export { evaluateDocumentation } from "./rules/documentation.js";
export { evaluateSecurity } from "./rules/security.js";
export { evaluateArchitecture } from "./rules/architecture.js";
export { evaluateTesting } from "./rules/testing.js";
export { evaluateAutomation } from "./rules/automation.js";
