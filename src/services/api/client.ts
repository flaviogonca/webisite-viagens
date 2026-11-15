import { env, hasApi } from '@/config/env'

export class ApiError extends Error {
  constructor(message: string, public status?: number, public fieldErrors?: Record<string, string[]>) {
    super(message)
    this.name = 'ApiError'
  }
}
/** Lançado quando não há backend configurado. Nunca simulamos um envio bem-sucedido. */
export class ApiUnavailableError extends ApiError {
  constructor() {
    super('O envio online ainda não está disponível. Contacte-nos por WhatsApp, email ou telefone.')
    this.name = 'ApiUnavailableError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!hasApi) throw new ApiUnavailableError()
  let res: Response
  try {
    res = await fetch(`${env.apiBaseUrl}${path}`, {
      ...init,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...init?.headers },
    })
  } catch {
    throw new ApiError('Não foi possível ligar ao servidor. Verifique a ligação e tente novamente.')
  }
  if (!res.ok) {
    let body: { message?: string; errors?: Record<string, string[]> } = {}
    try { body = await res.json() } catch { /* corpo não-JSON */ }
    throw new ApiError(body.message ?? 'Ocorreu um erro ao processar o pedido.', res.status, body.errors)
  }
  return (await res.json()) as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
}
export { hasApi }
