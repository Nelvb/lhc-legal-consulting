/**
 * Servicio de subida de imágenes al backend (Cloudinary u otro).
 * Usa `fetchWithAuth` para proteger con JWT + CSRF.
 */

import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';

/**
 * Sube una imagen al servidor (Cloudinary o almacenamiento backend)
 * Utiliza un FormData con campo 'image'
 *
 * @param formData - FormData que contiene el archivo a subir
 * @returns URL de la imagen subida
 * @throws Error si la subida falla
 */
export async function uploadImage(formData: FormData): Promise<string> {
    const response = await fetchWithAuth('/api/images/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error al subir la imagen');
    }

    const data = await response.json();
    return data.image.url;
}
