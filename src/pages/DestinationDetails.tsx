import { Link, useParams } from 'react-router-dom'
import { useSeo } from '@/hooks/useSeo'
import { destinations } from '@/data/destinations'
import { DestinationArt } from '@/components/art/DestinationArt'
import { Button } from '@/components/ui/Button'
import { whatsappLink } from '@/config/agency'
import NotFound from './NotFound'

export default function DestinationDetails() {
  const { slug } = useParams()
  const d = destinations.find((x) => x.slug === slug)
  useSeo(d?.name ?? 'Destino não encontrado', d?.description ?? 'Destino não encontrado.')
  if (!d) return <NotFound />
  return (<>
    <header className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-marine text-fog">
      <div className="absolute inset-0 -z-10">{d.image ? <img src={d.image} alt="" className="h-full w-full object-cover" /> : <DestinationArt art={d.art} className="h-full w-full" />}</div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-marine/90 via-marine/30 to-marine/20" />
      <div className="container-x pb-14 pt-40">
        <p className="text-saffron">{d.country} · {d.region}</p>
        <h1 className="h-display mt-2">{d.name}</h1>
        <p className="lead mt-4">{d.tagline}</p>
      </div>
    </header>
    <section className="section-y"><div className="container-x grid gap-12 md:grid-cols-[1.3fr_1fr]">
      <div><h2 className="font-display text-2xl font-bold">Sobre o destino</h2><p className="mt-3 max-w-[60ch] text-ink/75">{d.description}</p>
        <h2 className="font-display mt-10 text-2xl font-bold">Não perca</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink/75">{d.highlights.map((h) => <li key={h}>{h}</li>)}</ul></div>
      <aside className="h-fit rounded-sm bg-fog p-7"><h2 className="font-display text-xl font-bold">Para planear</h2>
        <p className="mt-4 text-sm"><strong>Melhor época:</strong> {d.bestTime}</p>
        <p className="mt-3 text-sm text-ink/70"><strong className="text-ink">Entrada:</strong> {d.entryNote}</p>
        <div className="mt-6 flex flex-col gap-3">
          <Button to={`/solicitar-servico?destino=${encodeURIComponent(d.country)}`} variant="dark">Solicitar serviço para {d.name}</Button>
          <Button href={whatsappLink(`Olá! Tenho interesse em viajar para ${d.name}.`)} variant="secondary">Perguntar por WhatsApp</Button>
        </div></aside>
    </div></section>
    <div className="container-x pb-16"><Link to="/destinos" className="text-sm font-semibold underline underline-offset-4">Voltar aos destinos</Link></div>
  </>)
}
