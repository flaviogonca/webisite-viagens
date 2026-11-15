/** Carimbo circular com texto em rotação — elemento de assinatura da marca. */
export function Stamp({ text, className = '' }: { text: string; className?: string }) {
  const id = 'stamp-path'
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs><path id={id} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" /></defs>
      <g className="spin-slow" style={{ transformOrigin: '100px 100px' }}>
        <text fill="currentColor" fontSize="15" letterSpacing="4.2" fontFamily="var(--font-display)" fontWeight="600">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </g>
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M100 56l9 36 35 8-35 8-9 36-9-36-35-8 35-8z" fill="currentColor" />
    </svg>
  )
}
