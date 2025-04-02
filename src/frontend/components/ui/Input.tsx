"use client";
import React, { InputHTMLAttributes } from "react";

interface PropiedadesInput extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta?: string;
}

export const Input: React.FC<PropiedadesInput> = ({
  id,
  etiqueta,
  className,
  ...props
}) => {
  return (
    <div className="mb-4">
      {etiqueta && (
        <label
          htmlFor={id}
          className="block text-[#1A1341] text-sm font-semibold mb-2"
        >
          {etiqueta}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3 py-2 border border-[#C2E7DA] bg-white text-[#1A1341] rounded-md 
          focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] 
          ${className || ""}`}
        {...props}
      />
    </div>
  );
};

export default Input;
