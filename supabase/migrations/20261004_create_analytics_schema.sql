-- =====================================================================
-- SUBVENTII.RO — PRODUCTION VISITOR INTELLIGENCE & ANALYTICS SCHEMA
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.analytics_visitors (
    id VARCHAR(32) PRIMARY KEY,
    first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    total_sessions INTEGER NOT NULL DEFAULT 1,
    total_pageviews INTEGER NOT NULL DEFAULT 1,
    total_events INTEGER NOT NULL DEFAULT 1,
    max_intent_score INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.analytics_sessions (
    id VARCHAR(32) PRIMARY KEY,
    visitor_id VARCHAR(32) NOT NULL REFERENCES public.analytics_visitors(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    landing_path VARCHAR(255) NOT NULL DEFAULT '/',
    exit_path VARCHAR(255) NOT NULL DEFAULT '/',
    page_views INTEGER NOT NULL DEFAULT 1,
    unique_pages INTEGER NOT NULL DEFAULT 1,
    event_count INTEGER NOT NULL DEFAULT 1,
    source VARCHAR(64) NOT NULL DEFAULT 'DIRECT',
    medium VARCHAR(64) NOT NULL DEFAULT 'none',
    campaign VARCHAR(128),
    content VARCHAR(128),
    term VARCHAR(128),
    referrer VARCHAR(255) NOT NULL DEFAULT 'Direct',
    device_type VARCHAR(32) NOT NULL DEFAULT 'Desktop',
    os VARCHAR(32) NOT NULL DEFAULT 'Unknown',
    browser VARCHAR(32) NOT NULL DEFAULT 'Unknown',
    viewport_width INTEGER,
    viewport_height INTEGER,
    language VARCHAR(32) NOT NULL DEFAULT 'ro-RO',
    timezone VARCHAR(64) NOT NULL DEFAULT 'Europe/Bucharest',
    country VARCHAR(64) NOT NULL DEFAULT 'România',
    region VARCHAR(64),
    city VARCHAR(64),
    intent_score INTEGER NOT NULL DEFAULT 0,
    intent_level VARCHAR(20) NOT NULL DEFAULT 'LOW',
    is_new_visitor BOOLEAN NOT NULL DEFAULT true,
    is_returning_visitor BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id VARCHAR(32) NOT NULL REFERENCES public.analytics_visitors(id) ON DELETE CASCADE,
    session_id VARCHAR(32) NOT NULL REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
    event_type VARCHAR(64) NOT NULL,
    pathname VARCHAR(255) NOT NULL,
    page_title VARCHAR(255),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.analytics_pageviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id VARCHAR(32) NOT NULL REFERENCES public.analytics_visitors(id) ON DELETE CASCADE,
    session_id VARCHAR(32) NOT NULL REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
    pathname VARCHAR(255) NOT NULL,
    page_title VARCHAR(255),
    referrer VARCHAR(255),
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.analytics_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id VARCHAR(32) NOT NULL REFERENCES public.analytics_visitors(id) ON DELETE CASCADE,
    session_id VARCHAR(32) NOT NULL REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
    query_normalized VARCHAR(255) NOT NULL,
    pathname VARCHAR(255) NOT NULL DEFAULT '/finantari',
    results_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.analytics_conversions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id VARCHAR(32) NOT NULL REFERENCES public.analytics_visitors(id) ON DELETE CASCADE,
    session_id VARCHAR(32) NOT NULL REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
    conversion_type VARCHAR(64) NOT NULL,
    pathname VARCHAR(255) NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.analytics_daily (
    date DATE PRIMARY KEY,
    total_visitors INTEGER NOT NULL DEFAULT 0,
    new_visitors INTEGER NOT NULL DEFAULT 0,
    returning_visitors INTEGER NOT NULL DEFAULT 0,
    total_sessions INTEGER NOT NULL DEFAULT 0,
    avg_duration_seconds INTEGER NOT NULL DEFAULT 0,
    avg_pages_per_session NUMERIC(5, 2) NOT NULL DEFAULT 0,
    top_sources JSONB NOT NULL DEFAULT '[]'::jsonb,
    top_locations JSONB NOT NULL DEFAULT '[]'::jsonb,
    top_programs JSONB NOT NULL DEFAULT '[]'::jsonb,
    top_sectors JSONB NOT NULL DEFAULT '[]'::jsonb,
    top_counties JSONB NOT NULL DEFAULT '[]'::jsonb,
    top_pages JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_downloads INTEGER NOT NULL DEFAULT 0,
    total_conversions JSONB NOT NULL DEFAULT '{}'::jsonb,
    high_intent_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.analytics_weekly (
    week_start DATE PRIMARY KEY,
    summary JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.analytics_security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(64) NOT NULL,
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(16) NOT NULL DEFAULT 'POST',
    visitor_id VARCHAR(32),
    reason VARCHAR(255) NOT NULL,
    ip_hash VARCHAR(64),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_visitors_last_seen ON public.analytics_visitors(last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_visitor_id ON public.analytics_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_started_at ON public.analytics_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_intent_score ON public.analytics_sessions(intent_score DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);

ALTER TABLE public.analytics_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_pageviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_weekly ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_security_events ENABLE ROW LEVEL SECURITY;
