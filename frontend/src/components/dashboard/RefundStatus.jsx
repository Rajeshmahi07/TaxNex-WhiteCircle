import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Search, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const RefundStatus = () => {
  const [pan, setPan] = useState('');
  const [assessmentYear, setAssessmentYear] = useState('2023-24');
  const [loading, setLoading] = useState(false);
  const [refundData, setRefundData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!pan || pan.length !== 10) {
      alert('Please enter a valid 10-digit PAN');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRefundData({
        status: 'processed',
        amount: 25480,
        date: '2024-03-15',
        mode: 'Bank Transfer',
        referenceNo: 'REF/2024-25/001234',
        expectedDate: '2024-04-10',
        stage: 'Payment Initiated',
      });
      setLoading(false);
    }, 1500);
  };

  const getStatusIcon = () => {
    if (!refundData) return null;
    switch (refundData.status) {
      case 'processed':
        return <CheckCircle size={48} className="text-green-600" />;
      case 'pending':
        return <Clock size={48} className="text-yellow-600" />;
      case 'rejected':
        return <XCircle size={48} className="text-red-600" />;
      default:
        return <RefreshCw size={48} className="text-blue-600" />;
    }
  };

  const getStatusColor = () => {
    if (!refundData) return '';
    switch (refundData.status) {
      case 'processed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
          <DollarSign size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Refund Status Tracking</h3>
          <p className="text-sm text-gray-500">Track your income tax refund status</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PAN Card Number</label>
          <input
            type="text"
            className="input-primary"
            placeholder="Enter 10-digit PAN (e.g., AAAAA0000A)"
            value={pan}
            onChange={(e) => setPan(e.target.value.toUpperCase())}
            maxLength={10}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Year</label>
          <select
            className="input-primary"
            value={assessmentYear}
            onChange={(e) => setAssessmentYear(e.target.value)}
          >
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
            <option value="2021-22">2021-22</option>
          </select>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          <Search size={16} className="mr-2" />
          {loading ? 'Checking Status...' : 'Track Refund'}
        </Button>
      </form>

      {refundData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center mb-4">
            {getStatusIcon()}
          </div>
          
          <div className={`text-center p-3 rounded-lg ${getStatusColor()}`}>
            <span className="font-semibold capitalize">{refundData.status}</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Refund Amount:</span>
              <span className="font-semibold text-gray-900">₹{refundData.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Processed Date:</span>
              <span className="text-gray-900">{new Date(refundData.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Mode of Payment:</span>
              <span className="text-gray-900">{refundData.mode}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Reference Number:</span>
              <span className="text-gray-900 text-sm">{refundData.referenceNo}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Expected Credit Date:</span>
              <span className="font-semibold text-green-600">{new Date(refundData.expectedDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              Refund has been processed and will be credited to your registered bank account within 7-10 working days.
            </p>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default RefundStatus;