import { ArrowUpRight, MessageCircle, MessageSquare, Users, Heart } from 'lucide-react';
import { useStore } from '@/utils/zustand/zustand';
import { useLoadDummyData } from '@/hooks/useLoadDummyData';

interface QuickStat {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

export function QuickStats() {
  useLoadDummyData();

  const messagesSent = useStore((s) => s.messagesSent);
  const dms = useStore((s) => s.dms);
  const comments = useStore((s) => s.comments);
  const newFollowers = useStore((s) => s.newFollowers);
  const engagementRate = useStore((s) => s.engagementRate);

  const stats: QuickStat[] = [
    { label: 'DMs Today', value: String(messagesSent?.total ?? dms.length ?? 0), icon: MessageCircle, color: 'text-primary' },
    { label: 'Comments', value: String(comments.length ?? 0), icon: MessageSquare, color: 'text-accent' },
    { label: 'New Followers', value: String(newFollowers.length ?? 0), icon: Users, color: 'text-success' },
    { label: 'Engagement', value: `${engagementRate?.rate ?? 0}%`, icon: Heart, color: 'text-warning' },
  ];
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
