export interface TeamMember {
  id: string
  name: string
  title: string
  photoUrl: string
  bio?: string
  social?: {
    linkedin?: string
    email?: string
  }
}
