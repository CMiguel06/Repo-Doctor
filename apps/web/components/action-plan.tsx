"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { recommendedFixes } from "@/lib/mock-data";
import { SectionHeading } from "@/components/section-heading";

export function ActionPlan() {
  return (
    <section className="border-y border-line bg-soft px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Recommended Fixes"
          description="A compact action plan turns the scan into the next engineering steps, with estimated score gain for each improvement."
        />
        <div className="mt-12 divide-y divide-line rounded-lg border border-line bg-white">
          {recommendedFixes.map((fix, index) => (
            <motion.article
              key={fix.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="grid gap-5 p-5 sm:grid-cols-[72px_1fr_auto] sm:items-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-soft text-sm font-semibold text-ink">
                {fix.priority}
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink">{fix.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{fix.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-success">
                <ArrowUpRight aria-hidden="true" size={16} />+{fix.estimatedGain} points
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
