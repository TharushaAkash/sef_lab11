const baseUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

export function apiUrl(path) {
  if (!baseUrl) {
    throw new Error("VITE_API_URL is missing. Configure it and rebuild the frontend.");
  }
  return `${baseUrl}${path}`;
}
