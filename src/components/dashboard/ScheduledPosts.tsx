import { Calendar, Image, Film, Clock, MoreVertical } from 'lucide-react';

interface ScheduledPost {
  id: string;
  type: 'image' | 'reel';
  caption: string;
  scheduledFor: string;
  thumbnail: string;
}

const posts: ScheduledPost[] = [
  { id: '1', type: 'image', caption: 'New product launch coming soon! 🚀 Stay tuned...', scheduledFor: 'Today, 2:00 PM', thumbnail: 'gradient-1' },
  { id: '2', type: 'reel', caption: 'Behind the scenes of our latest shoot 🎬', scheduledFor: 'Tomorrow, 10:00 AM', thumbnail: 'gradient-2' },
  { id: '3', type: 'image', caption: 'Monday motivation to start your week right ✨', scheduledFor: 'Mon, 9:00 AM', thumbnail: 'gradient-3' },
];

const gradients: Record<string, string> = {
  'gradient-1': 'from-primary via-accent to-primary',
  'gradient-2': 'from-accent via-success to-accent',
  'gradient-3': 'from-success via-primary to-success',
};

export function ScheduledPosts() {
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
            <div className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br ${gradients[post.thumbnail]} animate-gradient`}>
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
