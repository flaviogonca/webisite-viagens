import { agency } from '@/config/agency'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight ${className}`}>
      {agency.logo ? <img src={agency.logo} alt="" className="h-8 w-8" /> : (
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden><circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M16 5l3.4 11L16 27l-3.4-11z" className="fill-saffron" /></svg>
      )}
      {agency.name}
    </span>
  )
}
