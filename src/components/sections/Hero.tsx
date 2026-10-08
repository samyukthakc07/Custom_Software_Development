import React from 'react';
import { Check, ArrowRight, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { BROCHURE_URL } from '../../data/company';
import { motion } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { RequirementVisualizer } from './RequirementVisualizer';

export function Hero() {
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
                <Button size="lg" href="#contact" onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('openContactForm', { detail: { mode: 'explore' } }));
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }} className="group shadow-lg hover:-translate-y-0.5 transition-all">
                  Connect
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="white" size="lg" href="http://almax-demo-ui.vercel.app/bms/" onClick={(e) => {
                  e.preventDefault();
                  window.open('http://almax-demo-ui.vercel.app/bms/', '_blank');
                }} className="hover:bg-[#EFF6FF] transition-colors">
                  Demo
                </Button>
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
            <RequirementVisualizer />
          </Reveal>
        </div>
      </div>
    </section>
  );
}