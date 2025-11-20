import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Filter, Download, Calendar } from 'lucide-react';
import { MOCK_EMISSIONS_DATA, MOCK_FACILITIES } from '../constants';

export const CarbonExplorer: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState('all');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Carbon Explorer</h1>
          <p className="text-muted-foreground mt-1">Analyze emission sources across facilities and scopes.</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-card-foreground hover:bg-muted shadow-sm transition-colors">
                <Download className="w-4 h-4" />
                Export CSV
            </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground border-r border-border pr-4">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
        </div>
        
        <select 
            className="text-sm border-input bg-background rounded-lg text-foreground focus:ring-ring focus:border-ring min-w-[150px] px-2 py-1 border"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
        >
            <option value="all">All Facilities</option>
            {MOCK_FACILITIES.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
            ))}
        </select>

        <div className="relative">
             <select className="text-sm border-input bg-background rounded-lg text-foreground focus:ring-ring focus:border-ring min-w-[120px] pl-9 px-2 py-1 border">
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
            </select>
            <Calendar className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-6">Monthly Emissions by Scope</h3>
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_EMISSIONS_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} label={{ value: 'tCO₂e', angle: -90, position: 'insideLeft', fill: 'var(--muted-foreground)' }} />
                <Tooltip 
                    cursor={{fill: 'var(--muted)'}}
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--card-foreground)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                <Bar dataKey="scope1" name="Scope 1 (Direct)" stackId="a" fill="var(--primary)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="scope2" name="Scope 2 (Energy)" stackId="a" fill="var(--primary)" fillOpacity={0.6} radius={[0, 0, 0, 0]} />
                <Bar dataKey="scope3" name="Scope 3 (Value Chain)" stackId="a" fill="var(--primary)" fillOpacity={0.3} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-card-foreground">Raw Data</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                    <tr>
                        <th className="px-6 py-3">Month</th>
                        <th className="px-6 py-3">Scope 1 (tCO₂e)</th>
                        <th className="px-6 py-3">Scope 2 (tCO₂e)</th>
                        <th className="px-6 py-3">Scope 3 (tCO₂e)</th>
                        <th className="px-6 py-3 text-right">Total Emissions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {MOCK_EMISSIONS_DATA.map((row, idx) => (
                        <tr key={idx} className="hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-3 font-medium text-card-foreground">{row.month}</td>
                            <td className="px-6 py-3 text-muted-foreground">{row.scope1}</td>
                            <td className="px-6 py-3 text-muted-foreground">{row.scope2}</td>
                            <td className="px-6 py-3 text-muted-foreground">{row.scope3}</td>
                            <td className="px-6 py-3 text-right font-semibold text-card-foreground">{row.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};