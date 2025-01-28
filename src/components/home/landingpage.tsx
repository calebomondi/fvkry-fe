import { useState, useEffect } from 'react';
import { 
  Lock, Wallet, Shield, Clock, ChevronDown, Github, Twitter, 
   ArrowRight, Coins, Users, Menu, X, Info,
  Award, CheckCircle
} from 'lucide-react';

import logo from '/1.png'
import logo2 from '/2.png'

import StatisticsSection from './stats';
import TokensSection from './tokens';

const TokenCard = ({ name, apy }: { name: string; apy: string }) => (
  <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 50);
      lastScrollY = currentScrollY;

      // Update active section
      const sections = ['hero', 'about', 'experience', 'projects', 'tech-stack', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isVisible ? 'top-0' : '-top-20'}
        ${activeSection === 'hero' ? ' bg-black/20 text-white' : 'dark:bg-black/90 bg-white/90  backdrop-blur-md dark:text-gray-300 text-gray-800 shadow-lg'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <img
                src={logo2}
                alt=""
                className='w-14'
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Experience', 'Projects', 'Tech Stack', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`transition-all duration-300  relative after:content-[''] after:absolute after:w-0 after:h-0.5
                    after:bg-teal-600 after:left-0 after:bottom-0 after:transition-all hover:after:w-full
                    ${activeSection === item.toLowerCase().replace(' ', '-') ? 'after:w-full' : ''}`}
                >
                  {item}
                </a>
              ))}
              <button className='btn'>Start Locking</button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white dark:bg-black dark:text-gray-300 text-gray-800 backdrop-blur-md rounded-xl my-1">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['About', 'Experience', 'Projects', 'Tech Stack', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block px-3 py-2 hover:text-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className='btn'>Start Locking</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 text-white h-screen flex items-center justify-center">
        <div className="mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h1 className="text-5xl font-bold mb-6">Secure Your Crypto Future</h1>
              <p className="text-xl mb-8 text-gray-200">Lock your assets. Build discipline. Achieve your goals.</p>
              <div className="flex space-x-4">
                <button className="bg-golden text-navy px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all flex items-center">
                  Start Saving Now
                  <ArrowRight className="ml-2 w-5 h-5 animate-pulse" />
                </button>
                <button className="border border-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="animate-on-scroll">
              <img src={logo} alt="Platform Preview" className="" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <StatisticsSection />

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
      <TokensSection />

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
            <div className="flex items-center justify-between">
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
                    <li className="hover:text-golden transition-colors cursor-pointer">Data Protection</li>
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