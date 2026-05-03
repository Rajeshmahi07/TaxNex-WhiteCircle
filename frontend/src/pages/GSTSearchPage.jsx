import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GSTINVerification from '../components/dashboard/GSTINVerification';

const GSTSearchPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              GSTIN <span className="gradient-text">Search & Verification</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Verify any GST number and get complete business details instantly
            </p>
          </motion.div>
          
          <div className="max-w-2xl mx-auto">
            <GSTINVerification />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GSTSearchPage;