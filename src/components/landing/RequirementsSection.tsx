import { motion } from 'framer-motion';
import { Shield, Lock, Gauge, ClipboardCheck, Eye, Globe } from 'lucide-react';

const requirements = [
  { icon: Shield, label: 'SOC 2 Type II', description: 'Full compliance with enterprise security standards' },
  { icon: Lock, label: 'Data Isolation', description: 'Partner data in fully isolated environments' },
  { icon: Gauge, label: '<5s Reports', description: 'Standard reports load in under 5 seconds' },
  { icon: ClipboardCheck, label: 'Audit Logging', description: 'All mapping decisions and imports tracked' },
  { icon: Eye, label: 'WCAG 2.1 AA', description: 'Accessible to all users, compliant with standards' },
  { icon: Globe, label: 'Browser-Based', description: 'No desktop install — any modern browser works' },
];

export function RequirementsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Non-Functional Requirements</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Enterprise-grade by design
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Built to meet the highest standards for security, performance, accessibility, and scalability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {requirements.map((req, i) => (
            <motion.div
              key={req.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card"
            >
              <div className="p-2 rounded-lg bg-primary/8">
                <req.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground text-sm">{req.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{req.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
