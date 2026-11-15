import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre nós' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/destinos', label: 'Destinos' },
  { to: '/vistos', label: 'Vistos' },
  { to: '/contactos', label: 'Contactos' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const solid = scrolled || open

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,box-shadow] duration-500', solid ? 'bg-marine/95 shadow-[0_1px_0_rgba(255,255,255,.08)] backdrop-blur-md' : 'bg-transparent')}>
      <div className="container-x flex h-[4.5rem] items-center justify-between text-fog">
        <Link to="/" aria-label="Página inicial"><Logo /></Link>
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => cn('relative px-3.5 py-2 text-[0.92rem] font-medium transition-colors hover:text-saffron', isActive && 'text-saffron')}>
              {({ isActive }) => (<>{l.label}{isActive && <motion.span layoutId="nav-dot" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-saffron" />}</>)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button to="/solicitar-servico" className="max-lg:!hidden !min-h-11 !px-5">Solicitar serviço</Button>
          <button className="grid h-12 w-12 place-items-center lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="menu-mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: 'calc(100dvh - 4.5rem)', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden bg-marine text-fog lg:hidden">
            <nav aria-label="Móvel" className="container-x flex flex-col py-6">
              {navLinks.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                  <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => cn('font-display block border-b border-white/10 py-4 text-3xl font-semibold', isActive && 'text-saffron')}>{l.label}</NavLink>
                </motion.div>
              ))}
              <Button to="/solicitar-servico" className="mt-8">Solicitar serviço</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
