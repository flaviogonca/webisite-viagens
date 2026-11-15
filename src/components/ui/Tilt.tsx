import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import type { ReactNode } from 'react'

/** Inclinação 3D que segue o cursor. Desativada com prefers-reduced-motion. */
export function Tilt({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0.5), y = useMotionValue(0.5)
  const sx = useSpring(x, { stiffness: 200, damping: 20 }), sy = useSpring(y, { stiffness: 200, damping: 20 })
  const rx = useTransform(sy, [0, 1], [max, -max]), ry = useTransform(sx, [0, 1], [-max, max])
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => { if (e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width); y.set((e.clientY - r.top) / r.height) }}
      onPointerLeave={() => { x.set(0.5); y.set(0.5) }}>
      {children}
    </motion.div>
  )
}
