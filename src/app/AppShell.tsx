import type { ReactNode } from 'react'
import styled from 'styled-components'
import { theme } from '../design-system'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: Readonly<AppShellProps>) {
  return <Shell>{children}</Shell>
}

const Shell = styled.div`
  min-height: 100vh;
  color: ${theme.colors.inkStrong};
  background:
    radial-gradient(circle at top left, rgba(31, 122, 140, 0.18), transparent 0%),
    radial-gradient(circle at top right, rgba(227, 139, 44, 0.16), transparent 30%),
    linear-gradient(180deg, #f9fbfc 0%, #f4f6f7d7 48%, #eef2f49a 100%);
`
