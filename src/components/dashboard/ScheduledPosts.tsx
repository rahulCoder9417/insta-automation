import { Calendar, Image, Film, Clock, MoreVertical } from 'lucide-react';
import { useStore } from '@/utils/zustand/zustand';
import { useLoadDummyData } from '@/hooks/useLoadDummyData';

interface ScheduledPost {
  id: string;
  type: 'image' | 'reel';
  caption: string;
  scheduledFor: string;
  thumbnail: string;
}

const gradients: Record<string, string> = {
  'gradient-1': 'from-primary via-accent to-primary',
  'gradient-2': 'from-accent via-success to-accent',
  'gradient-3': 'from-success via-primary to-success',
};

export function ScheduledPosts() {
  useLoadDummyData();

  const scheduled = useStore((s) => s.scheduledPosts);

  const formatTime = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const isSameDay = d.toDateString() === now.toDateString();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const isTomorrow = d.toDateString() === tomorrow.toDateString();

    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hr12 = hours % 12 === 0 ? 12 : hours % 12;
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timeStr = `${hr12}:${pad(minutes)} ${ampm}`;

    if (isSameDay) return `Today, ${timeStr}`;
    if (isTomorrow) return `Tomorrow, ${timeStr}`;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${days[d.getDay()]}, ${timeStr}`;
  };

  const posts: ScheduledPost[] = scheduled.map((p, idx) => ({
    id: String(idx + 1),
    type: 'image',
    caption: p.title,
    scheduledFor: formatTime(p.time),
    thumbnail: p.photo,
  }));
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Scheduled Posts</h3>
          <p className="text-sm text-muted-foreground">Upcoming content</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
          <Calendar className="w-4 h-4" />
          Schedule
        </button>
      </div>
      
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div 
            key={post.id}
            className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-200 group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Thumbnail */}
            <div className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-linear-to-br ${gradients[post.thumbnail]} animate-gradient`}>
              <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                {post.type === 'image' ? (
                  <Image className="w-6 h-6 text-foreground/80" />
                ) : (
                  <Film className="w-6 h-6 text-foreground/80" />
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium line-clamp-2">{post.caption}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{post.scheduledFor}</span>
              </div>
            </div>
            
            {/* Actions */}
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-3 text-sm text-muted-foreground hover:text-foreground border border-dashed border-border rounded-xl hover:border-primary/50 transition-all duration-200">
        + Add new post
      </button>
    </div>
  );
}
