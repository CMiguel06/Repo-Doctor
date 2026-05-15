"use client";

import { categories, sampleReport } from "@/lib/mock-data";
import { CategoryCard } from "@/components/category-card";
import { HealthScoreCard } from "@/components/health-score-card";
import { SectionHeading } from "@/components/section-heading";

export function HealthDashboard() {
  return (
    <section className="border-y border-line bg-white px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Get an explainable score, not a mysterious number."
          description="The dashboard breaks repository quality into categories that are easy to review, discuss and improve."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <HealthScoreCard score={sampleReport.score} status={sampleReport.summary} />
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
