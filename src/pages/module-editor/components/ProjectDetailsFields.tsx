import { CheckboxGroup, Input, Select } from '../../../design-system'
import {
  PROJECT_CATEGORY_OPTIONS,
  TEAM_MEMBER_OPTIONS,
  type ProjectDetails,
} from '../../../api/resources'

interface ProjectDetailsFieldsProps {
  projectDetails: ProjectDetails
  projectLocked: boolean
  onChange: (next: ProjectDetails) => void
  errors?: Partial<Record<'projectName' | 'budget' | 'category' | 'options', string>>
}

export function ProjectDetailsFields({
  projectDetails,
  projectLocked,
  onChange,
  errors,
}: Readonly<ProjectDetailsFieldsProps>) {
  return (
    <>
      <Input
        label="Project name"
        value={projectDetails.projectName}
        onChange={(event) =>
          onChange({ ...projectDetails, projectName: event.target.value })
        }
        placeholder="New project"
        disabled={projectLocked}
        error={errors?.projectName}
      />
      <Input
        label="Budget"
        value={projectDetails.budget}
        onChange={(event) => onChange({ ...projectDetails, budget: event.target.value })}
        placeholder="10000"
        disabled={projectLocked}
        error={errors?.budget}
      />
      <Select
        label="Category"
        value={projectDetails.category}
        onChange={(event) =>
          onChange({ ...projectDetails, category: event.target.value })
        }
        options={PROJECT_CATEGORY_OPTIONS.map((option) => ({
          label: option,
          value: option,
        }))}
        disabled={projectLocked}
        error={errors?.category}
      />
      <CheckboxGroup
        label="Team members"
        options={[...TEAM_MEMBER_OPTIONS]}
        value={projectDetails.options}
        onChange={(next) => onChange({ ...projectDetails, options: next })}
        helper="Select at least one responsible team member."
        error={errors?.options}
        disabled={projectLocked}
      />
    </>
  )
}
