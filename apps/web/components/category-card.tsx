"use client";

import { motion } from "framer-motion";
import type { CategoryScore } from "@/types/repo-doctor";

export function CategoryCard({ category, index }: { category: CategoryScore; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="rounded-lg border border-line bg-white p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-ink">{category.name}</h3>
        <span className="text-sm font-semibold text-ink">{category.score}%</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${category.score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{category.description}</p>
    </motion.article>
  );
}
