import { useState } from 'react';
import { motion } from 'framer-motion';
import { outcomeSets, sampleHierarchy, type OutcomeHierarchy } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Upload, ChevronRight, ChevronDown, Database, Globe, Building2, FileText } from 'lucide-react';

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
              <button
                onClick={() => setExpanded((p) => ({ ...p, [item.id]: !p[item.id] }))}
                className="p-0.5 rounded hover:bg-muted transition-colors"
              >
                {expanded[item.id] ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            ) : (
              <div className="w-5" />
            )}
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-mono ${levelColors[item.level]}`}>
              {item.code}
            </Badge>
            <span className="text-sm text-foreground group-hover:text-primary transition-colors">{item.text}</span>
            <Badge variant="secondary" className="text-[10px] ml-auto opacity-60">{item.level}</Badge>
          </div>
          {expanded[item.id] && item.children && (
            <OutcomeTree items={item.children} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

export function StandardsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'partner' | 'global'>('all');

  const filtered = outcomeSets.filter((os) => {
    const matchSearch = os.name.toLowerCase().includes(search.toLowerCase()) || os.discipline.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || os.type === typeFilter;
    return matchSearch && matchType;
  });

  const statusColors: Record<string, string> = {
    active: 'bg-success/10 text-success',
    draft: 'bg-warning/10 text-warning',
    archived: 'bg-muted text-muted-foreground',
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Standards & Outcome Sets</h1>
          <p className="text-muted-foreground mt-1">Create, import, and manage custom outcome sets with hierarchical structures</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Upload className="h-3.5 w-3.5" /> Import
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New Outcome Set
          </Button>
        </div>
      </div>

      <Tabs defaultValue="library" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="library">Outcome Library</TabsTrigger>
          <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search outcome sets..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
            </div>
            <div className="flex gap-1.5">
              {(['all', 'global', 'partner'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all flex items-center gap-1.5 ${
                    typeFilter === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/40'
                  }`}
                >
                  {t === 'global' && <Globe className="h-3 w-3" />}
                  {t === 'partner' && <Building2 className="h-3 w-3" />}
                  {t === 'all' && <Database className="h-3 w-3" />}
                  {t === 'all' ? 'All' : t === 'global' ? 'Global' : 'Partner'}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <Card className="shadow-card overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Source</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Discipline</th>
                      <th className="text-center p-3 font-medium text-muted-foreground">Outcomes</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Version</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((os, i) => (
                      <motion.tr
                        key={os.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                      >
                        <td className="p-3 font-medium text-foreground flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary/60" />
                          {os.name}
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={`text-xs ${os.type === 'global' ? 'border-primary/30 text-primary' : 'border-sky/30 text-sky'}`}>
                            {os.type === 'global' ? '🌐 Global' : '🏛 Partner'}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">{os.source}</td>
                        <td className="p-3 text-muted-foreground">{os.discipline}</td>
                        <td className="p-3 text-center font-semibold text-foreground">{os.outcomeCount}</td>
                        <td className="p-3 text-muted-foreground font-mono text-xs">v{os.version}</td>
                        <td className="p-3">
                          <Badge className={`text-xs capitalize ${statusColors[os.status]}`}>{os.status}</Badge>
                        </td>
                        <td className="p-3 text-muted-foreground text-xs">{os.lastUpdated}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hierarchy" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                B.S. Computer Science — Outcome Hierarchy
              </CardTitle>
              <p className="text-xs text-muted-foreground">PLO → Sub-Outcome → CLO → Assessment (configurable depth)</p>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
