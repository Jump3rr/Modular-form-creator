import { Button } from '../../../design-system'
import { ActionRow } from '../../../components/ResourceLayout'

interface OverviewActionsProps {
  canProvision: boolean
  onProvision: () => void
  onSummary: () => void
  onRefresh: () => void
}

export function OverviewActions({
  canProvision,
  onProvision,
  onSummary,
  onRefresh,
}: Readonly<OverviewActionsProps>) {
  return (
    <ActionRow>
      <Button
        type="button"
        variant="primary"
        disabled={!canProvision}
        onClick={onProvision}
      >
        Provision resource
      </Button>
      <Button type="button" variant="secondary" onClick={onSummary}>
        Open summary
      </Button>
      <Button type="button" variant="ghost" onClick={onRefresh}>
        Refresh
      </Button>
    </ActionRow>
  )
}
