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
import Image from 'next/image';
import React from 'react';
/**
 * Wrapper around Next.js `next/image` that provides sensible defaults for the
 * design system. Images used below the fold are lazy‑loaded, while the hero
 * image can be loaded with `priority` for optimal performance.
 */
export const ResponsiveImage = (_a) => {
    var { src, alt, priority = false, className = '', objectFit = 'cover' } = _a, rest = __rest(_a, ["src", "alt", "priority", "className", "objectFit"]);
    return (<Image src={src} alt={alt} priority={priority} loading={priority ? 'eager' : 'lazy'} className={`object-${objectFit} ${className}`} {...rest}/>);
};
