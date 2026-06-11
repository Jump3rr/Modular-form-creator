import { Badge, Button } from '../../../design-system'
import { ActionRow } from '../../../components/ResourceLayout'
import type { ResourcesPagination as Pagination } from '../hooks/useResourcesPage'

interface ResourcesPaginationProps {
  pagination: Pagination
  onPageChange: (page: number) => void
}

type PagerItem =
  | { key: string; type: 'page'; page: number }
  | { key: string; type: 'ellipsis' }

function buildPageItems(currentPage: number, totalPages: number): PagerItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => ({
      key: `page-${index + 1}`,
      type: 'page' as const,
      page: index + 1,
    }))
  }

  const pages = new Set<number>([1, totalPages, currentPage])

  for (let offset = 1; offset <= 2; offset += 1) {
    if (currentPage - offset > 1) {
      pages.add(currentPage - offset)
    }
    if (currentPage + offset < totalPages) {
      pages.add(currentPage + offset)
    }
  }

  const sortedPages = [...pages].sort((left, right) => left - right)
  const items: PagerItem[] = []

  for (let index = 0; index < sortedPages.length; index += 1) {
    const page = sortedPages[index]
    const previous = sortedPages[index - 1]

    if (index > 0 && previous !== undefined && page - previous > 1) {
      items.push({
        key: `ellipsis-${previous}-${page}`,
        type: 'ellipsis',
      })
    }

    items.push({
      key: `page-${page}`,
      type: 'page',
      page,
    })
  }

  return items
}

export function ResourcesPagination({
  pagination,
  onPageChange,
}: Readonly<ResourcesPaginationProps>) {
  const pageItems = buildPageItems(pagination.page, pagination.totalPages)

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Badge variant="neutral">
        {pagination.totalItems} resources · Page {pagination.page} of{' '}
        {pagination.totalPages}
      </Badge>
      <ActionRow>
        <Button
          type="button"
          variant="secondary"
          size="small"
          disabled={pagination.page <= 1}
          onClick={() => onPageChange(1)}
        >
          First
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="small"
          disabled={pagination.page <= 1}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          Previous
        </Button>
        {pageItems.map((item) =>
          item.type === 'ellipsis' ? (
            <Badge key={item.key} variant="neutral">
              …
            </Badge>
          ) : (
            <Button
              key={item.key}
              type="button"
              variant={item.page === pagination.page ? 'primary' : 'secondary'}
              size="small"
              onClick={() => onPageChange(item.page)}
            >
              {item.page}
            </Button>
          ),
        )}
        <Button
          type="button"
          variant="secondary"
          size="small"
          disabled={pagination.page >= pagination.totalPages}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="small"
          disabled={pagination.page >= pagination.totalPages}
          onClick={() => onPageChange(pagination.totalPages)}
        >
          Last
        </Button>
      </ActionRow>
    </div>
  )
}
