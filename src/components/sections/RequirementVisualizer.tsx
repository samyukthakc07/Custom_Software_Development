import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, CalendarDays, Package, LayoutDashboard, Workflow, MessageSquare, Building2, ListChecks, WalletCards, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const examples = [
  {
    id: 1,
    requirement: "I need a professional website for my business.",
    solution: "Professional Website",
    features: ["Homepage", "Services", "About", "Contact"],
    icon: Globe
  },
  {
    id: 2,
    requirement: "I need customers to book my services online.",
    solution: "Custom Booking System",
    features: ["Services", "Calendar", "Time Slots", "Bookings"],
    icon: CalendarDays
  },
  {
    id: 3,
    requirement: "I need software to manage my inventory.",
    solution: "Custom Business Software",
    features: ["Products", "Stock", "Orders", "Reports"],
    icon: Package
  },
  {
    id: 4,
    requirement: "I have an idea for a custom application.",
    solution: "Custom Application",
    features: ["Dashboard", "Users", "Features", "Analytics"],
    icon: LayoutDashboard
  },
  {
    id: 5,
    requirement: "I want to automate part of my business.",
    solution: "Business Automation",
    features: ["Input", "Process", "Automation", "Result"],
    icon: Workflow
  }
];

export function RequirementVisualizer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % examples.length);
    }, 4500); // 4.5 seconds for complete story
    return () => clearInterval(interval);
  }, [isPaused]);

  const active = examples[currentIndex];

  return (
    <div 
      className="bg-white border border-borderLight rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl shadow-primary/5 flex flex-col relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Customer Requirement */}
      <div className="relative z-10 w-full mb-6">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-textSecondary" />
          <span className="text-xs font-bold text-textSecondary tracking-wider uppercase">Your Requirement</span>
        </div>
        
        <div className="bg-[#F8FAFC] border border-borderLight rounded-xl p-4 shadow-sm relative min-h-[80px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={active.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-[#0F172A] font-medium text-[15px] leading-snug"
            >
              "{active.requirement}"
            </motion.p>
          </AnimatePresence>
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[#F8FAFC] border-b border-r border-borderLight rotate-45 transform origin-center"></div>
        </div>
      </div>

      {/* 2 & 3. Middle - Hackers Infotech Processing */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center py-4 my-2">
        {/* Connection Line Down */}
        <div className="absolute left-8 top-[-30px] bottom-[50%] w-px border-l-2 border-dashed border-borderLight -z-10">
           <motion.div 
             key={`line-1-${active.id}`}
             initial={{ height: 0 }}
             animate={{ height: '100%' }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="w-full bg-primary"
           />
        </div>
        
        <div className="flex w-full items-center pl-4 pr-0 gap-4">
          <div className="flex flex-col items-center justify-center shrink-0">
            <motion.div 
               key={`pulse-${active.id}`}
               initial={{ scale: 1, boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)' }}
               animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 0 0 rgba(37, 99, 235, 0)', '0 0 0 15px rgba(37, 99, 235, 0.1)', '0 0 0 0 rgba(37, 99, 235, 0)'] }}
               transition={{ duration: 1, delay: 0.6 }}
               className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg relative z-20"
            >
              <img src="/brand/hackers-infotech-logo-blue.png" alt="Hackers Infotech" className="w-[70%] h-[70%] object-contain brightness-0 invert" />
            </motion.div>
          </div>
          
          <div className="flex-1">
             <div className="flex flex-wrap gap-2 items-center">
                <motion.span 
                  key={`a1-${active.id}`} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                  className="inline-flex items-center gap-1 bg-[#EFF6FF] text-primary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                ><Building2 className="w-3 h-3"/> Business</motion.span>
                <motion.span 
                  key={`a2-${active.id}`} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
                  className="inline-flex items-center gap-1 bg-[#EFF6FF] text-primary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                ><ListChecks className="w-3 h-3"/> Features</motion.span>
                <motion.span 
                  key={`a3-${active.id}`} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}
                  className="inline-flex items-center gap-1 bg-[#F8FAFC] border border-borderLight text-textSecondary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                ><WalletCards className="w-3 h-3"/> Budget</motion.span>
             </div>
             <motion.div 
                key={`a4-${active.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                className="mt-2 text-[10px] font-medium text-textSecondary flex items-center gap-1.5"
             >
                Scope <ArrowRight className="w-3 h-3" /> Budget <span className="italic text-primary/80 ml-1">Planned Together</span>
             </motion.div>
          </div>
        </div>

        {/* Connection Line Right/Down */}
        <div className="absolute right-12 top-[60%] bottom-[-30px] w-px border-l-2 border-dashed border-borderLight -z-10">
           <motion.div 
             key={`line-2-${active.id}`}
             initial={{ height: 0 }}
             animate={{ height: '100%' }}
             transition={{ duration: 0.5, delay: 1.4 }}
             className="w-full bg-primary"
           />
        </div>
      </div>

      {/* 4. Solution Mockup */}
      <div className="relative z-10 w-full mt-4 flex justify-end pl-6">
        <motion.div 
          key={`mockup-${active.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="w-full max-w-[320px] bg-white border border-borderLight rounded-t-xl rounded-b-md overflow-hidden shadow-xl"
        >
          {/* Browser Header */}
          <div className="bg-[#F8FAFC] border-b border-borderLight px-3 py-2 flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-borderLight"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-borderLight"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-borderLight"></div>
            <div className="ml-2 flex-1 bg-white border border-borderLight rounded text-[9px] px-2 py-0.5 text-center text-textSecondary font-medium flex items-center justify-center gap-1">
               <active.icon className="w-3 h-3 text-primary" />
               {active.solution}
            </div>
          </div>
          
          {/* Mockup Content */}
          <div className="p-3 bg-white grid grid-cols-2 gap-2 h-[80px]">
             {active.features.map((feature, idx) => (
                <motion.div 
                  key={`feat-${active.id}-${idx}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + (idx * 0.1) }}
                  className="bg-[#F8FAFC] rounded border border-borderLight flex items-center justify-center p-2 text-center"
                >
                   <span className="text-[10px] font-bold text-navy">{feature}</span>
                </motion.div>
             ))}
          </div>
        </motion.div>
      </div>

      {/* 5. Result Message */}
      <motion.div 
        key={`result-${active.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="mt-6 pt-4 border-t border-borderLight w-full"
      >
         <div className="flex items-center justify-between">
           <div>
             <div className="font-bold text-[13px] text-navy flex gap-1.5 items-center mb-1">
               YOUR REQUIREMENT. YOUR BUDGET. <span className="text-primary">THE RIGHT SOLUTION.</span>
             </div>
             <div className="text-[11px] text-textSecondary font-medium">
               Start simple. Grow when you're ready.
             </div>
           </div>
         </div>
      </motion.div>

      {/* Navigation Indicators */}
      <div className="absolute top-6 right-6 flex gap-1.5 z-20">
        {examples.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => {
              setCurrentIndex(idx);
              setIsPaused(true);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === idx ? "bg-primary w-4" : "bg-borderLight hover:bg-slate-300"
            )}
            aria-label={`View requirement ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
