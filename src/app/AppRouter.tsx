import { Navigate, Route, Routes } from 'react-router-dom'
import { ResourceDetailsPage } from '../pages/ResourceDetailsPage'
import { ResourceOverviewPage } from '../pages/ResourceOverviewPage'
import { ResourcesPage } from '../pages/ResourcesPage'
import { BasicInfoPage, ProjectDetailsPage } from '../pages/ModuleEditorPage'
import { AppShell } from './AppShell'

export function AppRouter() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/resources" replace />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:resourceId" element={<ResourceOverviewPage />} />
        <Route path="/resources/:resourceId/details" element={<ResourceDetailsPage />} />
        <Route path="/resources/:resourceId/basic-info" element={<BasicInfoPage />} />
        <Route
          path="/resources/:resourceId/project-details"
          element={<ProjectDetailsPage />}
        />
        <Route path="*" element={<Navigate to="/resources" replace />} />
      </Routes>
    </AppShell>
  )
}
