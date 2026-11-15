import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import * as THREE from 'three'
import { Check, Heart, X } from 'lucide-react'
import { boardItems, type BoardItem } from '@/data/visionBoard'
import { cn } from '@/utils/cn'

const STORAGE_KEY = 'kosmopolita-vision-board'
const RADIUS = 10
const FRONT = new THREE.Vector3(0, 0.45, -4.6)

interface CardState { mesh: THREE.Mesh; frame: THREE.Mesh; item: BoardItem; mat: THREE.MeshBasicMaterial; fmat: THREE.MeshBasicMaterial; i: number }
interface Api { select: (id: string | null) => void }

function loadSaved(): string[] {
  try { const v = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'); return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [] } catch { return [] }
}

export function VisionBoard() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasHost = useRef<HTMLDivElement>(null)
  const api = useRef<Api>({ select: () => {} })
  const selectedRef = useRef<string | null>(null)
  const savedRef = useRef<string[]>([])
  const reduce = useReducedMotion()
  const reduceRef = useRef(!!reduce)
  reduceRef.current = !!reduce
  const [selected, setSelected] = useState<string | null>(null)
  const [saved, setSaved] = useState<string[]>(loadSaved)
  const [ready, setReady] = useState(false)
  const [fallback, setFallback] = useState(false)

  savedRef.current = saved
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)) } catch { /* sem armazenamento */ } }, [saved])

  const choose = useCallback((id: string | null) => { selectedRef.current = id; setSelected(id); api.current.select(id) }, [])
  const toggleSave = (id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  useEffect(() => {
    const host = canvasHost.current
    if (!host) return
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch { setFallback(true); return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    host.appendChild(renderer.domElement)
    const canvas = renderer.domElement
    canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab'
    canvas.setAttribute('aria-hidden', 'true')

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60)
    const loader = new THREE.TextureLoader()
    const textures: THREE.Texture[] = []
    const geo = new THREE.PlaneGeometry(1, 1)
    let loaded = 0

    const cards: CardState[] = boardItems.map((item, i) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0x123d49, transparent: true })
      const mesh = new THREE.Mesh(geo, mat)
      const fmat = new THREE.MeshBasicMaterial({ color: 0xe9b44c, transparent: true })
      const frame = new THREE.Mesh(geo, fmat)
      frame.visible = false
      mesh.userData.index = i
      scene.add(frame, mesh)
      loader.load(item.image, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
        textures.push(tex); mat.map = tex; mat.color.set(0xffffff); mat.needsUpdate = true
        if (++loaded === boardItems.length) setReady(true)
      }, undefined, () => { if (++loaded === boardItems.length) setReady(true) })
      return { mesh, frame, item, mat, fmat, i }
    })

    // estado dinâmico
    const cur = cards.map(() => ({ pos: new THREE.Vector3(), scale: 1, ry: 0, opacity: 1, hover: 0, sel: 0 }))
    let wallRot = 0, wallTarget = 0, maxRot = 0.2
    const pointer = { x: 0, y: 0, down: false, startX: 0, lastX: 0, moved: 0, inside: false, ndcX: 2, ndcY: 2 }
    let hovered = -1, w = 1, h = 1, running = false, raf = 0
    const ray = new THREE.Raycaster()
    const timer = new THREE.Timer()
    const tmp = new THREE.Vector3()

    const resize = () => {
      w = host.clientWidth; h = host.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.fov = camera.aspect < 1 ? 62 : 40
      maxRot = camera.aspect < 1 ? 0.75 : 0.2
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize); ro.observe(host); resize()

    const onDown = (e: PointerEvent) => { pointer.down = true; pointer.startX = pointer.lastX = e.clientX; pointer.moved = 0; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing' }
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - r.left) / r.width - 0.5; pointer.y = (e.clientY - r.top) / r.height - 0.5
      pointer.ndcX = pointer.x * 2; pointer.ndcY = -pointer.y * 2; pointer.inside = true
      if (pointer.down) {
        const dx = e.clientX - pointer.lastX; pointer.lastX = e.clientX; pointer.moved += Math.abs(dx)
        if (!selectedRef.current) wallTarget = Math.max(-maxRot, Math.min(maxRot, wallTarget + dx * 0.0032))
      }
    }
    const pick = () => { ray.setFromCamera(new THREE.Vector2(pointer.ndcX, pointer.ndcY), camera); const hit = ray.intersectObjects(cards.map((c) => c.mesh), false)[0]; return hit ? (hit.object.userData.index as number) : -1 }
    const onUp = (e: PointerEvent) => {
      pointer.down = false; canvas.style.cursor = hovered >= 0 ? 'pointer' : 'grab'
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId)
      if (pointer.moved < 6) {
        const r = canvas.getBoundingClientRect()
        pointer.ndcX = ((e.clientX - r.left) / r.width) * 2 - 1; pointer.ndcY = -(((e.clientY - r.top) / r.height) * 2 - 1)
        const idx = pick(); const id = idx >= 0 ? cards[idx].item.id : null
        selectedRef.current = selectedRef.current === id ? null : id
        setSelected(selectedRef.current)
      }
    }
    const onLeave = () => { pointer.inside = false; hovered = -1; pointer.x = 0; pointer.y = 0 }
    canvas.addEventListener('pointerdown', onDown); canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp); canvas.addEventListener('pointercancel', () => { pointer.down = false })
    canvas.addEventListener('pointerleave', onLeave)
    api.current.select = (id) => { selectedRef.current = id }

    const damp = (a: number, b: number, k: number, dt: number) => (reduceRef.current ? b : a + (b - a) * (1 - Math.exp(-k * dt)))

    const frame = () => {
      if (!running) return
      timer.update()
      const dt = Math.min(timer.getDelta(), 0.05), t = timer.getElapsed()
      const sel = selectedRef.current
      if (!reduceRef.current && !pointer.down && !sel) wallTarget += Math.sin(t * 0.2) * 0.0004
      wallRot = damp(wallRot, sel ? 0 : wallTarget, 5, dt)

      if (pointer.inside && !pointer.down) { const idx = pick(); if (idx !== hovered) { hovered = idx; canvas.style.cursor = idx >= 0 ? 'pointer' : 'grab' } }
      camera.position.x = damp(camera.position.x, pointer.x * 0.5, 3, dt)
      camera.position.y = damp(camera.position.y, -pointer.y * 0.3, 3, dt)
      camera.lookAt(pointer.x * 1.2, -pointer.y * 0.6, -RADIUS)

      cards.forEach((c, i) => {
        const s = cur[i], { angle, y, h: ch } = c.item.slot
        const isSel = sel === c.item.id
        const th = (angle * Math.PI) / 180 + wallRot
        const bob = reduceRef.current ? 0 : Math.sin(t * 0.7 + i * 1.7) * 0.07
        const bx = Math.sin(th) * RADIUS, bz = -Math.cos(th) * RADIUS
        tmp.set(isSel ? FRONT.x : bx, (isSel ? FRONT.y : y) + bob, isSel ? FRONT.z : bz)
        if (s.scale === 1 && s.pos.lengthSq() === 0) s.pos.copy(tmp)
        s.pos.x = damp(s.pos.x, tmp.x, 6, dt); s.pos.y = damp(s.pos.y, tmp.y, 6, dt); s.pos.z = damp(s.pos.z, tmp.z, 6, dt)
        s.hover = damp(s.hover, hovered === i && !sel ? 1 : 0, 10, dt)
        s.sel = damp(s.sel, isSel ? 1 : 0, 6, dt)
        const visH = 2 * Math.abs(FRONT.z) * Math.tan((camera.fov * Math.PI) / 360), visW = visH * camera.aspect
        const fit = Math.min((visH * 0.66) / ch, (visW * 0.88) / (ch * c.item.ratio))
        const baseScale = 1 + s.hover * 0.1 + s.sel * (fit - 1)
        s.scale = damp(s.scale, baseScale, 8, dt)
        s.ry = damp(s.ry, isSel ? 0 : -th + Math.sin(t * 0.4 + i) * (reduceRef.current ? 0 : 0.03), 6, dt)
        s.opacity = damp(s.opacity, sel && !isSel ? 0.18 : 1, 6, dt)
        const H = ch * s.scale, W = H * c.item.ratio
        c.mesh.position.copy(s.pos); c.mesh.rotation.y = s.ry; c.mesh.scale.set(W, H, 1); c.mat.opacity = s.opacity; c.fmat.opacity = s.opacity
        c.mesh.renderOrder = isSel ? 10 : s.hover > 0.3 ? 5 : i
        const saved = savedRef.current.includes(c.item.id)
        c.frame.visible = saved
        if (saved) { c.frame.position.copy(s.pos); c.frame.rotation.y = s.ry; c.frame.scale.set(W + 0.12, H + 0.12, 1); c.frame.renderOrder = c.mesh.renderOrder - 0.5; c.frame.position.z += 0.0; c.frame.translateZ(-0.01) }
      })
      renderer.render(scene, camera)
      raf = requestAnimationFrame(frame)
    }
    const start = () => { if (running) return; running = true; timer.reset(); raf = requestAnimationFrame(frame) }
    const stop = () => { running = false; cancelAnimationFrame(raf) }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.05 }); io.observe(host)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { selectedRef.current = null; setSelected(null) } }
    window.addEventListener('keydown', onKey)

    return () => {
      stop(); io.disconnect(); ro.disconnect(); window.removeEventListener('keydown', onKey)
      canvas.removeEventListener('pointerdown', onDown); canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp); canvas.removeEventListener('pointerleave', onLeave)
      geo.dispose(); cards.forEach((c) => { c.mat.dispose(); c.fmat.dispose() }); textures.forEach((t) => t.dispose())
      renderer.dispose(); renderer.forceContextLoss(); canvas.remove()
    }
  }, [])

  const item = useMemo(() => boardItems.find((b) => b.id === selected) ?? null, [selected])
  const savedItems = boardItems.filter((b) => saved.includes(b.id))
  const countries = [...new Set(savedItems.map((b) => b.country).filter(Boolean))].join(', ')
  const proposalUrl = `/solicitar-servico${countries ? `?destino=${encodeURIComponent(countries)}` : ''}`

  return (
    <section ref={wrapRef} className="section-y overflow-hidden bg-ink text-fog" aria-labelledby="board-titulo">
      <div className="container-x">
        <h2 id="board-titulo" className="h-section max-w-[16ch]">O seu vision board de viagem.</h2>
        <p className="lead mt-4 text-mist">Arraste para explorar, toque numa fotografia para a ver de perto e guarde as que quer viver.</p>
      </div>

      <div className="relative mt-8">
        <div ref={canvasHost} className="h-[68vh] min-h-[420px] w-full" role="group" aria-label="Painel interativo de fotografias de viagem" />
        {!ready && !fallback && <p className="absolute inset-0 grid place-items-center text-mist" role="status">A carregar o painel…</p>}
        {fallback && (
          <ul className="container-x grid grid-cols-2 gap-3 md:grid-cols-4">
            {boardItems.map((b) => <li key={b.id}><button onClick={() => choose(b.id)} className="block w-full overflow-hidden rounded-sm"><img src={b.image} alt={`${b.title}, ${b.place}`} loading="lazy" className="aspect-[3/4] w-full object-cover" /></button></li>)}
          </ul>
        )}

        {item && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 pb-4 md:px-8" role="dialog" aria-label={`${item.title}, ${item.place}`}>
            <div className="pointer-events-auto mx-auto flex max-w-xl flex-col gap-3 rounded-sm bg-marine/95 p-5 shadow-xl backdrop-blur md:ml-[max(1rem,calc((100vw-76rem)/2+2rem))] md:mr-auto">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-sm text-saffron">{item.place}</p><h3 className="font-display text-2xl font-bold">{item.title}</h3></div>
                <button onClick={() => choose(null)} aria-label="Fechar" className="grid h-10 w-10 shrink-0 place-items-center rounded-sm hover:bg-white/10"><X size={20} /></button>
              </div>
              <p className="text-sm text-fog/85">{item.note}</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => toggleSave(item.id)} aria-pressed={saved.includes(item.id)} className={cn('inline-flex min-h-11 items-center gap-2 rounded-sm px-4 text-sm font-semibold transition-colors', saved.includes(item.id) ? 'bg-saffron text-marine' : 'border border-white/30 hover:border-saffron')}>
                  {saved.includes(item.id) ? <Check size={16} aria-hidden /> : <Heart size={16} aria-hidden />}{saved.includes(item.id) ? 'Guardado no board' : 'Guardar no board'}
                </button>
                {item.slug && <Link to={`/destinos/${item.slug}`} className="inline-flex min-h-11 items-center rounded-sm border border-white/30 px-4 text-sm font-semibold hover:border-saffron">Ver destino</Link>}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container-x mt-6">
        <ul className="flex flex-wrap gap-2" aria-label="Escolher fotografia">
          {boardItems.map((b) => (
            <li key={b.id}><button onClick={() => choose(selected === b.id ? null : b.id)} aria-pressed={selected === b.id} className={cn('min-h-10 rounded-sm border px-3 text-sm transition-colors', selected === b.id ? 'border-saffron bg-saffron font-semibold text-marine' : 'border-white/20 hover:border-saffron', saved.includes(b.id) && selected !== b.id && 'border-saffron/70')}>{saved.includes(b.id) && '♥ '}{b.title}</button></li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5" aria-live="polite">
          <p className="text-sm text-mist">{savedItems.length === 0 ? 'Ainda não guardou nenhuma fotografia.' : `${savedItems.length} ${savedItems.length === 1 ? 'fotografia guardada' : 'fotografias guardadas'}.`}</p>
          {savedItems.length > 0 && <>
            <Link to={proposalUrl} className="inline-flex min-h-11 items-center rounded-sm bg-saffron px-5 text-sm font-semibold text-marine hover:bg-white">Pedir proposta para estes destinos</Link>
            <button onClick={() => setSaved([])} className="min-h-11 text-sm underline underline-offset-4 hover:text-saffron">Limpar board</button>
          </>}
        </div>
      </div>
    </section>
  )
}
