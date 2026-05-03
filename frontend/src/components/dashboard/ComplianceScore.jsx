import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import Card from '../ui/Card';

const ComplianceScore = () => {
  const [score, setScore] = useState(85);
  const [riskLevel, setRiskLevel] = useState('Medium');
  const [metrics, setMetrics] = useState({
    onTimeFilings: 92,
    documentCompleteness: 78,
    pendingActions: 3,
    auditTrail: 100,
  });

  useEffect(() => {
    // Simulate fetching compliance data
    const interval = setInterval(() => {
      setScore((prev) => Math.min(100, prev + Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = () => {
    if (score >= 80) return 'stroke-green-600';
    if (score >= 60) return 'stroke-yellow-600';
    return 'stroke-red-600';
  };

  const getRiskColor = () => {
    if (score >= 80) return 'bg-green-100 text-green-700';
    if (score >= 60) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Compliance Score Meter</h3>
          <p className="text-sm text-gray-500">Your overall compliance health</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor()}`}>
          {riskLevel} Risk
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* Score Circle */}
        <div className="relative">
          <svg width="180" height="180" className="transform -rotate-90">
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
            />
            <motion.circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              className={getScoreBg()}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
              strokeDasharray={circumference}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-4xl font-bold ${getScoreColor()}`}
            >
              {Math.round(score)}
            </motion.span>
            <span className="text-sm text-gray-500">out of 100</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mt-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">On-Time Filings</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{metrics.onTimeFilings}%</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">Document Complete</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{metrics.documentCompleteness}%</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-yellow-600 mb-1">
              <Clock size={16} />
              <span className="text-sm font-medium">Pending Actions</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{metrics.pendingActions}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
              <AlertCircle size={16} />
              <span className="text-sm font-medium">Audit Trail</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{metrics.auditTrail}%</p>
          </div>
        </div>

        {/* Risk Alerts */}
        {score < 70 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-yellow-50 rounded-lg w-full"
          >
            <div className="flex items-center gap-2 text-yellow-700">
              <AlertCircle size={16} />
              <span className="text-sm font-medium">Action Required:</span>
              <span className="text-sm">Pending filings detected. Please upload documents.</span>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default ComplianceScore;