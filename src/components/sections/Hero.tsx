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
      <motion.svg style={{ y }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-10 h-[110%] w-full" aria-hidden>
        <defs>
          <linearGradient id="hs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b2a33" /><stop offset=".55" stopColor="#1f6f78" /><stop offset="1" stopColor="#f0b866" /></linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#hs)" />
        <circle cx="1030" cy="520" r="120" fill="#ffd98a" opacity=".92" />
        <path d="M0 640 L180 520 L330 620 L520 470 L720 640 L900 560 L1100 650 L1300 540 L1440 620 V900 H0Z" fill="#123d49" opacity=".85" />
        <path d="M0 740 L220 650 L420 730 L640 640 L860 740 L1080 680 L1440 760 V900 H0Z" fill="#0b2a33" />
        <path d="M120 360 C 420 120, 880 120, 1260 300" fill="none" stroke="#e9b44c" strokeWidth="2" strokeDasharray="3 12" strokeLinecap="round" />
        <path d="M1262 296 l-22 -4 l6 -10 l-4 -3 l16 -2 l14 12z" fill="#e9b44c" transform="rotate(20 1260 300)" />
      </motion.svg>
      <div className="container-x relative flex min-h-[100svh] flex-col justify-end pt-32 pb-16 md:pb-24">
        <motion.div {...rise(0.1)} className="absolute right-6 top-28 hidden text-saffron md:block lg:right-12"><Stamp text="VISTOS · VOOS · HOTÉIS · DESTINOS · " className="h-40 w-40 lg:h-48 lg:w-48" /></motion.div>
        <motion.h1 id="hero-title" {...rise(0.15)} className="h-display max-w-[14ch] text-balance">Your Journey Begins Beyond the Ordinary.</motion.h1>
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
