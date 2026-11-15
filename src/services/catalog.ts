import { api, hasApi } from './api/client'
import { endpoints } from './api/endpoints'
import { services } from '@/data/services'
import { destinations } from '@/data/destinations'
import { faqs } from '@/data/content'
import type { Destination, Faq, Service } from '@/types'

/** Com API configurada usa o backend; caso contrário, dados estáticos locais. */
async function load<T>(path: string, fallback: T[]): Promise<T[]> {
  if (!hasApi) return fallback
  const res = await api.get<{ data: T[] }>(path)
  return res.data
}
export const getServices = () => load<Service>(endpoints.services, services)
export const getDestinations = () => load<Destination>(endpoints.destinations, destinations)
export const getFaqs = () => load<Faq>(endpoints.faqs, faqs)
