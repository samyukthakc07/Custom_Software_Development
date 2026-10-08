const fs = require('fs');
const path = require('path');

const files = {
  'src/App.tsx': `
import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { WhyUs } from './components/sections/WhyUs';
import { Process } from './components/sections/Process';
import { Vision } from './components/sections/Vision';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
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
        <a href="#" className="flex items-center gap-2 group">
          <div className="bg-primary text-white p-2 rounded-lg group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
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
            <Button size="sm" href="#contact" className="hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all">
              Start a Project
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
  'src/components/layout/Footer.tsx': `
import React from 'react';
import { companyData, BROCHURE_URL } from '../../data/company';
import { Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-12 pb-6 border-t border-borderLight text-slate-300">
      <div className="container-custom max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">{companyData.companyName}</span>
            </div>
            <p className="text-slate-400 max-w-xs">Customized digital solutions built around your business.</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-white mb-2 uppercase tracking-wide text-xs">Explore</h4>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#why-us" className="hover:text-primary transition-colors">Why Us</a>
            <a href="#process" className="hover:text-primary transition-colors">Process</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-white mb-2 uppercase tracking-wide text-xs">Contact Info</h4>
            <a href={\`mailto:\${companyData.contact.email}\`} className="hover:text-primary transition-colors">{companyData.contact.email}</a>
            <a href={\`tel:\${companyData.contact.phone}\`} className="hover:text-primary transition-colors">{companyData.contact.phone}</a>
            <a href={BROCHURE_URL} download="Hackers-Infotech-Custom-Software-Brochure.pdf" className="hover:text-primary transition-colors mt-2 text-primary">Download Brochure &rarr;</a>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {companyData.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
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
  { id: 'website', icon: Globe, label: 'WEBSITE' },
  { id: 'application', icon: PanelsTopLeft, label: 'APPLICATION' },
  { id: 'software', icon: Code2, label: 'SOFTWARE' }
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

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 bg-white overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(37,99,235,0.05),transparent_60%)] rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <div className="text-primary font-bold tracking-wider text-xs uppercase mb-5">
                WEBSITES • APPLICATIONS • CUSTOM SOFTWARE
              </div>
            </Reveal>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.15] text-[#0F172A]">
              <Reveal delay={0.2}><span className="block">Your Business.</span></Reveal>
              <Reveal delay={0.3}><span className="block">Your Idea.</span></Reveal>
              <Reveal delay={0.4}><span className="block text-primary">Built Your Way.</span></Reveal>
            </h1>
            
            <Reveal delay={0.5}>
              <p className="text-lg text-textSecondary mb-3 leading-relaxed">
                From professional business websites to fully customized software, Hackers Infotech builds digital solutions around your requirements, goals and budget.
              </p>
              <p className="text-lg text-[#0F172A] font-medium mb-8 leading-relaxed">
                Whether you're a small business, startup, growing company or enterprise — tell us what you need and we'll help you build it.
              </p>
            </Reveal>
            
            <Reveal delay={0.6}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
                <Button size="lg" href="#contact" className="group shadow-lg hover:-translate-y-0.5 transition-all">
                  Tell Us What You Need
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="white" size="lg" href="#services" className="hover:bg-[#EFF6FF] transition-colors">
                  Explore Services
                </Button>
                <a href={BROCHURE_URL} download="Hackers-Infotech-Custom-Software-Brochure.pdf" className="inline-flex items-center justify-center h-12 px-4 text-sm font-semibold text-textSecondary hover:text-primary transition-colors group">
                  <Download className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                  Download Brochure
                </a>
              </div>
            </Reveal>
            
            <Reveal delay={0.7}>
              <div className="flex flex-wrap gap-y-2 gap-x-6 pt-5 border-t border-borderLight text-sm font-bold text-[#0F172A]">
                {[
                  "Customized for You", 
                  "Affordable Development", 
                  "Flexible Scope"
                ].map((text, i) => (
                  <motion.div key={i} className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1 rounded-full text-primary"><Check className="w-3 h-3" strokeWidth={3} /></div>
                    {text}
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
          
          <Reveal variant="scale" delay={0.3} className="hidden lg:flex justify-center w-full">
            <div className="bg-white border border-borderLight rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-primary/5 flex flex-col items-center relative">
                
                <div className="bg-[#0F172A] text-white px-6 py-2 rounded-full font-bold text-xs tracking-widest uppercase shadow-md relative z-20">
                    Your Idea
                </div>
                
                <div className="w-px h-8 bg-borderLight my-2 relative">
                    <motion.div className="absolute top-0 w-full bg-primary" animate={{ height: '100%' }} transition={{ duration: 1.5, repeat: Infinity }} />
                </div>
                
                <div className="bg-[#F8FAFC] border border-borderLight text-textSecondary px-6 py-2 rounded-full font-bold text-sm shadow-sm relative z-20 mb-6">
                    What do you need?
                </div>
                
                <div className="flex justify-between w-full gap-3 relative z-20">
                  {solutions.map((sol) => {
                    const isActive = activeId === sol.id;
                    return (
                      <button 
                        key={sol.id}
                        onClick={() => setActiveId(sol.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 flex-1 outline-none",
                          isActive ? "border-primary bg-[#EFF6FF] shadow-sm -translate-y-1" : "border-borderLight bg-white hover:bg-gray-50"
                        )}
                      >
                        <sol.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-textSecondary")} />
                        <span className={cn("font-bold text-[10px] uppercase tracking-wide", isActive ? "text-primary" : "text-[#0F172A]")}>
                          {sol.label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="h-12 w-full relative mt-3 flex justify-center">
                    {solutions.map((sol) => (
                      <div key={\`line-\${sol.id}\`} className={cn("absolute top-0 w-px transition-colors duration-500", 
                          sol.id === 'website' ? 'left-[16%] h-full border-l-2 rounded-bl-xl' :
                          sol.id === 'application' ? 'left-1/2 h-full' :
                          'right-[16%] h-full border-r-2 rounded-br-xl'
                        )}>
                        <AnimatePresence>
                          {activeId === sol.id && <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} exit={{ opacity: 0 }} className="absolute top-0 w-0.5 bg-primary -ml-[1px]" />}
                        </AnimatePresence>
                      </div>
                    ))}
                    <div className="absolute bottom-0 w-2/3 h-px">
                      <AnimatePresence>
                          <motion.div initial={{ width: 0, left: '50%' }} animate={{ width: '100%', left: 0 }} className="absolute h-0.5 bg-primary top-0 -mt-[1px]" />
                      </AnimatePresence>
                    </div>
                    <div className="absolute bottom-[-16px] left-1/2 w-0.5 h-4 bg-primary -ml-[1px]"></div>
                </div>

                <div className="mt-8 bg-primary text-white px-6 py-4 rounded-xl shadow-lg w-full text-center font-bold text-sm tracking-wide">
                    BUILT FOR YOUR BUSINESS
                </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Services.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';
import { Globe, ShoppingCart, LayoutTemplate, Smartphone, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const services = [
  { icon: Globe, title: "BUSINESS WEBSITES", examples: ["Company websites", "Portfolio websites", "Service websites", "Landing pages"] },
  { icon: ShoppingCart, title: "E-COMMERCE", examples: ["Online stores", "Product catalogs", "Ordering experiences"] },
  { icon: LayoutTemplate, title: "WEB APPLICATIONS", examples: ["Booking systems", "Customer portals", "Dashboards", "Management applications"] },
  { icon: Smartphone, title: "MOBILE APPLICATIONS", examples: ["Customer apps", "Business apps", "Custom mobile solutions"] },
  { icon: Cpu, title: "CUSTOM SOFTWARE", examples: ["CRM", "Inventory", "Billing", "Workflow systems", "Unique business requirements"] },
  { icon: Sparkles, title: "AI & AUTOMATION", examples: ["AI assistants", "Automation", "AI integrations", "Intelligent workflows"] }
];

export function Services() {
  return (
    <section id="services" className="section-padding bg-[#F8FAFC]">
      <div className="container-custom max-w-6xl">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Whatever You Need, We'll Help You Build It.</h2>
            <p className="text-textSecondary text-lg max-w-2xl mx-auto">From a simple business website to completely customized software, we build around your actual requirement.</p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {services.map((service, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="group bg-white border border-borderLight rounded-2xl p-6 hover:shadow-md hover:border-primary/50 hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4 border-b border-borderLight pb-4">
                    <div className="p-2.5 bg-[#EFF6FF] rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A]">{service.title}</h3>
                </div>
                <ul className="space-y-2 flex-grow">
                  {service.examples.map((ex, i) => (
                    <li key={i} className="text-sm text-textSecondary flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-borderLight group-hover:bg-primary/50 transition-colors shrink-0"></span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="text-center bg-white border border-borderLight rounded-2xl p-8 max-w-3xl mx-auto shadow-sm">
              <h3 className="text-lg font-bold text-[#0F172A] mb-1">Don't see exactly what you need?</h3>
              <p className="text-textSecondary mb-6">Tell us your requirement — that's what custom development is for.</p>
              <Button href="#contact" className="group">
                Discuss Your Requirement <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
`,
  'src/components/sections/WhyUs.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';
import { Settings, DollarSign, Expand } from 'lucide-react';

const pillars = [
  { num: "01", title: "CUSTOMIZED", icon: Settings, desc: "Your solution is built around your requirements — not forced into a one-size-fits-all template." },
  { num: "02", title: "AFFORDABLE", icon: DollarSign, desc: "We focus on practical functionality and business value without adding unnecessary scope." },
  { num: "03", title: "FLEXIBLE", icon: Expand, desc: "Start with what you need today and expand the solution as your business grows." }
];

export function WhyUs() {
  return (
    <section id="why-us" className="section-padding bg-white border-t border-borderLight">
      <div className="container-custom max-w-5xl">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Built for Your Business.<br/>Planned Around Your Budget.</h2>
            <p className="text-lg text-textSecondary max-w-2xl mx-auto">
              Custom development doesn't have to mean unnecessary complexity or unnecessary cost. We focus on building what your business actually needs.
            </p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-px bg-borderLight -z-10"></div>
            {pillars.map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <div className="text-center bg-white px-4 group">
                  <div className="w-16 h-16 bg-[#EFF6FF] text-primary rounded-2xl flex items-center justify-center mx-auto mb-5 border border-primary/10 shadow-sm group-hover:-translate-y-1 transition-transform">
                      <pillar.icon className="w-7 h-7" />
                  </div>
                  <div className="text-primary font-bold text-xs mb-1 tracking-widest">{pillar.num}</div>
                  <h4 className="font-extrabold text-[#0F172A] mb-3 text-lg">{pillar.title}</h4>
                  <p className="text-textSecondary text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </Reveal>
            ))}
        </div>

        <Reveal delay={0.4}>
          <div className="text-center bg-[#F8FAFC] rounded-2xl p-8 border border-borderLight">
              <p className="text-[#0F172A] font-bold text-sm tracking-wide mb-2 uppercase">
                Small Business <span className="text-primary mx-2">•</span> Startup <span className="text-primary mx-2">•</span> Growing Company <span className="text-primary mx-2">•</span> Enterprise
              </p>
              <p className="text-textSecondary">Different businesses. Different requirements. One flexible development approach.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Process.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';

const steps = [
  { num: '01', title: 'TELL US WHAT YOU NEED', desc: 'Share your idea, business problem or requirement.' },
  { num: '02', title: 'WE PLAN IT', desc: 'We understand the features, priorities and budget.' },
  { num: '03', title: 'WE BUILD IT', desc: 'We design, develop and test your customized solution.' },
  { num: '04', title: 'WE LAUNCH IT', desc: 'Your solution goes live and can continue growing.' }
];

export function Process() {
  return (
    <section id="process" className="section-padding bg-[#F8FAFC]">
      <div className="container-custom max-w-5xl">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">From Your Idea to Your Solution.</h2>
          </div>
        </Reveal>
        
        {/* Desktop Horizontal */}
        <div className="hidden md:flex relative justify-between items-start">
            <Reveal className="absolute top-[1.25rem] left-[10%] right-[10%] h-[2px] bg-borderLight -z-10" />
            {steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.15} className="flex-1 px-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center font-bold text-sm text-primary mx-auto mb-5 shadow-sm">
                      {step.num}
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-sm mb-2">{step.title}</h4>
                  <p className="text-textSecondary text-sm">{step.desc}</p>
              </Reveal>
            ))}
        </div>

        {/* Mobile Vertical */}
        <div className="md:hidden relative space-y-8 pl-4">
            <Reveal className="absolute top-4 bottom-4 left-[2.25rem] w-[2px] bg-borderLight -z-10" />
            {steps.map((step, idx) => (
              <Reveal key={idx} delay={0.1} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center font-bold text-sm text-primary shrink-0 shadow-sm mt-0.5">
                      {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm mb-1">{step.title}</h4>
                    <p className="text-textSecondary text-sm">{step.desc}</p>
                  </div>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Vision.tsx': `
import React from 'react';
import { Reveal } from '../ui/Reveal';
import { ArrowRight } from 'lucide-react';

export function Vision() {
  return (
    <section id="vision" className="section-padding bg-[#EFF6FF] border-y border-blue-100">
      <div className="container-custom max-w-4xl text-center">
        <Reveal>
          <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Our Vision
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] leading-tight mb-8">
            "Customized Technology Should Be Accessible to Every Business."
          </h2>
        </Reveal>
        
        <Reveal delay={0.1}>
          <div className="max-w-2xl mx-auto space-y-4 text-lg text-textSecondary leading-relaxed mb-10">
              <p>We believe every business deserves technology that fits the way it works — regardless of its size.</p>
              <p>Whether you need a simple professional website or a completely customized software solution, our goal is to make development professional, affordable and flexible.</p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 font-bold text-sm md:text-base text-[#0F172A] tracking-wide mb-6">
                 <span>START SIMPLE.</span>
                 <span className="hidden md:block text-blue-200">•</span>
                 <span>CUSTOMIZE WHAT YOU NEED.</span>
                 <span className="hidden md:block text-blue-200">•</span>
                 <span>GROW WHEN YOU'RE READY.</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-primary font-bold text-sm">
                 <span className="bg-blue-50 px-3 py-1 rounded">Website</span>
                 <ArrowRight className="w-4 h-4 text-blue-300" />
                 <span className="bg-blue-50 px-3 py-1 rounded">Application</span>
                 <ArrowRight className="w-4 h-4 text-blue-300" />
                 <span className="bg-blue-50 px-3 py-1 rounded">Custom Software</span>
              </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Contact.tsx': `
import React, { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { Check, ArrowRight, Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { companyData } from '../../data/company';

export function Contact() {
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT: INFO */}
          <div>
            <Reveal>
              <div className="text-primary font-bold tracking-wider text-xs uppercase mb-4">Let's Build Something</div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Tell Us What You Need.</h2>
              <p className="text-textSecondary mb-8 text-lg">
                You don't need to know the technology. Just tell us what you're trying to build and we'll help you identify the right solution.
              </p>
              
              <div className="space-y-3 mb-10 text-[#0F172A] font-semibold text-sm">
                <div className="flex items-center gap-2"><div className="bg-green-100 text-green-700 p-1 rounded-full"><Check className="w-3 h-3" strokeWidth={3} /></div> Free initial discussion</div>
                <div className="flex items-center gap-2"><div className="bg-green-100 text-green-700 p-1 rounded-full"><Check className="w-3 h-3" strokeWidth={3} /></div> Flexible project scope</div>
                <div className="flex items-center gap-2"><div className="bg-green-100 text-green-700 p-1 rounded-full"><Check className="w-3 h-3" strokeWidth={3} /></div> Solutions for different budgets</div>
              </div>
              
              <div className="bg-[#F8FAFC] border border-borderLight rounded-xl p-6 space-y-4 text-sm font-medium text-[#0F172A]">
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> <a href={\`tel:\${companyData.contact.phone}\`}>{companyData.contact.phone}</a></div>
                <div className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-primary" /> <a href={\`https://wa.me/\${companyData.contact.phone.replace(/[^0-9]/g, '')}\`}>WhatsApp</a></div>
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> <a href={\`mailto:\${companyData.contact.email}\`}>{companyData.contact.email}</a></div>
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> <span>{companyData.contact.address}</span></div>
              </div>
            </Reveal>
          </div>
          
          {/* RIGHT: FORM */}
          <div>
            <Reveal delay={0.2}>
              <div className="bg-white border border-borderLight rounded-2xl shadow-lg p-6 md:p-8">
                {status === 'success' ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-2">Request Received</h3>
                    <p>Thank you. We will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1 group">
                        <label className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">Name *</label>
                        <input required type="text" className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-1 group">
                        <label className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">Phone / WhatsApp *</label>
                        <input required type="tel" className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                    </div>
                    
                    <div className="space-y-1 group">
                      <label className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">Email *</label>
                      <input required type="email" className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1 group">
                        <label className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">What Do You Need? *</label>
                        <select required className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                          <option value="">Select...</option>
                          <option>Business Website</option>
                          <option>Custom Website</option>
                          <option>E-Commerce</option>
                          <option>Web Application</option>
                          <option>Mobile Application</option>
                          <option>Custom Software</option>
                          <option>AI / Automation</option>
                          <option>Not Sure Yet</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-1 group">
                        <label className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">Budget Range</label>
                        <select className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                          <option value="">Select...</option>
                          <option>Under $5k</option>
                          <option>$5k - $10k</option>
                          <option>$10k - $25k</option>
                          <option>$25k+</option>
                          <option>To be discussed</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1 group">
                      <label className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">Tell Us About Your Requirement *</label>
                      <textarea required rows={3} className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"></textarea>
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full shadow-md hover:-translate-y-0.5 group mt-2" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending...' : <>GET A FREE CONSULTATION <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>}
                    </Button>
                    <p className="text-center text-xs text-textSecondary mt-3">Not sure what you need? That's okay. Tell us your idea.</p>
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
    scroll-padding-top: 80px;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-textPrimary);
  }
}

@layer components {
  .section-padding {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  @media (min-width: 768px) {
    .section-padding {
      padding-top: 4.5rem;
      padding-bottom: 4.5rem;
    }
  }
  @media (min-width: 1024px) {
    .section-padding {
      padding-top: 5.5rem;
      padding-bottom: 5.5rem;
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

console.log('Simplification generated successfully.');
