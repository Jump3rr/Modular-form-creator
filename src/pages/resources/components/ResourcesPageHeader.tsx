import { Badge } from '../../../design-system'
import {
  HeaderActions,
  PageHeader,
  PageKicker,
  PageSubtitle,
  PageTitle,
} from '../../../components/ResourceLayout'

export function ResourcesPageHeader() {
  return (
    <PageHeader>
      <div>
        <PageKicker>Resources</PageKicker>
        <PageTitle>Resource lifecycle dashboard</PageTitle>
        <PageSubtitle>Create, inspect, complete, and review resources.</PageSubtitle>
      </div>
      <HeaderActions>
        <Badge variant="info">Backend: localhost:5001</Badge>
        <Badge variant="neutral">/resources</Badge>
      </HeaderActions>
    </PageHeader>
  )
}
