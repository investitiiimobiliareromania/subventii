import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800 mb-4"></div>
        <p className="text-sm font-semibold text-slate-500">Se încarcă datele oficiale...</p>
      </main>
      <Footer />
    </div>
  );
}
