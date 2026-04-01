import { motion } from 'framer-motion';
import { useRole } from '@/contexts/RoleContext';
import { statsForRole, roles, partners, programs, dashboardNavItems } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Building2, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function DashboardOverview() {
  const { currentRole } = useRole();
  const stats = statsForRole[currentRole];
  const role = roles.find((r) => r.key === currentRole)!;
  const quickLinks = dashboardNavItems.filter((n) => n.roles.includes(currentRole) && n.path !== '/dashboard');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-display">
          Welcome back, {role.fullLabel}
        </h1>
        <p className="text-muted-foreground mt-1">{role.description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="pt-5 pb-4 px-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1 font-display">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success font-medium">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick actions by role */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Partners */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> Partner Institutions
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-primary" asChild>
                <Link to="/dashboard/programs">View All →</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {partners.slice(0, 4).map((partner) => (
                <div key={partner.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{partner.name}</p>
                    <p className="text-xs text-muted-foreground">{partner.programs} programs</p>
                  </div>
                  <Badge variant={partner.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                    {partner.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Programs */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" /> Recent Programs
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-primary" asChild>
                <Link to="/dashboard/programs">View All →</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {programs.slice(0, 4).map((program) => (
                <div key={program.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{program.name}</p>
                    <p className="text-xs text-muted-foreground">{program.courses} courses</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{program.healthScore}%</p>
                      <p className="text-xs text-muted-foreground">Health</p>
                    </div>
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${program.healthScore}%`,
                          backgroundColor: program.healthScore >= 85 ? 'hsl(var(--success))' : program.healthScore >= 70 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Quick Navigation</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickLinks.map((link) => (
            <Button key={link.path} asChild variant="outline" size="sm" className="justify-between h-10">
              <Link to={link.path}>
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 ml-2 text-muted-foreground" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
