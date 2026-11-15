import { useSearchParams } from 'react-router-dom'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/common/PageHeader'
import { ServiceRequestForm } from '@/components/forms/ServiceRequestForm'
import { services } from '@/data/services'
import type { ServiceId } from '@/types'

export default function RequestService() {
  useSeo('Solicitar serviço', 'Peça um serviço: vistos, voos, hotéis, consultoria ou assistência documental.')
  const [params] = useSearchParams()
  const q = params.get('servico')
  const dest = params.get('destino')?.slice(0, 120) || undefined
  const def = services.find((s) => s.id === q)?.id as ServiceId | undefined
  return (<>
    <PageHeader title="Solicitar um serviço." intro="Conte-nos o que precisa. Respondemos com os próximos passos e o que é necessário." />
    <section className="section-y"><div className="container-x max-w-3xl"><ServiceRequestForm key={`${def}-${dest}`} defaultService={def} defaultDestination={dest} /></div></section>
  </>)
}
