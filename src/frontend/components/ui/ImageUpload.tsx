// /src/frontend/components/ui/ImageUpload.tsx

/**
 * Componente de subida de imágenes
 * 
 * @component
 * @description Permite seleccionar y subir una imagen al backend utilizando la API de Cloudinary
 * 
 * Características:
 * - Selección de imagen desde el dispositivo del usuario
 * - Previsualización de la imagen seleccionada
 * - Subida de la imagen al backend mediante la ruta `/api/images/upload`
 * - Obtención de la URL de la imagen subida desde la respuesta del backend
 * - Comunicación de la URL de la imagen subida al componente padre mediante la prop `onImageUpload`
 * 
 * Requisitos:
 * - El backend debe tener implementada la ruta `/api/images/upload` para recibir y procesar la imagen
 * - El backend debe devolver la URL de la imagen subida en la respuesta
 * 
 * Uso:
 * ```
 * <ImageUpload onImageUpload={handleImageUpload} />
 * ```
 * 
 * @param onImageUpload Función que se ejecuta cuando se sube una imagen correctamente. Recibe como parámetro la URL de la imagen subida.
 */

import React, { useState } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onImageUpload(data.image.url);
      } else {
        console.error('Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error al subir la imagen', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && (
        <div>
          <img src={previewUrl} alt="Vista previa" className="mt-4 max-w-full h-auto" />
        </div>
      )}
      <button
        type="button"
        onClick={handleImageUpload}
        disabled={!selectedImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Subir imagen
      </button>
    </div>
  );
};

export default ImageUpload;