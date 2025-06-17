import React, { useState } from 'react';
import { Crisis } from '../types/crisis';
import { Download, FileText, Image, BarChart3, Share2, Mail, Printer } from 'lucide-react';

interface ExportReportsProps {
  crises: Crisis[];
  selectedCrisis: Crisis | null;
}

export default function ExportReports({ crises, selectedCrises }: ExportReportsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<'pdf' | 'excel' | 'json' | 'image'>('pdf');

  const handleExport = async (type: 'pdf' | 'excel' | 'json' | 'image') => {
    setIsExporting(true);
    setExportType(type);

    // Simulate export process
    setTimeout(() => {
      // In production, this would call your backend API
      const filename = `ethron-crisis-report-${new Date().toISOString().split('T')[0]}.${type}`;
      
      // Create mock download
      const element = document.createElement('a');
      element.href = '#';
      element.download = filename;
      element.click();
      
      setIsExporting(false);
    }, 2000);
  };

  const shareReport = async (method: 'email' | 'link') => {
    if (method === 'email') {
      const subject = 'Ethron Crisis Report';
      const body = `Please find the latest crisis analysis report from Ethron.\n\nGenerated on: ${new Date().toLocaleString()}`;
      window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    } else {
      // Copy shareable link to clipboard
      const shareUrl = `${window.location.origin}/report/${Date.now()}`;
      await navigator.clipboard.writeText(shareUrl);
      
      // Show success notification (you could implement a toast system)
      alert('Report link copied to clipboard!');
    }
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <Download className="w-5 h-5 text-cyan-400" />
        <h2 className="text-lg font-bold text-white">Export Reports</h2>
      </div>

      {/* Export Options */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-white mb-3 text-sm">
            Export Format
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors disabled:opacity-50"
            >
              <FileText className="w-5 h-5 text-red-400" />
              <div className="text-left">
                <div className="font-medium text-white text-sm">PDF Report</div>
                <div className="text-xs text-gray-400">Comprehensive analysis</div>
              </div>
            </button>

            <button
              onClick={() => handleExport('excel')}
              disabled={isExporting}
              className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors disabled:opacity-50"
            >
              <BarChart3 className="w-5 h-5 text-green-400" />
              <div className="text-left">
                <div className="font-medium text-white text-sm">Excel Data</div>
                <div className="text-xs text-gray-400">Raw data export</div>
              </div>
            </button>

            <button
              onClick={() => handleExport('json')}
              disabled={isExporting}
              className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors disabled:opacity-50"
            >
              <FileText className="w-5 h-5 text-cyan-400" />
              <div className="text-left">
                <div className="font-medium text-white text-sm">JSON API</div>
                <div className="text-xs text-gray-400">Developer format</div>
              </div>
            </button>

            <button
              onClick={() => handleExport('image')}
              disabled={isExporting}
              className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors disabled:opacity-50"
            >
              <Image className="w-5 h-5 text-yellow-400" />
              <div className="text-left">
                <div className="font-medium text-white text-sm">Map Image</div>
                <div className="text-xs text-gray-400">Visual snapshot</div>
              </div>
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div>
          <h3 className="font-semibold text-white mb-3 text-sm">
            Share Report
          </h3>
          <div className="flex space-x-3">
            <button
              onClick={() => shareReport('email')}
              className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email</span>
            </button>

            <button
              onClick={() => shareReport('link')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Copy Link</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="text-sm">Print</span>
            </button>
          </div>
        </div>

        {/* Export Status */}
        {isExporting && (
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <div className="font-medium text-cyan-300">
                  Generating {exportType.toUpperCase()} Report...
                </div>
                <div className="text-sm text-cyan-400">
                  Processing {crises.length} crisis records
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Summary */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h4 className="font-medium text-white mb-2 text-sm">
            Report Contents
          </h4>
          <div className="space-y-1 text-sm text-gray-400">
            <div>• {crises.length} active crisis situations</div>
            <div>• AI confidence scores and predictions</div>
            <div>• Geographic distribution analysis</div>
            <div>• Trend analysis and forecasting</div>
            <div>• Data source attribution</div>
            <div>• Generated on {new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}