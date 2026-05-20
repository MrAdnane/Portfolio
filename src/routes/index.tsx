import { createFileRoute } from "@tanstack/react-router";
import { LangProvider, useLang } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Footer() {
  const { t } = useLang();
  return (
    <footer className="py-8 px-6 border-t border-border text-center text-sm text-muted-foreground">
      {t.footer}
    </footer>
  );
}

function Index() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Skills />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
