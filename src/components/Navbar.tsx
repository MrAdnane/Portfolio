import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: t.nav.home },
    { id: "projects", label: t.nav.projects },
    { id: "skills", label: t.nav.skills },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("home")} className="text-xl font-bold text-primary glow-text tracking-tight">
          {t.logo}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm text-foreground/80 hover:text-primary transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all"
            >
              {l.label}
            </button>
          ))}
          <div className="flex items-center gap-1 ml-4 px-2 py-1 rounded-full border border-border bg-card">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 text-xs rounded-full transition-all ${
                lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`px-2 py-0.5 text-xs rounded-full transition-all ${
                lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              FR
            </button>
          </div>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4"
        >
          {links.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-foreground/80 hover:text-primary">
              {l.label}
            </button>
          ))}
          <div className="flex gap-2">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-xs rounded-full border border-border ${
                lang === "en" ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`px-3 py-1 text-xs rounded-full border border-border ${
                lang === "fr" ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              FR
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}