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
      streetAddress: 'Korkmaz Plaza, Akçaali Mahallesi, 1002 Sokak No:6B',
      addressLocality: 'Gönen',
      addressRegion: 'Balıkesir',
      postalCode: '10900',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    telephone: siteConfig.links.phone,
    email: siteConfig.links.email,
    hasMap: siteConfig.links.mapsUrl,
    areaServed: {
      '@type': 'City',
      name: 'Gönen',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Balıkesir',
      },
    },
    priceRange: '₺₺₺',
    sameAs: [siteConfig.social.instagram],
  }

  return <JsonLd data={data} />
}

export default OrganizationSchema
