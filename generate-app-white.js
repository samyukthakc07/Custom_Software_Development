import fs from 'fs';
import path from 'path';

const files = {
  'src/index.css': `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', sans-serif;
  --color-background: #FFFFFF;
  --color-secondaryBg: #F8FAFC;
  --color-altBg: #F1F5F9;
  --color-textPrimary: #0F172A;
  --color-textSecondary: #475569;
  --color-textMuted: #64748B;
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
`,
  'src/components/ui/Button.tsx': `
import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  download?: string | boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, download, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primaryHover shadow-sm',
      secondary: 'bg-secondaryBg text-textPrimary hover:bg-altBg border border-borderLight shadow-sm',
      outline: 'border border-borderLight hover:bg-secondaryBg text-textPrimary',
      ghost: 'hover:bg-secondaryBg hover:text-textPrimary text-textSecondary',
      white: 'bg-white text-primary hover:bg-gray-50 shadow-sm border border-borderLight',
    };
    
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 py-2 text-sm',
      lg: 'h-12 px-8 text-base',
    };

    const compClass = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <a href={href} download={download} className={compClass} {...(props as any)}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={compClass} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
`,
  'src/components/ui/SectionHeading.tsx': `
import React from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", align === 'center' ? 'text-center mx-auto' : 'text-left', className)}>
      {eyebrow && (
        <div className="text-primary font-semibold tracking-wider text-sm uppercase mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-textPrimary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-textSecondary max-w-2xl mx-auto leading-relaxed">
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
import { companyData, BROCHURE_URL } from '../../data/company';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Industries', href: '#industries' },
    { name: 'Process', href: '#process' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header className={\`fixed top-0 w-full z-50 transition-all duration-200 \${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-borderLight py-3' : 'bg-white border-b border-borderLight py-4'}\`}>
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="bg-primary text-white p-2 rounded-lg">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-textPrimary">{companyData.companyName}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 border-l border-borderLight pl-6 xl:pl-8">
            <a href={BROCHURE_URL} download="Hackers-Infotech-Company-Brochure.pdf" className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">
              Brochure
            </a>
            <a href="#contact" className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">
              Contact Us
            </a>
            <Button size="sm" href="#contact">
              Start a Project
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-textPrimary hover:text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-borderLight shadow-lg py-4 px-6 flex flex-col gap-4">
          <ul className="flex flex-col gap-3">
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
          <div className="flex flex-col gap-3 pt-4 border-t border-borderLight">
            <a 
              href={BROCHURE_URL} 
              download="Hackers-Infotech-Company-Brochure.pdf" 
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
      )}
    </header>
  );
}
`,
  'src/components/layout/Footer.tsx': `
import React from 'react';
import { Code2, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { companyData, BROCHURE_URL } from '../../data/company';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footerBg pt-20 pb-10 text-slate-300">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white">{companyData.companyName}</span>
            </a>
            <p className="text-slate-400 mb-6 max-w-sm text-sm leading-relaxed">
              {companyData.description}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6">Services</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">Custom Software</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Mobile Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Enterprise Software</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI Development</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Process</a></li>
              <li><a href="#technologies" className="hover:text-white transition-colors">Technologies</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
            
            <h4 className="font-semibold text-white mt-8 mb-4">Resources</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li><a href={BROCHURE_URL} download="Hackers-Infotech-Company-Brochure.pdf" className="hover:text-white transition-colors">Company Brochure</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <a href={\`mailto:\${companyData.contact.email}\`} className="hover:text-white transition-colors">{companyData.contact.email}</a>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <a href={\`tel:\${companyData.contact.phone}\`} className="hover:text-white transition-colors">{companyData.contact.phone}</a>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>{companyData.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {currentYear} {companyData.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
`,
  'src/components/sections/Hero.tsx': `
import React from 'react';
import { ArrowRight, Monitor, Smartphone, Cloud, Brain, Database, ArrowRightCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { BROCHURE_URL } from '../../data/company';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primaryLight rounded-full blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/4"></div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div className="text-primary font-semibold tracking-wider text-sm uppercase mb-6">
              CUSTOM SOFTWARE DEVELOPMENT
            </div>
            
            <h1 className="text-4xl md:text-[44px] lg:text-[56px] font-bold tracking-tight mb-6 leading-[1.1] text-textPrimary">
              Software Built Around <br className="hidden sm:block" />
              <span className="text-primary">Your Business.</span>
            </h1>
            
            <p className="text-base md:text-lg text-textSecondary mb-8 leading-relaxed max-w-xl">
              We design, develop and scale custom software solutions that solve real business challenges — from web and mobile applications to enterprise platforms, cloud systems and AI-powered products.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" href="#contact">
                Start Your Project
              </Button>
              <Button variant="outline" size="lg" href={BROCHURE_URL} download="Hackers-Infotech-Company-Brochure.pdf">
                Download Brochure
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mb-12">
              <span className="text-sm text-textSecondary">Have a project in mind?</span>
              <a href="#contact" className="text-sm font-semibold text-primary flex items-center hover:text-primaryHover transition-colors">
                Talk to Our Experts <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-borderLight text-sm font-medium text-textMuted">
              <span>Web Applications</span>
              <span className="w-1 h-1 rounded-full bg-borderLight"></span>
              <span>Mobile Apps</span>
              <span className="w-1 h-1 rounded-full bg-borderLight"></span>
              <span>Enterprise Software</span>
              <span className="w-1 h-1 rounded-full bg-borderLight"></span>
              <span>AI Solutions</span>
              <span className="w-1 h-1 rounded-full bg-borderLight"></span>
              <span>Cloud Platforms</span>
            </div>
          </div>
          
          <div className="relative hidden lg:block h-[500px]">
            {/* Elegant Software Engineering Visual */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white to-primaryLight/50 rounded-2xl border border-borderLight/50 p-8 flex flex-col justify-between">
               
               {/* Process Flow */}
               <div className="flex flex-col gap-6 items-center w-full max-w-xs mx-auto mt-4">
                  <div className="bg-white border border-borderLight shadow-sm px-6 py-3 rounded-lg w-full text-center text-sm font-semibold text-textPrimary relative z-10">
                    Business Requirements
                  </div>
                  <ArrowRightCircle className="w-6 h-6 text-primary rotate-90" />
                  <div className="bg-white border border-borderLight shadow-sm px-6 py-3 rounded-lg w-full text-center text-sm font-semibold text-textPrimary relative z-10">
                    Product Design
                  </div>
                  <ArrowRightCircle className="w-6 h-6 text-primary rotate-90" />
                  <div className="bg-primary text-white shadow-md shadow-primary/20 px-6 py-4 rounded-lg w-full text-center text-base font-bold relative z-10 scale-105">
                    Engineering
                  </div>
                  <ArrowRightCircle className="w-6 h-6 text-primary rotate-90" />
                  <div className="bg-white border border-borderLight shadow-sm px-6 py-3 rounded-lg w-full text-center text-sm font-semibold text-textPrimary relative z-10">
                    Business Solution
                  </div>
               </div>

               {/* Floating elements */}
               <div className="absolute top-20 right-8 bg-white border border-borderLight shadow-sm p-3 rounded-xl flex items-center gap-3">
                 <div className="bg-primaryLight text-primary p-2 rounded-lg"><Monitor className="w-4 h-4" /></div>
                 <span className="text-xs font-semibold">Web</span>
               </div>
               
               <div className="absolute top-40 left-8 bg-white border border-borderLight shadow-sm p-3 rounded-xl flex items-center gap-3">
                 <div className="bg-primaryLight text-primary p-2 rounded-lg"><Smartphone className="w-4 h-4" /></div>
                 <span className="text-xs font-semibold">Mobile</span>
               </div>

               <div className="absolute bottom-40 right-12 bg-white border border-borderLight shadow-sm p-3 rounded-xl flex items-center gap-3">
                 <div className="bg-primaryLight text-primary p-2 rounded-lg"><Cloud className="w-4 h-4" /></div>
                 <span className="text-xs font-semibold">Cloud</span>
               </div>

               <div className="absolute bottom-20 left-12 bg-white border border-borderLight shadow-sm p-3 rounded-xl flex items-center gap-3">
                 <div className="bg-primaryLight text-primary p-2 rounded-lg"><Brain className="w-4 h-4" /></div>
                 <span className="text-xs font-semibold">AI/ML</span>
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
import { Code, Server, Lock, RefreshCw, Cloud, HeadphonesIcon } from 'lucide-react';

export function TrustBar() {
  const capabilities = [
    { icon: Code, label: "Custom Development" },
    { icon: Server, label: "Scalable Architecture" },
    { icon: Lock, label: "Secure Engineering" },
    { icon: RefreshCw, label: "Agile Delivery" },
    { icon: Cloud, label: "Cloud Ready" },
    { icon: HeadphonesIcon, label: "Long-Term Support" },
  ];

  return (
    <div className="border-y border-borderLight bg-altBg py-10">
      <div className="container-custom">
        <h3 className="text-xs font-bold tracking-widest text-textMuted uppercase text-center mb-8">
          Engineering Software For Modern Businesses
        </h3>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
          {capabilities.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-textSecondary" />
              <span className="font-semibold text-sm text-textSecondary">{item.label}</span>
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
  { icon: Target, title: 'Business Workflows', desc: 'Designed to match your operational reality.' },
  { icon: TrendingUp, title: 'Growth Strategy', desc: 'Architected to scale with your business.' },
  { icon: Lock, title: 'Employees & Customers', desc: 'Interfaces built for your actual end-users.' },
  { icon: RefreshCw, title: 'System Integrations', desc: 'Connected seamlessly to your existing tools.' }
];

export function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6 leading-tight">
              Technology Should Fit Your Business — <br className="hidden lg:block"/>
              <span className="text-textMuted">Not the Other Way Around.</span>
            </h2>
            <p className="text-lg text-textSecondary mb-6 leading-relaxed">
              Off-the-shelf software often forces businesses to adapt their processes around the software. We believe your technology should adapt to you.
            </p>
            <p className="text-lg text-textSecondary mb-10 leading-relaxed">
              We build custom software around your operational requirements, data, and growth strategy to deliver unparalleled efficiency.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-primaryLight p-2 rounded-lg text-primary mt-1 shrink-0">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-textPrimary text-sm">{feat.title}</h4>
                    <p className="text-sm text-textSecondary mt-1">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="aspect-square max-w-md ml-auto bg-altBg rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-primaryLight/30"></div>
                <div className="relative z-10 h-full flex flex-col justify-center space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-borderLight flex items-center gap-4">
                        <div className="w-12 h-12 bg-primaryLight rounded-full flex items-center justify-center text-primary font-bold">1</div>
                        <div>
                            <div className="font-semibold text-textPrimary">Analyze Workflows</div>
                            <div className="text-xs text-textSecondary">Understand current bottlenecks</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-borderLight flex items-center gap-4 ml-8 relative z-20">
                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <div>
                            <div className="font-semibold text-textPrimary">Engineer Solution</div>
                            <div className="text-xs text-textSecondary">Develop custom architecture</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-borderLight flex items-center gap-4">
                        <div className="w-12 h-12 bg-primaryLight rounded-full flex items-center justify-center text-primary font-bold">3</div>
                        <div>
                            <div className="font-semibold text-textPrimary">Deploy & Scale</div>
                            <div className="text-xs text-textSecondary">Grow without limitations</div>
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
import { Monitor, Smartphone, Building2, Cloud, Brain, Network, RotateCcw, Shield, PenTool, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const services = [
  { icon: Monitor, title: "Custom Web Development", desc: "Enterprise portals, SaaS platforms, and robust workflow applications." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native iOS/Android and cross-platform mobile applications." },
  { icon: Building2, title: "Enterprise Software", desc: "Business-critical applications designed for complex organizations." },
  { icon: Cloud, title: "SaaS Product Development", desc: "From MVP development to scalable, multi-tenant SaaS platforms." },
  { icon: Brain, title: "AI & Generative AI", desc: "AI-enabled applications, intelligent automation, and LLM integrations." },
  { icon: Network, title: "Cloud Applications", desc: "Cloud-native systems designed for scalability and high availability." },
  { icon: RotateCcw, title: "API & System Integration", desc: "Seamlessly connect disparate business systems and third-party platforms." },
  { icon: PenTool, title: "Software Modernization", desc: "Modernize legacy applications to secure, modern architectures." },
  { icon: Shield, title: "Cybersecurity Solutions", desc: "Secure application architecture and security-focused development." }
];

export function Services() {
  return (
    <section id="services" className="section-padding bg-secondaryBg">
      <div className="container-custom">
        <SectionHeading 
          eyebrow="What We Build"
          title="Custom Software Development Services" 
          subtitle="We handle the complete software lifecycle — from initial architecture to final deployment and ongoing evolution."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white border border-borderLight rounded-xl p-6 hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 bg-altBg rounded-lg flex items-center justify-center mb-5 group-hover:bg-primaryLight transition-colors">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-textPrimary mb-2">{service.title}</h3>
              <p className="text-sm text-textSecondary leading-relaxed mb-6">
                {service.desc}
              </p>
              <a href="#contact" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primaryHover transition-colors mt-auto">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
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
import { Check } from 'lucide-react';

const solutions = [
  "CRM Systems", "ERP Systems", "Customer Portals", 
  "Employee Portals", "Booking Platforms", "E-Commerce", 
  "Inventory Systems", "Asset Management", "Workflow Automation", 
  "Analytics Platforms", "AI Assistants", "Document Management", 
  "Security Platforms", "Marketplace Platforms"
];

export function Solutions() {
  return (
    <section id="solutions" className="section-padding bg-white border-y border-borderLight">
      <div className="container-custom">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
                <SectionHeading 
                    title="Software Solutions Built for Real Operations" 
                    subtitle="We build specialized platforms that solve specific operational needs."
                    align="left"
                    className="mb-0"
                />
            </div>
            <div className="lg:col-span-2">
                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {solutions.map((sol, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-textPrimary font-medium text-sm md:text-base">{sol}</span>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Industries.tsx': `
import React from 'react';
import { HeartPulse, Landmark, ShoppingBag, Factory, GraduationCap, Truck, Briefcase, Home, ShieldAlert, Rocket } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const industries = [
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Landmark, name: "FinTech" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: Factory, name: "Manufacturing" },
  { icon: GraduationCap, name: "Education" },
  { icon: Truck, name: "Logistics" },
  { icon: Briefcase, name: "Professional Services" },
  { icon: Home, name: "Real Estate" },
  { icon: ShieldAlert, name: "Cybersecurity" },
  { icon: Rocket, name: "Startups" },
];

