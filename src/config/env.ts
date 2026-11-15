export const env = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '',
}
export const hasApi = env.apiBaseUrl.length > 0
