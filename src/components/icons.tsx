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
    <path d="M12 2a2 2 0 0 0-2 2v2.5A5.5 5.5 0 0 0 4.5 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.5a5.5 5.5 0 0 0 11 0H17a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1.5A5.5 5.5 0 0 0 14 6.5V4a2 2 0 0 0-2-2z" />
    <path d="M8 14v.5" />
    <path d="M16 14v.5" />
    <path d="M11.25 16.25h1.5" />
    <path d="M9 10.5c.5 0 1-.5 1-1" />
    <path d="M15 10.5c-.5 0-1-.5-1-1" />
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
