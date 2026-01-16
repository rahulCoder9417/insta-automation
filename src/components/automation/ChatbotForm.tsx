import { useState } from 'react';
import { X, Bot, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface ChatbotFormProps {
  open: boolean;
  onClose: () => void;
}

interface FlowStep {
  id: string;
  keyword: string;
  response: string;
}

export function ChatbotForm({ open, onClose }: ChatbotFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    greeting: '',
    fallbackMessage: '',
    active: true,
  });

  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([
    { id: '1', keyword: 'pricing', response: 'Our pricing starts at $99/month. Would you like more details?' },
    { id: '2', keyword: 'support', response: 'I\'ll connect you with our support team. What\'s your issue?' },
  ]);

  if (!open) return null;

  const addStep = () => {
    setFlowSteps([...flowSteps, { id: Date.now().toString(), keyword: '', response: '' }]);
  };

  const removeStep = (id: string) => {
    setFlowSteps(flowSteps.filter(step => step.id !== id));
  };

  const updateStep = (id: string, field: 'keyword' | 'response', value: string) => {
    setFlowSteps(flowSteps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Chatbot created successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl mx-4 bg-card border border-border rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-success" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">New Chatbot Flow</h2>
              <p className="text-sm text-muted-foreground">Create an intelligent conversation flow</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Chatbot Name</Label>
              <Input
                id="name"
                placeholder="e.g., Sales Assistant"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium text-foreground">Active</span>
              <Switch
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="greeting">Greeting Message</Label>
            <Textarea
              id="greeting"
              placeholder="Hi! 👋 I'm here to help. What would you like to know about?"
              value={formData.greeting}
              onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
              className="bg-muted/50 border-border"
            />
          </div>

          {/* Flow Steps */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Conversation Flow</Label>
              <Button type="button" variant="outline" size="sm" onClick={addStep} className="rounded-lg gap-1">
                <Plus className="w-4 h-4" />
                Add Step
              </Button>
            </div>

            <div className="space-y-3">
              {flowSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className="p-4 bg-muted/30 rounded-xl border border-border/50 space-y-3 animate-fade-in"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Step {index + 1}</span>
                    <button 
                      type="button"
                      onClick={() => removeStep(step.id)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="Keyword (e.g., pricing)"
                        value={step.keyword}
                        onChange={(e) => updateStep(step.id, 'keyword', e.target.value)}
                        className="bg-background/50 border-border text-sm"
                      />
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-[2]">
                      <Input
                        placeholder="Bot response..."
                        value={step.response}
                        onChange={(e) => updateStep(step.id, 'response', e.target.value)}
                        className="bg-background/50 border-border text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fallback">Fallback Message</Label>
            <Textarea
              id="fallback"
              placeholder="I didn't quite understand that. Could you rephrase or type 'help' for options?"
              value={formData.fallbackMessage}
              onChange={(e) => setFormData({ ...formData, fallbackMessage: e.target.value })}
              className="bg-muted/50 border-border"
            />
            <p className="text-xs text-muted-foreground">Sent when no keyword matches</p>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/20">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Create Chatbot
          </Button>
        </div>
      </div>
    </div>
  );
}
