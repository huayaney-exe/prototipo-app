"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "full";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
  className = "",
  icon,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-[var(--mibanco-green)] text-white hover:bg-[var(--mibanco-green-600)] active:bg-[var(--mibanco-green-700)] focus-visible:ring-[var(--mibanco-green)]",
    secondary:
      "bg-[var(--mibanco-yellow)] text-[var(--mibanco-gray-900)] hover:bg-[var(--mibanco-yellow-600)] focus-visible:ring-[var(--mibanco-yellow)]",
    outline:
      "bg-transparent border-2 border-[var(--mibanco-green)] text-[var(--mibanco-green)] hover:bg-[var(--mibanco-green-50)] focus-visible:ring-[var(--mibanco-green)]",
    ghost:
      "bg-transparent text-[var(--mibanco-green)] hover:bg-[var(--mibanco-green-50)] focus-visible:ring-[var(--mibanco-green)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    full: "w-full px-6 py-4 text-base",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </motion.button>
  );
}
