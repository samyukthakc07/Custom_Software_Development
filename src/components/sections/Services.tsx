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
              <Button href="#contact" onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('openContactForm', { detail: { mode: 'explore' } }));
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }} className="group">
                Connect <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}