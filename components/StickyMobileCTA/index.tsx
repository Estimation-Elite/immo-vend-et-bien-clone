'use client';

import { useEffect, useState } from 'react';
import CTAButton from '@/components/CTAButton';
import ContactForm from '@/components/ContactForm';
import { usePageVariant } from '@/components/PageVariant';

export default function StickyMobileCTA() {
  const variant = usePageVariant();
  const isLead = variant === 'lead';
  const [open, setOpen] = useState(false);

  // Ouverture / fermeture depuis d'autres sections via CustomEvent (variante landing uniquement)
  useEffect(() => {
    if (isLead) return;
    const openHandler = () => setOpen(true);
    const closeHandler = () => setOpen(false);
    window.addEventListener('open-contact-form', openHandler);
    window.addEventListener('close-contact-form', closeHandler);
    return () => {
      window.removeEventListener('open-contact-form', openHandler);
      window.removeEventListener('close-contact-form', closeHandler);
    };
  }, [isLead]);

  // Fermeture à la touche Escape + blocage du scroll de la page
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Variante lead (/video) : barre fixe "Prendre rendez-vous" → /confirmation, sans modale
  if (isLead) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-1000 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] px-4 py-3 flex justify-center">
        <CTAButton
          variant="orange-warm"
          size="pill-sm"
          opensForm
          location="sticky"
          className="w-full max-w-100 text-center uppercase tracking-[1px] font-bold"
        >
          Prendre rendez-vous
        </CTAButton>
      </div>
    );
  }

  return (
    <>
      {/* Barre fixe en bas de page (tous formats) */}
      <div className="fixed bottom-0 left-0 right-0 z-1000 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] px-4 py-3 flex justify-center">
        <CTAButton
          as="button"
          variant="orange-warm"
          size="pill-sm"
          onClick={() => setOpen(true)}
          className="w-full max-w-100 text-center uppercase tracking-[1px] font-bold"
        >
          En savoir plus
        </CTAButton>
      </div>

      {/* Modale formulaire de contact */}
      {open && (
        <div
          className="fixed inset-0 z-1001 bg-black/60 overflow-y-auto"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Formulaire de contact"
        >
          <div className="min-h-full flex items-start justify-center px-4 py-10 md:py-16">
            <div
              className="relative w-full max-w-175"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="absolute -top-4 -right-2 md:-right-4 z-10 w-10 h-10 rounded-full bg-(--color-orange) text-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-[#c9552e] transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
