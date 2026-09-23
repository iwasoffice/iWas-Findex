-- iWas Findex user accounts and per-user preferences
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(display_name) <= 80),
  theme text not null default 'dark' check (theme in ('dark','light','system')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.watchlist (
  user_id uuid not null references auth.users(id) on delete cascade,
  symbol text not null check (symbol ~ '^[A-Z0-9.:-]{1,15}$'),
  created_at timestamptz not null default now(),
  primary key (user_id, symbol)
);

alter table public.profiles enable row level security;
alter table public.watchlist enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles
for select to authenticated using ((select auth.uid()) = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile" on public.profiles
for insert to authenticated with check ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles
for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists "Users can read own watchlist" on public.watchlist;
create policy "Users can read own watchlist" on public.watchlist
for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own watchlist" on public.watchlist;
create policy "Users can insert own watchlist" on public.watchlist
for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own watchlist" on public.watchlist;
create policy "Users can delete own watchlist" on public.watchlist
for delete to authenticated using ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
