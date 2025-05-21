/**
 * Componente ImageUpload
 *
 * Encargado de gestionar la subida de imágenes desde el panel de administración:
 * - Permite seleccionar archivo manualmente o mediante arrastrar y soltar
 * - Muestra vista previa de la imagen seleccionada
 * - Sube la imagen al backend usando el servicio `uploadImage` con protección JWT/CSRF
 * - Permite reemplazar imagen una vez subida
 *
 * Compatible con valores iniciales (modo edición) y pensado para formularios del blog u otros contenidos multimedia.
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { uploadImage } from '@/lib/api/imageService';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, initialImage }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage) {
      setPreviewUrl(initialImage);
      setUploaded(true);
    }
  }, [initialImage]);

  const handleFileSelect = (file: File) => {
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploaded(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleImageUpload = async () => {
    if (!selectedImage || uploaded) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      setIsUploading(true);
      setErrorMessage('');
      const imageUrl = await uploadImage(formData);
      onImageUpload(imageUrl);
      setUploaded(true);
      setSuccessMessage('Imagen subida con éxito');
    } catch (error) {
      console.error('Error en handleImageUpload:', error);
      setErrorMessage('Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReplaceImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setUploaded(false);
    setSuccessMessage('');
    setErrorMessage('');
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {!previewUrl && (
        <div
          className={`border-2 border-dashed border-[#C2E7DA] rounded-lg p-6 text-center cursor-pointer bg-[#F1FFEF] transition-all duration-200
            ${isDragOver ? 'scale-105 bg-[#D6F3FF]' : 'hover:bg-[#e0f5eb]'}`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <p className="text-sm text-[#1A1341] font-medium">
            Arrastra una imagen aquí o haz clic para seleccionar
          </p>
          <p className="text-xs text-gray-500 mt-2">JPG, PNG o WEBP. Tamaño recomendado 1200x600px.</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {previewUrl && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={previewUrl}
            alt="Vista previa"
            className="max-w-full h-auto rounded-lg border border-gray-300"
          />
          {!uploaded && (
            <button
              type="button"
              onClick={handleImageUpload}
              disabled={isUploading}
              className="px-4 py-2 bg-[#1DA1F2] text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Subiendo...' : 'Subir imagen'}
            </button>
          )}
          {uploaded && (
            <button
              type="button"
              onClick={handleReplaceImage}
              className="text-sm text-[#1DA1F2] underline hover:text-blue-700"
            >
              Reemplazar imagen
            </button>
          )}
        </div>
      )}

      {errorMessage && <p className="text-red-600 text-sm font-medium">{errorMessage}</p>}
      {successMessage && <p className="text-green-600 text-sm font-medium">{successMessage}</p>}
    </div>
  );
};

export default ImageUpload;
