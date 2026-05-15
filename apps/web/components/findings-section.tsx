"use client";

import { AnimatePresence } from "framer-motion";
import { findings } from "@/lib/mock-data";
import type { FindingSeverity } from "@/types/repo-doctor";
import { FindingCard } from "@/components/finding-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui";
import { useMemo, useState } from "react";

type Filter = "all" | FindingSeverity;

const filters: Filter[] = ["all", "critical", "warning", "info"];

export function FindingsSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const visibleFindings = useMemo(
    () => (filter === "all" ? findings : findings.filter((finding) => finding.severity === filter)),
    [filter]
  );

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Prioritise fixes that actually improve repository quality."
          description="Findings are written for humans: severity, impact and the next correction are visible without digging through raw logs."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-2" aria-label="Finding severity filters">
          {filters.map((option) => (
            <Button
              key={option}
              variant={filter === option ? "primary" : "secondary"}
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className="capitalize"
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleFindings.map((finding, index) => (
              <FindingCard key={finding.id} finding={finding} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
