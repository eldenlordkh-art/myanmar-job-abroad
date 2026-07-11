interface SealProps {
  size?: number;
  className?: string;
  spin?: boolean;
}

export default function Seal({ size = 32, className = "", spin = false }: SealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={`${spin ? "animate-seal-spin" : ""} ${className}`}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18.5" className="fill-brand-600 dark:fill-brand-500" />
      <circle cx="20" cy="20" r="17.5" strokeDasharray="1.6 2.2" strokeWidth="1" className="stroke-gold-300" />
      <circle cx="20" cy="20" r="13" strokeWidth="0.75" className="stroke-gold-200/60" fill="none" />
    </svg>
  );
}
