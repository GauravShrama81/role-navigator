import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { programsList, type Program } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function AlignmentBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-success' : score >= 60 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${score}%`,
          backgroundColor: score >= 80 ? 'hsl(var(--success))' : score >= 60 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))',
        }}
      />
    </div>
  );
}

function PLOBar({ plo }: { plo: Program['plos'][0] }) {
  const colorMap: Record<string, string> = {
    Strong: 'hsl(var(--success))',
    Adequate: 'hsl(var(--primary))',
    Developing: 'hsl(var(--warning))',
    Gap: 'hsl(var(--destructive))',
  };
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-foreground min-w-[260px]">{plo.code} — {plo.name}</span>
      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${plo.coverage}%`, backgroundColor: colorMap[plo.status] }}
        />
      </div>
      <span className={`text-sm font-semibold min-w-[40px] text-right ${
        plo.status === 'Gap' ? 'text-destructive' : plo.status === 'Developing' ? 'text-warning' : 'text-foreground'
      }`}>
        {plo.coverage}%
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant = status === 'Active' ? 'default' : 'secondary';
  return (
    <Badge variant={variant} className={`text-xs ${
      status === 'Active' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'
    }`}>
      {status}
    </Badge>
  );
}

export function ProgramsPage() {
  const [selectedId, setSelectedId] = useState(programsList[0].id);
  const selected = programsList.find((p) => p.id === selectedId)!;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Programs</h1>
          <p className="text-muted-foreground mt-1">
            {programsList.length} programs · {new Set(programsList.map(p => p.partner)).size} partner institutions · Select a program to explore alignment
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/analytics">View Heatmap →</Link>
          </Button>
          <Button size="sm" className="bg-primary" asChild>
            <Link to="/dashboard/ai-mapping">AI Mapping →</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Program list */}
        <div className="col-span-4 space-y-3">
          {programsList.map((program) => (
            <motion.div
              key={program.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedId(program.id)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                program.id === selectedId
                  ? 'border-primary bg-primary/5 shadow-card'
                  : 'border-border bg-card hover:border-primary/30'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-semibold text-foreground">{program.name}</h3>
                <StatusBadge status={program.status} />
              </div>
              <p className="text-xs text-muted-foreground mb-2">{program.partner} · {program.lms}</p>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xl font-bold text-foreground">{program.alignmentScore}%</span>
                <span className="text-xs text-destructive font-medium">{program.gaps} gap{program.gaps !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Alignment Score</span>
              </div>
              <AlignmentBar score={program.alignmentScore} />
            </motion.div>
          ))}
        </div>

        {/* Program detail */}
        <div className="col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold">{selected.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {selected.courses} courses · {selected.ploCount} PLOs · {selected.accreditation}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/dashboard/analytics">Heatmap →</Link>
                      </Button>
                      <Button size="sm" className="bg-primary" asChild>
                        <Link to="/dashboard/ai-mapping">Map CLOs →</Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="plos">PLOs</TabsTrigger>
                      <TabsTrigger value="courses">Courses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      {/* Alignment donut + PLO bars */}
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-28 h-28 relative">
                          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                            <circle
                              cx="50" cy="50" r="42" fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="10"
                              strokeDasharray={`${selected.alignmentScore * 2.64} ${264 - selected.alignmentScore * 2.64}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-foreground">{selected.alignmentScore}%</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Alignment</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2.5">
                          {selected.plos.map((plo) => (
                            <PLOBar key={plo.id} plo={plo} />
                          ))}
                        </div>
                      </div>

                      {/* Quick stats */}
                      <div className="grid grid-cols-4 gap-3">
                        <div className="p-3 rounded-lg bg-muted/50 border border-border">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Partner</p>
                          <p className="text-sm font-semibold text-foreground mt-0.5">{selected.partner}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50 border border-border">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">LMS</p>
                          <p className="text-sm font-semibold text-foreground mt-0.5">{selected.lms}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50 border border-border">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Gaps</p>
                          <p className="text-sm font-semibold text-destructive mt-0.5">{selected.gaps}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50 border border-border">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Courses</p>
                          <p className="text-sm font-semibold text-foreground mt-0.5">{selected.courses}</p>
                        </div>
                      </div>

                      {selected.gaps > 0 && (
                        <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 flex items-center gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          <span className="text-destructive font-medium">
                            {selected.gaps} gap{selected.gaps !== 1 ? 's' : ''} detected.
                          </span>
                          <Link to="/dashboard/analytics" className="text-primary underline ml-1 text-sm">
                            View heatmap for detail.
                          </Link>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="plos">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">PLO</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Coverage</th>
                              <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">I</th>
                              <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">P</th>
                              <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">A</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selected.plos.map((plo) => (
                              <tr key={plo.id} className="border-b border-border/50 hover:bg-muted/30">
                                <td className="py-2.5 px-3">
                                  <p className="font-medium text-foreground">{plo.code}</p>
                                  <p className="text-xs text-muted-foreground">{plo.name}</p>
                                </td>
                                <td className="py-2.5 px-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                      <div
                                        className="h-full rounded-full"
                                        style={{
                                          width: `${plo.coverage}%`,
                                          backgroundColor: plo.status === 'Gap' ? 'hsl(var(--destructive))' : plo.status === 'Developing' ? 'hsl(var(--warning))' : 'hsl(var(--success))',
                                        }}
                                      />
                                    </div>
                                    <span className="text-sm font-semibold">{plo.coverage}%</span>
                                  </div>
                                </td>
                                <td className="py-2.5 px-3 text-center text-muted-foreground">{plo.introduced}</td>
                                <td className="py-2.5 px-3 text-center text-muted-foreground">{plo.practiced}</td>
                                <td className="py-2.5 px-3 text-center text-muted-foreground">{plo.assessed}</td>
                                <td className="py-2.5 px-3">
                                  <Badge variant="secondary" className={`text-xs ${
                                    plo.status === 'Strong' ? 'bg-success/10 text-success' :
                                    plo.status === 'Adequate' ? 'bg-primary/10 text-primary' :
                                    plo.status === 'Developing' ? 'bg-warning/10 text-warning' :
                                    'bg-destructive/10 text-destructive'
                                  }`}>
                                    {plo.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">💡 Switch to Courses tab to see CLO-level data</p>
                    </TabsContent>

                    <TabsContent value="courses">
                      {selected.courseList.length > 0 ? (
                        <>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-border">
                                  <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Course</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">CLOs</th>
                                  {selected.plos.map((plo) => (
                                    <th key={plo.id} className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground">
                                      {plo.code}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {selected.courseList.map((course) => (
                                  <tr key={course.code} className="border-b border-border/50 hover:bg-muted/30">
                                    <td className="py-2.5 px-3">
                                      <p className="font-medium text-foreground">{course.code}</p>
                                      <p className="text-xs text-muted-foreground">{course.name}</p>
                                    </td>
                                    <td className="py-2.5 px-3 text-center text-muted-foreground">{course.clos}</td>
                                    {selected.plos.map((plo) => {
                                      const val = course.ploAlignment[plo.code] || '';
                                      const cellColor = val === 'A' ? 'bg-success/20 text-success font-bold' :
                                        val === 'P' ? 'bg-primary/15 text-primary font-semibold' :
                                        val === 'I' ? 'bg-sky/15 text-sky font-medium' : 'text-muted-foreground/30';
                                      return (
                                        <td key={plo.id} className={`py-2.5 px-2 text-center text-xs ${cellColor}`}>
                                          {val || '—'}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3">💡 Click any course to inspect CLO and PLO coverage detail</p>
                        </>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <p className="text-sm">Course-level data available after cartridge ingestion.</p>
                          <Button variant="outline" size="sm" className="mt-3" asChild>
                            <Link to="/dashboard/ingestion">Go to Ingestion <ArrowRight className="h-3 w-3 ml-1" /></Link>
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
