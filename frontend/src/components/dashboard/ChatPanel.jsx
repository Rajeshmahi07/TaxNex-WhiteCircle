import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Send, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState('admin');
  const { user } = useAuth();

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [receiverId]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/chat/conversation/${receiverId}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await axios.post('/api/chat', { receiverId, content: newMessage });
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Chat with Support</h3>
        <p className="text-sm text-gray-500">Our team will respond within 24 hours</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No messages yet. Start a conversation!</p>
            <p className="text-sm mt-2">Our support team is here to help you.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.senderId === user?.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-xs font-semibold mb-1 opacity-80">
                  {msg.senderName || (msg.senderId === user?.id ? 'You' : 'Support')}
                </div>
                <div className="text-sm">{msg.content}</div>
                <div className="text-xs mt-1 opacity-70 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 input-primary py-2"
        />
        <button
          type="submit"
          className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </Card>
  );
};

export default ChatPanel;