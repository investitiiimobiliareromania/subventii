-- Subventii.ro - Production Master Seed Data
-- Seed Migration 001

-- 1. Seed Public Authorities
INSERT INTO public.institutions (id, slug, name, acronym, official_domain, support_email) VALUES
('b2a1a8c9-4b62-4f1d-9f4a-1a2b3c4d5e6f', 'mipe', 'Ministerul Investițiilor și Proiectelor Europene', 'MIPE', 'mfe.gov.ro', 'contact@mfe.gov.ro'),
('c3b2a9d0-5c73-5f2e-0a5b-2b3c4d5e6f7a', 'ministerul-economiei', 'Ministerul Economiei, Antreprenoriatului și Turismului', 'MEAT', 'economie.gov.ro', 'presa@economie.gov.ro'),
('d4c3b0e1-6d84-6f3f-1b6c-3c4d5e6f7a8b', 'afir', 'Agenția pentru Finanțarea Investițiilor Rurale', 'AFIR', 'afir.ro', 'relatii.publice@afir.ro'),
('e5d4c1f2-7e95-7f4a-2c7d-4d5e6f7a8b9c', 'afm', 'Administrația Fondului pentru Mediu', 'AFM', 'afm.ro', 'comunicare@afm.ro'),
('f6e5d2a3-8f06-8f5b-3d8e-5e6f7a8b9c0d', 'adr-nord-vest', 'Agenția de Dezvoltare Regională Nord-Vest', 'ADR NV', 'nord-vest.ro', 'secretariat@nord-vest.ro'),
('a7f6e3b4-9a17-9f6c-4e9f-6f7a8b9c0d1e', 'adr-centru', 'Agenția de Dezvoltare Regională Centru', 'ADR Centru', 'regio-adrcentru.ro', 'office@adrcentru.ro')
ON CONFLICT (slug) DO NOTHING;

-- 2. Seed Master CAEN REV 2 Codes (Sample High-Frequency Sectors)
INSERT INTO public.caen_codes (code, name, section, section_name) VALUES
('6201', 'Activități de realizare a softului la comandă (software orientat client)', 'J', 'Informații și comunicații'),
('6202', 'Activități de consultanță în tehnologia informației', 'J', 'Informații și comunicații'),
('6203', 'Activități de management (gestiune și exploatare) a mijloacelor de calcul', 'J', 'Informații și comunicații'),
('6209', 'Alte activități de servicii privind tehnologia informației', 'J', 'Informații și comunicații'),
('6311', 'Prelucrarea datelor, administrarea paginilor web și activități conexe', 'J', 'Informații și comunicații'),
('0111', 'Cultivarea cerealelor (exclusiv orez), plantelor leguminoase și a plantelor producătoare de semințe oleaginoase', 'A', 'Agricultură, silvicultură și pescuit'),
('0113', 'Cultivarea legumelor și a pepenilor, a rădăcinoaselor și tuberculilor', 'A', 'Agricultură, silvicultură și pescuit'),
('0121', 'Cultivarea strugurilor', 'A', 'Agricultură, silvicultură și pescuit'),
('5610', 'Restaurante', 'I', 'Comerț / HoReCa'),
('5510', 'Hoteliere și alte facilități de cazare similare', 'I', 'Comerț / HoReCa'),
('2511', 'Fabricarea de construcții metalice și părți componente ale structurilor metalice', 'C', 'Industria prelucrătoare'),
('4120', 'Lucrări de construcții a clădirilor rezidențiale și nerezidențiale', 'F', 'Construcții')
ON CONFLICT (code) DO NOTHING;
