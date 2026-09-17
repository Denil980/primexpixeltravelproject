import React from 'react';
export const Card = ({ children, className }) => (<div className={`rounded-2xl bg-white/85 border border-black/[0.07] shadow-[0_12px_38px_rgba(23,42,43,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c9a45c]/40 hover:shadow-[0_22px_54px_rgba(23,42,43,0.12)] ${className !== null && className !== void 0 ? className : ''}`}>{children}</div>);
