// ─── String helpers ───────────────────────────────────────────────────────────

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
}

// ─── Token helpers ────────────────────────────────────────────────────────────

export function getStoredToken(): string | null {
  return localStorage.getItem('access_token');
}

export function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload)) as { exp?: number };
    if (!decoded.exp) return false;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

// ─── Error helpers ────────────────────────────────────────────────────────────

export function isNetworkError(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'isNetworkError' in err &&
    (err as { isNetworkError: unknown }).isNetworkError === true
  );
}
