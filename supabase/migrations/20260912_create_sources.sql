create table sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  type text not null
);
