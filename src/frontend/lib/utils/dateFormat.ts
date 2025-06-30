// src/frontend/lib/utils/dateFormat.ts
// Utilidades profesionales para formateo de fechas en la aplicación.
// Proporciona formateo consistente en español para interfaces de usuario.
// Maneja correctamente zonas horarias y formatos localizados.

export const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
            return 'Fecha inválida';
        }

        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Error en fecha';
    }
};

export const formatDateLong = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
            return 'Fecha inválida';
        }

        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Error en fecha';
    }
};

export const formatDateShort = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
            return 'N/A';
        }

        return date.toLocaleDateString('es-ES');
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'N/A';
    }
};

export const timeAgo = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'Hace menos de un minuto';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `Hace ${hours} hora${hours !== 1 ? 's' : ''}`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `Hace ${days} día${days !== 1 ? 's' : ''}`;
        }
    } catch (error) {
        console.error('Error al calcular tiempo transcurrido:', error);
        return 'Fecha desconocida';
    }
};