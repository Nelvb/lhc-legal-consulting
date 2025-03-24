"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

interface SideMenuHeaderProps {
  onClose: () => void;
}

const SideMenuHeader: React.FC<SideMenuHeaderProps> = ({ onClose }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <Image
          src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742851714/Logo_2_x4vp4i.webp"
          alt="Boost A Project Logo"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          {isAuthenticated ? `Hola ${user?.username}` : "Menú"}
        </span>
      </div>
      <button
        onClick={onClose}
        aria-label="Cerrar menú"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default SideMenuHeader;
