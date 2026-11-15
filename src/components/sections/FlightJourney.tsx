import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { destinations } from '@/data/destinations'
import { DestinationsSection } from './DestinationsSection'
import { cn } from '@/utils/cn'

const PATH = 'M30 95 C 200 8, 330 8, 480 62 S 760 118, 970 38'
const n = destinations.length

export function FlightJourney() {
  const reduce = useReducedMotion()
  if (reduce) return <DestinationsSection />
  return <Journey />
}

function Journey() {
  const ref = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const planeRef = useRef<SVGGElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const [active, setActive] = useState(0)
  const [dots, setDots] = useState<{ x: number; y: number }[]>([])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const place = (p: number) => {
    const path = pathRef.current, plane = planeRef.current
    if (!path || !plane) return
    const len = path.getTotalLength()
    const at = (t: number) => path.getPointAtLength(Math.max(0, Math.min(1, t)) * len)
    const pt = at(p), nx = at(p + 0.01), pv = at(p - 0.01)
    plane.setAttribute('transform', `translate(${pt.x} ${pt.y}) rotate(${(Math.atan2(nx.y - pv.y, nx.x - pv.x) * 180) / Math.PI})`)
    trailRef.current?.setAttribute('stroke-dasharray', `${p * len} ${len}`)
    if (!dots.length) setDots(destinations.map((_, i) => at((i + 0.5) / n)))
  }
  useMotionValueEvent(scrollYProgress, 'change', (p) => { place(p); setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n)))) })
  // posição inicial
  const init = (el: SVGPathElement | null) => { pathRef.current = el; if (el && !dots.length) requestAnimationFrame(() => place(scrollYProgress.get())) }

  const go = (i: number) => {
    const el = ref.current; if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + ((i + 0.5) / n) * (el.offsetHeight - window.innerHeight), behavior: 'smooth' })
  }
  const d = destinations[active]

  return (
    <section ref={ref} style={{ height: `${n * 75}vh` }} className="relative bg-marine text-fog" aria-labelledby="rota-titulo">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-24">
        <div className="container-x">
          <h2 id="rota-titulo" className="h-section">Para onde quer ir a seguir?</h2>
          <p className="mt-2 text-sm text-mist">Deslize para voar de destino em destino, ou escolha um.</p>
        </div>

        <div className="container-x relative mt-3">
          <svg viewBox="0 0 1000 120" className="h-auto w-full" aria-hidden>
            <path ref={init} d={PATH} fill="none" stroke="#9ec3c6" strokeOpacity=".35" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
            <path ref={trailRef} d={PATH} fill="none" stroke="#e9b44c" strokeWidth="3" strokeLinecap="round" strokeDasharray="0 9999" />
            {dots.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={i === active ? 9 : 5} fill={i <= active ? '#e9b44c' : '#123d49'} stroke="#e9b44c" strokeWidth="2" style={{ transition: 'r .3s' }} />)}
            <g ref={planeRef}><g transform="scale(1.6) translate(-12 -12)"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" fill="#e9b44c" transform="rotate(90 12 12)" /></g></g>
          </svg>
        </div>

        <div className="container-x grid min-h-0 flex-1 gap-6 pb-8 md:grid-cols-[1fr_1.25fr] md:gap-10">
          <div className="order-2 flex min-h-0 flex-col justify-between md:order-1">
            <motion.div key={d.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} aria-live="polite">
              <p className="text-saffron">{d.country}</p>
              <h3 className="font-display text-4xl font-bold md:text-6xl">{d.name}</h3>
              <p className="mt-3 max-w-[40ch] text-fog/85">{d.description}</p>
              <p className="mt-3 text-sm text-mist">Melhor época: {d.bestTime}</p>
              <Link to={`/destinos/${d.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-semibold text-saffron hover:underline">Explorar {d.name} <ArrowUpRight size={18} aria-hidden /></Link>
            </motion.div>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Escolher destino">
              {destinations.map((x, i) => (
                <li key={x.slug}><button onClick={() => go(i)} aria-current={i === active} className={cn('min-h-10 rounded-sm border px-3 text-sm font-semibold transition-colors', i === active ? 'border-saffron bg-saffron text-marine' : 'border-white/25 hover:border-saffron')}>{x.name}</button></li>
              ))}
            </ul>
          </div>
          <div className="relative order-1 min-h-0 overflow-hidden rounded-sm md:order-2" style={{ minHeight: '34vh' }}>
            {destinations.map((x, i) => (
              <motion.img key={x.slug} src={x.image} alt={i === active ? `${x.name}: fotografia` : ''} aria-hidden={i !== active} loading={i < 2 ? 'eager' : 'lazy'}
                className="absolute inset-0 h-full w-full object-cover" initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.12 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-marine/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
