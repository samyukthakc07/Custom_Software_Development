import React, { useState, useEffect, useRef } from 'react';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { Check, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { companyData } from '../../data/company';

export function Contact() {
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');
  const [formMode, setFormMode] = useState<'explore'|'demo'>('explore');
  const [requirement, setRequirement] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleOpenForm = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.mode === 'demo') {
        setFormMode('demo');
        setRequirement('Book a Demo / Consultation');
      } else {
        setFormMode('explore');
        setRequirement('');
      }
    };
    window.addEventListener('openContactForm', handleOpenForm);
    return () => window.removeEventListener('openContactForm', handleOpenForm);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.success === true) {
        setStatus('success');
        if (formRef.current) formRef.current.reset();
        setRequirement('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT: INFO */}
          <div>
            <Reveal>
              <div className="text-primary font-bold tracking-wider text-xs uppercase mb-4">Let's Build Something</div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">Let's Discuss Your Requirement.</h2>
              <p className="text-textSecondary mb-8 text-lg">
                Tell us what you're looking to build. Our team will get in touch to understand your requirement, budget and next steps.
              </p>
              
              <div className="space-y-3 mb-10 text-[#0F172A] font-semibold text-sm">
                <div className="flex items-center gap-2"><div className="bg-green-100 text-green-700 p-1 rounded-full"><Check className="w-3 h-3" strokeWidth={3} /></div> Free initial discussion</div>
                <div className="flex items-center gap-2"><div className="bg-green-100 text-green-700 p-1 rounded-full"><Check className="w-3 h-3" strokeWidth={3} /></div> Flexible project scope</div>
                <div className="flex items-center gap-2"><div className="bg-green-100 text-green-700 p-1 rounded-full"><Check className="w-3 h-3" strokeWidth={3} /></div> Solutions for different budgets</div>
              </div>
              
              <div className="bg-[#F8FAFC] border border-borderLight rounded-xl p-6 space-y-4 text-sm font-medium text-[#0F172A]">
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> <a href={companyData.phone.href} className="hover:text-primary transition-colors">{companyData.phone.display}</a></div>
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> <a href={companyData.email.href} className="hover:text-primary transition-colors">{companyData.email.display}</a></div>
                <div className="flex items-start gap-3 mt-4 pt-4 border-t border-borderLight">
                   <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                   <div>
                     <p className="font-semibold">{companyData.address.short}</p>
                   </div>
                </div>
              </div>
            </Reveal>
          </div>
          
          {/* RIGHT: FORM */}
          <div>
            <Reveal delay={0.2}>
              <div className="bg-white border border-borderLight rounded-2xl shadow-lg p-6 md:p-8" aria-live="polite">
                {status === 'success' ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-2">Thank you. We've received your requirement.</h3>
                    <p>Our team will contact you shortly.</p>
                    <Button onClick={() => setStatus('idle')} className="mt-4" variant="outline">Done</Button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    {formMode === 'demo' && (
                      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl mb-4 text-sm">
                        <div className="font-bold mb-1">DEMO</div>
                        Tell us a little about your requirement and our team will contact you to arrange a discussion.
                      </div>
                    )}
                    
                    {status === 'error' && (
                      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-4 text-sm">
                        <div className="font-bold mb-1">We couldn't send your request right now.</div>
                        Please try again or contact us directly at <a href={companyData.email.href} className="underline">{companyData.email.display}</a> or <a href={companyData.phone.href} className="underline">{companyData.phone.display}</a>.
                      </div>
                    )}
                    
                    {/* Honeypot field */}
                    <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1 group">
                        <label htmlFor="fullName" className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">FULL NAME *</label>
                        <input id="fullName" name="fullName" required type="text" maxLength={100} className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-1 group">
                        <label htmlFor="companyName" className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">COMPANY / BUSINESS NAME</label>
                        <input id="companyName" name="companyName" type="text" maxLength={100} className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1 group">
                        <label htmlFor="email" className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">EMAIL *</label>
                        <input id="email" name="email" required type="email" maxLength={150} className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-1 group">
                        <label htmlFor="mobile" className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">MOBILE NUMBER / WHATSAPP *</label>
                        <input id="mobile" name="mobile" required type="tel" placeholder="+91 98765 43210" pattern="^\+?[0-9\s\-]{7,20}$" title="Please enter a valid mobile number (e.g., +91 98765 43210)" maxLength={25} className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      </div>
                    </div>
                    
                    <div className="space-y-1 group">
                      <label htmlFor="requirementType" className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">WHAT DO YOU NEED? *</label>
                      <select id="requirementType" name="requirementType" required value={requirement} onChange={(e) => setRequirement(e.target.value)} className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                        <option value="">Select...</option>
                        <option value="Business Website">Business Website</option>
                        <option value="Custom Website">Custom Website</option>
                        <option value="E-Commerce Website">E-Commerce Website</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Mobile Application">Mobile Application</option>
                        <option value="Custom Software">Custom Software</option>
                        <option value="AI / Automation">AI / Automation</option>
                        <option value="Existing Software Improvement">Existing Software Improvement</option>
                        <option value="Book a Demo / Consultation">Book a Demo / Consultation</option>
                        <option value="Not Sure Yet">Not Sure Yet</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1 group">
                        <label htmlFor="budgetRange" className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">BUDGET RANGE</label>
                        <select id="budgetRange" name="budgetRange" className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                          <option value="">Select...</option>
                          <option value="Under $5k">Under $5k</option>
                          <option value="$5k - $10k">$5k - $10k</option>
                          <option value="$10k - $25k">$10k - $25k</option>
                          <option value="$25k+">$25k+</option>
                          <option value="To be discussed">To be discussed</option>
                        </select>
                      </div>
                      <div className="space-y-1 group">
                        <label htmlFor="projectTimeline" className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">PROJECT TIMELINE</label>
                        <select id="projectTimeline" name="projectTimeline" className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                          <option value="">Select...</option>
                          <option value="As soon as possible">As soon as possible</option>
                          <option value="Within 1 month">Within 1 month</option>
                          <option value="1–3 months">1–3 months</option>
                          <option value="3–6 months">3–6 months</option>
                          <option value="Flexible / Not sure">Flexible / Not sure</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1 group">
                      <label htmlFor="requirementDetails" className="text-xs font-bold text-textSecondary group-focus-within:text-primary transition-colors">TELL US ABOUT YOUR REQUIREMENT *</label>
                      <textarea id="requirementDetails" name="requirementDetails" required rows={3} maxLength={2000} className="w-full bg-[#F8FAFC] border border-borderLight rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"></textarea>
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full shadow-md hover:-translate-y-0.5 group mt-2" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending...' : <>SUBMIT <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>}
                    </Button>
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