import { differentiators } from '@/data/content'
import { Reveal } from '@/components/ui/Reveal'

export function WhyUs() {
  return (
    <section className="section-y" aria-labelledby="porque-titulo">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal><h2 id="porque-titulo" className="h-section max-w-[12ch] lg:sticky lg:top-28">Porquê viajar connosco.</h2></Reveal>
        <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {differentiators.map((d, i) => (
            <div key={d.title} className={i === 4 ? 'sm:col-span-2' : ''}>
              <dt className="font-display border-t-2 border-saffron pt-4 text-xl font-bold">{d.title}</dt>
              <dd className="mt-2 max-w-[44ch] text-ink/70">{d.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
