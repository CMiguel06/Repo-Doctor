"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Info, Siren } from "lucide-react";
import type { Finding } from "@/types/repo-doctor";
import { cn } from "@/lib/utils";

const severityStyles = {
  critical: "border-critical/30 bg-red-50 text-critical",
  warning: "border-warning/30 bg-amber-50 text-warning",
  info: "border-accent/25 bg-blue-50 text-accent"
};

export function FindingCard({ finding, index }: { finding: Finding; index: number }) {
  const Icon = finding.severity === "critical" ? Siren : finding.severity === "warning" ? AlertTriangle : Info;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className="rounded-lg border border-line bg-white p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className={cn("rounded-md border p-2", severityStyles[finding.severity])}>
            <Icon aria-hidden="true" size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-ink">{finding.title}</h3>
            <p className="mt-1 text-sm text-muted">{finding.category}</p>
          </div>
        </div>
        <span className={cn("w-fit rounded-md border px-2.5 py-1 text-xs font-medium capitalize", severityStyles[finding.severity])}>
          {finding.severity}
        </span>
      </div>
      <p className="mt-5 text-sm leading-6 text-muted">{finding.description}</p>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-[120px_1fr]">
        <span className="font-medium text-ink">Impact</span>
        <span className="text-muted">{finding.impact} points</span>
        <span className="font-medium text-ink">Suggestion</span>
        <span className="leading-6 text-muted">{finding.suggestion}</span>
      </div>
    </motion.article>
  );
}
