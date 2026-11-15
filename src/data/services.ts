import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'consultoria', slug: 'consultoria', icon: 'compass',
    title: 'Consultoria de viagens',
    short: 'Roteiros e decisões com quem conhece o caminho.',
    description: 'Ajudamos a definir destino, época, orçamento e prioridades, para que cada decisão da viagem seja informada e sem surpresas.',
    benefits: ['Planeamento adaptado ao seu perfil', 'Orientação sobre época e custos', 'Um ponto de contacto único'],
  },
  {
    id: 'vistos', slug: 'vistos', icon: 'stamp',
    title: 'Processamento de vistos',
    short: 'Processos organizados do primeiro papel ao último.',
    description: 'Preparamos e organizamos o seu processo de visto, verificando requisitos e documentação. A decisão final cabe sempre às autoridades consulares competentes.',
    benefits: ['Verificação de requisitos', 'Processo organizado e revisto', 'Acompanhamento até à decisão'],
  },
  {
    id: 'agendamentos', slug: 'agendamentos', icon: 'calendar',
    title: 'Agendamentos em centros de vistos',
    short: 'Marcações tratadas por si, sem filas de espera online.',
    description: 'Tratamos da marcação nos centros de vistos e indicamos o que levar no dia, para que a visita decorra sem imprevistos.',
    benefits: ['Marcação de data e local', 'Lista do que levar', 'Lembretes antes do dia'],
  },
  {
    id: 'voos', slug: 'voos', icon: 'plane',
    title: 'Reservas de voos',
    short: 'Rotas e tarifas comparadas, escolha clara.',
    description: 'Comparamos opções de rota, horário e bagagem e apresentamos alternativas claras antes de qualquer reserva.',
    benefits: ['Comparação de opções', 'Regras de bagagem explicadas', 'Apoio em alterações'],
  },
  {
    id: 'hoteis', slug: 'hoteis', icon: 'bed',
    title: 'Reservas de hotéis',
    short: 'Alojamento certo para a viagem que tem em mente.',
    description: 'Selecionamos alojamento por localização, conforto e orçamento, e confirmamos as condições de cancelamento antes de reservar.',
    benefits: ['Seleção por localização e orçamento', 'Condições de cancelamento claras', 'Confirmação por escrito'],
  },
  {
    id: 'documentos', slug: 'documentos', icon: 'file',
    title: 'Assistência documental',
    short: 'Formulários, cartas e comprovativos em ordem.',
    description: 'Apoiamos no preenchimento de formulários e na organização de comprovativos, seguros e itinerários exigidos em cada destino.',
    benefits: ['Revisão de documentos', 'Orientação sobre comprovativos', 'Checklist por destino'],
  },
]
