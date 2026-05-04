import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Sparkles, Shield, Award, Clock } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '#services' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'FAQ', href: '#faq' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'GST Filing', href: '#' },
        { name: 'ITR Filing', href: '#' },
        { name: 'TDS Filing', href: '#' },
        { name: 'Business Registration', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Help Center', href: '#' },
        { name: 'Tax Calculator', href: '#' },
        { name: 'Due Date Calendar', href: '#' },
      ],
    },
  ];

  // Automatically get current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sky-900 border-t border-sky-800">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
                <Sparkles size={20} className="text-sky-900" />
              </div>
              <span className="text-xl font-bold text-white">TaxNex</span>
            </div>
            <p className="text-sky-300 text-sm leading-relaxed mb-4">
              India's most trusted tax and compliance platform. We simplify GST, ITR, and TDS filing for businesses of all sizes.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-gold-500" />
                <span className="text-xs text-sky-300">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-gold-500" />
                <span className="text-xs text-sky-300">Award Winning</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gold-500" />
                <span className="text-xs text-sky-300">24/7 Support</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-sky-400 hover:text-gold-500 transition-all duration-300 hover:scale-110">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-sky-400 hover:text-gold-500 transition-all duration-300 hover:scale-110">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-sky-400 hover:text-gold-500 transition-all duration-300 hover:scale-110">
                <FaFacebook size={20} />
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sky-400 hover:text-gold-500 transition-all duration-200 text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-sky-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sky-400">
          <p>&copy; {currentYear} TaxNex. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-gold-500 transition-colors">Terms of Use</Link>
            <Link to="#" className="hover:text-gold-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;