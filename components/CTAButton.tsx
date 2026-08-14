'use client';

import Link from 'next/link';
import { usePageVariant } from '@/components/PageVariant';
import { trackRdvCtaClick } from '@/lib/analytics/trackRdvCtaClick';

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
  /**
   * Marque ce CTA comme "ouvre le formulaire de contact" (capture de lead).
   * En variante landing : ouvre la modale de contact.
   * En variante lead (/video) : affiche "Prendre rendez-vous" et redirige vers /confirmation.
   */
  opensForm?: boolean;
  /** Emplacement du CTA, poussé dans l'événement GTM rdv_cta_click (variante lead). */
  location?: string;
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
  opensForm,
  location = 'cta',
}: CTAButtonProps) {
  const pageVariant = usePageVariant();

  // Un CTA "ouvre le formulaire" soit explicitement (opensForm), soit par défaut
  // (ancre pointant vers #header-form sans onClick personnalisé — comportement historique).
  const isFormOpener =
    opensForm === true || (as === 'a' && href === '#header-form' && !onClick && opensForm !== false);

  // Libellé unifié de TOUS les CTA d'ouverture de formulaire, selon la page :
  // - landing (avant le formulaire) : "En savoir plus en VIDÉO"
  // - lead (/video, après le formulaire) : "Prendre rendez-vous"
  const formOpenerLabel =
    pageVariant === 'lead' ? 'Prendre rendez-vous' : 'En savoir plus en VIDÉO';
  const content = isFormOpener ? formOpenerLabel : children;

  // Ces libellés peuvent être longs : on autorise le retour à la ligne et on borne la largeur.
  const formOpenerExtra = isFormOpener
    ? ' whitespace-normal text-center leading-snug max-w-[min(100%,26rem)]'
    : '';
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}${formOpenerExtra}`;

  // En variante lead, tout CTA d'ouverture de formulaire devient un CTA "Prendre rendez-vous".
  if (isFormOpener && pageVariant === 'lead') {
    const handleLeadClick = (e: React.MouseEvent) => {
      trackRdvCtaClick(location);
      if (onClick) onClick(e);
    };
    return (
      <Link href="/confirmation" onClick={handleLeadClick} className={classes}>
        {content}
      </Link>
    );
  }

  const openContactForm = () => window.dispatchEvent(new CustomEvent('open-contact-form'));

  if (as === 'button') {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isFormOpener && !onClick) {
        openContactForm();
        return;
      }
      (onClick as ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined)?.(e);
    };
    return (
      <button
        type={type || 'button'}
        disabled={disabled}
        onClick={handleButtonClick}
        className={classes}
      >
        {content}
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
    if (isFormOpener) {
      e.preventDefault();
      openContactForm();
    }
  };

  return (
    <a href={href} onClick={handleAnchorClick} className={classes}>
      {content}
    </a>
  );
}
