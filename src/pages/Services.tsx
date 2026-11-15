import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/common/PageHeader'
import { services } from '@/data/services'
import { ServiceIcon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { useAsync } from '@/hooks/useAsync'
import { getServices } from '@/services/catalog'

export default function Services() {
  useSeo('Serviços', 'Consultoria de viagens, vistos, agendamentos, voos, hotéis e assistência documental.')
  const { data } = useAsync(getServices, services)
  return (<>
    <PageHeader title="Serviços para cada etapa da viagem." intro="Contrate um serviço isolado ou combine vários num único acompanhamento." />
    <div className="container-x divide-y divide-line">
      {data.map((s) => (
        <section key={s.id} id={s.slug} className="grid scroll-mt-24 gap-8 py-14 md:grid-cols-[1fr_1.4fr_auto] md:items-start">
          <div><ServiceIcon name={s.icon} className="h-10 w-10 text-sea" /><h2 className="font-display mt-4 text-3xl font-bold">{s.title}</h2></div>
          <div><p className="max-w-[56ch] text-ink/75">{s.description}</p>
            <ul className="mt-5 space-y-2">{s.benefits.map((b) => <li key={b} className="flex gap-2.5 text-sm"><Check size={18} className="shrink-0 text-sea" aria-hidden />{b}</li>)}</ul></div>
          <Button to={`/solicitar-servico?servico=${s.id}`} variant="dark">Solicitar</Button>
        </section>
      ))}
    </div>
    <HowItWorks />
  </>)
}
