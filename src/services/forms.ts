import { api } from './api/client'
import { endpoints } from './api/endpoints'
import type { ContactPayload, ServiceRequestPayload } from '@/types'

export const submitServiceRequest = (p: ServiceRequestPayload) => api.post<{ id?: string }>(endpoints.serviceRequests, p)
export const submitContact = (p: ContactPayload) => api.post<{ id?: string }>(endpoints.contact, p)
