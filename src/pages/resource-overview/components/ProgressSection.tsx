import {
  Metric,
  MetricLabel,
  MetricRow,
  MetricValue,
  ProgressBar,
  ProgressFill,
  SectionCard,
  SectionTitle,
} from '../../../components/ResourceLayout'

interface ProgressSectionProps {
  status: string
  completion: number
}

export function ProgressSection({ status, completion }: Readonly<ProgressSectionProps>) {
  return (
    <SectionCard>
      <SectionTitle>Progress</SectionTitle>
      <MetricRow>
        <Metric>
          <MetricValue>{status}</MetricValue>
          <MetricLabel>Status</MetricLabel>
        </Metric>
        <Metric>
          <MetricValue>{completion}%</MetricValue>
          <MetricLabel>Complete</MetricLabel>
        </Metric>
      </MetricRow>
      <ProgressBar>
        <ProgressFill $value={completion} />
      </ProgressBar>
    </SectionCard>
  )
}
