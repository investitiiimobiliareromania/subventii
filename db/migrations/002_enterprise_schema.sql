-- Subventii.ro - Enterprise Migration 002: Schema Expansion
-- Adds full tables for News Articles, Legislation, ANCPI Reports, Resources, Glossary, Alerts, Ingestion Queue, and Revision History.

CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content_md TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL DEFAULT 'Echipa Editorială Subvenții.ro',
    reading_time_min INT NOT NULL DEFAULT 5,
    impact_analysis TEXT,
    who_is_affected TEXT,
    official_documents JSONB DEFAULT '[]'::jsonb,
    institution_id UUID REFERENCES public.institutions(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status VARCHAR(50) NOT NULL DEFAULT 'Published'
);

CREATE TABLE IF NOT EXISTS public.legislative_changes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    act_type VARCHAR(50) NOT NULL, -- 'OUG', 'HG', 'Lege', 'Ordin'
    act_number VARCHAR(50) NOT NULL,
    publication_date TIMESTAMPTZ NOT NULL,
    effective_date TIMESTAMPTZ NOT NULL,
    summary TEXT NOT NULL,
    full_text_md TEXT NOT NULL,
    affected_sectors JSONB NOT NULL DEFAULT '[]'::jsonb,
    official_source_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ancpi_monthly_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_month VARCHAR(7) NOT NULL, -- '2026-07'
    county_code VARCHAR(10) NOT NULL,
    county_name VARCHAR(100) NOT NULL,
    individual_units_transacted INT NOT NULL DEFAULT 0,
    land_plots_transacted INT NOT NULL DEFAULT 0,
    total_transactions INT NOT NULL DEFAULT 0,
    avg_price_sqm_ron NUMERIC(10, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.downloadable_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    file_format VARCHAR(10) NOT NULL DEFAULT 'PDF',
    file_size_mb NUMERIC(5, 2) NOT NULL DEFAULT 1.20,
    download_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.glossary_terms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    term VARCHAR(150) NOT NULL,
    definition TEXT NOT NULL,
    example TEXT,
    category VARCHAR(100) NOT NULL,
    related_legislation JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.smart_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    county VARCHAR(100),
    caen_code VARCHAR(10),
    industry VARCHAR(100),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ingestion_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_authority VARCHAR(100) NOT NULL,
    item_type VARCHAR(50) NOT NULL, -- 'Programme', 'Legislation', 'Document'
    raw_title TEXT NOT NULL,
    source_url TEXT NOT NULL,
    detected_changes JSONB NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending Approval', -- 'Pending Approval', 'Approved', 'Rejected'
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.revision_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    version VARCHAR(20) NOT NULL,
    editor_user_id VARCHAR(100) NOT NULL,
    changes JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_legislative_changes_slug ON public.legislative_changes(slug);
CREATE INDEX IF NOT EXISTS idx_ancpi_reports_month ON public.ancpi_monthly_reports(report_month, county_code);
CREATE INDEX IF NOT EXISTS idx_glossary_slug ON public.glossary_terms(slug);
