import React from "react";

export function Button({
  children,
  className = "",
  asChild,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      className: `inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition-colors ${
        (children.props as Record<string, string>).className || ""
      } ${className}`,
    });
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
