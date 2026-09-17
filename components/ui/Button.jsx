var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
const buttonStyles = cva('group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none', {
    variants: {
        intent: {
            primary: 'bg-primary text-white shadow-[0_12px_30px_rgba(23,63,61,0.2)] hover:bg-[#0d292b] hover:shadow-[0_16px_36px_rgba(23,63,61,0.28)]',
            secondary: 'bg-accent text-[#172a2b] shadow-[0_12px_30px_rgba(201,164,92,0.2)] hover:bg-[#ead8ad] hover:shadow-[0_16px_36px_rgba(201,164,92,0.3)]',
            outline: 'border border-primary/30 bg-transparent text-primary hover:border-accent hover:bg-accent/10',
        },
        size: {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-7 py-3.5 text-sm',
        },
    },
    defaultVariants: {
        intent: 'primary',
        size: 'md',
    },
});
export const Button = (_a) => {
    var { intent, size, className, children } = _a, props = __rest(_a, ["intent", "size", "className", "children"]);
    return (<button className={clsx(buttonStyles({ intent, size }), className)} {...props}>
      {children}
    </button>);
};
