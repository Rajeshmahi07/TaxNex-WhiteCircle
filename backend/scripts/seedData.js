const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Reminder = require('../models/Reminder');

const seedUsers = async () => {
  const users = [
    {
      name: 'Admin User',
      email: 'admin@taxsure.com',
      password: await bcrypt.hash('Admin@123', 10),
      role: 'admin',
      phone: '9876543210',
      isActive: true,
      emailVerified: true,
    },
    {
      name: 'Accountant User',
      email: 'accountant@taxsure.com',
      password: await bcrypt.hash('Accountant@123', 10),
      role: 'accountant',
      phone: '9876543211',
      isActive: true,
      emailVerified: true,
    },
    {
      name: 'Demo Client',
      email: 'client@example.com',
      password: await bcrypt.hash('Client@123', 10),
      role: 'client',
      phone: '9876543212',
      businessName: 'Demo Business Pvt Ltd',
      gstin: '22AAAAA0000A1Z5',
      pan: 'AAAAA0000A',
      isActive: true,
      emailVerified: true,
    },
  ];
  
  for (const user of users) {
    const existing = await User.findOne({ email: user.email });
    if (!existing) {
      await User.create(user);
      console.log(`✅ Created user: ${user.email}`);
    } else {
      console.log(`⚠️ User already exists: ${user.email}`);
    }
  }
};

const seedReminders = async () => {
  const reminders = [
    {
      type: 'gst',
      subType: 'GSTR-1',
      title: 'GSTR-1 Due Date',
      message: 'Your GSTR-1 for the previous month is due on 11th. Please upload your sales data.',
      daysBefore: 3,
      channels: { email: true, whatsapp: true, sms: false },
    },
    {
      type: 'gst',
      subType: 'GSTR-3B',
      title: 'GSTR-3B Due Date',
      message: 'Your GSTR-3B for the previous month is due on 20th. Please complete your filing.',
      daysBefore: 3,
      channels: { email: true, whatsapp: true, sms: true },
    },
    {
      type: 'itr',
      subType: 'ITR-July31',
      title: 'ITR Filing Deadline',
      message: 'Income Tax Return for individuals is due on 31st July.',
      daysBefore: 7,
      channels: { email: true, whatsapp: true, sms: false },
    },
    {
      type: 'itr',
      subType: 'ITR-Sept30',
      title: 'ITR Filing Deadline (Tax Audit)',
      message: 'Income Tax Return for businesses with tax audit is due on 30th September.',
      daysBefore: 7,
      channels: { email: true, whatsapp: false, sms: false },
    },
    {
      type: 'tds',
      subType: 'TDS-Quarterly',
      title: 'TDS Quarterly Return Due',
      message: 'Your TDS quarterly return is due. Please submit the challan details.',
      daysBefore: 5,
      channels: { email: true, whatsapp: true, sms: true },
    },
  ];
  
  for (const reminder of reminders) {
    const existing = await Reminder.findOne({ title: reminder.title });
    if (!existing) {
      await Reminder.create(reminder);
      console.log(`✅ Created reminder: ${reminder.title}`);
    } else {
      console.log(`⚠️ Reminder already exists: ${reminder.title}`);
    }
  }
};

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');
    
    await seedUsers();
    await seedReminders();
    
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();