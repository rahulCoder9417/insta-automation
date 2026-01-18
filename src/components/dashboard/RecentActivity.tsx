import { MessageCircle, MessageSquare, Heart, UserPlus, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { useStore } from '@/utils/zustand/zustand';

interface Activity {
  id: string;
  type: 'dm_received' | 'dm_sent' | 'comment' | 'like' | 'follow';
  user: string;
  avatar: string;
  content: string;
  time: string;
}

function relativeTime(from: Date): string {
  const diffMs = Date.now() - new Date(from).getTime();
  const sec = Math.max(1, Math.floor(diffMs / 1000));
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

const typeConfig = {
  dm_received: { icon: MessageCircle, color: 'text-primary', bg: 'bg-primary/10' },
  dm_sent: { icon: MessageCircle, color: 'text-success', bg: 'bg-success/10' },
  comment: { icon: MessageSquare, color: 'text-accent', bg: 'bg-accent/10' },
  like: { icon: Heart, color: 'text-destructive', bg: 'bg-destructive/10' },
  follow: { icon: UserPlus, color: 'text-warning', bg: 'bg-warning/10' },
};

export function RecentActivity() {
  const dms = useStore((s) => s.dms);
  const comments = useStore((s) => s.comments);
  const newFollowers = useStore((s) => s.newFollowers);

  const activities = useMemo<Activity[]>(() => {
    const list: Activity[] = [];

    // Map DMs (no direction available in type; treat as received for now)
    list.push(
      ...dms.map((dm, idx) => ({
        id: `dm-${idx}-${dm.name}`,
        type: 'dm_received' as const,
        user: dm.name,
        avatar: (dm.name?.[0] || 'U').toUpperCase(),
        content: dm.latestMessage,
        time: relativeTime(dm.latestMessageAt),
      }))
    );

    // Map Comments
    list.push(
      ...comments.map((cmt, idx) => ({
        id: `cmt-${idx}-${cmt.name}`,
        type: 'comment' as const,
        user: cmt.name,
        avatar: (cmt.name?.[0] || 'U').toUpperCase(),
        content: cmt.title,
        time: relativeTime(cmt.time),
      }))
    );

    // Map New Followers
    list.push(
      ...newFollowers.map((f, idx) => ({
        id: `follow-${idx}-${f.name}`,
        type: 'follow' as const,
        user: f.name,
        avatar: (f.name?.[0] || 'U').toUpperCase(),
        content: 'Started following you',
        time: relativeTime(f.time),
      }))
    );

    // Sort by most recent using inferred timestamps from time fields
    // Convert time strings back to ordering by embedding timestamps alongside then removing
    return list.sort((a, b) => {
      // Not having raw dates anymore; approximate by comparing suffix units priority
      const parse = (t: string) => {
        const n = parseInt(t);
        if (t.endsWith('s')) return n;
        if (t.endsWith('m')) return n * 60;
        if (t.endsWith('h')) return n * 3600;
        if (t.endsWith('d')) return n * 86400;
        return Number.MAX_SAFE_INTEGER;
      };
      return parse(a.time) - parse(b.time);
    });
  }, [dms, comments, newFollowers]);

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest interactions</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all
        </button>
      </div>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;
          
          return (
            <div 
              key={activity.id}
              className="flex items-start gap-3 group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {activity.avatar}
                </div>
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
                  config.bg
                )}>
                  <Icon className={cn("w-3 h-3", config.color)} />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground text-sm">@{activity.user}</p>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate group-hover:text-foreground transition-colors">
                  {activity.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
