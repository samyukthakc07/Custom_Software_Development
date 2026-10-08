const fs = require('fs');
const path = require('path');

const files = {
  'src/components/ui/Reveal.tsx': `
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale';
  delay?: number;
  className?: string;
  width?: 'fit-content' | '100%';
}

export function Reveal({ children, variant = 'fadeUp', delay = 0, className = '', width = '100%' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    fadeUp: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    fadeLeft: { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } },
    fadeRight: { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  };

  const activeVariant = shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : variants[variant];

  return (
    <motion.div
      variants={activeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
`,
  'src/components/layout/Navbar.tsx': `
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-borderLight py-3' 
          : 'bg-white border-transparent py-5'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="bg-primary text-white p-2 rounded-lg group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-[#0F172A]">{companyData.companyName}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-sm font-semibold text-textSecondary hover:text-primary transition-colors relative group py-2">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6 border-l border-borderLight pl-8">
            <a href={BROCHURE_URL} download="Hackers-Infotech-Custom-Software-Brochure.pdf" className="text-sm font-semibold text-textSecondary hover:text-primary transition-colors relative group py-2">
              Brochure
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Button size="sm" href="#contact" className="hover:-translate-y-0.5 hover:shadow-md transition-all">
              Start a Project
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-textPrimary hover:text-primary transition-colors p-2"
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
                    <a 
                      href={link.href} 
                      className="block text-base font-medium text-textSecondary hover:text-primary py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 pt-4 border-t border-borderLight">
                <a 
                  href={BROCHURE_URL} 
                  download="Hackers-Infotech-Custom-Software-Brochure.pdf" 
                  className="block text-base font-medium text-textSecondary hover:text-primary py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Download Brochure
                </a>
                <Button className="w-full justify-center" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Start a Project
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
`,
  'src/components/sections/Hero.tsx': `
import React, { useState, useEffect } from 'react';
import { Check, Globe, PanelsTopLeft, Code2, ArrowRight, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { BROCHURE_URL } from '../../data/company';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { cn } from '../../utils/cn';

const solutions = [
  { id: 'website', icon: Globe, label: 'WEBSITE', result: 'Professional Website' },
  { id: 'application', icon: PanelsTopLeft, label: 'APPLICATION', result: 'Custom Application' },
  { id: 'software', icon: Code2, label: 'SOFTWARE', result: 'Business Software' }
];

export function Hero() {
  const [activeId, setActiveId] = useState('website');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId(current => {
        const currentIndex = solutions.findIndex(s => s.id === current);
        return solutions[(currentIndex + 1) % solutions.length].id;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeSolution = solutions.find(s => s.id === activeId) || solutions[0];

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(37,99,235,0.06),transparent_65%)] rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(37,99,235,0.04),transparent_65%)] rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Sequence */}
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <div className="text-primary font-bold tracking-wider text-xs sm:text-sm uppercase mb-6 inline-block bg-primary/10 px-3 py-1 rounded-full">
                WEBSITES • APPLICATIONS • CUSTOM SOFTWARE
              </div>
            </Reveal>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15] text-[#0F172A]">
              <Reveal delay={0.2}><span className="block">Your Business.</span></Reveal>
              <Reveal delay={0.3}><span className="block">Your Idea.</span></Reveal>
              <Reveal delay={0.4}><span className="block text-primary">Built Your Way.</span></Reveal>
            </h1>
            
            <Reveal delay={0.5}>
              <p className="text-lg text-textSecondary mb-4 leading-relaxed">
                From professional business websites to fully customized software, Hackers Infotech builds digital solutions around your requirements, goals and budget.
              </p>
              <p className="text-lg text-[#0F172A] font-medium mb-8 leading-relaxed">
                Whether you're a small business, startup, growing company or enterprise — we'll help you build the solution you actually need.
              </p>
            </Reveal>
            
            <Reveal delay={0.6}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
                <Button size="lg" href="#contact" className="group shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all">
                  Tell Us What You Need
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="white" size="lg" href="#services" className="hover:bg-[#EFF6FF] transition-colors">
                  Explore Our Services
                </Button>
                <a href={BROCHURE_URL} download="Hackers-Infotech-Custom-Software-Brochure.pdf" className="inline-flex items-center justify-center h-12 px-6 text-sm font-semibold text-textSecondary hover:text-primary transition-colors group">
                  <Download className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                  Download Brochure
                </a>
              </div>
            </Reveal>
            
            <Reveal delay={0.7}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-6 border-t border-borderLight text-sm font-bold text-[#0F172A]">
                {[
                  "Built for Your Requirements", 
                  "Flexible Scope", 
                  "Affordable Development", 
                  "Support as You Grow"
                ].map((text, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="flex items-center gap-2"
                  >
                    <div className="bg-primary/10 p-1 rounded-full text-primary">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    {text}
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
          
          {/* Right Interactive Visual */}
          <Reveal variant="scale" delay={0.3} className="hidden lg:block w-full">
            <div className="bg-white border border-borderLight rounded-2xl p-10 w-full shadow-2xl shadow-primary/5 flex flex-col items-center relative">
                
                {/* YOUR IDEA */}
                <div className="bg-[#0F172A] text-white px-6 py-2 rounded-full font-bold text-xs tracking-widest uppercase shadow-md relative z-20">
                    Your Idea
                </div>
                
                {/* Line down */}
                <div className="w-px h-8 bg-borderLight my-2 relative">
                    <motion.div className="absolute top-0 w-full bg-primary" animate={{ height: '100%' }} transition={{ duration: 1.5, repeat: Infinity }} />
                </div>
                
                {/* WHAT DO YOU NEED */}
                <div className="bg-[#F8FAFC] border border-borderLight text-textSecondary px-6 py-2 rounded-full font-bold text-sm shadow-sm relative z-20 mb-8">
                    What do you need?
                </div>
                
                {/* 3 Options */}
                <div className="flex justify-between w-full gap-4 relative z-20">
                  {solutions.map((sol) => {
                    const isActive = activeId === sol.id;
                    return (
                      <button 
                        key={sol.id}
                        onClick={() => setActiveId(sol.id)}
                        className={cn(
                          "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-300 flex-1 outline-none",
                          isActive 
                            ? "border-primary bg-[#EFF6FF] shadow-sm -translate-y-1" 
                            : "border-borderLight bg-white hover:border-gray-300 hover:bg-gray-50"
                        )}
                      >
                        <div className={cn("p-2 rounded-lg transition-colors", isActive ? "bg-primary text-white" : "bg-[#F8FAFC] text-textSecondary")}>
                          <sol.icon className="w-5 h-5" />
                        </div>
                        <span className={cn("font-bold text-xs uppercase tracking-wide", isActive ? "text-primary" : "text-[#0F172A]")}>
                          {sol.label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Connecting paths to final box */}
                <div className="h-16 w-full relative mt-4 flex justify-center">
                    {solutions.map((sol) => (
                      <motion.div 
                        key={\`line-\${sol.id}\`}
                        className={cn("absolute top-0 w-px transition-colors duration-500", 
                          sol.id === 'website' ? 'left-1/6 h-full border-l-2 rounded-bl-xl' :
                          sol.id === 'application' ? 'left-1/2 h-full' :
                          'right-1/6 h-full border-r-2 rounded-br-xl'
                        )}
                      >
                        <AnimatePresence>
                          {activeId === sol.id && (
                             <motion.div 
                               initial={{ height: 0 }}
                               animate={{ height: '100%' }}
                               exit={{ opacity: 0 }}
                               className="absolute top-0 w-0.5 bg-primary -ml-[1px]"
                             />
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                    
                    {/* Horizontal connector */}
                    <div className="absolute bottom-0 w-2/3 h-px">
                      <AnimatePresence>
                          <motion.div 
                             initial={{ width: 0, left: '50%' }}
                             animate={{ width: '100%', left: 0 }}
                             className="absolute h-0.5 bg-primary top-0 -mt-[1px]"
                          />
                      </AnimatePresence>
                    </div>
                    {/* Final vertical drop */}
                    <div className="absolute bottom-[-16px] left-1/2 w-0.5 h-4 bg-primary -ml-[1px]"></div>
                </div>

                {/* BUILT FOR YOU */}
                <div className="mt-8 bg-primary text-white px-8 py-5 rounded-xl shadow-lg shadow-primary/20 w-full text-center relative overflow-hidden group">
                    <motion.div 
                      key={activeSolution.result}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-bold text-lg mb-1"
                    >
                      {activeSolution.result}
                    </motion.div>
                    <div className="text-primaryLight text-xs font-semibold tracking-widest uppercase">
                      Built For Your Business
                    </div>
                </div>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Progression.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';
import { ArrowDown, ArrowRight } from 'lucide-react';

const steps = [
  { num: "01", title: "BUSINESS WEBSITE", desc: "For businesses that need a professional digital presence." },
  { num: "02", title: "CUSTOM WEBSITE", desc: "For businesses requiring unique pages, functionality and workflows." },
  { num: "03", title: "WEB APPLICATION", desc: "For interactive business processes and customer experiences." },
  { num: "04", title: "CUSTOM SOFTWARE", desc: "For unique operational and business requirements." },
  { num: "05", title: "SCALABLE PLATFORM", desc: "For products and businesses that need to grow over time." }
];

export function Progression() {
  return (
    <section className="section-padding bg-[#F8FAFC] border-y border-borderLight overflow-hidden">
      <div className="container-custom">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-primary font-bold tracking-wider text-xs uppercase mb-4">No project is "too small" to start</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">From a Simple Website to Complete Custom Software.</h2>
            <p className="text-textSecondary text-lg">
              You don't need a complex software project to work with us. If your business simply needs a professional website, we'll build it. If you need something completely customized, we'll build that too.
            </p>
          </div>
        </Reveal>
        
        {/* Desktop Horizontal */}
        <div className="hidden lg:flex items-start justify-between relative max-w-6xl mx-auto mb-16">
           <Reveal className="absolute top-[4.5rem] left-0 right-0 h-px bg-borderLight -z-10" />
           {steps.map((step, idx) => (
             <Reveal key={idx} delay={idx * 0.15} className="flex-1 px-4">
               <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="text-primary font-bold text-xs tracking-widest mb-4 group-hover:-translate-y-1 transition-transform">{step.num}</div>
                  <div className="w-16 h-16 rounded-2xl bg-white border border-borderLight flex items-center justify-center mb-6 shadow-sm group-hover:border-primary group-hover:shadow-md transition-all">
                      <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:scale-150 group-hover:bg-primary transition-all"></div>
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] mb-2">{step.title}</h3>
                  <p className="text-xs text-textSecondary px-2">{step.desc}</p>
               </div>
             </Reveal>
           ))}
        </div>

        {/* Mobile Vertical */}
        <div className="lg:hidden flex flex-col items-center space-y-4 mb-12">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <Reveal>
                <div className="bg-white border border-borderLight p-6 rounded-xl w-full max-w-sm text-center shadow-sm hover:border-primary transition-colors">
                    <div className="text-primary font-bold text-xs mb-2">{step.num}</div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-sm text-textSecondary">{step.desc}</p>
                </div>
              </Reveal>
              {idx < steps.length - 1 && (
                <Reveal delay={0.1}><ArrowDown className="w-5 h-5 text-borderLight" /></Reveal>
              )}
            </React.Fragment>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="text-center bg-white border border-borderLight rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
              <h3 className="text-2xl font-bold text-[#0F172A]">Start where your business is today.</h3>
              <h3 className="text-2xl font-extrabold text-primary mt-1">Build more when you're ready.</h3>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Vision.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';

export function Vision() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.05),transparent_70%)] pointer-events-none"></div>
      
      <div className="container-custom max-w-5xl text-center relative z-10">
        <Reveal>
          <div className="inline-block bg-[#0F172A] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
              Our Vision
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight mb-12">
            "To make customized digital solutions accessible to every business."
          </h2>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-textSecondary leading-relaxed">
              <p>
                  We believe every business deserves technology that fits the way it works — <strong className="text-[#0F172A]">regardless of its size.</strong>
              </p>
              <p>
                  Whether it's a simple professional website for a local business, a customized platform for a growing company, or a complete software solution for an enterprise, our goal is to make development affordable, flexible and practical.
              </p>
              <p className="font-bold text-primary text-xl md:text-2xl pt-6">
                  Understand the need.<br/>Build around the requirement.<br/>Fit the budget.
              </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
`,
  'src/components/sections/TargetAudience.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';
import { Building, Store, Rocket, TrendingUp, Cpu, Network, ArrowRight } from 'lucide-react';

const audiences = [
  { icon: Store, title: "LOCAL BUSINESSES", desc: "Professional websites and simple digital solutions.", ex: "Website / Booking / Contact" },
  { icon: Building, title: "SMALL BUSINESSES", desc: "Websites, booking systems, business applications and automation.", ex: "Management / Automation / Apps" },
  { icon: Rocket, title: "STARTUPS", desc: "Landing pages, MVPs, applications and product development.", ex: "Landing Page / MVP / App" },
  { icon: TrendingUp, title: "GROWING COMPANIES", desc: "Custom applications, portals and workflow systems.", ex: "Portals / Workflows / Integrations" },
  { icon: Cpu, title: "SOFTWARE COMPANIES", desc: "Development support, applications, integrations and specialized solutions.", ex: "Dev Support / APIs / Architecture" },
  { icon: Network, title: "ENTERPRISES", desc: "Customized platforms, integrations and business systems.", ex: "Platforms / Legacy Modernization" }
];

export function TargetAudience() {
  return (
    <section className="section-padding bg-[#0F172A] text-white">
      <div className="container-custom max-w-6xl">
        <Reveal>
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Built for Businesses of Every Size.</h2>
              <p className="text-slate-400 text-lg">We work with organizations at all stages of growth.</p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {audiences.map((aud, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-default overflow-hidden relative">
                <aud.icon className="w-8 h-8 text-[#60A5FA] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-white mb-2">{aud.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">{aud.desc}</p>
                
                {/* Hover reveal */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform bg-[#1E293B] flex items-center justify-between">
                   <span className="text-xs font-bold text-[#60A5FA]">{aud.ex}</span>
                   <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="text-center max-w-3xl mx-auto bg-primary/20 border border-primary/30 p-8 rounded-2xl">
              <p className="text-xl font-medium text-white leading-relaxed">
                  Your company size doesn't determine whether custom development is right for you.<br/>
                  <span className="text-[#60A5FA] font-bold">Your requirement does.</span>
              </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Services.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';
import { Globe, ShoppingCart, LayoutTemplate, Smartphone, Cpu, Sparkles, RefreshCcw, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const services = [
  { 
    icon: Globe, 
    title: "WEBSITE DEVELOPMENT", 
    desc: "Professional websites built around your business, brand and goals.", 
    examples: ["Company Websites", "Landing Pages", "Responsive Websites"],
    highlight: "We don't force every customer into the same template. Your website can be customized around your business."
  },
  { icon: ShoppingCart, title: "E-COMMERCE", desc: "Online stores and shopping experiences.", examples: ["Online Stores", "Payment Integration", "Order Management"] },
  { icon: LayoutTemplate, title: "WEB APPLICATIONS", desc: "Interactive business processes and customer experiences.", examples: ["Booking Systems", "Customer Portals", "Dashboards"] },
  { icon: Smartphone, title: "MOBILE APPS", desc: "Native and cross-platform mobile apps.", examples: ["Android", "iOS", "Business Applications"] },
  { icon: Cpu, title: "CUSTOM SOFTWARE", desc: "Unique operational and business requirements.", examples: ["CRM / ERP", "Inventory", "Workflow Systems"] },
  { icon: Sparkles, title: "AI & AUTOMATION", desc: "Intelligent workflows and AI integrations.", examples: ["AI Assistants", "Generative AI", "Business Automation"] },
  { icon: RefreshCcw, title: "MODERNIZATION", desc: "Improve and connect existing systems.", examples: ["API Integration", "Legacy Modernization", "Feature Development"] }
];

export function Services() {
  const primaryService = services[0];
  const secondaryServices = services.slice(1);

  return (
    <section id="services" className="section-padding bg-[#F8FAFC]">
      <div className="container-custom max-w-6xl">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">What We Build</h2>
            <p className="text-textSecondary text-lg">From simple digital presences to complex operational systems.</p>
          </div>
        </Reveal>
        
        {/* Prominent Website Development Block */}
        <Reveal delay={0.1}>
          <div className="group bg-white border-2 border-primary rounded-2xl p-8 lg:p-10 shadow-md hover:shadow-lg transition-all mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-6 py-2 rounded-bl-xl">CORE SERVICE</div>
              <div className="flex items-start gap-5 mb-6">
                  <div className="p-4 bg-[#EFF6FF] text-primary rounded-2xl shrink-0 group-hover:scale-105 transition-transform"><primaryService.icon className="w-8 h-8" /></div>
                  <div>
                      <h3 className="text-2xl font-bold text-[#0F172A]">{primaryService.title}</h3>
                      <p className="text-textSecondary text-lg mt-2">{primaryService.desc}</p>
                  </div>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {primaryService.examples.map((ex, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#0F172A] font-semibold">
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span> {ex}
                      </div>
                  ))}
              </div>
              <div className="bg-[#EFF6FF] border border-primary/20 p-5 rounded-xl">
                  <p className="text-primary font-bold">{primaryService.highlight}</p>
              </div>
          </div>
        </Reveal>

        {/* Other Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryServices.map((service, idx) => (
            <Reveal key={idx} delay={0.2 + (idx * 0.1)}>
              <div className="group bg-white border border-borderLight rounded-2xl p-6 hover:shadow-md hover:border-primary/50 hover:-translate-y-1 transition-all flex flex-col h-full cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#F8FAFC] rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors"><service.icon className="w-6 h-6" /></div>
                    <h3 className="text-sm font-bold text-[#0F172A]">{service.title}</h3>
                </div>
                <p className="text-sm text-textSecondary mb-6 flex-grow">{service.desc}</p>
                
                <div className="flex items-center justify-between border-t border-borderLight pt-4 mt-auto">
                    <span className="text-xs font-semibold text-textSecondary group-hover:text-primary transition-colors">Learn More</span>
                    <ArrowRight className="w-4 h-4 text-borderLight group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Affordability.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';
import { motion } from 'framer-motion';

export function Affordability() {
  return (
    <section className="section-padding bg-white border-t border-borderLight overflow-hidden">
      <div className="container-custom max-w-5xl">
        <Reveal>
          <div className="text-center mb-16">
            <h4 className="text-primary font-bold tracking-wider text-xs uppercase mb-4">Flexible Development</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6">Built Around Your Requirements.<br/>Planned Around Your Budget.</h2>
            <p className="text-lg text-textSecondary max-w-2xl mx-auto">
              Custom development shouldn't automatically mean expensive development. Instead of selling unnecessary features, we focus on understanding what your business actually needs.
            </p>
          </div>
        </Reveal>
        
        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 relative">
            <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-px bg-borderLight -z-10"></div>
            {[
              { num: "1", title: "START WITH WHAT YOU NEED", desc: "Build the essential functionality first." },
              { num: "2", title: "FLEXIBLE SCOPE", desc: "Prioritize features according to business requirements and budget." },
              { num: "3", title: "GROW OVER TIME", desc: "Add functionality as your business and requirements grow." }
            ].map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 0.2}>
                <div className="text-center bg-white px-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-primary/20 font-bold">
                      {pillar.num}
                  </div>
                  <h4 className="font-bold text-[#0F172A] mb-3">{pillar.title}</h4>
                  <p className="text-textSecondary">{pillar.desc}</p>
                </div>
              </Reveal>
            ))}
        </div>

        {/* Dynamic Storytelling block */}
        <Reveal delay={0.4}>
          <div className="bg-[#0F172A] rounded-3xl p-8 md:p-12 shadow-xl border border-[#1E293B]">
              <div className="text-center mb-10">
                  <p className="text-lg md:text-xl font-medium text-slate-300">
                    "Custom development doesn't have to mean<br className="hidden md:block"/> unnecessary complexity or unnecessary cost."
                  </p>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
                  <div className="text-center">
                      <p className="text-slate-400 text-sm font-medium mb-1">Simple requirement?</p>
                      <p className="text-white text-xl font-bold bg-white/10 px-6 py-2 rounded-lg border border-white/10">Keep it simple.</p>
                  </div>
                  <div className="w-px h-8 md:w-8 md:h-px bg-slate-700"></div>
                  <div className="text-center">
                      <p className="text-slate-400 text-sm font-medium mb-1">Unique requirement?</p>
                      <p className="text-white text-xl font-bold bg-primary/20 px-6 py-2 rounded-lg border border-primary/30 text-blue-100">Customize it.</p>
                  </div>
                  <div className="w-px h-8 md:w-8 md:h-px bg-slate-700"></div>
                  <div className="text-center">
                      <p className="text-slate-400 text-sm font-medium mb-1">Growing requirement?</p>
                      <p className="text-white text-xl font-bold bg-emerald-500/20 px-6 py-2 rounded-lg border border-emerald-500/30 text-emerald-100">Scale it.</p>
                  </div>
              </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
`,
  'src/components/sections/RequirementSales.tsx': `
import React, { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { MessageSquare, ArrowRight, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const examples = [
  { q: "I need a website for my hardware business.", category: "Website Development" },
  { q: "I need an online store.", category: "E-Commerce Development" },
  { q: "I need a booking website.", category: "Custom Web Application" },
  { q: "I need software to manage inventory.", category: "Custom Software" },
  { q: "I have a startup idea.", category: "MVP Development" },
  { q: "I need a completely custom application.", category: "Requirement Analysis" }
];

export function RequirementSales() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="section-padding bg-primary text-white overflow-hidden">
      <div className="container-custom max-w-4xl">
        <Reveal>
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Tell Us What You Need.</h2>
              <p className="text-primaryLight text-lg">We'll help you build it.</p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {examples.map((ex, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div 
                className="relative"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* User Message Bubble */}
                <div className="bg-white/10 border border-white/20 p-5 rounded-2xl rounded-bl-sm hover:bg-white/20 transition-colors cursor-default relative z-10">
                  <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                      <span className="font-medium text-[15px]">"{ex.q}"</span>
                  </div>
                </div>

                {/* Response Bubble Reveal */}
                <AnimatePresence>
                  {hoveredIdx === idx && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full left-6 mt-2 bg-white text-[#0F172A] p-4 rounded-2xl rounded-tl-sm shadow-xl z-20 min-w-[250px] border border-borderLight"
                    >
                      <div className="font-extrabold text-xs text-primary mb-1 uppercase tracking-wider flex items-center gap-1">
                        <CornerDownRight className="w-3 h-3" /> YES — WE CAN BUILD IT.
                      </div>
                      <div className="font-bold text-sm">{ex.category}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Process.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Tell Us What You Need', desc: 'Explain your idea, problem or requirement.' },
  { num: '02', title: 'We Understand It', desc: 'We discuss workflows, users, features and priorities.' },
  { num: '03', title: 'We Plan the Solution', desc: 'We define an appropriate scope and technical approach.' },
  { num: '04', title: 'We Align with Budget', desc: 'Features and phases can be prioritized.' },
  { num: '05', title: 'We Design & Develop', desc: 'We build and test your customized solution.' },
  { num: '06', title: 'We Launch & Support', desc: 'Your solution goes live and can continue evolving.' }
];

export function Process() {
  return (
    <section id="process" className="section-padding bg-[#F8FAFC]">
      <div className="container-custom max-w-5xl">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">A Simple Development Process</h2>
          </div>
        </Reveal>
        
        <div className="relative">
          {/* Timeline connecting line */}
          <div className="absolute top-0 bottom-0 left-[19px] md:left-1/2 w-[2px] bg-borderLight -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <Reveal key={idx} delay={0.1}>
                  <div className="flex flex-col md:flex-row items-start md:items-center relative">
                    
                    {/* Left Side (Desktop) */}
                    <div className={\`hidden md:block w-1/2 pr-12 text-right \${isEven ? '' : 'order-1 opacity-0'}\`}>
                      {isEven && (
                        <>
                          <h4 className="text-xl font-bold text-[#0F172A] mb-2">{step.title}</h4>
                          <p className="text-textSecondary">{step.desc}</p>
                        </>
                      )}
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-[19px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-[3px] border-primary flex items-center justify-center font-bold text-xs text-primary shadow-sm z-10">
                       {step.num}
                    </div>

                    {/* Right Side (Desktop) / Main Content (Mobile) */}
                    <div className={\`w-full pl-16 md:w-1/2 md:pl-12 \${!isEven ? 'md:order-3' : 'md:opacity-0'}\`}>
                      {(!isEven || true) && (
                        <div className={\`\${isEven ? 'md:hidden' : ''}\`}>
                          <h4 className="text-xl font-bold text-[#0F172A] mb-2">{step.title}</h4>
                          <p className="text-textSecondary">{step.desc}</p>
                        </div>
                      )}
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/FinalCTA.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';

export function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-700 to-blue-900 text-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50"></div>
      
      <div className="container-custom max-w-3xl relative z-10">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
            Have a Software Idea?<br/>
            Let's Build It.
          </h2>
          <div className="text-lg text-blue-100 mb-10 space-y-2 max-w-2xl mx-auto">
              <p>You don't need to know the technology, architecture or development process.</p>
              <p className="font-bold text-white">You just need to tell us what your business needs.</p>
              <p>We'll help you turn the requirement into a practical software solution.</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button variant="white" size="lg" href="#contact" className="hover:-translate-y-1 shadow-xl">
              Get a Free Consultation
            </Button>
            <span className="text-sm font-medium text-blue-200">Discuss Your Requirement</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
`,
  'src/components/sections/ProjectInquiry.tsx': `
import React, { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { Code2, Mail, Phone, MapPin } from 'lucide-react';
import { companyData } from '../../data/company';

export function ProjectInquiry() {
  const [status, setStatus] = useState<'idle'|'submitting'|'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-3xl font-extrabold text-[#0F172A] mb-6">Contact Our Team</h2>
              <p className="text-textSecondary mb-8 leading-relaxed">
                Not sure what technology you need? That's okay. Tell us what you're trying to achieve, and we'll help define the right solution.
              </p>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-[#EFF6FF] p-3 rounded-lg text-primary shrink-0"><Mail className="w-5 h-5" /></div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">Email</p>
                    <a href={\`mailto:\${companyData.contact.email}\`} className="text-textSecondary hover:text-primary transition-colors">{companyData.contact.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#EFF6FF] p-3 rounded-lg text-primary shrink-0"><Phone className="w-5 h-5" /></div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">Phone / WhatsApp</p>
                    <a href={\`tel:\${companyData.contact.phone}\`} className="text-textSecondary hover:text-primary transition-colors">{companyData.contact.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#EFF6FF] p-3 rounded-lg text-primary shrink-0"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">Location</p>
                    <p className="text-textSecondary leading-relaxed">{companyData.contact.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-6 border-t border-borderLight">
                <div className="bg-primary text-white p-2 rounded-lg">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#0F172A]">{companyData.companyName}</p>
                  <p className="text-xs text-textSecondary">Software Built Around Your Business.</p>
                </div>
              </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-3">
            <Reveal delay={0.2}>
              <div className="bg-white border border-borderLight rounded-2xl shadow-lg shadow-slate-200/50 p-8">
                {status === 'success' ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-2">Inquiry Received</h3>
                    <p>Thank you for reaching out. Our team will review your requirement and contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5 group">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-wider group-focus-within:text-primary transition-colors">Your Name *</label>
                        <input required type="text" className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-1.5 group">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-wider group-focus-within:text-primary transition-colors">Business / Company Name</label>
                        <input type="text" className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-1.5 group">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-wider group-focus-within:text-primary transition-colors">Email *</label>
                        <input required type="email" className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-1.5 group">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-wider group-focus-within:text-primary transition-colors">Phone / WhatsApp *</label>
                        <input required type="tel" className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5 group">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-wider group-focus-within:text-primary transition-colors">What Do You Need? *</label>
                        <select required className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                          <option value="">Select...</option>
                          <option>Business Website</option>
                          <option>Custom Website</option>
                          <option>E-Commerce Website</option>
                          <option>Web Application</option>
                          <option>Mobile Application</option>
                          <option>Custom Software</option>
                          <option>AI / Automation</option>
                          <option>Existing Software Improvements</option>
                          <option>Not Sure Yet</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-1.5 group">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-wider group-focus-within:text-primary transition-colors">Budget Range</label>
                        <select className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                          <option value="">Select...</option>
                          <option>Under $5k</option>
                          <option>$5k - $10k</option>
                          <option>$10k - $25k</option>
                          <option>$25k+</option>
                          <option>To be discussed</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="text-xs font-bold text-textSecondary uppercase tracking-wider group-focus-within:text-primary transition-colors">Tell Us About Your Requirement *</label>
                      <textarea required rows={4} className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"></textarea>
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full shadow-md hover:-translate-y-0.5" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending...' : 'Get a Free Consultation'}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/index.css': `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', sans-serif;
  --color-background: #FFFFFF;
  --color-secondaryBg: #F8FAFC;
  --color-altBg: #F1F5F9;
  --color-textPrimary: #0F172A;
  --color-textSecondary: #64748B;
  --color-textMuted: #94A3B8;
  --color-primary: #2563EB;
  --color-primaryHover: #1D4ED8;
  --color-primaryLight: #EFF6FF;
  --color-accent: #0891B2;
  --color-borderLight: #E2E8F0;
  --color-footerBg: #0F172A;
  --color-success: #16A34A;
}

@layer base {
  body {
    background-color: var(--color-background);
    color: var(--color-textPrimary);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  
  html {
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-textPrimary);
  }
}

@layer components {
  .section-padding {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  @media (min-width: 768px) {
    .section-padding {
      padding-top: 5rem;
      padding-bottom: 5rem;
    }
  }
  @media (min-width: 1024px) {
    .section-padding {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }
  
  .container-custom {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    max-width: 80rem;
  }
  @media (min-width: 768px) {
    .container-custom {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }
  @media (min-width: 1024px) {
    .container-custom {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content.trim());
}

console.log('Animations and UI generated successfully.');
