import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import { useStore } from '@/utils/zustand/zustand';
import { useLoadDummyData } from '@/hooks/useLoadDummyData';

const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export function EngagementChart() {
  useLoadDummyData();

  const dms = useStore((s) => s.dms);
  const comments = useStore((s) => s.comments);

  const data = useMemo(() => {
    const counts = new Array(7).fill(0).map(() => ({ messages: 0, comments: 0 }));

    dms.forEach((dm) => {
      const d = new Date(dm.latestMessageAt);
      const idx = d.getDay();
      counts[idx].messages += 1;
    });
    comments.forEach((cmt) => {
      const d = new Date(cmt.time);
      const idx = d.getDay();
      counts[idx].comments += 1;
    });

    // Rebuild in Mon..Sun order like original UI, but include all weekdays
    const order = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const byName = weekdayNames.map((n, i) => ({ name: n, ...counts[i] }));
    const ordered = order.map((n) => byName.find((x) => x.name === n)!)
      .map((x) => ({ ...x, engagement: x.messages + x.comments }));
    return ordered;
  }, [dms, comments]);
  return (
    <div className="stat-card h-80">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Engagement Overview</h3>
          <p className="text-sm text-muted-foreground">Weekly interaction trends</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Messages</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Comments</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(15 90% 60%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(15 90% 60%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(340 85% 60%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(340 85% 60%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215 20% 55%)', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215 20% 55%)', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(220 18% 12%)',
              border: '1px solid hsl(220 15% 18%)',
              borderRadius: '12px',
              boxShadow: '0 8px 24px -8px rgba(0,0,0,0.5)',
            }}
            labelStyle={{ color: 'hsl(210 40% 98%)' }}
            itemStyle={{ color: 'hsl(215 20% 55%)' }}
          />
          <Area 
            type="monotone" 
            dataKey="messages" 
            stroke="hsl(15 90% 60%)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorMessages)" 
          />
          <Area 
            type="monotone" 
            dataKey="comments" 
            stroke="hsl(340 85% 60%)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorComments)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
