import React from 'react';
export const Container = ({ children, className }) => (<div className={`w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className !== null && className !== void 0 ? className : ''}`}>{children}</div>);
