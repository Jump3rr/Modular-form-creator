import { Badge, Button } from '../../../design-system'
import { ActionRow } from '../../../components/ResourceLayout'
import type { ResourcesPagination as Pagination } from '../hooks/useResourcesPage'

interface ResourcesPaginationProps {
  pagination: Pagination
  onPrevious: () => void
  onNext: () => void
}

export function ResourcesPagination({
  pagination,
  onPrevious,
  onNext,
}: Readonly<ResourcesPaginationProps>) {
  return (
    <ActionRow>
      <Badge variant="neutral">{pagination.totalItems} resources</Badge>
      <Button
        type="button"
        variant="secondary"
        disabled={pagination.page <= 1}
        onClick={onPrevious}
      >
        Previous
      </Button>
      <Button
        type="button"
        variant="secondary"
        disabled={pagination.page >= pagination.totalPages}
        onClick={onNext}
      >
        Next
      </Button>
    </ActionRow>
  )
}
