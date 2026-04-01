import { useState } from 'react';
import { motion } from 'framer-motion';
import { outcomeSets, sampleHierarchy, type OutcomeHierarchy } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Search, Plus, Upload, Download, ChevronRight, ChevronDown, Database, Globe, Building2, FileText, ArrowRight } from 'lucide-react';

interface VersionEntry {
  version: string;
  date: string;
  changes: string;
  current?: boolean;
}

const versionHistory: VersionEntry[] = [
  { version: 'v2.1', date: 'Mar 2026', changes: 'Added Generative AI sub-competency; updated Ethical AI definitions', current: true },
  { version: 'v2.0', date: 'Nov 2025', changes: 'Major revision — added Agentic AI and Responsible AI pillars' },
  { version: 'v1.3', date: 'Jun 2025', changes: 'Minor: updated SOC code references; added Lightcast skill tags' },
  { version: 'v1.0', date: 'Jan 2025', changes: 'Initial release — 6 core AI competencies' },
];

function OutcomeTree({ items, depth = 0 }: { items: OutcomeHierarchy[]; depth?: number }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((i) => [i.id, depth < 2]))
  );

  const levelColors: Record<string, string> = {
    PLO: 'bg-primary/10 text-primary border-primary/20',
    'Sub-Outcome': 'bg-sky/10 text-sky border-sky/20',
    CLO: 'bg-success/10 text-success border-success/20',
    Assessment: 'bg-warning/10 text-warning border-warning/20',
  };

  return (
    <div className={depth > 0 ? 'ml-6 border-l border-border pl-4' : ''}>
      {items.map((item) => (
        <div key={item.id} className="py-1.5">
          <div className="flex items-center gap-2 group">
            {item.children && item.children.length > 0 ? (
              <button onClick={() => setExpanded((p) => ({ ...p, [item.id]: !p[item.id] }))} className="p-0.5 rounded hover:bg-muted transition-colors">
                {expanded[item.id] ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </button>
            ) : <div className="w-5" />}
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-mono ${levelColors[item.level]}`}>{item.code}</Badge>
            <span className="text-sm text-foreground group-hover:text-primary transition-colors">{item.text}</span>
            <Badge variant="secondary" className="text-[10px] ml-auto opacity-60">{item.level}</Badge>
          </div>
          {expanded[item.id] && item.children && <OutcomeTree items={item.children} depth={depth + 1} />}
        </div>
      ))}
    </div>
  );
}

export function StandardsPage() {
  const [search, setSearch] = useState('');
  const [libraryTab, setLibraryTab] = useState<'global' | 'partner'>('global');
  const [selectedSet, setSelectedSet] = useState(outcomeSets[0]);
  const [detailTab, setDetailTab] = useState('hierarchy');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newSet, setNewSet] = useState({ name: '', sourceType: 'internal', discipline: '', programTag: '', hierarchyDepth: 'plo-clo-assessment', mappingScale: 'ipa', scope: 'partner' });

  const filtered = outcomeSets.filter((os) => {
    const matchSearch = os.name.toLowerCase().includes(search.toLowerCase()) || os.discipline.toLowerCase().includes(search.toLowerCase());
    const matchType = libraryTab === 'global' ? os.type === 'global' : os.type === 'partner';
    return matchSearch && matchType;
  });

  const statusColors: Record<string, string> = {
    active: 'bg-success/10 text-success',
    draft: 'bg-warning/10 text-warning',
    archived: 'bg-muted text-muted-foreground',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Outcome Sets</h1>
          <p className="text-muted-foreground mt-1">Manage Risepoint global and partner-level outcome libraries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Download Template</Button>
          <Button variant="outline" size="sm" className="gap-1.5">Push to Partners</Button>
          <Button size="sm" className="gap-1.5" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-3.5 w-3.5" /> Create Outcome Set
          </Button>
        </div>
      </div>

      {/* Main layout: left list + right detail */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Library list */}
        <div className="col-span-4 space-y-4">
          <Tabs value={libraryTab} onValueChange={(v) => setLibraryTab(v as 'global' | 'partner')}>
            <TabsList className="w-full">
              <TabsTrigger value="global" className="flex-1 gap-1.5"><Globe className="h-3.5 w-3.5" /> Global Library</TabsTrigger>
              <TabsTrigger value="partner" className="flex-1 gap-1.5"><Building2 className="h-3.5 w-3.5" /> Partner Library</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search outcome sets..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>

          <div className="space-y-2">
            {filtered.map((os) => (
              <div
                key={os.id}
                onClick={() => setSelectedSet(os)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedSet.id === os.id ? 'border-primary bg-primary/5 shadow-card' : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <h3 className="text-sm font-semibold text-foreground">{os.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{os.source} · v{os.version} · {os.outcomeCount} {os.discipline === 'General' ? 'standards' : 'competencies'}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Badge variant="outline" className={`text-[10px] ${os.type === 'global' ? 'border-primary/30 text-primary' : 'border-sky/30 text-sky'}`}>
                    {os.type === 'global' ? 'Internal' : 'Partner'}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">Global</Badge>
                  {os.discipline.includes('AI') || os.discipline.includes('Computer') ? (
                    <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">AI/Technology</Badge>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Detail panel */}
        <div className="col-span-8">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">{selectedSet.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">Partner-level outcome set</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Export CSV</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={detailTab} onValueChange={setDetailTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
                  <TabsTrigger value="versions">Version History</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="mapping-scale">Mapping Scale</TabsTrigger>
                </TabsList>

                <TabsContent value="hierarchy">
                  <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-muted/50">
                    {[
                      { level: 'PLO', color: 'bg-primary', count: 3 },
                      { level: 'Sub-Outcome', color: 'bg-sky', count: 2 },
                      { level: 'CLO', color: 'bg-success', count: 7 },
                      { level: 'Assessment', color: 'bg-warning', count: 4 },
                    ].map((l) => (
                      <div key={l.level} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div className={`w-2.5 h-2.5 rounded-sm ${l.color}`} />
                        {l.level} ({l.count})
                      </div>
                    ))}
                  </div>
                  <OutcomeTree items={sampleHierarchy} />
                </TabsContent>

                <TabsContent value="versions">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Version</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Changes</th>
                        <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {versionHistory.map((v) => (
                        <tr key={v.version} className="border-b border-border/50 hover:bg-muted/30">
                          <td className="py-3 px-3">
                            <span className="text-sm font-medium text-primary">{v.version}</span>
                            {v.current && <Badge variant="secondary" className="ml-2 text-[10px] bg-success/10 text-success">Current</Badge>}
                          </td>
                          <td className="py-3 px-3 text-sm text-muted-foreground">{v.date}</td>
                          <td className="py-3 px-3 text-sm text-foreground">{v.changes}</td>
                          <td className="py-3 px-3 text-center">
                            <Button variant="outline" size="sm" className="text-xs">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabsContent>

                <TabsContent value="usage">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">This outcome set is currently used by the following programs:</p>
                    {['Healthcare Administration, BS', 'Nursing, BSN'].map((p) => (
                      <div key={p} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                        <span className="text-sm font-medium text-foreground">{p}</span>
                        <Button variant="ghost" size="sm" className="text-xs text-primary">View Program →</Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="mapping-scale">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Current Scale: Introduced / Practiced / Assessed (IPA)</h4>
                      <div className="flex items-center gap-4">
                        {['I — Introduced', 'P — Practiced', 'A — Assessed'].map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Alternative scales: Bloom's Taxonomy Levels, Presence/Absence only</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Outcome Set Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Create Outcome Set</DialogTitle>
            <p className="text-sm text-muted-foreground">Define a custom outcome set or import from CSV / Excel / JSON</p>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Outcome Set Name</Label>
                <Input placeholder="e.g. Risepoint AI Competency Framewo..." value={newSet.name} onChange={(e) => setNewSet((p) => ({ ...p, name: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Source Type</Label>
                <Select value={newSet.sourceType} onValueChange={(v) => setNewSet((p) => ({ ...p, sourceType: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal (Risepoint-defined)</SelectItem>
                    <SelectItem value="external">External (Accreditor)</SelectItem>
                    <SelectItem value="bls">BLS-derived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Discipline</Label>
                <Input placeholder="e.g. Healthcare Administration" value={newSet.discipline} onChange={(e) => setNewSet((p) => ({ ...p, discipline: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Program Type Tag</Label>
                <Input placeholder="e.g. Undergraduate, STEM, Clinical" value={newSet.programTag} onChange={(e) => setNewSet((p) => ({ ...p, programTag: e.target.value }))} className="mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase text-muted-foreground">Hierarchy Depth</Label>
              <Select value={newSet.hierarchyDepth} onValueChange={(v) => setNewSet((p) => ({ ...p, hierarchyDepth: v }))}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="plo-clo">PLO → CLO</SelectItem>
                  <SelectItem value="plo-clo-assessment">PLO → CLO → Assessment</SelectItem>
                  <SelectItem value="plo-sub-clo-assessment">PLO → Sub-Outcome → CLO → Assessment</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">Nursing and clinical programs typically require the sub-outcome level (e.g., CCNE QSEN competencies)</p>
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase text-muted-foreground">Mapping Scale</Label>
              <RadioGroup value={newSet.mappingScale} onValueChange={(v) => setNewSet((p) => ({ ...p, mappingScale: v }))} className="flex gap-4 mt-1.5">
                <div className="flex items-center gap-2"><RadioGroupItem value="ipa" id="ipa" /><label htmlFor="ipa" className="text-sm">Introduced / Practiced / Assessed</label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="blooms" id="blooms" /><label htmlFor="blooms" className="text-sm">Bloom's Taxonomy Levels</label></div>
              </RadioGroup>
              <div className="flex items-center gap-2 mt-1.5">
                <RadioGroup value={newSet.mappingScale} onValueChange={(v) => setNewSet((p) => ({ ...p, mappingScale: v }))}>
                  <div className="flex items-center gap-2"><RadioGroupItem value="presence" id="presence" /><label htmlFor="presence" className="text-sm">Presence / Absence only</label></div>
                </RadioGroup>
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase text-muted-foreground">Scope</Label>
              <RadioGroup value={newSet.scope} onValueChange={(v) => setNewSet((p) => ({ ...p, scope: v }))} className="flex gap-4 mt-1.5">
                <div className="flex items-center gap-2"><RadioGroupItem value="global" id="global" /><label htmlFor="global" className="text-sm">Risepoint Global Library (shared)</label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="partner" id="partner" /><label htmlFor="partner" className="text-sm">Partner Library (partner-specific)</label></div>
              </RadioGroup>
            </div>
            <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-primary/40 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Import from CSV / Excel / JSON</p>
              <p className="text-xs text-muted-foreground mt-1">Drag & drop or click · Supports CSV, XLSX, JSON · Template available</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowCreateDialog(false)}>Create Outcome Set</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
