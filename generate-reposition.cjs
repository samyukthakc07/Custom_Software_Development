const fs = require('fs');
const path = require('path');

const files = {
  'src/App.tsx': `
import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Progression } from './components/sections/Progression';
import { Vision } from './components/sections/Vision';
import { TargetAudience } from './components/sections/TargetAudience';
import { Services } from './components/sections/Services';
import { Affordability } from './components/sections/Affordability';
import { Pricing } from './components/sections/Pricing';
import { RequirementSales } from './components/sections/RequirementSales';
import { Process } from './components/sections/Process';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { Brochure } from './components/sections/Brochure';
import { FinalCTA } from './components/sections/FinalCTA';
import { ProjectInquiry } from './components/sections/ProjectInquiry';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Progression />
        <Vision />
        <TargetAudience />
        <Services />
        <Affordability />
        <Pricing />
        <RequirementSales />
        <Process />
        <WhyChooseUs />
        <Brochure />
        <FinalCTA />
        <ProjectInquiry />
      </main>
      <Footer />
    </div>
  );
}

export default App;
`,
  'src/components/sections/Hero.tsx': `
import React from 'react';
import { Check, ArrowDown, ArrowDownRight, ArrowDownLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { BROCHURE_URL } from '../../data/company';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-[#EFF6FF] rounded-full blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/4"></div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div className="text-primary font-semibold tracking-wider text-sm uppercase mb-6">
              WEBSITES • APPLICATIONS • CUSTOM SOFTWARE
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-textPrimary">
              Your Business.<br/>
              Your Idea.<br/>
              <span className="text-primary">Built Your Way.</span>
            </h1>
            
            <p className="text-lg text-textSecondary mb-4 leading-relaxed max-w-xl">
              From professional business websites to fully customized software, Hackers Infotech builds digital solutions around your requirements, goals and budget.
            </p>
            <p className="text-lg text-textSecondary mb-8 leading-relaxed max-w-xl font-medium text-textPrimary">
              Whether you're a small business, startup, growing company or enterprise — we'll help you build the solution you actually need.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
              <Button size="lg" href="#contact">
                Tell Us What You Need
              </Button>
              <Button variant="outline" size="lg" href="#services">
                Explore Our Services
              </Button>
              <Button variant="ghost" size="lg" href={BROCHURE_URL} download="Hackers-Infotech-Custom-Software-Brochure.pdf">
                Download Brochure
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-6 border-t border-borderLight text-sm font-medium text-textPrimary">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Built for Your Requirements</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Flexible Scope</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Affordable Development</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Support as You Grow</div>
            </div>
          </div>
          
          <div className="relative hidden lg:flex justify-center h-full items-center">
            <div className="bg-[#F8FAFC] border border-borderLight rounded-2xl p-8 lg:p-12 w-full max-w-md flex flex-col items-center shadow-sm relative z-10">
                <div className="bg-[#0F172A] text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase shadow-md relative z-20">
                    Your Idea
                </div>
                
                <div className="w-px h-8 bg-borderLight"></div>
                <ArrowDown className="w-4 h-4 text-textSecondary -mt-1 z-10 bg-[#F8FAFC]" />
                
                <div className="bg-white border border-borderLight text-textPrimary px-8 py-3 rounded-full font-bold text-sm shadow-sm mt-3 relative z-20">
                    What Do You Need?
                </div>
                
                <div className="flex w-full justify-center relative h-16 mt-2">
                    <div className="absolute top-0 w-3/4 h-8 border-t border-l border-r border-borderLight rounded-t-xl z-0"></div>
                    <ArrowDownLeft className="w-4 h-4 text-textSecondary absolute -bottom-1 left-[10%] bg-[#F8FAFC]" />
                    <ArrowDown className="w-4 h-4 text-textSecondary absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#F8FAFC]" />
                    <ArrowDownRight className="w-4 h-4 text-textSecondary absolute -bottom-1 right-[10%] bg-[#F8FAFC]" />
                </div>
                
                <div className="flex justify-between w-full gap-2 relative z-20">
                    <div className="bg-white border border-borderLight text-textPrimary px-4 py-2 rounded-lg font-semibold text-xs shadow-sm flex-1 text-center">
                        WEBSITE
                    </div>
                    <div className="bg-white border border-borderLight text-textPrimary px-4 py-2 rounded-lg font-semibold text-xs shadow-sm flex-1 text-center">
                        APPLICATION
                    </div>
                    <div className="bg-white border border-borderLight text-textPrimary px-4 py-2 rounded-lg font-semibold text-xs shadow-sm flex-1 text-center">
                        SOFTWARE
                    </div>
                </div>

                <div className="flex w-full justify-center relative h-16 mt-2">
                    <div className="absolute bottom-0 w-3/4 h-8 border-b border-l border-r border-borderLight rounded-b-xl z-0"></div>
                    <ArrowDown className="w-4 h-4 text-textSecondary absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#F8FAFC]" />
                </div>

                <ArrowDown className="w-4 h-4 text-primary mt-2" />

                <div className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-primary/20 mt-2 w-full text-center">
                    BUILT FOR YOU
                </div>
            </div>
            {/* Background decorative dots */}
            <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:16px_16px] opacity-50 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Progression.tsx': `
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const steps = [
  { num: "01", title: "BUSINESS WEBSITE", desc: "For businesses that need a professional digital presence." },
  { num: "02", title: "CUSTOM WEBSITE", desc: "For businesses requiring unique pages, functionality and workflows." },
  { num: "03", title: "WEB APPLICATION", desc: "For interactive business processes and customer experiences." },
  { num: "04", title: "CUSTOM SOFTWARE", desc: "For unique operational and business requirements." },
  { num: "05", title: "SCALABLE PLATFORM", desc: "For products and businesses that need to grow over time." }
];

export function Progression() {
  return (
    <section className="section-padding bg-[#F8FAFC] border-y border-borderLight">
      <div className="container-custom max-w-4xl">
        <SectionHeading 
          eyebrow='NO PROJECT IS "TOO SMALL" TO START'
          title="From a Simple Website to Complete Custom Software." 
          subtitle="You don't need a complex software project to work with us. If your business simply needs a professional website, we'll build it. If you need something completely customized, we'll build that too."
        />
        
        <div className="mt-12 space-y-2 flex flex-col items-center">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
                <div className="bg-white border border-borderLight p-6 rounded-xl w-full max-w-2xl text-center shadow-sm">
                    <div className="text-primary font-bold text-sm mb-1">{step.num}</div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-textSecondary">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                    <div className="py-2"><ArrowDown className="w-5 h-5 text-borderLight" /></div>
                )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-[#0F172A]">Start where your business is today.</h3>
            <h3 className="text-2xl font-bold text-primary mt-1">Build more when you're ready.</h3>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Vision.tsx': `
import React from 'react';

export function Vision() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-5xl text-center">
        <div className="inline-block border border-borderLight bg-[#F8FAFC] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-textSecondary uppercase mb-8">
            Our Vision
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight mb-10">
          "To make customized digital solutions accessible to every business."
        </h2>
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-textSecondary leading-relaxed">
            <p>
                We believe every business deserves technology that fits the way it works — regardless of its size.
            </p>
            <p>
                Whether it's a simple professional website for a local business, a customized platform for a growing company, or a complete software solution for an enterprise, our goal is to make development affordable, flexible and practical.
            </p>
            <p className="font-medium text-[#0F172A]">
                Our vision is simple: understand what the client actually needs, build around those requirements, and provide a solution that fits both the business and its budget.
            </p>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/TargetAudience.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

const audiences = [
  { title: "LOCAL BUSINESSES", desc: "Professional websites and simple digital solutions." },
  { title: "SMALL BUSINESSES", desc: "Websites, booking systems, business applications and automation." },
  { title: "STARTUPS", desc: "Landing pages, MVPs, applications and product development." },
  { title: "GROWING COMPANIES", desc: "Custom applications, portals and workflow systems." },
  { title: "SOFTWARE & TECHNOLOGY COMPANIES", desc: "Development support, applications, integrations and specialized solutions." },
  { title: "ENTERPRISES", desc: "Customized platforms, integrations and business systems." }
];

export function TargetAudience() {
  return (
    <section className="section-padding bg-[#0F172A] text-white">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Businesses of Every Size.</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {audiences.map((aud, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
              <h3 className="font-bold text-white mb-2">{aud.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{aud.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto bg-primary/20 border border-primary/30 p-8 rounded-2xl">
            <p className="text-xl font-medium text-white leading-relaxed">
                Your company size doesn't determine whether custom development is right for you.<br/>
                <span className="text-[#60A5FA] font-bold">Your requirement does.</span>
            </p>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Services.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Globe, ShoppingCart, LayoutTemplate, Smartphone, Cpu, Sparkles, RefreshCcw } from 'lucide-react';

const services = [
  { 
    icon: Globe, 
    title: "WEBSITE DEVELOPMENT", 
    desc: "Professional websites built around your business, brand and goals.", 
    examples: ["Company Websites", "Business Websites", "Corporate Websites", "Portfolio Websites", "Landing Pages", "Product Websites", "Service Websites", "Responsive Websites", "Custom Websites"],
    highlight: "We don't force every customer into the same template. Your website can be customized around your business.",
    primary: true
  },
  { 
    icon: ShoppingCart, 
    title: "E-COMMERCE DEVELOPMENT", 
    desc: "Online stores and shopping experiences.", 
    examples: ["Online Stores", "Product Catalogs", "Payment Integration", "Order Management", "Customized E-Commerce"] 
  },
  { 
    icon: LayoutTemplate, 
    title: "CUSTOM WEB APPLICATIONS", 
    desc: "Interactive business processes and customer experiences.", 
    examples: ["Booking Systems", "Customer Portals", "Admin Portals", "Management Systems", "Dashboards", "Workflow Applications", "Business Platforms"] 
  },
  { 
    icon: Smartphone, 
    title: "MOBILE APPLICATIONS", 
    desc: "Native and cross-platform mobile apps.", 
    examples: ["Android", "iOS", "Cross-platform", "Customer Applications", "Business Applications"] 
  },
  { 
    icon: Cpu, 
    title: "CUSTOM SOFTWARE", 
    desc: "Unique operational and business requirements.", 
    examples: ["CRM", "ERP", "Inventory", "Billing", "Asset Management", "Employee Management", "Workflow Systems", "Custom Business Software"] 
  },
  { 
    icon: Sparkles, 
    title: "AI & AUTOMATION", 
    desc: "Intelligent workflows and AI integrations.", 
    examples: ["AI Assistants", "Generative AI", "Business Automation", "Intelligent Workflows", "AI Integration"] 
  },
  { 
    icon: RefreshCcw, 
    title: "SOFTWARE MODERNIZATION & INTEGRATION", 
    desc: "Improve and connect existing systems.", 
    examples: ["Existing Application Improvements", "API Integration", "System Integration", "Legacy Modernization", "Feature Development"] 
  }
];

export function Services() {
  const primaryService = services[0];
  const secondaryServices = services.slice(1);

  return (
    <section id="services" className="section-padding bg-[#F8FAFC]">
      <div className="container-custom max-w-6xl">
        <SectionHeading 
          title="What We Build" 
          subtitle="From simple digital presences to complex operational systems."
        />
        
        {/* Prominent Website Development Block */}
        <div className="bg-white border-2 border-primary rounded-2xl p-8 lg:p-10 shadow-md mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-lg">CORE SERVICE</div>
            <div className="flex items-start gap-5 mb-6">
                <div className="p-3 bg-[#EFF6FF] text-primary rounded-xl shrink-0"><primaryService.icon className="w-8 h-8" /></div>
                <div>
                    <h3 className="text-2xl font-bold text-[#0F172A]">{primaryService.title}</h3>
                    <p className="text-textSecondary text-lg mt-1">{primaryService.desc}</p>
                </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-y-2 gap-x-4 mb-8">
                {primaryService.examples.map((ex, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#0F172A] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> {ex}
                    </div>
                ))}
            </div>
            <div className="bg-[#EFF6FF] border border-primary/20 p-4 rounded-lg">
                <p className="text-primary font-bold">{primaryService.highlight}</p>
            </div>
        </div>

        {/* Other Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryServices.map((service, idx) => (
            <div key={idx} className="bg-white border border-borderLight rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#F8FAFC] rounded-lg text-primary"><service.icon className="w-5 h-5" /></div>
                  <h3 className="text-sm font-bold text-[#0F172A]">{service.title}</h3>
              </div>
              <p className="text-sm text-textSecondary mb-6 flex-grow">{service.desc}</p>
              
              <ul className="space-y-1.5 border-t border-borderLight pt-4">
                  {service.examples.slice(0, 5).map((ex, i) => (
                      <li key={i} className="text-xs text-textSecondary flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-borderLight shrink-0"></span> {ex}
                      </li>
                  ))}
                  {service.examples.length > 5 && (
                      <li className="text-xs text-textSecondary italic">...and more</li>
                  )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Affordability.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { CheckCircle2 } from 'lucide-react';

export function Affordability() {
  return (
    <section className="section-padding bg-white border-t border-borderLight">
      <div className="container-custom max-w-5xl">
        <SectionHeading 
          eyebrow="FLEXIBLE DEVELOPMENT"
          title="Built Around Your Requirements. Planned Around Your Budget." 
          subtitle="Custom development shouldn't automatically mean expensive development. Instead of selling unnecessary features, we focus on understanding what your business actually needs."
        />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12 mb-16">
            <div className="text-center px-4">
                <div className="w-12 h-12 bg-[#EFF6FF] text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold">1</span>
                </div>
                <h4 className="font-bold text-[#0F172A] mb-2">START WITH WHAT YOU NEED</h4>
                <p className="text-sm text-textSecondary">Build the essential functionality first.</p>
            </div>
            <div className="text-center px-4">
                <div className="w-12 h-12 bg-[#EFF6FF] text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold">2</span>
                </div>
                <h4 className="font-bold text-[#0F172A] mb-2">FLEXIBLE SCOPE</h4>
                <p className="text-sm text-textSecondary">Prioritize features according to business requirements and budget.</p>
            </div>
            <div className="text-center px-4">
                <div className="w-12 h-12 bg-[#EFF6FF] text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold">3</span>
                </div>
                <h4 className="font-bold text-[#0F172A] mb-2">GROW OVER TIME</h4>
                <p className="text-sm text-textSecondary">Add functionality as your business and requirements grow.</p>
            </div>
        </div>

        <div className="bg-[#0F172A] text-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#60A5FA]" />
                    <span className="text-lg font-bold">Simple requirement? <span className="text-slate-400 font-medium block text-sm">Keep it simple.</span></span>
                </div>
                <div className="hidden md:block w-px h-12 bg-slate-700"></div>
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#60A5FA]" />
                    <span className="text-lg font-bold">Unique requirement? <span className="text-slate-400 font-medium block text-sm">Customize it.</span></span>
                </div>
                <div className="hidden md:block w-px h-12 bg-slate-700"></div>
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#60A5FA]" />
                    <span className="text-lg font-bold">Growing requirement? <span className="text-slate-400 font-medium block text-sm">Scale it.</span></span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Pricing.tsx': `
import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

export function Pricing() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom max-w-4xl">
        <SectionHeading 
          title="Flexible Pricing for Different Requirements" 
          subtitle="There is no one-size-fits-all price because every project is different. Our pricing depends on the actual scope, features, design, integrations and development required."
        />
        
        <div className="bg-white border border-borderLight rounded-xl shadow-sm overflow-hidden mt-10 mb-10">
            <div className="divide-y divide-borderLight">
                <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-4">
                    <div className="sm:w-1/3 font-bold text-[#0F172A]">SIMPLE WEBSITE</div>
                    <div className="text-primary font-semibold">→ Smaller scope</div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-4 bg-[#F8FAFC]">
                    <div className="sm:w-1/3 font-bold text-[#0F172A]">CUSTOM WEBSITE</div>
                    <div className="text-primary font-semibold">→ Scope based on customization</div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-4">
                    <div className="sm:w-1/3 font-bold text-[#0F172A]">APPLICATION</div>
                    <div className="text-primary font-semibold">→ Scope based on features and workflows</div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-4 bg-[#F8FAFC]">
                    <div className="sm:w-1/3 font-bold text-[#0F172A]">CUSTOM SOFTWARE</div>
                    <div className="text-primary font-semibold">→ Scope based on business requirements</div>
                </div>
            </div>
        </div>

        <div className="text-center space-y-6">
            <p className="text-lg text-textSecondary font-medium">
                We help identify what is essential, what can wait, and how the project can be structured around your budget.
            </p>
            <Button size="lg" href="#contact">Discuss Your Budget & Requirements</Button>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/RequirementSales.tsx': `
import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';

const examples = [
  { q: "I need a website for my hardware business.", a: "We can build it." },
  { q: "I need a customized booking website.", a: "We can build it." },
  { q: "I need an online store.", a: "We can build it." },
  { q: "I need software to manage my inventory.", a: "We can build it." },
  { q: "I have a startup idea.", a: "Let's define an MVP." },
  { q: "I need a completely unique application.", a: "Let's understand the requirement." }
];

export function RequirementSales() {
  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">You Tell Us What You Need.<br/>We'll Help You Build It.</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {examples.map((ex, idx) => (
            <div key={idx} className="bg-white/10 border border-white/20 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-300 shrink-0" />
                  <span className="font-medium">"{ex.q}"</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold shrink-0">
                  <ArrowRight className="w-4 h-4 hidden sm:block" />
                  {ex.a}
              </div>
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
  { num: '01', title: 'TELL US WHAT YOU NEED', desc: 'Explain your idea, problem or requirement.' },
  { num: '02', title: 'WE UNDERSTAND IT', desc: 'We discuss workflows, users, features and priorities.' },
  { num: '03', title: 'WE PLAN THE SOLUTION', desc: 'We define an appropriate scope and technical approach.' },
  { num: '04', title: 'WE ALIGN WITH YOUR BUDGET', desc: 'Features and phases can be prioritized where appropriate.' },
  { num: '05', title: 'WE DESIGN & DEVELOP', desc: 'We build and test your customized solution.' },
  { num: '06', title: 'WE LAUNCH & SUPPORT', desc: 'Your solution goes live and can continue evolving.' }
];

export function Process() {
  return (
    <section id="process" className="section-padding bg-white">
      <div className="container-custom max-w-6xl">
        <SectionHeading 
          title="How It Works" 
          subtitle="A simple process focused on your requirements."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
           {steps.map((step, idx) => (
             <div key={idx} className="border border-borderLight p-6 rounded-xl bg-[#F8FAFC]">
                <div className="text-2xl font-bold text-borderLight mb-4">{step.num}</div>
                <h4 className="font-bold text-[#0F172A] mb-2">{step.title}</h4>
                <p className="text-sm text-textSecondary">{step.desc}</p>
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
import { Check } from 'lucide-react';

const reasons = [
  { title: "CUSTOMIZED FOR YOUR BUSINESS", desc: "Not a one-size-fits-all solution." },
  { title: "AFFORDABLE DEVELOPMENT", desc: "Practical development focused on what provides value." },
  { title: "FLEXIBLE PROJECT SCOPE", desc: "Start with essential features and expand when required." },
  { title: "BUSINESSES OF EVERY SIZE", desc: "From a simple company website to complex software." },
  { title: "DIRECT REQUIREMENT-FOCUSED APPROACH", desc: "We first understand what you actually need." },
  { title: "LONG-TERM FLEXIBILITY", desc: "Your solution can evolve as your business changes." }
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-[#F8FAFC] border-t border-borderLight">
      <div className="container-custom max-w-5xl">
        <SectionHeading 
          title="Why Build With Hackers Infotech?" 
        />
        
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex gap-4 bg-white p-6 rounded-xl border border-borderLight shadow-sm">
              <div className="bg-[#EFF6FF] text-primary p-2 rounded-lg h-fit shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] mb-1 text-sm">{reason.title}</h3>
                <p className="text-textSecondary text-sm">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/FinalCTA.tsx': `
import React from 'react';
import { Button } from '../ui/Button';
import { ArrowDown } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-24 bg-white border-y border-borderLight text-center">
      <div className="container-custom max-w-3xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-[#0F172A]">
          Have a Software Idea?<br/>
          <span className="text-primary">Let's Build It.</span>
        </h2>
        <div className="text-lg text-textSecondary mb-8 space-y-2">
            <p>You don't need to know the technology, architecture or development process.</p>
            <p className="font-medium text-[#0F172A]">You just need to tell us what your business needs.</p>
            <p>We'll help you turn the requirement into a practical software solution.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-12 text-sm font-bold text-textSecondary uppercase tracking-widest">
            <span>IDEA</span>
            <ArrowDown className="w-4 h-4 sm:-rotate-90 text-borderLight" />
            <span>DISCUSSION</span>
            <ArrowDown className="w-4 h-4 sm:-rotate-90 text-borderLight" />
            <span>SOLUTION</span>
            <ArrowDown className="w-4 h-4 sm:-rotate-90 text-borderLight" />
            <span>DEVELOPMENT</span>
            <ArrowDown className="w-4 h-4 sm:-rotate-90 text-borderLight" />
            <span className="text-primary">YOUR SOFTWARE</span>
        </div>

        <div className="bg-[#F8FAFC] border border-borderLight p-6 rounded-xl mb-10">
            <h3 className="font-bold text-[#0F172A] mb-2 uppercase tracking-wide">Custom software doesn't have to be complicated or expensive.</h3>
            <p className="text-textSecondary">Let's define the right solution for your requirements and budget.</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button size="lg" href="#contact">Start Your Project</Button>
          <span className="text-sm text-textSecondary">Talk to our team about your requirement.</span>
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
    setTimeout(() => {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding bg-[#F8FAFC]">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Let's Discuss Your Requirement</h2>
            <p className="text-lg text-textSecondary">
              Not sure what technology you need? That's okay.<br/>Just tell us what you're trying to achieve.
            </p>
        </div>
        
        <div className="bg-white border border-borderLight rounded-2xl shadow-sm p-8">
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Message Sent Successfully</h3>
              <p>Thank you for reaching out. Our team will review your inquiry and contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-[#0F172A]">Your Name *</label>
                  <input required type="text" id="name" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-[#0F172A] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="company" className="text-sm font-semibold text-[#0F172A]">Business / Company Name</label>
                  <input type="text" id="company" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-[#0F172A] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-[#0F172A]">Email *</label>
                  <input required type="email" id="email" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-[#0F172A] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-[#0F172A]">Phone / WhatsApp *</label>
                  <input required type="tel" id="phone" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-[#0F172A] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="type" className="text-sm font-semibold text-[#0F172A]">What Do You Need? *</label>
                  <select required id="type" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-[#0F172A] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
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
                <div className="space-y-1.5">
                  <label htmlFor="budget" className="text-sm font-semibold text-[#0F172A]">Budget Range</label>
                  <select id="budget" className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-[#0F172A] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                    <option value="">Select...</option>
                    <option>Under $5k</option>
                    <option>$5k - $10k</option>
                    <option>$10k - $25k</option>
                    <option>$25k+</option>
                    <option>To be discussed</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="description" className="text-sm font-semibold text-[#0F172A]">Tell Us About Your Requirement *</label>
                <textarea required id="description" rows={5} placeholder="Describe your business problem, idea, or what you want the software to do..." className="w-full bg-white border border-borderLight rounded-md px-4 py-2.5 text-[#0F172A] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y"></textarea>
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Get a Free Consultation'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
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

console.log('Repositioning generated successfully.');
