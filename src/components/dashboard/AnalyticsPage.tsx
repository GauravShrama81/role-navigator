import { useState } from 'react';
import { motion } from 'framer-motion';
import { programsList, workforceFitData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { TrendingUp, TrendingDown, Download, FileText, X } from 'lucide-react';

interface SidebarDetail {
  type: 'plo' | 'course';
  code: string;
  name: string;
  data: Record<string, any>;
}

const crossProgramData = [
  { clo: 'Apply PDSA quality improvement methodology to process improvement', programs: 'HADM BS, Nursing BSN', ploAlignment: 'PLO 3: Quality & Patient Safety' },
  { clo: 'Demonstrate EHR documentation and clinical decision support proficiency', programs: 'HADM BS, Nursing BSN, IT BS', ploAlignment: 'PLO 5: Health Informatics' },
  { clo: 'Analyze organizational leadership and change management frameworks', programs: 'HADM BS, MBA, Nursing BSN', ploAlignment: 'PLO 4: Leadership' },
  { clo: 'Apply research methodology with IRB ethics and statistical analysis', programs: 'Nursing BSN, Psychology BS', ploAlignment: 'PLO 3: EBP / PLO 2: Research' },
];

export function AnalyticsPage() {
  const [selectedProgram, setSelectedProgram] = useState(programsList[0].id);
  const [heatmapScale, setHeatmapScale] = useState<'ipa' | 'binary'>('ipa');
  const [sortCourses, setSortCourses] = useState('sequence');
  const [sidebarDetail, setSidebarDetail] = useState<SidebarDetail | null>(null);
  const program = programsList.find((p) => p.id === selectedProgram)!;

  const ipaLabel: Record<string, string> = { I: 'Introduced', P: 'Practiced', A: 'Assessed' };
  const ipaColor: Record<string, string> = {
    I: 'bg-sky/30 text-sky',
    P: 'bg-primary/25 text-primary',
    A: 'bg-success/25 text-success',
    '': 'bg-muted/40 text-muted-foreground/30',
  };

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

  const sortedCourses = [...program.courseList].sort((a, b) => {
    if (sortCourses === 'alpha') return a.code.localeCompare(b.code);
    if (sortCourses === 'coverage') {
      const scoreA = Object.values(a.ploAlignment).filter(v => v).length;
      const scoreB = Object.values(b.ploAlignment).filter(v => v).length;
      return scoreB - scoreA;
    }
    return 0; // sequence = original order
  });

  const handlePloClick = (plo: typeof program.plos[0]) => {
    const coursesForPlo = program.courseList.filter((c) => c.ploAlignment[plo.code]);
    setSidebarDetail({
      type: 'plo',
      code: plo.code,
      name: plo.name,
      data: {
        description: `Analyze the structure of this program learning outcome and its coverage across courses.`,
        coverage: plo.coverage,
        introduced: plo.introduced,
        practiced: plo.practiced,
        assessed: plo.assessed,
        status: plo.status,
        courses: coursesForPlo.map((c) => ({ code: c.code, level: c.ploAlignment[plo.code] })),
      },
    });
  };

  const handleCourseClick = (course: typeof program.courseList[0]) => {
    const coveredPlos = program.plos.filter((p) => course.ploAlignment[p.code]);
    setSidebarDetail({
      type: 'course',
      code: course.code,
      name: course.name,
      data: {
        clos: course.clos,
        coveredCount: coveredPlos.length,
        totalPlos: program.plos.length,
        plos: coveredPlos.map((p) => ({ code: p.code, name: p.name, level: course.ploAlignment[p.code] })),
      },
    });
  };

  const handleCellClick = (course: typeof program.courseList[0], plo: typeof program.plos[0], val: string) => {
    if (val) {
      setSidebarDetail({
        type: 'plo',
        code: plo.code,
        name: plo.name,
        data: {
          description: `${course.code} maps to ${plo.code} at the "${ipaLabel[val] || val}" level.`,
          coverage: plo.coverage,
          introduced: plo.introduced,
          practiced: plo.practiced,
          assessed: plo.assessed,
          status: plo.status,
          courses: [{ code: course.code, level: val }],
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Analytics & Alignment Report</h1>
          <p className="text-muted-foreground mt-1">{program.name} · {program.courses} courses · {program.ploCount} PLOs · {program.partner}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV</Button>
          <Button variant="outline" size="sm"><FileText className="h-3.5 w-3.5 mr-1.5" /> Export PPTX</Button>
        </div>
      </div>

      {/* Stats with colored cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Overall Alignment', value: `${program.alignmentScore}%`, icon: <TrendingUp className="h-4 w-4" />, bg: 'bg-primary/5 border-primary/20', color: 'text-primary' },
          { label: 'Awaiting Review', value: String(pending), icon: <span className="text-base">⏳</span>, bg: 'bg-warning/5 border-warning/20', color: 'text-warning' },
          { label: 'PLO Gaps', value: String(gaps), icon: <TrendingDown className="h-4 w-4" />, bg: 'bg-destructive/5 border-destructive/20', color: 'text-destructive' },
          { label: 'Avg PLO Coverage', value: `${avgCoverage}%`, icon: <TrendingUp className="h-4 w-4" />, bg: 'bg-success/5 border-success/20', color: 'text-success' },
        ].map((stat) => (
          <Card key={stat.label} className={`shadow-card border ${stat.bg}`}>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                <span className={stat.color}>{stat.icon}</span>
              </div>
              <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Program:</span>
          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger className="h-8 w-auto min-w-[220px] text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>{programsList.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Scale:</span>
          <Select value={heatmapScale} onValueChange={(v) => setHeatmapScale(v as 'ipa' | 'binary')}>
            <SelectTrigger className="h-8 w-auto min-w-[200px] text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ipa">Introduced / Practiced / Assessed</SelectItem>
              <SelectItem value="binary">Coverage (Yes / No)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Sort Courses:</span>
          <Select value={sortCourses} onValueChange={setSortCourses}>
            <SelectTrigger className="h-8 w-auto min-w-[180px] text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sequence">Curricular Sequence</SelectItem>
              <SelectItem value="alpha">Alphabetical</SelectItem>
              <SelectItem value="coverage">By Coverage Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Compact PLO Health */}
      <Card className="shadow-card">
        <CardContent className="py-3 px-5">
          <p className="text-sm font-semibold text-foreground mb-2">Alignment Health by PLO</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {program.plos.map((plo) => (
              <div key={plo.id} className="flex items-center gap-2 cursor-pointer hover:bg-muted/30 rounded px-1 py-0.5" onClick={() => handlePloClick(plo)}>
                <span className="text-xs text-foreground min-w-[180px] truncate">{plo.code} — {plo.name}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{
                    width: `${plo.coverage}%`,
                    backgroundColor: plo.status === 'Gap' ? 'hsl(var(--destructive))' : plo.status === 'Developing' ? 'hsl(var(--warning))' : plo.status === 'Adequate' ? 'hsl(var(--primary))' : 'hsl(var(--success))',
                  }} />
                </div>
                <span className={`text-xs font-bold min-w-[32px] text-right ${plo.coverage < 40 ? 'text-destructive' : plo.coverage < 65 ? 'text-warning' : 'text-foreground'}`}>{plo.coverage}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prominent Tabs */}
      <Tabs defaultValue="heatmap">
        <TabsList className="bg-muted p-1 h-auto">
          <TabsTrigger value="heatmap" className="text-sm font-semibold px-5 py-2.5">Alignment Heatmap</TabsTrigger>
          <TabsTrigger value="plo-summary" className="text-sm font-semibold px-5 py-2.5">PLO Summary</TabsTrigger>
          <TabsTrigger value="workforce" className="text-sm font-semibold px-5 py-2.5">Workforce Fit</TabsTrigger>
          <TabsTrigger value="cross-program" className="text-sm font-semibold px-5 py-2.5">Cross-Program</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="mt-4">
          <Card className="shadow-card">
            <CardContent className="pt-5">
              {sortedCourses.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-semibold text-muted-foreground">Course</th>
                        {program.plos.map((plo) => (
                          <th key={plo.id} className="text-center py-2 px-2 font-semibold text-muted-foreground min-w-[70px] cursor-pointer hover:text-primary transition-colors" onClick={() => handlePloClick(plo)}>
                            <div>{plo.code}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCourses.map((course) => (
                        <tr key={course.code} className="border-b border-border/30 hover:bg-muted/20">
                          <td className="py-2.5 px-3 font-medium text-foreground whitespace-nowrap cursor-pointer hover:text-primary" onClick={() => handleCourseClick(course)}>{course.code}</td>
                          {program.plos.map((plo) => {
                            const val = course.ploAlignment[plo.code] || '';
                            if (heatmapScale === 'binary') {
                              return (
                                <td key={plo.id} className="py-2.5 px-2 text-center cursor-pointer" onClick={() => handleCellClick(course, plo, val)}>
                                  <div className={`w-6 h-6 rounded mx-auto flex items-center justify-center ${val ? 'bg-success/20' : 'bg-muted/60'}`}>
                                    {val ? <span className="text-success font-bold">✓</span> : <span className="text-muted-foreground/30">—</span>}
                                  </div>
                                </td>
                              );
                            }
                            return (
                              <td key={plo.id} className="py-2.5 px-2 text-center cursor-pointer" onClick={() => handleCellClick(course, plo, val)}>
                                <div className={`w-6 h-6 rounded mx-auto flex items-center justify-center font-bold text-[11px] ${ipaColor[val]} ${val ? 'hover:ring-2 hover:ring-primary/30' : ''}`}>
                                  {val || ''}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    <span className="font-medium">SCALE:</span>
                    {heatmapScale === 'ipa' ? (
                      <>
                        {Object.entries(ipaColor).filter(([k]) => k).map(([key, cls]) => (
                          <div key={key} className="flex items-center gap-1.5">
                            <div className={`w-5 h-5 rounded ${cls} flex items-center justify-center text-[10px] font-bold`}>{key}</div>
                            <span>{ipaLabel[key]}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-muted/40" /><span>No coverage</span></div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-success/20 flex items-center justify-center text-success font-bold text-[10px]">✓</div><span>Covered</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-muted/60" /><span>Not Covered</span></div>
                      </>
                    )}
                    <span className="ml-auto text-muted-foreground/60">Click row or column to highlight · Click again to clear</span>
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
                    <tr key={plo.id} className="border-b border-border/50 hover:bg-muted/30 cursor-pointer" onClick={() => handlePloClick(plo)}>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-foreground">{plo.code}</p>
                        <p className="text-xs text-muted-foreground">{plo.name}</p>
                      </td>
                      <td className="py-3 px-3 text-center font-medium">{plo.introduced}</td>
                      <td className="py-3 px-3 text-center font-medium">{plo.practiced}</td>
                      <td className="py-3 px-3 text-center font-medium">{plo.assessed}</td>
                      <td className="py-3 px-3 text-center font-bold">{plo.coverage}%</td>
                      <td className="py-3 px-3">
                        <Badge variant="secondary" className={`text-xs ${statusColor[plo.status]}`}>{plo.status}</Badge>
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
              <CardTitle className="text-base font-semibold">Workforce Alignment — BLS Healthcare Administrators (SOC 11-9111)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {workforceFitData.map((wf) => (
                  <div key={wf.competency} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                    <span className="text-sm text-foreground">{wf.competency}</span>
                    <Badge variant="secondary" className={`text-xs ${statusColor[wf.status]}`}>{wf.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cross-program" className="mt-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Cross-Program Analysis</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Compare programs:</span>
                  <Badge variant="secondary" className="text-xs">All {programsList.length} Programs</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Shared CLO / Learning Objective</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Programs Served</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">PLO Alignment</th>
                    <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {crossProgramData.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-3 max-w-[300px]">
                        <p className="text-sm text-foreground leading-relaxed">{row.clo}</p>
                      </td>
                      <td className="py-3 px-3 text-sm text-muted-foreground">{row.programs}</td>
                      <td className="py-3 px-3">
                        <span className="text-sm text-primary font-medium">{row.ploAlignment}</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Button variant="ghost" size="sm" className="text-xs text-primary">View →</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Sidebar */}
      <Sheet open={!!sidebarDetail} onOpenChange={() => setSidebarDetail(null)}>
        <SheetContent className="w-[480px] sm:max-w-[480px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {sidebarDetail?.type === 'plo' ? '🎯' : '📊'} {sidebarDetail?.code} — {sidebarDetail?.name}
            </SheetTitle>
          </SheetHeader>
          {sidebarDetail && (
            <div className="mt-6 space-y-6">
              {sidebarDetail.type === 'plo' ? (
                <>
                  <p className="text-sm text-muted-foreground">{sidebarDetail.data.description}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'INTRODUCED', value: sidebarDetail.data.introduced, bg: 'bg-sky/10 text-sky' },
                      { label: 'PRACTICED', value: sidebarDetail.data.practiced, bg: 'bg-primary/10 text-primary' },
                      { label: 'ASSESSED', value: sidebarDetail.data.assessed, bg: 'bg-success/10 text-success' },
                    ].map((s) => (
                      <div key={s.label} className={`p-4 rounded-lg text-center ${s.bg}`}>
                        <p className="text-2xl font-bold">{s.value}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-wider mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Courses Covering This PLO</h4>
                    <div className="space-y-1.5">
                      {sidebarDetail.data.courses?.map((c: any) => (
                        <div key={c.code} className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span className="font-medium text-foreground">{c.code}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{ipaLabel[c.level] || c.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    Covers <strong className="text-foreground">{sidebarDetail.data.coveredCount} of {sidebarDetail.data.totalPlos} PLOs</strong>
                  </p>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">PLO Coverage</h4>
                    <div className="space-y-1.5">
                      {sidebarDetail.data.plos?.map((p: any) => (
                        <div key={p.code} className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span className="font-medium text-foreground">{p.code} — {p.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{ipaLabel[p.level] || p.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
