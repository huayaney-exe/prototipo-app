"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({
  current,
  total,
  showLabel = true,
  size = "md",
}: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);

  const heights = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className="w-full">
      <div
        className={`progress-bar ${heights[size]} bg-white/30 rounded-full overflow-hidden`}
      >
        <motion.div
          className="progress-bar-fill h-full bg-[var(--mibanco-yellow)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <p className="text-sm mt-2 text-white/80">
          {current} de {total} meses
        </p>
      )}
    </div>
  );
}
