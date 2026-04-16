import LoginForm from './LoginForm'

const AdminLoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 p-4">
      {/* Gold accent line pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 80px, #B8962E 80px, #B8962E 81px)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-300/80">
            Yonetim
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white">Admin Paneli</h1>
          <p className="mt-2 text-sm text-white/50">
            Devam etmek icin sifrenizi girin
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
