import { Input, Select } from '../../../design-system'
import { SectionCard, SectionTitle } from '../../../components/ResourceLayout'
import type { ResourcesFilters } from '../hooks/useResourcesPage'

interface ResourceFiltersSectionProps {
  filters: ResourcesFilters
  onNameChange: (name: string) => void
  onStatusChange: (status: '' | 'draft' | 'completed') => void
  onSortOrderChange: (order: 'asc' | 'desc') => void
}

export function ResourceFiltersSection({
  filters,
  onNameChange,
  onStatusChange,
  onSortOrderChange,
}: Readonly<ResourceFiltersSectionProps>) {
  return (
    <SectionCard>
      <SectionTitle>Filters</SectionTitle>
      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        }}
      >
        <Input
          label="Search by name"
          value={filters.name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Search resources"
        />
        <Select
          label="Status"
          value={filters.status}
          onChange={(event) =>
            onStatusChange(event.target.value as '' | 'draft' | 'completed')
          }
          options={[
            { label: 'All', value: '' },
            { label: 'Draft', value: 'draft' },
            { label: 'Completed', value: 'completed' },
          ]}
        />
        <Select
          label="Sort order"
          value={filters.sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value as 'asc' | 'desc')}
          options={[
            { label: 'Newest first', value: 'desc' },
            { label: 'Oldest first', value: 'asc' },
          ]}
        />
      </div>
    </SectionCard>
  )
}
