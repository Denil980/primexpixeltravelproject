import React from 'react';
export const Section = ({ children, className = '', id }) => (<section id={id} className={`relative w-full overflow-hidden py-14 sm:py-18 lg:py-20 ${className}`}>
    {children}
  </section>);
