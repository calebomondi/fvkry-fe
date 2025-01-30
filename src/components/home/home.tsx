import { Lock, Wallet, Shield, Clock, LockKeyhole , BookOpen} from 'lucide-react';

import vault from '/vault.png'

import StatisticsSection from './stats';
import TokensSection from './tokens';
import FAQ from './faq';
import Footer from './footer';
import Navbar from '../navbar/navbar';

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="md:pt-28 h-screen flex items-center justify-center">
        <div className="mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-12 items-center">
            <div className="order-2 lg:order-1 ">
              <h1 className="md:text-5xl text-3xl font-bold mb-6 text-center">Avoid Impulsive Spending And Trading By Locking Your Crypto Assets</h1>
              <p className="text-lg mb-8 text-center">Lock your assets for long-term goals, protect against impulsive spending, and build a stronger financial future—whether you're a trader, investor, or just holding for the long haul.</p>
              <div className="flex flex-col space-y-5 justify-center items-center">
                <p className="text-amber-500 text-center">Ready to lock your crypto and stay disciplined?</p>
                <div className='flex space-x-4 justify-center items-center'>
                  <button className="md:px-6 px-4 py-3 bg-amber-500 rounded-lg text-base font-semibold hover:bg-opacity-80 transition-all flex items-center">
                    Start Locking Now
                    <LockKeyhole className="ml-2 w-5 h-5 animate-pulse" />
                  </button>
                  <button className="md:px-6 px-4 py-3 bg-amber-500 rounded-lg text-base font-semibold hover:bg-opacity-80 transition-all flex items-center">
                    How It Works
                    <BookOpen  className="ml-2 w-5 h-5 animate-pulse" />
                  </button>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 grid place-items-center">
              <img src={vault} alt="Platform Preview" className="w-3/4" />
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
