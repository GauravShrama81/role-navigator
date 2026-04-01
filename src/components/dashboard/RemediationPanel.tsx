import { AnimatePresence, motion } from 'framer-motion';
import type { AIMappingSuggestion, Program } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Lightbulb, BookOpen, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface RemediationPanelProps {
  suggestion: AIMappingSuggestion | null;
  program: Program;
  onClose: () => void;
}

// Static remediation recommendations keyed by PLO code
const remediationDb: Record<string, {
  title: string;
  actions: { type: 'add_content' | 'revise_clo' | 'add_assessment' | 'scaffold'; label: string; detail: string; effort: 'Low' | 'Medium' | 'High' }[];
  rationale: string;
}> = {
  'PLO 1': {
    title: 'Healthcare Systems',
    rationale: 'This PLO has strong coverage. The rejected mapping may indicate the CLO is better aligned to a different outcome.',
    actions: [
      { type: 'revise_clo', label: 'Revise CLO wording', detail: 'Rewrite the CLO to explicitly reference healthcare system structures, financing, or governance.', effort: 'Low' },
      { type: 'add_assessment', label: 'Add a case study assessment', detail: 'Introduce a systems analysis case study in the relevant course to strengthen direct alignment.', effort: 'Medium' },
    ],
  },
  'PLO 2': {
    title: 'Ethics & Compliance',
    rationale: 'Coverage is adequate but could be strengthened with more applied ethics scenarios.',
    actions: [
      { type: 'add_content', label: 'Add compliance simulation', detail: 'Embed a HIPAA compliance scenario module into HADM 220.', effort: 'Medium' },
      { type: 'revise_clo', label: 'Clarify ethical framework focus', detail: 'Ensure the CLO explicitly names the ethical framework(s) being assessed.', effort: 'Low' },
    ],
  },
  'PLO 3': {
    title: 'Healthcare Finance',
    rationale: 'Developing coverage — this PLO needs additional practice and assessment touchpoints.',
    actions: [
      { type: 'add_content', label: 'Add DRG/capitation lab module', detail: 'Create a hands-on reimbursement calculation lab in HADM 210.', effort: 'Medium' },
      { type: 'add_assessment', label: 'Add financial analysis project', detail: 'Introduce a budget analysis capstone project spanning HADM 210 and HADM 301.', effort: 'High' },
      { type: 'scaffold', label: 'Scaffold financial concepts earlier', detail: 'Introduce basic healthcare finance terminology in HADM 101 as a foundation.', effort: 'Low' },
    ],
  },
  'PLO 4': {
    title: 'Leadership & Management',
    rationale: 'Adequate coverage exists but the rejected CLO may not demonstrate leadership application.',
    actions: [
      { type: 'revise_clo', label: 'Strengthen leadership verb', detail: 'Change CLO verb to "demonstrate" or "apply" leadership frameworks instead of "describe."', effort: 'Low' },
      { type: 'add_assessment', label: 'Add team-based simulation', detail: 'Introduce an interdisciplinary team leadership simulation in HADM 301.', effort: 'Medium' },
    ],
  },
  'PLO 5': {
    title: 'Quality & Patient Safety',
    rationale: 'Critical gap — only 22% coverage. This is the weakest PLO and needs urgent remediation.',
    actions: [
      { type: 'add_content', label: 'Create dedicated QI module', detail: 'Add a 2-week Quality Improvement module with PDSA cycles to HADM 310.', effort: 'High' },
      { type: 'add_assessment', label: 'Add patient safety case study', detail: 'Develop a root cause analysis assessment using sentinel event scenarios.', effort: 'Medium' },
      { type: 'scaffold', label: 'Introduce safety concepts in HADM 101', detail: 'Add patient safety awareness content as an early introduction.', effort: 'Low' },
      { type: 'add_content', label: 'Map CMS core measures', detail: 'Create content connecting HCAHPS and CMS quality measures to PLO 5.', effort: 'Medium' },
    ],
  },
  'PLO 6': {
    title: 'Health Informatics',
    rationale: 'Significant gap at 35% coverage. Health IT competency is increasingly critical for workforce readiness.',
    actions: [
      { type: 'add_content', label: 'Expand EHR module in HADM 320', detail: 'Add hands-on EHR navigation exercises and data analytics workflows.', effort: 'High' },
      { type: 'add_assessment', label: 'Add HIT competency assessment', detail: 'Create an assessment evaluating EHR data interpretation and clinical decision support usage.', effort: 'Medium' },
      { type: 'scaffold', label: 'Introduce HIT in earlier courses', detail: 'Add health informatics awareness content to HADM 101 and HADM 201.', effort: 'Low' },
    ],
  },
  'PLO 7': {
    title: 'Health Policy & Law',
    rationale: 'Adequate coverage but the rejected mapping may be tangential to policy/law focus.',
    actions: [
      { type: 'revise_clo', label: 'Sharpen policy focus', detail: 'Revise the CLO to explicitly reference federal/state legislation or regulatory agencies.', effort: 'Low' },
      { type: 'add_content', label: 'Add regulatory analysis module', detail: 'Introduce a state-level health policy analysis exercise in HADM 201.', effort: 'Medium' },
    ],
  },
};

