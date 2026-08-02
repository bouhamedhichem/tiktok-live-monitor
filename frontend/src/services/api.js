// Both the API base and the Socket.IO base default to the same local
// backend. Override with a .env file (VITE_API_URL) when deploying the
// frontend separately from the backend. Some hosts expose a linked
// service's address as a bare hostname rather than a full URL, so we
// add https:// if the scheme is missing.
function normalizeApiBase(value) {
  if (!value) return 'http://localhost:4000';
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export const API_BASE = normalizeApiBase(import.meta.env.VITE_API_URL);

/**
 * Triggers a browser download for one of the backend's export endpoints
 * (GET /api/export/:type/:format) without needing an extra HTTP library —
 * the backend already sets Content-Disposition, so a plain navigation
 * to the URL is enough to prompt a save-as/download.
 */
export function downloadExport(type, format) {
  const url = `${API_BASE}/api/export/${type}/${format}`;
  const link = document.createElement('a');
  link.href = url;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function fetchJson(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}
