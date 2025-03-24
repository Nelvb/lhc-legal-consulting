"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

interface SideMenuAuthSectionProps {
  onClose: () => void;
}

const SideMenuAuthSection: React.FC<SideMenuAuthSectionProps> = ({ onClose }) => {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  if (!isAuthenticated) {
    return (
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        {!isLoginPage && (
          <Link href="/login" onClick={onClose} className="block w-full">
            <Button variant="outline" size="md" className="w-full">
              Iniciar Sesión
            </Button>
          </Link>
        )}

        {!isSignupPage && (
          <Link href="/signup" onClick={onClose} className="block w-full">
            <Button variant="primary" size="md" className="w-full">
              Registrarse
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={() => {
          logout();
          onClose();
        }}
        className="w-full text-center py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-800 rounded transition-colors"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default SideMenuAuthSection;
