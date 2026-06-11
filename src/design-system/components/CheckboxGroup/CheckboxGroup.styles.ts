import styled from 'styled-components'

/** Wrapper for the checkbox group. */
export const Group = styled.div<{ $hasError?: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ $hasError }) => ($hasError ? '12px 14px' : '0')};
  border-radius: ${({ $hasError, theme }) => ($hasError ? theme.radii.md : '0')};
  border: ${({ $hasError }) => ($hasError ? '1px solid rgba(180, 71, 27, 0.2)' : '0')};
  background: ${({ $hasError }) => ($hasError ? '#fff8f4' : 'transparent')};
`

/** Layout container for checkbox items. */
export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`

/** Group label text. */
export const Label = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkStrong};
`

/** Row layout for label with optional tooltip icon. */
export const LabelRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

/** Inline tooltip trigger icon used in labels. */
export const TooltipIcon = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.75rem;
  font-weight: 700;
  cursor: help;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 50%;
    bottom: calc(100% + 8px);
    transform: translateX(-50%);
    min-width: 180px;
    max-width: 280px;
    padding: 8px 10px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.inkStrong};
    color: ${({ theme }) => theme.colors.surface};
    font-size: 0.78rem;
    line-height: 1.35;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.16s ease;
    z-index: 10;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
  }
`

/** Helper or error text displayed below the group. */
export const Helper = styled.span<{ $hasError?: boolean }>`
  position: relative;
  padding: ${({ $hasError }) => ($hasError ? '10px 12px 10px 34px' : '0')};
  border-radius: ${({ $hasError, theme }) => ($hasError ? theme.radii.sm : '0')};
  border: ${({ $hasError }) => ($hasError ? '1px solid rgba(180, 71, 27, 0.2)' : '0')};
  background: ${({ $hasError }) => ($hasError ? '#fff8f4' : 'transparent')};
  font-size: 0.85rem;
  color: ${({ theme, $hasError }) => ($hasError ? '#8b3411' : theme.colors.inkMuted)};
  line-height: 1.35;

  ${({ $hasError }) =>
    $hasError &&
    `
    &::before {
      content: '!';
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 999px;
      background: rgba(180, 71, 27, 0.12);
      color: #a8471f;
      font-size: 0.68rem;
      font-weight: 800;
      line-height: 1;
    }
  `}
`
