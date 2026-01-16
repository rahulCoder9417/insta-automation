import { useState } from 'react';
import { X, Calendar, Image, Film, Upload, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SchedulePostFormProps {
  open: boolean;
  onClose: () => void;
}

export function SchedulePostForm({ open, onClose }: SchedulePostFormProps) {
  const [postType, setPostType] = useState<'image' | 'reel'>('image');
  const [formData, setFormData] = useState({
    caption: '',
    hashtags: '',
    scheduledDate: '',
    scheduledTime: '',
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Post scheduled successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Schedule Post</h2>
              <p className="text-sm text-muted-foreground">Plan your content ahead</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Post Type */}
          <div className="space-y-2">
            <Label>Post Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPostType('image')}
                className={cn(
                  "flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                  postType === 'image' 
                    ? "border-primary bg-primary/10 text-foreground" 
                    : "border-border text-muted-foreground hover:border-primary/50"
                )}
              >
                <Image className="w-5 h-5" />
                <span className="font-medium">Image Post</span>
              </button>
              <button
                type="button"
                onClick={() => setPostType('reel')}
                className={cn(
                  "flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                  postType === 'reel' 
                    ? "border-primary bg-primary/10 text-foreground" 
                    : "border-border text-muted-foreground hover:border-primary/50"
                )}
              >
                <Film className="w-5 h-5" />
                <span className="font-medium">Reel</span>
              </button>
            </div>
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <Label>Upload Media</Label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
              <Upload className="w-10 h-10 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
              <p className="mt-2 text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {postType === 'image' ? 'PNG, JPG up to 10MB' : 'MP4 up to 100MB'}
              </p>
            </div>
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Write your caption here..."
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              className="bg-muted/50 border-border min-h-[100px]"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Emojis and line breaks supported</span>
              <span>{formData.caption.length}/2200</span>
            </div>
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <Label htmlFor="hashtags">Hashtags</Label>
            <Input
              id="hashtags"
              placeholder="#instagram #automation #marketing"
              value={formData.hashtags}
              onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
              className="bg-muted/50 border-border"
            />
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Schedule
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                className="bg-muted/50 border-border"
              />
              <Input
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                className="bg-muted/50 border-border"
              />
            </div>
          </div>

          {/* Best Times */}
          <div className="p-4 bg-success/10 rounded-xl border border-success/20">
            <p className="text-sm font-medium text-success">💡 Best times to post</p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on your audience: Tue 10am, Thu 2pm, Sat 9am
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/20">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Schedule Post
          </Button>
        </div>
      </div>
    </div>
  );
}
