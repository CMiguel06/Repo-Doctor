"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-ink text-white shadow-sm hover:bg-black",
        variant === "secondary" && "border border-line bg-white text-ink hover:border-slate-300 hover:bg-soft",
        variant === "ghost" && "text-muted hover:bg-soft hover:text-ink",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function MetricPanel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-lg border border-line bg-white shadow-panel", className)}>{children}</div>;
}
