import { cn } from "@/lib/utils";
import * as React from 'react';

export const PawsightLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11 18.5c-2 0-3.8-.8-5.2-2.3C3.2 13.5 2 10.9 2 8.2 2 4.2 5.2 1 9.2 1s7.2 3.2 7.2 7.2c0 1.5-.5 2.9-1.2 4" />
    <path d="M11 11a3 3 0 0 0-3-3" />
    <path d="M12.5 21.8c.4-.2.8-.5 1.1-.9 1.4-1.4 2.3-3.2 2.3-5.2 0-2.3-1-4.3-2.5-5.8" />
    <path d="M21.9 21.9 16 16" />
  </svg>
);

export const DogTailAnimation = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg 
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <style>{`
        @keyframes wag {
          0%, 100% { transform: rotate(-25deg); }
          50% { transform: rotate(25deg); }
        }
        .wagging-tail {
          transform-origin: 3px 19px;
          animation: wag 0.5s ease-in-out infinite;
        }
      `}</style>
      <path className="wagging-tail" d="M3 19s2-3 4-3 3 3 3 3" />
    </svg>
  );
};
