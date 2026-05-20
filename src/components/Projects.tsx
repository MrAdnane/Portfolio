import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLang } from "@/lib/i18n";
import quoteImg from "@/assets/quote-machine.jpg";
import pomodoroImg from "@/assets/pomodoro.jpg";
import calculatorImg from "@/assets/calculator.jpg";

const data = [
  {
    link: "https://codepen.io/editor/Adnane-Mouloudi/pen/019e097b-3a78-7bd6-8588-3c1840ce8631",
    tech: ["HTML", "CSS", "JavaScript", "API"],
    image: quoteImg,
  },
  {
    link: "https://codepen.io/editor/Adnane-Mouloudi/pen/019e0c09-30cc-7c1e-aead-4fdb386ae406",
    tech: ["React", "CSS", "JavaScript"],
    image: pomodoroImg,
  },
  {
    link: "https://codepen.io/editor/Adnane-Mouloudi/pen/019e099d-227a-7d11-883f-8bb6496e2458",
    tech: ["React", "JavaScript", "CSS"],
    image: calculatorImg,
  },
];

export function Projects() {
  const { t } = useLang();
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-2"
        >
          {t.projects.heading}
        </motion.h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-16 rounded-full" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.projectsList.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-xl bg-card border border-border overflow-hidden glow-card transition-all"
            >
              <div className="h-44 bg-muted relative overflow-hidden">
                <img
                  src={data[i].image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent pointer-events-none" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {data[i].tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary border border-primary/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={data[i].link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {t.projects.viewCode} <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}