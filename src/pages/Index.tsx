import { useState } from 'react';
import { Users, MessageCircle, TrendingUp, Eye } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { EngagementChart } from '@/components/dashboard/EngangementChart';
import { AutomationStatus } from '@/components/dashboard/AutomationStatus';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ScheduledPosts } from '@/components/dashboard/ScheduledPosts';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { AutomationTypeSelector } from '@/components/automation/AutomationTypeSelector';
import { DMAutomationForm } from '@/components/automation/DMAutomationForm';
import { CommentAutomationForm } from '@/components/automation/CommentAutomationForm';
import { ChatbotForm } from '@/components/automation/ChatbotForm';
import { SchedulePostForm } from '@/components/automation/SchedulePostForm';

const Index = () => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [dmFormOpen, setDmFormOpen] = useState(false);
  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const [chatbotFormOpen, setChatbotFormOpen] = useState(false);
  const [scheduleFormOpen, setScheduleFormOpen] = useState(false);

  const handleSelectType = (type: string) => {
    setSelectorOpen(false);
    switch (type) {
      case 'dm':
        setDmFormOpen(true);
        break;
      case 'comment':
        setCommentFormOpen(true);
        break;
      case 'chatbot':
        setChatbotFormOpen(true);
        break;
      case 'schedule':
        setScheduleFormOpen(true);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Sidebar />
      
      <main className="ml-64 min-h-screen transition-all duration-300">
        <Header onNewAutomation={() => setSelectorOpen(true)} />
        
        <div className="p-6 space-y-6">
          {/* Page Title */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, <span className="gradient-text">Alex</span>
            </h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your Instagram automation</p>
          </div>

          {/* Quick Stats Row */}
          <QuickStats />

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Followers"
              value="24,567"
              change={12.5}
              changeLabel="vs last month"
              icon={Users}
              delay={0}
            />
            <StatCard
              title="Messages Sent"
              value="1,234"
              change={8.2}
              changeLabel="vs last week"
              icon={MessageCircle}
              delay={100}
            />
            <StatCard
              title="Engagement Rate"
              value="4.8%"
              change={-2.1}
              changeLabel="vs last week"
              icon={TrendingUp}
              delay={200}
            />
            <StatCard
              title="Profile Views"
              value="8,942"
              change={15.7}
              changeLabel="vs last month"
              icon={Eye}
              delay={300}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EngagementChart />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AutomationStatus />
            <ScheduledPosts />
          </div>
        </div>
      </main>

      {/* Modals */}
      <AutomationTypeSelector 
        open={selectorOpen} 
        onClose={() => setSelectorOpen(false)} 
        onSelect={handleSelectType}
      />
      <DMAutomationForm open={dmFormOpen} onClose={() => setDmFormOpen(false)} />
      <CommentAutomationForm open={commentFormOpen} onClose={() => setCommentFormOpen(false)} />
      <ChatbotForm open={chatbotFormOpen} onClose={() => setChatbotFormOpen(false)} />
      <SchedulePostForm open={scheduleFormOpen} onClose={() => setScheduleFormOpen(false)} />
    </div>
  );
};

export default Index;
