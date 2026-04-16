import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LogoutButton from './LogoutButton'

interface AdminHeaderProps {
  title: string
  subtitle?: string
  backHref?: string
}

const AdminHeader = ({ title, subtitle, backHref }: AdminHeaderProps) => {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {backHref ? (
            <Link
              href={backHref}
              className="flex size-9 items-center justify-center rounded-lg border border-border bg-white text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              aria-label="Geri"
            >
              <ArrowLeft className="size-4" />
            </Link>
          ) : (
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-gold-500 to-gold-700 text-xs font-bold text-white">
                K
              </span>
              <span className="hidden sm:inline text-sm">Korkmaz Admin</span>
            </Link>
          )}
          <div className="border-l border-border pl-4">
            <h1 className="text-base font-semibold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden text-sm text-muted-foreground transition hover:text-foreground sm:inline"
          >
            Siteyi Goruntule
          </Link>
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
