import type { ApiResponse } from '@/types/api'
import type { ContactFormData } from '@/types/contact'

// Mock service — swap to real API call when backend is ready
// Example: const { data } = await http.post<ApiResponse<null>>('/contact', formData)

export const submitContactForm = async (
  formData: ContactFormData
): Promise<ApiResponse<null>> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Contact form submitted:', formData)
  }

  return {
    data: null,
    message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
    statusCode: 200,
    isSuccess: true,
    hasExceptionError: false,
    validationErrors: null,
  }
}
