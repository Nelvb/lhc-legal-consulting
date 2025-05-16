/**
 * Layout específico para la zona privada de usuario (/dashboard)
 * Aplica estructura global como navbar y estilos compartidos.
 */

import React from "react";
import UserLayout from "@/components/user/UserLayout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <UserLayout>{children}</UserLayout>;
}
