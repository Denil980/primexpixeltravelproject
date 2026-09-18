"use client";
import React, { useState } from 'react';
import { ChevronDownIcon, CalendarIcon } from '@heroicons/react/24/outline';

export const PackageItineraryAccordion = ({ itinerary }) => {
    const [openDays, setOpenDays] = useState([1]);
    const toggleDay = (dayNum) => {
        setOpenDays((prev) =>
            prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
        );
    };
    return (
        <div className="space-y-3">
            {itinerary.map((item) => {
                const isOpen = openDays.includes(item.day);
                return (
                    <div
                        key={item.day}
                        className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-200"
                    >
                        <button
                            type="button"
                            onClick={() => toggleDay(item.day)}
                            aria-expanded={isOpen}
                            className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors focus-visible:outline-none"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#b8860b]/10 text-[#b8860b] font-bold font-mono text-sm flex items-center justify-center shrink-0 border border-[#b8860b]/20">
                                    D{item.day}
                                </div>
                                <div>
                                    <span className="text-[10px] text-[#b8860b] font-bold uppercase tracking-wider flex items-center gap-1 mb-0.5">
                                        <CalendarIcon className="h-3 w-3 inline" />
                                        Day {item.day}
                                    </span>
                                    <h4 className="font-playfair text-base sm:text-lg font-bold text-[#0f2c3f] leading-snug">
                                        {item.title}
                                    </h4>
                                </div>
                            </div>
                            <div className={"p-1.5 rounded-full transition-all duration-300 shrink-0 " + (isOpen ? "rotate-180 text-[#b8860b] bg-[#b8860b]/10" : "text-slate-400")}>
                                <ChevronDownIcon className="h-5 w-5" />
                            </div>
                        </button>
                        {isOpen && (
                            <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                                <p className="pl-14 text-sm text-slate-600 leading-relaxed font-inter">{item.description}</p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};