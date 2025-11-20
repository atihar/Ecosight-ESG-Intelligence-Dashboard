
import React from 'react';
import { FileText, Download, Filter, Plus, FileSpreadsheet, File, Eye, Search } from 'lucide-react';
import { MOCK_REPORTS } from '../constants';

export const ReportingCenter: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reporting Center</h1>
          <p className="text-muted-foreground mt-1">Generate, view, and download compliance and performance reports.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-all">
            <Plus className="w-4 h-4" />
            New Report
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
           <div className="relative w-full sm:w-64">
             <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
             <input 
               type="text" 
               placeholder="Search reports..." 
               className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
             />
           </div>
           <button className="p-2 border border-input rounded-lg hover:bg-muted text-muted-foreground">
             <Filter className="w-4 h-4" />
           </button>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto justify-end">
           <select className="bg-background border border-input text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring">
             <option>All Types</option>
             <option>PDF</option>
             <option>CSV</option>
             <option>Excel</option>
           </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                    <tr>
                        <th className="px-6 py-3 w-[40px]"></th>
                        <th className="px-6 py-3">Report Name</th>
                        <th className="px-6 py-3">Date Created</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Size</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {MOCK_REPORTS.map((report) => (
                        <tr key={report.id} className="group hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className={`p-2 rounded-lg w-fit ${
                                    report.type === 'PDF' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                                    report.type === 'CSV' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                                    'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                }`}>
                                    {report.type === 'PDF' ? <FileText className="w-4 h-4" /> : 
                                     report.type === 'CSV' ? <File className="w-4 h-4" /> : 
                                     <FileSpreadsheet className="w-4 h-4" />}
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-card-foreground">{report.title}</td>
                            <td className="px-6 py-4 text-muted-foreground">{report.date}</td>
                            <td className="px-6 py-4 text-muted-foreground">{report.type}</td>
                            <td className="px-6 py-4 text-muted-foreground">{report.size}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                    report.status === 'Ready' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                    report.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                    'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                                }`}>
                                    {report.status === 'Processing' && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse"></span>}
                                    {report.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="View">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Download">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
