import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { programsList, type Program } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AlertTriangle, ArrowRight, Plus, Upload, FileText, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Cartridge {
  id: string;
  fileName: string;
  courseName: string;
  program: string;
  uploadDate: string;
  status: 'complete' | 'processing';
  objectivesFound: number;
  modulesFound: number;
}

const mockCartridges: Cartridge[] = [
  { id: 'cc1', fileName: 'HADM101_Fall2026.imscc', courseName: 'HADM 101 - Intro to Healthcare Admin', program: 'Healthcare Administration, BS', uploadDate: '2026-03-15', status: 'complete', objectivesFound: 4, modulesFound: 12 },
  { id: 'cc2', fileName: 'HADM201_Fall2026.imscc', courseName: 'HADM 201 - Health Policy & Law', program: 'Healthcare Administration, BS', uploadDate: '2026-03-15', status: 'complete', objectivesFound: 2, modulesFound: 8 },
  { id: 'cc3', fileName: 'HADM301_Spring2026.imscc', courseName: 'HADM 301 - Healthcare Leadership', program: 'Healthcare Administration, BS', uploadDate: '2026-03-14', status: 'complete', objectivesFound: 5, modulesFound: 10 },
  { id: 'cc4', fileName: 'NUR101_Clinical.imscc', courseName: 'NUR 101 - Nursing Fundamentals', program: 'Nursing, BSN', uploadDate: '2026-03-12', status: 'complete', objectivesFound: 8, modulesFound: 14 },
  { id: 'cc5', fileName: 'MBA500_Strategy.imscc', courseName: 'MBA 500 - Strategic Management', program: 'Business Administration, MBA', uploadDate: '2026-03-10', status: 'processing', objectivesFound: 0, modulesFound: 0 },
];

const sampleContent = {
  modules: ['Module 1: Introduction to Healthcare Systems', 'Module 2: Healthcare Financing', 'Module 3: Health Policy Framework', 'Module 4: Stakeholder Analysis'],
  objectives: ['Identify major healthcare stakeholders', 'Describe reimbursement models', 'Analyze the impact of the ACA', 'Evaluate ethical decision-making frameworks'],
  assessments: ['Discussion Forum: Healthcare Systems', 'Quiz: Reimbursement Models', 'Case Study: ACA Impact Analysis', 'Final Exam'],
};

function AlignmentBar({ score }: { score: number }) {
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
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${plo.coverage}%`, backgroundColor: colorMap[plo.status] }} />
      </div>
      <span className={`text-sm font-semibold min-w-[40px] text-right ${plo.status === 'Gap' ? 'text-destructive' : plo.status === 'Developing' ? 'text-warning' : 'text-foreground'}`}>
        {plo.coverage}%
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="secondary" className={`text-xs ${status === 'Active' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
      {status}
    </Badge>
  );
}

