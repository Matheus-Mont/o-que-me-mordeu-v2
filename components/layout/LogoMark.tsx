interface Props {
  size?: number;
}

export default function LogoMark({ size = 36 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="64" height="64" rx="16" fill="#132821" />
      <path
        d="M22 25c0-8 6.5-14 14.5-13 6.5.9 11.3 6 10.8 12-.5 5.4-4.8 8-8.6 10.2-3.2 1.9-5.4 3.8-5.4 8"
        stroke="#F0BF52"
        strokeWidth="5.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="31.5" cy="49.5" r="3.4" fill="#F2543C" />
      <circle cx="40.5" cy="45" r="2.3" fill="#F2543C" opacity="0.85" />
    </svg>
  );
}
