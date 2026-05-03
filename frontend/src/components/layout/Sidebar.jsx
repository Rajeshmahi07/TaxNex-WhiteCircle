import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, Bell, BarChart3, LogOut, Menu, X, 
  Shield, DollarSign, Search, Sparkles, Settings,
  LayoutDashboard, FolderOpen, History, CreditCard, Headphones, UserCircle,
  FileText, MessageCircle, ChevronLeft, Home, Upload, TrendingUp,
  Calendar, Clock, AlertCircle, CheckCircle, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab, role, onCollapseChange }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isAdmin = role === 'admin';
  
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);
  
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const clientMenu = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', label: 'Document Upload', icon: FolderOpen },
    { id: 'filings', label: 'Filing History', icon: History },
    { id: 'invoices', label: 'Invoices & Payments', icon: CreditCard },
    { id: 'chat', label: 'Chat Support', icon: Headphones },
    { id: 'profile', label: 'Profile & KYC', icon: UserCircle },
  ];

  const adminMenu = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Client Management', icon: Users },
    { id: 'documents', label: 'Document Inbox', icon: FolderOpen },
    { id: 'filings', label: 'Filing Workflow', icon: History },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'gst-verify', label: 'GST Verification', icon: Search },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'refund', label: 'Refund Status', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'chat', label: 'Messages', icon: MessageCircle },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const accountantMenu = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: History },
    { id: 'documents', label: 'Client Uploads', icon: FolderOpen },
    { id: 'filings', label: 'Process Filings', icon: FileText },
    { id: 'chat', label: 'Client Chat', icon: Headphones },
  ];

  const menu = role === 'admin' ? adminMenu : role === 'accountant' ? accountantMenu : clientMenu;

  // Admin Dark Theme Sidebar
  const sidebarClasses = isAdmin 
    ? `fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white z-50 overflow-y-auto shadow-2xl transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`
    : `fixed top-0 left-0 h-full bg-white border-r border-sky-100 text-sky-800 z-50 overflow-y-auto shadow-2xl transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`;

  const itemBaseClasses = (isActive) => {
    if (isAdmin) {
      return `flex items-center gap-3 px-3 py-2.5 mx-2 my-0.5 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-700 hover:text-white ${isActive ? 'bg-slate-700 text-white shadow-md' : ''}`;
    } else {
      return `flex items-center gap-3 px-3 py-2.5 mx-2 my-0.5 rounded-xl transition-all duration-200 text-sky-600 hover:bg-sky-50 hover:text-sky-800 ${isActive ? 'bg-sky-100 text-sky-800 shadow-sm' : ''}`;
    }
  };

  const menuVariants = {
    hidden: { x: -320, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, type: 'spring', stiffness: 300, damping: 25 } },
    exit: { x: -320, opacity: 0, transition: { duration: 0.2 } }
  };

  const openSidebar = () => setIsMobileOpen(true);
  const closeSidebar = () => setIsMobileOpen(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={openSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl shadow-lg transition-all bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:shadow-xl"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(isMobileOpen || window.innerWidth >= 1024) && (
          <motion.aside
            key="sidebar"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${sidebarClasses} ${isMobileOpen ? 'block' : 'hidden lg:block'}`}
          >
            {/* Header with Collapse Button */}
            <div className="flex justify-end p-2">
              {!isMobileOpen && window.innerWidth >= 1024 && (
                <button
                  onClick={toggleCollapse}
                  className="p-2 rounded-lg hover:bg-slate-700 transition-all text-slate-400"
                  title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  <ChevronLeft size={18} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>

            {/* Logo Section */}
            <div className={`px-4 pb-4 ${!isCollapsed ? 'border-b' : ''} ${isAdmin ? 'border-slate-700' : 'border-sky-100'}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Sparkles size={16} className="text-slate-900" />
                </div>
                {!isCollapsed && (
                  <div>
                    <span className={`text-base font-bold block ${isAdmin ? 'text-white' : 'text-sky-800'}`}>TaxNex</span>
                    <span className={`text-[10px] ${isAdmin ? 'text-slate-400' : 'text-sky-500'}`}>Compliance Platform</span>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="py-3 px-2 pb-32">
              {!isCollapsed && (
                <p className={`text-[10px] font-semibold uppercase tracking-wider px-2 mb-2 ${isAdmin ? 'text-slate-400' : 'text-sky-500'}`}>
                  Main Menu
                </p>
              )}
              {menu.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) closeSidebar();
                    }}
                    className={`${itemBaseClasses(isActive)} group w-full text-left ${!isCollapsed ? 'justify-start' : 'justify-center'}`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon size={18} className={`transition-all duration-200 flex-shrink-0 ${isActive ? (isAdmin ? 'text-white' : 'text-sky-700') : 'group-hover:scale-110'}`} />
                    {!isCollapsed && (
                      <>
                        <span className="text-xs font-medium flex-1">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="active-indicator"
                            className="w-1 h-5 bg-gold-500 rounded-full"
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            {/* User Profile Section */}
            <div className={`absolute bottom-0 left-0 right-0 p-3 border-t ${isAdmin ? 'border-slate-700 bg-slate-800' : 'border-sky-100 bg-white'}`}>
              <div className={`flex items-center gap-2 mb-3 ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="w-8 h-8 bg-gradient-to-r from-gold-100 to-gold-200 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="font-semibold text-gold-700 text-xs">{user?.name?.[0]?.toUpperCase() || 'A'}</span>
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold truncate ${isAdmin ? 'text-white' : 'text-sky-800'}`}>{user?.name || 'Admin'}</div>
                    <div className={`text-[10px] truncate ${isAdmin ? 'text-slate-400' : 'text-sky-500'}`}>{user?.email?.split('@')[0] || 'admin'}</div>
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-2 px-2 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-xs group ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? 'Logout' : ''}
              >
                <LogOut size={14} className="group-hover:rotate-180 transition-transform" />
                {!isCollapsed && <span>Logout</span>}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;