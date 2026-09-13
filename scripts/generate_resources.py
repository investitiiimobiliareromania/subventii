import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

os.makedirs('public/resources', exist_ok=True)

# ----------------------------------------------------
# 1. GENERATE XLSX: MACHETA BUGET & CASHFLOW FERMA
# ----------------------------------------------------
wb = openpyxl.Workbook()

header_fill = PatternFill(start_color='064E3B', end_color='064E3B', fill_type='solid') # Emerald-900
sub_fill = PatternFill(start_color='047857', end_color='047857', fill_type='solid') # Emerald-700
light_fill = PatternFill(start_color='ECFDF5', end_color='ECFDF5', fill_type='solid') # Emerald-50
kpi_fill = PatternFill(start_color='0F172A', end_color='0F172A', fill_type='solid') # Slate-900

white_bold = Font(name='Calibri', size=11, bold=True, color='FFFFFF')
white_title = Font(name='Calibri', size=13, bold=True, color='FFFFFF')
bold_font = Font(name='Calibri', size=11, bold=True, color='0F172A')
regular_font = Font(name='Calibri', size=11, color='334155')
italic_note = Font(name='Calibri', size=9, italic=True, color='64748B')

thin_border = Border(
    left=Side(style='thin', color='E2E8F0'),
    right=Side(style='thin', color='E2E8F0'),
    top=Side(style='thin', color='E2E8F0'),
    bottom=Side(style='thin', color='E2E8F0')
)
double_bottom = Border(
    left=Side(style='thin', color='CBD5E1'),
    right=Side(style='thin', color='CBD5E1'),
    top=Side(style='thin', color='CBD5E1'),
    bottom=Side(style='double', color='0F172A')
)

# TAB 1: Sinteza
ws1 = wb.active
ws1.title = 'Sinteză & Ipoteze'
ws1.views.sheetView[0].showGridLines = True

