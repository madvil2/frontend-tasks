import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const BurgerIcon = (p: IconProps) => (
  <Svg strokeWidth="2.4" {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Svg>
)

export const CloseIcon = (p: IconProps) => (
  <Svg strokeWidth="2.4" {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </Svg>
)

export const CreditIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M6 12h.01M18 12h.01" />
  </Svg>
)

export const DocumentIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5M10 12h5M10 16h5" />
  </Svg>
)

export const UserIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="12" cy="10" r="3.2" />
    <path d="M5.8 18.5c1.4-2.6 3.6-3.8 6.2-3.8s4.8 1.2 6.2 3.8" />
  </Svg>
)

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </Svg>
)

export const PasswordIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5H5.5A1.5 1.5 0 0 0 4 6.5v12A1.5 1.5 0 0 0 5.5 20h12a1.5 1.5 0 0 0 1.5-1.5V12" />
    <path d="M17.5 3.5l3 3L12 15H9v-3z" />
  </Svg>
)

export const ReferIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 9.5L7 7l5 2.5L17 7l4.5 2.5" />
    <path d="M7 7v7l5 3.5 5-3.5V7" />
    <path d="M12 9.5V17.5" />
  </Svg>
)

export const LogoutIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 4H5.5A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20H10" />
    <path d="M14 8l4 4-4 4M18 12H9" />
  </Svg>
)

export const MaleIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10" cy="14" r="5" />
    <path d="M13.5 10.5L20 4M14.5 4H20v5.5" />
  </Svg>
)

export function Logo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span data-part="vex">VEX</span>
      <span data-part="cash">CASH</span>
      <sup data-part="mark">®</sup>
    </span>
  )
}
