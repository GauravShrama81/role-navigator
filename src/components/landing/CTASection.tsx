import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
            Ready to explore?
          </h2>
          <p className="text-lg text-navy-foreground/70 mb-8 max-w-xl mx-auto">
            Switch between roles, explore visual reports, and see how CIP transforms curriculum data into actionable intelligence.
          </p>
          <Button asChild size="lg" className="bg-sky hover:bg-sky/90 text-sky-foreground px-10 h-12 text-base font-semibold shadow-lg shadow-sky/25">
            <Link to="/dashboard">
              Launch Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
