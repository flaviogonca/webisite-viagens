import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { whatsappLink } from '@/config/agency'

export function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) { requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView()); return }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-saffron focus:px-4 focus:py-2 focus:text-marine">Saltar para o conteúdo</a>
      <Navbar />
      <main id="conteudo"><Outlet /></main>
      <Footer />
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Conversar por WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-saffron text-marine shadow-lg transition-transform hover:scale-105"><MessageCircle aria-hidden /></a>
    </>
  )
}
