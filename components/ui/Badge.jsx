import React from 'react';
export const Badge = ({ children, variant = 'default', className }) => {
    const base = 'inline-block rounded-full px-2 py-0.5 text-xs font-medium';
    const colors = {
        default: 'bg-secondaryText text-white',
        accent: 'bg-accent text-white',
    };
    return (<span className={`${base} ${colors[variant]} ${className !== null && className !== void 0 ? className : ''}`}>{children}</span>);
};
