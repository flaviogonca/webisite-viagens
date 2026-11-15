import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/common/PageHeader'
import { differentiators } from '@/data/content'
import { agency } from '@/config/agency'
import { FinalCta } from '@/components/sections/FinalCta'

export default function About() {
  useSeo('Sobre nós', `Conheça a ${agency.name}: missão, visão e valores de uma agência de viagens com atuação em Angola.`)
  return (<>
    <PageHeader title="Uma agência feita de pessoas, não de balcões." intro="Atuamos em Angola com serviços internacionais, e tratamos cada viagem como a única que temos em mãos." />
    <section className="section-y"><div className="container-x grid gap-12 md:grid-cols-3">
      <article><h2 className="font-display text-2xl font-bold">A nossa história</h2><p className="mt-3 text-ink/75">Texto da história da agência por fornecer. Este espaço será preenchido com a história real, datas e marcos confirmados pela direção.</p></article>
      <article><h2 className="font-display text-2xl font-bold">Missão</h2><p className="mt-3 text-ink/75">Simplificar o planeamento de viagens e a obtenção de vistos, com informação clara e acompanhamento próximo.</p></article>
      <article><h2 className="font-display text-2xl font-bold">Visão</h2><p className="mt-3 text-ink/75">Ser a agência em que os viajantes confiam para chegar a qualquer destino com tudo em ordem.</p></article>
    </div></section>
    <section className="section-y bg-fog"><div className="container-x">
      <h2 className="h-section max-w-[12ch]">Valores</h2>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{differentiators.map((d) => <li key={d.title} className="border-t-2 border-saffron pt-4"><h3 className="font-display text-xl font-bold">{d.title}</h3><p className="mt-2 text-ink/70">{d.text}</p></li>)}</ul>
    </div></section>
    <section className="section-y"><div className="container-x"><h2 className="h-section">Equipa</h2><p className="mt-4 max-w-[50ch] text-ink/70">A apresentação da equipa será publicada quando existirem dados e fotografias confirmados.</p></div></section>
    <FinalCta />
  </>)
}
