
import { EmissionDataPoint, Facility, KPIMetric, RiskAlert, Scope, Target, TargetStatus, Report, TeamMember, Scenario, ComplianceFramework } from './types';

export const MOCK_FACILITIES: Facility[] = [
  { id: '1', name: 'Global HQ', location: 'San Francisco, CA', type: 'Office' },
  { id: '2', name: 'Nevada Gigafactory', location: 'Reno, NV', type: 'Manufacturing' },
  { id: '3', name: 'Euro Distribution', location: 'Rotterdam, NL', type: 'Warehouse' },
];

export const MOCK_EMISSIONS_DATA: EmissionDataPoint[] = [
  { month: 'Jan', scope1: 120, scope2: 85, scope3: 300, total: 505 },
  { month: 'Feb', scope1: 115, scope2: 82, scope3: 290, total: 487 },
  { month: 'Mar', scope1: 125, scope2: 80, scope3: 310, total: 515 },
  { month: 'Apr', scope1: 110, scope2: 75, scope3: 280, total: 465 },
  { month: 'May', scope1: 105, scope2: 70, scope3: 275, total: 450 },
  { month: 'Jun', scope1: 98, scope2: 65, scope3: 260, total: 423 },
  { month: 'Jul', scope1: 102, scope2: 78, scope3: 270, total: 450 },
  { month: 'Aug', scope1: 100, scope2: 85, scope3: 265, total: 450 },
  { month: 'Sep', scope1: 95, scope2: 60, scope3: 250, total: 405 },
  { month: 'Oct', scope1: 90, scope2: 58, scope3: 245, total: 393 },
  { month: 'Nov', scope1: 85, scope2: 55, scope3: 230, total: 370 },
  { month: 'Dec', scope1: 80, scope2: 50, scope3: 220, total: 350 },
];

export const MOCK_KPIS: KPIMetric[] = [
  {
    id: 'carbon',
    label: 'Total Carbon Footprint',
    value: '5,263',
    unit: 'tCO₂e',
    change: -12.4,
    trend: 'down',
    isGoodDirection: 'down',
  },
  {
    id: 'energy',
    label: 'Energy Intensity',
    value: '145',
    unit: 'kWh/m²',
    change: -5.2,
    trend: 'down',
    isGoodDirection: 'down',
  },
  {
    id: 'renewable',
    label: 'Renewable Mix',
    value: '68',
    unit: '%',
    change: 8.5,
    trend: 'up',
    isGoodDirection: 'up',
  },
  {
    id: 'esg_score',
    label: 'Overall ESG Score',
    value: '78',
    unit: '/ 100',
    change: 4.1,
    trend: 'up',
    isGoodDirection: 'up',
  },
];

export const MOCK_TARGETS: Target[] = [
  {
    id: 't1',
    title: 'Net Zero Scope 1 & 2',
    category: 'Carbon',
    deadline: '2030',
    baseline: 5000,
    current: 3200,
    goal: 0,
    unit: 'tCO₂e',
    status: TargetStatus.OnTrack,
  },
  {
    id: 't2',
    title: '100% Renewable Energy',
    category: 'Energy',
    deadline: '2028',
    baseline: 20,
    current: 68,
    goal: 100,
    unit: '%',
    status: TargetStatus.OnTrack,
  },
  {
    id: 't3',
    title: 'Reduce Water Usage',
    category: 'Carbon',
    deadline: '2026',
    baseline: 10000,
    current: 9200,
    goal: 8000,
    unit: 'kL',
    status: TargetStatus.AtRisk,
  },
  {
    id: 't4',
    title: 'Supplier Diversity Audit',
    category: 'Social',
    deadline: '2025',
    baseline: 0,
    current: 45,
    goal: 100,
    unit: '% audited',
    status: TargetStatus.Behind,
  },
];

export const MOCK_ALERTS: RiskAlert[] = [
  { id: 'a1', severity: 'high', message: 'Scope 3 emissions spike detected in Logistics (Aug).', date: '2h ago' },
  { id: 'a2', severity: 'medium', message: 'Nevada Plant water usage 5% above monthly target.', date: '1d ago' },
  { id: 'a3', severity: 'low', message: 'Q3 ESG Report draft pending approval.', date: '2d ago' },
];

export const MOCK_REPORTS: Report[] = [
  { id: 'r1', title: 'Q3 2024 Sustainability Report', type: 'PDF', date: 'Oct 15, 2024', status: 'Ready', size: '2.4 MB' },
  { id: 'r2', title: 'Annual Emissions Audit 2023', type: 'PDF', date: 'Jan 20, 2024', status: 'Ready', size: '5.1 MB' },
  { id: 'r3', title: 'Scope 3 Data Export (Sep 2024)', type: 'CSV', date: 'Oct 01, 2024', status: 'Ready', size: '450 KB' },
  { id: 'r4', title: 'Compliance Review - GDPR', type: 'PDF', date: 'Sep 12, 2024', status: 'Ready', size: '1.8 MB' },
  { id: 'r5', title: 'Q4 Forecast Analysis', type: 'Excel', date: 'Nov 01, 2024', status: 'Processing', size: '-' },
];

export const MOCK_TEAM: TeamMember[] = [
  { id: 'u1', name: 'Jane Doe', email: 'jane@ecosight.io', role: 'Admin', status: 'Active', avatar: 'JD' },
  { id: 'u2', name: 'Alex Smith', email: 'alex@ecosight.io', role: 'Editor', status: 'Active', avatar: 'AS' },
  { id: 'u3', name: 'Sarah Connor', email: 'sarah@ecosight.io', role: 'Viewer', status: 'Pending', avatar: 'SC' },
];

export const MOCK_SCENARIOS: Scenario[] = [
  {
    id: 's1',
    name: 'Aggressive Decarbonization',
    description: 'Maximum investment in renewables and supply chain auditing.',
    updatedAt: '2024-10-20',
    params: {
      renewableEnergy: 90,
      efficiencyImprovement: 25,
      supplyChainEngagement: 80,
    },
  },
  {
    id: 's2',
    name: 'Conservative Growth',
    description: 'Focus on cost-effective efficiency measures only.',
    updatedAt: '2024-10-15',
    params: {
      renewableEnergy: 40,
      efficiencyImprovement: 10,
      supplyChainEngagement: 20,
    },
  },
];

export const MOCK_FRAMEWORKS: ComplianceFramework[] = [
    {
        id: 'f1',
        name: 'GRI Standards',
        description: 'Global Reporting Initiative for sustainability reporting.',
        region: 'Global',
        progress: 85,
        status: 'Compliant',
        requirements: { total: 40, completed: 34 }
    },
    {
        id: 'f2',
        name: 'SASB',
        description: 'Sustainability Accounting Standards Board (Sector Specific).',
        region: 'USA / Global',
        progress: 60,
        status: 'In Progress',
        requirements: { total: 25, completed: 15 }
    },
    {
        id: 'f3',
        name: 'CSRD (EU)',
        description: 'Corporate Sustainability Reporting Directive.',
        region: 'Europe',
        progress: 30,
        status: 'Non-Compliant',
        requirements: { total: 80, completed: 24 }
    },
    {
        id: 'f4',
        name: 'TCFD',
        description: 'Task Force on Climate-related Financial Disclosures.',
        region: 'Global',
        progress: 90,
        status: 'Compliant',
        requirements: { total: 11, completed: 10 }
    }
];
