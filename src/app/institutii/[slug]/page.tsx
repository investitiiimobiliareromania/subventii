import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AiAssistantDrawer } from "@/components/ai-assistant-drawer";
import { institutionsCatalog } from "@/lib/institutii-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const inst = institutionsCatalog.find((i) => i.slug === slug);
  if (!inst) return { title: "Instituție Negăsită" };

  return {
    title: `${inst.name} (${inst.acronym}) | Profil Oficial`,
    description: inst.summary,
    alternates: { canonical: `https://subventii.ro/institutii/${slug}` },
  };
}

export default async function InstitutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const inst = institutionsCatalog.find((i) => i.slug === slug);
  if (!inst) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": inst.name,
    "alternateName": inst.acronym,
    "url": `https://${inst.officialDomain}`,
    "email": inst.supportEmail,
    "address": inst.address,
    "description": inst.summary,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-800">Acasă</Link>
            <span>/</span>
            <Link href="/institutii" className="hover:text-emerald-800">Instituții Publice</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">{inst.acronym}</span>
          </nav>

          <header className="mb-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 md:p-8 text-white">
            <span className="rounded bg-emerald-800 px-2.5 py-0.5 text-xs font-bold text-white mb-3 inline-block">
              {inst.acronym}
            </span>
            <h1 className="text-2xl font-extrabold sm:text-3xl leading-tight">
              {inst.name}
            </h1>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed max-w-3xl">
              {inst.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div><strong>Domeniu Web:</strong> <a href={`https://${inst.officialDomain}`} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{inst.officialDomain}</a></div>
              <div><strong>Email Suport:</strong> {inst.supportEmail}</div>
              <div><strong>Sediu:</strong> {inst.address}</div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <section className="rounded-xl border border-slate-200 p-6 bg-slate-50">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Responsabilități Principale</h2>
                <ul className="space-y-2 text-xs text-slate-700">
                  {inst.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {inst.faqs.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-slate-900 mb-3">Întrebări Frecvente Suport</h2>
                  <div className="space-y-3">
                    {inst.faqs.map((faq, i) => (
                      <div key={i} className="rounded-lg border border-slate-200 p-4 bg-white text-xs">
                        <h3 className="font-bold text-slate-900 mb-1">{faq.question}</h3>
                        <p className="text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Programe Monitorizate</h3>
                <p className="text-xs text-slate-600 mb-4">Această instituție administrează {inst.activeProgramsCount} de apeluri în catalogul Subvenții.ro.</p>
                <Link href="/programes" className="block text-center rounded-lg bg-emerald-800 py-2 text-xs font-bold text-white hover:bg-emerald-900">
                  Vezi Toate Finanțările →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <AiAssistantDrawer />
      <Footer />
    </div>
  );
}
