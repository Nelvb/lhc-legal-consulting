// components/ui/Button.tsx
"use client";

import React, { MouseEvent } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    "font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-[#1DA1F2] text-white border border-transparent hover:bg-white hover:text-[#1DA1F2] hover:border-[#1DA1F2] focus:ring-[#1DA1F2] disabled:bg-[#A8DCFA]",
    secondary:
      "bg-[#C2E7DA] text-[#1A1341] border border-transparent hover:bg-white hover:border-[#C2E7DA] hover:text-[#1A1341] focus:ring-[#C2E7DA] disabled:bg-[#F1FFEF] disabled:text-gray-500",
    outline:
      "border border-[#1A1341] text-[#1A1341] bg-white hover:bg-[#1A1341] hover:text-white focus:ring-[#1A1341] disabled:text-gray-300",
    danger:
      "bg-red-600 text-white border border-transparent hover:bg-white hover:text-red-600 hover:border-red-600 focus:ring-red-600 disabled:bg-red-300",
  };

  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  return (
    <button
      type={type}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
