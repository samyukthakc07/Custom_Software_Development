import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { WhyUs } from './components/sections/WhyUs';
import { Process } from './components/sections/Process';
import { Vision } from './components/sections/Vision';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;