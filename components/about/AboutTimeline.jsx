"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  RocketLaunchIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  ClockIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const journeyMilestones = [
  {
    period: 'Founding Years',
    title: 'Humble Beginnings',
    description: 'Started with a small fleet offering airport transfers and city tours.',
    icon: ClockIcon,
  },
  {
    period: 'Expanding Routes',
    title: 'Regional Expansion',
    description: 'Added outstation packages to Shirdi, Lonavala and Mahabaleshwar as demand grew.',
    icon: RocketLaunchIcon,
  },
  {
    period: 'Corporate & NRI Focus',
    title: 'Specialized Experiences',
    description: 'Introduced dedicated corporate travel and NRI homecoming packages.',
    icon: BuildingOffice2Icon,
  },
  {
    period: 'Today',
    title: 'Full-Service Travel Brand',
    description: 'A full-service tours and travels brand trusted by families, couples and solo explorers alike.',
    icon: UserGroupIcon,
  },
];

export function AboutTimeline() {
  return (
    <div className="relative">
      {/* Animated Vertical Line */}
      <div className="hidden sm:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-1 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-[#b8860b] via-[#d4af37] to-[#0f2c3f]"
          initial={{ height: '0%' }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
      </div>

      <div className="space-y-12 sm:space-y-16">
        {journeyMilestones.map((milestone, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={milestone.period}
              className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10 ${
                isEven ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* Content Card with Scroll Entrance */}
              <motion.div
                className="w-full sm:w-1/2"
                initial={{
                  opacity: 0,
                  x: isEven ? 60 : -60,
                  scale: 0.94,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  type: 'spring',
                  stiffness: 90,
                  damping: 17,
                  mass: 0.7,
                  delay: 0.1,
                }}
              >
                <div
                  className={`group relative p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm transition-all duration-400 hover:shadow-2xl hover:border-[#b8860b]/50 hover:bg-white transform-gpu ${
                    isEven ? 'sm:text-right' : 'sm:text-left'
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-3 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f2c3f] text-[#fef08a] font-mono text-xs font-bold uppercase tracking-wider shadow-sm">
                      <SparklesIcon className="h-3 w-3 text-[#b8860b]" />
                      {milestone.period}
                    </span>
                  </div>

                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#0f2c3f] mb-2 group-hover:text-[#b8860b] transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>

              {/* Timeline Center Node Icon with Pop Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 14,
                  delay: 0.2,
                }}
                className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f2c3f] text-[#fef08a] border-4 border-white shadow-xl ring-2 ring-[#b8860b]/30"
              >
                <milestone.icon className="h-5 w-5 text-[#fef08a]" />
              </motion.div>

              {/* Empty Spacer Column for Desktop Alternate Layout */}
              <div className="hidden sm:block w-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
