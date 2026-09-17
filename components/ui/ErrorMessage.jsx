import React from 'react';
export const ErrorMessage = ({ message, className }) => (<p className={`text-error ${className !== null && className !== void 0 ? className : ''}`} role="alert">
    {message}
  </p>);
