import { Button } from '@/components/ui/Button'
import { whatsappLink } from '@/config/agency'
import { Stamp } from '@/components/common/Stamp'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-saffron text-marine" aria-labelledby="cta-titulo">
      <Stamp text="O PRÓXIMO DESTINO · O PRÓXIMO DESTINO · " className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-20" />
      <div className="container-x section-y relative">
        <h2 id="cta-titulo" className="h-display max-w-[15ch] text-balance">Your Next Destination Is Closer Than You Think.</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/solicitar-servico" variant="dark">Começa a planear a tua viagem</Button>
          <Button href={whatsappLink()} variant="secondary">Falar por WhatsApp</Button>
        </div>
      </div>
    </section>
  )
}
