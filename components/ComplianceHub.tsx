
import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { MOCK_FRAMEWORKS } from '../constants';

export const ComplianceHub: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compliance Hub</h1>
          <p className="text-muted-foreground mt-1">Monitor alignment with ESG frameworks and regulatory standards.</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Compliance</p>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-card-foreground">72%</span>
                    <span className="text-sm text-green-600 font-medium">+5% vs last month</span>
                </div>
            </div>
            <div className="p-3 bg-primary/10 rounded-full text-primary">
                <ShieldCheck className="w-6 h-6" />
            </div>
         </div>
         <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Data Gaps</p>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-card-foreground">12</span>
                    <span className="text-sm text-muted-foreground">metrics missing</span>
                </div>
            </div>
            <div className="p-3 bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 rounded-full">
                <AlertTriangle className="w-6 h-6" />
            </div>
         </div>
         <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Audit Readiness</p>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-card-foreground">High</span>
                    <span className="text-sm text-muted-foreground">for SASB</span>
                </div>
            </div>
            <div className="p-3 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                <CheckCircle2 className="w-6 h-6" />
            </div>
         </div>
      </div>

      {/* Frameworks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_FRAMEWORKS.map((fw) => (
            <div key={fw.id} className="bg-card rounded-xl border border-border shadow-sm hover:border-primary/50 transition-all duration-300 group">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-semibold text-lg text-card-foreground flex items-center gap-2">
                                {fw.name}
                                <span className="text-xs font-normal px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{fw.region}</span>
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{fw.description}</p>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                            fw.status === 'Compliant' 
                                ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
                                : fw.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
                                : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                        }`}>
                            {fw.status}
                        </span>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Data Readiness</span>
                            <span className="font-medium text-card-foreground">{fw.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                    fw.status === 'Non-Compliant' ? 'bg-red-500' : 'bg-primary'
                                }`}
                                style={{ width: `${fw.progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{fw.requirements.completed} / {fw.requirements.total} Requirements Met</span>
                        </div>
                    </div>
                </div>
                
                <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-between group-hover:bg-muted/50 transition-colors">
                    <div className="flex -space-x-2">
                         {/* Mock Avatars of people working on this */}
                         <div className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground shadow-sm">JD</div>
                         <div className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground shadow-sm">AS</div>
                    </div>
                    <button className="text-sm font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Gap Analysis <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
