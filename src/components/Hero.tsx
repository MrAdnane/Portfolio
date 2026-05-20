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

type Token = { t: string; c?: string };

function highlight(line: string): Token[] {
  // Tokenize with a single regex: keywords, strings, booleans, punctuation, identifiers
  const regex =
    /(\/\/[^\n]*)|('[^']*'|"[^"]*")|\b(function|const|let|return|true|false|null)\b|([A-Z][A-Za-z0-9_]*)|([a-zA-Z_][a-zA-Z0-9_]*)|([{}()\[\]<>;,=\/])|(\s+)/g;
  const tokens: Token[] = [];
  let m: RegExpExecArray | null;
  let last = 0;
  while ((m = regex.exec(line))) {
    if (m.index > last) tokens.push({ t: line.slice(last, m.index) });
    const [full, comment, str, kw, cap, id, punct, ws] = m;
    if (comment) tokens.push({ t: full, c: "text-muted-foreground/70 italic" });
    else if (str) tokens.push({ t: full, c: "text-amber-300" });
    else if (kw)
      tokens.push({
        t: full,
        c: kw === "true" || kw === "false" || kw === "null" ? "text-orange-400" : "text-fuchsia-400",
      });
    else if (cap) tokens.push({ t: full, c: "text-cyan-300" });
    else if (id) tokens.push({ t: full, c: "text-primary" });
    else if (punct) tokens.push({ t: full, c: "text-foreground/60" });
    else if (ws) tokens.push({ t: full });
    last = regex.lastIndex;
  }
  if (last < line.length) tokens.push({ t: line.slice(last) });
  return tokens;
}

function TypedCode({ lines, speed = 18 }: { lines: string[]; speed?: number }) {
  const full = lines.join("\n");
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    const id = setInterval(() => {
      setI((p) => {
        if (p >= full.length) {
          clearInterval(id);
          return p;
        }
        return p + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [full, speed]);

  const shown = full.slice(0, i);
  const done = i >= full.length;
  const shownLines = shown.split("\n");

  return (
    <pre className="font-mono text-[13px] leading-6 whitespace-pre">
      {shownLines.map((ln, idx) => (
        <div key={idx}>
          {highlight(ln).map((tok, k) => (
            <span key={k} className={tok.c}>
              {tok.t}
            </span>
          ))}
          {idx === shownLines.length - 1 && (
            <span
              className={`inline-block w-[7px] h-[14px] -mb-[2px] ml-[1px] bg-primary ${
                done ? "animate-pulse" : ""
              }`}
            />
          )}
        </div>
      ))}
    </pre>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const codeLines = [
    `function Developer() {`,
    `  const skills = ['${t.nav.skills}', '${t.nav.projects}'];`,
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
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-1.5, -2.5, -1.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-3xl" />
            <div className="relative rounded-xl border border-primary/40 bg-card/80 backdrop-blur p-6 glow-border overflow-hidden">
              <div className="flex gap-1.5 mb-4">
                <span className="w-3 h-3 rounded-full bg-destructive/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-primary/70" />
              </div>
              <TypedCode key={lang} lines={codeLines} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}