"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import type { ScanPhase, ScanStatus } from "@/types/repo-doctor";
import { Button, MetricPanel } from "@/components/ui";

interface ScanDemoProps {
  phases: ScanPhase[];
  status: ScanStatus;
  progress: number;
  score: number;
  onRunScan: () => void;
}

export function ScanDemo({ phases, status, progress, score, onRunScan }: ScanDemoProps) {
  return (
    <section id="demo-scan" className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-medium text-accent">Demo scan</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Understand what weakens your repository.</h2>
            <p className="mt-5 text-base leading-7 text-muted">
              This first version simulates a repository analysis pipeline. It is intentionally labelled as a demo scan
              while the real analysis engine evolves in the core package.
            </p>
            <div className="mt-8">
              <Button onClick={onRunScan} disabled={status === "running"} aria-label="Run demo scan from scan section">
                {status === "running" ? <Loader2 aria-hidden="true" className="animate-spin" size={17} /> : null}
                {status === "running" ? "Scanning repository" : "Run demo scan"}
              </Button>
            </div>
          </div>

          <MetricPanel className="p-6">
            <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-muted">Progress</p>
                <p className="mt-1 text-2xl font-semibold text-ink">{Math.round(progress)}%</p>
              </div>
              <div className="rounded-md bg-soft px-3 py-2 text-sm font-medium text-ink">Score {score}/100</div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100" aria-label="Demo scan progress">
              <motion.div
                className="h-full rounded-full bg-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
            <ol className="mt-7 space-y-4" aria-label="Demo scan diagnostic timeline">
              {phases.map((phase, index) => (
                <motion.li
                  key={phase.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-0.5 text-muted">
                    {phase.status === "completed" ? (
                      <CheckCircle2 aria-label="completed" size={20} className="text-success" />
                    ) : phase.status === "running" ? (
                      <Loader2 aria-label="running" size={20} className="animate-spin text-accent" />
                    ) : (
                      <Circle aria-label="pending" size={20} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink">{phase.label}</p>
                    <p className="mt-1 text-xs uppercase tracking-normal text-muted">{phase.status}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </MetricPanel>
        </div>
      </div>
    </section>
  );
}
