import { Bell, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  onNewAutomation: () => void;
}

export function Header({ onNewAutomation }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search messages, posts, analytics..."
          className="w-full h-10 pl-10 pr-4 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <Button variant="outline" size="icon" className="relative rounded-xl border-border hover:bg-muted">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        <Button 
          onClick={onNewAutomation}
          className="gap-2 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Automation
        </Button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">Alex Morgan</p>
            <p className="text-xs text-muted-foreground">@alexmorgan</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
