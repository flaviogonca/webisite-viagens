import { useEffect, useState } from 'react'

export function useAsync<T>(fn: () => Promise<T>, initial: T) {
  const [data, setData] = useState<T>(initial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let alive = true
    fn().then((d) => alive && setData(d)).catch((e: Error) => alive && setError(e.message)).finally(() => alive && setLoading(false))
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { data, loading, error }
}
