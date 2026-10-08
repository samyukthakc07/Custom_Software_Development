import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children?: React.ReactNode;
  variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale';
  delay?: number;
  className?: string;
  width?: 'fit-content' | '100%';
}

export function Reveal({ children, variant = 'fadeUp', delay = 0, className = '', width = '100%' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    fadeUp: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    fadeLeft: { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } },
    fadeRight: { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  };

  const activeVariant = shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : variants[variant];

  return (
    <motion.div
      variants={activeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}