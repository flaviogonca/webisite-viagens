import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/common/PageHeader'
import { imageCredits } from '@/data/credits'

export default function Credits() {
  useSeo('Créditos das imagens', 'Autores e licenças das fotografias utilizadas neste website.')
  return (<>
    <PageHeader title="Créditos das imagens." intro="Fotografias do Wikimedia Commons e do Unsplash, utilizadas segundo as licenças indicadas. Substitua-as por fotografia própria ou licenciada quando disponível." />
    <section className="section-y"><div className="container-x max-w-3xl">
      <ul className="divide-y divide-line">
        {imageCredits.map((c) => (
          <li key={c.file} className="py-4 text-sm"><strong>{c.title}</strong> — {c.author}. Licença {c.license}. <a className="underline" href={c.source} target="_blank" rel="noopener noreferrer">Fonte</a></li>
        ))}
      </ul>
    </div></section>
  </>)
}
