import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

export function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const info = [
    { icon: Mail, value: "adn.mouloudi@gmail.com", href: "mailto:adn.mouloudi@gmail.com" },
    { icon: Phone, value: "+212 646 831 912", href: "tel:+212646831912" },
    { icon: MapPin, value: t.contact.location, href: null as string | null },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-2"
        >
          {t.contact.heading}
        </motion.h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-16 rounded-full" />
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {info.map((it, i) => {
              const Tag = it.href ? "a" : "div";
              return (
                <Tag
                  key={i}
                  {...(it.href ? { href: it.href } : {})}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/60 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <it.icon size={18} />
                  </div>
                  <span className="text-foreground/90">{it.value}</span>
                </Tag>
              );
            })}
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/MrAdnane"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-md border border-border hover:border-primary hover:text-primary flex items-center gap-2 transition-all"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/adnane-mouloudi/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-md border border-border hover:border-primary hover:text-primary flex items-center gap-2 transition-all"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-card border border-border glow-card space-y-4"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">{t.contact.name}</label>
              <input
                required
                placeholder={t.contact.placeholderName}
                className="w-full px-4 py-2 rounded-md bg-input border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">{t.contact.email}</label>
              <input
                type="email"
                required
                placeholder={t.contact.placeholderEmail}
                className="w-full px-4 py-2 rounded-md bg-input border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">{t.contact.message}</label>
              <textarea
                required
                rows={4}
                placeholder={t.contact.placeholderMessage}
                className="w-full px-4 py-2 rounded-md bg-input border border-border focus:border-primary focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary-glow transition-all glow-border"
            >
              <Send size={16} />
              {sent ? "✓" : t.contact.send}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}