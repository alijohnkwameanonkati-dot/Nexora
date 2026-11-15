interface LogoMarkProps {
  tone?: 'light' | 'dark';
}

export function LogoMark({ tone = 'dark' }: LogoMarkProps) {
  const textColor = tone === 'light' ? 'text-white' : 'text-slate-900';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="28" height="28" rx="7" fill="#0F172A" />
        <rect x="0.75" y="0.75" width="26.5" height="26.5" rx="6.25" stroke="#3B82F6" strokeOpacity="0.45" strokeWidth="1.5" />
        <path
          d="M8.5 20V8L19.5 20V8"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 8L21.5 8"
          stroke="#3B82F6"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-display text-[17px] font-bold tracking-tight whitespace-nowrap shrink-0 ${textColor}`}>
        Nexora Digital
      </span>
    </span>
  );
}