ws1.merge_cells('A1:F1')
ws1['A1'] = 'INSTRUMENT FINANCIAR SUBVENȚII — CALCUL BUGET & CASHFLOW FERMĂ AGRICOLĂ'
ws1['A1'].font = white_title
ws1['A1'].fill = header_fill
ws1['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws1.row_dimensions[1].height = 35

ws1.merge_cells('A2:F2')
ws1['A2'] = 'Material de lucru orientativ elaborat de platforma SUBVENȚII (subventii.cristianvaduva.com). Nu este formular oficial AFIR și nu înlocuiește cerințele ghidului solicitantului.'
ws1['A2'].font = italic_note

headers_params = ['Parametru Proiect', 'Valoare', 'Unitate', 'Observații']
for col_num, h in enumerate(headers_params, 1):
    cell = ws1.cell(row=4, column=col_num, value=h)
    cell.font = white_bold
    cell.fill = sub_fill
    cell.alignment = Alignment(horizontal='center')

params_data = [
    ('Suprafață Totală Exploatație', 65, 'Hectare', 'Teren arabil în proprietate și arendă'),
    ('Investiție Totală Necesară (CAPEX)', 125000, 'EUR', 'Achiziție utilaje, irigații, spații stocare'),
    ('Plafon Grant Nerambursabil Solicitat', 50000, 'EUR', 'Sprijin public nerambursabil conform intervenție'),
    ('Intensitate Sprijin Nerambursabil', 0.85, '%', 'Procent sprijin public din cheltuieli eligibile'),
    ('Contribuție Financiară Proprie', 75000, 'EUR', 'Cofinanțare din fonduri proprii sau credit bancar'),
    ('Rată de Actualizare (Discount Rate)', 0.08, '%', 'Rata standard de actualizare financiară pentru calcul VAN'),
    ('Orizont de Prognoză', 5, 'Ani', 'Perioada standard de monitorizare a proiectului'),
    ('Curs de Schimb Valutar Estimativ', 5.00, 'RON/EUR', 'Curs orientativ utilizat în planificare')
]

for r_idx, (p_name, val, unit, obs) in enumerate(params_data, 5):
    ws1.cell(row=r_idx, column=1, value=p_name).font = regular_font
    c2 = ws1.cell(row=r_idx, column=2, value=val)
    c2.font = bold_font
    if unit == '%':
        c2.number_format = '0.0%'
    elif isinstance(val, (int, float)) and val >= 1000:
        c2.number_format = '#,##0'
    ws1.cell(row=r_idx, column=3, value=unit).font = regular_font
    ws1.cell(row=r_idx, column=4, value=obs).font = regular_font
    for col in range(1, 5):
        ws1.cell(row=r_idx, column=col).border = thin_border

# TAB 2: Venituri
ws2 = wb.create_sheet(title='Venituri')
ws2.views.sheetView[0].showGridLines = True
ws2.merge_cells('A1:I1')
ws2['A1'] = 'PROIECȚIA VENITURILOR DIN PRODUCȚIA VEGETALĂ & SUBVENȚII (EUR/AN)'
ws2['A1'].font = white_title
ws2['A1'].fill = header_fill
ws2['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws2.row_dimensions[1].height = 30

headers_v = ['Categorie Venit / Cultură', 'Suprafață (ha)', 'Randament (t/ha)', 'Preț (EUR/t)', 'An 1', 'An 2', 'An 3', 'An 4', 'An 5']
for col_num, h in enumerate(headers_v, 1):
    c = ws2.cell(row=3, column=col_num, value=h)
    c.font = white_bold
    c.fill = sub_fill
    c.alignment = Alignment(horizontal='center')

crops_data = [
    ('Grâu Comun de Toamnă', 25, 5.5, 190),
    ('Porumb Boabe', 20, 7.2, 175),
    ('Floarea-Soarelui', 12, 2.8, 410),
    ('Soia Boabe (Proteină Vegetală)', 8, 2.4, 430),
]

for r_idx, (crop, ha, yield_t, price) in enumerate(crops_data, 4):
    ws2.cell(row=r_idx, column=1, value=crop).font = regular_font
    ws2.cell(row=r_idx, column=2, value=ha).number_format = '#,##0'
    ws2.cell(row=r_idx, column=3, value=yield_t).number_format = '#,##0.0'
    ws2.cell(row=r_idx, column=4, value=price).number_format = '#,##0'
    for yr_col, yr_idx in enumerate(range(5, 10), 1):
        cell = ws2.cell(row=r_idx, column=yr_idx)
        growth = (yr_col - 1) * 0.02
        cell.value = f'=B{r_idx}*C{r_idx}*D{r_idx}*(1+{growth:.2f})'
        cell.number_format = '#,##0'
        cell.font = regular_font
        cell.border = thin_border

# Subventii APIA
ws2.cell(row=8, column=1, value='Subvenții APIA Directe (BISS + CRISS + Eco-Scheme)').font = bold_font
ws2.cell(row=8, column=2, value=65).number_format = '#,##0'
ws2.cell(row=8, column=3, value=1).number_format = '#,##0'
ws2.cell(row=8, column=4, value=220).number_format = '#,##0'
for yr_idx in range(5, 10):
    cell = ws2.cell(row=8, column=yr_idx, value='=B8*D8')
    cell.number_format = '#,##0'
    cell.font = bold_font
    cell.border = thin_border

# Total
ws2.cell(row=10, column=1, value='TOTAL VENITURI OPERAȚIONALE (EUR)').font = bold_font
for yr_idx in range(5, 10):
    col_letter = get_column_letter(yr_idx)
    cell = ws2.cell(row=10, column=yr_idx, value=f'=SUM({col_letter}4:{col_letter}8)')
    cell.font = bold_font
    cell.fill = light_fill
    cell.number_format = '#,##0'
    cell.border = double_bottom

# TAB 3: OPEX
ws3 = wb.create_sheet(title='Cheltuieli OPEX')
ws3.views.sheetView[0].showGridLines = True
ws3.merge_cells('A1:F1')
ws3['A1'] = 'CHELTUIELI DE EXPLOATARE & OPERARE (OPEX EUR/AN)'
ws3['A1'].font = white_title
ws3['A1'].fill = header_fill
ws3['A1'].alignment = Alignment(horizontal='center', vertical='center')

headers_opex = ['Articol de Cheltuială', 'An 1', 'An 2', 'An 3', 'An 4', 'An 5']
for col_num, h in enumerate(headers_opex, 1):
    c = ws3.cell(row=3, column=col_num, value=h)
    c.font = white_bold
    c.fill = sub_fill
    c.alignment = Alignment(horizontal='center')

opex_items = [
    ('Semințe certificate și material săditor', 6500),
    ('Îngrășăminte chimice și amendamente sol', 11500),
    ('Produse de protecția plantelor (fitosanitare)', 7200),
    ('Combustibil și lubrifianți (Motorină agricolă)', 8800),
    ('Servicii mecanizate externe & piese de schimb', 3500),
    ('Arendă teren agricol (40 ha arendă)', 7200),
    ('Forță de muncă & contribuții sociale', 9600),
    ('Asigurări culturi agricole (subvenționate)', 1800),
    ('Utilități, contabilitate, taxe locale', 2400)
]

for r_idx, (item, cost_yr1) in enumerate(opex_items, 4):
    ws3.cell(row=r_idx, column=1, value=item).font = regular_font
    for yr_col, yr_idx in enumerate(range(2, 7), 1):
        cell = ws3.cell(row=r_idx, column=yr_idx)
        inflation = (yr_col - 1) * 0.03
        cell.value = f'={cost_yr1}*(1+{inflation:.2f})'
        cell.number_format = '#,##0'
        cell.font = regular_font
        cell.border = thin_border

ws3.cell(row=14, column=1, value='TOTAL CHELTUIELI DE OPERARE (EUR)').font = bold_font
for yr_idx in range(2, 7):
    col_letter = get_column_letter(yr_idx)
    cell = ws3.cell(row=14, column=yr_idx, value=f'=SUM({col_letter}4:{col_letter}12)')
    cell.font = bold_font
    cell.fill = light_fill
    cell.number_format = '#,##0'
    cell.border = double_bottom

# TAB 4: Cont P&L
ws4 = wb.create_sheet(title='Cont P&L')
ws4.views.sheetView[0].showGridLines = True
ws4.merge_cells('A1:F1')
ws4['A1'] = 'CONTUL DE PROFIT ȘI PIERDERE (EUR/AN)'
ws4['A1'].font = white_title
ws4['A1'].fill = header_fill
ws4['A1'].alignment = Alignment(horizontal='center', vertical='center')

for col_num, h in enumerate(['Indicator Financiar', 'An 1', 'An 2', 'An 3', 'An 4', 'An 5'], 1):
    c = ws4.cell(row=3, column=col_num, value=h)
    c.font = white_bold
    c.fill = sub_fill
    c.alignment = Alignment(horizontal='center')

pl_rows = [
    (4, 'Venituri Totale din Exploatare', "=Venituri!E10", "=Venituri!F10", "=Venituri!G10", "=Venituri!H10", "=Venituri!I10"),
    (5, 'Cheltuieli Operaționale (OPEX)', "='Cheltuieli OPEX'!B14", "='Cheltuieli OPEX'!C14", "='Cheltuieli OPEX'!D14", "='Cheltuieli OPEX'!E14", "='Cheltuieli OPEX'!F14"),
    (6, 'EBITDA (Profit Operațional Brut)', "=B4-B5", "=C4-C5", "=D4-D5", "=E4-E5", "=F4-F5"),
    (7, 'Amortizarea Imobilizărilor (CAPEX / 10 ani)', "=12500", "=12500", "=12500", "=12500", "=12500"),
    (8, 'EBIT (Profit Operațional Net)', "=B6-B7", "=C6-C7", "=D6-D7", "=E6-E7", "=F6-F7"),
    (9, 'Impozit pe Venit Microîntreprindere (1%)', "=B4*0.01", "=C4*0.01", "=D4*0.01", "=E4*0.01", "=F4*0.01"),
    (10, 'PROFIT NET ANUAL (EUR)', "=B8-B9", "=C8-C9", "=D8-D9", "=E8-E9", "=F8-F9")
]

for r_idx, label, *formulas in pl_rows:
    c_lbl = ws4.cell(row=r_idx, column=1, value=label)
    if 'PROFIT' in label or 'EBITDA' in label:
        c_lbl.font = bold_font
    else:
        c_lbl.font = regular_font
    
    for c_idx, formula in enumerate(formulas, 2):
        c = ws4.cell(row=r_idx, column=c_idx, value=formula)
        c.number_format = '#,##0'
        c.border = thin_border
        if label.startswith('PROFIT NET'):
            c.font = bold_font
            c.fill = light_fill
            c.border = double_bottom
        elif 'EBITDA' in label:
            c.font = bold_font

# TAB 5: Cashflow & VAN
ws5 = wb.create_sheet(title='Cashflow & Indicatori')
ws5.views.sheetView[0].showGridLines = True
ws5.merge_cells('A1:G1')
ws5['A1'] = 'FLUXUL DE NUMERAR (CASHFLOW) & INDICATORI DE RENTABILITATE'
ws5['A1'].font = white_title
ws5['A1'].fill = header_fill
ws5['A1'].alignment = Alignment(horizontal='center', vertical='center')

for col_num, h in enumerate(['Element Cashflow', 'An 0 (Investiție)', 'An 1', 'An 2', 'An 3', 'An 4', 'An 5'], 1):
    c = ws5.cell(row=3, column=col_num, value=h)
    c.font = white_bold
    c.fill = sub_fill
    c.alignment = Alignment(horizontal='center')

ws5.cell(row=4, column=1, value='Investiție Inițială Totală (CAPEX Outflow)').font = bold_font
ws5.cell(row=4, column=2, value=-125000).number_format = '#,##0'
for col_idx in range(3, 8):
    ws5.cell(row=4, column=col_idx, value=0).number_format = '#,##0'

ws5.cell(row=5, column=1, value='Grant Nerambursabil Încasat (Grant Inflow)').font = bold_font
ws5.cell(row=5, column=2, value=50000).number_format = '#,##0'
for col_idx in range(3, 8):
    ws5.cell(row=5, column=col_idx, value=0).number_format = '#,##0'

ws5.cell(row=6, column=1, value='Flux Net din Exploatare (EBITDA - Impozit)').font = regular_font
ws5.cell(row=6, column=2, value=0).number_format = '#,##0'
ws5.cell(row=6, column=3, value="='Cont P&L'!B6-'Cont P&L'!B9").number_format = '#,##0'
ws5.cell(row=6, column=4, value="='Cont P&L'!C6-'Cont P&L'!C9").number_format = '#,##0'
ws5.cell(row=6, column=5, value="='Cont P&L'!D6-'Cont P&L'!D9").number_format = '#,##0'
ws5.cell(row=6, column=6, value="='Cont P&L'!E6-'Cont P&L'!E9").number_format = '#,##0'
ws5.cell(row=6, column=7, value="='Cont P&L'!F6-'Cont P&L'!F9").number_format = '#,##0'

ws5.cell(row=7, column=1, value='FLUX NET DE NUMERAR TOTAL (NET CASHFLOW)').font = bold_font
for col_idx in range(2, 8):
    col_letter = get_column_letter(col_idx)
    cell = ws5.cell(row=7, column=col_idx, value=f'=SUM({col_letter}4:{col_letter}6)')
    cell.font = bold_font
    cell.fill = light_fill
    cell.number_format = '#,##0'
    cell.border = double_bottom

ws5.cell(row=8, column=1, value='Sold Cumulat de Trezorerie (Cash Balance)').font = bold_font
ws5.cell(row=8, column=2, value='=B7').number_format = '#,##0'
for col_idx in range(3, 8):
    prev_col = get_column_letter(col_idx - 1)
    curr_col = get_column_letter(col_idx)
    cell = ws5.cell(row=8, column=col_idx, value=f'={prev_col}8+{curr_col}7')
    cell.font = bold_font
    cell.number_format = '#,##0'
    cell.border = thin_border

# Indicators
ws5.cell(row=11, column=1, value='INDICATOR FINANCIAR').font = white_bold
ws5.cell(row=11, column=1).fill = kpi_fill
ws5.cell(row=11, column=2, value='VALOARE CALCULATĂ').font = white_bold
ws5.cell(row=11, column=2).fill = kpi_fill
ws5.cell(row=11, column=3, value='INTERPRETARE ECONOMICĂ').font = white_bold
ws5.cell(row=11, column=3).fill = kpi_fill

kpis = [
    ('Valoarea Actualizată Netă (VAN / NPV la 8%)', '=B7+NPV(0.08, C7:G7)', 'EUR', 'Proiectul este viabil și generează valoare adăugată (VAN > 0)'),
    ('Rata Internă de Rentabilitate (RIR / IRR)', '=IRR(B7:G7)', '%', 'Rentabilitatea anuală a capitalului propriu investit'),
    ('Perioada de Recuperare a Investiției (Payback)', 2.8, 'Ani', 'Timpul estimat de recuperare a contribuției proprii din profituri'),
    ('Rentabilitatea Comercială (Marja Netă An 3)', "='Cont P&L'!D10/'Cont P&L'!D4", '%', 'Ponderea profitului net în totalul veniturilor')
]

for r_idx, (name, formula, unit, interp) in enumerate(kpis, 12):
    ws5.cell(row=r_idx, column=1, value=name).font = bold_font
    c2 = ws5.cell(row=r_idx, column=2, value=formula)
    c2.font = bold_font
    if unit == '%':
        c2.number_format = '0.0%'
    elif unit == 'EUR':
        c2.number_format = '#,##0 "EUR"'
    else:
        c2.number_format = '0.0 "Ani"'
    ws5.cell(row=r_idx, column=3, value=interp).font = regular_font
    for c in range(1, 4):
        ws5.cell(row=r_idx, column=c).border = thin_border

for sheet in wb.worksheets:
    for col in sheet.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        sheet.column_dimensions[col_letter].width = max(max_len + 4, 14)

wb.save('public/resources/macheta_buget_ferma.xlsx')
print('Created public/resources/macheta_buget_ferma.xlsx')

# ----------------------------------------------------
# 2. GENERATE DOCX: MODEL ORIENTATIV PLAN DE AFACERI
# ----------------------------------------------------
doc_pa = docx.Document()

# Title
p_title = doc_pa.add_heading('MODEL ORIENTATIV SUBVENȚII — PLAN DE AFACERI FERMĂ AGRICOLĂ', level=0)
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER

# Disclaimer Note
p_disc = doc_pa.add_paragraph()
p_disc.add_run('NOTĂ IMPORTANTĂ: ').bold = True
p_disc.add_run('Acest document reprezintă un material de lucru orientativ elaborat de platforma SUBVENȚII (subventii.cristianvaduva.com). Nu este formular oficial AFIR și nu înlocuiește cerințele sau anexele oficiale ale Ghidului Solicitantului aplicabil fiecărei măsuri/intervenții de finanțare.')
p_disc.runs[1].italic = True

doc_pa.add_heading('1. Date Generale Solicitant & Exploatație', level=1)
doc_pa.add_paragraph('• Denumire Societate / PFA / II / IF:\n• Cod Unic de Înregistrare (CUI / CIF) & Nr. Reg. Comerțului:\n• Sediul profesional / Localitatea de implementare:\n• Reprezentant legal (Nume, Prenume, Funcție):\n• Forma juridică & Vechime activitate:')

doc_pa.add_heading('2. Descrierea Situației Curente a Fermei', level=1)
doc_pa.add_paragraph('• Suprafața agricolă totală exploatată (ha) și regimul juridic (proprietate / contracte de arendare):\n• Structura culturilor agricole în ultimul an agricol:\n• Efective de animale (specie, rase, număr capete, înregistrare BND):\n• Dotarea tehnică existentă (tractoare, combine, utilaje agricole, an fabricație):\n• Spații de depozitare și procesare deținute:')

doc_pa.add_heading('3. Obiectivele Proiectului de Investiții', level=1)
doc_pa.add_paragraph('• Obiectivul general al investiției (modernizare fermă, achiziție utilaje, înființare plantație, etc.):\n• Obiective specifice (creșterea randamentului la hectar cu X%, reducerea costurilor de operare, diversificare):\n• Intervenția vizată (ex: DR-14, DR-30, DR-15, DR-20):\n• Valoarea totală estimată a investiției (EUR fără TVA) și ponderea grantului solicitat:')

doc_pa.add_heading('4. Planul Operațional & Calendarul de Implementare', level=1)
doc_pa.add_paragraph('• Etapa 1 (Luna 1–3): Proceduri de achiziție echipamente conform bazei de date de prețuri de referință AFIR;\n• Etapa 2 (Luna 4–6): Livrare utilaje, recepție tehnică și punere în funcțiune;\n• Etapa 3 (Luna 7–12): Efectuare lucrări agricole conform noului plan tehnologic;\n• Etapa 4 (Luna 13–24): Depunere cerere de plată a tranșei finale și atingerea țintelor de producție.')

doc_pa.add_heading('5. Sustenabilitate Financiară & Indicatori de Rezultat', level=1)
doc_pa.add_paragraph('• Cifra de afaceri prognozată la finalul implementării;\n• Numărul de locuri de muncă menținute / create;\n• Menținerea exploatației în stare de funcționare pe perioada de monitorizare post-implementare (3–5 ani).')

doc_pa.save('public/resources/model_orientativ_plan_afaceri_ferma.docx')
print('Created public/resources/model_orientativ_plan_afaceri_ferma.docx')

# ----------------------------------------------------
# 3. GENERATE DOCX: MODEL ORIENTATIV CONTRACT ARENDARE
# ----------------------------------------------------
doc_ar = docx.Document()

p_ar_t = doc_ar.add_heading('MODEL ORIENTATIV — CONTRACT DE ARENDARE TEREN AGRICOL', level=0)
p_ar_t.alignment = WD_ALIGN_PARAGRAPH.CENTER

p_ar_d = doc_ar.add_paragraph()
p_ar_d.add_run('NOTĂ JURIDICĂ: ').bold = True
p_ar_d.add_run('Prezentul model cadru are caracter exclusiv informativ și orientativ, fiind întocmit în conformitate cu prevederile Legii nr. 287/2009 privind Codul Civil (art. 1836–1850). Nu este formular oficial MADR și trebuie verificat și adaptat juridic înainte de semnare și înregistrare la Consiliul Local.')
p_ar_d.runs[1].italic = True

doc_ar.add_heading('Capitolul I. Părțile Contractante', level=1)
doc_ar.add_paragraph('Între subsemnatul/a ______________________, domiciliat/ă în ________________, posesor al CI seria ____ nr. ________, CNP ___________________, în calitate de ARENDATOR,\nși\nSocietatea / PFA ______________________, cu sediul în ________________, CUI ____________, reprezentată legal prin ________________, în calitate de ARENDAȘ,\ns-a încheiat prezentul contract de arendare.')

doc_ar.add_heading('Capitolul II. Obiectul Contractului', level=1)
doc_ar.add_paragraph('Art. 1. Arendatorul transmite arendașului dreptul de folosință și exploatare agricolă asupra suprafeței totale de _____ ha teren agricol situat în extravilanul / intravilanul localității ________________, județul ________________, identificat în Titlul de Proprietate / Extrasul CF nr. ________, Tarla _____, Parcelă _____.')

doc_ar.add_heading('Capitolul III. Durata Arendării', level=1)
doc_ar.add_paragraph('Art. 2. Prezentul contract se încheie pe o durată de _____ ani, începând cu data de ____________ și până la data de ____________.')

doc_ar.add_heading('Capitolul IV. Nivelul Arendei & Modalități de Plată', level=1)
doc_ar.add_paragraph('Art. 3. Arenda anuală este stabilită de comun acord la valoarea de _________ kg grâu/hectar (sau echivalentul în bani la prețul mediu al pieței locale la data plății) / _________ lei/hectar/an.\nArt. 4. Plata arendei se efectuează anual până la data de __________________ a fiecărui an agricol.')

doc_ar.add_heading('Capitolul V. Drepturile și Obligațiile Părților', level=1)
doc_ar.add_paragraph('Art. 5. Arendașul are dreptul de a depune cererea unică de plată la APIA și de a încasa subvențiile aferente suprafeței arendate conform reglementărilor europene și naționale în vigoare.\nArt. 6. Arendatorul garantează pe arendaș împotriva oricărei evicțiuni și declară pe proprie răspundere că terenul nu este grevat de sarcini sau litigii judiciare.')

doc_ar.add_heading('Capitolul VI. Înregistrarea Contractului', level=1)
doc_ar.add_paragraph('Art. 7. În conformitate cu art. 1838 din Codul Civil, prezentul contract se depune și se înregistrează în Registrul Special al Consiliului Local / Primăriei în a cărei rază teritorială se află terenul arendat.')

doc_ar.save('public/resources/model_orientativ_contract_arendare.docx')
print('Created public/resources/model_orientativ_contract_arendare.docx')
