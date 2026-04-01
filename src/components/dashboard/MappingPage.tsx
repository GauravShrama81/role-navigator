import { useState } from 'react';
import { motion } from 'framer-motion';
import { mappingItems, heatmapData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowRight, Filter, Download, CheckCircle2 } from 'lucide-react';

const levelLabels = ['Not Mapped', 'Introduced', 'Reinforced', 'Mastered'];
const levelColors = ['bg-muted text-muted-foreground', 'bg-sky/15 text-sky', 'bg-primary/15 text-primary', 'bg-success/15 text-success'];
const heatColors = ['hsl(210 20% 96%)', 'hsl(200 75% 82%)', 'hsl(215 80% 62%)', 'hsl(215 80% 42%)'];

export function MappingPage() {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [scaleType, setScaleType] = useState<'proficiency' | 'presence'>('proficiency');

  const courses = [...new Set(mappingItems.map((m) => m.course))];
  const filtered = mappingItems.filter((m) => {
    const matchSearch = m.cloText.toLowerCase().includes(search.toLowerCase()) || m.ploText.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter === 'all' || m.course === courseFilter;
    return matchSearch && matchCourse;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Outcome Mapping Engine</h1>
          <p className="text-muted-foreground mt-1">Align course objectives to program outcomes with configurable mapping scales</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </Button>
          <Button size="sm" className="gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" /> Save Mappings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="mappings" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="mappings">Mapping Table</TabsTrigger>
          <TabsTrigger value="matrix">Interactive Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="mappings" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search CLOs or PLOs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setCourseFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  courseFilter === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/40'
                }`}
              >
                All Courses
              </button>
              {courses.map((c) => (
                <button
                  key={c}
                  onClick={() => setCourseFilter(c)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                    courseFilter === c ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/40'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 ml-auto">
              <button
                onClick={() => setScaleType('proficiency')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  scaleType === 'proficiency' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border'
                }`}
              >
                Proficiency Scale
              </button>
              <button
                onClick={() => setScaleType('presence')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  scaleType === 'presence' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border'
                }`}
              >
                Presence/Absence
              </button>
            </div>
          </div>

          {/* Mapping Cards */}
          <div className="space-y-2">
            {filtered.map((mapping, i) => (
              <motion.div
                key={mapping.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="shadow-card hover:shadow-elevated transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* CLO */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <Badge variant="outline" className="text-[10px] font-mono bg-sky/5 text-sky border-sky/20">{mapping.clo}</Badge>
                          <span className="text-xs text-muted-foreground">{mapping.course}</span>
                        </div>
                        <p className="text-sm text-foreground truncate">{mapping.cloText}</p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />

                      {/* PLO */}
                      <div className="flex-1 min-w-0">
                        <Badge variant="outline" className="text-[10px] font-mono bg-primary/5 text-primary border-primary/20 mb-0.5">{mapping.plo}</Badge>
                        <p className="text-sm text-foreground">{mapping.ploText}</p>
                      </div>

                      {/* Level */}
                      <div className="shrink-0 text-center">
                        {scaleType === 'proficiency' ? (
                          <Badge className={`text-xs ${levelColors[mapping.level]}`}>
                            {levelLabels[mapping.level]}
                          </Badge>
                        ) : (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${mapping.level > 0 ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
                            {mapping.level > 0 ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs text-muted-foreground">—</span>}
                          </div>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-muted-foreground">{mapping.mappedBy}</p>
                        <p className="text-[10px] text-muted-foreground">{mapping.mappedDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matrix">
          <Card className="shadow-card overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Interactive Alignment Matrix</CardTitle>
                  <p className="text-xs text-muted-foreground">Click cells to set mapping levels — B.S. Computer Science</p>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Filter by outcome level</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left p-2 font-medium text-muted-foreground min-w-[100px]">Course</th>
                      {heatmapData.outcomes.map((o) => (
                        <th key={o} className="p-2 font-medium text-muted-foreground text-center min-w-[80px]">
                          <span className="block truncate max-w-[80px]" title={o}>{o.split(':')[0]}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapData.courses.map((course, ci) => (
                      <tr key={course} className="border-t border-border">
                        <td className="p-2 font-medium text-foreground whitespace-nowrap">{course}</td>
                        {heatmapData.matrix[ci].map((val, oi) => (
                          <td key={oi} className="p-1 text-center">
                            <button
                              className="mx-auto w-10 h-8 rounded flex items-center justify-center text-xs font-medium transition-all hover:scale-110 hover:ring-2 hover:ring-primary/30 cursor-pointer"
                              style={{ backgroundColor: heatColors[val], color: val >= 2 ? 'white' : 'hsl(215 25% 30%)' }}
                              title={`${course} × ${heatmapData.outcomes[oi]}: ${levelLabels[val]}`}
                            >
                              {scaleType === 'presence' ? (val > 0 ? '✓' : '—') : (val === 0 ? '—' : val)}
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Scale:</span>
                {levelLabels.map((label, i) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-4 h-3 rounded" style={{ backgroundColor: heatColors[i] }} />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
