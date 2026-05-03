import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Download, CheckCircle, Clock, Loader2, FileText } from 'lucide-react';
import Card from '../ui/Card';

const FilingHistory = ({ limit }) => {
  const [filings, setFilings] = useState([]);

  useEffect(() => {
    fetchFilings();
  }, []);

  const fetchFilings = async () => {
    try {
      const res = await axios.get('/api/filings');
      setFilings(limit ? res.data.slice(0, limit) : res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'filed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
            <CheckCircle size={12} />
            Filed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
            <Clock size={12} />
            Pending
          </span>
        );
      case 'in-process':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-cyan-100 text-cyan-700 rounded-full">
            <Loader2 size={12} className="animate-spin" />
            In Process
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-navy-800 mb-4">Filing History</h3>
      {filings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText size={48} className="mx-auto mb-3 text-gray-300" />
          <p>No filings yet</p>
          <p className="text-sm mt-2">Your filing history will appear here</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Period</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Due Date</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Acknowledgement</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filings.map((filing, index) => (
                <motion.tr
                  key={filing.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 text-sm font-medium text-navy-800">{filing.type}</td>
                  <td className="p-3 text-sm text-gray-600">{filing.period}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {filing.dueDate ? new Date(filing.dueDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="p-3">{getStatusBadge(filing.status)}</td>
                  <td className="p-3 text-sm text-gray-600">{filing.acknowledgementNo || '-'}</td>
                  <td className="p-3">
                    {filing.acknowledgementFile && (
                      <button
                        className="text-gold-600 hover:text-gold-700 transition-colors"
                        onClick={() => window.open(filing.acknowledgementFile)}
                      >
                        <Download size={16} />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default FilingHistory;