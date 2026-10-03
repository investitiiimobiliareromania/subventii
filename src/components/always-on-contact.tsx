"use client";

import { useState, useEffect, useRef } from "react";

const ROMANIAN_COUNTIES = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brașov",
  "Brăila", "București", "Buzău", "Caraș-Severin", "Călărași", "Cluj", "Constanța",
  "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu", "Gorj", "Harghita", "Hunedoara",
  "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț", "Olt",
  "Prahova", "Satu Mare", "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea",
  "Vaslui", "Vâlcea", "Vrancea"
];

export function AlwaysOnContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    county: "",
    programInterest: "",
    message: "",
    gdpr: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus trap / initial focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic Client Validation
    if (
      !formData.name.trim() ||
      !formData.company.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.county.trim() ||
      !formData.message.trim() ||
      !formData.gdpr
    ) {
      setErrorMsg("Vă rugăm să completați toate câmpurile obligatorii și să acceptați prelucrarea datelor.");
      return;
    }

    setIsSubmitting(true);

    try {
      let visitorId = "V-000000";
      let sessionId = "S-000000";
      try {
        if (typeof localStorage !== "undefined") {
          visitorId = localStorage.getItem("_subventii_vid") || visitorId;
        }
        if (typeof sessionStorage !== "undefined") {
          sessionId = sessionStorage.getItem("_subventii_sid") || sessionId;
        }
      } catch {
        // ignore
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          county: formData.county.trim(),
          programInterest: formData.programInterest.trim() || undefined,
          message: formData.message.trim(),
          gdpr: formData.gdpr,
          referrer: typeof window !== "undefined" ? window.location.pathname : "/contact",
          visitorId,
          sessionId,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "A apărut o eroare la trimiterea mesajului. Vă rugăm încercați din nou.");
        setIsSubmitting(false);
        return;
      }

      // Success
      setIsSuccess(true);
      setIsSubmitting(false);
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        county: "",
        programInterest: "",
        message: "",
        gdpr: false,
      });
    } catch {
      setErrorMsg("A apărut o eroare de rețea. Vă rugăm încercați din nou.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating CTA Trigger */}
      <button
        type="button"
        onClick={() => {
          setIsSuccess(false);
          setErrorMsg(null);
          setIsOpen(true);
        }}
        className="fixed bottom-24 right-5 z-40 group flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-2xl border border-slate-700/80 hover:bg-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer hover:scale-105 active:scale-95 focus-visible:outline-emerald-500"
        aria-label="Deschide formularul de contact direct"
        aria-haspopup="dialog"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-slate-100 group-hover:text-white">Contact &amp; Consultanță</span>
      </button>

      {/* Modal / Slide-over Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in-50 duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-3 duration-200 text-slate-900"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                  Cristian Văduva • AiX Subvenții
                </span>
                <h3 id="contact-modal-title" className="text-lg font-bold text-slate-900">
                  Contact &amp; Solicitare Consultanță
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trimiteți detaliile proiectului dumneavoastră pentru evaluare directă.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-slate-900"
                aria-label="Închide formularul"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-base font-bold text-slate-900">Solicitarea a fost trimisă cu succes!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Vă mulțumim pentru interes. Solicitarea dumneavoastră a fost înregistrată și veți fi contactat în cel mai scurt timp.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                >
                  Închide fereastra
                </button>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-red-700 font-medium text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="modal-contact-name" className="block font-semibold text-slate-700 mb-1">
                      Nume &amp; Prenume <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      id="modal-contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="ex. Ion Popescu"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-contact-company" className="block font-semibold text-slate-700 mb-1">
                      Companie / Fermă / PFA <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="modal-contact-company"
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="ex. SC Agro Farm SRL"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="modal-contact-phone" className="block font-semibold text-slate-700 mb-1">
                      Număr Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="modal-contact-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="ex. 0767 110 439"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-contact-email" className="block font-semibold text-slate-700 mb-1">
                      Adresă Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="modal-contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ex. ion.popescu@exemplu.ro"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="modal-contact-county" className="block font-semibold text-slate-700 mb-1">
                      Județ <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="modal-contact-county"
                      name="county"
                      required
                      value={formData.county}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none bg-white"
                    >
                      <option value="">Selectează județul...</option>
                      {ROMANIAN_COUNTIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="modal-contact-program" className="block font-semibold text-slate-700 mb-1">
                      Finanțare de Interes (Opțional)
                    </label>
                    <input
                      id="modal-contact-program"
                      type="text"
                      name="programInterest"
                      value={formData.programInterest}
                      onChange={handleChange}
                      placeholder="ex. DR-14, BISS, Casa Verde..."
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-contact-message" className="block font-semibold text-slate-700 mb-1">
                    Mesaj &amp; Descriere Proiect <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="modal-contact-message"
                    name="message"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descrieți pe scurt activitatea sau investiția pe care doriți să o finanțați..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="modal-contact-gdpr"
                    type="checkbox"
                    name="gdpr"
                    required
                    checked={formData.gdpr}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <label htmlFor="modal-contact-gdpr" className="text-[11px] text-slate-500 leading-tight">
                    Sunt de acord cu prelucrarea datelor în conformitate cu{" "}
                    <a href="/politica-de-confidentialitate" target="_blank" className="underline hover:text-slate-800">
                      Politica de Confidențialitate
                    </a>
                    . Datele sunt utilizate strict pentru procesarea acestei solicitări.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-emerald-800 px-4 py-2.5 font-bold text-white shadow-xs hover:bg-emerald-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-emerald-700"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        <span>Se trimite solicitarea...</span>
                      </>
                    ) : (
                      <span>Trimite Solicitarea de Consultanță →</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
