import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { agency, whatsappLink } from '@/config/agency'
import { navLinks } from './Navbar'
import { services } from '@/data/services'

export function Footer() {
  const social = agency.social.filter((s) => s.href)
  return (
    <footer className="bg-ink text-fog">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">{agency.description}</p>
          {social.length > 0 && (
            <ul className="mt-5 flex gap-4 text-sm">{social.map((s) => <li key={s.label}><a className="hover:text-saffron" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
          )}
        </div>
        <nav aria-label="Rodapé: navegação"><h2 className="font-display text-base font-semibold">Navegação</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-mist">{navLinks.map((l) => <li key={l.to}><Link className="hover:text-saffron" to={l.to}>{l.label}</Link></li>)}</ul></nav>
        <nav aria-label="Rodapé: serviços"><h2 className="font-display text-base font-semibold">Serviços</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-mist">{services.map((s) => <li key={s.id}><Link className="hover:text-saffron" to={`/servicos#${s.slug}`}>{s.title}</Link></li>)}</ul></nav>
        <div><h2 className="font-display text-base font-semibold">Contactos</h2>
          <ul className="mt-4 space-y-3 text-sm text-mist">
            <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0" aria-hidden /><a className="hover:text-saffron" href={`mailto:${agency.email}`}>{agency.email}</a></li>
            <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0" aria-hidden /><a className="hover:text-saffron" href={`tel:${agency.phone.replace(/\s/g, '')}`}>{agency.phone}</a></li>
            <li className="flex gap-2.5"><MessageCircle size={16} className="mt-0.5 shrink-0" aria-hidden /><a className="hover:text-saffron" href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />{agency.address}</li>
          </ul></div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-mist md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {agency.name}. Todos os direitos reservados.</p>
          <p className="flex gap-5"><Link className="hover:text-saffron" to="/privacidade">Política de privacidade</Link><Link className="hover:text-saffron" to="/termos">Termos e condições</Link><Link className="hover:text-saffron" to="/creditos">Créditos das imagens</Link></p>
        </div>
      </div>
    </footer>
  )
}
