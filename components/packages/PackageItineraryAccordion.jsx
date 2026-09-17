"use client";
import React, { useState } from 'react';
import { ChevronDownIcon, CalendarIcon } from '@heroicons/react/24/outline';
export const PackageItineraryAccordion = ({ itinerary }) => {
    // Expand Day 1 by default
    const [openDays, setOpenDays] = useState([1]);
    const toggleDay = (dayNum) => {
        setOpenDays((prev) => prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]);
    };
    return (<div className="space-y-4">
      {itinerary.map((item) => {
            const isOpen = openDays.includes(item.day);
            const contentId = `itinerary-content-${item.day}`;
            const headerId = `itinerary-header-${item.day}`;
            return (<div key={item.day} className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs transition-all duration-200">
            <button id={headerId} type="button" onClick={() => toggleDay(item.day)} aria-expanded={isOpen} aria-controls={contentId} className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A3D62]/10 text-[#0A3D62] font-bold font-mono text-sm flex items-center justify-center shrink-0">
                  D{item.day}
                </div>
                <div>
                  <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5 inline"/>
                    Day {item.day}
                  </span>
                  <h4 className="font-playfair text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className={`p-2 text-gray-400 rounded-full transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#0A3D62]' : ''}`}>
                <ChevronDownIcon className="h-5 w-5"/>
              </div>
            </button>

            {isOpen && (<div id={contentId} role="region" aria-labelledby={headerId} className="px-6 pb-6 pt-2 text-sm sm:text-base text-gray-600 font-inter leading-relaxed border-t border-gray-100">
                <p className="pl-14">{item.description}</p>
              </div>)}
          </div>);
        })}
    </div>);
};
