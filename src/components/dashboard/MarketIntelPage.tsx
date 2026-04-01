import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const marketData = [
  { occupation: 'Healthcare Administrators', soc: '11-9111', growth: '+28%', trend: 'up', demand: 'High', avgSalary: '$104,830', openings: '56,600' },
  { occupation: 'Software Developers', soc: '15-1252', growth: '+25%', trend: 'up', demand: 'High', avgSalary: '$127,260', openings: '153,900' },
  { occupation: 'Data Scientists', soc: '15-2051', growth: '+35%', trend: 'up', demand: 'Very High', avgSalary: '$108,020', openings: '17,700' },
  { occupation: 'Registered Nurses', soc: '29-1141', growth: '+6%', trend: 'up', demand: 'Moderate', avgSalary: '$81,220', openings: '193,100' },
  { occupation: 'Information Security Analysts', soc: '15-1212', growth: '+32%', trend: 'up', demand: 'Very High', avgSalary: '$112,000', openings: '16,800' },
  { occupation: 'Clinical Psychologists', soc: '19-3031', growth: '+6%', trend: 'stable', demand: 'Moderate', avgSalary: '$85,330', openings: '14,100' },
  { occupation: 'Business Operations Managers', soc: '11-1021', growth: '+4%', trend: 'stable', demand: 'Moderate', avgSalary: '$103,650', openings: '247,400' },
  { occupation: 'IT Project Managers', soc: '15-1299', growth: '+15%', trend: 'up', demand: 'High', avgSalary: '$98,740', openings: '46,900' },
];

export function MarketIntelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-display">Market Intelligence</h1>
        <p className="text-muted-foreground mt-1">BLS & Lightcast workforce demand data aligned to program disciplines</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {marketData.map((item, i) => {
          const TrendIcon = item.trend === 'up' ? TrendingUp : item.trend === 'down' ? TrendingDown : Minus;
          return (
            <motion.div
              key={item.soc}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="shadow-card hover:shadow-elevated transition-shadow">
                <CardContent className="py-4 px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.occupation}</p>
                        <p className="text-xs text-muted-foreground">SOC {item.soc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Growth</p>
                        <div className="flex items-center gap-1">
                          <TrendIcon className={`h-3.5 w-3.5 ${item.trend === 'up' ? 'text-success' : 'text-muted-foreground'}`} />
                          <span className={`text-sm font-bold ${item.trend === 'up' ? 'text-success' : 'text-foreground'}`}>{item.growth}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Demand</p>
                        <Badge variant="secondary" className={`text-xs ${
                          item.demand === 'Very High' ? 'bg-success/10 text-success' :
                          item.demand === 'High' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                          {item.demand}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Avg Salary</p>
                        <p className="text-sm font-semibold text-foreground">{item.avgSalary}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Annual Openings</p>
                        <p className="text-sm font-semibold text-foreground">{item.openings}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
