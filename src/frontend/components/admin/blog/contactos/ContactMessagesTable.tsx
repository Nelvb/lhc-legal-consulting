// src/frontend/components/admin/contact/ContactMessagesTable.tsx
// Tabla profesional para visualizar mensajes de contacto desde el panel de administración.
// Muestra nombre, email, asunto, estado de privacidad, fechas y botón para revocar consentimiento.

import { ContactMessage } from '@/types/contact';
import { useState } from 'react';
import { revokePrivacy } from '@/lib/api/contactAdminService';
import { formatDate } from '@/lib/utils/dateFormat';

interface Props {
    messages: ContactMessage[];
}

const ContactMessagesTable: React.FC<Props> = ({ messages }) => {
    const [data, setData] = useState(messages);

    const handleRevoke = async (id: number) => {
        const confirmed = confirm('¿Estás seguro de que deseas revocar el consentimiento de privacidad de este mensaje?');
        if (!confirmed) return;

        try {
            await revokePrivacy(id);
            // Si llega aquí, es que fue exitoso
            const updated = data.map(msg =>
                msg.id === id ? { 
                    ...msg, 
                    privacy_accepted: false, 
                    revoked: true, 
                    revoked_at: new Date().toISOString() 
                } : msg
            );
            setData(updated);
        } catch (error) {
            console.error('Error al revocar privacidad:', error);
            alert('Hubo un problema al revocar el consentimiento.');
        }
    };

    return (
        <div className="overflow-auto border border-gray-200 rounded-xl shadow-sm bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-semibold uppercase tracking-wide">
                    <tr>
                        <th className="px-4 py-3">Nombre</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Teléfono</th>
                        <th className="px-4 py-3">Asunto</th>
                        <th className="px-4 py-3">Mensaje</th>
                        <th className="px-4 py-3">Privacidad</th>
                        <th className="px-4 py-3">Fecha</th>
                        <th className="px-4 py-3">Revocar</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                    {data.map(msg => (
                        <tr key={msg.id}>
                            <td className="px-4 py-2">{msg.full_name}</td>
                            <td className="px-4 py-2">{msg.email}</td>
                            <td className="px-4 py-2">{msg.phone || '-'}</td>
                            <td className="px-4 py-2">{msg.subject}</td>
                            <td className="px-4 py-2 line-clamp-2 max-w-xs">{msg.message}</td>
                            <td className="px-4 py-2">
                                {msg.privacy_accepted ? (
                                    <span className="text-green-600 font-medium">Activo</span>
                                ) : (
                                    <span className="text-red-600 font-medium">Revocado</span>
                                )}
                            </td>
                            <td className="px-4 py-2">{formatDate(msg.created_at)}</td>
                            <td className="px-4 py-2">
                                {msg.revoked ? (
                                    <span className="text-gray-400 text-xs">Revocado</span>
                                ) : (
                                    <button
                                        onClick={() => handleRevoke(msg.id)}
                                        className="text-red-600 hover:underline text-sm"
                                    >
                                        Revocar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactMessagesTable;