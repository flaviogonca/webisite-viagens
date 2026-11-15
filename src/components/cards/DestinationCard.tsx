import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { DestinationArt } from '@/components/art/DestinationArt'
import type { Destination } from '@/types'
import { cn } from '@/utils/cn'

export function DestinationCard({ d, className }: { d: Destination; className?: string }) {
  return (
    <Link to={`/destinos/${d.slug}`} className={cn('group relative block overflow-hidden rounded-sm bg-marine text-fog', className)}>
      <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-105">
        {d.image ? <img src={d.image} alt="" loading="lazy" className="h-full w-full object-cover" /> : <DestinationArt art={d.art} className="h-full w-full" />}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-marine/90 via-marine/20 to-transparent" />
      <div className="relative flex h-full min-h-72 flex-col justify-end p-6">
        <p className="text-sm text-saffron">{d.country}</p>
        <h3 className="font-display text-3xl font-bold">{d.name}</h3>
        <p className="mt-2 max-w-[32ch] text-sm text-fog/85">{d.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">Explorar destino <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></span>
      </div>
    </Link>
  )
}
