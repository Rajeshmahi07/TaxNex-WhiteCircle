// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_CONFIG = {
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// App Configuration
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'TaxSure',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
};

// Feature Flags
export const FEATURES = {
  gstVerification: true,
  refundTracking: true,
  complianceScore: true,
  businessTracker: true,
};

// Upload Configuration
export const UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
};

// App Settings
export const APP_SETTINGS = {
  chatRefreshInterval: 5000,
  itemsPerPage: 10,
  dateFormat: 'DD/MM/YYYY',
  currencySymbol: '₹',
  currencyCode: 'INR',
};

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    profile: '/auth/profile',
    updateProfile: '/auth/profile',
  },
  documents: {
    list: '/documents',
    upload: '/documents/upload',
    delete: (id) => `/documents/${id}`,
  },
  filings: {
    list: '/filings',
    create: '/filings',
    update: (id) => `/filings/${id}`,
  },
  invoices: {
    list: '/invoices',
    pay: (id) => `/invoices/${id}/pay`,
    download: (id) => `/invoices/${id}/download`,
  },
  chat: {
    conversation: (userId) => `/chat/conversation/${userId}`,
    send: '/chat',
    markRead: (id) => `/chat/${id}/read`,
  },
  admin: {
    dashboard: '/admin/dashboard',
    clients: '/clients',
    reminders: '/admin/reminders',
  },
  analytics: '/analytics',
  gst: {
    verify: '/gst/verify',
  },
  reminders: {
    list: '/reminders',
    create: '/reminders',
    delete: (id) => `/reminders/${id}`,
  },
  business: {
    track: (type) => `/business/${type}`,
    update: (id) => `/business/${id}`,
  },
};