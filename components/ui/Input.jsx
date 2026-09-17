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
import React, { useId } from 'react';
export const Input = (_a) => {
    var { label, id } = _a, props = __rest(_a, ["label", "id"]);
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;
    return (<div className="flex flex-col space-y-1">
      <label htmlFor={inputId} className="text-sm font-medium text-primaryText">
        {label}
      </label>
      <input id={inputId} className="rounded-md border border-secondaryText px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" {...props}/>
    </div>);
};
