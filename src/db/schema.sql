-- Subventii.ro - Database Schema DDL
-- Compatible with PostgreSQL 14+ / Supabase

-- Enums
CREATE TYPE funding_status AS ENUM ('Deschis', 'În curând', 'Închis', 'Suspendat');
CREATE TYPE company_size AS ENUM ('Microîntreprindere', 'Întreprindere mică', 'Întreprindere mijlocie', 'IMM', 'Întreprindere mare', 'Toate mărimile');
CREATE TYPE company_age AS ENUM ('Nou înființată', 'Peste 1 an', 'Peste 2 ani', 'Peste 3 ani', 'Orice vechime');

-- Funding Programs Table
CREATE TABLE IF NOT EXISTS public.funding_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    acronym VARCHAR(50),
    short_summary TEXT NOT NULL,
    status funding_status NOT NULL DEFAULT 'În curând',
    deadline DATE NOT NULL,
    max_funding_eur NUMERIC(12, 2),
    max_funding_ron NUMERIC(12, 2),
    min_funding_ron NUMERIC(12, 2),
    cofinancing_percentage VARCHAR(100) NOT NULL,
    source VARCHAR(255) NOT NULL,
    official_url TEXT NOT NULL,
    business_types TEXT[] NOT NULL DEFAULT '{}',
    industries TEXT[] NOT NULL DEFAULT '{}',
    counties TEXT[] NOT NULL DEFAULT '{}',
    company_age company_age NOT NULL DEFAULT 'Orice vechime',
    company_size company_size NOT NULL DEFAULT 'IMM',
    eligibility JSONB NOT NULL DEFAULT '[]'::jsonb,
    documents JSONB NOT NULL DEFAULT '[]'::jsonb,
    timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
    faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Full text search index with Romanian dictionary
ALTER TABLE public.funding_programs ADD COLUMN IF NOT EXISTS fts tsvector 
GENERATED ALWAYS AS (
    to_tsvector('romanian', coalesce(title, '') || ' ' || coalesce(short_summary, '') || ' ' || coalesce(source, ''))
) STORED;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_funding_programs_slug ON public.funding_programs(slug);
CREATE INDEX IF NOT EXISTS idx_funding_programs_status ON public.funding_programs(status);
CREATE INDEX IF NOT EXISTS idx_funding_programs_deadline ON public.funding_programs(deadline);
CREATE INDEX IF NOT EXISTS idx_funding_programs_fts ON public.funding_programs USING GIN(fts);
CREATE INDEX IF NOT EXISTS idx_funding_programs_arrays ON public.funding_programs USING GIN(business_types, industries, counties);

-- Row Level Security (Public Read-Only Access)
ALTER TABLE public.funding_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.funding_programs
    FOR SELECT USING (true);
