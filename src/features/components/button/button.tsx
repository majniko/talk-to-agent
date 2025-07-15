import React from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export const Button = ({
  children,
  className,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
