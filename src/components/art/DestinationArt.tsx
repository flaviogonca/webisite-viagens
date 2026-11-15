import { useId, type ReactNode } from 'react'
import type { ArtKey } from '@/types'

interface Palette { sky: [string, string]; sun: string; far: string; near: string }
const palettes: Record<ArtKey, Palette> = {
  portugal: { sky: ['#f6c26b', '#f3e2c0'], sun: '#e9743f', far: '#2a7f8e', near: '#0b2a33' },
  franca: { sky: ['#8aa7d9', '#f1d9e3'], sun: '#fbe9b8', far: '#5b6fa8', near: '#1c2748' },
  espanha: { sky: ['#e0663f', '#f5b86a'], sun: '#fff0c2', far: '#a8432b', near: '#3b1511' },
  dubai: { sky: ['#1c3b57', '#e8a35c'], sun: '#ffd88a', far: '#356281', near: '#0b1c2b' },
  uk: { sky: ['#9fb3bd', '#dfe6e6'], sun: '#f4f1e6', far: '#6b8591', near: '#1a2b33' },
  eua: { sky: ['#2c3e7a', '#f19c79'], sun: '#ffd9a6', far: '#46558f', near: '#10152e' },
  brasil: { sky: ['#37b6a3', '#f6e08a'], sun: '#ff9d3c', far: '#1c8a6b', near: '#07312a' },
}

const bars = (xs: [number, number, number][], y = 500) =>
  xs.map(([x, w, h], i) => <rect key={i} x={x} y={y - h} width={w} height={h} />)

function scene(key: ArtKey): ReactNode {
  switch (key) {
    case 'portugal':
      return (<>
        <path d="M0 330 Q120 270 230 320 T400 300 V500 H0Z" className="art-far" />
        <path d="M0 400 Q100 370 200 395 T400 380 V500 H0Z" className="art-near" />
        <rect x="262" y="262" width="26" height="110" className="art-near" /><path d="M258 262h34l-17-34z" className="art-near" />
        <rect x="255" y="372" width="40" height="14" className="art-near" />
      </>)
    case 'franca':
      return (<>
        <path d="M0 400 H400 V500 H0Z" className="art-near" />
        <path d="M200 120 L238 400 H162Z" className="art-near" />
        <path d="M184 270 H216 M174 330 H226" stroke="#f1d9e3" strokeWidth="5" />
        <path d="M0 360 Q100 330 200 355 T400 345 V400 H0Z" className="art-far" />
        <path d="M200 120 V90" stroke="#1c2748" strokeWidth="4" />
      </>)
    case 'espanha':
      return (<>
        <path d="M0 410 H400 V500 H0Z" className="art-near" />
        {[120, 168, 232, 280].map((x, i) => (<g key={x} className="art-near">
          <rect x={x - 11} y={190 - (i % 3) * 18} width="22" height={220 + (i % 3) * 18} />
          <path d={`M${x - 11} ${190 - (i % 3) * 18} L${x} ${120 - (i % 3) * 18} L${x + 11} ${190 - (i % 3) * 18}Z`} />
        </g>))}
        <path d="M0 380 Q120 340 220 372 T400 360 V410 H0Z" className="art-far" />
      </>)
    case 'dubai':
      return (<>
        <g className="art-far">{bars([[20, 36, 170], [64, 30, 230], [300, 34, 190], [344, 40, 140]], 430)}</g>
        <g className="art-near">
          <path d="M200 430 L192 250 L200 110 L208 250Z" />
          {bars([[110, 40, 150], [150, 34, 210], [232, 34, 190], [272, 44, 120]], 430)}
          <rect x="0" y="430" width="400" height="70" />
        </g>
      </>)
    case 'uk':
      return (<>
        <path d="M0 410 H400 V500 H0Z" className="art-near" />
        <g className="art-near">
          <rect x="165" y="170" width="46" height="240" /><rect x="159" y="150" width="58" height="30" />
          <path d="M159 150 L188 96 L217 150Z" /><rect x="186" y="60" width="4" height="40" />
          <rect x="226" y="300" width="130" height="110" /><rect x="40" y="320" width="115" height="90" />
        </g>
        <circle cx="188" cy="205" r="14" fill="#f4f1e6" />
        <path d="M0 380 Q200 340 400 385 V410 H0Z" className="art-far" />
      </>)
    case 'eua':
      return (<>
        <path d="M0 420 H400 V500 H0Z" className="art-near" />
        <g className="art-far">{bars([[30, 40, 170], [80, 34, 230], [300, 46, 200], [352, 36, 150]], 420)}</g>
        <g className="art-near">
          {bars([[120, 40, 190], [166, 50, 250], [226, 46, 210]], 420)}
          <rect x="182" y="130" width="18" height="48" /><path d="M182 130 L191 90 L200 130Z" />
        </g>
        <g stroke="#ffd9a6" strokeOpacity=".5" strokeWidth="3"><path d="M0 440 H400 M0 462 H400" /></g>
      </>)
    case 'brasil':
      return (<>
        <path d="M0 360 Q70 250 150 330 Q200 200 270 330 Q340 290 400 360 V500 H0Z" className="art-far" />
        <path d="M120 330 L170 150 L220 330Z" className="art-near" />
        <path d="M170 150 V108 M146 128 H194" stroke="#07312a" strokeWidth="8" strokeLinecap="round" />
        <path d="M0 410 Q200 380 400 415 V500 H0Z" className="art-near" />
        <path d="M330 420 Q335 340 350 300 M350 300 Q325 305 312 322 M350 300 Q370 300 385 318 M350 300 Q348 280 360 268" stroke="#07312a" strokeWidth="6" fill="none" strokeLinecap="round" />
      </>)
  }
}

export function DestinationArt({ art, label, className }: { art: ArtKey; label?: string; className?: string }) {
  const id = useId()
  const p = palettes[art]
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ ["--far" as string]: p.far, ["--near" as string]: p.near }} className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.sky[0]} /><stop offset="1" stopColor={p.sky[1]} /></linearGradient></defs>
      <rect width="400" height="500" fill={`url(#${id})`} />
      <circle cx="290" cy="170" r="46" fill={p.sun} opacity=".95" />
      {scene(art)}
    </svg>
  )
}
