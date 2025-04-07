/**
 * Componente ImageUpload
 * 
 * Este componente permite al usuario seleccionar y subir una imagen desde su dispositivo
 * a través de un formulario tipo multipart. Utiliza una ruta del backend (/api/images/upload)
 * que redirige a Flask mediante la configuración de rewrites en next.config.js.
 * 
 * Funcionalidades:
 * - Previsualización de imagen seleccionada.
 * - Subida única por imagen (previene envíos duplicados).
 * - Mensaje de éxito tras la subida.
 * - Botón desactivado mientras se sube la imagen.
 * 
 * Requisitos:
 * - El backend debe tener definida la ruta /api/images/upload para recibir la imagen.
 * - Cloudinary debe estar correctamente configurado en Flask.
 * - El proxy inverso en Next.js debe estar activo para evitar hardcodear rutas.
 * 
 * Uso:
 * <ImageUpload onImageUpload={(url) => setImage(url)} />
 */


'use client';

import React, { useState } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploaded(false);
      setSuccessMessage('');
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage || uploaded) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      setIsUploading(true);
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onImageUpload(data.image.url);
        setUploaded(true);
        setSuccessMessage('Imagen subida con éxito');
      } else {
        console.error('Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error al subir la imagen', error);
    } finally {
      setIsUploading(false);
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
        disabled={!selectedImage || uploaded || isUploading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {uploaded ? 'Imagen subida' : isUploading ? 'Subiendo...' : 'Subir imagen'}
      </button>
      {successMessage && (
        <p className="mt-2 text-green-600 text-sm font-medium">{successMessage}</p>
      )}
    </div>
  );
};

export default ImageUpload;
