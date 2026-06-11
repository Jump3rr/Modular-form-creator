import { Button, Card } from '../../../design-system'
import { SectionCard, SectionTitle } from '../../../components/ResourceLayout'

interface ModulesSectionProps {
  basicComplete: boolean
  projectStateText: string
  projectLocked: boolean
  onBasicInfo: () => void
  onProjectDetails: () => void
}

export function ModulesSection({
  basicComplete,
  projectStateText,
  projectLocked,
  onBasicInfo,
  onProjectDetails,
}: Readonly<ModulesSectionProps>) {
  return (
    <SectionCard>
      <SectionTitle>Modules</SectionTitle>
      <div style={{ display: 'grid', gap: 14 }}>
        <Card variant="outline" style={{ padding: 16, background: '#f5f4f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <strong>Basic Info</strong>
              <div style={{ color: '#5e6c76' }}>
                {basicComplete ? 'Completed' : 'In progress'}
              </div>
            </div>
            <Button type="button" variant="primary" onClick={onBasicInfo}>
              Edit module
            </Button>
          </div>
        </Card>

        <Card variant="outline" style={{ padding: 16, background: '#f5f4f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <strong>Project Details</strong>
              <div style={{ color: '#5e6c76' }}>{projectStateText}</div>
            </div>
            <Button
              type="button"
              variant={projectLocked ? 'secondary' : 'primary'}
              state={projectLocked ? 'locked' : undefined}
              onClick={onProjectDetails}
            >
              Edit module
            </Button>
          </div>
        </Card>
      </div>
    </SectionCard>
  )
}
