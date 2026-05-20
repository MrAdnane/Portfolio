import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

function Typed({ text }: { text: string }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span>
      {out}
      <span className="inline-block w-[2px] h-[1em] bg-primary align-middle ml-1 animate-pulse" />
    </span>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const codeLines = [
    `function Developer() {`,
    `  const skills = ['View Skills', 'View Projects'];`,
    `  const passion = 'Creating amazing web experiences';`,
    ``,
    `  return (`,
    `    <Developer`,
    `      isAvailable={true}`,
    `      lookingFor="Exciting projects"`,
    `    />`,
    `  );`,
    `}`,
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 hero-radial" />
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-muted-foreground mb-3 text-lg">{t.hero.greeting}</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2">
            <span className="text-foreground">{t.hero.name.split(" ")[0]} </span>
            <span className="text-primary glow-text">{t.hero.name.split(" ").slice(1).join(" ")}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground/90 mt-4 mb-3 min-h-[2.5rem]">
            <Typed key={lang + "title"} text={t.hero.title} />
          </h2>
          <p className="text-primary/90 font-medium mb-4">{t.hero.subtitle}</p>
          <p className="text-muted-foreground max-w-md mb-8">{t.hero.description}</p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary-glow transition-all glow-border"
            >
              {t.hero.contact}
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 py-3 border border-primary/50 text-primary rounded-md font-semibold hover:bg-primary/10 transition-all"
            >
              {t.hero.viewProjects}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-xl border border-primary/30 bg-card/80 backdrop-blur p-6 glow-border font-mono text-sm">
            <div className="flex gap-1.5 mb-4">
              <span className="w-3 h-3 rounded-full bg-destructive/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-primary/70" />
            </div>
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="text-primary/90"
              >
                <span className="text-muted-foreground mr-3">{i + 1}</span>
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}