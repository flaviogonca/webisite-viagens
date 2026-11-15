import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Stamp } from '@/components/common/Stamp'

export function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120])
  const e = [0.16, 1, 0.3, 1] as const
  const rise = (d: number) => reduce ? {} : ({ initial: { opacity: 0, y: 36 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease: e } })

  return (
    <section className="relative isolate overflow-hidden bg-marine text-fog" aria-labelledby="hero-title">
      <motion.img src="/images/aviao-por-do-sol.jpg" alt="" fetchPriority="high" style={{ y, scale: 1.12 }} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-marine/90 via-marine/25 to-transparent" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-marine/65 via-marine/25 to-transparent" aria-hidden />
      <div className="container-x relative flex min-h-[100svh] flex-col justify-end pt-32 pb-16 md:pb-24">
        <motion.div {...rise(0.1)} className="absolute right-6 top-28 hidden text-saffron md:block lg:right-12"><Stamp text="VISTOS · VOOS · HOTÉIS · DESTINOS · " className="h-40 w-40 lg:h-48 lg:w-48" /></motion.div>
        <motion.h1 id="hero-title" {...rise(0.15)} className="h-display max-w-[14ch] text-balance drop-shadow-[0_2px_24px_rgba(11,42,51,.5)]">Your Journey Begins Beyond the Ordinary.</motion.h1>
        <motion.p {...rise(0.35)} className="lead mt-6 text-fog/85">Descubra novos destinos, simplifique os seus planos e viaje pelo mundo com uma equipa que cuida de cada detalhe.</motion.p>
        <motion.div {...rise(0.5)} className="mt-9 flex flex-wrap gap-3">
          <Button to="/servicos">Explorar serviços</Button>
          <Button to="/solicitar-servico" variant="secondary">Solicitar uma viagem</Button>
        </motion.div>
        <p className="mt-14 text-sm text-mist" aria-hidden>Deslize para descobrir</p>
      </div>
    </section>
  )
}