const effortColor: Record<string, string> = {
  Low: 'bg-success/10 text-success border-success/20',
  Medium: 'bg-warning/10 text-warning border-warning/20',
  High: 'bg-destructive/10 text-destructive border-destructive/20',
};

const actionTypeIcon: Record<string, { icon: typeof BookOpen; label: string }> = {
  add_content: { icon: BookOpen, label: 'Add Content' },
  revise_clo: { icon: Sparkles, label: 'Revise CLO' },
  add_assessment: { icon: CheckCircle2, label: 'Add Assessment' },
  scaffold: { icon: ArrowRight, label: 'Scaffold' },
};

export function RemediationPanel({ suggestion, program, onClose }: RemediationPanelProps) {
  if (!suggestion) return null;

  const remediation = remediationDb[suggestion.ploCode] || {
    title: suggestion.ploCode,
    rationale: 'Review the mapping context and consider revising the CLO or adding supporting content.',
    actions: [
      { type: 'revise_clo' as const, label: 'Revise CLO wording', detail: 'Rewrite the CLO to better align with the target PLO.', effort: 'Low' as const },
    ],
  };

  const plo = program.plos.find((p) => p.code === suggestion.ploCode);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
      >
        <Card className="shadow-elevated border-warning/30 bg-warning/[0.02]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-warning" />
                Recommended Actions — {suggestion.ploCode}: {remediation.title}
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Context */}
            <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex-1 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Rejected Mapping</p>
                <p className="text-sm text-foreground">{suggestion.cloText}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px]">{suggestion.course}</Badge>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <Badge variant="secondary" className="text-[10px]">{suggestion.ploCode}</Badge>
                  <span className="text-xs text-muted-foreground">Confidence: {suggestion.confidence}%</span>
                </div>
              </div>
              {plo && (
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-foreground">{plo.coverage}%</p>
                  <p className="text-[10px] text-muted-foreground">PLO Coverage</p>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] mt-1 ${
                      plo.status === 'Gap' ? 'bg-destructive/10 text-destructive' :
                      plo.status === 'Developing' ? 'bg-warning/10 text-warning' :
                      'bg-success/10 text-success'
                    }`}
                  >
                    {plo.status}
                  </Badge>
                </div>
              )}
            </div>

            {/* Rationale */}
            <p className="text-sm text-muted-foreground leading-relaxed">{remediation.rationale}</p>

            {/* Actions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Recommended Actions</p>
              {remediation.actions.map((action, i) => {
                const typeInfo = actionTypeIcon[action.type] || actionTypeIcon.revise_clo;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:shadow-card transition-shadow"
                  >
                    <div className="flex-shrink-0 p-1.5 rounded-md bg-primary/8">
                      <typeInfo.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{action.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{action.detail}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <Badge variant="secondary" className={`text-[10px] ${effortColor[action.effort]}`}>
                        {action.effort} effort
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">{typeInfo.label}</Badge>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
