import { motion } from 'framer-motion';
import { workflowSteps, timelineEvents } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Circle, ArrowRight, Clock } from 'lucide-react';

export function WorkflowPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-display">Workflow & Scenarios</h1>
        <p className="text-muted-foreground mt-1">Visual step-by-step process for programmatic review and lifecycle tracking</p>
      </div>

      {/* Rapid Programmatic Review */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Rapid Programmatic Review</CardTitle>
          <p className="text-xs text-muted-foreground">Complete program analysis in under 4 hours — the primary usability benchmark</p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border hidden sm:block" />

            <div className="space-y-4">
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className={`relative flex items-start gap-4 p-4 rounded-xl border transition-all ${
                    step.status === 'active'
                      ? 'border-primary bg-primary/5 shadow-card'
                      : step.status === 'complete'
                      ? 'border-success/30 bg-success/3'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                    step.status === 'complete'
                      ? 'bg-success text-success-foreground'
                      : step.status === 'active'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.status === 'complete' ? <Check className="h-5 w-5" /> : step.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                      {step.status === 'active' && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">In Progress</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                    <Clock className="h-3 w-3" />
                    {step.duration}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowRight className="h-3.5 w-3.5 text-primary" />
              <span>Total estimated time: <strong className="text-foreground">~2.5 hours</strong> for a well-formed 10-course program</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Life of a Program Timeline */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Life of a Program Timeline</CardTitle>
          <p className="text-xs text-muted-foreground">Key curriculum review milestones across the program lifecycle</p>
        </CardHeader>
        <CardContent>
          <div className="relative py-4">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

            <div className="relative flex items-center justify-between">
              {timelineEvents.map((event, i) => {
                const colors: Record<string, string> = {
                  review: 'bg-primary text-primary-foreground',
                  milestone: 'bg-sky text-sky-foreground',
                  accreditation: 'bg-success text-success-foreground',
                };
                return (
                  <motion.div
                    key={event.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-2 relative"
                  >
                    <div className={`w-4 h-4 rounded-full border-2 border-card ${colors[event.type]}`} />
                    <div className="text-center">
                      <p className="text-xs font-semibold text-foreground">{event.date}</p>
                      <p className="text-[10px] text-muted-foreground max-w-[80px]">{event.title}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 pt-3 border-t border-border">
            {[
              { color: 'bg-primary', label: 'Review' },
              { color: 'bg-sky', label: 'Milestone' },
              { color: 'bg-success', label: 'Accreditation' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Credential Unbundling */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Credential Unbundling Workflow</CardTitle>
          <p className="text-xs text-muted-foreground">Identify learning objects for extraction into stackable credentials</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Browse & Search', desc: 'Search learning objectives and activities across the program', icon: '🔍' },
              { step: '2', title: 'Identify Candidates', desc: 'Flag LOs with broad applicability beyond single courses', icon: '🎯' },
              { step: '3', title: 'Export Inventory', desc: 'Generate a structured inventory for credential planning', icon: '📋' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-4 rounded-xl bg-muted/50 border border-border text-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-2">
                  {item.step}
                </div>
                <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
