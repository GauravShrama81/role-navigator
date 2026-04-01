import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiMappingSuggestions, type AIMappingSuggestion, programsList } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Check, X, ArrowLeft, Bot, User, Sparkles, ArrowRight } from 'lucide-react';

export function AIMappingPage() {
  const [suggestions, setSuggestions] = useState<AIMappingSuggestion[]>(aiMappingSuggestions);
  const [courseFilter, setCourseFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('pending');

  const program = programsList[0]; // Healthcare Administration, BS

  const courses = [...new Set(suggestions.map((s) => s.course))];

  const filtered = useMemo(() => {
    return suggestions.filter((s) => {
      if (courseFilter !== 'all' && s.course !== courseFilter) return false;
      if (confidenceFilter === 'high' && s.confidence < 80) return false;
      if (confidenceFilter === 'medium' && (s.confidence < 50 || s.confidence >= 80)) return false;
      if (confidenceFilter === 'low' && s.confidence >= 50) return false;
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      return true;
    });
  }, [suggestions, courseFilter, confidenceFilter, statusFilter]);

  const accepted = suggestions.filter((s) => s.status === 'accepted').length;
  const rejected = suggestions.filter((s) => s.status === 'rejected').length;
  const pending = suggestions.filter((s) => s.status === 'pending').length;
  const reviewed = accepted + rejected;
  const progress = suggestions.length > 0 ? Math.round((reviewed / suggestions.length) * 100) : 0;

  const handleAction = (id: string, action: 'accepted' | 'rejected') => {
    setSuggestions((prev) => prev.map((s) => (s.id === id ? { ...s, status: action } : s)));
  };

  const handleBulkAction = (action: 'accepted' | 'rejected') => {
    setSuggestions((prev) =>
      prev.map((s) => (s.status === 'pending' ? { ...s, status: action } : s))
    );
  };

  const confidenceColor = (c: number) =>
    c >= 80 ? 'text-success' : c >= 50 ? 'text-warning' : 'text-destructive';

  const confidenceBg = (c: number) =>
    c >= 80 ? 'bg-success/10 border-success/20' : c >= 50 ? 'bg-warning/10 border-warning/20' : 'bg-destructive/10 border-destructive/20';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" /> AI Mapping Engine
          </h1>
          <p className="text-muted-foreground mt-1">
            CLO → PLO alignment suggestions — {program.name} · Human approval required
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleBulkAction('rejected')}>
            Reject All
          </Button>
          <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => handleBulkAction('accepted')}>
            Accept All
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total CLOs', value: suggestions.length, sub: `Across ${courses.length} courses`, icon: '📋' },
          { label: 'Pending Review', value: pending, sub: 'Awaiting decision', icon: '⏳' },
          { label: 'Accepted', value: accepted, sub: 'Confirmed mappings', icon: '✅' },
          { label: 'Rejected', value: rejected, sub: 'Returned for revision', icon: '❌' },
        ].map((stat) => (
          <Card key={stat.label} className="shadow-card">
            <CardContent className="pt-4 pb-3 px-4">
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress */}
      <Card className="shadow-card">
        <CardContent className="py-4 px-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Review Progress — {program.name}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Bot className="h-3.5 w-3.5 text-primary" />
              <span>🤖 AI Suggested · Human Approval Required</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="flex-1 h-2" />
            <span className="text-sm font-semibold text-foreground min-w-[40px]">
              Reviewed {progress}%
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Course:</span>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="h-8 w-auto min-w-[180px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All courses</SelectItem>
              {courses.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Confidence:</span>
          <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
            <SelectTrigger className="h-8 w-auto min-w-[140px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="high">High (&gt;80%)</SelectItem>
              <SelectItem value="medium">Medium (50–80%)</SelectItem>
              <SelectItem value="low">Low (&lt;50%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-auto min-w-[120px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mapping suggestions table */}
      <Card className="shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Course Learning Outcome (CLO)</th>
                <th className="py-3 px-2 w-8"></th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Program Learning Outcome (PLO)</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground uppercase">Confidence</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((suggestion, i) => (
                  <motion.tr
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.03 }}
                    className={`border-b border-border/50 transition-colors ${
                      suggestion.status === 'accepted' ? 'bg-success/5' :
                      suggestion.status === 'rejected' ? 'bg-destructive/5' : 'hover:bg-muted/30'
                    }`}
                  >
                    <td className="py-4 px-4 max-w-[340px]">
                      <p className="text-sm text-foreground leading-relaxed">{suggestion.cloText}</p>
                      <Badge variant="secondary" className="mt-2 text-[10px]">{suggestion.course}</Badge>
                    </td>
                    <td className="py-4 px-2">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </td>
                    <td className="py-4 px-4 max-w-[300px]">
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="font-semibold text-primary">{suggestion.ploCode}:</span> {suggestion.ploText}
                      </p>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-semibold ${confidenceBg(suggestion.confidence)}`}>
                        <span className={confidenceColor(suggestion.confidence)}>
                          Confidence {suggestion.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center justify-center gap-2">
                        {suggestion.status === 'pending' ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs border-success/30 text-success hover:bg-success/10"
                              onClick={() => handleAction(suggestion.id, 'accepted')}
                            >
                              <Check className="h-3 w-3 mr-1" /> Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
                              onClick={() => handleAction(suggestion.id, 'rejected')}
                            >
                              <X className="h-3 w-3 mr-1" /> Reject
                            </Button>
                          </>
                        ) : (
                          <Badge variant="secondary" className={`text-xs ${
                            suggestion.status === 'accepted' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                          }`}>
                            {suggestion.status === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
                          </Badge>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">
            No suggestions match your current filters.
          </div>
        )}
      </Card>

      {/* KAI Chat bubble */}
      <Card className="shadow-card border-primary/20 bg-primary/[0.02]">
        <CardContent className="py-4 px-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-foreground">KAI — Mapping</span>
                <Badge variant="secondary" className="text-[10px]">{program.partner}</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I've analyzed the <strong className="text-foreground">{program.name}</strong> program at {program.partner}. <strong className="text-foreground">{suggestions.length} CLO→PLO suggestions</strong> are staged for ATM review.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                ⚠ <strong className="text-destructive">PLO 5 (Quality & Patient Safety)</strong> and <strong className="text-destructive">PLO 6 (Health Informatics)</strong> are critical gaps — both below 40% coverage. HADM 310 and HADM 320 can be strengthened to address these.
              </p>
              <p className="text-sm text-muted-foreground mt-2">All suggestions require your approval before finalizing.</p>
              <div className="flex items-center gap-2 mt-3">
                <Button variant="outline" size="sm" className="text-xs h-7">PLO 5 coverage gaps</Button>
                <Button variant="outline" size="sm" className="text-xs h-7">Why low confidence?</Button>
                <Button variant="outline" size="sm" className="text-xs h-7">Remediation suggestions</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
