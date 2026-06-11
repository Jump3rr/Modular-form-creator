import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../design-system'
import { getCompletionScore } from '../api/resources'
import { useResource } from '../hooks/useResource'
import {
  CenteredState,
  HeaderActions,
  Notice,
  PageFrame,
  PageHeader,
  PageKicker,
  PageSubtitle,
  PageTitle,
  SectionCard,
  SectionTitle,
  SummaryGrid,
  SummaryItem,
  SummaryList,
} from '../components/ResourceLayout'

export function ResourceDetailsPage() {
  const params = useParams()
  const resourceId = params.resourceId ?? ''
  const navigate = useNavigate()
  const { resource, loading, error } = useResource(resourceId)

  if (loading) {
    return <CenteredState>Loading summary…</CenteredState>
  }

  if (error || !resource) {
    return (
      <CenteredState>
        <Notice $variant="error">{error ?? 'Resource not found'}</Notice>
        <Button type="button" variant="secondary" onClick={() => navigate('/resources')}>
          Back to resources
        </Button>
      </CenteredState>
    )
  }

  return (
    <PageFrame>
      <PageHeader>
        <div>
          <PageKicker>Summary view</PageKicker>
          <PageTitle>{resource.name}</PageTitle>
          <PageSubtitle>
            {resource.status} · {getCompletionScore(resource)}% complete
          </PageSubtitle>
        </div>
        <HeaderActions>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(`/resources/${resourceId}`)}
          >
            Overview
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/resources')}
          >
            List
          </Button>
        </HeaderActions>
      </PageHeader>

      <SummaryGrid>
        <SectionCard>
          <SectionTitle>Basic Info</SectionTitle>
          <SummaryList>
            <SummaryItem>
              <span>Name</span>
              <strong>{resource.basicInfo.resourceName || '—'}</strong>
            </SummaryItem>
            <SummaryItem>
              <span>Owner</span>
              <strong>{resource.basicInfo.owner || '—'}</strong>
            </SummaryItem>
            <SummaryItem>
              <span>Email</span>
              <strong>{resource.basicInfo.email || '—'}</strong>
            </SummaryItem>
            <SummaryItem>
              <span>Description</span>
              <strong>{resource.basicInfo.description || '—'}</strong>
            </SummaryItem>
            <SummaryItem>
              <span>Priority</span>
              <strong>{resource.basicInfo.priority || '—'}</strong>
            </SummaryItem>
          </SummaryList>
        </SectionCard>

        <SectionCard>
          <SectionTitle>Project Details</SectionTitle>
          <SummaryList>
            <SummaryItem>
              <span>Project name</span>
              <strong>{resource.projectDetails.projectName || '—'}</strong>
            </SummaryItem>
            <SummaryItem>
              <span>Budget</span>
              <strong>{resource.projectDetails.budget || '—'}</strong>
            </SummaryItem>
            <SummaryItem>
              <span>Category</span>
              <strong>{resource.projectDetails.category || '—'}</strong>
            </SummaryItem>
            <SummaryItem>
              <span>Options</span>
              <strong>
                {resource.projectDetails.options.length
                  ? resource.projectDetails.options.join(', ')
                  : '—'}
              </strong>
            </SummaryItem>
          </SummaryList>
        </SectionCard>
      </SummaryGrid>
    </PageFrame>
  )
}
