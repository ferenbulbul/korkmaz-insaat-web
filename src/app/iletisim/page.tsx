import Link from 'next/link'
import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import { SectionTitle } from '@/components/shared'
import { BreadcrumbSchema } from '@/components/seo'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
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

      {/* Page hero */}
      <SectionWrapper bgColor="dark" className="py-12 md:py-20">
        <Container>
          {/* Breadcrumb navigation */}
          <ScrollReveal direction="down" distance={20}>
            <Breadcrumb className="mb-6">
              <BreadcrumbList className="text-primary-foreground/60">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="text-primary-foreground/60 hover:text-primary-foreground"
                    >
                      Ana Sayfa
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground">
                    Iletisim
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ScrollReveal>

          {/* Page title */}
          <ScrollReveal direction="up">
            <SectionTitle
              overline="ILETISIM"
              title="Bize Ulasin"
              description="Projeleriniz hakkinda konusmak, teklif almak veya sorularinizi iletmek icin bizimle iletisime gecin."
              alignment="center"
              dark
              className="mb-0 md:mb-0"
            />
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Contact info cards */}
      <ContactInfo />

      {/* Contact form + map */}
      <ContactFormSection />
    </>
  )
}

export default ContactPage
