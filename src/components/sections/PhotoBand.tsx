import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Button } from '@/components/ui/Button'

/** Faixa fotográfica com parallax: respiro visual entre secções densas. */
export function PhotoBand() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%'])
  return (
    <section ref={ref} className="relative isolate flex min-h-[70vh] items-center overflow-hidden text-fog" aria-label="Voar com tudo tratado">
      <motion.img src="/images/aviao-nuvens.jpg" alt="Pôr do sol visto da janela de um avião, acima das nuvens" loading="lazy" style={{ y }} className="absolute inset-x-0 -top-[12%] -z-10 h-[124%] w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-marine/45" />
      <div className="container-x py-20">
        <p className="h-section max-w-[16ch] text-balance">Voe com tudo tratado antes de levantar voo.</p>
        <p className="lead mt-4 text-fog/90">Voos, hotéis e vistos coordenados pela mesma equipa.</p>
        <Button to="/solicitar-servico" className="mt-8">Planear a minha viagem</Button>
      </div>
    </section>
  )
}
