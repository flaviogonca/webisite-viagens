import type { ReactNode } from 'react'

export function PageHeader({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <header className="bg-marine pt-36 pb-16 text-fog md:pb-24">
      <div className="container-x">
        <h1 className="h-section max-w-[18ch] text-balance">{title}</h1>
        <p className="lead mt-6 text-mist">{intro}</p>
        {children}
      </div>
    </header>
  )
}
