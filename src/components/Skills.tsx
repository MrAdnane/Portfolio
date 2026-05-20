import { motion } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const categories = {
  frontend: [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 88 },
    { name: "Bootstrap", level: 85 },
    { name: "Tailwind CSS", level: 85 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "PHP", level: 78 },
    { name: "Laravel", level: 82 },
    { name: "Python", level: 75 },
    { name: "Express.js", level: 78 },
  ],
  database: [
    { name: "MySQL", level: 85 },
    { name: "MongoDB", level: 80 },
  ],
  devops: [
    { name: "Git", level: 88 },
    { name: "GitHub", level: 90 },
    { name: "Docker", level: 70 },
  ],
};

type Cat = keyof typeof categories;

export function Skills() {
  const { t } = useLang();
  const [active, setActive] = useState<Cat>("frontend");
  const tabs: { key: Cat; label: string }[] = [
    { key: "frontend", label: t.skills.frontend },
    { key: "backend", label: t.skills.backend },
    { key: "database", label: t.skills.database },
    { key: "devops", label: t.skills.devops },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-2"
        >
          {t.skills.heading}
        </motion.h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                active === tab.key
                  ? "bg-primary text-primary-foreground border-primary glow-border"
                  : "border-border text-muted-foreground hover:text-primary hover:border-primary/50"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-70">{categories[tab.key].length}</span>
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {categories[active].map((s, i) => (
            <motion.div
              key={s.name + active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-foreground">{s.name}</span>
                <span className="text-primary font-mono">{s.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.level}%` }}
                  transition={{ duration: 1, delay: i * 0.07, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
                  style={{ boxShadow: "0 0 10px var(--primary)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}