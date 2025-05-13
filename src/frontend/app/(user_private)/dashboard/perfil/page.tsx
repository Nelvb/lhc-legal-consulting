/**
 * Vista de perfil del usuario dentro del área privada (/dashboard/perfil).
 * Muestra el formulario de edición de nombre, email y contraseña.
 * Usa el componente UserProfileForm para gestionar los datos.
 */

"use client";

import React from "react";
import UserProfileForm from "@/components/user/profile/UserProfileForm";

const PerfilPage: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1A1341] mb-8">
                Mi Perfil
            </h1>
            <UserProfileForm />
        </div>
    );
};

export default PerfilPage;
