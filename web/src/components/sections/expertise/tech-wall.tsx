"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TechCategory {
  label: string;
  items: string[];
}

interface TechWallProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  categories: TechCategory[];
}

export function TechWall({
  eyebrow,
  title,
  subtitle,
  categories,
}: TechWallProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.label}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              className="flex flex-col"
            >
              <h3 className="text-xs font-semibold tracking-wider text-primary uppercase border-b border-border pb-3">
                {category.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-secondary/40 hover:bg-secondary/5 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
