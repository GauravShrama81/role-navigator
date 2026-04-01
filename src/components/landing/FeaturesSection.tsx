import { motion } from 'framer-motion';
import { Database, GitBranch, FileSearch, BarChart3, Map, Layers } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Custom Standards Management',
    description: 'Create, import, and version-control custom outcome sets. Maintain partner-level and global libraries with configurable hierarchical structures.',
  },
  {
    icon: FileSearch,
    title: 'LMS Cartridge Ingestion',
    description: 'Import IMS Common Cartridge files from Canvas, Brightspace, Blackboard, and Moodle. Full-text search across all ingested content.',
  },
  {
    icon: Map,
    title: 'Outcome Mapping Engine',
    description: 'Align CLOs to PLOs with configurable mapping scales. Support multi-level proficiency indicators and sub-outcome hierarchies.',
  },
  {
    icon: GitBranch,
    title: 'Workforce Competency Integration',
    description: 'Connect programs to BLS and Lightcast workforce data. Browse competencies by SOC code and demonstrate labor market alignment.',
  },
  {
    icon: BarChart3,
    title: 'Reports & Visualizations',
    description: 'Coverage gap reports, alignment heatmaps, program health summaries, and workforce alignment visuals — all exportable and partner-ready.',
  },
  {
    icon: Layers,
    title: 'Scenario Planning',
    description: 'Model alternative program structures in sandboxes. Compare scenarios side-by-side, identify gaps, and flag content for new development.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Capabilities</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need for curriculum intelligence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From data ingestion to partner-ready reporting, CIP provides a complete workflow for outcome alignment and programmatic review.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-primary/8 w-fit mb-4 group-hover:bg-primary/12 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
