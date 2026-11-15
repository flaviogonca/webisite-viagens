import type { Faq, Step, Testimonial } from '@/types'

export const faqs: Faq[] = [
  { id: 'servicos', question: 'Quais são os serviços oferecidos pela agência?', answer: 'Consultoria de viagens, processamento de vistos, agendamentos em centros de vistos, reservas de voos e hotéis e assistência documental.' },
  { id: 'pedir-visto', question: 'Como posso solicitar um visto?', answer: 'Preencha o formulário de assistência para visto indicando o destino e o seu caso. A equipa contacta-o para confirmar requisitos e documentos.' },
  { id: 'tempo-visto', question: 'Quanto tempo demora um processo de visto?', answer: 'Depende do país, do tipo de visto e da época do ano. Indicamos os prazos oficiais conhecidos, mas só a autoridade consular decide o tempo de resposta.' },
  { id: 'garantia', question: 'A agência garante a aprovação do visto?', answer: 'Não. A decisão final pertence sempre às autoridades consulares competentes. O nosso trabalho é preparar e organizar o processo com rigor.' },
  { id: 'acompanhar', question: 'Como posso acompanhar o meu processo?', answer: 'A equipa mantém-no informado ao longo das etapas. O acompanhamento online está previsto para uma fase futura da plataforma.' },
  { id: 'agendamento', question: 'Como posso solicitar um agendamento?', answer: 'Peça o serviço “Agendamentos em centros de vistos” através do formulário e indique o destino e a data pretendida.' },
  { id: 'contacto', question: 'Como posso entrar em contacto?', answer: 'Pelo formulário de contacto, por email, por telefone ou por WhatsApp. Os contactos estão na página Contactos.' },
]

export const steps: Step[] = [
  { title: 'Escolha o serviço', text: 'Indique o que precisa: visto, voo, hotel ou uma viagem completa.' },
  { title: 'Fale com a agência', text: 'Envie o pedido ou escreva-nos por WhatsApp. Respondemos com os próximos passos.' },
  { title: 'Receba orientação', text: 'Recebe a lista de requisitos, prazos e documentos para o seu caso.' },
  { title: 'Acompanhe o processo', text: 'Mantemo-lo informado em cada etapa, sem ter de perguntar.' },
  { title: 'Prepare a viagem', text: 'Com tudo organizado, resta fazer a mala.' },
]

export const differentiators: Step[] = [
  { title: 'Atendimento personalizado', text: 'Cada pedido é tratado por uma pessoa, não por um formulário.' },
  { title: 'Acompanhamento dos processos', text: 'Sabe sempre em que fase está o seu pedido.' },
  { title: 'Transparência', text: 'Explicamos requisitos, prazos e limites antes de começar. Nunca prometemos resultados que não controlamos.' },
  { title: 'Equipa especializada', text: 'Conhecimento prático de vistos, rotas e alojamento.' },
  { title: 'Assistência durante o planeamento', text: 'Dúvidas a meio do processo? Há alguém para responder.' },
]

/** DEMONSTRAÇÃO — conteúdo fictício para desenvolvimento. Substituir por testemunhos reais. */
export const testimonials: Testimonial[] = [
  { id: 't1', quote: 'Texto de demonstração: aqui aparecerá a opinião de um cliente real sobre o atendimento.', author: 'Cliente (demonstração)', context: 'Serviço de visto' },
  { id: 't2', quote: 'Texto de demonstração: espaço reservado para um testemunho sobre reservas de voos e hotéis.', author: 'Cliente (demonstração)', context: 'Viagem de lazer' },
  { id: 't3', quote: 'Texto de demonstração: espaço reservado para um testemunho sobre assistência documental.', author: 'Cliente (demonstração)', context: 'Assistência documental' },
]

export const visaAssistance = [
  { title: 'Orientação documental', text: 'Lista exata do que o seu destino exige, sem papéis a mais.' },
  { title: 'Preparação de processos', text: 'Revisão e organização do dossiê antes da submissão.' },
  { title: 'Apoio no agendamento', text: 'Marcação no centro de vistos e preparação para o dia.' },
  { title: 'Acompanhamento', text: 'Informação de estado enquanto o processo decorre.' },
  { title: 'Assistência personalizada', text: 'Um interlocutor que conhece o seu caso.' },
]
export const visaDocs = ['Passaporte válido (confirmar validade mínima exigida)', 'Fotografias no formato exigido pelo consulado', 'Comprovativo de alojamento e itinerário', 'Comprovativos financeiros', 'Seguro de viagem, quando exigido', 'Formulário do visto preenchido']
