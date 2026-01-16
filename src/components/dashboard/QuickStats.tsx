import { ArrowUpRight, MessageCircle, MessageSquare, Users, Heart } from 'lucide-react';

interface QuickStat {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const stats: QuickStat[] = [
  { label: 'DMs Today', value: '47', icon: MessageCircle, color: 'text-primary' },
  { label: 'Comments', value: '128', icon: MessageSquare, color: 'text-accent' },
  { label: 'New Followers', value: '24', icon: Users, color: 'text-success' },
  { label: 'Engagement', value: '4.2%', icon: Heart, color: 'text-warning' },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <div 
            key={stat.label}
            className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-200 group cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        );
      })}
    </div>
  );
}
