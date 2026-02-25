export interface JsonLdProps {
  type: string
  data: Record<string, unknown>
}

export interface BreadcrumbJsonLd {
  items: {
    name: string
    url: string
  }[]
}
