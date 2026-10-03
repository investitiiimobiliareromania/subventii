-- =====================================================================
-- SUBVENTII.RO — PRODUCTION VISITOR INTELLIGENCE & ANALYTICS SCHEMA
-- PostGreSQL 14+ / Supabase with Row Level Security (RLS)
-- =====================================================================

-- 1. Visitors Table (Pseudonymized Identifier V-XXXXXX)
CREATE TABLE IF NOT EXISTS public.analytics_visitors (
    id VARCHAR(32) PRIMARY KEY, -- e.g. V-8F42A1
    first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    total_sessions INTEGER NOT NULL DEFAULT 1,
    total_pageviews INTEGER NOT NULL DEFAULT 1,
    total_events INTEGER NOT NULL DEFAULT 1,
    max_intent_score INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Sessions Table (Session Identifier S-XXXXXX)
CREATE TABLE IF NOT EXISTS public.analytics_sessions (
    id VARCHAR(32) PRIMARY KEY, -- e.g. S-19D7C4
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
    intent_level VARCHAR(20) NOT NULL DEFAULT 'LOW', -- LOW, MEDIUM, HIGH, VERY HIGH
    is_new_visitor BOOLEAN NOT NULL DEFAULT true,
    is_returning_visitor BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id VARCHAR(32) NOT NULL REFERENCES public.analytics_visitors(id) ON DELETE CASCADE,
    session_id VARCHAR(32) NOT NULL REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
    event_type VARCHAR(64) NOT NULL, -- PAGE_VIEW, PROGRAM_VIEW, SEARCH, RESOURCE_DOWNLOAD, etc.
    pathname VARCHAR(255) NOT NULL,
    page_title VARCHAR(255),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Pageviews Table
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

-- 5. Internal Searches Table
CREATE TABLE IF NOT EXISTS public.analytics_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id VARCHAR(32) NOT NULL REFERENCES public.analytics_visitors(id) ON DELETE CASCADE,
    session_id VARCHAR(32) NOT NULL REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
    query_normalized VARCHAR(255) NOT NULL,
    pathname VARCHAR(255) NOT NULL DEFAULT '/finantari',
    results_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Conversions & Key Actions Table
CREATE TABLE IF NOT EXISTS public.analytics_conversions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id VARCHAR(32) NOT NULL REFERENCES public.analytics_visitors(id) ON DELETE CASCADE,
    session_id VARCHAR(32) NOT NULL REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
    conversion_type VARCHAR(64) NOT NULL, -- CONTACT_SUBMIT, PHONE_CLICK, WHATSAPP_CLICK, RESOURCE_DOWNLOAD
    pathname VARCHAR(255) NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Daily Aggregated Intelligence
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

-- 8. Weekly Aggregated Intelligence
CREATE TABLE IF NOT EXISTS public.analytics_weekly (
    week_start DATE PRIMARY KEY,
    summary JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Security Events Table
CREATE TABLE IF NOT EXISTS public.analytics_security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(64) NOT NULL, -- RATE_LIMIT_TRIGGERED, UNAUTH_ADMIN_ACCESS, MALFORMED_PAYLOAD
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(16) NOT NULL DEFAULT 'POST',
    visitor_id VARCHAR(32),
    reason VARCHAR(255) NOT NULL,
    ip_hash VARCHAR(64),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- INDEXES FOR HIGH-PERFORMANCE QUERYING & RETENTION
-- =====================================================================
CREATE INDEX IF NOT EXISTS idx_analytics_visitors_last_seen ON public.analytics_visitors(last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_visitor_id ON public.analytics_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_started_at ON public.analytics_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_intent_score ON public.analytics_sessions(intent_score DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_source ON public.analytics_sessions(source);

CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_analytics_pageviews_session_id ON public.analytics_pageviews(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_pageviews_pathname ON public.analytics_pageviews(pathname);
CREATE INDEX IF NOT EXISTS idx_analytics_searches_query ON public.analytics_searches(query_normalized);
CREATE INDEX IF NOT EXISTS idx_analytics_conversions_type ON public.analytics_conversions(conversion_type);
CREATE INDEX IF NOT EXISTS idx_analytics_security_events_type ON public.analytics_security_events(event_type, created_at DESC);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================
ALTER TABLE public.analytics_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_pageviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_weekly ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_security_events ENABLE ROW LEVEL SECURITY;

-- Allow read access only to authenticated admin users via server queries
CREATE POLICY "Admins can view analytics" ON public.analytics_visitors
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can view sessions" ON public.analytics_sessions
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can view events" ON public.analytics_events
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can view pageviews" ON public.analytics_pageviews
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can view searches" ON public.analytics_searches
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can view conversions" ON public.analytics_conversions
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can view daily" ON public.analytics_daily
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can view weekly" ON public.analytics_weekly
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can view security" ON public.analytics_security_events
    FOR SELECT TO authenticated USING (true);

-- No public anon direct reads or updates allowed (All collection is strictly mediated via server-side /api/telemetry)
