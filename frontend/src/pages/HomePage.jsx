import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import ServicesGrid from '../components/home/ServicesGrid';
import DashboardPreview from '../components/home/DashboardPreview';
import KeyFeatures from '../components/home/KeyFeatures';
import PricingSection from '../components/home/PricingSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import CareerSection from '../components/home/CareerSection';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      {/* Services Section with ID */}
      <div id="services">
        <ServicesGrid />
      </div>
      {/* Dashboard Preview */}
      <DashboardPreview />
      {/* Key Features */}
      <KeyFeatures />
      {/* Pricing Section with ID */}
      <div id="pricing">
        <PricingSection />
      </div>
      {/* Why Choose Us */}
      <WhyChooseUs />
      {/* Testimonials */}
      <Testimonials />
      {/* FAQ Section with ID */}
      <div id="faq">
        <FAQ />
      </div>
      {/* Career Section */}
      <CareerSection />
      <Footer />
    </>
  );
};

export default HomePage;