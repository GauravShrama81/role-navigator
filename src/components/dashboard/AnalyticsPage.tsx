import { useState } from 'react';
import { motion } from 'framer-motion';
import { programsList, workforceFitData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Download, FileText } from 'lucide-react';

export function AnalyticsPage() {
  const [selectedProgram, setSelectedProgram] = useState(programsList[0].id);
  const [heatmapScale, setHeatmapScale] = useState<'ipa' | 'binary'>('ipa');
  const program = programsList.find((p) => p.id === selectedProgram)!;

  const ipaLabel: Record<string, string> = { I: 'Introduced', P: 'Practiced', A: 'Assessed' };
  const ipaColor: Record<string, string> = {
    I: 'bg-sky/30 text-sky',
    P: 'bg-primary/25 text-primary',
    A: 'bg-success/25 text-success',
    '': 'bg-muted/40 text-muted-foreground/30',
  };

  const accepted = 0;
  const pending = 12;
  const gaps = program.gaps;
  const avgCoverage = Math.round(program.plos.reduce((s, p) => s + p.coverage, 0) / program.plos.length);

  const statusColor: Record<string, string> = {
    Strong: 'bg-success/10 text-success',
    Adequate: 'bg-primary/10 text-primary',
    Developing: 'bg-warning/10 text-warning',
    Weak: 'bg-destructive/10 text-destructive',
    Gap: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Analytics & Alignment Report</h1>
          <p className="text-muted-foreground mt-1">
            {program.name} · {program.courses} courses · {program.ploCount} PLOs · {program.partner}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV</Button>
          <Button variant="outline" size="sm"><FileText className="h-3.5 w-3.5 mr-1.5" /> Export PPTX</Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '↑ score', value: `${program.alignmentScore}%`, sub: 'Overall Alignment' },
          { label: 'pending', value: String(pending), sub: 'Awaiting Review' },
          { label: 'gaps', value: String(gaps), sub: 'PLO Gaps Identified' },
          { label: '↑ avg', value: `${avgCoverage}%`, sub: 'Avg PLO Coverage' },
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

      {/* PLO Health bars */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Alignment Health by PLO</CardTitle>
            <Button variant="outline" size="sm" className="text-xs">Heatmap →</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {program.plos.map((plo, i) => (
              <motion.div
                key={plo.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="text-sm text-foreground min-w-[260px]">{plo.code} — {plo.name}</span>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${plo.coverage}%`,
                      backgroundColor: plo.status === 'Gap' ? 'hsl(var(--destructive))' :
                        plo.status === 'Developing' ? 'hsl(var(--warning))' :
                        plo.status === 'Adequate' ? 'hsl(var(--primary))' : 'hsl(var(--success))',
                    }}
                  />
                </div>
                <span className={`text-sm font-bold min-w-[40px] text-right ${
                  plo.coverage < 40 ? 'text-destructive' : plo.coverage < 65 ? 'text-warning' : 'text-foreground'
                }`}>
                  {plo.coverage}%
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PLO Distribution */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">PLO Coverage Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="text-4xl font-bold text-foreground">{program.ploCount}</div>
            <div className="flex items-center gap-4">
              {['Strong', 'Adequate', 'Developing', 'Gap'].map((status) => {
                const count = program.plos.filter((p) => p.status === status).length;
                if (count === 0) return null;
                return (
                  <div key={status} className="flex items-center gap-1.5">
                    <Badge variant="secondary" className={`text-xs ${statusColor[status]}`}>
                      {status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{count} PLO{count > 1 ? 's' : ''}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs: Heatmap / PLO Summary / Workforce Fit */}
      <Tabs defaultValue="heatmap">
        <TabsList>
          <TabsTrigger value="heatmap">Alignment Heatmap</TabsTrigger>
          <TabsTrigger value="plo-summary">PLO Summary</TabsTrigger>
          <TabsTrigger value="workforce">Workforce Fit</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="mt-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-medium">Program:</span>
                  <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                    <SelectTrigger className="h-8 w-auto min-w-[220px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {programsList.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-medium">Scale:</span>
                  <Select value={heatmapScale} onValueChange={(v) => setHeatmapScale(v as 'ipa' | 'binary')}>
                    <SelectTrigger className="h-8 w-auto min-w-[200px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ipa">Introduced / Practiced / Assessed</SelectItem>
                      <SelectItem value="binary">Coverage (Yes / No)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {program.courseList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">Course</th>
                        {program.plos.map((plo) => (
                          <th key={plo.id} className="text-center py-2 px-2 font-semibold text-muted-foreground min-w-[70px]">
                            <div>{plo.code}</div>
                            <div className="font-normal text-[10px] text-muted-foreground/60 max-w-[70px] truncate">{plo.name}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {program.courseList.map((course) => (
                        <tr key={course.code} className="border-b border-border/30">
                          <td className="py-2.5 px-3 font-medium text-foreground whitespace-nowrap">{course.code}</td>
                          {program.plos.map((plo) => {
                            const val = course.ploAlignment[plo.code] || '';
                            if (heatmapScale === 'binary') {
                              return (
                                <td key={plo.id} className="py-2.5 px-2 text-center">
                                  <div className={`w-6 h-6 rounded mx-auto flex items-center justify-center ${
                                    val ? 'bg-success/20' : 'bg-muted/60'
                                  }`}>
                                    {val ? <span className="text-success font-bold">✓</span> : <span className="text-muted-foreground/30">—</span>}
                                  </div>
                                </td>
                              );
                            }
                            return (
                              <td key={plo.id} className="py-2.5 px-2 text-center">
                                <div className={`w-6 h-6 rounded mx-auto flex items-center justify-center font-bold text-[11px] ${ipaColor[val]}`}>
                                  {val || ''}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                    {heatmapScale === 'ipa' ? (
                      <>
                        {Object.entries(ipaColor).filter(([k]) => k).map(([key, cls]) => (
                          <div key={key} className="flex items-center gap-1.5">
                            <div className={`w-5 h-5 rounded ${cls} flex items-center justify-center text-[10px] font-bold`}>{key}</div>
                            <span className="text-xs text-muted-foreground">{ipaLabel[key]}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded bg-muted/40"></div>
                          <span className="text-xs text-muted-foreground">Not Addressed</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded bg-success/20 flex items-center justify-center text-success font-bold text-[10px]">✓</div>
                          <span className="text-xs text-muted-foreground">Covered</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded bg-muted/60"></div>
                          <span className="text-xs text-muted-foreground">Not Covered</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground text-sm">
                  Heatmap data requires ingested course cartridges. Select a program with course-level data.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plo-summary" className="mt-4">
          <Card className="shadow-card">
            <CardContent className="pt-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Program Learning Outcome</th>
                    <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">I</th>
                    <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">P</th>
                    <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">A</th>
                    <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Coverage</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {program.plos.map((plo) => (
                    <tr key={plo.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-foreground">{plo.code}</p>
                        <p className="text-xs text-muted-foreground">{plo.name}</p>
                      </td>
                      <td className="py-3 px-3 text-center font-medium">{plo.introduced}</td>
                      <td className="py-3 px-3 text-center font-medium">{plo.practiced}</td>
                      <td className="py-3 px-3 text-center font-medium">{plo.assessed}</td>
                      <td className="py-3 px-3 text-center font-bold">{plo.coverage}%</td>
                      <td className="py-3 px-3">
                        <Badge variant="secondary" className={`text-xs ${statusColor[plo.status]}`}>
                          {plo.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workforce" className="mt-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Workforce Alignment — BLS Healthcare Administrators (SOC 11-9111)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {workforceFitData.map((wf) => (
                  <motion.div
                    key={wf.competency}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
                  >
                    <span className="text-sm text-foreground">{wf.competency}</span>
                    <Badge variant="secondary" className={`text-xs ${statusColor[wf.status]}`}>
                      {wf.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
