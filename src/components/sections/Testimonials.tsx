import { testimonials } from '@/data/content'

export function Testimonials() {
  return (
    <section className="section-y bg-fog" aria-labelledby="test-titulo">
      <div className="container-x">
        <h2 id="test-titulo" className="h-section max-w-[16ch]">O que dizem os viajantes.</h2>
        <p role="note" className="mt-4 inline-block rounded-sm bg-saffron/25 px-3 py-1.5 text-sm font-medium">Conteúdo de demonstração — ainda não existem testemunhos reais.</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.id} className={`rounded-sm border border-dashed border-ink/30 bg-paper p-7 ${i === 1 ? 'md:translate-y-8' : ''}`}>
              <blockquote className="font-display text-lg leading-snug">“{t.quote}”</blockquote>
              <p className="mt-6 text-sm"><strong>{t.author}</strong><br /><span className="text-ink/60">{t.context}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
