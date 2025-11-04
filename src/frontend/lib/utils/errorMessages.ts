/**
 * errorMessages.ts
 * 
 * Utilidad para traducir errores técnicos a mensajes amigables para el usuario.
 * Oculta detalles técnicos como "Failed to fetch", errores de red, etc.
 */

/**
 * Convierte un error técnico en un mensaje amigable para el usuario
 */
export function getUserFriendlyError(error: any): string {
  // Si el error es un string, verificar si es técnico
  const errorMessage = error?.message || error?.toString() || '';
  const errorLower = errorMessage.toLowerCase();

  // Errores de red/conexión
  if (
    errorLower.includes('failed to fetch') ||
    errorLower.includes('network error') ||
    errorLower.includes('networkerror') ||
    errorLower.includes('fetch failed') ||
    errorLower.includes('network request failed') ||
    errorMessage.includes('TypeError: Failed to fetch')
  ) {
    return 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e inténtalo de nuevo.';
  }

  // Errores de timeout
  if (
    errorLower.includes('timeout') ||
    errorLower.includes('timed out')
  ) {
    return 'La solicitud tardó demasiado en procesarse. Por favor, inténtalo de nuevo en unos momentos.';
  }

  // Errores CORS (aunque no deberían aparecer, mejor prevenir)
  if (
    errorLower.includes('cors') ||
    errorLower.includes('cross-origin')
  ) {
    return 'Error de conexión. Por favor, inténtalo de nuevo o contáctanos directamente.';
  }

  // Errores 500 del servidor
  if (
    errorLower.includes('500') ||
    errorLower.includes('internal server error')
  ) {
    return 'Error en el servidor. Por favor, inténtalo de nuevo más tarde o contáctanos directamente.';
  }

  // Errores 404
  if (errorLower.includes('404') || errorLower.includes('not found')) {
    return 'El servicio solicitado no está disponible. Por favor, contáctanos directamente.';
  }

  // Errores 401/403
  if (
    errorLower.includes('401') ||
    errorLower.includes('403') ||
    errorLower.includes('unauthorized') ||
    errorLower.includes('forbidden')
  ) {
    return 'No tienes permisos para realizar esta acción. Por favor, inicia sesión o contáctanos.';
  }

  // Si el mensaje parece técnico (contiene códigos, rutas, etc.), usar mensaje genérico
  if (
    errorMessage.includes('http://') ||
    errorMessage.includes('https://') ||
    errorMessage.includes('localhost') ||
    errorMessage.includes('ECONNREFUSED') ||
    errorMessage.includes('ENOTFOUND') ||
    errorMessage.includes('TypeError') ||
    errorMessage.includes('Error:')
  ) {
    return 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo o contáctanos directamente por WhatsApp o teléfono.';
  }

  // Si el mensaje viene del backend y es legible, usarlo
  // (generalmente mensajes del backend ya son amigables)
  if (errorMessage && errorMessage.length > 0 && errorMessage.length < 200) {
    return errorMessage;
  }

  // Mensaje genérico por defecto
  return 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo o contáctanos directamente.';
}

