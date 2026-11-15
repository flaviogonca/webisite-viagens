/**
 * Fonte única de verdade para a identidade da agência.
 * TODOS os valores marcados PLACEHOLDER devem ser substituídos pelos dados reais.
 */
export const agency = {
  name: 'Kosmopolita', // PLACEHOLDER — nome definitivo por confirmar
  tagline: 'Explore Beyond Boundaries',
  description:
    'Agência de viagens com atuação em Angola e serviços internacionais: consultoria, vistos, voos, hotéis e apoio documental.',
  email: 'geral@exemplo.com', // PLACEHOLDER
  phone: '+244 900 000 000', // PLACEHOLDER
  whatsapp: '244900000000', // PLACEHOLDER — só dígitos, com indicativo
  address: 'Luanda, Angola — morada por confirmar', // PLACEHOLDER
  hasConfirmedLocation: false,
  mapEmbedUrl: '' as string, // preencher quando existir localização confirmada
  hours: 'Segunda a sexta, horário por confirmar', // PLACEHOLDER
  social: [
    { label: 'Instagram', href: '' },
    { label: 'Facebook', href: '' },
    { label: 'LinkedIn', href: '' },
  ] as { label: string; href: string }[], // PLACEHOLDER — vazio = ocultado
  languages: ['pt'] as const, // adicionar 'en' no futuro
  defaultLanguage: 'pt',
  currency: 'Kz',
  siteUrl: 'https://www.example.com', // PLACEHOLDER
  logo: null as string | null, // PLACEHOLDER — logótipo oficial por fornecer
}

export const whatsappLink = (message = 'Olá! Gostaria de obter informações sobre os vossos serviços.') =>
  `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(message)}`
