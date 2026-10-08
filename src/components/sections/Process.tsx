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