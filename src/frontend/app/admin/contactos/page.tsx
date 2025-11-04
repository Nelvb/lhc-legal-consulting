// src/frontend/app/admin/contactos/page.tsx
// Vista principal del administrador para gestionar los mensajes de contacto.
// Muestra todos los leads enviados desde formularios con opción a filtrar, buscar y revocar privacidad.
// Interfaz profesional con navegación, filtros por email y estado, y ordenación.

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFilteredMessages, ContactFilters } from '@/lib/api/contactAdminService';
import ContactMessagesTable from '@/components/admin/blog/contactos/ContactMessagesTable';
import { ContactMessage } from '@/types/contact';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ArrowLeft, Search, Filter } from 'lucide-react';

const ContactAdminPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Estados para filtros
    const [emailFilter, setEmailFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'revoked'>('all');
    const [sortBy, setSortBy] = useState<'created_at' | 'email' | 'full_name'>('created_at');
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');

    const fetchMessages = async () => {
        setLoading(true);
        setError(null);
        try {
            const filters: ContactFilters = {
                email: emailFilter.trim() || undefined,
                status: statusFilter,
                sort: sortBy,
                order: order
            };

            const data = await getFilteredMessages(filters);
            setMessages(data.messages || []); // Asegurar que nunca sea undefined
            setTotal(data.total || 0);
        } catch (error) {
            console.error('Error al obtener los mensajes de contacto:', error);
            setError('Error al cargar los mensajes');
            setMessages([]); // Asegurar array vacío en caso de error
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    // Cargar mensajes al montar y cuando cambien los filtros
    useEffect(() => {
        fetchMessages();
    }, [emailFilter, statusFilter, sortBy, order]);

    // Búsqueda con debounce por email
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchMessages();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [emailFilter]);

    const handleBackToDashboard = () => {
        router.push('/admin');
    };

    const handleRefresh = () => {
        fetchMessages();
    };

    const handleClearFilters = () => {
        setEmailFilter('');
        setStatusFilter('all');
        setSortBy('created_at');
        setOrder('desc');
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Header con navegación */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBackToDashboard}
                        icon={<ArrowLeft className="w-4 h-4" />}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Volver al Dashboard
                    </Button>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Gestión de Leads
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Gestiona todas las consultas legales recibidas
                        </p>
                    </div>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={loading}
                    loading={loading}
                >
                    Refrescar
                </Button>
            </div>

            {/* Panel de filtros */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Búsqueda por email */}
                    <div>
                        <Input
                            label="Buscar por email"
                            type="email"
                            placeholder="ejemplo@email.com"
                            value={emailFilter}
                            onChange={(e) => setEmailFilter(e.target.value)}
                            compact
                            className="text-sm"
                        />
                    </div>

                    {/* Filtro por estado */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Estado de privacidad
                        </label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'revoked')}
                            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="active">Solo activos</option>
                            <option value="revoked">Solo revocados</option>
                        </select>
                    </div>

                    {/* Ordenar por */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Ordenar por
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'created_at' | 'email' | 'full_name')}
                            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="created_at">Fecha de creación</option>
                            <option value="email">Email</option>
                            <option value="full_name">Nombre</option>
                        </select>
                    </div>

                    {/* Orden */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Orden
                        </label>
                        <select
                            value={order}
                            onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
                            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="desc">Descendente</option>
                            <option value="asc">Ascendente</option>
                        </select>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                        {loading ? (
                            'Cargando...'
                        ) : (
                            `${total} mensaje${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilters}
                        disabled={loading}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Limpiar filtros
                    </Button>
                </div>
            </div>

            {/* Tabla de mensajes */}
            {loading ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
                    <p className="text-gray-600">Cargando mensajes...</p>
                </div>
            ) : error ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <p className="text-red-600 text-lg mb-4">{error}</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                    >
                        Intentar de nuevo
                    </Button>
                </div>
            ) : !messages || messages.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    {emailFilter || statusFilter !== 'all' ? (
                        <>
                            <p className="text-gray-500 text-lg mb-4">No se encontraron mensajes con los filtros aplicados.</p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearFilters}
                            >
                                Limpiar filtros
                            </Button>
                        </>
                    ) : (
                        <p className="text-gray-500 text-lg">No se han recibido mensajes de contacto aún.</p>
                    )}
                </div>
            ) : (
                <ContactMessagesTable messages={messages} />
            )}
        </div>
    );
};

export default ContactAdminPage;