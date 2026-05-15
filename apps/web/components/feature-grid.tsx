"use client";

import { motion } from "framer-motion";
import { Boxes, FileSearch, FileText, GitBranch, ScanSearch, Shield, Sparkles, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const features = [
  { name: "Repository Health Score", icon: ScanSearch, text: "A clear score with visible reasoning and category-level breakdowns." },
  { name: "Security Hygiene Scanner", icon: Shield, text: "Checks disclosure files, secret hygiene signals and risky repository patterns." },
  { name: "Portfolio Readiness Score", icon: Sparkles, text: "Helps students and developers prepare projects for review." },
  { name: "AI Metadata Detection", icon: FileSearch, text: "Flags local tooling metadata that should stay out of public repositories." },
  { name: "Documentation Audit", icon: FileText, text: "Reviews README, setup instructions, architecture notes and contribution signals." },
  { name: "Architecture Review", icon: Boxes, text: "Prepares future rules for structure, module boundaries and maintainability." },
  { name: "CI/CD Inspection", icon: Workflow, text: "Detects workflow coverage for builds, tests and release confidence." },
  { name: "Exportable Reports", icon: GitBranch, text: "Produces review-friendly JSON and Markdown reports." }
];

export function FeatureGrid() {
  return (
    <section className="border-y border-line bg-white px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Built for a real analysis engine."
          description="The current experience demonstrates the workflow while the modular core package grows into real repository rules."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="rounded-lg border border-line bg-white p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-soft text-accent">
                <feature.icon aria-hidden="true" size={18} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-ink">{feature.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{feature.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
