import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/common/PageHeader'

export function Privacy() {
  useSeo('Política de privacidade', 'Como tratamos os dados pessoais dos visitantes.')
  return (<><PageHeader title="Política de privacidade" intro="Rascunho — texto jurídico por fornecer." /><section className="section-y"><div className="container-x max-w-2xl text-ink/75"><p>O texto final desta política deve ser redigido ou validado por um profissional jurídico e estar de acordo com a legislação angolana de proteção de dados aplicável.</p></div></section></>)
}
export function Terms() {
  useSeo('Termos e condições', 'Termos e condições de utilização dos serviços.')
  return (<><PageHeader title="Termos e condições" intro="Rascunho — texto jurídico por fornecer." /><section className="section-y"><div className="container-x max-w-2xl text-ink/75"><p>Os termos finais devem ser fornecidos pela agência e validados juridicamente.</p></div></section></>)
}
