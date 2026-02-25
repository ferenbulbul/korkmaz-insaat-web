import { User, Linkedin, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TeamMember } from '@/types/team'

interface TeamMemberCardProps {
  member: TeamMember
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const { name, title, social } = member

  return (
    <div className="group text-center">
      {/* Photo placeholder */}
      <div
        className={cn(
          'mx-auto mb-4 aspect-square w-full max-w-[280px] overflow-hidden rounded-xl bg-muted',
          'transition-all duration-300 group-hover:shadow-lg',
        )}
      >
        <div className="flex h-full w-full items-center justify-center">
          <User className="size-16 text-muted-foreground/30" />
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-foreground">{name}</h3>

      {/* Title */}
      <p className="mt-1 text-sm text-muted-foreground">{title}</p>

      {/* Social links */}
      {social && (social.linkedin || social.email) && (
        <div className="mt-3 flex items-center justify-center gap-3">
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} LinkedIn profili`}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-accent"
            >
              <Linkedin className="size-5" />
            </a>
          )}
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              aria-label={`${name} e-posta`}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail className="size-5" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default TeamMemberCard
