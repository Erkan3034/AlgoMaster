-- =============================================
-- ALGO MASTER - SUPABASE DATABASE SCHEMA
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: data_structures
-- =============================================
CREATE TABLE IF NOT EXISTS data_structures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Box',
    complexity JSONB NOT NULL DEFAULT '{}',
    definition TEXT NOT NULL,
    use_cases TEXT[] NOT NULL DEFAULT '{}',
    pros TEXT[] NOT NULL DEFAULT '{}',
    cons TEXT[] NOT NULL DEFAULT '{}',
    visual_explanation TEXT NOT NULL DEFAULT '',
    code_example TEXT NOT NULL DEFAULT '',
    experiment_scenario TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_data_structures_slug ON data_structures(slug);

-- =============================================
-- TABLE: algorithms
-- =============================================
CREATE TABLE IF NOT EXISTS algorithms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Code',
    category TEXT NOT NULL CHECK (category IN ('sorting', 'searching', 'graph')),
    time_complexity JSONB NOT NULL DEFAULT '{}',
    space_complexity TEXT NOT NULL DEFAULT 'O(1)',
    definition TEXT NOT NULL,
    steps TEXT[] NOT NULL DEFAULT '{}',
    visual_diagram TEXT NOT NULL DEFAULT '',
    input_output_examples JSONB NOT NULL DEFAULT '[]',
    code_implementation TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_algorithms_slug ON algorithms(slug);
CREATE INDEX IF NOT EXISTS idx_algorithms_category ON algorithms(category);

-- =============================================
-- TABLE: glossary_terms
-- =============================================
CREATE TABLE IF NOT EXISTS glossary_terms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    term TEXT NOT NULL,
    definition TEXT NOT NULL,
    related_terms TEXT[] NOT NULL DEFAULT '{}',
    category TEXT NOT NULL DEFAULT 'General',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for term search
CREATE INDEX IF NOT EXISTS idx_glossary_terms_term ON glossary_terms(term);

-- =============================================
-- TABLE: faq_items
-- =============================================
CREATE TABLE IF NOT EXISTS faq_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for category
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category);

-- =============================================
-- FUNCTION: Auto-update updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_data_structures_updated_at
    BEFORE UPDATE ON data_structures
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_algorithms_updated_at
    BEFORE UPDATE ON algorithms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_glossary_terms_updated_at
    BEFORE UPDATE ON glossary_terms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_items_updated_at
    BEFORE UPDATE ON faq_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- RLS POLICIES (Row Level Security)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE data_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE algorithms ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ: Everyone can read
CREATE POLICY "public_read_data_structures" ON data_structures
    FOR SELECT USING (true);

CREATE POLICY "public_read_algorithms" ON algorithms
    FOR SELECT USING (true);

CREATE POLICY "public_read_glossary_terms" ON glossary_terms
    FOR SELECT USING (true);

CREATE POLICY "public_read_faq_items" ON faq_items
    FOR SELECT USING (true);

-- ADMIN WRITE: Only authenticated users can insert/update/delete
CREATE POLICY "admin_insert_data_structures" ON data_structures
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_data_structures" ON data_structures
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_data_structures" ON data_structures
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_insert_algorithms" ON algorithms
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_algorithms" ON algorithms
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_algorithms" ON algorithms
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_insert_glossary_terms" ON glossary_terms
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_glossary_terms" ON glossary_terms
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_glossary_terms" ON glossary_terms
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_insert_faq_items" ON faq_items
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "admin_update_faq_items" ON faq_items
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "admin_delete_faq_items" ON faq_items
    FOR DELETE USING (auth.role() = 'authenticated');

-- =============================================
-- DONE! Tables and policies created.
-- =============================================

