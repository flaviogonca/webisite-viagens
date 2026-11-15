import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  useSeo('Página não encontrada', 'A página que procura não existe.')
  return (<><PageHeader title="Esta rota não está no mapa." intro="A página que procura não existe ou mudou de lugar." /><div className="container-x section-y"><Button to="/" variant="dark">Voltar ao início</Button></div></>)
}
