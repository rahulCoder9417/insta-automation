import { useState } from 'react';
import { X, MessageSquare, Zap, Hash, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface CommentAutomationFormProps {
  open: boolean;
  onClose: () => void;
}

export function CommentAutomationForm({ open, onClose }: CommentAutomationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    triggerKeywords: '',
    replyMessage: '',
    sendDM: true,
    dmMessage: '',
    likeComment: true,
    active: true,
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Comment Automation created successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">New Comment Automation</h2>
              <p className="text-sm text-muted-foreground">Auto-reply to comments on your posts</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="name">Automation Name</Label>
            <Input
              id="name"
              placeholder="e.g., Product Inquiry Reply"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-muted/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords" className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              Trigger Keywords
            </Label>
            <Input
              id="keywords"
              placeholder="price, info, details, how much"
              value={formData.triggerKeywords}
              onChange={(e) => setFormData({ ...formData, triggerKeywords: e.target.value })}
              className="bg-muted/50 border-border"
            />
            <p className="text-xs text-muted-foreground">Separate multiple keywords with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reply">Comment Reply</Label>
            <Textarea
              id="reply"
              placeholder="Thanks for your interest! 🙌 Check your DMs for more info!"
              value={formData.replyMessage}
              onChange={(e) => setFormData({ ...formData, replyMessage: e.target.value })}
              className="bg-muted/50 border-border"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              <Send className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Also Send DM</p>
                <p className="text-xs text-muted-foreground">Send a direct message after replying</p>
              </div>
            </div>
            <Switch
              checked={formData.sendDM}
              onCheckedChange={(checked) => setFormData({ ...formData, sendDM: checked })}
            />
          </div>

          {formData.sendDM && (
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="dm">DM Message</Label>
              <Textarea
                id="dm"
                placeholder="Hey {{name}}! Here's the detailed info you asked for..."
                value={formData.dmMessage}
                onChange={(e) => setFormData({ ...formData, dmMessage: e.target.value })}
                className="bg-muted/50 border-border"
              />
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xl">❤️</span>
              <div>
                <p className="text-sm font-medium text-foreground">Auto-Like Comment</p>
                <p className="text-xs text-muted-foreground">Like the comment automatically</p>
              </div>
            </div>
            <Switch
              checked={formData.likeComment}
              onCheckedChange={(checked) => setFormData({ ...formData, likeComment: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-foreground">Activate Immediately</p>
                <p className="text-xs text-muted-foreground">Start automation right away</p>
              </div>
            </div>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/20">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Create Automation
          </Button>
        </div>
      </div>
    </div>
  );
}
