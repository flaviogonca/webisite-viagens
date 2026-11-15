import { useState } from 'react'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/common/PageHeader'
import { DestinationCard } from '@/components/cards/DestinationCard'
import { destinations, regions } from '@/data/destinations'
import { useAsync } from '@/hooks/useAsync'
import { getDestinations } from '@/services/catalog'
import { cn } from '@/utils/cn'

export default function Destinations() {
  useSeo('Destinos', 'Explore destinos internacionais: Portugal, França, Espanha, Dubai, Reino Unido, Estados Unidos e Brasil.')
  const { data, loading, error } = useAsync(getDestinations, destinations)
  const [region, setRegion] = useState<(typeof regions)[number]>('Todos')
  const list = region === 'Todos' ? data : data.filter((d) => d.region === region)
  return (<>
    <PageHeader title="Destinos para todos os ritmos." intro="Filtre por região e abra um destino para ver o essencial antes de decidir." />
    <section className="section-y"><div className="container-x">
      <div role="group" aria-label="Filtrar por região" className="flex flex-wrap gap-2">
        {regions.map((r) => <button key={r} onClick={() => setRegion(r)} aria-pressed={region === r} className={cn('min-h-11 rounded-sm border px-4 text-sm font-semibold transition-colors', region === r ? 'border-marine bg-marine text-fog' : 'border-line hover:border-marine')}>{r}</button>)}
      </div>
      {error && <p role="alert" className="mt-6 text-red-700">{error}</p>}
      {loading && <p className="mt-6">A carregar…</p>}
      {!loading && list.length === 0 && <p className="mt-10 text-ink/60">Ainda não temos destinos nesta região. Escolha outra região.</p>}
      <ul aria-live="polite" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => <li key={d.slug}><DestinationCard d={d} className="h-full min-h-96" /></li>)}
      </ul>
    </div></section>
  </>)
}
