import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', messages: 120, comments: 85, engagement: 205 },
  { name: 'Tue', messages: 180, comments: 120, engagement: 300 },
  { name: 'Wed', messages: 150, comments: 95, engagement: 245 },
  { name: 'Thu', messages: 220, comments: 150, engagement: 370 },
  { name: 'Fri', messages: 280, comments: 180, engagement: 460 },
  { name: 'Sat', messages: 320, comments: 220, engagement: 540 },
  { name: 'Sun', messages: 250, comments: 170, engagement: 420 },
];

export function EngagementChart() {
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
