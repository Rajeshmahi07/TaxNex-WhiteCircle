import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageCircle, Smartphone, Calendar, Save } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ReminderSettings = () => {
  const [settings, setSettings] = useState({
    gst: {
      gstr1: { enabled: true, days: 3, channel: ['email', 'whatsapp'] },
      gstr3b: { enabled: true, days: 3, channel: ['email', 'whatsapp', 'sms'] },
    },
    itr: {
      july31: { enabled: true, days: 7, channel: ['email', 'whatsapp'] },
      sep30: { enabled: true, days: 7, channel: ['email'] },
    },
    tds: {
      quarterly: { enabled: true, days: 5, channel: ['email', 'whatsapp', 'sms'] },
    },
    channels: {
      email: true,
      whatsapp: true,
      sms: false,
    },
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const reminderTypes = [
    { id: 'gst_gstr1', label: 'GSTR-1 Due Date (11th)', category: 'gst', key: 'gstr1' },
    { id: 'gst_gstr3b', label: 'GSTR-3B Due Date (20th/24th)', category: 'gst', key: 'gstr3b' },
    { id: 'itr_july', label: 'ITR Due Date (31st July)', category: 'itr', key: 'july31' },
    { id: 'itr_sep', label: 'ITR Due Date (30th Sept)', category: 'itr', key: 'sep30' },
    { id: 'tds_quarterly', label: 'TDS Quarterly Returns', category: 'tds', key: 'quarterly' },
  ];

  const toggleReminder = (category, key) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: {
          ...prev[category][key],
          enabled: !prev[category][key].enabled,
        },
      },
    }));
  };

  const toggleChannel = (channel) => {
    setSettings(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: !prev.channels[channel],
      },
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
            <Bell size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Auto Reminder Settings</h3>
            <p className="text-sm text-gray-500">Configure automatic reminders for due dates</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Reminder Types */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Reminder Types</h4>
            <div className="space-y-3">
              {reminderTypes.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{reminder.label}</p>
                    <p className="text-xs text-gray-500">
                      {settings[reminder.category][reminder.key].days} days before due date
                    </p>
                  </div>
                  <button
                    onClick={() => toggleReminder(reminder.category, reminder.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[reminder.category][reminder.key].enabled ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[reminder.category][reminder.key].enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Reminder Channels</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'email', label: 'Email', icon: Mail },
                { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                { id: 'sms', label: 'SMS', icon: Smartphone },
              ].map((channel) => {
                const Icon = channel.icon;
                return (
                  <button
                    key={channel.id}
                    onClick={() => toggleChannel(channel.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      settings.channels[channel.id]
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-500'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{channel.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            <Save size={16} className="mr-2" />
            Save Reminder Settings
          </Button>

          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-600 text-sm"
            >
              ✓ Reminder settings saved successfully!
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ReminderSettings;