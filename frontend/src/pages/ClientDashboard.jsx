import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import DocumentUpload from '../components/dashboard/DocumentUpload';
import FilingHistory from '../components/dashboard/FilingHistory';
import ChatPanel from '../components/dashboard/ChatPanel';
import InvoicePanel from '../components/dashboard/InvoicePanel';
import ProfilePanel from '../components/dashboard/ProfilePanel';
import ComplianceScore from '../components/dashboard/ComplianceScore';
import ReturnCalendar from '../components/dashboard/ReturnCalendar';
import { 
  Bell, Search, Sun, Cloud, Sparkles, ArrowUpRight, 
  FileText, CreditCard, Headphones, Menu, X, 
  ChevronRight, Calendar, Clock, TrendingUp, 
  Wallet, Folder, CheckCircle, AlertCircle, HelpCircle,
  LayoutDashboard, Upload, History, User, MessageCircle
} from 'lucide-react';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [stats, setStats] = useState({ filings: 0, documents: 0, pending: 0, invoices: 0 });
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'GSTR-3B Due Tomorrow', time: '2 hours ago', read: false },
    { id: 2, title: 'Document uploaded successfully', time: '5 hours ago', read: false },
    { id: 3, title: 'ITR Filing acknowledged', time: '1 day ago', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');

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
    
    const fetchData = async () => {
      try {
        const [filingsRes, docsRes, invoicesRes] = await Promise.all([
          axios.get('/api/filings'),
          axios.get('/api/documents'),
          axios.get('/api/invoices')
        ]);
        setStats({
          filings: filingsRes.data.length,
          documents: docsRes.data.length,
          pending: filingsRes.data.filter(f => f.status === 'pending').length,
          invoices: invoicesRes.data.length
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Calculate main content margin based on sidebar state
  const getMainMargin = () => {
    if (isMobile) return 'ml-0';
    return sidebarCollapsed ? 'ml-20' : 'ml-64';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <AnimatePresence mode="wait">
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Welcome Header */}
              <div className="flex flex-wrap justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sun size={16} className="text-gold-500" />
                    <span className="text-xs sm:text-sm text-sky-600 font-medium">{currentTime}</span>
                  </div>
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-sky-900">
                    {greeting}, {user?.name?.split(' ')[0] || 'Guest'}! 👋
                  </h1>
                  <p className="text-sky-600 text-xs sm:text-sm mt-0.5">Welcome back to your compliance dashboard</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative p-2 rounded-xl bg-white border border-sky-100 hover:border-sky-300 transition-all"
                    >
                      <Bell size={18} className="text-sky-600" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-white text-[10px] rounded-full flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                    
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-sky-100 z-20">
                        <div className="p-3 border-b border-sky-100">
                          <h3 className="font-semibold text-sky-900">Notifications</h3>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.map(notif => (
                            <div key={notif.id} className={`p-3 border-b border-sky-50 hover:bg-sky-50 transition-colors ${!notif.read ? 'bg-sky-50/50' : ''}`}>
                              <p className="text-sm text-sky-800">{notif.title}</p>
                              <p className="text-xs text-sky-500 mt-1">{notif.time}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 text-center border-t border-sky-100">
                          <button className="text-xs text-sky-500 hover:text-gold-500">Mark all as read</button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button className="p-2 rounded-xl bg-white border border-sky-100 hover:border-sky-300 transition-all">
                    <Search size={18} className="text-sky-600" />
                  </button>
                </div>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: 'Total Filings', value: stats.filings, icon: FileText, gradient: 'from-sky-500 to-sky-600', trend: '+12%' },
                  { label: 'Documents', value: stats.documents, icon: Folder, gradient: 'from-sky-500 to-sky-600', trend: '+8' },
                  { label: 'Pending Actions', value: stats.pending, icon: AlertCircle, gradient: 'from-gold-500 to-gold-600', trend: 'Action Required' },
                  { label: 'Invoices', value: stats.invoices, icon: Wallet, gradient: 'from-sky-500 to-sky-600', trend: '2 Unpaid' },
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-sky-100"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sky-600 text-xs sm:text-sm mb-1">{card.label}</p>
                          <p className="text-xl sm:text-2xl font-bold text-sky-900">{card.value}</p>
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-sm">
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <h3 className="font-semibold text-sky-900 flex items-center gap-2 text-sm sm:text-base">
                        <Upload size={16} className="text-gold-500" />
                        Quick Upload
                      </h3>
                      <button className="text-sky-500 text-xs hover:text-gold-500 transition-colors flex items-center gap-1">
                        View All <ChevronRight size={12} />
                      </button>
                    </div>
                    <DocumentUpload />
                  </div>

                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-sm">
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <h3 className="font-semibold text-sky-900 flex items-center gap-2 text-sm sm:text-base">
                        <History size={16} className="text-gold-500" />
                        Recent Filings
                      </h3>
                      <button className="text-sky-500 text-xs hover:text-gold-500 transition-colors flex items-center gap-1">
                        View All <ChevronRight size={12} />
                      </button>
                    </div>
                    <FilingHistory limit={3} />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 sm:space-y-6">
                  <ComplianceScore />
                  <ReturnCalendar />
                  
                  <div className="bg-gradient-to-r from-gold-50 to-sky-50 rounded-xl sm:rounded-2xl p-4 border border-gold-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center">
                        <Headphones size={16} className="text-gold-500" />
                      </div>
                      <h4 className="font-semibold text-sky-900 text-sm">Need Help?</h4>
                    </div>
                    <p className="text-sky-600 text-xs sm:text-sm mb-3">
                      Our support team is available 24/7 to assist you.
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-xl transition-all text-xs flex items-center justify-center gap-1">
                        <MessageCircle size={12} />
                        Live Chat
                      </button>
                      <button className="flex-1 py-2 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-xl transition-all text-xs flex items-center justify-center gap-1">
                        <HelpCircle size={12} />
                        FAQ
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 border border-sky-100 shadow-sm">
                    <h4 className="font-semibold text-sky-900 text-sm mb-3 flex items-center gap-2">
                      <Calendar size={14} className="text-gold-500" />
                      Upcoming Deadlines
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-sky-600">GSTR-1 Due Date</span>
                        <span className="text-amber-600 font-medium">May 11, 2026</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-sky-600">GSTR-3B Due Date</span>
                        <span className="text-amber-600 font-medium">May 20, 2026</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-sky-600">ITR Filing Deadline</span>
                        <span className="text-sky-600">July 31, 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        );
      case 'documents':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-sky-900">Document Upload</h1>
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-xl transition-all text-sm">
                Upload New
              </button>
            </div>
            <DocumentUpload />
          </motion.div>
        );
      case 'filings':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-sky-900">Filing History</h1>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-sky-100 text-sky-700 rounded-xl text-sm">Filter</button>
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-500 text-white rounded-xl text-sm">Export</button>
              </div>
            </div>
            <FilingHistory />
          </motion.div>
        );
      case 'invoices':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-sky-900">Invoices & Payments</h1>
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-xl text-sm">
                Pay Now
              </button>
            </div>
            <InvoicePanel />
          </motion.div>
        );
      case 'chat':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Chat Support</h1>
            <ChatPanel />
          </motion.div>
        );
      case 'profile':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl sm:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Profile & KYC</h1>
            <ProfilePanel />
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
        role="client"
        onCollapseChange={setSidebarCollapsed}
      />
      <div className={`dashboard-main flex-1 ${getMainMargin()} p-3 sm:p-4 md:p-6 transition-all duration-300 min-h-screen w-full overflow-x-hidden`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ClientDashboard;