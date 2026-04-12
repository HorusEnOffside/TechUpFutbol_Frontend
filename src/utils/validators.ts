// ─── Field validators — return error string or undefined ─────────────────────

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'El correo es requerido.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Ingresa un correo válido.';
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'La contraseña es requerida.';
  if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
  return undefined;
}

export function validateRequired(value: string, fieldName = 'Este campo'): string | undefined {
  if (!value.trim()) return `${fieldName} es requerido.`;
  return undefined;
}

export function validateConfirmPassword(
  password: string,
  confirm: string,
): string | undefined {
  if (!confirm) return 'Confirma tu contraseña.';
  if (password !== confirm) return 'Las contraseñas no coinciden.';
  return undefined;
}
