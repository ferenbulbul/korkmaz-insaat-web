export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
