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
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-gold-500/30 hover:bg-white/8">
      {/* Animated top hairline */}
      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-gold-300 to-accent/0 transition-transform duration-700 ease-out group-hover:scale-x-100" />

      <div
        className={cn(
          'mx-auto mb-5 aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl',
          'bg-gradient-to-br from-[#2C2926] via-[#3B352F] to-[#161412]',
        )}
      >
        <div className="relative flex h-full w-full items-end justify-start p-4">
          <span
            className="absolute right-4 top-4 font-display text-5xl font-normal text-white/10"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {initials}
          </span>
          <div className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-left backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-200/90">
              Ekip Üyesi
            </p>
            <p className="mt-1 text-xs text-white/90">{title}</p>
          </div>
        </div>
      </div>

      {/* Name — serif */}
      <h3
        className="font-display text-lg font-medium text-white"
        style={{ fontVariationSettings: "'opsz' 48" }}
      >
        {name}
      </h3>

      {/* Title */}
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300/80">
        {title}
      </p>

      {bio && (
        <p className="mt-3 text-sm leading-relaxed text-white/50">
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
              className="rounded-lg border border-white/10 p-2 text-white/40 transition-all hover:border-gold-500/30 hover:text-gold-300"
            >
              <Linkedin className="size-5" />
            </a>
          )}
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              aria-label={`${name} e-posta`}
              className="rounded-lg border border-white/10 p-2 text-white/40 transition-all hover:border-gold-500/30 hover:text-gold-300"
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
