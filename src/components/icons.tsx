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
        <path d="M14.5 7.5c.5.5.5 1.5 0 2" />
        <path d="M9.5 7.5c-.5.5-.5 1.5 0 2" />
        <path d="M12 18s2-4 4-4 4 4 4 4" />
        <path d="M12 18s-2-4-4-4-4 4-4 4" />
        <path d="M12 18v-2" />
        <path d="M10 12c.5-1 2-1 3 0" />
        <path d="M20 12c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.4.98 4.63 2.6 6.2" />
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
