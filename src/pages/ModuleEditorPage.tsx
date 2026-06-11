import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input } from '../design-system'
import {
  emptyBasicInfo,
  emptyProjectDetails,
  isBasicInfoComplete,
  type BasicInfo,
  type ProjectDetails,
} from '../api/resources'
import { useResource } from '../hooks/useResource'
import {
  ActionRow,
  CenteredState,
  Form,
  FormGrid,
  Notice,
  PageFrame,
  SectionCard,
} from '../components/ResourceLayout'
import { BasicInfoFields } from './module-editor/components/BasicInfoFields'
import { ModuleEditorHeader } from './module-editor/components/ModuleEditorHeader'
import { ProjectDetailsFields } from './module-editor/components/ProjectDetailsFields'
import { useModuleEditorSubmit } from './module-editor/hooks/useModuleEditorSubmit'

type ValidationFieldKey =
  | 'resourceName'
  | 'owner'
  | 'email'
  | 'description'
  | 'priority'
  | 'projectName'
  | 'budget'
  | 'category'
  | 'options'

type ValidationErrorState = {
  summary: string | null
  fieldErrors: Partial<Record<ValidationFieldKey, string>>
}

const FIELD_LABELS: Record<ValidationFieldKey, string> = {
  resourceName: 'Resource name',
  owner: 'Owner',
  email: 'Email',
  description: 'Description',
  priority: 'Priority',
  projectName: 'Project name',
  budget: 'Budget',
  category: 'Category',
  options: 'Team members',
}

function humanizeField(fieldName: string) {
  const label = FIELD_LABELS[fieldName as ValidationFieldKey]
  if (label) {
    return label
  }

  return fieldName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (firstCharacter) => firstCharacter.toUpperCase())
}

function formatFieldError(fieldName: string, suffix: string) {
  if (fieldName === 'options' && suffix === 'is required') {
    return 'Select at least one team member.'
  }

  return `${humanizeField(fieldName)} ${suffix}`
}

function validateBasicInfoForm(basicInfo: BasicInfo) {
  const errors: string[] = []

  if (!basicInfo.owner.trim()) {
    errors.push('owner is required')
  }
  if (!basicInfo.email.trim()) {
    errors.push('email is required')
  }
  if (!basicInfo.description.trim()) {
    errors.push('description is required')
  }
  if (!basicInfo.priority.trim()) {
    errors.push('priority is required')
  }

  return errors.join('; ')
}

function validateProjectDetailsForm(projectDetails: ProjectDetails) {
  const errors: string[] = []

  if (!projectDetails.projectName.trim()) {
    errors.push('projectName is required')
  }
  if (!projectDetails.budget.trim()) {
    errors.push('budget is required')
  }
  if (!projectDetails.category.trim()) {
    errors.push('category is required')
  }
  if (projectDetails.options.length === 0) {
    errors.push('At least one team member is required')
  }

  return errors.join('; ')
}

function parseValidationError(message: string | null): ValidationErrorState {
  if (!message) {
    return { summary: null, fieldErrors: {} }
  }

  if (message.toLowerCase() === 'at least one team member is required') {
    return {
      summary: 'Please select at least one team member.',
      fieldErrors: { options: 'Select at least one team member.' },
    }
  }

  const fieldErrors: Partial<Record<ValidationFieldKey, string>> = {}

  const parseSingleError = (errorMessage: string) => {
    const trimmedMessage = errorMessage.trim()

    const knownFields: ValidationFieldKey[] = [
      'resourceName',
      'owner',
      'email',
      'description',
      'priority',
      'projectName',
      'budget',
      'category',
      'options',
    ]

    for (const fieldName of knownFields) {
      const prefix = `${fieldName} `
      if (trimmedMessage.startsWith(prefix)) {
        const suffix = trimmedMessage.slice(prefix.length)
        fieldErrors[fieldName] = formatFieldError(fieldName, suffix)
        return
      }
    }

    if (trimmedMessage.toLowerCase() === 'at least one team member is required') {
      fieldErrors.options = 'Select at least one team member.'
    }
  }

  const requiredListSuffix = ' are all required'
  if (message.toLowerCase().endsWith(requiredListSuffix)) {
    const fields = message
      .slice(0, -requiredListSuffix.length)
      .replace(/\s+and\s+/gi, ', ')
      .split(',')
      .map((field) => field.trim())
      .filter(Boolean)

    for (const field of fields) {
      fieldErrors[field as ValidationFieldKey] = formatFieldError(field, 'is required')
    }

    return {
      summary: 'Please fix the highlighted fields below.',
      fieldErrors,
    }
  }

  for (const part of message.split(';')) {
    parseSingleError(part)
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      summary: 'Please fix the highlighted fields below.',
      fieldErrors,
    }
  }

  return {
    summary: message,
    fieldErrors,
  }
}

