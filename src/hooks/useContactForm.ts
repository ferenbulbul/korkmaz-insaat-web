'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { contactFormSchema, type ContactFormValues } from '@/lib/validations'
import { submitContactForm } from '@/services/contactService'

const useContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await submitContactForm(data)

      if (response.isSuccess) {
        toast.success(response.message || 'Mesajınız gönderildi!')
        form.reset()
      } else {
        toast.error(response.message || 'Bir hata oluştu.')
      }
    } catch {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyiniz.')
    }
  })

  return {
    form,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}

export default useContactForm
