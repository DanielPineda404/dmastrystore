import { Header } from "../organisms/Header.jsx";

export const MainLayout = ({ children, onNavigate }) => (
  <div className="min-h-screen bg-zinc-50">
    <Header onNavigate={onNavigate} />

    <main className="max-w-7xl mx-auto px-4 py-8">
      {children}
    </main>

    <footer className="py-12 border-t border-zinc-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
          © 2026 D'Mastry Store — Minimalist Design
        </p>
      </div>
    </footer>
  </div>
);