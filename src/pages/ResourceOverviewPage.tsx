import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../design-system'
import {
  getCompletionScore,
  isBasicInfoComplete,
  isProjectDetailsComplete,
  resourceApi,
} from '../api/resources'
import { useResource } from '../hooks/useResource'
import {
  CenteredState,
  Notice,
  PageFrame,
  TwoColumnGrid,
} from '../components/ResourceLayout'
import { OverviewActions } from './resource-overview/components/OverviewActions'
import { OverviewHeader } from './resource-overview/components/OverviewHeader'
import { ProgressSection } from './resource-overview/components/ProgressSection'
import { ModulesSection } from './resource-overview/components/ModulesSection'

export function ResourceOverviewPage() {
  const params = useParams()
  const resourceId = params.resourceId ?? ''
  const navigate = useNavigate()
  const { resource, loading, error, reload } = useResource(resourceId)

  const completeResource = async () => {
    if (!resource) {
      return
    }

    try {
      const updated = await resourceApi.provisionResource(resourceId)
      navigate(`/resources/${updated.resourceId}/details`)
    } catch (provisionError) {
      globalThis.alert(
        provisionError instanceof Error ? provisionError.message : 'Provisioning failed',
      )
    }
  }

  if (loading) {
    return <CenteredState>Loading resource…</CenteredState>
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

  const basicComplete = isBasicInfoComplete(resource.basicInfo)
  const projectComplete = isProjectDetailsComplete(resource.projectDetails)
  const canProvision = resource.status === 'draft' && basicComplete && projectComplete
  let projectStateText = 'In progress'
  if (resource.status === 'draft' && !basicComplete) {
    projectStateText = 'Locked until Basic Info is complete'
  } else if (projectComplete) {
    projectStateText = 'Completed'
  }
  const completion = getCompletionScore(resource)
  const projectLocked = resource.status === 'draft' && !basicComplete

  return (
    <PageFrame>
      <OverviewHeader
        resourceId={resource.resourceId}
        resourceName={resource.name}
        status={resource.status}
        onBack={() => navigate('/resources')}
        onSummary={() => navigate(`/resources/${resourceId}/details`)}
      />

      <TwoColumnGrid>
        <ProgressSection status={resource.status} completion={completion} />

        <ModulesSection
          basicComplete={basicComplete}
          projectStateText={projectStateText}
          projectLocked={projectLocked}
          onBasicInfo={() => navigate(`/resources/${resourceId}/basic-info`)}
          onProjectDetails={() => navigate(`/resources/${resourceId}/project-details`)}
        />
      </TwoColumnGrid>

      <OverviewActions
        canProvision={canProvision}
        onProvision={() => void completeResource()}
        onSummary={() => navigate(`/resources/${resourceId}/details`)}
        onRefresh={() => void reload()}
      />
    </PageFrame>
  )
}
