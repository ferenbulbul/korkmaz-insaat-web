import type { Project } from '@/types/project'
import { siteConfig } from '@/config/site'
import JsonLd from './JsonLd'

interface ProjectSchemaProps {
  project: Project
}

const ProjectSchema = ({ project }: ProjectSchemaProps) => {
  const statusMap: Record<string, string> = {
    completed: 'https://schema.org/Completed',
    ongoing: 'https://schema.org/UnderConstruction',
    planned: 'https://schema.org/Planned',
  }

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: project.title,
    description: `${project.description} Gönen, Balıkesir'de ${project.title} projesi. Korkmaz İnşaat güvencesiyle.`,
    url: `${siteConfig.url}/projeler/${project.slug}`,
    datePosted: project.createdAt,
    dateModified: project.updatedAt,
    image: project.thumbnailUrl
      ? [project.thumbnailUrl, ...project.images.slice(0, 4).map((img) => img.url)]
      : project.images.slice(0, 5).map((img) => img.url),
    provider: {
      '@type': 'ConstructionBusiness',
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.links.phone,
    },
    about: {
      '@type': 'Residence',
      name: project.title,
      description: project.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: project.location || 'Gönen',
        addressRegion: 'Balıkesir',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      floorSize: project.area
        ? {
            '@type': 'QuantitativeValue',
            value: project.area,
            unitCode: 'MTK',
            unitText: 'm²',
          }
        : undefined,
      numberOfRooms: project.unitCount ?? undefined,
      additionalProperty: [
        ...(project.floorCount
          ? [
              {
                '@type': 'PropertyValue',
                name: 'Kat Sayısı',
                value: project.floorCount,
              },
            ]
          : []),
        ...(project.status
          ? [
              {
                '@type': 'PropertyValue',
                name: 'Proje Durumu',
                value:
                  project.status === 'completed'
                    ? 'Tamamlandı'
                    : project.status === 'ongoing'
                      ? 'Devam Ediyor'
                      : 'Planlanıyor',
              },
            ]
          : []),
      ],
    },
  }

  // Add event status if applicable
  if (project.status && statusMap[project.status]) {
    data.eventStatus = statusMap[project.status]
  }

  return <JsonLd data={data} />
}

export default ProjectSchema
