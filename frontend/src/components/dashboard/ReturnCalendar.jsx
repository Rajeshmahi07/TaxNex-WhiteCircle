import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';

const ReturnCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const dueDates = [
    { date: '2024-05-11', type: 'GSTR-1', status: 'upcoming', period: 'April 2024' },
    { date: '2024-05-20', type: 'GSTR-3B', status: 'upcoming', period: 'April 2024' },
    { date: '2024-05-31', type: 'TDS Q4', status: 'pending', period: 'Jan-Mar 2024' },
    { date: '2024-06-15', type: 'Advance Tax', status: 'upcoming', period: 'Q1 2024-25' },
    { date: '2024-07-31', type: 'ITR Filing', status: 'upcoming', period: 'AY 2024-25' },
  ];

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle size={14} className="text-green-600" />;
    if (status === 'pending') return <AlertCircle size={14} className="text-red-600" />;
    return <Calendar size={14} className="text-yellow-600" />;
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dueDate = dueDates.find(d => d.date === dateStr);
      
      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedDate(dueDate)}
          className={`border rounded-lg p-2 min-h-24 cursor-pointer transition-all ${
            dueDate ? 'bg-yellow-50 border-yellow-300 hover:shadow-md' : 'hover:bg-gray-50'
          } ${selectedDate?.date === dateStr ? 'ring-2 ring-primary-500' : ''}`}
        >
          <span className={`text-sm font-medium ${dueDate ? 'text-yellow-700' : 'text-gray-700'}`}>
            {day}
          </span>
          {dueDate && (
            <div className="mt-1">
              <div className="flex items-center gap-1 text-xs">
                {getStatusIcon(dueDate.status)}
                <span className="font-medium">{dueDate.type}</span>
              </div>
            </div>
          )}
        </motion.div>
      );
    }

    return days;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Return Filing Calendar</h3>
            <p className="text-sm text-gray-500">Track all your upcoming due dates</p>
          </div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h4 className="text-lg font-semibold text-gray-900">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendar()}
      </div>

      {/* Upcoming Due Dates List */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 mb-3">Upcoming Due Dates</h4>
        <div className="space-y-2">
          {dueDates.map((due, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{due.type}</p>
                <p className="text-xs text-gray-500">Period: {due.period}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-yellow-700 font-medium">
                  Due: {new Date(due.date).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  {getStatusIcon(due.status)}
                  <span className="capitalize">{due.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ReturnCalendar;