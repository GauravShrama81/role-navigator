import { motion } from 'framer-motion';
import { useState } from 'react';
import { Shield, Lock, Gauge, ClipboardCheck, Eye, Globe, Database, FileSearch, Map, GitBranch, BarChart3, Layers, Check, AlertCircle, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Priority = 'Must Have' | 'Should Have' | 'Nice to Have';

interface Requirement {
  requirement: string;
  priority: Priority;
  status: 'confirmed' | 'partial' | 'roadmap';
}

interface Category {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  requirements: Requirement[];
}

const categories: Category[] = [
  {
    id: 'standards',
    icon: Database,
    title: 'Standards & Outcome Set Management',
    description: 'Define, import, and manage custom sets of standards and competencies with hierarchical structures.',
    requirements: [
      { requirement: 'Create & manage custom outcome sets', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Import outcome sets via CSV / Excel / JSON', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Partner-level outcome set libraries', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Risepoint global outcome set library', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Configurable mapping scales (presence/absence + proficiency)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Version control for outcome sets', priority: 'Should Have', status: 'confirmed' },
      { requirement: 'Configurable hierarchical outcome structures (variable depth)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Reporting at all levels of outcome hierarchy', priority: 'Must Have', status: 'confirmed' },
    ],
  },
  {
    id: 'ingestion',
    icon: FileSearch,
    title: 'Curriculum Data Ingestion',
    description: 'Import course cartridges from all major LMS platforms with full parsing and search.',
    requirements: [
      { requirement: 'IMS Common Cartridge import', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Thin Common Cartridge import', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Canvas cartridge compatibility', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Brightspace D2L cartridge compatibility', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Blackboard Learn / Ultra cartridge compatibility', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Moodle cartridge compatibility', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Bulk cartridge upload (10+ courses)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Single-session ingestion benchmark (<4 hrs for 10 courses)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Data provenance tracking (source, import date, version)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Full-text search across ingested content', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Live LMS API integration', priority: 'Nice to Have', status: 'roadmap' },
    ],
  },
  {
    id: 'mapping',
    icon: Map,
    title: 'Outcome Mapping Engine',
    description: 'Align course-level content, objectives, and assessments to program and external outcomes.',
    requirements: [
      { requirement: 'Map CLOs to PLOs (including sub-outcome level)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Map assessments & content to CLOs', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Configurable mapping scales per outcome set', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Multi-level proficiency indicators', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Map multiple outcome sets to a single program', priority: 'Must Have', status: 'confirmed' },
    ],
  },
  {
    id: 'workforce',
    icon: GitBranch,
    title: 'Workforce Competency Integration',
    description: 'Connect programs to labor market data and demonstrate workforce relevance.',
    requirements: [
      { requirement: 'BLS Occupational Outlook data integration', priority: 'Should Have', status: 'confirmed' },
      { requirement: 'Lightcast competency and skills data', priority: 'Should Have', status: 'partial' },
      { requirement: 'Browse / search competencies by SOC code or discipline', priority: 'Should Have', status: 'confirmed' },
      { requirement: 'Map workforce competencies to PLOs / CLOs', priority: 'Should Have', status: 'confirmed' },
      { requirement: 'Competency coverage in alignment reports', priority: 'Should Have', status: 'confirmed' },
    ],
  },
  {
    id: 'reporting',
    icon: BarChart3,
    title: 'Reporting & Visualization',
    description: 'Actionable reports and visualizations for internal teams and partner conversations.',
    requirements: [
      { requirement: 'Coverage Gap Report', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Overmapping Report', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Redundancy & Gaps Report', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Alignment Heatmap', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Heatmap filtering at all hierarchy levels', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Cross-listed course inclusion/exclusion in reports', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Program Health Summary (partner-facing)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Workforce Alignment Report', priority: 'Should Have', status: 'confirmed' },
      { requirement: 'Life of a Program Timeline visual', priority: 'Should Have', status: 'confirmed' },
      { requirement: 'User-configurable course sort order', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Report configuration (show/hide courses, standards, scales)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'PDF & PowerPoint export', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'CSV export of outcome sets & alignment mapping', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Visualizations interpretable without training', priority: 'Must Have', status: 'confirmed' },
    ],
  },
  {
    id: 'scenario',
    icon: Layers,
    title: 'Scenario Planning',
    description: 'Model alternative curriculum structures and stackable credentials without modifying live data.',
    requirements: [
      { requirement: 'Scenario sandbox (non-destructive, no LMS writeback)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Model new program pathways from existing courses', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Gap identification for proposed new programs', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Side-by-side scenario comparison', priority: 'Should Have', status: 'confirmed' },
      { requirement: 'New development vs. existing content flagging', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Save, name & share scenarios within team', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Surface LOs and activities for credential unbundling', priority: 'Must Have', status: 'confirmed' },
    ],
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Data Security & Architecture',
    description: 'Enterprise-grade security, accessibility, and performance standards.',
    requirements: [
      { requirement: 'Partner-level data isolation (architectural, not config)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Tenant isolation enforced at data layer', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'SOC 2 Type II compliance', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Role-based access control (RBAC)', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Full audit logging', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'WCAG 2.1 AA accessibility', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'Reports load <5 seconds', priority: 'Must Have', status: 'confirmed' },
      { requirement: 'All major modern browsers — no desktop install', priority: 'Must Have', status: 'confirmed' },
    ],
  },
];

const priorityColors: Record<Priority, string> = {
  'Must Have': 'bg-primary/10 text-primary border-primary/20',
  'Should Have': 'bg-sky/10 text-sky border-sky/20',
  'Nice to Have': 'bg-muted text-muted-foreground border-border',
};

const statusIcons: Record<string, { icon: typeof Check; color: string; label: string }> = {
  confirmed: { icon: Check, color: 'text-success', label: 'Implemented' },
  partial: { icon: AlertCircle, color: 'text-warning', label: 'Partial' },
  roadmap: { icon: Globe, color: 'text-muted-foreground', label: 'Roadmap' },
};

type FilterType = 'all' | Priority;

export function RequirementsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<FilterType>('all');

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    requirements: cat.requirements.filter(
      (r) => priorityFilter === 'all' || r.priority === priorityFilter
    ),
  }));

  const displayedCategories = activeCategory
    ? filteredCategories.filter((c) => c.id === activeCategory)
    : filteredCategories;

  const totalReqs = categories.reduce((sum, c) => sum + c.requirements.length, 0);
  const mustHaveCount = categories.reduce((sum, c) => sum + c.requirements.filter((r) => r.priority === 'Must Have').length, 0);
  const confirmedCount = categories.reduce((sum, c) => sum + c.requirements.filter((r) => r.status === 'confirmed').length, 0);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Platform Requirements</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built to meet every requirement
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {totalReqs} requirements across {categories.length} categories — {confirmedCount} implemented, {mustHaveCount} classified as Must Have.
          </p>
        </motion.div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
          {[
            { label: 'Total Requirements', value: totalReqs },
            { label: 'Must Have', value: mustHaveCount },
            { label: 'Implemented', value: confirmedCount },
          ].map((s) => (
            <div key={s.label} className="text-center p-3 rounded-xl bg-card border border-border shadow-card">
              <p className="text-2xl font-bold text-primary font-display">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Priority filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs font-medium text-muted-foreground mr-1">Priority:</span>
          {(['all', 'Must Have', 'Should Have', 'Nice to Have'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setPriorityFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                priorityFilter === f
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40'
              }`}
            >
              {f === 'all' ? 'All Priorities' : f}
            </button>
          ))}
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs font-medium text-muted-foreground mr-1">Category:</span>
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              activeCategory === null
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary/40'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40'
              }`}
            >
              <cat.icon className="h-3 w-3" />
              {cat.title.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* Requirements grid */}
        <div className="space-y-8">
          {displayedCategories.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/8">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {cat.requirements.length} items
                </Badge>
              </div>

              {cat.requirements.length === 0 ? (
                <p className="text-sm text-muted-foreground italic pl-12">No requirements match current filter.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 sm:pl-12">
                  {cat.requirements.map((req, ri) => {
                    const st = statusIcons[req.status];
                    return (
                      <motion.div
                        key={req.requirement}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ri * 0.03 }}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:shadow-card transition-shadow"
                      >
                        <st.icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${st.color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-card-foreground leading-snug">{req.requirement}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${priorityColors[req.priority]}`}>
                              {req.priority}
                            </span>
                            <span className={`text-[10px] ${st.color}`}>{st.label}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
