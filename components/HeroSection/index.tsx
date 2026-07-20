'use client';

import { useCallback } from 'react';
import CTAButton from '@/components/CTAButton';

const openContactForm = () => window.dispatchEvent(new CustomEvent('open-contact-form'));

export default function HeroSection() {
  const trustindexMobileRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || node.querySelector('script')) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?ba912c75057c420761467bbcd77';
    script.defer = true;
    script.async = true;
    node.appendChild(script);
  }, []);

  return (
    <section
      className="relative z-1 bg-cover bg-center
      pt-25 pb-18 px-5 md:pt-35 md:pb-30 md:px-5 lg:pt-40 lg:pb-32 lg:px-50 overflow-hidden text-center
      before:bg-white/82 before:absolute before:inset-0 before:z-[-1] before:content-['']
      "
      style={{ backgroundImage: "url('/images/hero/bg.jpg')" }}
      id="header-form"
    >
      {/* min(100%, 1140px) */}
      <div className="relative z-1 mx-auto flex flex-col items-center gap-2.5">
        <div className="font-[effra,Roboto,sans-serif] text-[25px] md:text-[30px] lg:text-[35px] font-semibold uppercase bg-(--color-orange) text-white inline-block px-3.75 py-1.25 animate-fadeInDownSmall">
          Reims &amp; Épernay
        </div>
        <h1 className="font-[arista-pro,Roboto,sans-serif] text-[38px] md:text-[56px] lg:text-[68px] text-(--color-dark) m-0 leading-[1.12]">
          Nous vendons votre bien<br className="hidden md:inline" />
          {' '}<span className="text-(--color-orange)">en 30 jours</span> et <span className="text-(--color-orange)">au prix convenu</span>
        </h1>
        <p className="font-[effra,Roboto,sans-serif] text-[20px] md:text-[22px] text-(--color-dark) m-0 leading-[1.3]">
          ou jusqu&apos;à{' '}
          <strong className="text-[26px] md:text-[28px] lg:text-[30px]">100% des honoraires offerts</strong>
        </p>
        <div className="mt-1 inline-flex items-center gap-2 rounded-full border-2 border-(--color-orange) bg-white/90 px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-(--color-orange) animate-pulse" aria-hidden="true" />
          <span className="font-[effra,Roboto,sans-serif] text-[13px] md:text-[14px] font-bold uppercase tracking-[0.5px] text-(--color-orange)">
            Offre limitée : 8 places disponibles
          </span>
        </div>
        <p className="font-[effra,Roboto,sans-serif] text-[11px] text-(--color-dark)/50 m-0">
          13 visiteurs en ligne
        </p>
        <div ref={trustindexMobileRef} className="mt-2 md:hidden" />
      </div>

      {/* Vidéo verrouillée : accessible uniquement après saisie des coordonnées */}
      <button
        type="button"
        onClick={openContactForm}
        aria-label="Remplir le formulaire pour accéder à la vidéo"
        className="group mt-4 mx-auto relative block w-full max-w-[min(100%, 1140px)] cursor-pointer overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.15)]"
      >
        <img
          src="/images/hero/video-cover.png"
          alt=""
          aria-hidden="true"
          className="w-full block scale-105 blur-[6px]"
        />
        <span className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-(--color-orange) flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </span>
          <span className="font-[arista-pro,Roboto,sans-serif] text-white text-[20px] md:text-[26px] leading-tight max-w-md">
            Consultez notre vidéo en rentrant vos coordonnées
          </span>
          <span className="font-[effra,Roboto,sans-serif] text-white/80 text-[13px] md:text-[15px] uppercase tracking-[1px]">
            Cliquez pour débloquer &#9654;
          </span>
        </span>
      </button>

      {/* CTA sous la vidéo */}
      <div className="relative z-1 mt-4 flex justify-center">
        <CTAButton
          as="button"
          variant="orange-warm"
          size="pill"
          onClick={openContactForm}
          className="uppercase tracking-[1px] font-bold px-12"
        >
          En savoir plus
        </CTAButton>
      </div>
    </section>
  );
}
