-- Subventii.ro - Master Enterprise Seeders (002)

INSERT INTO public.articles (slug, title, summary, content_md, category, author, reading_time_min, impact_analysis, who_is_affected)
VALUES (
    'start-up-nation-2026-ghid-oficial',
    'Ghidul Oficial Start-Up Nation 2026: Buget de 400 Milioane Euro și Noi Condiții de Eligibilitate',
    'Ministerul Economiei a lansat consultarea publică pentru ediția 2026 a programului Start-Up Nation, aducând modificări majore la punctaj și cursuri obligatorii.',
    '# Ghidul Oficial Start-Up Nation 2026\n\nEdiția 2026 a programului Start-Up Nation vine cu noutăți majore pentru antreprenorii din România. Cu un buget total alocat de peste 400 milioane euro din fonduri europene și bugetul de stat, programul își propune finanțarea a peste 10.000 de întreprinderi mici și mijlocii noi.\n\n## Principalele Modificări\n- Grantul maxim este de 250.000 RON (aprox. 50.000 EUR).\n- Cofinanțare proprie minimă: 10%.\n- Obligativitatea absolvirii unui curs de competențe antreprenoriale înainte de înființarea firmei.',
    'SMEs',
    'Cristian Văduva',
    6,
    'Impact major asupra noilor antreprenori și absolvenților de studii superioare/tehnice care doresc înființarea unei firme.',
    'Persoane fizice neangajate, absolvenți de cursuri de formare profesională, viitori fondatori de SRL.'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.legislative_changes (slug, title, act_type, act_number, publication_date, effective_date, summary, full_text_md, affected_sectors, official_source_url)
VALUES (
    'oug-115-2026-facilitati-fiscale-imm',
    'OUG nr. 115/2026 privind modificarea Codului Fiscal și facilități pentru IMM-uri',
    'OUG',
    '115/2026',
    '2026-06-15',
    '2026-07-01',
    'Ordonanța de Urgență introduce scutiri de impozit pe profitul reinvestit în echipamente verzi și digitalizare.',
    '# OUG 115/2026 - Pachetul de Eficientizare Fiscală\n\nGuvernul României a aprobat OUG 115/2026 ce vizează facilități fiscale directe pentru firmele care investesc în echipamente industriale de înaltă eficiență energetică și sisteme fotovoltaice.',
    '["IMM", "Construcții", "Producție", "IT & digital"]',
    'https://monitoruloficial.ro'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.glossary_terms (slug, term, definition, example, category, related_legislation)
VALUES 
('de-minimis', 'Regula De Minimis', 'Plafonul maxim de ajutoare de stat pe care o întreprindere unică îl poate primi pe o perioadă de 3 ani consecutivi fără a fi necesară autorizarea Comisiei Europene (de regulă 300.000 EUR).', 'O firmă care a primit 100.000 EUR în 2024 mai are un plafon disponibil de 200.000 EUR până în 2027.', 'Finanțări Europene', '["Regulamentul UE 2023/2831"]')
ON CONFLICT (slug) DO NOTHING;
