import { useState } from 'react';
import { motion } from 'framer-motion';
import { scenarios } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, GitCompare, Layers, Sparkles, Package, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';

export function ScenariosPage() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [compareMode, setCompareMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = scenarios.filter((s) => typeFilter === 'all' || s.type === typeFilter);

  const typeLabels: Record<string, { label: string; color: string }> = {
    'credential-unbundling': { label: 'Credential Unbundling', color: 'bg-sky/10 text-sky border-sky/20' },
    'program-refresh': { label: 'Program Refresh', color: 'bg-success/10 text-success border-success/20' },
    'program-pathway': { label: 'New Pathway', color: 'bg-warning/10 text-warning border-warning/20' },
  };

  const statusColors: Record<string, string> = {
    draft: 'bg-muted text-muted-foreground',
    active: 'bg-primary/10 text-primary',
    shared: 'bg-success/10 text-success',
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Scenario Planning</h1>
          <p className="text-muted-foreground mt-1">Model alternative curriculum structures and credential pathways in a non-destructive sandbox</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={compareMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setCompareMode(!compareMode); setSelected([]); }}
            className="gap-1.5"
          >
            <GitCompare className="h-3.5 w-3.5" /> Compare
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New Scenario
          </Button>
        </div>
      </div>

      {compareMode && (
        <Card className="shadow-card border-primary/20 bg-primary/[0.02]">
          <CardContent className="py-4 px-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {selected.length === 0
                    ? 'Select 2 scenarios to compare side-by-side'
                    : selected.length === 1
                    ? 'Select 1 more scenario'
                    : 'Ready to compare'}
                </span>
              </div>
              {selected.length === 2 && (
                <Button size="sm" className="gap-1.5">
                  <ArrowRight className="h-3.5 w-3.5" /> View Comparison
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Type filter */}
      <div className="flex flex-wrap items-center gap-2">
        {['all', 'credential-unbundling', 'program-refresh', 'program-pathway'].map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              typeFilter === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/40'
            }`}
          >
            {t === 'all' ? 'All Types' : typeLabels[t]?.label || t}
          </button>
        ))}
      </div>

      {/* Scenario cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((scenario, i) => {
          const tl = typeLabels[scenario.type];
          const isSelected = selected.includes(scenario.id);
          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`shadow-card hover:shadow-elevated transition-all cursor-pointer ${
                  isSelected ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => compareMode && toggleSelect(scenario.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-foreground truncate">{scenario.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{scenario.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <Badge className={`text-xs capitalize ${statusColors[scenario.status]}`}>{scenario.status}</Badge>
                      <Badge variant="outline" className={`text-xs ${tl.color}`}>{tl.label}</Badge>
                    </div>
                  </div>

                  {/* Courses */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {scenario.courses.map((c) => (
                      <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <Package className="h-3 w-3 text-success" />
                        <span className="text-lg font-bold text-foreground font-display">{scenario.existingContentCount}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Existing Content</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-lg font-bold text-foreground font-display">{scenario.newContentCount}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">New Required</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <AlertTriangle className="h-3 w-3 text-warning" />
                        <span className="text-lg font-bold text-foreground font-display">{scenario.gapCount}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Gaps Found</p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">Created by {scenario.createdBy} · {scenario.createdDate}</p>
                    {!compareMode && (
                      <Button variant="ghost" size="sm" className="text-xs h-7 gap-1">
                        <BookOpen className="h-3 w-3" /> Open
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Sandbox Notice */}
      <Card className="shadow-card">
        <CardContent className="py-4 px-5 flex items-start gap-3">
          <Layers className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Sandbox Environment</p>
            <p className="text-xs text-muted-foreground">
              All scenarios are non-destructive — they reference existing courses and content items without duplicating or altering source data. Scenarios never write back to or modify LMS data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
