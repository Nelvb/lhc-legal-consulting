/**
 * LHCSideMenu.tsx
 *
 * Menú lateral profesional para LHC Legal & Consulting que ocupa toda la pantalla.
 * Utiliza iconografía de lucide-react, color corporativo y gradiente visual atractivo.
 * Incluye navegación pública y administración, con control de visibilidad por autenticación.
 * Compatible con dispositivos móviles, SEO friendly y con diseño responsive profesional.
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUiStore } from "@/stores/useUiStore";
import {
    Scale,
    Users,
    BookOpen,
    HelpCircle,
    Phone,
    LayoutDashboard,
    PenTool,
    User,
    LogOut,
    MessageSquare,
    PhoneCall,
} from "lucide-react";

const LHCSideMenu: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const pathname = usePathname();
    const isOpen = useUiStore((state) => state.isSideMenuOpen);
    const onClose = useUiStore((state) => state.closeSideMenu);

    const linkIconColor = "text-[#60A5FA]";

    const publicLinks = [
        { href: "/areas", label: "Áreas Legales", icon: <Scale size={20} className={linkIconColor} /> },
        { href: "/about", label: "Nosotros", icon: <Users size={20} className={linkIconColor} /> },
        { href: "/blog", label: "Blog Jurídico", icon: <BookOpen size={20} className={linkIconColor} /> },
        { href: "/faq", label: "Preguntas Frecuentes", icon: <HelpCircle size={20} className={linkIconColor} /> },
        { href: "/contact", label: "Contacto", icon: <Phone size={20} className={linkIconColor} /> },
    ];

    const adminLinks = [
        { href: "/admin", label: "Panel de Control", icon: <LayoutDashboard size={20} className={linkIconColor} /> },
        { href: "/admin/blog", label: "Gestionar Blog", icon: <PenTool size={20} className={linkIconColor} /> },
        { href: "/admin/perfil", label: "Mi Perfil", icon: <User size={20} className={linkIconColor} /> },
    ];

    const handleLogout = async () => {
        await logout();
        onClose();
    };

    const isActiveLink = (href: string) => pathname.startsWith(href);

    return (
        <>
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                onClick={onClose}
            />
            <div
                className={`fixed top-20 right-0 h-[calc(100vh-5rem)] w-full z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{
                    background:
                        "linear-gradient(135deg, rgba(27, 47, 75, 0.98) 0%, rgba(29, 161, 242, 0.95) 35%, rgba(27, 47, 75, 0.98) 70%, rgba(15, 23, 42, 0.99) 100%)",
                }}
            >
                <div className="flex flex-col h-full">
                    <nav className="flex-1 overflow-y-auto pt-12 px-6 pb-6">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-4">
                                    Navegación
                                </h3>
                                <div className="w-full h-px bg-white/20 mb-6" />
                                <ul className="space-y-2">
                                    {publicLinks.map(({ href, label, icon }) => (
                                        <li key={href}>
                                            <Link
                                                href={href}
                                                onClick={onClose}
                                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActiveLink(href)
                                                        ? "bg-white/20 text-white font-semibold"
                                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                                    }`}
                                            >
                                                {icon}
                                                <span className="text-lg">{label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {isAuthenticated && user?.is_admin && (
                                <div>
                                    <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-4">
                                        Administración
                                    </h3>
                                    <div className="w-full h-px bg-white/20 mb-6" />
                                    <ul className="space-y-2">
                                        {adminLinks.map(({ href, label, icon }) => (
                                            <li key={href}>
                                                <Link
                                                    href={href}
                                                    onClick={onClose}
                                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActiveLink(href)
                                                            ? "bg-white/20 text-white font-semibold"
                                                            : "text-white/80 hover:bg-white/10 hover:text-white"
                                                        }`}
                                                >
                                                    {icon}
                                                    <span className="text-lg">{label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </nav>

                    <div className="p-6 border-t border-white/20">
                        {isAuthenticated && user?.is_admin ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 text-white/80">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <User size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            {user.username} {user.last_name}
                                        </p>
                                        <p className="text-xs text-white/60">Administrador</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                                >
                                    <LogOut size={18} className="text-white" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <h4 className="text-white font-semibold text-lg mb-2">
                                        ¿Necesitas asesoría legal?
                                    </h4>
                                    <p className="text-white/80 text-sm mb-4">
                                        Contacta con nosotros para una consulta gratuita
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <a
                                        href="https://wa.me/34123456789"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full px-4 py-3 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-lg transition-colors duration-200 font-medium text-center flex items-center justify-center gap-2"
                                    >
                                        <MessageSquare size={18} className="text-white" />
                                        WhatsApp
                                    </a>
                                    <a
                                        href="tel:+34123456789"
                                        className="block w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 font-medium text-center border border-white/20 flex items-center justify-center gap-2"
                                    >
                                        <PhoneCall size={18} className="text-white" />
                                        Llamar Ahora
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LHCSideMenu;
