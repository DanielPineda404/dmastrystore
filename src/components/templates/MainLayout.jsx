import { Header } from "../organisms/Header";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        {children}
      </main>
      <footer className="border-t border-zinc-100 py-12 text-center text-zinc-400 text-sm">
        © 2026 Modern Store. Built with React & Tailwind.
      </footer>
    </div>
  );
};