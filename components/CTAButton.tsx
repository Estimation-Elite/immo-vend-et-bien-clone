'use client';

const base = 'font-[effra,Roboto,sans-serif] font-semibold cursor-pointer no-underline inline-block transition-colors duration-200';

const variants = {
  orange: 'bg-(--color-orange) text-white! no-underline! hover:bg-[#5D8D96] hover:text-white',
  'orange-warm': 'bg-(--color-orange) text-white! no-underline! hover:bg-[#c9552e] hover:text-white',
  dark: 'bg-(--color-dark) text-white! no-underline! hover:bg-[#5D8D96] hover:text-white',
  white: 'bg-white !text-(--color-orange) no-underline! border-2 border-white hover:bg-[#5D8D96] hover:!text-white hover:border-[#5D8D96]',
  outline: 'bg-transparent border-2 border-(--color-orange) !text-(--color-orange) no-underline! hover:bg-(--color-orange) hover:!text-white',
} as const;

const sizes = {
  default: 'text-[20px] px-7 py-3.5 rounded-none',
  small: 'text-[17px] px-7 py-3.5 rounded-none',
  pill: 'text-[20px] px-7 py-5 rounded-full',
  'pill-sm': 'text-[18px] px-7 py-4 rounded-full',
} as const;

interface CTAButtonProps {
  as?: 'a' | 'button';
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export default function CTAButton({
  as = 'a',
  variant = 'orange',
  size = 'default',
  href = '#header-form',
  type,
  disabled,
  className = '',
  children,
  onClick,
}: CTAButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`;

  if (as === 'button') {
    return (
      <button
        type={type || 'button'}
        disabled={disabled}
        onClick={onClick as (e: React.MouseEvent<HTMLButtonElement>) => void}
        className={classes}
      >
        {children}
      </button>
    );
  }

  // L'ancre #header-form n'héberge plus de formulaire : les CTA par défaut
  // ouvrent la modale de contact globale (écoutée par StickyMobileCTA).
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      (onClick as (e: React.MouseEvent<HTMLAnchorElement>) => void)(e);
      return;
    }
    if (href === '#header-form') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-contact-form'));
    }
  };

  return (
    <a href={href} onClick={handleAnchorClick} className={classes}>
      {children}
    </a>
  );
}
