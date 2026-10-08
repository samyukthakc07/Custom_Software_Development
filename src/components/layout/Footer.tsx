import React from 'react';
import { companyData, BROCHURE_URL } from '../../data/company';
import { Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-12 pb-6 border-t border-borderLight text-slate-300">
      <div className="container-custom max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-sm">
          <div>
            <div className="flex items-center gap-3 mb-4 text-white">
              <img src="/brand/hackers-infotech-logo-white.png" alt="Hackers Infotech Shield" className="h-8 object-contain" />
              <span className="font-bold text-lg">{companyData.companyName}</span>
            </div>
            <p className="text-slate-400 max-w-xs">Customized digital solutions built around your business.</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-white mb-2 uppercase tracking-wide text-xs">Explore</h4>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#why-us" className="hover:text-primary transition-colors">Why Us</a>
            <a href="#process" className="hover:text-primary transition-colors">Process</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-white mb-2 uppercase tracking-wide text-xs">Contact Info</h4>
            <a href={companyData.email.href} className="hover:text-primary transition-colors">{companyData.email.display}</a>
            <a href={companyData.phone.href} className="hover:text-primary transition-colors">{companyData.phone.display}</a>
            <a href={BROCHURE_URL} download="Hackers-Infotech-Custom-Software-Brochure.pdf" className="hover:text-primary transition-colors mt-2 text-primary">Brochure &rarr;</a>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {companyData.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}