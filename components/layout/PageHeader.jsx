import React from 'react';
import { Playfair_Display } from 'next/font/google';
const headingFont = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
export const PageHeader = ({ title, subtitle, className }) => (<header className={`mb-8 ${className !== null && className !== void 0 ? className : ''}`}>
    <h1 className={`text-4xl font-heading ${headingFont.variable} text-primary`}>{title}</h1>
    {subtitle && <p className="mt-2 text-lg text-secondaryText">{subtitle}</p>}
  </header>);
