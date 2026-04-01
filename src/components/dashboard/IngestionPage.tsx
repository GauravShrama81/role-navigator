import { useState } from 'react';
import { motion } from 'framer-motion';
import { cartridgeImports } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Upload, Search, FileArchive, CheckCircle2, AlertTriangle, XCircle, Loader2, HardDrive, FileText, Target, Boxes } from 'lucide-react';

export function IngestionPage() {
  const [search, setSearch] = useState('');
  const [lmsFilter, setLmsFilter] = useState<string>('all');

  const filtered = cartridgeImports.filter((c) => {
    const matchSearch = c.courseName.toLowerCase().includes(search.toLowerCase()) || c.partner.toLowerCase().includes(search.toLowerCase());
    const matchLms = lmsFilter === 'all' || c.lms === lmsFilter;
    return matchSearch && matchLms;
  });

  const statusConfig = {
    complete: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Complete' },
    processing: { icon: Loader2, color: 'text-primary', bg: 'bg-primary/10', label: 'Processing' },
    warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', label: 'Warning' },
    error: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Error' },
  };

  const totalIngested = cartridgeImports.filter((c) => c.status === 'complete').length;
  const totalObjectives = cartridgeImports.reduce((sum, c) => sum + c.objectivesFound, 0);
  const totalAssessments = cartridgeImports.reduce((sum, c) => sum + c.assessmentsFound, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">LMS Cartridge Ingestion</h1>
          <p className="text-muted-foreground mt-1">Import course cartridges from Canvas, Brightspace, Blackboard, and Moodle</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Upload className="h-3.5 w-3.5" /> Upload Cartridges
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: FileArchive, label: 'Cartridges Imported', value: totalIngested, color: 'text-primary' },
          { icon: Target, label: 'Objectives Found', value: totalObjectives, color: 'text-sky' },
          { icon: FileText, label: 'Assessments Found', value: totalAssessments, color: 'text-success' },
          { icon: Boxes, label: 'LMS Platforms', value: 4, color: 'text-warning' },
        ].map((stat) => (
          <Card key={stat.label} className="shadow-card">
            <CardContent className="pt-4 pb-3 px-4">
              <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Zone */}
      <Card className="shadow-card border-dashed border-2 border-primary/20 bg-primary/[0.02]">
        <CardContent className="py-10 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">Drag & drop course cartridges</h3>
          <p className="text-sm text-muted-foreground mb-4">Supports IMS CC and Thin CC from Canvas, Brightspace, Blackboard, and Moodle</p>
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm">Browse Files</Button>
            <span className="text-xs text-muted-foreground">or bulk upload up to 20 cartridges</span>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses or partners..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <div className="flex gap-1.5">
          {['all', 'Canvas', 'Brightspace', 'Blackboard', 'Moodle'].map((lms) => (
            <button
              key={lms}
              onClick={() => setLmsFilter(lms)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                lmsFilter === lms ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary/40'
              }`}
            >
              {lms === 'all' ? 'All LMS' : lms}
            </button>
          ))}
        </div>
      </div>

      {/* Cartridge List */}
      <div className="space-y-3">
        {filtered.map((cartridge, i) => {
          const st = statusConfig[cartridge.status];
          return (
            <motion.div
              key={cartridge.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="shadow-card hover:shadow-elevated transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl ${st.bg}`}>
                      <st.icon className={`h-5 w-5 ${st.color} ${cartridge.status === 'processing' ? 'animate-spin' : ''}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground truncate">{cartridge.courseName}</h3>
                        <Badge variant="outline" className="text-[10px] shrink-0">{cartridge.lms}</Badge>
                        <Badge variant="outline" className="text-[10px] shrink-0">{cartridge.format}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {cartridge.partner} · {cartridge.fileName} · {cartridge.size} · Imported {cartridge.importDate}
                      </p>
                      {cartridge.status === 'processing' && (
                        <Progress value={45} className="h-1.5 mb-2" />
                      )}
                      {cartridge.status === 'complete' && (
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Target className="h-3 w-3 text-sky" /> {cartridge.objectivesFound} objectives</span>
                          <span className="flex items-center gap-1"><FileText className="h-3 w-3 text-success" /> {cartridge.assessmentsFound} assessments</span>
                          <span className="flex items-center gap-1"><Boxes className="h-3 w-3 text-warning" /> {cartridge.modulesFound} modules</span>
                        </div>
                      )}
                      {cartridge.status === 'warning' && (
                        <p className="text-xs text-warning">Some objectives could not be parsed — review recommended</p>
                      )}
                      {cartridge.status === 'error' && (
                        <p className="text-xs text-destructive">Failed to parse cartridge — unsupported structure detected</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${st.bg} ${st.color} border-0`}>{st.label}</Badge>
                      {cartridge.status === 'complete' && (
                        <Button variant="ghost" size="sm" className="text-xs h-7">View Content</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Data Provenance */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-primary" /> Data Provenance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-3">All imported data maintains full provenance tracking — source LMS, import date, cartridge version, and parsing status.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Source Tracking', desc: 'Every data point traces back to its source LMS and course' },
              { label: 'Import History', desc: 'Full log of all cartridge imports with timestamps and versions' },
              { label: 'Stale Data Alerts', desc: 'Automatic flagging when data has not been refreshed within 90 days' },
            ].map((p) => (
              <div key={p.label} className="p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm font-medium text-foreground mb-0.5">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
