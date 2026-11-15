import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { getFaqs } from '@/services/catalog'
import { useAsync } from '@/hooks/useAsync'
import { faqs as localFaqs } from '@/data/content'

export function FaqSection({ title = 'Perguntas frequentes.' }: { title?: string }) {
  const { data, loading, error } = useAsync(getFaqs, localFaqs)
  const [open, setOpen] = useState<string | null>(null)
  return (
    <section className="section-y" aria-labelledby="faq-titulo">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 id="faq-titulo" className="h-section max-w-[12ch]">{title}</h2>
        <div>
          {error && <p role="alert" className="mb-4 text-sm text-red-700">Não foi possível atualizar as perguntas: {error}</p>}
          {loading && <p className="text-ink/60">A carregar…</p>}
          {!loading && data.length === 0 && <p className="text-ink/60">Ainda não existem perguntas publicadas.</p>}
          <ul className="border-t border-line">
            {data.map((f) => {
              const isOpen = open === f.id
              return (
                <li key={f.id} className="border-b border-line">
                  <h3><button className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-semibold" aria-expanded={isOpen} aria-controls={`faq-${f.id}`} onClick={() => setOpen(isOpen ? null : f.id)}>
                    {f.question}<Plus className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} aria-hidden />
                  </button></h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`faq-${f.id}`} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <p className="max-w-[60ch] pb-6 text-ink/75">{f.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
