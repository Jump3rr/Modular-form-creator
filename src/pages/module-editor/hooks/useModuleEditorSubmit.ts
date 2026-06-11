import { useState } from 'react'
import {
  resourceApi,
  type BasicInfo,
  type ProjectDetails,
  type ResourceRecord,
} from '../../../api/resources'

interface UseModuleEditorSubmitParams {
  moduleType: 'basic-info' | 'project-details'
  resourceId: string
  resource: ResourceRecord | null
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
  onSaved: (resourceId: number) => void
}

export function useModuleEditorSubmit({
  moduleType,
  resourceId,
  resource,
  basicInfo,
  projectDetails,
  onSaved,
}: Readonly<UseModuleEditorSubmitParams>) {
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const isCompletedResource = resource?.status === 'completed'

  const submit = async () => {
    if (!resource) {
      setSubmitError('Resource not loaded')
      return
    }

    const resolvedBasicInfo = {
      ...basicInfo,
      priority: basicInfo.priority || 'low',
    }
    const resolvedProjectDetails = {
      ...projectDetails,
      category: projectDetails.category || 'internal',
    }

    setSubmitting(true)
    setSubmitError(null)

    try {
      if (moduleType === 'basic-info') {
        if (isCompletedResource) {
          const updated = await resourceApi.replaceResource(resourceId, {
            name: resource.name,
            basicInfo: resolvedBasicInfo,
            projectDetails: resource.projectDetails,
          })
          onSaved(updated.resourceId)
          return
        }

        const updated = await resourceApi.updateBasicInfo(resourceId, resolvedBasicInfo)
        onSaved(updated.resourceId)
        return
      }

      if (isCompletedResource) {
        const updated = await resourceApi.replaceResource(resourceId, {
          name: resource.name,
          basicInfo: resource.basicInfo,
          projectDetails: resolvedProjectDetails,
        })
        onSaved(updated.resourceId)
        return
      }

      const updated = await resourceApi.updateProjectDetails(
        resourceId,
        resolvedProjectDetails,
      )
      onSaved(updated.resourceId)
    } catch (saveError) {
      setSubmitError(saveError instanceof Error ? saveError.message : 'Save failed')
    } finally {
      setSubmitting(false)
    }
  }

  return {
    submitting,
    submitError,
    setSubmitError,
    submit,
  }
}
