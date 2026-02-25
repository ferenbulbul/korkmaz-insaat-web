import JsonLd from './JsonLd'

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[]
}

const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={data} />
}

export default BreadcrumbSchema
