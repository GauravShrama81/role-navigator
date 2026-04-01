import { motion } from 'framer-motion';
import { Users, Compass, Briefcase, PenTool } from 'lucide-react';

const roles = [
  {
    icon: Users,
    title: 'ATM Team',
    color: 'bg-primary/10 text-primary',
    tasks: ['Import & manage outcome data', 'Run alignment analyses', 'Generate reports', 'Bulk cartridge uploads'],
  },
  {
    icon: Compass,
    title: 'Academic Program Strategists',
    color: 'bg-sky/10 text-sky',
    tasks: ['Consume reports & visualizations', 'Lead curriculum conversations', 'Identify credential opportunities', 'Browse learning objects'],
  },
  {
    icon: Briefcase,
    title: 'Managing Directors',
    color: 'bg-success/10 text-success',
    tasks: ['Access partner-facing summaries', 'View lifecycle visuals', 'Support re-engagement conversations', 'Portfolio overview'],
  },
  {
    icon: PenTool,
    title: 'Instructional Designers',
    color: 'bg-warning/10 text-warning',
    tasks: ['Reference alignment data', 'Document workforce relevance', 'Access Course Design Guides', 'View competency mappings'],
  },
];

export function RolesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">User Roles</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tailored views for every team member
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Each role gets a purpose-built experience, surfacing only the data and actions they need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border shadow-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-lg ${role.color}`}>
                  <role.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{role.title}</h3>
              </div>
              <ul className="space-y-2">
                {role.tasks.map((task) => (
                  <li key={task} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    {task}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
