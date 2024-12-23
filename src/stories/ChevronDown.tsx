import React from 'react';

export const ChevronDownSVG = ({ isOpen }: { isOpen: boolean }) => {
  const svgStyle: React.CSSProperties = {
    transform: isOpen ? 'rotate(180deg)' : 'none',
    transition: 'transform 0.3s ease',
    width: '16px',
    height: '16px',
  };

  return (
    <svg
      style={svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};
