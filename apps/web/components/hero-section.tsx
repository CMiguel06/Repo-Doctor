"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Play } from "lucide-react";
import { HealthScoreCard } from "@/components/health-score-card";
import { Button } from "@/components/ui";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

interface HeroSectionProps {
  onRunScan: () => void;
  onViewReport: () => void;
  score: number;
  scanStatusText: string;
  isComplete: boolean;
}

export function HeroSection({ onRunScan, onViewReport, score, scanStatusText, isComplete }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-6 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.p variants={item} className="text-sm font-medium text-accent">
            Repo Doctor
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-normal text-ink sm:text-6xl lg:text-7xl"
          >
            Diagnose your repository before it fails in public.
          </motion.h1>
          <motion.p variants={item} className="mt-7 max-w-2xl text-lg leading-8 text-muted">
            Repo Doctor runs a demo scan across documentation, security, architecture, tests, automation and
            portfolio readiness so teams can understand what weakens a repository before it reaches reviewers.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button aria-label="Run demo scan" onClick={onRunScan}>
              <Play aria-hidden="true" size={17} />
              Run demo scan
            </Button>
            <Button aria-label="View sample report" onClick={onViewReport} variant="secondary">
              <FileText aria-hidden="true" size={17} />
              View sample report
            </Button>
          </motion.div>
          <motion.div variants={item} className="mt-10 grid max-w-2xl gap-3 text-sm text-muted sm:grid-cols-3">
            {["Explainable scoring", "Local-first reports", "Review-ready output"].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <ArrowRight aria-hidden="true" size={15} className="text-accent" />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <HealthScoreCard score={score} status={scanStatusText} isComplete={isComplete} />
          <div className="mt-4 overflow-hidden rounded-lg border border-line bg-white p-4 shadow-panel">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-ink">Subtle scan preview</span>
              <span className="text-muted">{isComplete ? "Complete" : "Scanning"}</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-accent"
                animate={{ width: isComplete ? "78%" : ["12%", "58%", "34%", "72%"] }}
                transition={{ duration: isComplete ? 0.6 : 2.4, repeat: isComplete ? 0 : Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
