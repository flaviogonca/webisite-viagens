import { useSeo } from '@/hooks/useSeo'
import { Hero } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { DestinationsSection } from '@/components/sections/DestinationsSection'
import { VisaSection } from '@/components/sections/VisaSection'
import { WhyUs } from '@/components/sections/WhyUs'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { FaqSection } from '@/components/sections/FaqSection'
import { FinalCta } from '@/components/sections/FinalCta'

export default function Home() {
  useSeo('', 'Consultoria de viagens, vistos, voos e hotéis. Uma equipa que cuida de cada detalhe da sua viagem.')
  return (<><Hero /><ServicesSection /><DestinationsSection /><VisaSection /><WhyUs /><HowItWorks /><Testimonials /><FaqSection /><FinalCta /></>)
}
