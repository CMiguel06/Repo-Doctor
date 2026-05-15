"use client";

import { Download, FileJson, FileText } from "lucide-react";
import { sampleReport } from "@/lib/mock-data";
import { exportReportAsJson, exportReportAsMarkdown } from "@/lib/report-export";
import { SectionHeading } from "@/components/section-heading";
import { Button, MetricPanel } from "@/components/ui";

export function SampleReport() {
  return (
    <section id="sample-report" className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Prepare your project for public release, academic review or technical assessment."
          description="The report format is designed to be readable in the browser and exportable for reviews, pull requests or project documentation."
        />
        <MetricPanel className="mt-12 overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-line p-6 lg:border-b-0 lg:border-r">
              <p className="text-sm font-medium text-muted">Repository name</p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">{sampleReport.repositoryName}</h3>
              <dl className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <dt className="text-sm text-muted">Scan date</dt>
                  <dd className="mt-1 font-medium text-ink">{sampleReport.scanDate}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Score</dt>
                  <dd className="mt-1 font-medium text-ink">{sampleReport.score}/100</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Risk level</dt>
                  <dd className="mt-1 font-medium capitalize text-warning">{sampleReport.riskLevel}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button onClick={() => exportReportAsJson(sampleReport)} aria-label="Export sample report as JSON">
                  <FileJson aria-hidden="true" size={17} />
                  Export JSON
                </Button>
                <Button
                  onClick={() => exportReportAsMarkdown(sampleReport)}
                  aria-label="Export sample report as Markdown"
                  variant="secondary"
                >
                  <FileText aria-hidden="true" size={17} />
                  Export Markdown
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-ink">
                <Download aria-hidden="true" size={16} className="text-accent" />
                Main findings
              </div>
              <ul className="mt-5 space-y-3">
                {sampleReport.findings.slice(0, 4).map((finding) => (
                  <li key={finding.id} className="rounded-md border border-line bg-soft p-4">
                    <p className="text-sm font-semibold text-ink">{finding.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{finding.suggestion}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-md border border-line p-4">
                <p className="text-sm font-medium text-ink">Recommended next steps</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Add CI, introduce tests, document architecture and strengthen security disclosure before public review.
                </p>
              </div>
            </div>
          </div>
        </MetricPanel>
      </div>
    </section>
  );
}
