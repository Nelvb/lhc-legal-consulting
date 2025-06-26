/**
 * Layout para áreas privadas de usuario (/dashboard, /usuario/*, /perfil)
 * 
 * Características principales:
 * - Protección automática: Solo usuarios autenticados pueden acceder
 * - Navbar global sin envoltorios adicionales para diseño limpio
 * - Compatible con cualquier rol de usuario (admin o user)
 * - Redirección automática a home si no hay sesión activa
 * 
 * Seguridad: Integra UserPageContent para verificación de autenticación
 * Diseño: Evita padding/márgenes que rompan layouts tipo login/dashboard
 */

import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import UserPageContent from "@/components/user/layout/UserPageContent";

export const metadata: Metadata = {
    title: "Área Privada | LHC Legal & Consulting",
    description: "Gestiona tu cuenta y consultas legales en LHC Legal & Consulting",    
};

export default function UserPrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            <Navbar />
            <UserPageContent>
                {children}
            </UserPageContent>
        </div>
    );
}