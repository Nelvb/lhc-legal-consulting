/**
 * IconMapper.tsx
 *
 * Mapeo centralizado de todos los iconos utilizados en áreas legales.
 * Centraliza la lógica de iconos para evitar duplicación y mejorar mantenimiento.
 * Soporta diferentes tamaños y proporciona fallbacks seguros.
 */

import React from 'react';
import {
    Car, Receipt, Briefcase, Shield, Scale, UserCheck, UserX, Euro, Settings,
    ShieldAlert, HeartPulse, FileText, Scroll, HeartCrack, Users, Banknote,
    FileSignature, IdCard, Home, UsersRound, Flag, HeartHandshake, Search,
    AlertTriangle, Calculator, Building, CreditCard, TrendingUp, BarChart,
    Globe, FileCheck, Trophy, Clock, Star, Heart
} from 'lucide-react';

// Tipos para los iconos disponibles
export type IconName =
    | 'car' | 'receipt' | 'briefcase' | 'shield' | 'scale' | 'user-check' | 'user-x'
    | 'euro' | 'settings' | 'shield-alert' | 'heart-pulse' | 'file-text' | 'scroll'
    | 'heart-crack' | 'users' | 'banknote' | 'shield-check' | 'file-signature'
    | 'id-card' | 'home' | 'users-round' | 'flag' | 'heart-handshake' | 'search'
    | 'alert-triangle' | 'calculator' | 'building' | 'credit-card' | 'trending-up'
    | 'bar-chart' | 'globe' | 'gavel' | 'file-check' | 'trophy' | 'clock' | 'star' | 'heart';

// Tamaños disponibles para los iconos
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface IconMapperProps {
    name: IconName;
    size?: IconSize;
    className?: string;
}

// Mapeo de tamaños a clases CSS
const sizeMap: Record<IconSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
};

// Mapeo centralizado de iconos - Subtemas y servicios
const subtopicIconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
    'car': Car,
    'receipt': Receipt,
    'briefcase': Briefcase,
    'shield': Shield,
    'scale': Scale,
    'user-check': UserCheck,
    'user-x': UserX,
    'euro': Euro,
    'settings': Settings,
    'shield-alert': ShieldAlert,
    'heart-pulse': HeartPulse,
    'file-text': FileText,
    'scroll': Scroll,
    'heart-crack': HeartCrack,
    'users': Users,
    'banknote': Banknote,
    'shield-check': Shield, // Alias para shield
    'file-signature': FileSignature,
    'id-card': IdCard,
    'home': Home,
    'users-round': UsersRound,
    'flag': Flag,
    'heart-handshake': HeartHandshake,
    'search': Search,
    'alert-triangle': AlertTriangle,
    'calculator': Calculator,
    'building': Building,
    'credit-card': CreditCard,
    'trending-up': TrendingUp,
    'bar-chart': BarChart,
    'globe': Globe,
    'gavel': Scale, // Alias para scale (martillo de juez)
    'file-check': FileCheck,
    'trophy': Trophy,
    'clock': Clock,
    'star': Star,
    'heart': Heart
};

/**
 * Componente principal para renderizar iconos
 * Proporciona fallback seguro si el icono no existe
 */
const IconMapper: React.FC<IconMapperProps> = ({
    name,
    size = 'md',
    className = ''
}) => {
    const IconComponent = subtopicIconMap[name];
    const sizeClass = sizeMap[size];
    const finalClassName = `${sizeClass} ${className}`.trim();

    // Fallback a Scale si el icono no existe
    if (!IconComponent) {
        console.warn(`Icono "${name}" no encontrado, usando fallback`);
        return <Scale className={finalClassName} />;
    }

    return <IconComponent className={finalClassName} />;
};

/**
 * Hook para obtener directamente el componente de icono
 * Útil para casos donde necesitas el componente sin wrapper
 */
export const useIcon = (name: IconName) => {
    return subtopicIconMap[name] || Scale;
};

/**
 * Función helper para renderizar iconos en grids o listas
 * Acepta name como string para compatibilidad con JSON
 */
export const renderIcon = (
    iconName: string | undefined,
    size: IconSize = 'md',
    className?: string
): React.ReactNode => {
    if (!iconName || !(iconName in subtopicIconMap)) {
        return <Scale className={`${sizeMap[size]} ${className || ''}`.trim()} />;
    }

    return <IconMapper name={iconName as IconName} size={size} className={className} />;
};

/**
 * Lista de todos los iconos disponibles
 * Útil para documentación o herramientas de desarrollo
 */
export const availableIcons: IconName[] = Object.keys(subtopicIconMap) as IconName[];

export default IconMapper;