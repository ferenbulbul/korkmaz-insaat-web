-- Site-wide settings as key/value pairs (jsonb values).
-- Run this in the Supabase SQL Editor.

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Public (anon) can read settings; writes go through the service_role key only.
drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

-- Default: blog is visible
insert into public.site_settings (key, value)
values ('blog_visible', 'true'::jsonb)
on conflict (key) do nothing;
