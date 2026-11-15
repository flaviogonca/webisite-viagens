import { Check } from 'lucide-react'
import { visaAssistance } from '@/data/content'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export function VisaSection() {
  return (
    <section className="section-y bg-marine text-fog" aria-labelledby="visto-titulo">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <h2 id="visto-titulo" className="h-section max-w-[14ch]">Vistos sem papelada a mais.</h2>
          <p className="lead mt-6 text-mist">Organizamos o processo para que chegue ao consulado com tudo em ordem.</p>
          <p className="mt-6 max-w-[52ch] rounded-sm border border-saffron/50 p-4 text-sm leading-relaxed text-fog/85">A agência prepara e acompanha o processo, mas não garante aprovação. A decisão final pertence às autoridades consulares competentes.</p>
          <Button to="/vistos#pedido" className="mt-8">Solicitar assistência para visto</Button>
        </Reveal>
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {visaAssistance.map((v) => (
            <li key={v.title} className="flex gap-4 py-5">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron text-marine"><Check size={14} aria-hidden /></span>
              <div><h3 className="font-display text-xl font-semibold">{v.title}</h3><p className="mt-1 text-sm text-mist">{v.text}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
