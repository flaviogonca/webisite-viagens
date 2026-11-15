import { Link } from 'react-router-dom'
import { destinations } from '@/data/destinations'
import { DestinationCard } from '@/components/cards/DestinationCard'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/utils/cn'

const spans = ['md:col-span-7 md:row-span-2', 'md:col-span-5', 'md:col-span-5', 'md:col-span-4', 'md:col-span-4', 'md:col-span-4', 'md:col-span-12']

export function DestinationsSection() {
  return (
    <section className="section-y bg-fog" aria-labelledby="destinos-titulo">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="destinos-titulo" className="h-section max-w-[14ch]">Para onde quer ir a seguir?</h2>
          <Link to="/destinos" className="text-sm font-semibold underline underline-offset-4 hover:text-sea">Ver todos os destinos</Link>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-12">
          {destinations.map((d, i) => <DestinationCard key={d.slug} d={d} className={cn(spans[i], i === 6 && 'md:[&>div:last-child]:min-h-64')} />)}
        </div>
      </div>
    </section>
  )
}
