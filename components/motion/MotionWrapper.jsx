"use client";
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
export const MotionWrapper = ({ children, className = '', as = 'div', initial, animate, transition, whileHover, }) => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion
        ? {}
        : Object.assign(Object.assign(Object.assign(Object.assign({}, (initial !== undefined && { initial })), (animate !== undefined && { animate })), (transition !== undefined && { transition })), (whileHover !== undefined && { whileHover }));
    const Component = motion[as] || motion.div;
    return (<Component {...motionProps} className={className}>
      {children}
    </Component>);
};
