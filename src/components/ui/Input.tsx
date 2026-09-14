import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  textarea?: boolean;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, className = '', textarea = false, ...rest }, ref) => {
    const baseClasses = "w-full bg-transparent border-b border-[#A8A29E]/50 focus:border-[#C9A96E] outline-none text-neutral-900 dark:text-white py-2 text-base sm:text-sm transition-colors placeholder:text-[#A8A29E]/50";
    const errorClasses = error ? "border-red-500 focus:border-red-500" : "";
    
    return (
      <div className={`flex flex-col w-full ${className}`}>
        {label && (
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#A8A29E] mb-2 font-semibold">
            {label}
          </label>
        )}
        {textarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${baseClasses} ${errorClasses} resize-y min-h-[100px]`}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={`${baseClasses} ${errorClasses}`}
            {...rest}
          />
        )}
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
