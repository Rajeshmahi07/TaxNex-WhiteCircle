import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Building2, Calendar, User } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const GSTINVerification = () => {
  const [gstin, setGstin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!gstin || gstin.length !== 15) {
      setError('Please enter a valid 15-digit GSTIN');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      if (gstin === '22AAAAA0000A1Z5') {
        setResult({
          valid: true,
          businessName: 'TaxNex SOLUTIONS PVT LTD',
          tradeName: 'TaxNex',
          constitution: 'Private Limited Company',
          state: 'West Bengal',
          stateCode: '22',
          dateOfRegistration: '2020-01-15',
          status: 'Active',
          taxpayerType: 'Regular',
        });
      } else {
        setResult({
          valid: false,
          message: 'GSTIN not found or invalid',
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
          <Search size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">GSTIN Search / Verification</h3>
          <p className="text-sm text-gray-500">Verify GST number and view business details</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            className="input-primary flex-1"
            placeholder="Enter 15-digit GSTIN (e.g., 22AAAAA0000A1Z5)"
            value={gstin}
            onChange={(e) => setGstin(e.target.value.toUpperCase())}
            maxLength={15}
          />
          <Button type="submit" disabled={loading}>
            <Search size={16} className="mr-2" />
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${result.valid ? 'bg-green-50' : 'bg-red-50'}`}
        >
          {result.valid ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle size={20} />
                <span className="font-semibold">Valid GSTIN</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="text-gray-600">Business Name:</span>
                  <span className="font-medium text-gray-900">{result.businessName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <span className="text-gray-600">Trade Name:</span>
                  <span className="font-medium text-gray-900">{result.tradeName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="text-gray-600">Constitution:</span>
                  <span className="font-medium text-gray-900">{result.constitution}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-600">Registration Date:</span>
                  <span className="font-medium text-gray-900">{result.dateOfRegistration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Status:</span>
                  <span className="inline-flex px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                    {result.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Taxpayer Type:</span>
                  <span className="font-medium text-gray-900">{result.taxpayerType}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-700">
              <XCircle size={20} />
              <span>{result.message}</span>
            </div>
          )}
        </motion.div>
      )}
    </Card>
  );
};

export default GSTINVerification;