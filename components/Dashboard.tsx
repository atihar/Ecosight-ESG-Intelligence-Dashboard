import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { MOCK_ALERTS, MOCK_EMISSIONS_DATA, MOCK_KPIS } from '../constants';

export const Dashboard: React.FC = () => {
  // Data for YTD Breakdown with specific opacity levels for consistency
  const SCOPE_BREAKDOWN = [
    { name: 'Scope 1', value: 1200, color: 'var(--primary)', opacity: 1 },
    { name: 'Scope 2', value: 850, color: 'var(--primary)', opacity: 0.6 },
    { name: 'Scope 3', value: 3200, color: 'var(--primary)', opacity: 0.3 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Executive Summary</h1>
        <p className="text-muted-foreground mt-1">Real-time overview of environmental performance and risks.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_KPIS.map((kpi) => (
          <div key={kpi.id} className="bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-card-foreground">{kpi.value}</span>
              <span className="text-sm text-muted-foreground">{kpi.unit}</span>
            </div>
            <div className={`mt-3 flex items-center text-sm font-medium ${
              (kpi.trend === 'down' && kpi.isGoodDirection === 'down') || (kpi.trend === 'up' && kpi.isGoodDirection === 'up')
                ? 'text-primary'
                : 'text-destructive'
            }`}>
              {kpi.trend === 'down' ? <ArrowDownRight className="w-4 h-4 mr-1" /> : <ArrowUpRight className="w-4 h-4 mr-1" />}
              {Math.abs(kpi.change)}% vs last year
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emissions Trend */}
        <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-card-foreground">Carbon Emissions Trend (2024)</h2>
            <select className="text-sm border-input rounded-md bg-background text-foreground focus:ring-ring focus:border-ring border px-2 py-1">
                <option>All Scopes</option>
                <option>Scope 1</option>
                <option>Scope 2</option>
                <option>Scope 3</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_EMISSIONS_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--card-foreground)' }}
                  itemStyle={{ color: 'var(--card-foreground)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scope Breakdown */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-lg font-semibold text-card-foreground mb-6">YTD Breakdown</h2>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SCOPE_BREAKDOWN} layout="vertical" margin={{ left: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} tick={{fontSize: 12, fill: 'var(--muted-foreground)'}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: 'var(--radius)', backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--card-foreground)'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {
                    SCOPE_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={entry.opacity} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
             <div className="flex items-center justify-between text-sm">
                 <span className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    Direct (Scope 1)
                 </span>
                 <span className="font-medium text-card-foreground">23%</span>
             </div>
             <div className="flex items-center justify-between text-sm">
                 <span className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-60"></div>
                    Energy (Scope 2)
                 </span>
                 <span className="font-medium text-card-foreground">16%</span>
             </div>
             <div className="flex items-center justify-between text-sm">
                 <span className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-30"></div>
                    Value Chain (Scope 3)
                 </span>
                 <span className="font-medium text-card-foreground">61%</span>
             </div>
          </div>
        </div>
      </div>

      {/* Risk Alerts */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">Action Items & Risks</h2>
          <button className="text-sm font-medium text-primary hover:text-primary/80">View All</button>
        </div>
        <div className="divide-y divide-border">
          {MOCK_ALERTS.map((alert) => (
            <div key={alert.id} className="p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors">
              <div className={`mt-1 p-1.5 rounded-full flex-shrink-0 ${
                alert.severity === 'high' ? 'bg-destructive/10 text-destructive' : 
                alert.severity === 'medium' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : 
                'bg-primary/10 text-primary'
              }`}>
                {alert.severity === 'high' ? <AlertCircle className="w-5 h-5" /> : 
                 alert.severity === 'medium' ? <AlertTriangle className="w-5 h-5" /> : 
                 <CheckCircle2 className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
              </div>
              <button className="text-sm text-muted-foreground hover:text-card-foreground font-medium">Resolve</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};