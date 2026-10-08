import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { BROCHURE_URL, companyData } from '../../data/company';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Vision', href: '#vision' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-borderLight py-3' 
          : 'bg-white border-transparent py-4'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/brand/hackers-infotech-logo-blue.png" alt="Hackers Infotech Shield" className="h-[42px] object-contain group-hover:scale-105 transition-transform" />
          <span className="font-bold text-xl tracking-tight text-[#0F172A]">{companyData.companyName}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-sm font-semibold text-textSecondary hover:text-primary transition-colors relative group py-2">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6 border-l border-borderLight pl-6">
            <a href={BROCHURE_URL} download="Hackers-Infotech-Custom-Software-Brochure.pdf" className="text-sm font-semibold text-textSecondary hover:text-primary transition-colors relative group py-2">
              Brochure
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Button size="sm" href="http://almax-demo-ui.vercel.app/bms/" onClick={(e) => {
              e.preventDefault();
              window.open('http://almax-demo-ui.vercel.app/bms/', '_blank');
            }} className="hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all">
              Demo
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-textPrimary hover:text-primary p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-borderLight shadow-lg overflow-hidden"
          >
            <div className="py-4 px-6 flex flex-col gap-4">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="block font-medium text-textSecondary hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 pt-4 border-t border-borderLight">
                <a href={BROCHURE_URL} download="Hackers-Infotech-Custom-Software-Brochure.pdf" className="block font-medium text-textSecondary hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Brochure
                </a>
                <Button className="w-full justify-center" href="http://almax-demo-ui.vercel.app/bms/" onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  window.open('http://almax-demo-ui.vercel.app/bms/', '_blank');
                }}>
                  Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}