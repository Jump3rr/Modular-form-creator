import { Badge, Button, Card } from '../../../design-system'
import {
  getCompletionScore,
  isBasicInfoComplete,
  isProjectDetailsComplete,
  type ResourceRecord,
} from '../../../api/resources'
import {
  ActionRow,
  Notice,
  ProgressBar,
  ProgressFill,
} from '../../../components/ResourceLayout'

interface ResourcesListSectionProps {
  items: ResourceRecord[]
  loading: boolean
  onOpen: (resourceId: number) => void
  onSummary: (resourceId: number) => void
  onDelete: (resourceId: number) => void
}

export function ResourcesListSection({
  items,
  loading,
  onOpen,
  onSummary,
  onDelete,
}: Readonly<ResourcesListSectionProps>) {
  const priorityVariant = (priority: string) => {
    if (priority === 'high') {
      return 'warning'
    }
    if (priority === 'medium') {
      return 'info'
    }
    return 'neutral'
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {items.map((resource) => {
        const score = getCompletionScore(resource)
        const basicComplete = isBasicInfoComplete(resource.basicInfo)
        const projectComplete = isProjectDetailsComplete(resource.projectDetails)

        return (
          <Card
            key={resource.resourceId}
            variant="elevated"
            style={{ padding: 22, display: 'grid', gap: 16 }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 20,
                alignItems: 'flex-start',
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>
                  #{resource.resourceId} {resource.name}
                </h3>
                {resource.basicInfo.priority && (
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}
                  >
                    <Badge variant={priorityVariant(resource.basicInfo.priority)}>
                      Priority: {resource.basicInfo.priority || '-'}
                    </Badge>
                  </div>
                )}
                <div style={{ color: '#5e6c76', marginTop: 8 }}>
                  Basic Info {basicComplete ? 'done' : 'open'} · Project Details{' '}
                  {projectComplete ? 'done' : 'open'}
                </div>
              </div>
              <div style={{ display: 'grid', justifyItems: 'end', gap: 8 }}>
                <Badge variant={resource.status === 'completed' ? 'success' : 'warning'}>
                  {resource.status}
                </Badge>
                <span style={{ color: '#5e6c76' }}>{score}% complete</span>
              </div>
            </div>

            <ProgressBar>
              <ProgressFill $value={score} />
            </ProgressBar>

            <ActionRow>
              <Button
                type="button"
                variant="primary"
                onClick={() => onOpen(resource.resourceId)}
              >
                Open
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onSummary(resource.resourceId)}
              >
                Summary
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onDelete(resource.resourceId)}
              >
                Delete
              </Button>
            </ActionRow>
          </Card>
        )
      })}

      {!loading && items.length === 0 ? <Notice>No resources yet.</Notice> : null}
    </div>
  )
}
