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
export const Select = (_a) => {
    var { label, options, id } = _a, props = __rest(_a, ["label", "options", "id"]);
    const generatedId = useId();
    const selectId = id || `select-${generatedId}`;
    return (<div className="flex flex-col space-y-1">
      <label htmlFor={selectId} className="text-sm font-medium text-primaryText">
        {label}
      </label>
      <select id={selectId} className="rounded-md border border-secondaryText bg-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" {...props}>
        {options.map((opt) => (<option key={opt.value} value={opt.value}>
            {opt.label}
          </option>))}
      </select>
    </div>);
};
