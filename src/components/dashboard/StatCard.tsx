import {type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  delay?: number;
}

export function StatCard({ title, value, change, changeLabel, icon: Icon, delay = 0 }: StatCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div 
      className="stat-card group hover:scale-[1.02] glow-effect"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      {/* Content */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
        
        {/* Change indicator */}
        <div className="flex items-center gap-2 pt-2">
          <span className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold",
            isPositive 
              ? "bg-success/10 text-success" 
              : "bg-destructive/10 text-destructive"
          )}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      </div>
    </div>
  );
}
