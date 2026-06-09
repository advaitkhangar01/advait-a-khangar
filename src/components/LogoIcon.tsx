import React from 'react';

interface LogoIconProps {
  size?: number;
  className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ size = 20, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Left leg of A (tapered and angled) */}
      <path
        d="M 26 78 L 47 31"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Right leg of A (tapered and angled) */}
      <path
        d="M 74 78 L 53 31"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Left segment of the crossbar */}
      <path
        d="M 36 55 H 44"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Right segment of the crossbar */}
      <path
        d="M 64 55 H 56"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Glowing AI center core node */}
      <circle
        cx="50"
        cy="55"
        r="4.5"
        fill="currentColor"
      />
      {/* Top vertex floating tech-diamond */}
      <path
        d="M 50 14 L 56 20 L 50 26 L 44 20 Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default LogoIcon;
