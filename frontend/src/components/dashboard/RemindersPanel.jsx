import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Bell, Plus, Send, Calendar, Mail, MessageCircle, Smartphone, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const RemindersPanel = () => {
  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ 
    clientId: '', 
    type: 'gst', 
    message: '', 
    dueDate: '', 
    channel: 'email' 
  });

  useEffect(() => {
    fetchReminders();
    fetchClients();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await axios.get('/api/admin/reminders');
      setReminders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get('/api/clients');
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/reminders', formData);
      setShowForm(false);
      setFormData({ clientId: '', type: 'gst', message: '', dueDate: '', channel: 'email' });
      fetchReminders();
      alert('Reminder created successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to create reminder');
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email': return <Mail size={14} />;
      case 'whatsapp': return <MessageCircle size={14} />;
      case 'sms': return <Smartphone size={14} />;
      default: return <Bell size={14} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'gst': return 'bg-blue-100 text-blue-700';
      case 'itr': return 'bg-green-100 text-green-700';
      case 'tds': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Reminders Management</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={16} className="mr-2" />
          Create Reminder
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Reminder</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Client
                  </label>
                  <select
                    className="input-primary"
                    required
                    value={formData.clientId}
                    onChange={e => setFormData({ ...formData, clientId: e.target.value })}
                  >
                    <option value="">Select Client</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name} - {c.businessName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Type
                  </label>
                  <select
                    className="input-primary"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="gst">GST Due Date</option>
                    <option value="itr">ITR Due Date</option>
                    <option value="tds">TDS Due Date</option>
                    <option value="general">General Reminder</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="input-primary"
                    required
                    value={formData.dueDate}
                    onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Channel
                  </label>
                  <select
                    className="input-primary"
                    value={formData.channel}
                    onChange={e => setFormData({ ...formData, channel: e.target.value })}
                  >
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  className="input-primary"
                  rows="3"
                  required
                  placeholder="Enter reminder message..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Send size={16} className="mr-2" />
                  Send Reminder
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reminders History</h3>
        {reminders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell size={48} className="mx-auto mb-3 text-gray-300" />
            <p>No reminders created yet</p>
            <p className="text-sm mt-2">Create your first reminder using the button above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Client</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Message</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Due Date</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Channel</th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reminders.map((reminder, index) => (
                  <motion.tr
                    key={reminder.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-3 text-sm text-gray-900">{reminder.clientName || reminder.clientId}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(reminder.type)}`}>
                        {reminder.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-600 max-w-xs truncate">{reminder.message}</td>
                    <td className="p-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(reminder.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-sm">
                        {getChannelIcon(reminder.channel)}
                        <span className="capitalize">{reminder.channel}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      {reminder.sent ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                          <Clock size={12} />
                          Pending
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RemindersPanel;