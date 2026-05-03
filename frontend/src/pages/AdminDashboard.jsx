import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Sidebar from '../components/layout/Sidebar';
import DocumentUpload from '../components/dashboard/DocumentUpload';
import FilingHistory from '../components/dashboard/FilingHistory';
import ChatPanel from '../components/dashboard/ChatPanel';
import InvoicePanel from '../components/dashboard/InvoicePanel';
import AnalyticsPanel from '../components/dashboard/AnalyticsPanel';
import ClientsList from '../components/dashboard/ClientsList';
import RemindersPanel from '../components/dashboard/RemindersPanel';
import ReminderSettings from '../components/dashboard/ReminderSettings';
import GSTINVerification from '../components/dashboard/GSTINVerification';
import ComplianceScore from '../components/dashboard/ComplianceScore';
import ReturnCalendar from '../components/dashboard/ReturnCalendar';
import RefundStatus from '../components/dashboard/RefundStatus';
import BusinessRegistrationTracker from '../components/dashboard/BusinessRegistrationTracker';
import { 
  Users, FileText, Clock, DollarSign, TrendingUp, 
  Calendar, Bell, Menu, X, Shield, Search, 
  ArrowUpRight, Wallet, Folder, CheckCircle, 
  LayoutDashboard, History, MessageCircle, Settings,
  CreditCard, Headphones, UserCircle, Sparkles
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({ 
    totalClients: 0, 
    totalFilings: 0, 
    pendingFilings: 0, 
    filedCount: 0, 
    totalDocuments: 0, 
    unpaidInvoices: 0 
  });

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin/dashboard');
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate main content margin based on sidebar state
  const getMainMargin = () => {
    if (isMobile) return 'ml-0';
    return sidebarCollapsed ? 'ml-20' : 'ml-64';
  };

  const statCards = [
    { label: 'Total Clients', value: stats.totalClients, icon: Users, gradient: 'from-sky-500 to-sky-600', trend: '+12%' },
    { label: 'Total Filings', value: stats.totalFilings, icon: FileText, gradient: 'from-sky-500 to-sky-600', trend: '+8%' },
    { label: 'Pending Filings', value: stats.pendingFilings, icon: Clock, gradient: 'from-amber-500 to-amber-600', trend: 'Attention' },
    { label: 'Filed This Month', value: stats.filedCount, icon: CheckCircle, gradient: 'from-green-500 to-green-600', trend: '+18%' },
    { label: 'Total Documents', value: stats.totalDocuments, icon: Folder, gradient: 'from-purple-500 to-purple-600', trend: '+23%' },
    { label: 'Unpaid Invoices', value: stats.unpaidInvoices, icon: DollarSign, gradient: 'from-red-500 to-red-600', trend: 'Overdue' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5 sm:space-y-6"
          >
            {/* Header */}
            <div className="mb-5 sm:mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-900">Admin Dashboard</h1>
              <p className="text-sky-600 text-sm mt-1">Manage and monitor your tax compliance platform</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
              {statCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-sky-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sky-600 text-[10px] sm:text-xs uppercase tracking-wider">{card.label}</p>
                        <p className="text-xl sm:text-2xl font-bold text-sky-900 mt-1">{card.value}</p>
                      </div>
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center`}>
                        <Icon size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-green-600">
                      <TrendingUp size={10} />
                      <span>{card.trend}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mt-4 sm:mt-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-5 sm:space-y-6">
                {/* Compliance & Calendar Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <ComplianceScore />
                  <ReturnCalendar />
                </div>
                
                {/* Recent Filings */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-sm">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h3 className="font-semibold text-sky-900 flex items-center gap-2 text-sm sm:text-base">
                      <FileText size={16} className="text-gold-500" />
                      Recent Filings
                    </h3>
                    <button className="text-sky-500 text-xs hover:text-gold-500 transition-colors">
                      View All →
                    </button>
                  </div>
                  <FilingHistory limit={5} />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5 sm:space-y-6">
                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-sky-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-sky-100">
                  <h3 className="font-semibold text-sky-900 text-sm mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-2.5 bg-white rounded-lg border border-sky-100 hover:border-gold-300 transition-all">
                      <span className="text-sm text-sky-700">Add New Client</span>
                      <Users size={14} className="text-gold-500" />
                    </button>
                    <button className="w-full flex items-center justify-between p-2.5 bg-white rounded-lg border border-sky-100 hover:border-gold-300 transition-all">
                      <span className="text-sm text-sky-700">Generate Report</span>
                      <FileText size={14} className="text-gold-500" />
                    </button>
                    <button className="w-full flex items-center justify-between p-2.5 bg-white rounded-lg border border-sky-100 hover:border-gold-300 transition-all">
                      <span className="text-sm text-sky-700">Send Reminders</span>
                      <Bell size={14} className="text-gold-500" />
                    </button>
                  </div>
                </div>

                {/* Business Registration Tracker */}
                <BusinessRegistrationTracker />

                {/* Support Card */}
                <div className="bg-gradient-to-r from-amber-50 to-sky-50 rounded-xl sm:rounded-2xl p-4 border border-amber-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center">
                      <Shield size={16} className="text-gold-500" />
                    </div>
                    <h4 className="font-semibold text-sky-900 text-sm">System Status</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-sky-600">API Server</span>
                      <span className="text-green-600">● Operational</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-sky-600">Database</span>
                      <span className="text-green-600">● Connected</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-sky-600">Last Backup</span>
                      <span className="text-sky-600">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'clients':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-sky-900">Client Management</h1>
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-xl transition-all text-sm">
                Add New Client
              </button>
            </div>
            <ClientsList />
          </motion.div>
        );
      case 'documents':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Document Inbox</h1>
            <DocumentUpload />
          </motion.div>
        );
      case 'filings':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-sky-900">Filing Workflow</h1>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-sky-100 text-sky-700 rounded-xl text-sm">Filter</button>
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-500 text-white rounded-xl text-sm">Export</button>
              </div>
            </div>
            <FilingHistory />
          </motion.div>
        );
      case 'reminders':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Reminders</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              <RemindersPanel />
              <ReminderSettings />
            </div>
          </motion.div>
        );
      case 'gst-verify':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">GST Verification</h1>
            <GSTINVerification />
          </motion.div>
        );
      case 'compliance':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Compliance Overview</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              <ComplianceScore />
              <BusinessRegistrationTracker />
            </div>
          </motion.div>
        );
      case 'refund':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Refund Status</h1>
            <RefundStatus />
          </motion.div>
        );
      case 'analytics':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Analytics & Reports</h1>
            <AnalyticsPanel />
          </motion.div>
        );
      case 'chat':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Messages</h1>
            <ChatPanel />
          </motion.div>
        );
      case 'invoices':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Invoices</h1>
            <InvoicePanel />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role="admin"
        onCollapseChange={setSidebarCollapsed}
      />
      <div className={`dashboard-main flex-1 ${getMainMargin()} p-3 sm:p-4 md:p-6 transition-all duration-300 min-h-screen w-full overflow-x-hidden`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;