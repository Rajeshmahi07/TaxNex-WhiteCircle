import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle, Clock, FileText, RefreshCw, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const BusinessRegistrationTracker = () => {
  const [activeTab, setActiveTab] = useState('msme');
  const [registrations, setRegistrations] = useState({
    msme: {
      status: 'active',
      number: 'UDYAM-TN-01-0012345',
      validUntil: 'Lifetime',
      appliedOn: '2023-01-15',
      classification: 'Micro Enterprise',
    },
    iec: {
      status: 'active',
      number: 'IEC1234567890',
      validUntil: 'Lifetime',
      appliedOn: '2023-02-20',
    },
    fssai: {
      status: 'pending',
      number: null,
      validUntil: null,
      appliedOn: '2024-04-01',
      expectedDate: '2024-05-15',
    },
    trademark: {
      status: 'processing',
      applicationNo: 'TMR-2024-001234',
      class: 'Class 35',
      appliedOn: '2024-03-10',
      expectedDate: '2024-09-10',
    },
  });

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      expired: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
        {status === 'active' && <CheckCircle size={12} />}
        {status === 'pending' && <Clock size={12} />}
        {status === 'processing' && <RefreshCw size={12} className="animate-spin" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const tabs = [
    { id: 'msme', label: 'MSME/Udyam', icon: Building2 },
    { id: 'iec', label: 'IEC Code', icon: FileText },
    { id: 'fssai', label: 'FSSAI License', icon: FileText },
    { id: 'trademark', label: 'Trademark', icon: FileText },
  ];

  const currentData = registrations[activeTab];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
          <Building2 size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Business Registration Tracker</h3>
          <p className="text-sm text-gray-500">Track MSME, IEC, FSSAI, Trademark status</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            {getStatusBadge(currentData.status)}
          </div>
          {currentData.number && (
            <div className="text-right">
              <p className="text-sm text-gray-500">Registration Number</p>
              <p className="font-mono text-sm text-gray-900">{currentData.number}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Applied On:</span>
            <span className="text-gray-900">{new Date(currentData.appliedOn).toLocaleDateString()}</span>
          </div>
          {currentData.validUntil && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Valid Until:</span>
              <span className="text-gray-900">{currentData.validUntil}</span>
            </div>
          )}
          {currentData.expectedDate && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Expected Completion:</span>
              <span className="font-semibold text-green-600">{new Date(currentData.expectedDate).toLocaleDateString()}</span>
            </div>
          )}
          {currentData.classification && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Classification:</span>
              <span className="text-gray-900">{currentData.classification}</span>
            </div>
          )}
          {currentData.applicationNo && (
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Application No:</span>
              <span className="font-mono text-sm text-gray-900">{currentData.applicationNo}</span>
            </div>
          )}
        </div>

        {currentData.status === 'pending' && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700 text-center">
              Your application is being processed. You will receive updates via email.
            </p>
          </div>
        )}

        {currentData.status === 'active' && (
          <Button variant="outline" className="w-full mt-4">
            <ExternalLink size={16} className="mr-2" />
            Download Certificate
          </Button>
        )}
      </motion.div>
    </Card>
  );
};

export default BusinessRegistrationTracker;