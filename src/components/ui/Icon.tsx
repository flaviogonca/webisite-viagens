import { Compass, Stamp, CalendarCheck, Plane, BedDouble, FileText } from 'lucide-react'
import type { Service } from '@/types'

const map = { compass: Compass, stamp: Stamp, calendar: CalendarCheck, plane: Plane, bed: BedDouble, file: FileText }
export function ServiceIcon({ name, className }: { name: Service['icon']; className?: string }) {
  const C = map[name]
  return <C className={className} aria-hidden strokeWidth={1.5} />
}
