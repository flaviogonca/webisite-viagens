import { useEffect } from 'react'
import { agency } from '@/config/agency'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', content)
}
export function useSeo(title: string, description: string) {
  useEffect(() => {
    const full = title ? `${title} — ${agency.name}` : `${agency.name} — Agência de viagens e vistos`
    document.title = full
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', window.location.href)
  }, [title, description])
}
