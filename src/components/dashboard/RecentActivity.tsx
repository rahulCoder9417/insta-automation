import { MessageCircle, MessageSquare, Heart, UserPlus, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'dm_received' | 'dm_sent' | 'comment' | 'like' | 'follow';
  user: string;
  avatar: string;
  content: string;
  time: string;
}

const activities: Activity[] = [
  { id: '1', type: 'dm_received', user: 'sarah.design', avatar: 'S', content: 'Hey! I saw your latest post...', time: '2m' },
  { id: '2', type: 'dm_sent', user: 'mike_photo', avatar: 'M', content: 'Thanks for reaching out! Here\'s more info...', time: '5m' },
  { id: '3', type: 'comment', user: 'travel.lover', avatar: 'T', content: 'Love this! Where was this taken?', time: '12m' },
  { id: '4', type: 'follow', user: 'creative.studio', avatar: 'C', content: 'Started following you', time: '18m' },
  { id: '5', type: 'dm_received', user: 'brand.collab', avatar: 'B', content: 'Would love to collaborate...', time: '25m' },
  { id: '6', type: 'like', user: 'art.daily', avatar: 'A', content: 'Liked your latest reel', time: '30m' },
];

const typeConfig = {
  dm_received: { icon: MessageCircle, color: 'text-primary', bg: 'bg-primary/10' },
  dm_sent: { icon: MessageCircle, color: 'text-success', bg: 'bg-success/10' },
  comment: { icon: MessageSquare, color: 'text-accent', bg: 'bg-accent/10' },
  like: { icon: Heart, color: 'text-destructive', bg: 'bg-destructive/10' },
  follow: { icon: UserPlus, color: 'text-warning', bg: 'bg-warning/10' },
};

export function RecentActivity() {
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
              <div className="relative flex-shrink-0">
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
