import { Input, Select } from '../../../design-system'
import { PRIORITY_OPTIONS, type BasicInfo } from '../../../api/resources'

interface BasicInfoFieldsProps {
  basicInfo: BasicInfo
  onChange: (next: BasicInfo) => void
  errors?: Partial<Record<'owner' | 'email' | 'description' | 'priority', string>>
}

export function BasicInfoFields({
  basicInfo,
  onChange,
  errors,
}: Readonly<BasicInfoFieldsProps>) {
  return (
    <>
      <Input
        label="Owner"
        value={basicInfo.owner}
        onChange={(event) => onChange({ ...basicInfo, owner: event.target.value })}
        placeholder="Name Surname"
        error={errors?.owner}
      />
      <Input
        label="Email"
        value={basicInfo.email}
        onChange={(event) => onChange({ ...basicInfo, email: event.target.value })}
        placeholder="example@example.com"
        error={errors?.email}
      />
      <Input
        label="Description"
        value={basicInfo.description}
        onChange={(event) => onChange({ ...basicInfo, description: event.target.value })}
        placeholder=""
        multiline
        error={errors?.description}
      />
      <Select
        label="Priority"
        value={basicInfo.priority}
        onChange={(event) => onChange({ ...basicInfo, priority: event.target.value })}
        options={PRIORITY_OPTIONS.map((option) => ({ label: option, value: option }))}
        error={errors?.priority}
      />
    </>
  )
}
