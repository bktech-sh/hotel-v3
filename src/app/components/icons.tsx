/* One consistent SVG icon family — Phosphor-style, uniform 1.5 stroke width,
   round caps/joins. No emoji anywhere. currentColor inherits text color. */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export const Flame = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3c.5 3-1.8 4-1.8 6.2A2 2 0 0 0 12 11a2 2 0 0 0 1.8-1.2c1 1 1.7 2.4 1.7 4A5.5 5.5 0 1 1 6.6 11c0-.8.2-1.5.5-2.1C8.2 10 9 9 9 7.5 9 5.5 10.5 4 12 3Z" />
  </svg>
);

export const Tree = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2 6.5 9h3L5 15h4.5v3.5a2.5 2.5 0 0 0 5 0V15H19l-4.5-6h3L12 2Z" />
    <path d="M12 18.5V22" />
  </svg>
);

export const Mountain = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m3 19 6-11 4 7 2-3 6 7H3Z" />
    <circle cx="9" cy="8" r="0" />
  </svg>
);

export const Coffee = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 9h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
    <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
    <path d="M8 3.5c-.5.7-.5 1.3 0 2M12 3c-.5.7-.5 1.3 0 2" />
  </svg>
);

export const Droplet = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3c3 3.6 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 3-6.4 6-10Z" />
  </svg>
);

export const Stars = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5 13.4 8l4.6 1.4L14 12l1 4.6L12 14l-3 2.6 1-4.6-4-2.6L10.6 8 12 3.5Z" />
    <path d="M19 4v2M20 5h-2" />
  </svg>
);

export const Calendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);

export const Users = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.5a3 3 0 0 1 0 5.8M17.5 19a5.5 5.5 0 0 0-2.4-4.5" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21c4.5-4.2 7-7.4 7-11a7 7 0 1 0-14 0c0 3.6 2.5 6.8 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Plane = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M10.5 13.5 3 15v-2l6-3.5V4a1.5 1.5 0 0 1 3 0v5.5L21 13v2l-7.5-1.5L13 20l1.8 1.3V22l-2.8-.8L9.2 22v-.7L11 20l-.5-6.5Z" />
  </svg>
);

export const Car = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 16v-3.2l1.6-4A2 2 0 0 1 7.5 7.5h9a2 2 0 0 1 1.9 1.3l1.6 4V16" />
    <path d="M4 16h16M4 16v2H6v-2M20 16v2h-2v-2" />
    <path d="M6.5 12.5h11" />
    <circle cx="7.5" cy="13" r="0" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </svg>
);

export const Quote = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 7c-2.5 1-4 3-4 6v4h5v-5H6.5C6.8 9.5 8 8.3 10 7.7L9 7ZM19 7c-2.5 1-4 3-4 6v4h5v-5h-3.5c.3-2.5 1.5-3.7 3.5-4.3L19 7Z" />
  </svg>
);

export const Leaf = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 4C9 4 4 9.5 4 16v4M5 20c0-8 6-11 14-11" />
    <path d="M4 20c0-7 5-11 12-11" opacity="0" />
  </svg>
);

export const Wifi = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12.5a10 10 0 0 1 14 0M7.8 15.4a6 6 0 0 1 8.4 0M10.6 18.2a2 2 0 0 1 2.8 0" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3.5c1 0 1.6.4 2 1.5l.9 2.3c.3.8.1 1.4-.5 2l-1 .9a11 11 0 0 0 4.4 4.4l.9-1c.6-.6 1.2-.8 2-.5l2.3.9c1 .4 1.5 1 1.5 2v1.7c0 1.2-.9 2-2.1 1.9C11.9 20.7 3.3 12.1 2.6 5.6 2.5 4.4 3.3 3.5 4.5 3.5H6Z" />
  </svg>
);
