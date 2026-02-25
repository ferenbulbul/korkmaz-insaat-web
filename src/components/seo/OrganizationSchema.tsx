import { siteConfig } from '@/config/site'
import JsonLd from './JsonLd'

const OrganizationSchema = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ConstructionBusiness',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Büyükdere Cad. No:123',
      addressLocality: 'Beşiktaş',
      addressRegion: 'İstanbul',
      postalCode: '34330',
      addressCountry: 'TR',
    },
    telephone: siteConfig.links.phone,
    email: siteConfig.links.email,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
    ],
  }

  return <JsonLd data={data} />
}

export default OrganizationSchema
