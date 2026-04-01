import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
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

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild size="lg" className="bg-sky hover:bg-sky/90 text-sky-foreground px-8 h-12 text-base font-semibold shadow-lg shadow-sky/25">
              <Link to="/dashboard">
                Enter Platform <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-navy-foreground/20 text-navy-foreground hover:bg-navy-foreground/5 h-12 text-base">
              <a href="#features">Explore Features</a>
            </Button>
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
      </div>
    </section>
  );
}
