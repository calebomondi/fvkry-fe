import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import logo2 from "/2.png";

export default function Navbar() {
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isVisible ? 'top-0' : '-top-20'}
        ${activeSection === 'hero' ? ' dark:bg-black/20 bg-white/20' : 'dark:bg-black/90 bg-white/90  backdrop-blur-md  shadow-lg'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between md:h-20 h-16">
            <div className="flex items-center">
              <a href="/">
                <img
                  src={logo2}
                  alt=""
                  className='md:w-14 w-10'
                />
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['About','Features', 'Tokens', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={item == "About" ? `/documentation` : `/#${item.toLowerCase().replace(' ', '-')}`}
                  className={`transition-all duration-300  relative after:content-[''] after:absolute after:w-0 after:h-0.5
                    after:bg-amber-600 after:left-0 after:bottom-0 after:transition-all hover:after:w-full
                    ${activeSection === item.toLowerCase().replace(' ', '-') ? 'after:w-full' : ''}`}
                >
                  {item}
                </a>
              ))}
              <button className='btn bg-amber-500 hover:bg-amber-600 hover:scale-105 text-white border-none'>Start Locking</button>
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
              {['About','Features', 'Tokens', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={item == "About" ? `/documentation` : `/#${item.toLowerCase().replace(' ', '-')}`}
                  className="block px-3 py-2 hover:text-amber-600 dark:text-gray-300"
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
  )
}
