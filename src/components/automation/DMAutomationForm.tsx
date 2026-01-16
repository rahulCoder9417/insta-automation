import { useState } from 'react';
import { X, MessageCircle, Zap, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface DMAutomationFormProps {
  open: boolean;
  onClose: () => void;
}

export function DMAutomationForm({ open, onClose }: DMAutomationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    triggerKeyword: '',
    welcomeMessage: '',
    followUpMessage: '',
    delayMinutes: '5',
    sendToNewFollowers: true,
    active: true,
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('DM Automation created successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">New DM Automation</h2>
              <p className="text-sm text-muted-foreground">Set up automated direct messages</p>
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
              placeholder="e.g., Welcome New Followers"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-muted/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trigger" className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-warning" />
              Trigger Keyword
            </Label>
            <Input
              id="trigger"
              placeholder="e.g., INFO, PRICE, HELP"
              value={formData.triggerKeyword}
              onChange={(e) => setFormData({ ...formData, triggerKeyword: e.target.value })}
              className="bg-muted/50 border-border"
            />
            <p className="text-xs text-muted-foreground">Send this DM when someone comments or DMs this keyword</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcome">Welcome Message</Label>
            <Textarea
              id="welcome"
              placeholder="Hey {{name}}! Thanks for reaching out. Here's some info..."
              value={formData.welcomeMessage}
              onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
              className="bg-muted/50 border-border min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">Use {"{{name}}"} to personalize with username</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="followup" className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Follow-up Message (Optional)
            </Label>
            <Textarea
              id="followup"
              placeholder="Just checking in! Did you have any questions?"
              value={formData.followUpMessage}
              onChange={(e) => setFormData({ ...formData, followUpMessage: e.target.value })}
              className="bg-muted/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="delay">Follow-up Delay (minutes)</Label>
            <Input
              id="delay"
              type="number"
              min="1"
              value={formData.delayMinutes}
              onChange={(e) => setFormData({ ...formData, delayMinutes: e.target.value })}
              className="bg-muted/50 border-border w-32"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Send to New Followers</p>
                <p className="text-xs text-muted-foreground">Auto-DM when someone follows you</p>
              </div>
            </div>
            <Switch
              checked={formData.sendToNewFollowers}
              onCheckedChange={(checked) => setFormData({ ...formData, sendToNewFollowers: checked })}
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
