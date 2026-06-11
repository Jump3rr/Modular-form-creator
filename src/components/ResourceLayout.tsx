import styled, { css } from 'styled-components'
import { theme } from '../design-system'

export const PageFrame = styled.main`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 64px;
  display: grid;
  gap: 20px;
`

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const HeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
`

export const PageKicker = styled.div`
  color: ${theme.colors.primaryStrong};
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 700;
  font-size: 0.78rem;
`

export const PageTitle = styled.h1`
  margin: 6px 0 0;
  font-family: ${theme.typography.heading};
  font-size: clamp(1.8rem, 2.6vw, 2.8rem);
`

export const PageSubtitle = styled.p`
  margin: 8px 0 0;
  color: ${theme.colors.inkMuted};
`

export const SectionCard = styled.section`
  padding: 22px;
  border-radius: ${theme.radii.lg};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.card};
`

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.05rem;
`

export const Notice = styled.div<{ $variant?: 'error' }>`
  padding: 14px 16px;
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  color: ${theme.colors.ink};

  ${({ $variant }) =>
    $variant === 'error' &&
    css`
      border-color: rgba(180, 71, 27, 0.35);
      background: #fff6f1;
      color: #8b3411;
    `}
`

export const CenteredState = styled.div`
  min-height: 68vh;
  display: grid;
  place-items: center;
  gap: 16px;
  text-align: center;
`

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

export const TwoColumnGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const MetricRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`

export const Metric = styled.div`
  min-width: 120px;
  padding: 14px 16px;
  border-radius: ${theme.radii.md};
  background: ${theme.colors.surfaceAlt};
`

export const MetricValue = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`

export const MetricLabel = styled.div`
  color: ${theme.colors.inkMuted};
  font-size: 0.92rem;
`

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: #e6ebee;
  overflow: hidden;
`

export const ProgressFill = styled.div<{ $value: number }>`
  width: ${({ $value }) => `${Math.max(6, Math.min(100, $value))}%`};
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent});
`

export const SummaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const SummaryList = styled.div`
  display: grid;
  gap: 12px;
`

export const SummaryItem = styled.div`
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border-radius: ${theme.radii.md};
  background: ${theme.colors.surfaceAlt};

  span {
    color: ${theme.colors.inkMuted};
    font-size: 0.9rem;
  }

  strong {
    font-weight: 600;
  }
`

export const Form = styled.form`
  display: grid;
  gap: 18px;
`

export const FormGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  > :first-child {
    grid-column: 1 / -1;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    > :first-child {
      grid-column: auto;
    }
  }
`
