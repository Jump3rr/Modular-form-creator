import { useNavigate } from 'react-router-dom'
import { Notice, PageFrame } from '../components/ResourceLayout'
import { CreateResourceSection } from './resources/components/CreateResourceSection'
import { ResourceFiltersSection } from './resources/components/ResourceFiltersSection'
import { ResourcesListSection } from './resources/components/ResourcesListSection'
import { ResourcesPageHeader } from './resources/components/ResourcesPageHeader'
import { ResourcesPagination } from './resources/components/ResourcesPagination'
import { useResourcesPage } from './resources/hooks/useResourcesPage'

export function ResourcesPage() {
  const navigate = useNavigate()
  const {
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
  } = useResourcesPage()

  const handleCreate = async () => {
    const created = await createResource()
    if (created) {
      navigate(`/resources/${created.resourceId}`)
    }
  }

  const handleDelete = async (resourceId: number) => {
    const confirmed = globalThis.confirm('Delete this resource?')
    if (!confirmed) {
      return
    }

    await deleteResource(resourceId)
  }

  return (
    <PageFrame>
      <ResourcesPageHeader />

      <CreateResourceSection
        resourceName={resourceName}
        resourceNameError={resourceNameError}
        onResourceNameChange={(value) => {
          setResourceNameError(null)
          setResourceName(value)
        }}
        onSubmit={handleCreate}
      />

      <ResourceFiltersSection
        filters={filters}
        onNameChange={(name) => setFilters((current) => ({ ...current, name }))}
        onStatusChange={(status) => setFilters((current) => ({ ...current, status }))}
        onSortOrderChange={(sortOrder) =>
          setFilters((current) => ({ ...current, sortOrder }))
        }
      />

      <ResourcesPagination
        pagination={pagination}
        onPageChange={(page) => void loadResources(page)}
      />

      {error ? <Notice $variant="error">{error}</Notice> : null}
      {loading ? <Notice>Loading resources…</Notice> : null}

      <ResourcesListSection
        items={items}
        loading={loading}
        onOpen={(id) => navigate(`/resources/${id}`)}
        onSummary={(id) => navigate(`/resources/${id}/details`)}
        onDelete={(id) => void handleDelete(id)}
      />
    </PageFrame>
  )
}
