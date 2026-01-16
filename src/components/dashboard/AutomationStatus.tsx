import { Bot, MessageCircle, MessageSquare, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutomationItem {
  id: string;
  name: string;
  type: 'dm' | 'comment' | 'chatbot';
  status: 'active' | 'paused' | 'error';
  triggered: number;
  lastTriggered: string;
}

const automations: AutomationItem[] = [
  { id: '1', name: 'Welcome DM Flow', type: 'dm', status: 'active', triggered: 234, lastTriggered: '2 min ago' },
  { id: '2', name: 'Product Info Bot', type: 'chatbot', status: 'active', triggered: 156, lastTriggered: '5 min ago' },
  { id: '3', name: 'Comment Auto-Reply', type: 'comment', status: 'active', triggered: 89, lastTriggered: '12 min ago' },
  { id: '4', name: 'Lead Capture Flow', type: 'dm', status: 'paused', triggered: 45, lastTriggered: '1 hour ago' },
];

const typeIcons = {
  dm: MessageCircle,
  comment: MessageSquare,
  chatbot: Bot,
};

const statusColors = {
  active: 'bg-success',
  paused: 'bg-warning',
  error: 'bg-destructive',
};

export function AutomationStatus() {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Active Automations</h3>
          <p className="text-sm text-muted-foreground">Real-time automation status</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-lg">
          <Zap className="w-4 h-4 text-success" />
          <span className="text-xs font-semibold text-success">3 Active</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {automations.map((automation, index) => {
          const Icon = typeIcons[automation.type];
          
          return (
            <div 
              key={automation.id}
              className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-200 group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground truncate">{automation.name}</p>
                  <span className={cn("w-2 h-2 rounded-full", statusColors[automation.status])} />
                </div>
                <p className="text-xs text-muted-foreground">Last triggered {automation.lastTriggered}</p>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">{automation.triggered}</p>
                <p className="text-xs text-muted-foreground">triggers</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
