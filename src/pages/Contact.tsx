import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/common/PageHeader'
import { ContactForm } from '@/components/forms/ContactForm'
import { agency, whatsappLink } from '@/config/agency'

export default function Contact() {
  useSeo('Contactos', 'Fale com a equipa por formulário, email, telefone ou WhatsApp.')
  const item = 'flex gap-3'
  return (<>
    <PageHeader title="Fale connosco." intro="Escolha o canal que lhe for mais confortável." />
    <section className="section-y"><div className="container-x grid gap-14 md:grid-cols-[1fr_1.2fr]">
      <div>
        <ul className="space-y-5">
          <li className={item}><Mail className="text-sea" aria-hidden /><a href={`mailto:${agency.email}`} className="underline">{agency.email}</a></li>
          <li className={item}><Phone className="text-sea" aria-hidden /><a href={`tel:${agency.phone.replace(/\s/g, '')}`}>{agency.phone}</a></li>
          <li className={item}><MessageCircle className="text-sea" aria-hidden /><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline">Conversar por WhatsApp</a></li>
          <li className={item}><MapPin className="text-sea" aria-hidden />{agency.address}</li>
          <li className="text-sm text-ink/60">{agency.hours}</li>
        </ul>
        {agency.hasConfirmedLocation && agency.mapEmbedUrl
          ? <iframe title="Mapa da localização" src={agency.mapEmbedUrl} loading="lazy" className="mt-8 h-64 w-full rounded-sm border-0" />
          : <p className="mt-8 rounded-sm bg-fog p-4 text-sm text-ink/70">O mapa será apresentado quando a localização for confirmada.</p>}
      </div>
      <ContactForm />
    </div></section>
  </>)
}
