# Supabase Kurulum Rehberi — Korkmaz İnşaat Web

Bu dokümanda sitenin **projeler** modülünü tamamen dinamik hale getirmek için yapılacak Supabase kurulumu adım adım anlatılmıştır. Kodu ben yazacağım — sen sadece bu dosyadaki adımları Supabase panelinde ve terminalde uygulayacaksın.

---

## 1. Özet Karar Matrisi

| Alan | Karar |
|------|-------|
| Auth (admin girişi) | **Basit env şifre + cookie session** (`/admin` korumalı) |
| Görsel depolama | **Supabase Storage** (public bucket: `project-images`) |
| Schema esnekliği | **Esnek JSONB** (specs[] + features{}) |
| Mevcut veri | **Temiz başla** (mock data silinecek) |
| Kategori | **3 sabit enum**: `konut`, `ticari`, `karma` |
| Nizam | Ayrı enum: `bitisik`, `ayrik`, `null` |
| Özellik katalog | **Katalog + serbest ekleme** (hybrid) |
| Spec girişi | **Standart input'lar + serbest (+) eklenebilir** |
| Admin v1 scope | CRUD, görsel yükleme/sıralama, featured toggle |

---

## 2. Supabase Projesi Oluşturma

### 2.1 Hesap ve Proje
1. https://supabase.com adresine git → **Sign in** (GitHub ile hızlı)
2. Dashboard'da **New Project** butonuna bas
3. Aşağıdaki alanları doldur:
   - **Project name**: `korkmaz-insaat-web`
   - **Database Password**: Güçlü bir şifre oluştur (password manager'a kaydet — bir daha gösterilmeyecek)
   - **Region**: `Europe (Frankfurt) — eu-central-1` (Türkiye'ye en yakın)
   - **Pricing Plan**: Free (başlangıç için yeterli)
4. **Create new project** → Proje ~2 dakikada hazır olur

### 2.2 API Anahtarlarını Al
Proje hazır olduktan sonra:
1. Sol menü → **Project Settings** (⚙️) → **API**
2. Şu 3 değeri kopyala (sonra `.env.local`'e eklenecek):
   - **Project URL** → `https://xxxxx.supabase.co`
   - **anon public** key → `eyJhbGci...` (uzun)
   - **service_role** key → `eyJhbGci...` (uzun, **gizli tut, GitHub'a pushlama**)

---

## 3. Database Schema (SQL Editor)

Sol menü → **SQL Editor** → **+ New query** → aşağıdaki SQL'i yapıştır → **Run**.

```sql
-- ============================================================
-- ENUM TYPES
-- ============================================================
CREATE TYPE project_category AS ENUM ('konut', 'ticari', 'karma');
CREATE TYPE project_status   AS ENUM ('ongoing', 'completed', 'planned');
CREATE TYPE project_nizam    AS ENUM ('bitisik', 'ayrik');

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
CREATE TABLE projects (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                 TEXT UNIQUE NOT NULL,
  title                TEXT NOT NULL,
  description          TEXT NOT NULL,
  category             project_category NOT NULL,
  status               project_status   NOT NULL,
  nizam                project_nizam,                 -- opsiyonel
  location             TEXT NOT NULL,
  area                 INTEGER NOT NULL,              -- m2 (zorunlu)
  floor_count          INTEGER NOT NULL,              -- kat sayisi (zorunlu)
  unit_count           INTEGER,                       -- daire sayisi
  parking_floor_count  INTEGER,                       -- otopark kat sayisi
  completion_date      TEXT,                          -- "2024" gibi yil
  start_date           TEXT,
  apartment_types      TEXT[],                        -- ['2+1','3+1','4+1']
  client               TEXT,
  architect            TEXT,
  featured             BOOLEAN DEFAULT FALSE,
  specs                JSONB DEFAULT '[]'::jsonb,     -- [{label,value,type?}]
  features             JSONB DEFAULT '{}'::jsonb,     -- {elevator:true, landscape:true, custom_xxx:true}
  thumbnail_url        TEXT,
  order_index          INTEGER DEFAULT 0,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROJECT IMAGES TABLE
-- ============================================================
CREATE TABLE project_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  alt         TEXT,
  width       INTEGER,
  height      INTEGER,
  order_index INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_projects_slug       ON projects(slug);
CREATE INDEX idx_projects_status     ON projects(status);
CREATE INDEX idx_projects_category   ON projects(category);
CREATE INDEX idx_projects_featured   ON projects(featured) WHERE featured = TRUE;
CREATE INDEX idx_projects_order      ON projects(order_index);
CREATE INDEX idx_project_images_pid  ON project_images(project_id);
CREATE INDEX idx_project_images_ord  ON project_images(project_id, order_index);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## 4. Row Level Security (RLS) — Güvenlik

Public kullanıcılar sadece **okuyabilsin**, yazma işlemleri sadece **service_role key** üzerinden (admin panel) yapılsın.

```sql
-- ============================================================
-- ENABLE RLS
-- ============================================================
ALTER TABLE projects       ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PUBLIC READ POLICIES (website icin)
-- ============================================================
CREATE POLICY "Public projects read"
  ON projects FOR SELECT
  USING (TRUE);

CREATE POLICY "Public images read"
  ON project_images FOR SELECT
  USING (TRUE);

-- NOT: Yazma (INSERT/UPDATE/DELETE) policy eklemiyoruz.
-- Admin panel `service_role` key kullanacak; bu key RLS'i otomatik bypass eder.
```

---

## 5. Storage Bucket (Görseller)

### 5.1 Bucket Oluştur
Sol menü → **Storage** → **New bucket**:
- **Name**: `project-images`
- **Public bucket**: ✅ İşaretle (görseller CDN'den public olarak sunulacak)
- **File size limit**: `10 MB` (opsiyonel)
- **Allowed MIME types**: `image/jpeg, image/png, image/webp, image/avif`
- **Create bucket**

### 5.2 Storage RLS Policy
**SQL Editor** → yeni query → çalıştır:

```sql
-- Public read on project-images bucket
CREATE POLICY "Public image access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

-- Admin upload/delete: service_role zaten bypass eder, extra policy yok.
```

---

## 6. Environment Variables

Proje kök dizininde `.env.local` dosyası oluştur (veya varsa güncelle):

```bash
# ── Supabase ────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# ── Admin Panel ─────────────────────────────────────────────
# Admin giris sifresi (sen belirle, guclu olsun)
ADMIN_PASSWORD=Korkmaz2026!AdminPanel

# Cookie session icin JWT imzalama secret'i (random uzun string)
# Olusturma: `openssl rand -base64 32` komutuyla terminalde olustur
ADMIN_SESSION_SECRET=SeninUretecegin32KarakterlikRandomString

# ── App URL ─────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6.1 ADMIN_SESSION_SECRET Üretme
Terminal'de çalıştır:
```bash
openssl rand -base64 32
```
Çıkan değeri `ADMIN_SESSION_SECRET`'e yapıştır.

### 6.2 Vercel Production için
Vercel Dashboard → Project → **Settings** → **Environment Variables** → yukarıdaki 6 değişkeni tek tek ekle (Production + Preview).

`NEXT_PUBLIC_APP_URL` production'da sitenin gerçek URL'i olmalı (örn. `https://korkmaz-insaat.com`).

**ÖNEMLİ**: `.env.local` dosyası `.gitignore`'da olmalı — GitHub'a pushlama.

---

## 7. NPM Paket Kurulumu

Aşağıdaki komutu terminalde proje kök dizininde çalıştır:

```bash
npm install @supabase/supabase-js @supabase/ssr jose
```

- **@supabase/supabase-js**: Ana SDK
- **@supabase/ssr**: Next.js App Router için server-side helpers
- **jose**: Cookie JWT imzalama/doğrulama (admin session için)

---

## 8. Kurulum Doğrulama Checklist

Kurulum tamamlandıktan sonra aşağıdakilerin hepsi ✅ olmalı:

- [ ] Supabase projesi oluşturuldu (Frankfurt region)
- [ ] API URL + anon key + service_role key alındı
- [ ] Projects + project_images tabloları oluşturuldu (SQL çalıştırıldı)
- [ ] Enum tipleri tanımlandı (category, status, nizam)
- [ ] RLS public read policy'leri oluşturuldu
- [ ] `project-images` storage bucket'ı **public** olarak oluşturuldu
- [ ] Storage read policy eklendi
- [ ] `.env.local` dosyasına 6 değişken eklendi
- [ ] `ADMIN_SESSION_SECRET` `openssl rand`-ile üretildi
- [ ] `npm install` ile 3 paket kuruldu
- [ ] `.env.local` dosyası `.gitignore`'da (GitHub'a gitmesin)

---

## 9. Doğrulama SQL Sorgusu

SQL Editor'da çalıştır — hata vermeyip boş sonuç döndürmeli:

```sql
SELECT
  (SELECT COUNT(*) FROM projects)       AS project_count,
  (SELECT COUNT(*) FROM project_images) AS image_count,
  (SELECT COUNT(*) FROM pg_enum WHERE enumtypid = 'project_category'::regtype) AS category_enum_count,
  (SELECT COUNT(*) FROM pg_enum WHERE enumtypid = 'project_status'::regtype)   AS status_enum_count,
  (SELECT COUNT(*) FROM pg_enum WHERE enumtypid = 'project_nizam'::regtype)    AS nizam_enum_count;
```

**Beklenen çıktı**:
```
project_count | image_count | category_enum_count | status_enum_count | nizam_enum_count
     0        |      0      |         3           |        3          |        2
```

---

## 10. Sonraki Adım (Ben Yapacağım)

Sen bu 9 adımı tamamladıktan sonra, ben aşağıdakileri kodlayacağım:

### 10.1 Backend / Services
- `src/lib/supabase/client.ts` — browser client
- `src/lib/supabase/server.ts` — server client (RSC + Route Handlers)
- `src/lib/supabase/admin.ts` — service_role client (sadece admin route'larda)
- `src/services/projects.ts` — `getProjects()`, `getProjectBySlug()`, `createProject()`, `updateProject()`, `deleteProject()`
- `src/services/storage.ts` — görsel upload/delete

### 10.2 Public Sayfalar (Mevcut UI + Supabase bağlantısı)
- `src/app/projeler/page.tsx` — Supabase'den projeleri çek
- `src/app/projeler/[slug]/page.tsx` — slug'a göre proje detay
- Mock `src/constants/projects.ts` silinir

### 10.3 Admin Panel (`/admin/*`)
- `src/app/admin/login/page.tsx` — şifre formu
- `src/app/admin/page.tsx` — proje listesi + arama + filtre
- `src/app/admin/projeler/yeni/page.tsx` — yeni proje formu
- `src/app/admin/projeler/[id]/page.tsx` — düzenleme formu
- `src/app/admin/api/auth/login/route.ts` — şifre kontrol + cookie set
- `src/app/admin/api/auth/logout/route.ts` — cookie temizle
- `src/middleware.ts` — `/admin/*` koruma (login sayfası hariç)

### 10.4 Admin Form Bileşenleri
- Standart input'lar: başlık, slug, kategori, durum, nizam, konum, alan (m²), kat sayısı, daire sayısı, otopark katı
- Dinamik listeler:
  - **Apartment types**: chip ekle/çıkar (`2+1`, `3+1`, ...)
  - **Specs**: katalog + serbest ekleme (label + value satırları)
  - **Features**: katalog checkbox'ları + "+Özel Özellik" butonu
- **Görsel yükleme**: drag-drop çoklu, sıralama (drag handle), thumbnail seçimi, silme
- **Featured toggle**: switch
- Zorunlu alan validasyonu (Zod + react-hook-form)

---

## 11. SSS / Troubleshooting

**S: SQL "permission denied for schema public" hatası alıyorum.**
C: SQL Editor'ı Supabase dashboard üzerinden aç, lokal bir tool kullanma. Dashboard otomatik olarak admin olarak bağlanır.

**S: Service_role key'i frontend'e koyabilir miyim?**
C: **HAYIR.** Sadece `SUPABASE_SERVICE_ROLE_KEY` prefix'i olmadan (NEXT_PUBLIC yok) tanımlı olduğu için server tarafında kalır. Sadece Server Components / Route Handlers içinde kullanılır.

**S: Admin panel production'da nasıl korunacak?**
C: Middleware ile `/admin/*` tüm yollar cookie session kontrolü yapar. Cookie HttpOnly + Secure + SameSite=Strict olarak set edilir. Şifre `bcrypt` ile değil env'de düz tutulur (tek admin, iç kullanım için pragmatik).

**S: Görseller çok mu büyük?**
C: Next.js `<Image>` bileşeni otomatik optimize eder. Bucket'a yüklenen orijinal boyut 10 MB'a kadar OK. Gerekirse upload sırasında `sharp` ile client-side sıkıştırma eklenebilir.

**S: Yeni kategori eklemem gerekirse?**
C: SQL Editor'da: `ALTER TYPE project_category ADD VALUE 'yeni_kategori';` ardından kod tarafında enum güncellenir.

---

## 12. İletişim

Kurulumda takıldığın her adımı bana yaz — screenshot + hata mesajı yeterli. Sen "Supabase kurulumu tamam" dediğin anda ben kodu yazmaya başlayacağım.
