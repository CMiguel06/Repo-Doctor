"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ActionPlan } from "@/components/action-plan";
import { FeatureGrid } from "@/components/feature-grid";
import { FindingsSection } from "@/components/findings-section";
import { Footer } from "@/components/footer";
import { HealthDashboard } from "@/components/health-dashboard";
import { HeroSection } from "@/components/hero-section";
import { SampleReport } from "@/components/sample-report";
import { ScanDemo } from "@/components/scan-demo";
import { initialScanPhases, sampleReport } from "@/lib/mock-data";
import type { ScanPhase, ScanStatus } from "@/types/repo-doctor";

const phaseDelay = 620;

export default function Home() {
  const [phases, setPhases] = useState<ScanPhase[]>(initialScanPhases);
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [score, setScore] = useState(42);
  const [completedSteps, setCompletedSteps] = useState(0);
  const timeoutRef = useRef<number[]>([]);

  const progress = useMemo(() => (completedSteps / initialScanPhases.length) * 100, [completedSteps]);

  const clearTimers = useCallback(() => {
    timeoutRef.current.forEach((timer) => window.clearTimeout(timer));
    timeoutRef.current = [];
  }, []);

  const runDemoScan = useCallback(() => {
    clearTimers();
    setScanStatus("running");
    setScore(42);
    setCompletedSteps(0);
    setPhases(initialScanPhases);

    initialScanPhases.forEach((phase, index) => {
      const startTimer = window.setTimeout(() => {
        setPhases((current) =>
          current.map((item, itemIndex) => {
            if (itemIndex < index) return { ...item, status: "completed" };
            if (item.id === phase.id) return { ...item, status: "running" };
            return { ...item, status: "pending" };
          })
        );
      }, index * phaseDelay);

      const completeTimer = window.setTimeout(() => {
        setCompletedSteps(index + 1);
        setScore(Math.round(42 + ((sampleReport.score - 42) * (index + 1)) / initialScanPhases.length));
        setPhases((current) =>
          current.map((item, itemIndex) => (itemIndex <= index ? { ...item, status: "completed" } : item))
        );

        if (index === initialScanPhases.length - 1) {
          setScanStatus("completed");
          setScore(sampleReport.score);
        }
      }, index * phaseDelay + phaseDelay - 120);

      timeoutRef.current.push(startTimer, completeTimer);
    });

    document.getElementById("demo-scan")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [clearTimers]);

  const viewSampleReport = useCallback(() => {
    document.getElementById("sample-report")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const statusText =
    scanStatus === "completed"
      ? sampleReport.summary
      : scanStatus === "running"
        ? "Demo scan in progress across repository quality signals."
        : "Ready to run a simulated repository health scan.";

  return (
    <main>
      <HeroSection
        onRunScan={runDemoScan}
        onViewReport={viewSampleReport}
        score={score}
        scanStatusText={statusText}
        isComplete={scanStatus === "completed"}
      />
      <ScanDemo phases={phases} status={scanStatus} progress={progress} score={score} onRunScan={runDemoScan} />
      <HealthDashboard />
      <FindingsSection />
      <ActionPlan />
      <SampleReport />
      <FeatureGrid />
      <Footer />
    </main>
  );
}
