import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-2"
        >
          {t.about.heading}
        </motion.h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-16 rounded-full" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/30 to-card border-2 border-primary/50 glow-border flex items-center justify-center text-7xl font-bold text-primary glow-text">
              AM
            </div>
            <div className="absolute -inset-4 rounded-full border border-primary/20 animate-pulse pointer-events-none" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t.about.text}</p>
            <a
              href="/CV_Mouloudi_Adnane.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary-glow transition-all glow-border"
            >
              <Download size={18} />
              {t.about.downloadCV}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}