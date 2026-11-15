import { steps } from '@/data/content'
import { Reveal } from '@/components/ui/Reveal'

export function HowItWorks({ dark = true }: { dark?: boolean }) {
  return (
    <section className={`section-y ${dark ? 'bg-sea text-fog' : 'bg-fog'}`} aria-labelledby="como-titulo">
      <div className="container-x">
        <Reveal><h2 id="como-titulo" className="h-section max-w-[16ch]">Como funciona, em cinco passos.</h2></Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
          <span aria-hidden className="absolute left-[1.15rem] top-2 h-[calc(100%-1rem)] w-px bg-current opacity-30 md:left-0 md:top-[1.15rem] md:h-px md:w-full" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative pl-14 md:pl-0 md:pt-14">
              <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-saffron font-display font-bold text-marine">{i + 1}</span>
              <h3 className="font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
