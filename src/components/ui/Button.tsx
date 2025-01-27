/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes } from 'react';

export default function Button({
  className = '', type = 'button', children, ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`min-w-[48px] min-h-[48px] my-4 rounded py-2 px-4 font-bold text-black bg-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
