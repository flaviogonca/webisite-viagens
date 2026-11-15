import type { Destination } from '@/types'

const ENTRY = 'Os requisitos de entrada variam consoante a nacionalidade e mudam com frequência. Confirmamos consigo a informação oficial antes de avançar.'

export const destinations: Destination[] = [
  { slug: 'portugal', image: '/images/portugal.jpg', name: 'Portugal', country: 'Portugal', region: 'Europa', art: 'portugal',
    tagline: 'Luz atlântica, azulejos e mesa farta.',
    description: 'De Lisboa ao Douro, um país compacto onde cidade, vinho e mar cabem na mesma semana.',
    highlights: ['Lisboa e Sintra', 'Porto e vale do Douro', 'Algarve'], bestTime: 'Abril a junho e setembro a outubro', entryNote: ENTRY },
  { slug: 'franca', image: '/images/paris-torre-eiffel.jpg', name: 'França', country: 'França', region: 'Europa', art: 'franca',
    tagline: 'Museus, mercados e estradas de vinha.',
    description: 'Paris é o ponto de partida habitual, mas a Provença, a Borgonha e a Riviera pedem tempo.',
    highlights: ['Paris', 'Provença', 'Riviera Francesa'], bestTime: 'Maio a setembro', entryNote: ENTRY },
  { slug: 'espanha', image: '/images/espanha.jpg', name: 'Espanha', country: 'Espanha', region: 'Europa', art: 'espanha',
    tagline: 'Arquitetura ousada e jantares tardios.',
    description: 'Barcelona, Madrid e Sevilha oferecem três ritmos muito diferentes dentro do mesmo país.',
    highlights: ['Barcelona', 'Madrid', 'Andaluzia'], bestTime: 'Março a maio e setembro a novembro', entryNote: ENTRY },
  { slug: 'dubai', image: '/images/dubai-burj-al-arab.jpg', name: 'Dubai', country: 'Emirados Árabes Unidos', region: 'Médio Oriente', art: 'dubai',
    tagline: 'Horizonte vertical e deserto à porta.',
    description: 'Cidade de contrastes: arranha-céus, souks tradicionais e dunas a meia hora do centro.',
    highlights: ['Downtown e Burj Khalifa', 'Souks da cidade antiga', 'Safari no deserto'], bestTime: 'Novembro a março', entryNote: ENTRY },
  { slug: 'reino-unido', image: '/images/reino-unido.jpg', name: 'Reino Unido', country: 'Reino Unido', region: 'Europa', art: 'uk',
    tagline: 'História viva e cidades que nunca param.',
    description: 'Londres concentra teatro, museus e mercados; Escócia e Inglaterra rural trazem outro silêncio.',
    highlights: ['Londres', 'Edimburgo', 'Cotswolds'], bestTime: 'Maio a setembro', entryNote: ENTRY },
  { slug: 'estados-unidos', image: '/images/estados-unidos.jpg', name: 'Estados Unidos', country: 'Estados Unidos da América', region: 'América do Norte', art: 'eua',
    tagline: 'Distâncias enormes, paisagens maiores ainda.',
    description: 'De Nova Iorque à Califórnia, convém escolher poucas regiões e aproveitá-las bem.',
    highlights: ['Nova Iorque', 'Califórnia', 'Florida'], bestTime: 'Varia por região', entryNote: ENTRY },
  { slug: 'brasil', image: '/images/rio-por-do-sol.jpg', name: 'Brasil', country: 'Brasil', region: 'América do Sul', art: 'brasil',
    tagline: 'Praia, floresta e uma língua familiar.',
    description: 'Do Rio de Janeiro à Bahia, uma viagem onde o português abre portas e conversas.',
    highlights: ['Rio de Janeiro', 'Salvador', 'Florianópolis'], bestTime: 'Maio a outubro', entryNote: ENTRY },
]
export const regions = ['Todos', 'Europa', 'Médio Oriente', 'América do Norte', 'América do Sul'] as const
