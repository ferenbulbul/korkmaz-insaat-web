import { PageHero } from '@/components/shared'
import { BreadcrumbSchema } from '@/components/seo'
import { ContactInfo, ContactFormSection } from '@/sections/contact'
import { createMetadata } from '@/lib/metadata'
import { siteConfig } from '@/config/site'

export const metadata = createMetadata({
  title: 'Iletisim',
  description:
    'Korkmaz Insaat ile iletisime gecin. Projeleriniz icin teklif alin, sorularinizi iletin. Telefon, e-posta ve iletisim formu ile bize ulasin.',
})

const ContactPage = () => {
  return (
    <>
      {/* Structured data */}
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: siteConfig.url },
          { name: 'Iletisim', url: `${siteConfig.url}/iletisim` },
        ]}
      />

      <PageHero
        title="Bize Ulaşın"
        overline="İLETİŞİM"
        description="Projeleriniz hakkında konuşmak, teklif almak veya sorularınızı iletmek için bizimle iletişime geçin."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        breadcrumbs={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'İletişim' },
        ]}
      />

      {/* Contact info cards */}
      <ContactInfo />

      {/* Contact form + map */}
      <ContactFormSection />
    </>
  )
}

export default ContactPage
