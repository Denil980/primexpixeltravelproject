"use client";
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
export const HeroMotion = ({ children, className = '', as = 'div', }) => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion
        ? {}
        : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 } };
    if (as === 'h1') {
        return (<motion.h1 {...motionProps} className={className}>
        {children}
      </motion.h1>);
    }
    if (as === 'p') {
        return (<motion.p {...motionProps} className={className}>
        {children}
      </motion.p>);
    }
    return (<motion.div {...motionProps} className={className}>
      {children}
    </motion.div>);
};
