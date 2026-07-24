-- Subventii.ro - Production Database DDL Migration (PostgreSQL 16)
-- Migration 001: Initial Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Core Enums
CREATE TYPE funding_status AS ENUM (
    'Draft', 
    'Public Consultation', 
    'Official Guide Approved', 
    'Opening Soon', 
    'Applications Open', 
    'Call Suspended', 
    'Call Closed', 
    'Evaluation Stage', 
    'Contracting', 
    'Archived'
);

CREATE TYPE payment_mechanism AS ENUM ('Pre-finanțare', 'Decontare', 'Mixt');
CREATE TYPE doc_category AS ENUM ('Ghid Principal', 'Anexă', 'Corrigendum', 'Clarificare', 'Ordin Oficial');
CREATE TYPE company_age_enum AS ENUM ('Orice vechime', 'Nou înființată', 'Peste 1 an', 'Peste 2 ani', 'Peste 3 ani');
CREATE TYPE company_size_enum AS ENUM ('Microîntreprindere', 'Întreprindere mică', 'Întreprindere mijlocie', 'IMM', 'Întreprindere mare', 'Toate mărimile');

-- 1. Public Institutions / Authorities
CREATE TABLE IF NOT EXISTS public.institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    acronym VARCHAR(50) NOT NULL,
    official_domain VARCHAR(255) NOT NULL,
    support_email VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Master Funding Programs
CREATE TABLE IF NOT EXISTS public.funding_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    acronym VARCHAR(50),
    short_summary TEXT NOT NULL,
    overview_md TEXT NOT NULL,
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE RESTRICT,
    status funding_status NOT NULL DEFAULT 'Draft',
    total_budget_eur NUMERIC(15, 2),
    min_score_required INT DEFAULT 0 CHECK (min_score_required BETWEEN 0 AND 100),
    company_age company_age_enum NOT NULL DEFAULT 'Orice vechime',
    company_size company_size_enum NOT NULL DEFAULT 'IMM',
    payment_mechanism payment_mechanism NOT NULL DEFAULT 'Decontare',
    de_minimis_flag BOOLEAN NOT NULL DEFAULT true,
    all_caen_eligible BOOLEAN NOT NULL DEFAULT false,
    national_coverage BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 3. Operational Program Calls (Editions/Sessions)
CREATE TABLE IF NOT EXISTS public.program_calls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID NOT NULL REFERENCES public.funding_programs(id) ON DELETE CASCADE,
    edition_name VARCHAR(150) NOT NULL,
    consultation_date TIMESTAMPTZ,
    published_date TIMESTAMPTZ,
    launch_date TIMESTAMPTZ,
    deadline_date TIMESTAMPTZ NOT NULL,
    max_funding_ron NUMERIC(12, 2) NOT NULL,
    max_funding_eur NUMERIC(12, 2),
    min_funding_ron NUMERIC(12, 2),
    cofinancing_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    allocated_budget_ron NUMERIC(15, 2),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Master CAEN Codes Table
CREATE TABLE IF NOT EXISTS public.caen_codes (
    code VARCHAR(10) PRIMARY KEY,
    name TEXT NOT NULL,
    section VARCHAR(5) NOT NULL,
    section_name TEXT NOT NULL
);

-- 5. Program <-> CAEN Codes Junction Table
CREATE TABLE IF NOT EXISTS public.program_caen (
    program_id UUID NOT NULL REFERENCES public.funding_programs(id) ON DELETE CASCADE,
    caen_code VARCHAR(10) NOT NULL REFERENCES public.caen_codes(code) ON DELETE RESTRICT,
    PRIMARY KEY (program_id, caen_code)
);

-- 6. Program <-> Counties Junction Table
CREATE TABLE IF NOT EXISTS public.program_counties (
    program_id UUID NOT NULL REFERENCES public.funding_programs(id) ON DELETE CASCADE,
    county_code VARCHAR(10) NOT NULL,
    PRIMARY KEY (program_id, county_code)
);

-- 7. Official Attached Documents
CREATE TABLE IF NOT EXISTS public.official_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID NOT NULL REFERENCES public.funding_programs(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category doc_category NOT NULL DEFAULT 'Ghid Principal',
    current_version VARCHAR(20) NOT NULL DEFAULT '1.0',
    file_url TEXT NOT NULL,
    file_hash_sha256 VARCHAR(64) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Immutable System Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID REFERENCES public.funding_programs(id) ON DELETE SET NULL,
    admin_user_id VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    changes JSONB NOT NULL,
    justification TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Romanian Full-Text Search Vector Column
ALTER TABLE public.funding_programs ADD COLUMN IF NOT EXISTS fts tsvector 
GENERATED ALWAYS AS (
    to_tsvector('romanian', unaccent(coalesce(title, '') || ' ' || coalesce(acronym, '') || ' ' || coalesce(short_summary, '')))
) STORED;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_funding_programs_slug ON public.funding_programs(slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_funding_programs_status ON public.funding_programs(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_funding_programs_fts ON public.funding_programs USING GIN(fts);
CREATE INDEX IF NOT EXISTS idx_funding_programs_trgm ON public.funding_programs USING GIN(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_program_calls_deadline ON public.program_calls(deadline_date) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_program_caen_code ON public.program_caen(caen_code);
CREATE INDEX IF NOT EXISTS idx_program_counties_code ON public.program_counties(county_code);
