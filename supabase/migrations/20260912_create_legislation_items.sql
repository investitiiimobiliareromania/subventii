create table legislation_items (
  id uuid primary key default gen_random_uuid(),
  act_number text not null,
  act_type text not null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  published_at timestamp with time zone not null,
  source_id uuid references sources(id) not null,
  source_url text not null,
  category text not null,
  verified boolean default false,
  retrieved_at timestamp with time zone default now()
);
