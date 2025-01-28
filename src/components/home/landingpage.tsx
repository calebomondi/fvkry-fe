import React, { useState, useEffect } from 'react';
import { 
  Lock, Wallet, Shield, Clock, ChevronDown, Github, Twitter, 
   ExternalLink, ArrowRight, Coins, Users,
  Award, CheckCircle, AlertCircle
} from 'lucide-react';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    });
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
  
  return visible;
};

const Statistic = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center p-6 bg-navy/5 rounded-lg hover:bg-navy/10 transition-all">
    <div className="text-3xl font-bold text-navy mb-2">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const TokenCard = ({ name, apy }: { name: string; apy: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
    <div className="flex items-center justify-between mb-4">
      <img src="/api/placeholder/40/40" alt={name} className="w-10 h-10 rounded-full" />
      <span className="text-navy font-semibold">{name}</span>
    </div>
    <div className="text-golden text-xl font-bold">{apy} APY</div>
    <button className="mt-4 w-full bg-navy text-white py-2 rounded hover:bg-navy/90 transition-all">
      Lock Now
    </button>
  </div>
);

const FAQ = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-navy">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`mt-2 text-gray-600 transition-all ${isOpen ? 'block' : 'hidden'}`}>
        {answer}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showNotification, setShowNotification] = useState(false);
  
  const features = [
    {
      icon: <Lock className="w-8 h-8 text-golden" />,
      title: "Secure Asset Locking",
      description: "Lock your ETH and ERC20 tokens in secure smart contracts with customizable time periods"
    },
    {
      icon: <Shield className="w-8 h-8 text-golden" />,
      title: "Audited Security",
      description: "Smart contracts audited by leading security firms ensuring your assets are protected"
    },
    {
      icon: <Clock className="w-8 h-8 text-golden" />,
      title: "Flexible Time Locks",
      description: "Choose your lock duration from 1 week to 1 year with automatic unlocking"
    },
    {
      icon: <Wallet className="w-8 h-8 text-golden" />,
      title: "Multi-Token Support",
      description: "Support for ETH and major ERC20 tokens with more assets coming soon"
    }
  ];

  const stats = [
    { value: "$12.5M", label: "Total Value Locked" },
    { value: "15,000+", label: "Active Users" },
    { value: "99.99%", label: "Uptime" },
    { value: "45,000+", label: "Successful Locks" }
  ];

  const tokens = [
    { name: "ETH", apy: "4.5%" },
    { name: "USDT", apy: "8.2%" },
    { name: "USDC", apy: "7.8%" },
    { name: "DAI", apy: "6.5%" }
  ];

  const faqs = [
    {
      question: "How does FVKRY PRVNTA work?",
      answer: "Our platform allows you to lock your crypto assets for a specified period, helping you achieve your savings goals while earning rewards."
    },
    {
      question: "Is it safe to lock my assets?",
      answer: "Yes, our smart contracts are audited by leading security firms and we implement industry best practices for asset security."
    },
    {
      question: "What are the fees?",
      answer: "We charge a minimal 0.3% fee only upon withdrawal to maintain platform sustainability and development."
    },
    {
      question: "Can I withdraw early?",
      answer: "Early withdrawals are possible in emergency situations, subject to a higher fee to discourage premature withdrawals."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Thank you for subscribing!</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/api/placeholder/40/40" alt="FVKRY PRVNTA" className="h-10" />
              <span className="ml-2 text-xl font-bold text-navy">FVKRY PRVNTA</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 hover:text-navy">Features</a>
              <a href="#tokens" className="text-gray-600 hover:text-navy">Tokens</a>
              <a href="#stats" className="text-gray-600 hover:text-navy">Stats</a>
              <a href="#faq" className="text-gray-600 hover:text-navy">FAQ</a>
            </div>
            <button className="bg-navy text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all">
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 bg-gradient-to-br from-navy via-navy/95 to-navy/90 text-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h1 className="text-5xl font-bold mb-6">Secure Your Crypto Future</h1>
              <p className="text-xl mb-8 text-gray-200">Lock your assets. Build discipline. Achieve your goals.</p>
              <div className="flex space-x-4">
                <button className="bg-golden text-navy px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all flex items-center">
                  Start Saving Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border border-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="animate-on-scroll">
              <img src="/api/placeholder/600/400" alt="Platform Preview" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Statistic key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy">Why Choose FVKRY PRVNTA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-navy">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokens Section */}
      <section id="tokens" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy">Supported Tokens</h2>
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
              <button
                className={`px-4 py-2 rounded ${activeTab === 'all' ? 'bg-navy text-white' : 'text-gray-600'}`}
                onClick={() => setActiveTab('all')}
              >
                All Tokens
              </button>
              <button
                className={`px-4 py-2 rounded ${activeTab === 'stablecoins' ? 'bg-navy text-white' : 'text-gray-600'}`}
                onClick={() => setActiveTab('stablecoins')}
              >
                Stablecoins
              </button>
              <button
                className={`px-4 py-2 rounded ${activeTab === 'defi' ? 'bg-navy text-white' : 'text-gray-600'}`}
                onClick={() => setActiveTab('defi')}
              >
                DeFi Tokens
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tokens.map((token, index) => (
              <TokenCard key={index} {...token} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQ key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-xl mb-8 text-gray-200">Join thousands of users who trust FVKRY PRVNTA with their assets</p>
          <button className="bg-golden text-navy px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all">
            Launch App
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy/95 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                <h3 className="text-xl font-bold mb-4">FVKRY PRVNTA</h3>
                <p className="text-gray-300">Secure crypto savings platform</p>
                <div className="mt-4">
                    <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 rounded px-4 py-2 w-full"
                    />
                    <button
                    onClick={() => {
                        setShowNotification(true);
                        setTimeout(() => setShowNotification(false), 3000);
                    }}
                    className="mt-2 bg-golden text-navy px-4 py-2 rounded w-full hover:bg-opacity-90 transition-all"
                    >
                    Subscribe to Updates
                    </button>
                </div>
                </div>
                <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                    <li className="hover:text-golden transition-colors cursor-pointer">About</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Features</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Documentation</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Support</li>
                </ul>
                </div>
                <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-300">
                    <li className="hover:text-golden transition-colors cursor-pointer">Terms of Service</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Privacy Policy</li>
                    <li className="hover:text-golden transition-colors cursor-pointer">Risk Disclosure</li>
                </ul>
                </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-golden transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-golden transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
              <div className="mt-4">
                <h5 className="text-sm font-semibold mb-2">Our Communities</h5>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-golden transition-colors cursor-pointer">Telegram Group</li>
                  <li className="hover:text-golden transition-colors cursor-pointer">Discord Server</li>
                  <li className="hover:text-golden transition-colors cursor-pointer">Reddit</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm">
                &copy; {new Date().getFullYear()} FVKRY PRVNTA. All rights reserved.
              </p>
              <div className="flex items-center mt-4 md:mt-0">
                <span className="flex items-center text-gray-300 text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Smart Contracts Audited by
                  <a href="#" className="text-golden hover:text-golden/80 ml-1">
                    CertiK
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;