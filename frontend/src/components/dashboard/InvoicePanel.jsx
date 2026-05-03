import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Download, CreditCard, CheckCircle, Clock, FileText } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const InvoicePanel = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get('/api/invoices');
      setInvoices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePay = async (id) => {
    setLoading(true);
    try {
      await axios.put(`/api/invoices/${id}/pay`);
      fetchInvoices();
      alert('Payment recorded successfully!');
    } catch (err) {
      console.error(err);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
          <CheckCircle size={12} />
          Paid
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
          <Clock size={12} />
          Unpaid
        </span>
      );
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoices & Payments</h3>
      
      {invoices.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText size={48} className="mx-auto mb-3 text-gray-300" />
          <p>No invoices found</p>
          <p className="text-sm mt-2">Your invoices will appear here</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Invoice No</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Description</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Due Date</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((inv, index) => (
                <motion.tr
                  key={inv.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 text-sm font-medium text-gray-900">{inv.invoiceNo}</td>
                  <td className="p-3 text-sm text-gray-600">{inv.description || 'Service Fee'}</td>
                  <td className="p-3 text-sm font-semibold text-gray-900">
                    ₹{inv.totalAmount?.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {new Date(inv.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">{getStatusBadge(inv.status)}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                        onClick={() => window.open(`/api/invoices/${inv.id}/download`)}
                      >
                        <Download size={16} />
                      </button>
                      {inv.status === 'unpaid' && (
                        <Button
                          size="sm"
                          onClick={() => handlePay(inv.id)}
                          disabled={loading}
                          className="px-3 py-1 text-sm"
                        >
                          <CreditCard size={14} className="mr-1" />
                          Pay
                        </Button>
                      )}
                    </div>
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

export default InvoicePanel; 