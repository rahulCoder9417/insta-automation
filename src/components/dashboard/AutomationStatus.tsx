import { Bot, MessageCircle, MessageSquare, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/utils/zustand/zustand';
import { useLoadDummyData } from '@/hooks/useLoadDummyData';

interface AutomationItem {
  id: string;
  name: string;
  type: 'dm' | 'comment' | 'chatbot';
  status: 'active' | 'paused' | 'error';
  triggered: number;
  lastTriggered: string;
}

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
  useLoadDummyData();

  const activeAutomation = useStore((s) => s.activeAutomation);
  const dms = useStore((s) => s.dms);
  const comments = useStore((s) => s.comments);

  const relativeTime = (date: Date | null | undefined) => {
    if (!date) return 'N/A';
    const diff = Date.now() - new Date(date).getTime();
    const sec = Math.max(1, Math.floor(diff / 1000));
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min} min ago`;
    const hrs = Math.floor(min / 60);
    if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const latestDM = dms.reduce<Date | null>((acc, dm) => {
    const t = new Date(dm.latestMessageAt);
    return !acc || t > acc ? t : acc;
  }, null);
  const latestComment = comments.reduce<Date | null>((acc, c) => {
    const t = new Date(c.time);
    return !acc || t > acc ? t : acc;
  }, null);

  const automations: AutomationItem[] = [
    {
      id: '1',
      name: 'Welcome DM Flow',
      type: 'dm',
      status: 'active',
      triggered: activeAutomation?.dm_flow ?? 0,
      lastTriggered: relativeTime(latestDM),
    },
    {
      id: '2',
      name: 'Product Info Bot',
      type: 'chatbot',
      status: 'active',
      triggered: activeAutomation?.product_info_bot ?? 0,
      lastTriggered: relativeTime(latestDM),
    },
    {
      id: '3',
      name: 'Comment Auto-Reply',
      type: 'comment',
      status: 'active',
      triggered: activeAutomation?.comment_auto_reply ?? 0,
      lastTriggered: relativeTime(latestComment),
    },
  ];

  const totalActive = automations.filter(a => a.status === 'active').length;
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Active Automations</h3>
          <p className="text-sm text-muted-foreground">Real-time automation status</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-lg">
          <Zap className="w-4 h-4 text-success" />
          <span className="text-xs font-semibold text-success">{totalActive} Active</span>
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
