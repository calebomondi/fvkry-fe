import { useState, useEffect } from 'react';
import { Lock, Wallet, Shield, Clock, LockKeyhole , BookOpen , Menu, X } from 'lucide-react';

import vault from '/vault.png'
import logo2 from '/2.png'

import StatisticsSection from './stats';
import TokensSection from './tokens';
import FAQ from './faq';
import Footer from './footer';

const Home = () => {
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
      const sections = ['hero', 'about', 'experience', 'projects'];
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isVisible ? 'top-0' : '-top-20'}
        ${activeSection === 'hero' ? ' dark:bg-black/20 bg-white/60' : 'dark:bg-black/90 bg-white/90  backdrop-blur-md  shadow-lg'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between md:h-20 h-16">
            <div className="flex items-center">
              <img
                src={logo2}
                alt=""
                className='md:w-14 w-10'
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#">About</a>
              {['Features', 'Tokens', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`transition-all duration-300  relative after:content-[''] after:absolute after:w-0 after:h-0.5
                    after:bg-amber-600 after:left-0 after:bottom-0 after:transition-all hover:after:w-full
                    ${activeSection === item.toLowerCase().replace(' ', '-') ? 'after:w-full' : ''}`}
                >
                  {item}
                </a>
              ))}
              <button className='btn bg-amber-500 text-white border-none'>Start Locking</button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white dark:bg-black dark: text-gray-800 backdrop-blur-md rounded-xl my-1">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#">About</a>
              {['Features', 'Tokens', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block px-3 py-2 hover:text-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className='btn bg-amber-500 text-white border-none'>Start Locking</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="md:pt-28 h-screen flex items-center justify-center">
        <div className="mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-12 items-center">
            <div className="order-2 lg:order-1 ">
              <h1 className="text-5xl font-bold mb-6 text-center">Avoid Impulsive Spending And Trading</h1>
              <p className="text-2xl mb-8 text-center">Lock your assets. Build discipline. Achieve your goals.</p>
              <div className="flex space-x-4 justify-center items-center">
                <button className="md:px-8 px-5 py-3 bg-amber-400 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition-all flex items-center">
                  Start Locking
                  <LockKeyhole className="ml-2 w-5 h-5 animate-pulse" />
                </button>
                <button className="md:px-8 px-5 py-3 bg-amber-400 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition-all flex items-center">
                  Learn More
                  <BookOpen  className="ml-2 w-5 h-5 animate-pulse" />
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2 grid place-items-center">
              <img src={vault} alt="Platform Preview" className="" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Features Section */}
      <section id="features" className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy my-5 text-center">Why Choose FVKRY PRVNTA</h2>
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
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 bg-navy ">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">Ready to Start Saving?</h2>
          <p className="text-xl mb-8">Join thousands of users who trust FVKRY PRVNTA with their assets</p>
          <button className='btn bg-amber-500 text-white border-none'>Start Locking</button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;