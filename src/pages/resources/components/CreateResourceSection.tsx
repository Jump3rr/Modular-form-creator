import { Button, Input } from '../../../design-system'
import { SectionCard, SectionTitle } from '../../../components/ResourceLayout'

interface CreateResourceSectionProps {
  resourceName: string
  resourceNameError?: string | null
  onResourceNameChange: (value: string) => void
  onSubmit: () => Promise<void>
}

export function CreateResourceSection({
  resourceName,
  resourceNameError,
  onResourceNameChange,
  onSubmit,
}: Readonly<CreateResourceSectionProps>) {
  return (
    <SectionCard
      as="form"
      onSubmit={(event) => {
        event.preventDefault()
        void onSubmit()
      }}
    >
      <SectionTitle>Create resource</SectionTitle>
      <div style={{ display: 'grid', gap: 16 }}>
        <Input
          label="Resource name"
          value={resourceName}
          onChange={(event) => onResourceNameChange(event.target.value)}
          placeholder="e.g. Retail onboarding flow"
          hint="Name is locked after creation."
          error={resourceNameError ?? undefined}
        />
        <Button type="submit" variant="primary">
          Create resource
        </Button>
      </div>
    </SectionCard>
  )
}
