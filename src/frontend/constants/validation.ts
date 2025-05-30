/**
 * validation.ts
 *
 * Reglas de validación unificadas para campos de usuario.
 * Este archivo actúa como fuente de verdad (Single Source of Truth)
 * para todos los formularios que validan datos de usuario en frontend.
 *
 * Las reglas están alineadas al 100% con el esquema UserSchema del backend (Marshmallow),
 * incluyendo las mismas longitudes, expresiones regulares y mensajes.
 *
 * Usado en:
 * - SignupForm: validación de registro
 * - ResetPasswordForm: validación de nueva contraseña
 * - ProfileForm: edición de nombre, apellidos y email
 *
 * No incluye lógica de validación de confirmación de contraseña ni campos externos a usuarios.
 */

export const USER_VALIDATION = {
    username: {
        minLength: 2,
        maxLength: 30,
        regex: /^[a-zA-ZÀ-ÿ\s'-]+$/,
        lengthMessage: "El nombre debe tener entre 2 y 30 caracteres.",
        regexMessage: "El nombre solo puede contener letras, espacios, guiones y apóstrofes."
    },
    lastName: {
        minLength: 2,
        maxLength: 50,
        regex: /^[a-zA-ZÀ-ÿ\s'-]+$/,
        lengthMessage: "Los apellidos deben tener entre 2 y 50 caracteres.",
        regexMessage: "Los apellidos solo pueden contener letras, espacios, guiones y apóstrofes."
    },
    email: {
        maxLength: 100,
        lengthMessage: "El email no puede superar los 100 caracteres."
    },
    password: {
        minLength: 8,
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
        lengthMessage: "La contraseña debe tener al menos 8 caracteres.",
        regexMessage: "Debe incluir mayúsculas, minúsculas, un número y un carácter especial."
    }
} as const;

/**
 * Valida un campo del usuario según las reglas definidas en USER_VALIDATION.
 *
 * @param field - Nombre del campo: 'username' | 'lastName' | 'email' | 'password'
 * @param value - Valor introducido por el usuario
 * @returns Mensaje de error si hay fallo, o null si es válido
 */
export const validateUserField = (
    field: keyof typeof USER_VALIDATION,
    value: string
): string | null => {
    const rules = USER_VALIDATION[field];

    if ("minLength" in rules && value.length < rules.minLength) {
        return rules.lengthMessage;
    }

    if ("maxLength" in rules && value.length > rules.maxLength) {
        return rules.lengthMessage;
    }

    if ("regex" in rules && !rules.regex.test(value)) {
        return rules.regexMessage;
    }

    return null;
};
