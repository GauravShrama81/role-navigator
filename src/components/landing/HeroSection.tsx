import { motion } from 'framer-motion';
import { BarChart3, Shield, Zap, ArrowRight, Bot, User, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero min-h-[90vh] flex items-center">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-sky/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-sky/15 border border-sky/20">
              <span className="w-2 h-2 rounded-full bg-sky animate-pulse" />
              <span className="text-sm font-medium text-sky-foreground/90">Curriculum Intelligence Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-foreground leading-[1.1] tracking-tight mb-6">
              Transform curriculum data into{' '}
              <span className="text-sky">strategic insight</span>
            </h1>

            <p className="text-lg sm:text-xl text-navy-foreground/70 mb-10 max-w-2xl leading-relaxed">
              Import, align, and analyze program outcomes across your entire partner portfolio.
              Surface gaps, demonstrate workforce relevance, and drive evidence-based curriculum decisions — all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#features"
                className="inline-flex items-center justify-center bg-sky hover:bg-sky/90 text-sky-foreground px-8 h-12 text-base font-semibold shadow-lg shadow-sky/25 rounded-md transition-colors"
              >
                Explore Features <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#requirements"
                className="inline-flex items-center justify-center border border-navy-foreground/20 text-navy-foreground hover:bg-navy-foreground/5 h-12 px-6 text-base rounded-md transition-colors"
              >
                View Requirements
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Zap, label: 'Rapid Review', desc: 'Full program analysis in under 4 hours' },
                { icon: BarChart3, label: 'Visual Reports', desc: 'Heatmaps, gap analysis, and health summaries' },
                { icon: Shield, label: 'Secure & Isolated', desc: 'Partner-level data isolation guaranteed' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className="flex items-start gap-3 text-navy-foreground/80"
                >
                  <div className="mt-0.5 p-2 rounded-lg bg-sky/15">
                    <item.icon className="h-4 w-4 text-sky" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-navy-foreground">{item.label}</p>
                    <p className="text-xs text-navy-foreground/60">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Data Mapping Flow Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-2xl border border-navy-foreground/10 bg-navy-foreground/[0.03] backdrop-blur-sm p-6 space-y-4">
              {/* Title */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <span className="text-xs text-navy-foreground/40 ml-2 font-mono">cip — mapping-engine</span>
              </div>

              {/* Step 1: Ingestion */}
              <MappingStep
                step={1}
                label="LMS Cartridge Ingestion"
                detail="Canvas · Blackboard · D2L · Moodle"
                type="auto"
                delay={0.4}
              />

              {/* Step 2: AI Mapping */}
              <MappingStep
                step={2}
                label="AI-Powered CLO → PLO Alignment"
                detail="12 suggestions · 87% avg confidence"
                type="ai"
                delay={0.6}
              />

              {/* Step 3: Human Review */}
              <MappingStep
                step={3}
                label="Human-in-the-Loop Validation"
                detail="Accept, reject, or remediate mappings"
                type="human"
                delay={0.8}
              />

              {/* Step 4: Reports */}
              <MappingStep
                step={4}
                label="Reports & Gap Analysis"
                detail="Heatmaps · Coverage · Workforce fit"
                type="auto"
                delay={1.0}
              />

              {/* Mini heatmap visual */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-4 pt-4 border-t border-navy-foreground/10"
              >
                <p className="text-[10px] uppercase tracking-wider text-navy-foreground/30 mb-2 font-semibold">Sample Alignment Matrix</p>
                <div className="grid grid-cols-7 gap-1">
                  {[92, 80, 62, 68, 22, 35, 70].map((v, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="h-6 rounded-sm mb-1"
                        style={{
                          backgroundColor: v >= 75 ? 'hsl(152 60% 42% / 0.6)' : v >= 50 ? 'hsl(38 92% 50% / 0.5)' : 'hsl(0 72% 51% / 0.5)',
                        }}
                      />
                      <span className="text-[9px] text-navy-foreground/40 font-mono">{v}%</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[9px] text-navy-foreground/40"><span className="w-2 h-2 rounded-sm bg-success/60" /> Strong</span>
                  <span className="flex items-center gap-1 text-[9px] text-navy-foreground/40"><span className="w-2 h-2 rounded-sm bg-warning/60" /> Developing</span>
                  <span className="flex items-center gap-1 text-[9px] text-navy-foreground/40"><span className="w-2 h-2 rounded-sm bg-destructive/60" /> Gap</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MappingStep({ step, label, detail, type, delay }: {
  step: number;
  label: string;
  detail: string;
  type: 'ai' | 'human' | 'auto';
  delay: number;
}) {
  const typeConfig = {
    ai: { icon: Bot, badge: 'AI', color: 'bg-sky/20 text-sky border-sky/30' },
    human: { icon: User, badge: 'Human', color: 'bg-warning/20 text-warning border-warning/30' },
    auto: { icon: CheckCircle2, badge: 'Auto', color: 'bg-success/20 text-success border-success/30' },
  };
  const cfg = typeConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 p-3 rounded-lg bg-navy-foreground/[0.04] border border-navy-foreground/[0.06]"
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-sky/15 flex items-center justify-center text-xs font-bold text-sky">
        {step}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-navy-foreground leading-tight">{label}</p>
        <p className="text-[11px] text-navy-foreground/50 truncate">{detail}</p>
      </div>
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.color} flex items-center gap-1`}>
        <cfg.icon className="h-3 w-3" />
        {cfg.badge}
      </span>
    </motion.div>
  );
}
