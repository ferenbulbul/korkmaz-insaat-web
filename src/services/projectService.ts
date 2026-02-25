import type { ApiResponse } from '@/types/api'
import type { Project } from '@/types/project'
import { PROJECTS } from '@/constants/projects'

// Mock service layer — swap to real API calls when backend is ready
// Example: const { data } = await http.get<ApiResponse<Project[]>>('/projects')

export const getProjects = async (): Promise<ApiResponse<Project[]>> => {
  return {
    data: PROJECTS,
    message: null,
    statusCode: 200,
    isSuccess: true,
    hasExceptionError: false,
    validationErrors: null,
  }
}

export const getProjectBySlug = async (
  slug: string
): Promise<ApiResponse<Project | null>> => {
  const project = PROJECTS.find((p) => p.slug === slug) || null

  return {
    data: project,
    message: project ? null : 'Proje bulunamadı',
    statusCode: project ? 200 : 404,
    isSuccess: !!project,
    hasExceptionError: false,
    validationErrors: null,
  }
}

export const getProjectsByCategory = async (
  category: string
): Promise<ApiResponse<Project[]>> => {
  const filtered = PROJECTS.filter((p) => p.category === category)

  return {
    data: filtered,
    message: null,
    statusCode: 200,
    isSuccess: true,
    hasExceptionError: false,
    validationErrors: null,
  }
}

export const getFeaturedProjects = async (): Promise<ApiResponse<Project[]>> => {
  const featured = PROJECTS.filter((p) => p.featured)

  return {
    data: featured,
    message: null,
    statusCode: 200,
    isSuccess: true,
    hasExceptionError: false,
    validationErrors: null,
  }
}
