import { Linkedin, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TeamMember } from '@/types/team'

interface TeamMemberCardProps {
  member: TeamMember
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const { name, title, social, bio } = member
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return (
    <div className="group rounded-2xl border border-border/70 bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-xl hover:shadow-accent/10">
      <div
        className={cn(
          'mx-auto mb-4 aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl',
          'bg-gradient-to-br from-[#2C2926] via-[#3B352F] to-[#161412]',
        )}
      >
        <div className="relative flex h-full w-full items-end justify-start p-4">
          <span className="absolute left-4 top-4 text-5xl font-black text-white/15">
            {initials}
          </span>
          <div className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-left backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-200/90">
              Ekip Üyesi
            </p>
            <p className="mt-1 text-xs text-white/90">{title}</p>
          </div>
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-foreground">{name}</h3>

      {/* Title */}
      <p className="mt-1 text-sm text-muted-foreground">{title}</p>
      {bio && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {bio}
        </p>
      )}

      {/* Social links */}
      {social && (social.linkedin || social.email) && (
        <div className="mt-4 flex items-center justify-center gap-3">
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} LinkedIn profili`}
              className="rounded-lg border border-border/70 p-2 text-muted-foreground transition-all hover:border-accent/25 hover:text-accent"
            >
              <Linkedin className="size-5" />
            </a>
          )}
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              aria-label={`${name} e-posta`}
              className="rounded-lg border border-border/70 p-2 text-muted-foreground transition-all hover:border-accent/25 hover:text-accent"
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
