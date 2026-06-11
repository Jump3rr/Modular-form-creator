import { Button } from '../../../design-system'
import {
  HeaderActions,
  PageHeader,
  PageKicker,
  PageSubtitle,
  PageTitle,
} from '../../../components/ResourceLayout'

interface OverviewHeaderProps {
  resourceId: number
  resourceName: string
  status: string
  onBack: () => void
  onSummary: () => void
}

export function OverviewHeader({
  resourceId,
  resourceName,
  status,
  onBack,
  onSummary,
}: Readonly<OverviewHeaderProps>) {
  return (
    <PageHeader>
      <div>
        <PageKicker>Resource overview</PageKicker>
        <PageTitle>{resourceName}</PageTitle>
        <PageSubtitle>
          Resource #{resourceId} · {status}
        </PageSubtitle>
      </div>
      <HeaderActions>
        <Button type="button" variant="secondary" onClick={onBack}>
          Back to list
        </Button>
        <Button type="button" variant="secondary" onClick={onSummary}>
          Summary
        </Button>
      </HeaderActions>
    </PageHeader>
  )
}
