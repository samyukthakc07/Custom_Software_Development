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