export function Industries() {
  return (
    <section id="industries" className="section-padding bg-altBg">
      <div className="container-custom">
        <SectionHeading 
          title="Technology Expertise Across Industries" 
          subtitle="Domain knowledge translated into secure, compliant, and high-performance technical solutions."
        />
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
          {industries.map((ind, idx) => (
            <div key={idx} className="bg-white border border-borderLight rounded-xl p-6 flex flex-col items-center text-center">
              <ind.icon className="w-6 h-6 text-textMuted mb-3" />
              <h4 className="font-semibold text-sm text-textPrimary">{ind.name}</h4>
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

const steps = [
  { num: '01', title: 'Discover', desc: 'Business goals & requirements' },
  { num: '02', title: 'Design', desc: 'UX & system architecture' },
  { num: '03', title: 'Develop', desc: 'Agile engineering' },
  { num: '04', title: 'Validate', desc: 'Testing & security' },
  { num: '05', title: 'Deploy', desc: 'Cloud & production' },
  { num: '06', title: 'Evolve', desc: 'Support & optimization' }
];

export function Process() {
  return (
    <section id="process" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading 
          title="From Business Idea to Production Software" 
          subtitle="A transparent, structured engineering process designed to mitigate risk and deliver reliable software."
        />
        
        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:flex items-start justify-between relative mt-16 max-w-6xl mx-auto">
           <div className="absolute top-6 left-0 right-0 h-[2px] bg-borderLight -z-10"></div>
           {steps.map((step, idx) => (
             <div key={idx} className="flex flex-col items-center text-center w-40">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary font-bold flex items-center justify-center mb-4 text-sm">
                  {step.num}
                </div>
                <h4 className="font-bold text-textPrimary mb-2">{step.title}</h4>
                <p className="text-xs text-textSecondary">{step.desc}</p>
             </div>
           ))}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden relative mt-12 max-w-sm mx-auto space-y-8">
           <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-borderLight -z-10"></div>
           {steps.map((step, idx) => (
             <div key={idx} className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h4 className="font-bold text-textPrimary mb-1">{step.title}</h4>
                  <p className="text-sm text-textSecondary">{step.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/WhyChooseUs.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

const reasons = [
  { num: "01", title: "Business-First Thinking", desc: "We understand the business problem before writing a single line of code." },
  { num: "02", title: "Engineering for Scale", desc: "Applications are architected for future users, features, and integrations." },
  { num: "03", title: "Transparent Delivery", desc: "Clear communication, milestones, and total development visibility." },
  { num: "04", title: "Long-Term Partnership", desc: "We support and evolve the software well beyond its first production release." }
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-secondaryBg">
      <div className="container-custom max-w-5xl">
        <SectionHeading 
          title="More Than Development. A Technology Partner." 
          subtitle="We combine engineering excellence with business acumen to deliver software that drives real results."
        />
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mt-12">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="text-3xl font-bold text-borderLight shrink-0">
                {reason.num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-textPrimary mb-3">{reason.title}</h3>
                <p className="text-textSecondary leading-relaxed">{reason.desc}</p>
              </div>
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
  { category: "Frontend", items: ["React", "Next.js", "TypeScript"] },
  { category: "Backend", items: ["Python", "Django", "Node.js", "FastAPI"] },
  { category: "Mobile", items: ["Flutter", "React Native"] },
  { category: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { category: "Cloud", items: ["AWS", "Azure", "Docker", "CI/CD"] },
  { category: "AI", items: ["Generative AI", "LLMs", "RAG", "AI Automation"] },
  { category: "Security", items: ["OWASP", "API Security", "Secure Architecture"] }
];

export function Technologies() {
  return (
    <section id="technologies" className="section-padding bg-white">
      <div className="container-custom max-w-6xl">
        <SectionHeading 
          title="Modern Technology. Practical Engineering." 
          subtitle="We leverage proven, enterprise-grade technologies to build secure and scalable software."
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStacks.map((stack, idx) => (
            <div key={idx} className="border-t-2 border-borderLight pt-4">
              <h3 className="text-sm font-bold text-textPrimary mb-4 uppercase tracking-wider">{stack.category}</h3>
              <ul className="space-y-3">
                {stack.items.map(item => (
                  <li key={item} className="text-textSecondary text-sm font-medium">
                    {item}
                  </li>
                ))}
              </ul>
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
import { Button } from '../ui/Button';

const models = [
  {
    title: "Fixed Scope Project",
    desc: "Suitable for projects with clearly defined requirements, timelines, and deliverables.",
  },
  {
    title: "Dedicated Development Team",
    desc: "A dedicated engineering team working with you continuously as an extension of your company.",
  },
  {
    title: "MVP / Product Development",
    desc: "Rapidly transform a validated idea into a functional product to test the market quickly.",
  }
];

export function EngagementModels() {
  return (
    <section className="section-padding bg-altBg border-y border-borderLight">
      <div className="container-custom">
        <SectionHeading 
          title="Choose How You Want to Build" 
          subtitle="Flexible engagement models tailored to your project requirements and organizational structure."
        />
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {models.map((model, idx) => (
            <div key={idx} className="bg-white border border-borderLight rounded-xl p-8 flex flex-col h-full shadow-sm">
              <h3 className="text-xl font-bold text-textPrimary mb-3">{model.title}</h3>
              <p className="text-textSecondary mb-8 flex-grow text-sm leading-relaxed">{model.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
            <Button size="lg" href="#contact">Discuss Your Requirements</Button>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Security.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Shield, CheckCircle2 } from 'lucide-react';

const practices = [
  "Secure coding", "Authentication", "Authorization", "API security",
  "Data protection", "OWASP practices", "Dependency security", "Logging", "Security testing"
];

export function Security() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom max-w-5xl">
        <div className="bg-white border border-borderLight rounded-2xl p-8 lg:p-12 shadow-sm flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="w-12 h-12 bg-primaryLight rounded-xl flex items-center justify-center text-primary mb-6">
                <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-textPrimary mb-4">Security Is Part of the Architecture</h2>
            <p className="text-textSecondary leading-relaxed">
              We treat security as a foundational requirement, not an afterthought. Every layer of our software is engineered to protect your business data and ensure robust access controls.
            </p>
          </div>
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {practices.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span className="text-sm font-medium text-textPrimary">{item}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Brochure.tsx': `
import React from 'react';
import { Download, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { BROCHURE_URL } from '../../data/company';

export function Brochure() {
  return (
    <section className="section-padding bg-white border-y border-borderLight">
      <div className="container-custom max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-primary font-semibold tracking-wider text-sm uppercase">COMPANY BROCHURE</div>
            <h2 className="text-3xl md:text-4xl font-bold text-textPrimary leading-tight">Explore Our Software Development Capabilities</h2>
            <p className="text-textSecondary text-lg leading-relaxed">
              Learn more about our services, technology expertise, development approach, and how we help businesses turn ideas into reliable software products.
            </p>
            <ul className="space-y-3 mb-8">
                {['Services & capabilities', 'Development process', 'Technology expertise', 'Engagement models'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-textSecondary font-medium">
                        <Check className="w-5 h-5 text-primary shrink-0" /> {item}
                    </li>
                ))}
            </ul>
            <Button size="lg" href={BROCHURE_URL} download="Hackers-Infotech-Company-Brochure.pdf">
              <Download className="mr-2 w-5 h-5" /> Download Brochure
            </Button>
          </div>
          <div className="hidden md:flex justify-end">
            <div className="w-64 h-80 bg-white border border-borderLight shadow-2xl rounded-lg flex flex-col p-6 relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary rounded-t-lg"></div>
                <div className="font-bold text-xl text-textPrimary mb-2">Hackers Infotech</div>
                <div className="text-xs text-textMuted mb-8 uppercase tracking-widest">Company Overview</div>
                <div className="w-full h-32 bg-altBg rounded mb-4 flex items-center justify-center text-borderLight">
                    <div className="w-16 h-16 border-4 border-borderLight rounded-full"></div>
                </div>
                <div className="w-3/4 h-2 bg-borderLight rounded mt-auto"></div>
                <div className="w-1/2 h-2 bg-borderLight rounded mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/ProjectInquiry.tsx': `
import React, { useState } from 'react';
import { Button } from '../ui/Button';

export function ProjectInquiry() {
  const [status, setStatus] = useState<'idle'|'submitting'|'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    // TODO: Wire this to a real backend endpoint.
    setTimeout(() => {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding bg-altBg">
      <div className="container-custom max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6">Let's Discuss Your Project</h2>
            <p className="text-lg text-textSecondary mb-10 leading-relaxed">
              Tell us what you're trying to build. We'll help you define the right technical approach.
            </p>
            
            <div className="space-y-6">
                <h4 className="font-bold text-textPrimary text-sm uppercase tracking-wider mb-2">What happens next?</h4>
                <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primaryLight text-primary flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <p className="text-textSecondary pt-1">Tell us about your requirement</p>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primaryLight text-primary flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <p className="text-textSecondary pt-1">Our team reviews the project</p>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primaryLight text-primary flex items-center justify-center font-bold text-sm shrink-0">3</div>
                    <p className="text-textSecondary pt-1">We schedule a discovery discussion</p>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primaryLight text-primary flex items-center justify-center font-bold text-sm shrink-0">4</div>
                    <p className="text-textSecondary pt-1">You receive the recommended technical approach</p>
                </div>
            </div>
          </div>
          
          <div className="bg-white border border-borderLight rounded-2xl shadow-sm p-8">
            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">Message Sent Successfully</h3>
                <p>Thank you for reaching out. Our technical team will review your inquiry and contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-textPrimary">Name *</label>
                    <input required type="text" id="name" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-textPrimary">Business Email *</label>
                    <input required type="email" id="email" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-textPrimary">Phone</label>
                    <input type="tel" id="phone" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-sm font-semibold text-textPrimary">Company</label>
                    <input type="text" id="company" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="type" className="text-sm font-semibold text-textPrimary">Project Type *</label>
                    <select required id="type" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                      <option value="">Select...</option>
                      <option>Web Application</option>
                      <option>Mobile Application</option>
                      <option>Enterprise Software</option>
                      <option>AI Solution</option>
                      <option>Cloud / Infrastructure</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="budget" className="text-sm font-semibold text-textPrimary">Budget Range</label>
                    <select id="budget" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                      <option value="">Select...</option>
                      <option>Under $10k</option>
                      <option>$10k - $25k</option>
                      <option>$25k - $50k</option>
                      <option>$50k+</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="description" className="text-sm font-semibold text-textPrimary">Project Description *</label>
                  <textarea required id="description" rows={4} className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y"></textarea>
                </div>
                
                <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending...' : 'Send Project Inquiry'}
                </Button>
              </form>
            )}
          </div>
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
    <section className="py-24 bg-primary text-white text-center">
      <div className="container-custom max-w-4xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
          Have a Software Project in Mind?
        </h2>
        <p className="text-lg md:text-xl text-primaryLight mb-10 max-w-2xl mx-auto leading-relaxed">
          Tell us what you're trying to build. We'll help you define the right technical approach.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="white" size="lg" href="#contact">Start Your Project</Button>
          <Button className="border border-white hover:bg-white/10 text-white shadow-none" size="lg" href="#contact">Talk to Our Team</Button>
        </div>
      </div>
    </section>
  );
}
`,
  'src/data/company.ts': `
export const companyData = {
  companyName: "Hackers Infotech",
  shortName: "Hackers Infotech",
  tagline: "Software Built Around Your Business",
  description: "We design, develop and scale custom software solutions that solve real business challenges — from web and mobile applications to enterprise platforms, cloud systems and AI-powered products.",
  contact: {
    email: "hello@hackersinfotech.com",
    phone: "+1 (555) 123-4567",
    address: "100 Tech Hub Blvd, Suite 400, San Francisco, CA 94105",
  }
};

export const BROCHURE_URL = "/brochures/company-brochure.pdf";
`,
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
import { Security } from './components/sections/Security';
import { Brochure } from './components/sections/Brochure';
import { ProjectInquiry } from './components/sections/ProjectInquiry';
import { FinalCTA } from './components/sections/FinalCTA';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Solutions />
        <Industries />
        <Process />
        <Technologies />
        <WhyChooseUs />
        <EngagementModels />
        <Security />
        <Brochure />
        <FinalCTA />
        <ProjectInquiry />
      </main>
      <Footer />
    </div>
  );
}

export default App;
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

// Generate valid minimal PDF
const pdfBuffer = Buffer.from(
  '%PDF-1.4\\n1 0 obj\\n<< /Type /Catalog /Pages 2 0 R >>\\nendobj\\n2 0 obj\\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\\nendobj\\n3 0 obj\\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents 4 0 R >>\\nendobj\\n4 0 obj\\n<< /Length 58 >>\\nstream\\nBT\\n/F1 24 Tf\\n100 700 Td\\n(Hackers Infotech Brochure) Tj\\nET\\nendstream\\nendobj\\nxref\\n0 5\\n0000000000 65535 f \\n0000000009 00000 n \\n0000000058 00000 n \\n0000000115 00000 n \\n0000000253 00000 n \\ntrailer\\n<< /Size 5 /Root 1 0 R >>\\nstartxref\\n360\\n%%EOF',
  'utf-8'
);
const pdfDir = path.join(process.cwd(), 'public/brochures');
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}
fs.writeFileSync(path.join(pdfDir, 'company-brochure.pdf'), pdfBuffer);

console.log('Files generated successfully.');
