
export enum Scope {
  Scope1 = 'Scope 1',
  Scope2 = 'Scope 2',
  Scope3 = 'Scope 3',
}

export enum TargetStatus {
  OnTrack = 'On Track',
  AtRisk = 'At Risk',
  Behind = 'Behind',
  Completed = 'Completed'
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  type: 'Office' | 'Manufacturing' | 'Warehouse' | 'Data Center';
}

export interface EmissionDataPoint {
  month: string;
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
}

export interface KPIMetric {
  id: string;
  label: string;
  value: string | number;
  unit: string;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  isGoodDirection: 'up' | 'down'; // Does going up mean good? (e.g. profit = up, emissions = down)
}

export interface Target {
  id: string;
  title: string;
  category: 'Carbon' | 'Energy' | 'Social' | 'Governance';
  deadline: string;
  baseline: number;
  current: number;
  goal: number;
  unit: string;
  status: TargetStatus;
}

export interface RiskAlert {
  id: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  date: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'PDF' | 'CSV' | 'Excel';
  date: string;
  status: 'Ready' | 'Processing' | 'Failed';
  size: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  email: string;
  status: 'Active' | 'Pending';
  avatar?: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  params: {
    renewableEnergy: number; // %
    efficiencyImprovement: number; // %
    supplyChainEngagement: number; // %
  };
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  region: string;
  progress: number;
  status: 'Compliant' | 'In Progress' | 'Non-Compliant';
  requirements: {
    total: number;
    completed: number;
  };
}
