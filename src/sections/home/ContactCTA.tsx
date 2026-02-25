import { CTABanner } from '@/components/shared'
import { ScrollReveal } from '@/components/motion'

const ContactCTA = () => {
  return (
    <ScrollReveal direction="up" duration={0.6}>
      <CTABanner
        title="Projenizi Birlikte Hayata Geçirelim"
        description="İnşaat projeleriniz için profesyonel destek almak ister misiniz? Hemen bizimle iletişime geçin."
        buttonText="İletişime Geçin"
        href="/iletisim"
      />
    </ScrollReveal>
  )
}

export default ContactCTA
