import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/common/PageHeader'
import { visaAssistance, visaDocs, steps } from '@/data/content'
import { ServiceRequestForm } from '@/components/forms/ServiceRequestForm'
import { FaqSection } from '@/components/sections/FaqSection'
import { Check } from 'lucide-react'

export default function VisaAssistance() {
  useSeo('Assistência para vistos', 'Orientação documental, preparação de processos e apoio no agendamento. A decisão final cabe às autoridades consulares.')
  return (<>
    <PageHeader title="Assistência para vistos." intro="Preparamos, organizamos e acompanhamos o seu processo. A decisão final pertence sempre às autoridades consulares competentes e não podemos garantir aprovação." />
    <section className="section-y"><div className="container-x grid gap-12 md:grid-cols-2">
      <div><h2 className="h-section">Tipos de assistência</h2>
        <ul className="mt-8 space-y-5">{visaAssistance.map((v) => <li key={v.title}><h3 className="font-display text-xl font-semibold">{v.title}</h3><p className="text-ink/70">{v.text}</p></li>)}</ul></div>
      <div><h2 className="h-section">Etapas</h2>
        <ol className="mt-8 list-decimal space-y-3 pl-6 marker:font-bold marker:text-sea">{steps.map((s) => <li key={s.title}><strong>{s.title}.</strong> {s.text}</li>)}</ol></div>
    </div></section>
    <section className="section-y bg-fog"><div className="container-x"><h2 className="h-section max-w-[16ch]">Documentação habitual.</h2>
      <p className="mt-3 max-w-[60ch] text-ink/70">Lista orientativa. Os requisitos exatos variam por país e tipo de visto, e confirmamo-los consigo caso a caso.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">{visaDocs.map((d) => <li key={d} className="flex gap-3"><Check className="mt-0.5 shrink-0 text-sea" size={18} aria-hidden />{d}</li>)}</ul></div></section>
    <section id="pedido" className="section-y scroll-mt-16"><div className="container-x max-w-3xl"><h2 className="h-section">Solicitar assistência para visto</h2><div className="mt-8"><ServiceRequestForm defaultService="vistos" /></div></div></section>
    <FaqSection />
  </>)
}
