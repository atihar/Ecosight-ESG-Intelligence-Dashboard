
import React, { useState } from 'react';
import { Building, Users, Bell, Shield, Mail, User, Save } from 'lucide-react';
import { MOCK_TEAM } from '../constants';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('organization');

  const tabs = [
    { id: 'organization', label: 'Organization', icon: Building },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your organization, team access, and platform preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-1">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === tab.id 
                            ? 'bg-primary/10 text-primary ring-1 ring-primary/20' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                );
            })}
        </div>

        {/* Main Content */}
        <div className="flex-1">
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                
                {/* Organization Settings */}
                {activeTab === 'organization' && (
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Organization Profile</h3>
                            <p className="text-sm text-muted-foreground">Update your company details and public profile.</p>
                        </div>
                        <div className="grid gap-6 max-w-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Company Name</label>
                                    <input type="text" defaultValue="EcoSight Corp" className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Industry</label>
                                    <select className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                                        <option>Technology</option>
                                        <option>Manufacturing</option>
                                        <option>Energy</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Headquarters Address</label>
                                <input type="text" defaultValue="123 Green Way, San Francisco, CA 94105" className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Reporting Currency</label>
                                <select className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>GBP (£)</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-border flex justify-end">
                             <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                                <Save className="w-4 h-4" />
                                Save Changes
                             </button>
                        </div>
                    </div>
                )}

                {/* Team Settings */}
                {activeTab === 'team' && (
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
                                <p className="text-sm text-muted-foreground">Manage access and roles for your team.</p>
                            </div>
                            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                                Invite Member
                            </button>
                        </div>
                        
                        <div className="border rounded-lg border-border divide-y divide-border">
                            {MOCK_TEAM.map((member) => (
                                <div key={member.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-sm">
                                            {member.avatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{member.name}</p>
                                            <p className="text-xs text-muted-foreground">{member.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                                            member.status === 'Active' 
                                            ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' 
                                            : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
                                        }`}>
                                            {member.status}
                                        </span>
                                        <select defaultValue={member.role} className="text-sm bg-transparent border-none focus:ring-0 text-muted-foreground font-medium cursor-pointer">
                                            <option>Admin</option>
                                            <option>Editor</option>
                                            <option>Viewer</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
                            <p className="text-sm text-muted-foreground">Control how you receive alerts and updates.</p>
                        </div>
                        
                        <div className="space-y-4 max-w-2xl">
                            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Weekly ESG Digest</p>
                                        <p className="text-xs text-muted-foreground">Receive a summary of emissions and target progress.</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-destructive/10 text-destructive rounded-lg">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Critical Risk Alerts</p>
                                        <p className="text-xs text-muted-foreground">Instant notifications for high-severity anomalies.</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                 {/* Security Settings */}
                 {activeTab === 'security' && (
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Security & Compliance</h3>
                            <p className="text-sm text-muted-foreground">Manage password policies and SSO.</p>
                        </div>
                        <div className="p-8 text-center text-muted-foreground bg-muted/30 rounded-lg border border-dashed border-border">
                            <Shield className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                            <p className="text-sm">SSO and Audit Logs are available in the Enterprise Plan.</p>
                            <button className="mt-4 px-4 py-2 text-sm font-medium text-primary hover:underline">Upgrade Plan</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
