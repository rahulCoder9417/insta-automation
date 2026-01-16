import { MessageCircle, MessageSquare, Bot, Calendar, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutomationType {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const automationTypes: AutomationType[] = [
  {
    id: 'dm',
    icon: MessageCircle,
    title: 'DM Automation',
    description: 'Send automated direct messages to followers and leads',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 'comment',
    icon: MessageSquare,
    title: 'Comment Reply',
    description: 'Auto-reply to comments on your posts with custom responses',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: 'chatbot',
    icon: Bot,
    title: 'Chatbot Flow',
    description: 'Create intelligent conversation flows with keyword triggers',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    id: 'schedule',
    icon: Calendar,
    title: 'Schedule Post',
    description: 'Plan and schedule your content for optimal times',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
];

interface AutomationTypeSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
}

export function AutomationTypeSelector({ open, onClose, onSelect }: AutomationTypeSelectorProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl mx-4 bg-card border border-border rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Create New Automation</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose the type of automation you want to set up</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Options */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {automationTypes.map((type, index) => {
            const Icon = type.icon;
            
            return (
              <button
                key={type.id}
                onClick={() => onSelect(type.id)}
                className={cn(
                  "flex items-start gap-4 p-5 rounded-xl border border-border bg-muted/20 text-left transition-all duration-200",
                  "hover:border-primary/50 hover:bg-muted/40 hover:scale-[1.02] group animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110", type.bgColor)}>
                  <Icon className={cn("w-6 h-6", type.color)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{type.title}</h3>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground text-center">
            All automations follow Instagram's API guidelines and only message users who have engaged first
          </p>
        </div>
      </div>
    </div>
  );
}
