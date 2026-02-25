import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import type { ApiResponse } from '@/types'
import type { ContactFormData } from '@/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body against schema
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      const validationErrors = result.error.issues.map(
        (issue) => `${issue.path.join('.')}: ${issue.message}`,
      )

      const response: ApiResponse<null> = {
        data: null,
        message: 'Dogrulama hatasi. Lutfen formu kontrol ediniz.',
        statusCode: 400,
        isSuccess: false,
        hasExceptionError: false,
        validationErrors,
      }

      return NextResponse.json(response, { status: 400 })
    }

    const formData: ContactFormData = result.data

    // Log form data for development (replace with email/notification service)
    console.log('[Contact Form Submission]', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Integrate email service (e.g., Resend, SendGrid, Nodemailer)
    // TODO: Store submission in database
    // TODO: Send notification to admin

    const response: ApiResponse<{ receivedAt: string }> = {
      data: { receivedAt: new Date().toISOString() },
      message: 'Mesajiniz basariyla alindi. En kisa surede size donecegiz.',
      statusCode: 200,
      isSuccess: true,
      hasExceptionError: false,
      validationErrors: null,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('[Contact API Error]', error)

    const response: ApiResponse<null> = {
      data: null,
      message: 'Beklenmeyen bir hata olustu. Lutfen daha sonra tekrar deneyiniz.',
      statusCode: 500,
      isSuccess: false,
      hasExceptionError: true,
      validationErrors: null,
    }

    return NextResponse.json(response, { status: 500 })
  }
}
