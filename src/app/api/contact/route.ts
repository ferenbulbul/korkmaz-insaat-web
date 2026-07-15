import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import type { ApiResponse } from '@/types'
import type { ContactFormData } from '@/types'

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Email-client-safe HTML (tables + inline styles), styled with the site palette.
const buildContactEmailHtml = (form: ContactFormData): string => {
  const receivedAt = new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Istanbul',
  }).format(new Date())

  const infoRow = (label: string, value: string, isLast = false) => `
    <tr>
      <td style="padding:14px 0;${isLast ? '' : 'border-bottom:1px solid #E7E5E4;'}width:120px;vertical-align:top;">
        <span style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#A8A29E;">${label}</span>
      </td>
      <td style="padding:14px 0;${isLast ? '' : 'border-bottom:1px solid #E7E5E4;'}vertical-align:top;">
        <span style="font-size:15px;color:#1C1917;font-weight:500;">${value}</span>
      </td>
    </tr>`

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background-color:#FAFAF9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#1C1917;border-radius:12px 12px 0 0;padding:32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:0.5px;">Korkmaz İnşaat</span><br />
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#B8962E;">Gönen / Balıkesir</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gold accent bar -->
          <tr>
            <td style="background-color:#B8962E;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#FFFFFF;padding:36px 40px;font-family:Arial,Helvetica,sans-serif;">
              <h1 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1C1917;">Yeni İletişim Formu Mesajı</h1>
              <p style="margin:0 0 28px;font-size:13px;color:#78716C;">Web sitesi üzerinden yeni bir mesaj aldınız.</p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${infoRow('Ad Soyad', escapeHtml(form.name))}
                ${infoRow('E-posta', `<a href="mailto:${escapeHtml(form.email)}" style="color:#B8962E;text-decoration:none;">${escapeHtml(form.email)}</a>`)}
                ${infoRow('Telefon', form.phone ? `<a href="tel:${escapeHtml(form.phone)}" style="color:#1C1917;text-decoration:none;">${escapeHtml(form.phone)}</a>` : '—')}
                ${infoRow('Konu', escapeHtml(form.subject ?? '—'), true)}
              </table>

              <!-- Message box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <td style="background-color:#F5F5F4;border-left:3px solid #B8962E;border-radius:0 8px 8px 0;padding:20px 24px;">
                    <span style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#A8A29E;">Mesaj</span>
                    <p style="margin:10px 0 0;font-size:15px;line-height:1.7;color:#1C1917;">${escapeHtml(form.message).replace(/\n/g, '<br />')}</p>
                  </td>
                </tr>
              </table>

              <!-- Reply button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td style="background-color:#B8962E;border-radius:8px;">
                    <a href="mailto:${escapeHtml(form.email)}?subject=${encodeURIComponent(`Re: ${form.subject || 'İletişim Formu'}`)}" style="display:inline-block;padding:12px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;">Yanıtla</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#FFFFFF;border-top:1px solid #E7E5E4;border-radius:0 0 12px 12px;padding:20px 40px;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0;font-size:12px;color:#A8A29E;line-height:1.6;">
                ${receivedAt} tarihinde korkmazinsaat.com.tr iletişim formundan gönderildi.<br />
                Bu maili doğrudan yanıtlayarak gönderene cevap verebilirsiniz.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// Sends the form submission via Resend (https://resend.com).
// Throws on failure so the visitor sees an error instead of a false success.
const sendContactEmail = async (form: ContactFormData): Promise<void> => {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !to) {
    console.error(
      '[Contact] RESEND_API_KEY / CONTACT_TO_EMAIL not configured — submission NOT delivered:',
      { name: form.name, email: form.email, message: form.message },
    )
    throw new Error('Mail service not configured')
  }

  const html = buildContactEmailHtml(form)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev',
      to: [to],
      reply_to: form.email,
      subject: `İletişim Formu: ${form.subject || 'Yeni Mesaj'} — ${form.name}`,
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[Contact] Resend error:', res.status, body)
    throw new Error('Mail could not be sent')
  }
}

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

    await sendContactEmail(formData)

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
