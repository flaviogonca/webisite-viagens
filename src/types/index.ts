export type ServiceId = 'consultoria' | 'vistos' | 'agendamentos' | 'voos' | 'hoteis' | 'documentos'

export interface Service {
  id: ServiceId
  slug: string
  title: string
  short: string
  description: string
  benefits: string[]
  icon: 'compass' | 'stamp' | 'calendar' | 'plane' | 'bed' | 'file'
}

export type ArtKey = 'portugal' | 'franca' | 'espanha' | 'dubai' | 'uk' | 'eua' | 'brasil'

export interface Destination {
  slug: string
  name: string
  country: string
  region: 'Europa' | 'Médio Oriente' | 'América do Norte' | 'América do Sul'
  tagline: string
  description: string
  highlights: string[]
  bestTime: string
  entryNote: string
  art: ArtKey
  /** URL de fotografia real. Quando definido, substitui a ilustração. */
  image?: string
}

export interface Faq { id: string; question: string; answer: string }
export interface Testimonial { id: string; quote: string; author: string; context: string }
export interface Step { title: string; text: string }

export interface ServiceRequestPayload {
  fullName: string
  email: string
  phone: string
  residenceCountry: string
  destinationCountry: string
  serviceType: ServiceId
  travelers: number
  desiredDate?: string
  message?: string
  consent: boolean
}
export interface ContactPayload { name: string; email: string; phone?: string; message: string; consent: boolean }
