/**
 * UiGlobalLayer.tsx
 *
 * Capa visual transversal que se monta en layouts protegidos (usuario, admin).
 * Su función es encapsular modales y overlays globales controlados por Zustand (UI Store).
 *
 * - Desacoplado del menú lateral o navbar
 * - Escalable para futuros modales u overlays
 * - Mantiene el layout limpio y profesional
 */

"use client";

import React from "react";
import DeleteAccountModal from "@/components/user/DeleteAccountModal";

const UiGlobalLayer: React.FC = () => {
    return (
        <>
            {/* Modales globales controlados por Zustand */}
            <DeleteAccountModal />

            {/* Aquí pueden añadirse más elementos globales en el futuro */}
        </>
    );
};

export default UiGlobalLayer;
