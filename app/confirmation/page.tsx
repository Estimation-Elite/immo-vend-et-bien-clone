'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import AppointmentPicker from '@/components/AppointmentPicker';

interface ContactData {
  nom: string;
  telephone: string;
  email: string;
}

function getInitialData(): ContactData {
  if (typeof window === 'undefined') return { nom: '', telephone: '', email: '' };
  try {
    const raw = sessionStorage.getItem('contactData');
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        nom: parsed.nom || '',
        telephone: parsed.telephone || '',
        email: parsed.email || '',
      };
    }
  } catch { /* ignore */ }
  return { nom: '', telephone: '', email: '' };
}

export default function ConfirmationPage() {
  const [data] = useState<ContactData>(getInitialData);
  const [pickerStep, setPickerStep] = useState<'calendar' | 'slots' | 'phone' | 'done'>('calendar');

  // Progression : calendrier direct → horaire → confirmation du téléphone → RDV confirmé.
  const progress =
    pickerStep === 'calendar'
      ? { width: '25%', pct: '25%', label: 'Choisir une date' }
      : pickerStep === 'slots'
        ? { width: '50%', pct: '50%', label: 'Choisir un horaire' }
        : pickerStep === 'phone'
          ? { width: '75%', pct: '75%', label: 'Confirmer le téléphone' }
          : { width: '100%', pct: '100%', label: 'Rendez-vous confirmé !' };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-10 px-5 py-5 md:px-10">
        <div className='relative max-w-235 w-full mx-auto flex items-center justify-center'>
          <Link href="/">
            <img
              src="/images/logo-horizontal.png"
              alt="Vend & Bien"
              className="max-w-55 md:max-w-70 h-auto"
            />
          </Link>
          <CTAButton
            variant="orange"
            size="small"
            href="tel:0326046310"
            className="hidden md:absolute right-5 md:right-0"
          >
            Des questions ?
          </CTAButton>
        </div>
      </header>

      {/* Contenu principal */}
      <main
        className="flex-1 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero/bg.jpg')" }}
      >
        {/* Overlay clair */}
        <div className="absolute inset-0 bg-white/75" />

        <div className="relative min-h-screen max-w-235 mx-auto flex flex-col lg:flex-row gap-20 items-stretch">
          {/* Colonne gauche */}
          <div className="flex-1 flex flex-col justify-center pt-28 pb-10 lg:pt-32 lg:pb-16">
            {/* Trustindex badge */}
            <div className="bg-white rounded-lg px-4 py-3 inline-flex items-center gap-3 mb-8 self-start shadow-md">
              <svg viewBox="0 0 24 24" width="28" height="28" className="shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-[effra,Roboto,sans-serif] font-bold text-[15px] text-(--color-dark)">4.8</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" width="14" height="14" fill="#F4B400">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="font-[effra,Roboto,sans-serif] text-[13px] font-semibold text-(--color-dark) m-0">Service le mieux not&eacute;</p>
                <p className="font-[effra,Roboto,sans-serif] text-[11px] text-[#8c8c8c] m-0">certifi&eacute; par: Trustindex</p>
              </div>
            </div>

            {/* Barre de progression (dynamique selon l'étape) */}
            <div className="mb-8 max-w-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-[effra,Roboto,sans-serif] text-[13px] font-semibold text-(--color-dark)">
                  {progress.label}
                </span>
                <span className="font-[effra,Roboto,sans-serif] text-[13px] font-bold text-(--color-orange)">
                  {progress.pct}
                </span>
              </div>
              <div className="relative h-2.5 bg-black/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-(--color-orange) rounded-full transition-all duration-500 ease-out"
                  style={{ width: progress.width }}
                />
              </div>
            </div>

            {/* Texte principal */}
            <h1 className="font-[arista-pro,Roboto,sans-serif] text-[28px] md:text-[36px] leading-tight mb-6">
              <span className="text-(--color-orange)">C&apos;est parti !</span>{' '}
              <span className="text-(--color-dark)">Nous allons vous accompagner &agrave; chaque &eacute;tape.</span>
            </h1>

            <p className="font-[effra,Roboto,sans-serif] text-[20px] text-(--color-dark) font-bold italic mb-4">
              Prochaine &eacute;tape ?
            </p>

            <p className="font-[effra,Roboto,sans-serif] text-[16px] md:text-[18px] text-(--color-dark) leading-relaxed max-w-lg">
              R&eacute;servez d&egrave;s maintenant <strong>votre appel d&eacute;couverte</strong> avec l&apos;un de nos conseillers.
            </p>
          </div>

          {/* Colonne droite */}
          <div className="flex-1 flex items-center justify-center pb-10 lg:py-16">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl px-4 py-6">
              <AppointmentPicker contactData={data} onStepChange={setPickerStep} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
