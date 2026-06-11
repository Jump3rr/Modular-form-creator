import { useEffect, useState } from 'react'
import { resourceApi, type ResourceRecord } from '../../../api/resources'

export interface ResourcesFilters {
  status: '' | 'draft' | 'completed'
  name: string
  sortOrder: 'asc' | 'desc'
}

export interface ResourcesPagination {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

const defaultPagination: ResourcesPagination = {
  page: 1,
  pageSize: 10,
  totalItems: 0,
  totalPages: 1,
}

const defaultFilters: ResourcesFilters = {
  status: '',
  name: '',
  sortOrder: 'desc',
}

export function useResourcesPage() {
  const [items, setItems] = useState<ResourceRecord[]>([])
  const [pagination, setPagination] = useState<ResourcesPagination>(defaultPagination)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resourceNameError, setResourceNameError] = useState<string | null>(null)
  const [resourceName, setResourceName] = useState('')
  const [filters, setFilters] = useState<ResourcesFilters>(defaultFilters)

  const loadResources = async (nextPage = pagination.page) => {
    setLoading(true)
    setError(null)

    try {
      const query = new URLSearchParams()
      query.set('page', String(nextPage))
      query.set('pageSize', String(pagination.pageSize))
      query.set('sortOrder', filters.sortOrder)

      if (filters.status) {
        query.set('status', filters.status)
      }

      if (filters.name.trim()) {
        query.set('name', filters.name.trim())
      }

      const response = await resourceApi.listResources(query)
      setItems(response.items)
      setPagination(response.pagination)
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : 'Failed to load resources',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadResources(1)
  }, [filters.status, filters.name, filters.sortOrder])

  const createResource = async () => {
    if (!resourceName.trim()) {
      setResourceNameError('Resource name is required')
      return null
    }

    try {
      setError(null)
      setResourceNameError(null)
      const created = await resourceApi.createResource(resourceName.trim())
      setResourceName('')
      return created
    } catch (createError) {
      const message =
        createError instanceof Error ? createError.message : 'Failed to create resource'

      if (message.toLowerCase() === 'resourcename must be unique') {
        setResourceNameError('Resource name is already taken')
      } else {
        setError(message)
      }
      return null
    }
  }

  const deleteResource = async (resourceId: number) => {
    try {
      await resourceApi.deleteResource(String(resourceId))
      await loadResources(pagination.page)
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : 'Failed to delete resource',
      )
    }
  }

  return {
    items,
    pagination,
    loading,
    error,
    resourceNameError,
    resourceName,
    setResourceName,
    setResourceNameError,
    filters,
    setFilters,
    loadResources,
    createResource,
    deleteResource,
  }
}
