import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function CTASection() {
  return (
    <section className="py-24 bg-hero relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-sky/8 blur-[100px]" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-foreground mb-4">
            Built for curriculum intelligence
          </h2>
          <p className="text-lg text-navy-foreground/70 mb-8 max-w-xl mx-auto">
            CIP transforms how Risepoint teams manage outcome alignment, gap analysis, and workforce relevance across the entire partner portfolio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#features"
              className="inline-flex items-center justify-center bg-sky/15 text-sky-foreground hover:bg-sky/25 border border-sky/20 px-6 h-10 text-sm font-semibold rounded-md transition-colors"
            >
              Explore Features
            </a>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center border border-navy-foreground/20 text-navy-foreground hover:bg-navy-foreground/5 px-6 h-10 text-sm rounded-md transition-colors"
            >
              Launch Application
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
