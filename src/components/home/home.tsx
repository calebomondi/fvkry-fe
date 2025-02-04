import { motion } from 'framer-motion';
import AnimatedSection from '../AnimatedSection/animatedsection';

import { Lock, Wallet, Shield, Clock, BookOpen} from 'lucide-react';
import vault from '/vault.png'

import StatisticsSection from './stats';
import TokensSection from './tokens';
import FAQ from './faq';
import Footer from './footer';
import Navbar from '../navbar/navbar';
import { CustomConnectButton } from './walletconnectflow';

import { useNavigate } from 'react-router-dom';

export default function Home () {
  const features = [
    {
      icon: <Lock className="w-8 h-8 text-amber-500" />,
      title: "Secure Asset Locking",
      description: "Lock your ETH and ERC20 tokens in secure smart contracts with customizable time periods"
    },
    {
      icon: <Shield className="w-8 h-8 text-amber-500" />,
      title: "Audited Security",
      description: "Smart contracts audited by leading security firms ensuring your assets are protected"
    },
    {
      icon: <Clock className="w-8 h-8 text-amber-500" />,
      title: "Flexible Time Locks",
      description: "Choose your lock duration from 1 week to 1 year with automatic unlocking"
    },
    {
      icon: <Wallet className="w-8 h-8 text-amber-500" />,
      title: "Multi-Token Support",
      description: "Support for ETH and major ERC20 tokens with more assets coming soon"
    }
  ];

  const navigate = useNavigate()

  const handledDocu = () => {
    navigate("/documentation");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="hero" 
        className="md:pt-28 h-screen flex items-center justify-center"
      >
        <div className="mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-12 items-center">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 "
            >
              <h1 className="md:text-5xl text-3xl font-bold mb-6 text-center">Avoid Impulsive Spending And Trading By Locking Your Crypto Assets</h1>
              <p className="text-lg mb-8 text-center">Lock your assets for short and long-term goals, protect against impulsive spending, and build a stronger financial future — whether you're a trader, investor, or just holding for the short and long haul.</p>
              <div className="flex flex-col space-y-5 justify-center items-center">
                <p className="text-amber-500 text-center">Ready to lock your crypto and stay disciplined?</p>
                <div className='flex space-x-4 justify-center items-center'>
                  <CustomConnectButton />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="md:px-6 px-4 py-3 bg-amber-500 rounded-lg text-base font-semibold hover:bg-amber-500 hover:scale-105 transition-all flex items-center"
                    onClick={handledDocu}
                  >
                    How It Works
                    <BookOpen  className="ml-2 w-5 h-5 animate-pulse" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 grid place-items-center"
            >
              <img src={vault} alt="Platform Preview" className="w-3/4" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <AnimatedSection>
        <StatisticsSection />
      </AnimatedSection>

      {/* Features Section */}
      <section id="features" className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-navy my-5 text-center">Why Choose FVKRY PRVNTA</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-navy">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokens Section */}
      <AnimatedSection>
        <TokensSection />
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection>
        <FAQ />
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-navy ">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-navy mb-4">Ready to Start Saving?</h2>
          <p className="text-lg mb-8">Join thousands of users who trust FVKRY PRVNTA with their assets</p>
          <CustomConnectButton />
        </div>
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </div>
  );
};
