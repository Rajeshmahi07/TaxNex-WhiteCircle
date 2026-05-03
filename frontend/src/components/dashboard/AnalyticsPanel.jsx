import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

const AnalyticsPanel = () => {
  const [analytics, setAnalytics] = useState({
    pendingFilings: 0,
    filedThisMonth: 0,
    totalClients: 0,
    clientsWithoutUploads: 0,
    delayReports: 0,
    monthlyStats: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('/api/analytics');
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const statCards = [
    { label: 'Pending Filings', value: analytics.pendingFilings, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Filed This Month', value: analytics.filedThisMonth, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Clients Without Uploads', value: analytics.clientsWithoutUploads, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Delayed Filings', value: analytics.delayReports, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-5"
          >
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Filing Statistics</h3>
        {analytics.monthlyStats.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={analytics.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="filed" fill="#16a34a" name="Filed" />
              <Bar dataKey="pending" fill="#ca8a04" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
};

export default AnalyticsPanel;