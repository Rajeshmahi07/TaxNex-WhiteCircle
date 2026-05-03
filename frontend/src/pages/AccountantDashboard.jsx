import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import DocumentUpload from '../components/dashboard/DocumentUpload';
import FilingHistory from '../components/dashboard/FilingHistory';
import ChatPanel from '../components/dashboard/ChatPanel';
import { 
  Sun, Bell, Search, TrendingUp, FileText, Users, 
  CheckCircle, Clock, Calendar, FolderOpen, MessageCircle,
  DollarSign, Upload, Star, Sparkles, ArrowUpRight
} from 'lucide-react';

const AccountantDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stats] = useState({ 
    filings: 12, 
    documents: 45, 
    pending: 5, 
    invoices: 8,
    completed: 7,
    inProgress: 3
  });
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
    
    setCurrentTime(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  const getMainMargin = () => {
    if (isMobile) return 'ml-0';
    return sidebarCollapsed ? 'ml-20' : 'ml-64';
  };

  const statCards = [
    { label: 'Total Filings', value: stats.filings, icon: FileText, gradient: 'from-sky-500 to-sky-600', trend: '+12%', desc: 'This month' },
    { label: 'Documents', value: stats.documents, icon: FolderOpen, gradient: 'from-sky-500 to-sky-600', trend: '+8', desc: 'Uploaded' },
    { label: 'Pending Tasks', value: stats.pending, icon: Clock, gradient: 'from-amber-500 to-amber-600', trend: 'Urgent', desc: 'Need attention' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, gradient: 'from-green-500 to-green-600', trend: '+5', desc: 'This week' },
  ];

  const recentActivities = [
    { id: 1, title: 'GST Filing completed for TechStart Pvt Ltd', time: '2 hours ago', status: 'completed', icon: CheckCircle },
    { id: 2, title: 'New document uploaded by GreenLeaf Organics', time: '5 hours ago', status: 'pending', icon: Upload },
    { id: 3, title: 'ITR filing in progress for Kumar Enterprises', time: '1 day ago', status: 'in-progress', icon: Clock },
    { id: 4, title: 'Client consultation scheduled with Sneha Gupta', time: '2 days ago', status: 'upcoming', icon: Calendar },
  ];

  const getActivityColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-amber-600 bg-amber-50';
      case 'in-progress': return 'text-sky-600 bg-sky-50';
      default: return 'text-purple-600 bg-purple-50';
    }
  };

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
            <div className="flex flex-wrap justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sun size={18} className="text-gold-500" />
                  <span className="text-xs sm:text-sm text-sky-600 font-medium">{currentTime}</span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-900">
                  {greeting}, {user?.name?.split(' ')[0] || 'Staff'}! 👋
                </h1>
                <p className="text-sky-600 text-sm mt-1">Manage your assigned tasks and client requests</p>
              </div>
              
              <div className="flex gap-2">
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-xl bg-white border border-sky-100 hover:border-sky-300 transition-all"
                  >
                    <Bell size={18} className="text-sky-600" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
                  </button>
                </div>
                <button className="p-2 rounded-xl bg-white border border-sky-100 hover:border-sky-300 transition-all">
                  <Search size={18} className="text-sky-600" />
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
                        <p className="text-[10px] text-sky-500 mt-1">{card.desc}</p>
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

            {/* Recent Activity & Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mt-4">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-sky-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-sky-900 flex items-center gap-2 text-sm sm:text-base">
                    <Sparkles size={16} className="text-gold-500" />
                    Recent Activity
                  </h3>
                  <button className="text-sky-500 text-xs hover:text-gold-500 transition-colors">
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-sky-50 transition-all">
                        <div className={`p-1.5 rounded-lg ${getActivityColor(activity.status)}`}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-sky-800">{activity.title}</p>
                          <p className="text-xs text-sky-500 mt-0.5">{activity.time}</p>
                        </div>
                        <ArrowUpRight size={14} className="text-sky-400" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Assigned Tasks Summary */}
              <div className="bg-gradient-to-r from-sky-50 to-white rounded-xl p-4 sm:p-5 border border-sky-100">
                <h3 className="font-semibold text-sky-900 flex items-center gap-2 text-sm sm:text-base mb-4">
                  <CheckCircle size={16} className="text-gold-500" />
                  Task Summary
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-sky-600">Completed Tasks</span>
                      <span className="text-green-600 font-semibold">{stats.completed}/20</span>
                    </div>
                    <div className="w-full bg-sky-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-sky-600">In Progress</span>
                      <span className="text-amber-600 font-semibold">{stats.inProgress}/20</span>
                    </div>
                    <div className="w-full bg-sky-100 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-sky-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-sky-600">Overall Completion</span>
                      <span className="text-gold-600 font-semibold">50%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Tasks Table */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-sky-100 shadow-sm mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sky-900 flex items-center gap-2 text-sm sm:text-base">
                  <FileText size={16} className="text-gold-500" />
                  Assigned Tasks
                </h3>
                <button className="text-sky-500 text-xs hover:text-gold-500 transition-colors">
                  View All Tasks →
                </button>
              </div>
              <FilingHistory limit={5} />
            </div>
          </motion.div>
        );
      case 'tasks':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-sky-900">My Tasks</h1>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-sky-100 text-sky-700 rounded-xl text-sm">All Tasks</button>
                <button className="px-3 py-1.5 bg-gold-500 text-white rounded-xl text-sm">Pending</button>
                <button className="px-3 py-1.5 bg-green-500 text-white rounded-xl text-sm">Completed</button>
              </div>
            </div>
            <FilingHistory />
          </motion.div>
        );
      case 'documents':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-sky-900">Client Uploads</h1>
              <button className="px-3 py-1.5 bg-gold-500 text-white rounded-xl text-sm">Filter</button>
            </div>
            <DocumentUpload />
          </motion.div>
        );
      case 'filings':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-sky-900">Process Filings</h1>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-sky-100 text-sky-700 rounded-xl text-sm">Pending</button>
                <button className="px-3 py-1.5 bg-gold-500 text-white rounded-xl text-sm">Process</button>
              </div>
            </div>
            <FilingHistory />
          </motion.div>
        );
      case 'chat':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Client Chat</h1>
            <ChatPanel />
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
        role="accountant"
        onCollapseChange={setSidebarCollapsed}
      />
      <div className={`dashboard-main flex-1 ${getMainMargin()} p-3 sm:p-4 md:p-6 transition-all duration-300 min-h-screen w-full overflow-x-hidden`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountantDashboard;