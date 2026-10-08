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