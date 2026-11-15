import { z } from 'zod'

const serviceIds = ['consultoria', 'vistos', 'agendamentos', 'voos', 'hoteis', 'documentos'] as const

export const serviceRequestSchema = z.object({
  fullName: z.string().trim().min(3, 'Indique o seu nome completo.'),
  email: z.email('Indique um email válido.'),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,17}$/, 'Indique um telefone válido, com indicativo se possível.'),
  residenceCountry: z.string().trim().min(2, 'Indique o país de residência.'),
  destinationCountry: z.string().trim().min(2, 'Indique o país de destino.'),
  serviceType: z.enum(serviceIds, { error: 'Escolha o tipo de serviço.' }),
  travelers: z.number({ error: 'Indique o número de viajantes.' }).int().min(1, 'Mínimo de 1 viajante.').max(30, 'Para grupos com mais de 30 pessoas, contacte-nos diretamente.'),
  desiredDate: z.string().optional(),
  message: z.string().trim().max(1000, 'Máximo de 1000 caracteres.').optional(),
  consent: z.literal(true, { error: 'É necessário aceitar o tratamento dos dados.' }),
})
export type ServiceRequestForm = z.infer<typeof serviceRequestSchema>

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Indique o seu nome.'),
  email: z.email('Indique um email válido.'),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Escreva pelo menos 10 caracteres.').max(1500, 'Máximo de 1500 caracteres.'),
  consent: z.literal(true, { error: 'É necessário aceitar o tratamento dos dados.' }),
})
export type ContactForm = z.infer<typeof contactSchema>
