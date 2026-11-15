import { lazy, Suspense } from 'react'
import { useSeo } from '@/hooks/useSeo'
import { Hero } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FlightJourney } from '@/components/sections/FlightJourney'
import { PhotoBand } from '@/components/sections/PhotoBand'
const VisionBoard = lazy(() => import('@/components/sections/VisionBoard').then((m) => ({ default: m.VisionBoard })))
import { VisaSection } from '@/components/sections/VisaSection'
import { WhyUs } from '@/components/sections/WhyUs'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { FaqSection } from '@/components/sections/FaqSection'
import { FinalCta } from '@/components/sections/FinalCta'

export default function Home() {
  useSeo('', 'Consultoria de viagens, vistos, voos e hotéis. Uma equipa que cuida de cada detalhe da sua viagem.')
  return (<><Hero /><ServicesSection /><FlightJourney /><PhotoBand /><Suspense fallback={<div className="min-h-[60vh] bg-ink" aria-busy />}><VisionBoard /></Suspense><VisaSection /><WhyUs /><HowItWorks /><Testimonials /><FaqSection /><FinalCta /></>)
}
