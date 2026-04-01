import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiMappingSuggestions, type AIMappingSuggestion, programsList } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Sparkles, ArrowRight, Lightbulb, Edit, History, Layers } from 'lucide-react';
import { RemediationPanel } from '@/components/dashboard/RemediationPanel';

interface MappingHistoryEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  status: 'accepted' | 'rejected' | 'edited';
}

const mockHistory: MappingHistoryEntry[] = [
  { id: 'h1', timestamp: '2026-03-30 14:22', user: 'B. Cochran', action: 'Accepted: HADM 101 → PLO 3 (conf. 89%)', status: 'accepted' },
  { id: 'h2', timestamp: '2026-03-30 14:19', user: 'B. Cochran', action: 'Rejected: HADM 201 → PLO 5 (conf. 54%)', status: 'rejected' },
  { id: 'h3', timestamp: '2026-03-29 16:00', user: 'ATM Team', action: 'Bulk accepted 3 high-confidence mappings for Healthcare Administration', status: 'accepted' },
  { id: 'h4', timestamp: '2026-03-28 11:30', user: 'J. Mays', action: 'Manual override: PLO reassigned from PLO 4 → PLO 6 (ATM review)', status: 'edited' },
];

export function AIMappingPage() {
  const [suggestions, setSuggestions] = useState<AIMappingSuggestion[]>(aiMappingSuggestions);
  const [programFilter, setProgramFilter] = useState(programsList[0].id);
  const [courseFilter, setCourseFilter] = useState('all');
  const [ploFilter, setPloFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [remediationItem, setRemediationItem] = useState<AIMappingSuggestion | null>(null);
  const [editItem, setEditItem] = useState<AIMappingSuggestion | null>(null);
  const [editPlo, setEditPlo] = useState('');
  const [editLevel, setEditLevel] = useState('Assessed');
  const [editNotes, setEditNotes] = useState('');

  const program = programsList.find((p) => p.id === programFilter) || programsList[0];
  const courses = [...new Set(suggestions.map((s) => s.course))];
  const plos = [...new Set(suggestions.map((s) => s.ploCode))];

  const filtered = useMemo(() => {
    return suggestions.filter((s) => {
      if (courseFilter !== 'all' && s.course !== courseFilter) return false;
      if (ploFilter !== 'all' && s.ploCode !== ploFilter) return false;
      if (confidenceFilter === 'high' && s.confidence < 80) return false;
      if (confidenceFilter === 'medium' && (s.confidence < 50 || s.confidence >= 80)) return false;
      if (confidenceFilter === 'low' && s.confidence >= 50) return false;
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      return true;
    });
  }, [suggestions, courseFilter, ploFilter, confidenceFilter, statusFilter]);

  const accepted = suggestions.filter((s) => s.status === 'accepted').length;
  const rejected = suggestions.filter((s) => s.status === 'rejected').length;
  const pending = suggestions.filter((s) => s.status === 'pending').length;
  const reviewed = accepted + rejected;
  const progress = suggestions.length > 0 ? Math.round((reviewed / suggestions.length) * 100) : 0;

  const handleAction = (id: string, action: 'accepted' | 'rejected') => {
    setSuggestions((prev) => prev.map((s) => (s.id === id ? { ...s, status: action } : s)));
  };

  const handleBulkAction = (action: 'accepted' | 'rejected') => {
    setSuggestions((prev) => prev.map((s) => (s.status === 'pending' ? { ...s, status: action } : s)));
  };

  const handleBulkHighConfidence = () => {
    setSuggestions((prev) => prev.map((s) => (s.status === 'pending' && s.confidence >= 85 ? { ...s, status: 'accepted' } : s)));
  };

  const openEditDialog = (s: AIMappingSuggestion) => {
    setEditItem(s);
    setEditPlo(s.ploCode);
    setEditLevel('Assessed');
    setEditNotes('');
  };

  const handleSaveEdit = () => {
    if (editItem) {
      setSuggestions((prev) => prev.map((s) => s.id === editItem.id ? { ...s, ploCode: editPlo, status: 'accepted' as const } : s));
    }
    setEditItem(null);
  };

  const confidenceColor = (c: number) => c >= 80 ? 'text-success' : c >= 50 ? 'text-warning' : 'text-destructive';
  const confidenceBg = (c: number) => c >= 80 ? 'bg-success/10 border-success/20' : c >= 50 ? 'bg-warning/10 border-warning/20' : 'bg-destructive/10 border-destructive/20';

  const historyStatusColor: Record<string, string> = {
    accepted: 'bg-success/10 text-success',
    rejected: 'bg-destructive/10 text-destructive',
    edited: 'bg-primary/10 text-primary',
  };

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
          <Button variant="outline" size="sm" onClick={() => handleBulkAction('rejected')}>Reject All</Button>
          <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => handleBulkAction('accepted')}>Accept All</Button>
        </div>
      </div>

      {/* Stats with color */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total CLOs', value: suggestions.length, sub: `Across ${courses.length} courses`, bg: 'bg-primary/5 border-primary/20', color: 'text-primary' },
          { label: 'Pending Review', value: pending, sub: 'Awaiting decision', bg: 'bg-warning/5 border-warning/20', color: 'text-warning' },
          { label: 'Accepted', value: accepted, sub: 'Confirmed mappings', bg: 'bg-success/5 border-success/20', color: 'text-success' },
          { label: 'Rejected', value: rejected, sub: 'Returned for revision', bg: 'bg-destructive/5 border-destructive/20', color: 'text-destructive' },
        ].map((stat) => (
          <Card key={stat.label} className={`shadow-card border ${stat.bg}`}>
            <CardContent className="pt-4 pb-3 px-4">
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
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
            <span className="text-xs text-muted-foreground">AI Suggested · Human Approval Required</span>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="flex-1 h-2" />
            <span className="text-sm font-semibold text-foreground min-w-[40px]">Reviewed {progress}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <FilterSelect label="Program" value={programFilter} onValueChange={setProgramFilter}>
          {programsList.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
        </FilterSelect>
        <FilterSelect label="Course" value={courseFilter} onValueChange={setCourseFilter}>
          <SelectItem value="all">All courses</SelectItem>
          {courses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </FilterSelect>
        <FilterSelect label="PLO" value={ploFilter} onValueChange={setPloFilter}>
          <SelectItem value="all">All PLOs</SelectItem>
          {plos.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
        </FilterSelect>
        <FilterSelect label="Confidence" value={confidenceFilter} onValueChange={setConfidenceFilter}>
          <SelectItem value="all">All levels</SelectItem>
          <SelectItem value="high">High (&gt;80%)</SelectItem>
          <SelectItem value="medium">Medium (50–80%)</SelectItem>
          <SelectItem value="low">Low (&lt;50%)</SelectItem>
        </FilterSelect>
        <FilterSelect label="Status" value={statusFilter} onValueChange={setStatusFilter}>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </FilterSelect>
      </div>

      {/* Table */}
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
                        <span className={confidenceColor(suggestion.confidence)}>{suggestion.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center justify-center gap-1.5">
                        {suggestion.status === 'pending' ? (
                          <>
                            <Button size="sm" variant="outline" className="h-7 text-xs border-success/30 text-success hover:bg-success/10" onClick={() => handleAction(suggestion.id, 'accepted')}>
                              <Check className="h-3 w-3 mr-1" /> Accept
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => handleAction(suggestion.id, 'rejected')}>
                              <X className="h-3 w-3 mr-1" /> Reject
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => openEditDialog(suggestion)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </>
                        ) : suggestion.status === 'rejected' ? (
                          <div className="flex items-center gap-1.5">
                            <Badge variant="secondary" className="text-xs bg-destructive/10 text-destructive">✗ Rejected</Badge>
                            <Button size="sm" variant="outline" className="h-7 text-xs border-primary/30 text-primary hover:bg-primary/10" onClick={() => setRemediationItem(suggestion)}>
                              <Lightbulb className="h-3 w-3 mr-1" /> Remediate
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => openEditDialog(suggestion)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <Badge variant="secondary" className="text-xs bg-success/10 text-success">✓ Accepted</Badge>
                            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => openEditDialog(suggestion)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
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

      {/* Mapping History & Bulk Operations */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          <Tabs defaultValue="history">
            <div className="border-b border-border px-4 pt-3">
              <TabsList className="bg-transparent">
                <TabsTrigger value="history" className="gap-1.5"><History className="h-3.5 w-3.5" /> Mapping History</TabsTrigger>
                <TabsTrigger value="bulk" className="gap-1.5"><Layers className="h-3.5 w-3.5" /> Bulk Operations</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="history" className="p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Timestamp</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">User</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHistory.map((h) => (
                    <tr key={h.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-2.5 px-3 text-xs text-muted-foreground font-mono">{h.timestamp}</td>
                      <td className="py-2.5 px-3 text-sm font-medium text-foreground">{h.user}</td>
                      <td className="py-2.5 px-3 text-sm text-foreground">{h.action}</td>
                      <td className="py-2.5 px-3">
                        <Badge variant="secondary" className={`text-xs capitalize ${historyStatusColor[h.status]}`}>{h.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="bulk" className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-foreground">Bulk Mapping Operations</h3>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-primary">
                Bulk operations apply to all currently visible pending mappings. All changes are logged in the Audit Log.
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2 h-10" onClick={handleBulkHighConfidence}>
                  <Check className="h-4 w-4 text-success" /> Accept All High Confidence (≥85%)
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 h-10">
                  📋 Export Pending for External Review (CSV)
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 h-10 bg-warning/5 border-warning/30 text-warning hover:bg-warning/10">
                  🤖 Re-run AI Mapping for Current Program
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 h-10">
                  ➕ Manually Add Mapping
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Mapping Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Edit Mapping</DialogTitle>
            <p className="text-sm text-muted-foreground">Manually assign or modify the PLO alignment for this CLO</p>
          </DialogHeader>
          {editItem && (
            <div className="space-y-4 py-2">
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-foreground leading-relaxed">{editItem.cloText}</p>
                <Badge variant="secondary" className="mt-2 text-[10px]">{editItem.course}</Badge>
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Assign to PLO</Label>
                <Select value={editPlo} onValueChange={setEditPlo}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {program.plos.map((p) => <SelectItem key={p.code} value={p.code}>{p.code} — {p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Mapping Level</Label>
                <Select value={editLevel} onValueChange={setEditLevel}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Introduced">Introduced</SelectItem>
                    <SelectItem value="Practiced">Practiced</SelectItem>
                    <SelectItem value="Assessed">Assessed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Mapping Notes</Label>
                <Textarea
                  placeholder="Optional: justification for this mapping decision..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Mapping</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remediation Panel */}
      <RemediationPanel
        suggestion={remediationItem}
        program={program}
        onClose={() => setRemediationItem(null)}
      />
    </div>
  );
}

function FilterSelect({ label, value, onValueChange, children }: {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-medium">{label}:</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-8 w-auto min-w-[120px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}
