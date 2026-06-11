export type ResourceStatus = 'draft' | 'completed'

export interface BasicInfo {
  resourceName: string
  owner: string
  email: string
  description: string
  priority: string
}

export interface ProjectDetails {
  projectName: string
  budget: string
  category: string
  options: string[]
}

export interface ResourcePayload {
  name: string
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
}

export interface ResourceRecord {
  _id?: string
  resourceId: number
  name: string
  status: ResourceStatus
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
  createdAt?: string
  updatedAt?: string
}

export interface ListResourcesResponse {
  items: ResourceRecord[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}

export interface ApiErrorShape {
  message?: string
  details?: unknown
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001'

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json')
    ? ((await response.json()) as T | ApiErrorShape)
    : null

  if (!response.ok) {
    const errorPayload = payload as ApiErrorShape | null
    throw new Error(
      errorPayload?.message ?? `Request failed with status ${response.status}`,
    )
  }

  return payload as T
}

export const resourceApi = {
  listResources: (query: URLSearchParams) =>
    requestJson<ListResourcesResponse>(`/api/resources?${query.toString()}`),
  getResource: (resourceId: string) =>
    requestJson<ResourceRecord>(`/api/resources/${resourceId}`),
  createResource: (resourceName: string) =>
    requestJson<ResourceRecord>('/api/resources', {
      method: 'POST',
      body: JSON.stringify({ resourceName }),
    }),
  deleteResource: (resourceId: string) =>
    requestJson<ResourceRecord>(`/api/resources/${resourceId}`, { method: 'DELETE' }),
  updateBasicInfo: (resourceId: string, basicInfo: BasicInfo) =>
    requestJson<ResourceRecord>(`/api/resources/${resourceId}/basic-info`, {
      method: 'PATCH',
      body: JSON.stringify(basicInfo),
    }),
  updateProjectDetails: (resourceId: string, projectDetails: ProjectDetails) =>
    requestJson<ResourceRecord>(`/api/resources/${resourceId}/project-details`, {
      method: 'PATCH',
      body: JSON.stringify(projectDetails),
    }),
  provisionResource: (resourceId: string) =>
    requestJson<ResourceRecord>(`/api/resources/${resourceId}/provisioning`, {
      method: 'PATCH',
    }),
  replaceResource: (resourceId: string, payload: ResourcePayload) =>
    requestJson<ResourceRecord>(`/api/resources/${resourceId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
}

export const TEAM_MEMBER_OPTIONS = [
  'FE devs',
  'BE devs',
  'Designer',
  'Data Eng',
  'Product Owner',
] as const
export const PROJECT_CATEGORY_OPTIONS = ['internal', 'external', 'vendor'] as const
export const PRIORITY_OPTIONS = ['low', 'medium', 'high'] as const

export const emptyBasicInfo = (resourceName = ''): BasicInfo => ({
  resourceName,
  owner: '',
  email: '',
  description: '',
  priority: 'low',
})

export const emptyProjectDetails = (): ProjectDetails => ({
  projectName: '',
  budget: '',
  category: 'internal',
  options: [],
})

export const isBasicInfoComplete = (basicInfo: BasicInfo) =>
  Boolean(
    basicInfo.resourceName &&
    basicInfo.owner &&
    basicInfo.email &&
    basicInfo.description &&
    basicInfo.priority,
  )

export const isProjectDetailsComplete = (projectDetails: ProjectDetails) =>
  Boolean(
    projectDetails.projectName &&
    projectDetails.budget &&
    projectDetails.category &&
    projectDetails.options.length > 0,
  )

export const getCompletionScore = (resource: ResourceRecord) => {
  const basicInfoScore = isBasicInfoComplete(resource.basicInfo) ? 1 : 0
  const projectDetailsScore = isProjectDetailsComplete(resource.projectDetails) ? 1 : 0
  return Math.round(((basicInfoScore + projectDetailsScore) / 2) * 100)
}
