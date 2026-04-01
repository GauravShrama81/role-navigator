import { motion } from 'framer-motion';
import { heatmapData, coverageGaps } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell } from 'recharts';

const heatColors = ['hsl(210 20% 96%)', 'hsl(200 75% 82%)', 'hsl(215 80% 62%)', 'hsl(215 80% 42%)'];

function AlignmentHeatmap() {
  const { courses, outcomes, matrix } = heatmapData;
  return (
    <Card className="shadow-card overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Alignment Heatmap — B.S. Computer Science</CardTitle>
        <p className="text-xs text-muted-foreground">Course × Program Learning Outcome coverage matrix</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left p-2 font-medium text-muted-foreground min-w-[100px]">Course</th>
                {outcomes.map((o) => (
                  <th key={o} className="p-2 font-medium text-muted-foreground text-center min-w-[80px]">
                    <span className="block truncate max-w-[80px]" title={o}>{o.split(':')[0]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((course, ci) => (
                <tr key={course} className="border-t border-border">
                  <td className="p-2 font-medium text-foreground whitespace-nowrap">{course}</td>
                  {matrix[ci].map((val, oi) => (
                    <td key={oi} className="p-1 text-center">
                      <div
                        className="mx-auto w-10 h-8 rounded flex items-center justify-center text-xs font-medium transition-transform hover:scale-110"
                        style={{ backgroundColor: heatColors[val], color: val >= 2 ? 'white' : 'hsl(215 25% 30%)' }}
                      >
                        {val === 0 ? '—' : val}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Coverage:</span>
          {['None', 'Introduced', 'Reinforced', 'Mastered'].map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-4 h-3 rounded" style={{ backgroundColor: heatColors[i] }} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CoverageGapReport() {
  const barData = coverageGaps.map((g) => ({
    name: g.outcome.split(':')[0],
    fullName: g.outcome,
    covered: g.coveredCourses,
    gap: g.totalCourses - g.coveredCourses,
    total: g.totalCourses,
  }));
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Coverage Gap Report</CardTitle>
        <p className="text-xs text-muted-foreground">PLOs not fully addressed across courses</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          {coverageGaps.map((gap) => (
            <div key={gap.outcome} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{gap.outcome}</span>
                <Badge variant={gap.severity === 'high' ? 'destructive' : gap.severity === 'medium' ? 'secondary' : 'default'} className="text-xs">
                  {gap.severity}
                </Badge>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(gap.coveredCourses / gap.totalCourses) * 100}%`,
                    backgroundColor: gap.severity === 'high' ? 'hsl(var(--destructive))' : gap.severity === 'medium' ? 'hsl(var(--warning))' : 'hsl(var(--success))',
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{gap.coveredCourses} of {gap.totalCourses} courses address this outcome</p>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
            <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" width={50} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="covered" fill="hsl(215, 80%, 42%)" name="Covered" radius={[0, 4, 4, 0]} />
            <Bar dataKey="gap" fill="hsl(0, 72%, 51%)" name="Gap" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function ProgramHealthSummary() {
  const radarData = [
    { subject: 'Outcome Coverage', value: 87 },
    { subject: 'Assessment Alignment', value: 78 },
    { subject: 'Workforce Relevance', value: 92 },
    { subject: 'Redundancy Score', value: 65 },
    { subject: 'Sequencing Quality', value: 80 },
    { subject: 'Accreditation Readiness', value: 72 },
  ];
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Program Health Summary</CardTitle>
        <p className="text-xs text-muted-foreground">B.S. Computer Science — Meridian University</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 mb-4 p-4 rounded-lg bg-muted/50">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary font-display">87</p>
            <p className="text-xs text-muted-foreground mt-1">Health Score</p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-muted-foreground">Courses:</span> <span className="font-medium">12</span></div>
            <div><span className="text-muted-foreground">PLOs:</span> <span className="font-medium">6</span></div>
            <div><span className="text-muted-foreground">CLOs:</span> <span className="font-medium">48</span></div>
            <div><span className="text-muted-foreground">Assessments:</span> <span className="font-medium">36</span></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="hsl(214 20% 90%)" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
            <Radar dataKey="value" stroke="hsl(215, 80%, 42%)" fill="hsl(215, 80%, 42%)" fillOpacity={0.15} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function WorkforceAlignmentReport() {
  const data = [
    { name: 'Data Analysis', value: 92 },
    { name: 'Software Dev', value: 85 },
    { name: 'Systems Design', value: 78 },
    { name: 'Project Mgmt', value: 60 },
    { name: 'AI/ML', value: 45 },
  ];
  const COLORS = ['hsl(215, 80%, 42%)', 'hsl(200, 85%, 55%)', 'hsl(152, 60%, 42%)', 'hsl(38, 92%, 50%)', 'hsl(0, 72%, 51%)'];
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Workforce Alignment</CardTitle>
        <p className="text-xs text-muted-foreground">Competency coverage by industry cluster</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <ResponsiveContainer width="50%" height={200}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {data.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-xs text-foreground">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-display">Reports & Visualizations</h1>
        <p className="text-muted-foreground mt-1">Visual intelligence for curriculum analysis and partner conversations</p>
      </div>

      <Tabs defaultValue="heatmap" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="heatmap">Alignment Heatmap</TabsTrigger>
          <TabsTrigger value="gaps">Coverage Gaps</TabsTrigger>
          <TabsTrigger value="health">Program Health</TabsTrigger>
          <TabsTrigger value="workforce">Workforce</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AlignmentHeatmap />
          </motion.div>
        </TabsContent>

        <TabsContent value="gaps">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CoverageGapReport />
          </motion.div>
        </TabsContent>

        <TabsContent value="health">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgramHealthSummary />
            <WorkforceAlignmentReport />
          </motion.div>
        </TabsContent>

        <TabsContent value="workforce">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <WorkforceAlignmentReport />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