export function BasicInfoPage() {
  return <ModuleEditor moduleType="basic-info" />
}

export function ProjectDetailsPage() {
  return <ModuleEditor moduleType="project-details" />
}

function ModuleEditor({
  moduleType,
}: Readonly<{ moduleType: 'basic-info' | 'project-details' }>) {
  const params = useParams()
  const navigate = useNavigate()
  const resourceId = params.resourceId ?? ''
  const { resource, loading, error, reload } = useResource(resourceId)
  const [basicInfo, setBasicInfo] = useState<BasicInfo>(emptyBasicInfo())
  const [projectDetails, setProjectDetails] =
    useState<ProjectDetails>(emptyProjectDetails())

  useEffect(() => {
    if (resource) {
      setBasicInfo({
        ...resource.basicInfo,
        priority: resource.basicInfo.priority || 'low',
      })
      setProjectDetails({
        ...resource.projectDetails,
        category: resource.projectDetails.category || 'internal',
      })
    }
  }, [resource])

  const { submitting, submitError, submit, setSubmitError } = useModuleEditorSubmit({
    moduleType,
    resourceId,
    resource,
    basicInfo,
    projectDetails,
    onSaved: (nextResourceId) => navigate(`/resources/${nextResourceId}`),
  })
  const validationError = parseValidationError(submitError)
  const handleBasicInfoChange = (next: BasicInfo) => {
    setSubmitError(null)
    setBasicInfo(next)
  }

  const handleProjectDetailsChange = (next: ProjectDetails) => {
    setSubmitError(null)
    setProjectDetails(next)
  }

  if (loading) {
    return <CenteredState>Loading form…</CenteredState>
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

  const isCompletedResource = resource.status === 'completed'
  const canEditProjectDetails =
    resource.status === 'completed' || isBasicInfoComplete(resource.basicInfo)
  const projectLocked =
    moduleType === 'project-details' &&
    resource.status === 'draft' &&
    !isBasicInfoComplete(resource.basicInfo)
  let submitLabel = 'Save module'
  if (isCompletedResource) {
    submitLabel = 'Save changes'
  }
  if (submitting) {
    submitLabel = 'Saving…'
  }

  return (
    <PageFrame>
      <ModuleEditorHeader
        moduleType={moduleType}
        resourceName={resource.name}
        status={resource.status}
        isCompletedResource={isCompletedResource}
        onOverview={() => navigate(`/resources/${resourceId}`)}
        onSummary={() => navigate(`/resources/${resourceId}/details`)}
      />

      {submitError ? (
        <Notice $variant="error">{validationError.summary ?? submitError}</Notice>
      ) : null}

      <SectionCard>
        <Form
          onSubmit={(event) => {
            event.preventDefault()
            const validationMessage =
              moduleType === 'basic-info'
                ? validateBasicInfoForm(basicInfo)
                : validateProjectDetailsForm(projectDetails)

            if (validationMessage) {
              setSubmitError(validationMessage)
              return
            }

            void submit()
          }}
        >
          <FormGrid>
            <Input
              label="Resource name"
              value={basicInfo.resourceName}
              readOnly
              state="locked"
              helperText="Locked after creation."
              error={validationError.fieldErrors.resourceName}
            />

            {moduleType === 'basic-info' ? (
              <BasicInfoFields
                basicInfo={basicInfo}
                onChange={handleBasicInfoChange}
                errors={validationError.fieldErrors}
              />
            ) : (
              <ProjectDetailsFields
                projectDetails={projectDetails}
                projectLocked={projectLocked}
                onChange={handleProjectDetailsChange}
                errors={validationError.fieldErrors}
              />
            )}
          </FormGrid>

          {moduleType === 'project-details' &&
          resource.status === 'draft' &&
          !canEditProjectDetails ? (
            <Notice>
              Project Details is locked until Basic Info is fully completed.
            </Notice>
          ) : null}

          {isCompletedResource ? (
            <Notice>
              These edits are buffered locally and will not persist until you submit.
            </Notice>
          ) : null}

          <ActionRow>
            <Button
              type="submit"
              variant="primary"
              disabled={
                submitting ||
                (moduleType === 'project-details' &&
                  resource.status === 'draft' &&
                  !canEditProjectDetails)
              }
            >
              {submitLabel}
            </Button>
            <Button type="button" variant="secondary" onClick={() => void reload()}>
              Reload
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(`/resources/${resourceId}`)}
            >
              Cancel
            </Button>
          </ActionRow>
        </Form>
      </SectionCard>
    </PageFrame>
  )
}
