'use client'

/**
 * Componente ImageUpload
 *
 * Encargado de gestionar la subida de imágenes desde el panel de administración:
 * - Permite seleccionar archivo manualmente o mediante arrastrar y soltar
 * - Muestra vista previa de la imagen seleccionada
 * - Sube la imagen al backend usando el servicio `uploadImage` con protección JWT/CSRF
 * - Permite reemplazar imagen una vez subida
 * - Incluye validación inteligente y manejo de errores visuales integrados
 *
 * Compatible con valores iniciales (modo edición) y pensado para formularios del blog u otros contenidos multimedia.
 */

import React, { useRef, useState, useEffect } from 'react'
import { uploadImage } from '@/lib/api/imageService'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  initialImage?: string
  error?: string
  onErrorChange?: (hasError: boolean) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  initialImage,
  error,
  onErrorChange
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploaded, setUploaded] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [internalError, setInternalError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateImage = () => {
    if (!uploaded && !previewUrl) {
      setInternalError('Debes subir una imagen antes de continuar')
      onErrorChange?.(true)
      return false
    } else {
      setInternalError(null)
      onErrorChange?.(false)
      return true
    }
  }

  useEffect(() => {
    if (initialImage) {
      setPreviewUrl(initialImage)
      setUploaded(true)
      setInternalError(null)
      onErrorChange?.(false)
    } else {
      validateImage()
    }
  }, [initialImage])

  const handleFileSelect = (file: File) => {
    setSelectedImage(file)
    setPreviewUrl(URL.createObjectURL(file))
    setUploaded(false)
    setSuccessMessage('')
    setErrorMessage('')
    setInternalError(null)
    onErrorChange?.(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleImageUpload = async () => {
    if (!selectedImage || uploaded) return

    const formData = new FormData()
    formData.append('image', selectedImage)

    try {
      setIsUploading(true)
      setErrorMessage('')
      const imageUrl = await uploadImage(formData)
      onImageUpload(imageUrl)
      setUploaded(true)
      setSuccessMessage('Imagen subida con éxito')
      setInternalError(null)
      onErrorChange?.(false)
    } catch (error) {
      console.error('Error en handleImageUpload:', error)
      setErrorMessage('Error al subir la imagen')
    } finally {
      setIsUploading(false)
    }
  }

  const handleReplaceImage = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setUploaded(false)
    setSuccessMessage('')
    setErrorMessage('')
    setInternalError('Debes subir una imagen antes de continuar')
    onErrorChange?.(true)
    fileInputRef.current?.click()
  }

  // Determinar si hay error (externo o interno)
  const hasError = error || internalError || errorMessage
  const displayError = error || internalError || errorMessage

  return (
    <div className="space-y-4">
      <p className="block text-sm font-medium text-gray-700">Imagen destacada</p>

      {!previewUrl && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${hasError
              ? 'border-red-500 bg-red-50'
              : isDragOver
                ? 'border-gray-400 bg-slate-100 scale-105'
                : 'border-gray-300 bg-slate-50 hover:bg-slate-100'
            }`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <p className="text-sm text-gray-700 font-medium">
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

      {successMessage && <p className="text-green-600 text-sm font-medium">{successMessage}</p>}

      {/* Mensaje de error visible y consistente con resto del formulario */}
      {displayError && (
        <p className="text-sm text-red-600 mt-1">{displayError}</p>
      )}
    </div>
  )
}

export default ImageUpload