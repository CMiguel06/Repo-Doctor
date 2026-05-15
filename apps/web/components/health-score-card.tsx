"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck } from "lucide-react";
import { MetricPanel } from "@/components/ui";

interface HealthScoreCardProps {
  score: number;
  status: string;
  isComplete?: boolean;
}

export function HealthScoreCard({ score, status, isComplete = true }: HealthScoreCardProps) {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <MetricPanel className="overflow-hidden p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">Repository Health Score</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{score}/100</p>
        </div>
        <div className="rounded-md border border-line bg-soft p-3 text-accent">
          <ShieldCheck aria-hidden="true" size={22} />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <div className="relative h-36 w-36">
          <svg aria-hidden="true" className="h-36 w-36 -rotate-90" viewBox="0 0 132 132">
            <circle cx="66" cy="66" r="52" fill="none" stroke="#E5E7EB" strokeWidth="10" />
            <motion.circle
              cx="66"
              cy="66"
              r="52"
              fill="none"
              stroke={score >= 80 ? "#16A34A" : "#2563EB"}
              strokeLinecap="round"
              strokeWidth="10"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              strokeDasharray={circumference}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.span
              key={score}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-semibold text-ink"
            >
              {score}
            </motion.span>
            <span className="text-xs font-medium uppercase text-muted">score</span>
          </div>
        </div>
      </div>

      <div className="mt-7 rounded-md border border-line bg-soft p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-ink">
          <Activity aria-hidden="true" size={16} className={isComplete ? "text-success" : "text-accent"} />
          Demo scan status
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">{status}</p>
      </div>
    </MetricPanel>
  );
}
