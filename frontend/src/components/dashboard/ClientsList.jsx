import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Mail, Phone, Building } from 'lucide-react';
import Card from '../ui/Card';

const ClientsList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get('/api/clients');
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">All Clients</h3>
      {clients.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Building size={48} className="mx-auto mb-3 text-gray-300" />
          <p>No clients registered yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Client</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Contact</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Business</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">GSTIN</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">PAN</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold">
                        {client.name?.[0] || 'C'}
                      </div>
                      <span className="font-medium text-gray-900">{client.name}</span>
                    </div>
                   </td>
                  <td className="p-3">
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail size={12} /> {client.email}
                      </div>
                      {client.phone && (
                        <div className="flex items-center gap-1 mt-1">
                          <Phone size={12} /> {client.phone}
                        </div>
                      )}
                    </div>
                   </td>
                  <td className="p-3 text-sm text-gray-600">{client.businessName || '-'}</td>
                  <td className="p-3 text-sm text-gray-600">{client.gstin || '-'}</td>
                  <td className="p-3 text-sm text-gray-600">{client.pan || '-'}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {new Date(client.createdAt).toLocaleDateString()}
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

export default ClientsList;