export interface ApiResponse<T> {
  data: T
  message: string | null
  statusCode: number
  isSuccess: boolean
  hasExceptionError: boolean
  validationErrors: string[] | null
}

export interface PaginatedResponse<T> {
  items: T[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}
