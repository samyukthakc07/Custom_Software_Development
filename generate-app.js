import fs from 'fs';
import path from 'path';

const files = {
  'src/App.tsx': `
import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { TrustBar } from './components/sections/TrustBar';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Solutions } from './components/sections/Solutions';
import { Industries } from './components/sections/Industries';
import { Process } from './components/sections/Process';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { Technologies } from './components/sections/Technologies';
import { EngagementModels } from './components/sections/EngagementModels';
import { CaseStudies } from './components/sections/CaseStudies';
import { Security } from './components/sections/Security';
import { FAQ } from './components/sections/FAQ';
import { Brochure } from './components/sections/Brochure';
import { ProjectInquiry } from './components/sections/ProjectInquiry';
import { FinalCTA } from './components/sections/FinalCTA';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Solutions />
        <Industries />
        <Process />
        <WhyChooseUs />
        <Technologies />
        <EngagementModels />
        <CaseStudies />
        <Security />
        <FAQ />
        <Brochure />
        <ProjectInquiry />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
`,
  'src/components/ui/SectionHeading.tsx': `
import React from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 lg:mb-16", align === 'center' ? 'text-center mx-auto' : 'text-left', className)}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-textPrimary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-textSecondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
`,
  'src/components/layout/Navbar.tsx': `
import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { companyData } from '../../data/company';

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
    { name: 'Solutions', href: '#solutions' },
    { name: 'Process', href: '#process' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={\`fixed top-0 w-full z-50 transition-all duration-300 \${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-borderLight py-3' : 'bg-transparent py-5'}\`}>
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">{companyData.shortName}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-sm font-medium text-textSecondary hover:text-textPrimary transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 border-l border-borderLight pl-6">
            <Button variant="ghost" size="sm" href={companyData.brochurePath} download>
              Brochure
            </Button>
            <Button size="sm" href="#contact">
              Start Project
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-textSecondary hover:text-textPrimary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-secondaryBg border-b border-borderLight shadow-xl py-6 px-6 flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-lg font-medium text-textSecondary hover:text-textPrimary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-4 border-t border-borderLight">
            <Button variant="outline" className="w-full justify-center" href={companyData.brochurePath} download>
              Download Brochure
            </Button>
            <Button className="w-full justify-center" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Start a Project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
`,
  'src/components/layout/Footer.tsx': `
import React from 'react';
import { Code2, Linkedin, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { companyData } from '../../data/company';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondaryBg border-t border-borderLight pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1.5 rounded text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl">{companyData.companyName}</span>
            </a>
            <p className="text-textSecondary mb-6 max-w-sm">
              {companyData.description}
            </p>
            <div className="flex items-center gap-4">
              <a href={companyData.social.linkedin} className="text-textSecondary hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={companyData.social.website} className="text-textSecondary hover:text-primary transition-colors" aria-label="Website">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6 text-textPrimary">Services</h4>
            <ul className="flex flex-col gap-3">
              {['Web Development', 'Mobile Apps', 'Enterprise Software', 'SaaS Development', 'AI Solutions', 'Cloud Architecture'].map(item => (
                <li key={item}><a href="#services" className="text-textSecondary hover:text-accent transition-colors text-sm">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6 text-textPrimary">Company</h4>
            <ul className="flex flex-col gap-3">
              {['About Us', 'Development Process', 'Technologies', 'Case Studies', 'Careers', 'Contact'].map(item => (
                <li key={item}><a href="#" className="text-textSecondary hover:text-accent transition-colors text-sm">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6 text-textPrimary">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-textSecondary text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <a href={\`mailto:\${companyData.contact.email}\`} className="hover:text-textPrimary">{companyData.contact.email}</a>
              </li>
              <li className="flex items-start gap-3 text-textSecondary text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <a href={\`tel:\${companyData.contact.phone}\`} className="hover:text-textPrimary">{companyData.contact.phone}</a>
              </li>
              <li className="flex items-start gap-3 text-textSecondary text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" shrink-0 />
                <span>{companyData.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-borderLight pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-textSecondary">
          <p>© {currentYear} {companyData.companyName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-textPrimary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-textPrimary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-textPrimary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
`,
  'src/components/sections/Hero.tsx': `
import React from 'react';
import { ArrowRight, Download, ShieldCheck, Zap, Layers } from 'lucide-react';
import { Button } from '../ui/Button';
import { companyData } from '../../data/company';

export function Hero() {
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-50 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-secondaryAccent/10 rounded-full blur-[100px] opacity-40 -translate-x-1/3 translate-y-1/3"></div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondaryBg border border-borderLight text-sm font-medium text-accent mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Enterprise-Grade Software Engineering
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-textPrimary">
              Custom Software Built Around <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondaryAccent">Your Business</span>
            </h1>
            
            <p className="text-lg md:text-xl text-textSecondary mb-8 leading-relaxed">
              We design and develop secure, scalable and high-performance software solutions tailored to your business processes, customers and growth goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" href="#contact" className="group">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" href={companyData.brochurePath} download>
                <Download className="mr-2 w-5 h-5" />
                Download Brochure
              </Button>
            </div>
            
            <p className="text-sm text-textSecondary flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              From idea to deployment — your technology partner for web, mobile, cloud and AI solutions.
            </p>
          </div>
          
          <div className="relative hidden lg:block">
            {/* Abstract Tech Visual */}
            <div className="relative w-full aspect-square max-w-[600px] ml-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-card to-secondaryBg border border-borderLight rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-12 border-b border-borderLight flex items-center px-4 gap-2 bg-background/50 backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="p-8 pt-20 h-full flex flex-col gap-4 relative">
                  {/* Mock code blocks */}
                  <div className="w-3/4 h-8 bg-background rounded border border-borderLight/50 flex items-center px-3 opacity-80">
                    <div className="w-1/2 h-2 bg-primary/40 rounded"></div>
                  </div>
                  <div className="w-full h-32 bg-background rounded border border-borderLight/50 p-4 opacity-80">
                    <div className="flex flex-col gap-3">
                      <div className="w-full h-2 bg-textSecondary/20 rounded"></div>
                      <div className="w-5/6 h-2 bg-textSecondary/20 rounded"></div>
                      <div className="w-4/6 h-2 bg-textSecondary/20 rounded"></div>
                      <div className="w-full h-2 bg-textSecondary/20 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -right-4 top-1/3 bg-card border border-borderLight p-4 rounded-xl shadow-xl flex items-center gap-4 animate-[bounce_4s_infinite]">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary"><Zap className="w-6 h-6" /></div>
                    <div>
                      <div className="text-sm font-semibold text-textPrimary">High Performance</div>
                      <div className="text-xs text-textSecondary">99.9% Uptime</div>
                    </div>
                  </div>
                  
                  <div className="absolute -left-8 bottom-1/4 bg-card border border-borderLight p-4 rounded-xl shadow-xl flex items-center gap-4 animate-[bounce_5s_infinite_0.5s]">
                    <div className="bg-secondaryAccent/20 p-2 rounded-lg text-secondaryAccent"><Layers className="w-6 h-6" /></div>
                    <div>
                      <div className="text-sm font-semibold text-textPrimary">Scalable Arch</div>
                      <div className="text-xs text-textSecondary">Microservices</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/TrustBar.tsx': `
import React from 'react';
import { Code, Server, Lock, RefreshCw, Cpu, HeadphonesIcon } from 'lucide-react';

export function TrustBar() {
  const capabilities = [
    { icon: Code, label: "Custom-Built Solutions" },
    { icon: Server, label: "Scalable Architecture" },
    { icon: Lock, label: "Secure Development" },
    { icon: RefreshCw, label: "Agile Delivery" },
    { icon: Cpu, label: "Modern Technology" },
    { icon: HeadphonesIcon, label: "Long-Term Support" },
  ];

  return (
    <div className="border-y border-borderLight bg-secondaryBg py-8">
      <div className="container-custom overflow-hidden">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-70">
          {capabilities.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-textSecondary" />
              <span className="font-medium text-sm text-textSecondary tracking-wide uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`,
  'src/components/sections/About.tsx': `
import React from 'react';
import { Target, TrendingUp, Lock, RefreshCw } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const features = [
  { icon: Target, title: 'Tailored to Your Business', desc: 'We build around your processes, not the other way around.' },
  { icon: TrendingUp, title: 'Scalable by Design', desc: 'Architecture built to grow seamlessly with your user base and data.' },
  { icon: Lock, title: 'Secure Engineering', desc: 'Security is embedded at every phase of our development lifecycle.' },
  { icon: RefreshCw, title: 'Built for Long-Term Growth', desc: 'Maintainable, clean code that allows for easy future iterations.' }
];

export function About() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6 leading-tight">
              Software Designed for the Way <span className="text-accent">Your Business Works</span>
            </h2>
            <p className="text-lg text-textSecondary mb-6">
              Off-the-shelf software often forces companies to change their operations. Our approach is different. We understand your business, workflow, users, and scalability requirements first.
            </p>
            <p className="text-lg text-textSecondary mb-10">
              We engineer solutions that perfectly map to your operational challenges and integrations, delivering unparalleled efficiency and capability.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2.5 rounded-lg text-primary mt-1">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-textPrimary">{feat.title}</h4>
                    <p className="text-sm text-textSecondary mt-1">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-card to-secondaryBg border border-borderLight overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-background/50"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full bg-card/80 backdrop-blur-md border border-borderLight rounded-xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Target className="w-5 h-5"/></div>
                            <div>
                                <div className="text-sm font-semibold">Strategic Alignment</div>
                                <div className="text-xs text-textSecondary">Business-First Approach</div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 w-full bg-secondaryBg rounded-full overflow-hidden"><div className="h-full w-[95%] bg-primary"></div></div>
                            <div className="h-2 w-full bg-secondaryBg rounded-full overflow-hidden"><div className="h-full w-[80%] bg-accent"></div></div>
                            <div className="h-2 w-full bg-secondaryBg rounded-full overflow-hidden"><div className="h-full w-[100%] bg-secondaryAccent"></div></div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Services.tsx': `
import React from 'react';
import { Monitor, Smartphone, Building2, Cloud, Brain, Network, RotateCcw, Shield, PenTool } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const services = [
  {
    icon: Monitor,
    title: "Custom Web Applications",
    description: "Enterprise portals, SaaS platforms, dashboards, management systems and robust workflow applications."
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native Android, iOS and cross-platform applications designed for performance and excellent user experience."
  },
  {
    icon: Building2,
    title: "Enterprise Software",
    description: "Business-critical applications designed around complex organizational processes and requirements."
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Cloud-native systems designed for scalability, high availability, and optimal resource utilization."
  },
  {
    icon: Brain,
    title: "AI & GenAI Solutions",
    description: "AI-enabled applications, intelligent automation, smart assistants, and powerful GenAI integrations."
  },
  {
    icon: Network,
    title: "API & System Integration",
    description: "Connect diverse applications, third-party platforms and disparate business systems seamlessly."
  },
  {
    icon: RotateCcw,
    title: "Software Modernization",
    description: "Modernize legacy applications and migrate outdated systems to modern, secure architectures."
  },
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    description: "Secure application architecture, vulnerability assessment and security-focused software development."
  },
  {
    icon: PenTool,
    title: "UI/UX Development",
    description: "Professional interfaces designed around user needs, usability standards, and business workflows."
  }
];

export function Services() {
  return (
    <section id="services" className="section-padding bg-secondaryBg">
      <div className="container-custom">
        <SectionHeading 
          title="Custom Software Development Services" 
          subtitle="Comprehensive engineering capabilities to build, scale, and secure your digital products."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="bg-background border border-borderLight rounded-xl p-8 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-textPrimary mb-3">{service.title}</h3>
              <p className="text-textSecondary leading-relaxed mb-6">
                {service.description}
              </p>
              <a href="#contact" className="inline-flex items-center text-sm font-medium text-accent hover:text-primary transition-colors">
                Learn More <span className="ml-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Solutions.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

const solutions = [
  "CRM Systems", "ERP Systems", "Customer Portals", 
  "Employee Portals", "Booking Platforms", "E-Commerce Platforms", 
  "Inventory Management Systems", "Asset Management Systems", "Learning Management Systems", 
  "Healthcare Platforms", "FinTech Applications", "Security Platforms", 
  "Analytics Dashboards", "Workflow Automation", "AI Assistants", 
  "Document Management Systems", "Marketplace Platforms", "Field Service Applications"
];

export function Solutions() {
  return (
    <section id="solutions" className="section-padding bg-background">
      <div className="container-custom">
        <SectionHeading 
          title="Solutions We Can Build" 
          subtitle="From internal operational tools to customer-facing platforms, we have the expertise to develop complex systems."
        />
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
          {solutions.map((sol, idx) => (
            <div key={idx} className="bg-secondaryBg border border-borderLight text-textPrimary px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium shadow-sm hover:border-primary/50 transition-colors cursor-default">
              {sol}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Industries.tsx': `
import React from 'react';
import { HeartPulse, Landmark, ShoppingBag, Factory, GraduationCap, Truck, Briefcase, Home, ShieldAlert, Rocket, Building2, MonitorSmartphone } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const industries = [
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Landmark, name: "FinTech" },
  { icon: ShoppingBag, name: "Retail & E-Commerce" },
  { icon: Factory, name: "Manufacturing" },
  { icon: GraduationCap, name: "Education" },
  { icon: Truck, name: "Logistics" },
  { icon: Briefcase, name: "Professional Services" },
  { icon: Home, name: "Real Estate" },
  { icon: ShieldAlert, name: "Cybersecurity" },
  { icon: Rocket, name: "Startups" },
  { icon: Building2, name: "Enterprise" },
  { icon: MonitorSmartphone, name: "Technology Companies" }
];

export function Industries() {
  return (
    <section className="section-padding bg-secondaryBg">
      <div className="container-custom">
        <SectionHeading 
          title="Software Solutions Across Industries" 
          subtitle="Domain expertise translated into high-performance technical solutions."
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {industries.map((ind, idx) => (
            <div key={idx} className="bg-background border border-borderLight rounded-xl p-6 flex flex-col items-center text-center hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-secondaryBg rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <ind.icon className="w-6 h-6 text-textSecondary group-hover:text-primary transition-colors" />
              </div>
              <h4 className="font-semibold text-textPrimary">{ind.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Process.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Search, FileText, PenTool, GitMerge, Code2, CheckCircle2, Rocket, Headset } from 'lucide-react';

const steps = [
  { num: '01', icon: Search, title: 'Discovery', desc: 'Understand business goals, users, challenges and requirements.' },
  { num: '02', icon: FileText, title: 'Requirement Analysis', desc: 'Convert business requirements into technical specifications.' },
  { num: '03', icon: PenTool, title: 'UI/UX Design', desc: 'Create workflows, wireframes and product interfaces.' },
  { num: '04', icon: GitMerge, title: 'Architecture', desc: 'Design application, database, APIs, integrations and infrastructure.' },
  { num: '05', icon: Code2, title: 'Development', desc: 'Build the application using agile development practices.' },
  { num: '06', icon: CheckCircle2, title: 'Testing & QA', desc: 'Functional, integration, usability, performance and security testing.' },
  { num: '07', icon: Rocket, title: 'Deployment', desc: 'Deploy the production application.' },
  { num: '08', icon: Headset, title: 'Support & Evolution', desc: 'Monitoring, maintenance, improvements and future features.' }
];

export function Process() {
  return (
    <section id="process" className="section-padding bg-background">
      <div className="container-custom">
        <SectionHeading 
          title="From Idea to Production" 
          subtitle="A transparent, structured engineering process designed to deliver reliable software on time."
        />
        
        <div className="relative max-w-4xl mx-auto mt-16">
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-borderLight -translate-x-1/2 hidden sm:block"></div>
          
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div key={idx} className={\`relative flex flex-col sm:flex-row gap-8 items-start \${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}\`}>
                <div className="hidden sm:block flex-1"></div>
                
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-secondaryBg border-2 border-primary text-primary shadow-lg shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  <step.icon className="w-6 h-6" />
                </div>
                
                <div className={\`flex-1 bg-secondaryBg border border-borderLight rounded-xl p-6 shadow-sm \${idx % 2 === 0 ? 'sm:text-right' : 'text-left'}\`}>
                  <div className="text-sm font-bold text-primary mb-2">Phase {step.num}</div>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">{step.title}</h3>
                  <p className="text-textSecondary">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/WhyChooseUs.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Briefcase, Eye, Layers, ShieldCheck, Zap, Handshake } from 'lucide-react';

const reasons = [
  { icon: Briefcase, title: "Business-First Engineering", desc: "We focus on solving business problems, not just writing code." },
  { icon: Eye, title: "Transparent Development Process", desc: "Clear communication, regular updates, and full visibility into progress." },
  { icon: Layers, title: "Scalable Architecture", desc: "Systems designed to handle growth in users, data, and complexity." },
  { icon: ShieldCheck, title: "Security-Focused Development", desc: "Adherence to OWASP standards and secure coding practices." },
  { icon: Zap, title: "Modern Technology Stack", desc: "Utilizing reliable, modern frameworks that ensure performance." },
  { icon: Handshake, title: "Long-Term Technical Partnership", desc: "We support your software long after the initial deployment." }
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-secondaryBg">
      <div className="container-custom">
        <SectionHeading 
          title="Why Businesses Choose Custom Development With Us" 
          subtitle="We combine engineering excellence with business acumen to deliver software that drives results."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <div key={idx} className="bg-background border border-borderLight rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                <reason.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-textPrimary mb-3">{reason.title}</h3>
              <p className="text-textSecondary">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Technologies.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

const techStacks = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Django", "FastAPI", "REST APIs"]
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]
  },
  {
    category: "Cloud / DevOps",
    items: ["AWS", "Azure", "Docker", "GitHub", "CI/CD"]
  },
  {
    category: "Mobile",
    items: ["React Native", "Flutter"]
  },
  {
    category: "AI & Security",
    items: ["LLM Integration", "Generative AI", "RAG", "Ollama", "OWASP", "Auth"]
  }
];

export function Technologies() {
  return (
    <section id="technologies" className="section-padding bg-background">
      <div className="container-custom">
        <SectionHeading 
          title="Modern Technology Stack" 
          subtitle="We leverage proven, enterprise-grade technologies to build scalable and secure software."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStacks.map((stack, idx) => (
            <div key={idx} className="bg-secondaryBg border border-borderLight rounded-xl p-6">
              <h3 className="text-xl font-semibold text-textPrimary mb-4 pb-2 border-b border-borderLight">{stack.category}</h3>
              <div className="flex flex-wrap gap-2">
                {stack.items.map(item => (
                  <span key={item} className="bg-card border border-borderLight text-textSecondary text-sm px-3 py-1.5 rounded-md">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/EngagementModels.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

const models = [
  {
    title: "Fixed Scope",
    desc: "Suitable for projects with clearly defined requirements, timelines, and deliverables.",
    features: ["Predictable budget", "Clear milestones", "Defined deliverables", "Minimal client oversight needed"]
  },
  {
    title: "Dedicated Development Team",
    desc: "A dedicated engineering team working with you continuously as an extension of your company.",
    features: ["Flexible scope", "Direct team control", "Continuous development", "Long-term collaboration"],
    highlight: true
  },
  {
    title: "MVP Development",
    desc: "Rapidly transform a validated idea into a functional product to test the market quickly.",
    features: ["Fast time-to-market", "Core feature focus", "Cost-effective validation", "Iterative scaling approach"]
  }
];

export function EngagementModels() {
  return (
    <section className="section-padding bg-secondaryBg">
      <div className="container-custom">
        <SectionHeading 
          title="Work With Us Your Way" 
          subtitle="Flexible engagement models tailored to your project requirements and organizational structure."
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {models.map((model, idx) => (
            <div key={idx} className={\`bg-background border rounded-2xl p-8 flex flex-col h-full \${model.highlight ? 'border-primary shadow-xl shadow-primary/10 relative' : 'border-borderLight'}\`}>
              {model.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-textPrimary mb-3">{model.title}</h3>
              <p className="text-textSecondary mb-8 flex-grow">{model.desc}</p>
              
              <ul className="space-y-3 mb-8">
                {model.features.map(feat => (
                  <li key={feat} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-textPrimary text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant={model.highlight ? 'primary' : 'outline'} className="w-full" href="#contact">
                Discuss Your Project
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/CaseStudies.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const placeholders = [
  {
    name: "Enterprise ERP Transformation",
    industry: "Manufacturing",
    challenge: "Legacy systems causing operational silos and data inconsistencies across 5 facilities.",
    solution: "A unified cloud-based ERP with real-time inventory and supply chain tracking.",
    technology: "React, Node.js, PostgreSQL, AWS",
    outcome: "40% reduction in inventory errors, unified data visibility."
  },
  {
    name: "AI-Powered Patient Portal",
    industry: "Healthcare",
    challenge: "High volume of basic patient inquiries overwhelming clinical staff.",
    solution: "Secure patient portal with an AI triage assistant and secure messaging.",
    technology: "Next.js, Python, HIPAA-compliant Cloud, LLM",
    outcome: "30% reduction in support calls, improved patient engagement."
  }
];

export function CaseStudies() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <SectionHeading 
          title="Featured Work" 
          subtitle="Examples of complex challenges we've solved with custom software engineering."
        />
        
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-10 text-sm text-center text-primary font-medium max-w-2xl mx-auto">
          Demo Content: These are representative examples of the types of projects we deliver.
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {placeholders.map((study, idx) => (
            <div key={idx} className="bg-secondaryBg border border-borderLight rounded-2xl p-8 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-card text-textSecondary text-xs font-medium px-3 py-1 rounded-full border border-borderLight">
                  {study.industry}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-6">{study.name}</h3>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div>
                  <h4 className="text-sm font-semibold text-textPrimary mb-1">Challenge:</h4>
                  <p className="text-sm text-textSecondary">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-textPrimary mb-1">Solution:</h4>
                  <p className="text-sm text-textSecondary">{study.solution}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-textPrimary mb-1">Outcome:</h4>
                  <p className="text-sm text-emerald-400">{study.outcome}</p>
                </div>
              </div>
              
              <div className="border-t border-borderLight pt-6 mt-auto flex items-center justify-between">
                <div className="text-xs text-textSecondary font-mono">{study.technology}</div>
                <Button variant="ghost" size="sm" className="group text-accent hover:text-primary">
                  View Case Study <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Security.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Shield, Lock, FileCode, Server } from 'lucide-react';

const practices = [
  { icon: FileCode, title: "Secure Coding Practices", desc: "OWASP-aligned development preventing common vulnerabilities." },
  { icon: Lock, title: "Authentication & Access", desc: "Robust identity management, RBAC, and secure APIs." },
  { icon: Shield, title: "Data Protection", desc: "Encryption at rest and in transit, strict data privacy protocols." },
  { icon: Server, title: "Infrastructure Security", desc: "Secure cloud configuration, logging, monitoring, and backups." }
];

export function Security() {
  return (
    <section className="section-padding bg-secondaryBg border-y border-borderLight">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading 
              title="Security Built Into Development" 
              subtitle="We treat security as a foundational requirement, not an afterthought. Every line of code is written with data protection in mind."
              align="left"
              className="mb-8"
            />
            
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              {practices.map((item, idx) => (
                <div key={idx} className="bg-background border border-borderLight p-6 rounded-xl">
                  <item.icon className="w-6 h-6 text-emerald-500 mb-4" />
                  <h4 className="font-semibold text-textPrimary mb-2">{item.title}</h4>
                  <p className="text-sm text-textSecondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-card border border-borderLight rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full"></div>
                <h3 className="text-xl font-bold text-textPrimary mb-6 flex items-center gap-2">
                    <Shield className="text-emerald-500" /> Security Checklist
                </h3>
                <ul className="space-y-4">
                    {["Dependency management & scanning", "Regular security testing", "API security & rate limiting", "Comprehensive logging & monitoring", "Backup & disaster recovery planning"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-textSecondary">
                            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">✓</div>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/FAQ.tsx': `
import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const faqs = [
  {
    q: "What is custom software development?",
    a: "Custom software development is the process of designing, creating, and deploying software tailored specifically to your organization's unique requirements, processes, and user needs, as opposed to off-the-shelf software."
  },
  {
    q: "How much does custom software development cost?",
    a: "Costs vary significantly based on project scope, complexity, integrations, and technology stack. We provide detailed estimates after our initial discovery phase where we outline your specific requirements."
  },
  {
    q: "How long does a custom software project take?",
    a: "Project timelines depend on complexity. An MVP (Minimum Viable Product) might take 2-4 months, while a complex enterprise system could take 6-12 months. We use agile methodologies to deliver functional components iteratively."
  },
  {
    q: "Can you develop an MVP?",
    a: "Yes. We often recommend starting with an MVP to validate your core business concepts quickly and cost-effectively before investing in secondary features."
  },
  {
    q: "Can you modernize an existing application?",
    a: "Absolutely. We can migrate legacy systems to modern cloud architectures, rewrite outdated codebases, and improve performance and security without disrupting your ongoing operations."
  },
  {
    q: "Who owns the source code?",
    a: "You do. Upon project completion and final payment, we transfer full intellectual property rights and provide you with the complete source code."
  },
  {
    q: "Do you provide maintenance after deployment?",
    a: "Yes, we offer ongoing support and maintenance packages to ensure your software remains secure, up-to-date, and optimized for performance."
  }
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom max-w-4xl">
        <SectionHeading 
          title="Frequently Asked Questions" 
          subtitle="Common questions about our software development process and services."
        />
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-secondaryBg border border-borderLight rounded-xl overflow-hidden transition-all duration-200">
              <button 
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="font-semibold text-textPrimary pr-4">{faq.q}</span>
                <ChevronDown className={cn("w-5 h-5 text-textSecondary transition-transform duration-200", openIdx === idx ? "rotate-180 text-primary" : "")} />
              </button>
              <div className={cn("px-6 pb-6 text-textSecondary text-sm md:text-base transition-all duration-300", openIdx === idx ? "block" : "hidden")}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Brochure.tsx': `
import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { companyData } from '../../data/company';

export function Brochure() {
  return (
    <section className="py-20 bg-primary/10 border-y border-primary/20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-card border border-borderLight p-8 lg:p-12 rounded-2xl shadow-xl">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-textPrimary">Explore Our Software Development Capabilities</h2>
            <p className="text-textSecondary text-lg max-w-xl">
              Download our company brochure to learn more about our development services, technology capabilities, engagement models and delivery process.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Button size="lg" href={companyData.brochurePath} download className="relative text-lg">
                <Download className="mr-2 w-5 h-5" />
                Download Company Brochure
              </Button>
            </div>
            <p className="text-xs text-textSecondary text-center mt-3 flex items-center justify-center gap-1">
              <FileText className="w-3 h-3" /> PDF Format
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/ProjectInquiry.tsx': `
import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

export function ProjectInquiry() {
  const [status, setStatus] = useState<'idle'|'submitting'|'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    // TODO: Connect this to actual backend API
    setTimeout(() => {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="container-custom max-w-5xl relative z-10">
        <div className="bg-secondaryBg border border-borderLight rounded-2xl shadow-2xl p-8 lg:p-12">
          <SectionHeading 
            title="Have a Software Idea? Let's Build It." 
            subtitle="Tell us about your project requirements and we'll get back to you with a free consultation and proposal."
            align="left"
            className="mb-10"
          />
          
          {status === 'success' ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
              <p>Thank you for reaching out. Our technical team will review your inquiry and contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-textSecondary">Full Name</label>
                  <input required type="text" id="name" className="w-full bg-card border border-borderLight rounded-md px-4 py-3 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-textSecondary">Business Email</label>
                  <input required type="email" id="email" className="w-full bg-card border border-borderLight rounded-md px-4 py-3 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-textSecondary">Phone Number</label>
                  <input type="tel" id="phone" className="w-full bg-card border border-borderLight rounded-md px-4 py-3 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-textSecondary">Company Name</label>
                  <input type="text" id="company" className="w-full bg-card border border-borderLight rounded-md px-4 py-3 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Acme Corp" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium text-textSecondary">Project Type</label>
                  <select id="type" className="w-full bg-card border border-borderLight rounded-md px-4 py-3 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                    <option>Web Application</option>
                    <option>Mobile Application</option>
                    <option>SaaS Platform</option>
                    <option>Enterprise Software</option>
                    <option>AI Solution</option>
                    <option>Cloud Solution</option>
                    <option>Software Modernization</option>
                    <option>API / Integration</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium text-textSecondary">Estimated Budget</label>
                  <select id="budget" className="w-full bg-card border border-borderLight rounded-md px-4 py-3 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                    <option>Not Sure</option>
                    <option>$10k - $25k</option>
                    <option>$25k - $50k</option>
                    <option>$50k - $100k</option>
                    <option>$100k+</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-textSecondary">Project Description</label>
                <textarea required id="description" rows={4} className="w-full bg-card border border-borderLight rounded-md px-4 py-3 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y" placeholder="Briefly describe your goals, requirements, and timeline..."></textarea>
              </div>
              
              <Button type="submit" size="lg" className="w-full md:w-auto" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/FinalCTA.tsx': `
import React from 'react';
import { Button } from '../ui/Button';

export function FinalCTA() {
  return (
    <section className="py-24 bg-card border-y border-borderLight relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5"></div>
      <div className="container-custom relative z-10 max-w-4xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-textPrimary mb-6">
          Your Business Is Unique. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Your Software Should Be Too.</span>
        </h2>
        <p className="text-xl text-textSecondary mb-10 max-w-2xl mx-auto">
          Let's design a software solution built around your goals, workflows and customers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" href="#contact">Start Your Project</Button>
          <Button variant="outline" size="lg" href="#contact">Schedule a Consultation</Button>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Contact.tsx': `
import React from 'react';
import { companyData } from '../../data/company';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-secondaryBg rounded-xl border border-borderLight">
                <Mail className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-textPrimary mb-1">Email</h4>
                <a href={\`mailto:\${companyData.contact.email}\`} className="text-sm text-textSecondary hover:text-primary transition-colors">{companyData.contact.email}</a>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-secondaryBg rounded-xl border border-borderLight">
                <Phone className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-textPrimary mb-1">Phone</h4>
                <a href={\`tel:\${companyData.contact.phone}\`} className="text-sm text-textSecondary hover:text-primary transition-colors">{companyData.contact.phone}</a>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-secondaryBg rounded-xl border border-borderLight">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-textPrimary mb-1">Office</h4>
                <span className="text-sm text-textSecondary">{companyData.contact.address}</span>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-secondaryBg rounded-xl border border-borderLight">
                <Clock className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-textPrimary mb-1">Hours</h4>
                <span className="text-sm text-textSecondary">{companyData.contact.businessHours}</span>
            </div>
        </div>
      </div>
    </section>
  );
}
`,
  'README.md': `
# NexusFlow Engineering - Corporate Website

Professional corporate website for a custom software development company.

## Technology Stack
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Lucide React (Icons)

## Installation & Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

## Configuration & Customization

### 1. Company Information
All company details (name, email, phone, social links, etc.) are centralized in:
\`src/data/company.ts\`

Modify this single file to update branding across the entire application.

### 2. Colors & Branding
Theme colors are configured in \`tailwind.config.js\`. Update the \`theme.extend.colors\` object to match your brand palette.

### 3. Adding the Brochure
Place your company PDF brochure at:
\`public/brochures/company-brochure.pdf\`
The download buttons across the site will automatically link to this file.

### 4. Connecting the Inquiry Form to a Backend
Open \`src/components/sections/ProjectInquiry.tsx\`. Locate the \`handleSubmit\` function. Replace the simulated \`setTimeout\` with your actual API fetch request (e.g., to a serverless function, Formspree, or your custom backend).

## Folder Structure
- \`/src/components/layout\`: Navbar, Footer
- \`/src/components/sections\`: Individual page sections (Hero, About, Services, etc.)
- \`/src/components/ui\`: Reusable UI elements (Button, SectionHeading)
- \`/src/data\`: Centralized configuration
- \`/src/utils\`: Helper functions
- \`/public/brochures\`: Static assets like PDFs
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
console.log('Files generated successfully.');
