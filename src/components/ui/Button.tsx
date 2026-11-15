import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark'
const base = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-6 py-3 text-[0.95rem] font-semibold transition-[background,color,transform,border-color] duration-300 active:translate-y-px'
const variants: Record<Variant, string> = {
  primary: 'bg-saffron text-marine hover:bg-white',
  secondary: 'border border-current/40 hover:border-current hover:bg-white/10',
  ghost: 'underline-offset-4 hover:underline px-0',
  dark: 'bg-marine text-fog hover:bg-sea',
}
interface Props { variant?: Variant; to?: string; href?: string; children: ReactNode; className?: string }

export function Button({ variant = 'primary', to, href, children, className, ...rest }: Props & Omit<ComponentProps<'button'>, 'children' | 'className'>) {
  const cls = cn(base, variants[variant], className)
  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>
  return <button className={cls} {...rest}>{children}</button>
}
