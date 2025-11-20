import React from 'react';
import { Plus, Target as TargetIcon, ChevronRight } from 'lucide-react';
import { MOCK_TARGETS } from '../constants';
import { TargetStatus } from '../types';

export const TargetTracker: React.FC = () => {
  
  const getStatusColor = (status: TargetStatus) => {
    switch(status) {
        case TargetStatus.OnTrack: return 'bg-primary/10 text-primary ring-primary/20';
        case TargetStatus.AtRisk: return 'bg-orange-100 text-orange-700 ring-orange-200 dark:bg-orange-900/30 dark:text-orange-400';
        case TargetStatus.Behind: return 'bg-destructive/10 text-destructive ring-destructive/20';
        case TargetStatus.Completed: return 'bg-primary/10 text-primary ring-primary/20';
        default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Sustainability Targets</h1>
                <p className="text-muted-foreground mt-1">Track progress against 2030 commitments.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-all">
                <Plus className="w-4 h-4" />
                Add Target
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_TARGETS.map((target) => {
                // Calculate Percentage
                const totalDist = Math.abs(target.baseline - target.goal);
                const currentDist = Math.abs(target.baseline - target.current);
                const progress = Math.min(100, Math.max(0, (currentDist / totalDist) * 100));

                // Determine bar color based on status
                let barColorClass = 'bg-primary'; 
                if (target.status === TargetStatus.Behind) barColorClass = 'bg-destructive';
                if (target.status === TargetStatus.AtRisk) barColorClass = 'bg-orange-500';

                return (
                    <div key={target.id} className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between hover:border-primary/50 transition-colors group">
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-secondary p-2.5 rounded-lg text-primary">
                                        <TargetIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground">{target.title}</h3>
                                        <p className="text-xs text-muted-foreground">{target.category} • Due {target.deadline}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ring-inset ${getStatusColor(target.status)}`}>
                                    {target.status}
                                </span>
                            </div>

                            <div className="mb-2 flex items-end justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Current: <span className="font-semibold text-card-foreground">{target.current.toLocaleString()}</span> {target.unit}
                                </div>
                                <div className="text-sm font-bold text-primary">{progress.toFixed(1)}%</div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ease-out ${barColorClass}`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>

                            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                                <span>Baseline: {target.baseline.toLocaleString()}</span>
                                <span>Goal: {target.goal.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-border flex justify-end">
                            <button className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                                View Details <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};