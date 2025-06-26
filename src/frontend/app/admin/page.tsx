/**
 * AdminDashboardPage.tsx
 *
 * Panel principal del administrador para LHC Legal & Consulting.
 * Diseño inspirado en ContactPage: hero estrecho + fondo claro + cards azules.
 * Layout limpio y profesional con glassmorphism azul para las tarjetas.
 * Protección de ruta mediante verificación de is_admin usando Zustand.
 */

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SmartLink from '@/components/ui/SmartLink';
import { useAuthStore } from "@/stores/useAuthStore";
import AdminCard from "@/components/admin/ui/AdminCard";
import { BookOpen, User, BarChart3 } from "lucide-react";

const AdminDashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      router.replace("/");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user?.is_admin) return null;

  return (
    <main className="w-full relative min-h-screen">
      {/* Hero Section - estilo AreasHero */}
      <section className="relative overflow-hidden">
        {/* Fondo gradiente corporativo */}
        <div 
          className="absolute inset-0 bg-lhc-gradient-inverted"
        />

        <div className="relative z-10 py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
                Panel de Administración
              </div>

              {/* Título principal */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '800',
                  letterSpacing: '-0.02em',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
              >
                Bienvenido{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] mt-4 animate-pulse pb-2">
                  {user.username}
                </span>
              </h1>

              {/* Línea decorativa */}
              <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />

              {/* Descripción */}
              <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 leading-relaxed font-light">
                Gestiona el contenido y configuración de LHC Legal & Consulting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fondo claro para el resto del contenido */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-8 py-16">

          {/* Grid de tarjetas administrativas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            
            <AdminCard
              title="Gestión del Blog"
              description="Crea, edita y publica artículos jurídicos para mantener informados a los clientes sobre novedades legales."
              buttonLabel="Ir al blog"
              href="/admin/blog"
              icon={<BookOpen className="w-6 h-6" />}
            />

            <AdminCard
              title="Mi Perfil"
              description="Actualiza tu información personal, cambia tu contraseña y gestiona la configuración de tu cuenta."
              buttonLabel="Editar perfil"
              href="/admin/perfil"
              icon={<User className="w-6 h-6" />}
            />

            <AdminCard
              title="Estadísticas"
              description="Próximamente: analiza el rendimiento del sitio web, visitas y engagement de los usuarios."
              buttonLabel="Próximamente"
              href="#"
              icon={<BarChart3 className="w-6 h-6" />}
              disabled
            />

          </div>

          {/* Sección de acceso rápido */}
          <div className="text-center">
            <div 
              className="relative p-8 lg:p-12 rounded-2xl max-w-4xl mx-auto bg-lhc-gradient"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                Acceso Rápido
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <h3 className="font-semibold text-white mb-3">Crear Artículo</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Publica nuevo contenido jurídico directamente
                  </p>
                  <SmartLink 
                    href="/admin/blog/new-article" 
                    className="inline-flex items-center text-[#60A5FA] hover:text-white transition-colors text-sm font-medium"
                  >
                    Nuevo artículo →
                  </SmartLink>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <h3 className="font-semibold text-white mb-3">Ver Sitio Web</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Revisa cómo ven los usuarios la web pública
                  </p>
                  <SmartLink 
                    href="/" 
                    target="_blank"
                    className="inline-flex items-center text-[#60A5FA] hover:text-white transition-colors text-sm font-medium"
                  >
                    Abrir sitio web →
                  </SmartLink>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default AdminDashboardPage;