import { Button } from '../../../design-system'
import {
  HeaderActions,
  PageHeader,
  PageKicker,
  PageSubtitle,
  PageTitle,
} from '../../../components/ResourceLayout'

interface ModuleEditorHeaderProps {
  moduleType: 'basic-info' | 'project-details'
  resourceName: string
  status: string
  isCompletedResource: boolean
  onOverview: () => void
  onSummary: () => void
}

export function ModuleEditorHeader({
  moduleType,
  resourceName,
  status,
  isCompletedResource,
  onOverview,
  onSummary,
}: Readonly<ModuleEditorHeaderProps>) {
  return (
    <PageHeader>
      <div>
        <PageKicker>
          {moduleType === 'basic-info' ? 'Basic Info module' : 'Project Details module'}
        </PageKicker>
        <PageTitle>{resourceName}</PageTitle>
        <PageSubtitle>
          {status} ·{' '}
          {isCompletedResource
            ? 'buffered edits must be submitted explicitly'
            : 'changes persist on submit'}
        </PageSubtitle>
      </div>
      <HeaderActions>
        <Button type="button" variant="secondary" onClick={onOverview}>
          Overview
        </Button>
        <Button type="button" variant="secondary" onClick={onSummary}>
          Summary
        </Button>
      </HeaderActions>
    </PageHeader>
  )
}