export function ProgramsPage() {
  const [selectedId, setSelectedId] = useState(programsList[0].id);
  const selected = programsList.find((p) => p.id === selectedId)!;
  const [showNewProgram, setShowNewProgram] = useState(false);
  const [showCartridgeUpload, setShowCartridgeUpload] = useState(false);
  const [showCartridgeContent, setShowCartridgeContent] = useState<Cartridge | null>(null);
  const [cartridgeFilter, setCartridgeFilter] = useState('all');
  const [cartridges, setCartridges] = useState<Cartridge[]>(mockCartridges);

  // New program form
  const [newProgram, setNewProgram] = useState({ name: '', partner: '', lms: 'Canvas', discipline: '', degree: 'BS / Undergraduate', outcomeSet: '' });

  const handleCreateProgram = () => {
    setShowNewProgram(false);
    setShowCartridgeUpload(true);
  };

  const handleFileUpload = () => {
    const newCartridge: Cartridge = {
      id: `cc${Date.now()}`,
      fileName: 'NewCourse_Upload.imscc',
      courseName: 'New Course Upload',
      program: newProgram.name || 'Healthcare Administration, BS',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'processing',
      objectivesFound: 0,
      modulesFound: 0,
    };
    setCartridges((prev) => [newCartridge, ...prev]);
  };

  const filteredCartridges = cartridgeFilter === 'all'
    ? cartridges
    : cartridges.filter((c) => c.program === cartridgeFilter);

  const uniquePrograms = [...new Set(cartridges.map((c) => c.program))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Programs</h1>
          <p className="text-muted-foreground mt-1">
            {programsList.length} programs · {new Set(programsList.map(p => p.partner)).size} partner institutions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/analytics">View Heatmap →</Link>
          </Button>
          <Button size="sm" className="bg-primary gap-1.5" onClick={() => setShowNewProgram(true)}>
            <Plus className="h-3.5 w-3.5" /> New Program
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
            <motion.div key={selected.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold">{selected.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-0.5">{selected.courses} courses · {selected.ploCount} PLOs · {selected.accreditation}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild><Link to="/dashboard/analytics">Heatmap →</Link></Button>
                      <Button size="sm" className="bg-primary" asChild><Link to="/dashboard/ai-mapping">Map CLOs →</Link></Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4 bg-card border border-border">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="plos">PLOs</TabsTrigger>
                      <TabsTrigger value="courses">Courses</TabsTrigger>
                      <TabsTrigger value="cartridges">Cartridges</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-28 h-28 relative">
                          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeDasharray={`${selected.alignmentScore * 2.64} ${264 - selected.alignmentScore * 2.64}`} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-foreground">{selected.alignmentScore}%</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Alignment</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2.5">
                          {selected.plos.map((plo) => <PLOBar key={plo.id} plo={plo} />)}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { l: 'Partner', v: selected.partner },
                          { l: 'LMS', v: selected.lms },
                          { l: 'Gaps', v: String(selected.gaps), cls: 'text-destructive' },
                          { l: 'Courses', v: String(selected.courses) },
                        ].map((s) => (
                          <div key={s.l} className="p-3 rounded-lg bg-muted/50 border border-border">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{s.l}</p>
                            <p className={`text-sm font-semibold mt-0.5 ${s.cls || 'text-foreground'}`}>{s.v}</p>
                          </div>
                        ))}
                      </div>
                      {selected.gaps > 0 && (
                        <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 flex items-center gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          <span className="text-destructive font-medium">{selected.gaps} gap{selected.gaps !== 1 ? 's' : ''} detected.</span>
                          <Link to="/dashboard/analytics" className="text-primary underline ml-1 text-sm">View heatmap for detail.</Link>
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
                                      <div className="h-full rounded-full" style={{ width: `${plo.coverage}%`, backgroundColor: plo.status === 'Gap' ? 'hsl(var(--destructive))' : plo.status === 'Developing' ? 'hsl(var(--warning))' : 'hsl(var(--success))' }} />
                                    </div>
                                    <span className="text-sm font-semibold">{plo.coverage}%</span>
                                  </div>
                                </td>
                                <td className="py-2.5 px-3 text-center text-muted-foreground">{plo.introduced}</td>
                                <td className="py-2.5 px-3 text-center text-muted-foreground">{plo.practiced}</td>
                                <td className="py-2.5 px-3 text-center text-muted-foreground">{plo.assessed}</td>
                                <td className="py-2.5 px-3">
                                  <Badge variant="secondary" className={`text-xs ${plo.status === 'Strong' ? 'bg-success/10 text-success' : plo.status === 'Adequate' ? 'bg-primary/10 text-primary' : plo.status === 'Developing' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'}`}>{plo.status}</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    <TabsContent value="courses">
                      {selected.courseList.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Course</th>
                                <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">CLOs</th>
                                {selected.plos.map((plo) => (
                                  <th key={plo.id} className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground">{plo.code}</th>
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
                                    const cellColor = val === 'A' ? 'bg-success/20 text-success font-bold' : val === 'P' ? 'bg-primary/15 text-primary font-semibold' : val === 'I' ? 'bg-sky/15 text-sky font-medium' : 'text-muted-foreground/30';
                                    return <td key={plo.id} className={`py-2.5 px-2 text-center text-xs ${cellColor}`}>{val || '—'}</td>;
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <p className="text-sm">Course-level data available after cartridge ingestion.</p>
                          <Button variant="outline" size="sm" className="mt-3" asChild>
                            <Link to="/dashboard/ingestion">Go to Ingestion <ArrowRight className="h-3 w-3 ml-1" /></Link>
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="cartridges" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground font-medium">Filter by Program:</span>
                          <Select value={cartridgeFilter} onValueChange={setCartridgeFilter}>
                            <SelectTrigger className="h-8 w-auto min-w-[200px] text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Programs</SelectItem>
                              {uniquePrograms.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setShowCartridgeUpload(true)}>
                          <Upload className="h-3.5 w-3.5" /> Upload Cartridge
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {filteredCartridges.map((c) => (
                          <div key={c.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary/60" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{c.fileName}</p>
                                <p className="text-xs text-muted-foreground">{c.courseName} · {c.program}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right text-xs text-muted-foreground">
                                <p>{c.objectivesFound} objectives · {c.modulesFound} modules</p>
                                <p>{c.uploadDate}</p>
                              </div>
                              <Badge variant="secondary" className={`text-xs ${c.status === 'complete' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                {c.status === 'complete' ? '✓ Parsed' : '⏳ Processing'}
                              </Badge>
                              {c.status === 'complete' && (
                                <Button variant="ghost" size="sm" className="text-xs text-primary" onClick={() => setShowCartridgeContent(c)}>
                                  <Eye className="h-3.5 w-3.5 mr-1" /> View Content
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Add New Program Dialog */}
      <Dialog open={showNewProgram} onOpenChange={setShowNewProgram}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Add New Program</DialogTitle>
            <p className="text-sm text-muted-foreground">Define a new program and begin curriculum alignment analysis</p>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs font-semibold uppercase text-muted-foreground">Program Name</Label>
              <Input placeholder="e.g. Health Informatics, MS" value={newProgram.name} onChange={(e) => setNewProgram((p) => ({ ...p, name: e.target.value }))} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Partner Institution</Label>
                <Input placeholder="e.g. Fortis College" value={newProgram.partner} onChange={(e) => setNewProgram((p) => ({ ...p, partner: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">LMS Platform</Label>
                <Select value={newProgram.lms} onValueChange={(v) => setNewProgram((p) => ({ ...p, lms: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Canvas">Canvas</SelectItem>
                    <SelectItem value="Blackboard">Blackboard</SelectItem>
                    <SelectItem value="D2L Brightspace">D2L Brightspace</SelectItem>
                    <SelectItem value="Moodle">Moodle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Discipline</Label>
                <Input placeholder="e.g. Healthcare Administration" value={newProgram.discipline} onChange={(e) => setNewProgram((p) => ({ ...p, discipline: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Degree Level</Label>
                <Select value={newProgram.degree} onValueChange={(v) => setNewProgram((p) => ({ ...p, degree: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BS / Undergraduate">BS / Undergraduate</SelectItem>
                    <SelectItem value="MS / Graduate">MS / Graduate</SelectItem>
                    <SelectItem value="Certificate">Certificate</SelectItem>
                    <SelectItem value="Doctorate">Doctorate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase text-muted-foreground">Outcome Set</Label>
              <Select value={newProgram.outcomeSet} onValueChange={(v) => setNewProgram((p) => ({ ...p, outcomeSet: v }))}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select outcome set..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ache">ACHE/AUPHA — Healthcare Administration</SelectItem>
                  <SelectItem value="ccne">CCNE — Nursing</SelectItem>
                  <SelectItem value="aacsb">AACSB — Business</SelectItem>
                  <SelectItem value="abet">ABET — Information Technology</SelectItem>
                  <SelectItem value="apa">APA — Psychology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-primary">
              After adding the program, upload course cartridges via the Data Import view to begin alignment analysis.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProgram(false)}>Cancel</Button>
            <Button onClick={handleCreateProgram}>Add Program</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cartridge Upload Dialog */}
      <Dialog open={showCartridgeUpload} onOpenChange={setShowCartridgeUpload}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Upload Common Cartridge</DialogTitle>
            <p className="text-sm text-muted-foreground">Upload IMS Common Cartridge files (.imscc) for parsing</p>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div
              className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={handleFileUpload}
            >
              <Upload className="h-10 w-10 text-primary/40 mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">Drag & drop or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Supports .imscc, .zip · Max 100 MB per file</p>
            </div>
            <div className="text-xs text-muted-foreground">
              Compatible with Canvas, Blackboard, D2L Brightspace, and Moodle cartridge exports.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCartridgeUpload(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Content Sheet */}
      <Sheet open={!!showCartridgeContent} onOpenChange={() => setShowCartridgeContent(null)}>
        <SheetContent className="w-[480px] sm:max-w-[480px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {showCartridgeContent?.courseName}
            </SheetTitle>
            <p className="text-sm text-muted-foreground">{showCartridgeContent?.fileName}</p>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Modules ({sampleContent.modules.length})</h4>
              <div className="space-y-1.5">
                {sampleContent.modules.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm text-foreground">
                    <span className="text-xs text-muted-foreground font-mono w-5">{i + 1}</span>
                    {m}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Learning Objectives ({sampleContent.objectives.length})</h4>
              <div className="space-y-1.5">
                {sampleContent.objectives.map((o, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-md bg-primary/5 text-sm text-foreground">
                    <span className="text-primary mt-0.5">•</span>
                    {o}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Assessments ({sampleContent.assessments.length})</h4>
              <div className="space-y-1.5">
                {sampleContent.assessments.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-warning/5 text-sm text-foreground">
                    <span className="text-warning">📝</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
