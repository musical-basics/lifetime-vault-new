-- ============================================================
-- Lifetime Vault — Supabase Schema
-- Run this in the Supabase SQL Editor to create all tables.
-- ============================================================

-- Courses
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  lessons_count text not null default '0 Lessons',
  duration text not null default '0 Hours',
  description text not null default '',
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Sheet Music
create table if not exists sheet_music (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  pages int not null default 1,
  difficulty text not null default 'Beginner',
  pdf_url text,
  created_at timestamptz default now()
);

-- Bonus Material
create table if not exists bonus_material (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text not null default 'PDF Guide',
  description text not null default '',
  resource_url text,
  created_at timestamptz default now()
);

-- Behind the Scenes clips
create table if not exists bts_clips (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null default '',
  duration text not null default '',
  video_url text,
  thumbnail_url text,
  created_at timestamptz default now()
);

-- Tour Dates
create table if not exists tour_dates (
  id uuid default gen_random_uuid() primary key,
  date text not null,
  city text not null,
  venue text not null default '',
  status text not null default 'Coming Soon',
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security (RLS)
-- Public read access, service-role-only write access
-- ============================================================

alter table courses enable row level security;
alter table sheet_music enable row level security;
alter table bonus_material enable row level security;
alter table bts_clips enable row level security;
alter table tour_dates enable row level security;

-- Public read policies
create policy "Public read courses" on courses for select using (true);
create policy "Public read sheet_music" on sheet_music for select using (true);
create policy "Public read bonus_material" on bonus_material for select using (true);
create policy "Public read bts_clips" on bts_clips for select using (true);
create policy "Public read tour_dates" on tour_dates for select using (true);

-- ============================================================
-- Storage bucket (create manually in Supabase Dashboard)
-- Bucket name: vault-files
-- Public: true (so files are accessible via URL)
-- ============================================================
