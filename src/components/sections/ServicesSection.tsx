import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '@/data/services'
import { ServiceIcon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/utils/cn'

const layout = [
  'md:col-span-4 md:row-span-2 bg-marine text-fog',
  'md:col-span-2 bg-saffron text-marine',
  'md:col-span-2 bg-fog text-ink border border-line',
  'md:col-span-3 bg-fog text-ink border border-line',
  'md:col-span-3 bg-sea text-fog',
  'md:col-span-6 bg-paper text-ink border border-line md:flex-row md:items-center md:gap-8',
]

export function ServicesSection() {
  return (
    <section className="section-y" aria-labelledby="servicos-titulo">
      <div className="container-x">
        <Reveal><h2 id="servicos-titulo" className="h-section max-w-[16ch]">Tudo o que a sua viagem precisa, num só lugar.</h2>
          <p className="lead mt-5 text-ink/70">Seis serviços que se combinam entre si ou funcionam sozinhos.</p></Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-6">
          {services.map((s, i) => (
            <li key={s.id} className={cn('group relative flex flex-col rounded-sm p-7 transition-transform duration-500 hover:-translate-y-1', layout[i])}>
              <ServiceIcon name={s.icon} className={cn('h-9 w-9 shrink-0', i === 0 && 'h-14 w-14')} />
              <div className={cn('mt-6 md:mt-0', i === 5 && 'md:flex-1')}>
                <h3 className={cn('font-display text-xl font-bold', i === 0 && 'text-3xl md:mt-16')}>{s.title}</h3>
                <p className={cn('mt-2 max-w-[44ch] text-[0.95rem] leading-relaxed opacity-80', i === 0 && 'text-base')}>{s.short}</p>
              </div>
              <Link to={`/servicos#${s.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold after:absolute after:inset-0 md:mt-auto md:pt-6">
                Saber mais <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
