
import React, { useState, useEffect } from 'react';
import { Zap, Save, RotateCcw, TrendingDown, Info, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MOCK_SCENARIOS } from '../constants';
import { Scenario } from '../types';

export const ScenarioModeling: React.FC = () => {
  // State for currently selected scenario or custom values
  const [activeScenarioId, setActiveScenarioId] = useState<string | 'custom'>('s1');
  
  // Simulation parameters
  const [params, setParams] = useState({
    renewableEnergy: 90, // %
    efficiencyImprovement: 25, // %
    supplyChainEngagement: 80, // %
  });

  // Load params when scenario changes
  useEffect(() => {
    if (activeScenarioId !== 'custom') {
      const scenario = MOCK_SCENARIOS.find(s => s.id === activeScenarioId);
      if (scenario) {
        setParams(scenario.params);
      }
    }
  }, [activeScenarioId]);

  const handleParamChange = (key: keyof typeof params, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
    setActiveScenarioId('custom');
  };

  // Generate projection data
  // Baseline starts at 5000 tCO2e and decreases slightly (BAU)
  // Projected decreases based on the parameters selected
  const generateProjectionData = () => {
    const startYear = 2024;
    const endYear = 2030;
    const startEmissions = 5000;
    const data = [];

    for (let year = startYear; year <= endYear; year++) {
      const yearIndex = year - startYear;
      
      // Business as Usual (BAU): 2% reduction per year natural efficiency
      const bauEmissions = startEmissions * Math.pow(0.98, yearIndex);

      // Impact Factors
      // Renewable Energy: affects Scope 2 (approx 30% of total footprint)
      const renewableImpact = (params.renewableEnergy / 100) * 0.30 * yearIndex * 0.2; 
      
      // Efficiency: affects Scope 1 & 2 (approx 50% of footprint)
      const efficiencyImpact = (params.efficiencyImprovement / 100) * 0.50 * yearIndex * 0.15;

      // Supply Chain: affects Scope 3 (approx 50% of footprint)
      const supplyChainImpact = (params.supplyChainEngagement / 100) * 0.50 * yearIndex * 0.1;

      // Total reduction factor (simplified linear progression over time)
      const totalReductionPct = Math.min(0.95, renewableImpact + efficiencyImpact + supplyChainImpact);
      
      const projectedEmissions = bauEmissions * (1 - totalReductionPct);

      data.push({
        year,
        bau: Math.round(bauEmissions),
        projected: Math.round(projectedEmissions),
      });
    }
    return data;
  };

  const chartData = generateProjectionData();
  const finalYearData = chartData[chartData.length - 1];
  const totalReduction = finalYearData.bau - finalYearData.projected;
  const percentReduction = ((totalReduction / finalYearData.bau) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Scenario Modeling</h1>
          <p className="text-muted-foreground mt-1">Simulate the impact of strategic initiatives on future emissions.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-card-foreground hover:bg-muted shadow-sm transition-colors"
            onClick={() => {
                setActiveScenarioId('s1'); 
                setParams(MOCK_SCENARIOS[0].params);
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-all">
            <Save className="w-4 h-4" />
            Save Scenario
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Scenario Selector */}
          <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">Saved Scenarios</h3>
            <div className="space-y-2">
              {MOCK_SCENARIOS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveScenarioId(s.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    activeScenarioId === s.id 
                      ? 'bg-primary/5 border-primary ring-1 ring-primary' 
                      : 'bg-background border-input hover:bg-muted'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-medium ${activeScenarioId === s.id ? 'text-primary' : 'text-foreground'}`}>
                        {s.name}
                    </span>
                    {activeScenarioId === s.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{s.description}</p>
                </button>
              ))}
              <button
                 onClick={() => setActiveScenarioId('custom')}
                 className={`w-full text-left p-3 rounded-lg border border-dashed transition-all ${
                    activeScenarioId === 'custom' 
                      ? 'bg-primary/5 border-primary ring-1 ring-primary' 
                      : 'border-border hover:bg-muted text-muted-foreground'
                 }`}
              >
                 <span className="font-medium text-sm">Custom Scenario</span>
              </button>
            </div>
          </div>

          {/* Parameters */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Model Parameters</h3>
            </div>

            {/* Slider 1 */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">Renewable Energy Mix</span>
                <span className="text-primary font-bold">{params.renewableEnergy}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={params.renewableEnergy} 
                onChange={(e) => handleParamChange('renewableEnergy', parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted-foreground">Impacts Scope 2 emissions (electricity consumption).</p>
            </div>

            {/* Slider 2 */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">Operational Efficiency</span>
                <span className="text-primary font-bold">{params.efficiencyImprovement}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="50" 
                value={params.efficiencyImprovement} 
                onChange={(e) => handleParamChange('efficiencyImprovement', parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted-foreground">Process improvements reducing energy & fuel use.</p>
            </div>

            {/* Slider 3 */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">Supplier Engagement</span>
                <span className="text-primary font-bold">{params.supplyChainEngagement}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={params.supplyChainEngagement} 
                onChange={(e) => handleParamChange('supplyChainEngagement', parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted-foreground">Percentage of suppliers with net-zero targets (Scope 3).</p>
            </div>
          </div>
        </div>

        {/* Right: Charts & Results */}
        <div className="lg:col-span-8 space-y-6">
           
           {/* KPI Cards for Projection */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                 <p className="text-xs font-medium text-muted-foreground uppercase">Projected Reduction (2030)</p>
                 <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{percentReduction}%</span>
                    <span className="text-sm text-muted-foreground">vs BAU</span>
                 </div>
              </div>
              <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                 <p className="text-xs font-medium text-muted-foreground uppercase">Carbon Saved</p>
                 <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{totalReduction.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">tCO₂e</span>
                 </div>
              </div>
              <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                 <p className="text-xs font-medium text-muted-foreground uppercase">Net Zero Feasibility</p>
                 <div className="mt-2 flex items-baseline gap-2">
                    <span className={`text-lg font-bold ${parseFloat(percentReduction) > 40 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                        {parseFloat(percentReduction) > 40 ? 'High Probability' : 'Moderate Risk'}
                    </span>
                 </div>
              </div>
           </div>

           {/* Chart */}
           <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-card-foreground">Projected Emissions Trajectory</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                    <Info className="w-4 h-4" />
                    <span>Projection window: 2024 - 2030</span>
                </div>
             </div>
             
             <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBau" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--card-foreground)' }}
                        itemStyle={{ color: 'var(--card-foreground)' }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Area 
                        type="monotone" 
                        dataKey="bau" 
                        name="Business as Usual" 
                        stroke="var(--muted-foreground)" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        fillOpacity={1} 
                        fill="url(#colorBau)" 
                    />
                    <Area 
                        type="monotone" 
                        dataKey="projected" 
                        name="Scenario Projection" 
                        stroke="var(--primary)" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorProjected)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
           </div>

           {/* Insights / Recommendations */}
           <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/20 rounded-full text-primary mt-1">
                        <TrendingDown className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-foreground">AI Recommendation</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Based on this model, increasing <strong>Supply Chain Engagement</strong> to 85% would align you with the 1.5°C pathway by 2028.
                            Currently, Scope 3 emissions remain the largest bottleneck in this scenario.
                        </p>
                        <button className="mt-3 text-sm font-medium text-primary hover:underline flex items-center gap-1">
                            View Scope 3 Action Plan <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
           </div>
        </div>
      </div>
    </div>
  );
};
