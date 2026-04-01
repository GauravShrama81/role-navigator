import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

export function LandingNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-sky/20">
            <BarChart3 className="h-5 w-5 text-sky" />
          </div>
          <span className="text-lg font-bold text-navy-foreground tracking-tight">CIP</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          <a href="#features" className="text-sm text-navy-foreground/70 hover:text-navy-foreground transition-colors">Features</a>
          <a href="#roles" className="text-sm text-navy-foreground/70 hover:text-navy-foreground transition-colors">Roles</a>
          <a href="#requirements" className="text-sm text-navy-foreground/70 hover:text-navy-foreground transition-colors">Requirements</a>
        </nav>
        <Button asChild size="sm" className="bg-sky/15 text-sky-foreground hover:bg-sky/25 border border-sky/20">
          <Link to="/dashboard">Open Dashboard</Link>
        </Button>
      </div>
    </header>
  );
}
