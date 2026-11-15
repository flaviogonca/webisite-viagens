export interface BoardItem {
  id: string
  image: string
  /** largura / altura da fotografia */
  ratio: number
  title: string
  place: string
  note: string
  /** slug de /destinos/:slug, quando existir */
  slug?: string
  country?: string
  /** posição no painel: ângulo (graus), altura e altura do cartão */
  slot: { angle: number; y: number; h: number }
}

export const boardItems: BoardItem[] = [
  { id: 'aviao-pouso', image: '/images/aviao-pouso.jpg', ratio: 0.667, title: 'Partir', place: 'A caminho', note: 'O momento em que a viagem deixa de ser plano.', slot: { angle: -36, y: 0.9, h: 2.5 } },
  { id: 'algarve', image: '/images/algarve.jpg', ratio: 0.667, title: 'Algarve', place: 'Portugal', note: 'Falésias douradas e água cristalina.', slug: 'portugal', country: 'Portugal', slot: { angle: -27, y: -1.3, h: 2.2 } },
  { id: 'paris-eiffel', image: '/images/paris-torre-eiffel.jpg', ratio: 0.667, title: 'Paris', place: 'França', note: 'A Torre Eiffel em dia de outono.', slug: 'franca', country: 'França', slot: { angle: -17, y: 1.1, h: 2.9 } },
  { id: 'lisboa', image: '/images/lisboa-janela.jpg', ratio: 0.667, title: 'Lisboa', place: 'Portugal', note: 'Telhados vermelhos vistos por uma janela de pedra.', slug: 'portugal', country: 'Portugal', slot: { angle: -8, y: -1.1, h: 2.3 } },
  { id: 'dubai', image: '/images/dubai-burj-al-arab.jpg', ratio: 0.667, title: 'Dubai', place: 'Emirados Árabes Unidos', note: 'Mar, palmeiras artificiais e arquitetura de outro mundo.', slug: 'dubai', country: 'Emirados Árabes Unidos', slot: { angle: 0, y: 0.25, h: 3.3 } },
  { id: 'rio', image: '/images/rio-por-do-sol.jpg', ratio: 1.333, title: 'Rio de Janeiro', place: 'Brasil', note: 'Copacabana acende-se ao fim do dia.', slug: 'brasil', country: 'Brasil', slot: { angle: 9, y: 1.5, h: 1.9 } },
  { id: 'paris-ponte', image: '/images/paris-ponte.jpg', ratio: 1.413, title: 'Sena ao anoitecer', place: 'França', note: 'Candeeiros dourados sobre a Ponte Alexandre III.', slug: 'franca', country: 'França', slot: { angle: 17, y: -1.2, h: 1.9 } },
  { id: 'espanha', image: '/images/espanha.jpg', ratio: 1.33, title: 'Barcelona', place: 'Espanha', note: 'Luz a atravessar a Sagrada Família.', slug: 'espanha', country: 'Espanha', slot: { angle: 26, y: 1.0, h: 2.0 } },
  { id: 'londres', image: '/images/reino-unido.jpg', ratio: 1.5, title: 'Londres', place: 'Reino Unido', note: 'O Big Ben visto do Tamisa.', slug: 'reino-unido', country: 'Reino Unido', slot: { angle: 34, y: -0.9, h: 1.8 } },
  { id: 'nova-iorque', image: '/images/estados-unidos.jpg', ratio: 1.778, title: 'Nova Iorque', place: 'Estados Unidos', note: 'Lower Manhattan ao fim da tarde.', slug: 'estados-unidos', country: 'Estados Unidos', slot: { angle: 42, y: 0.9, h: 1.6 } },
  { id: 'asa', image: '/images/aviao-por-do-sol.jpg', ratio: 1.5, title: 'Acima das nuvens', place: 'A caminho', note: 'A hora dourada à janela do avião.', slot: { angle: -45, y: -1.2, h: 1.7 } },
]
