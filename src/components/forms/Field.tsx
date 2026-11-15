import type { ReactNode } from 'react'

export const inputCls = 'min-h-12 w-full rounded-sm border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-sea aria-[invalid=true]:border-red-600'

export function Field({ id, label, error, children, optional }: { id: string; label: string; error?: string; children: ReactNode; optional?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}{optional && <span className="font-normal text-ink/50"> (opcional)</span>}</label>
      {children}
      {error && <p id={`${id}-erro`} role="alert" className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  )
}

export function SubmitState({ status, message, whatsapp }: { status: 'idle' | 'error' | 'success'; message: string; whatsapp?: string }) {
  if (status === 'idle') return null
  const ok = status === 'success'
  return (
    <div role={ok ? 'status' : 'alert'} className={`rounded-sm border p-4 text-sm ${ok ? 'border-sea bg-sea/10' : 'border-red-600 bg-red-50 text-red-900'}`}>
      <p>{message}</p>
      {whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold underline">Continuar por WhatsApp</a>}
    </div>
  )
}
