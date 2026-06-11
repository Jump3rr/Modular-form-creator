import { useEffect, useState } from 'react'
import { resourceApi, type ResourceRecord } from '../api/resources'

export function useResource(resourceId: string) {
  const [resource, setResource] = useState<ResourceRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = async () => {
    if (!resourceId) {
      setError('Resource id is required')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await resourceApi.getResource(resourceId)
      setResource(response)
    } catch (loadError) {
      setResource(null)
      setError(loadError instanceof Error ? loadError.message : 'Failed to load resource')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void reload()
  }, [resourceId])

  return { resource, loading, error, reload }
}
