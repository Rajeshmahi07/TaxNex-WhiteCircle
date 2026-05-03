import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  
  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'CEO, TechStart Pvt Ltd',
      text: 'TaxNex has transformed how we handle compliance. Their automated reminders and dedicated CA support have saved us countless hours. The dashboard is incredibly intuitive and easy to use.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=0ea5e9&color=fff'
    },
    {
      name: 'Priya Patel',
      role: 'Founder, GreenLeaf Organics',
      text: 'The dashboard is incredibly intuitive. I can track all my GST and ITR filings in one place. Highly recommended for small businesses. Their customer support is exceptional.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Priya+Patel&background=0ea5e9&color=fff'
    },
    {
      name: 'Amit Kumar',
      role: 'Director, Kumar Enterprises',
      text: 'We switched from a traditional CA to TaxNex and never looked back. The pricing is transparent and the service is exceptional. Real game changer for our business.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Amit+Kumar&background=0ea5e9&color=fff'
    },
    {
      name: 'Sneha Gupta',
      role: 'CFO, Innovate Solutions',
      text: 'The enterprise plan with CFO advisory has been a game-changer for our growing company. Their compliance automation is top-notch and saves us hours every month.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Sneha+Gupta&background=0ea5e9&color=fff'
    }
  ];

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="py-20 lg:py-28 bg-sky-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gold-100 text-gold-600 text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-sky-900">
            What Our <span className="text-gold-500">Clients Say</span>
          </h2>
          <p className="text-sky-600 max-w-2xl mx-auto">
            Trusted by thousands of businesses across India
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="flex flex-col items-center text-center">
                <img 
                  src={testimonials[current].image} 
                  alt={testimonials[current].name}
                  className="w-16 h-16 rounded-full mb-4 ring-2 ring-gold-500"
                />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <Quote size={32} className="text-gold-500/50 mb-4" />
                <p className="text-sky-700 text-lg leading-relaxed mb-6 max-w-2xl">
                  "{testimonials[current].text}"
                </p>
                <h4 className="font-semibold text-sky-900 text-lg">{testimonials[current].name}</h4>
                <p className="text-gold-500 text-sm">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white text-sky-600 hover:bg-gold-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-gold-500' : 'bg-sky-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white text-sky-600 hover:bg-gold-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;