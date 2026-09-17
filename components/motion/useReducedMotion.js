"use client";
import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';
/**
 * Custom wrapper around Framer Motion's useReducedMotion hook.
 * Must be invoked within Client Components ("use client").
 */
export function useReducedMotion() {
    return useFramerReducedMotion();
}
