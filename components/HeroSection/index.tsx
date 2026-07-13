'use client';

import { useRef, useState, useCallback } from 'react';
import ContactForm from '@/components/ContactForm';

export default function HeroSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

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
      className="relative z-1 min-h-screen md:min-h-[90vh] bg-cover bg-center
      pt-25 pb-2.5 px-5 md:pt-37.5 md:pb-30 md:px-5 lg:pt-50 lg:pb-50 lg:px-50 overflow-hidden text-center
      before:bg-white/82 before:absolute before:inset-0 before:z-[-1] before:content-['']
      "
      style={{ backgroundImage: "url('/images/hero/bg.jpg')" }}
      id="header-form"
    >
      {/* min(100%, 1140px) */}
      <div className="relative z-1 mx-auto flex flex-col items-center gap-4">
        <div className="font-[effra,Roboto,sans-serif] text-[25px] md:text-[30px] lg:text-[35px] font-semibold uppercase bg-(--color-orange) text-white inline-block px-3.75 py-1.25 animate-fadeInDownSmall">
          Reims &amp; Épernay
        </div>
        <h1 className="font-[arista-pro,Roboto,sans-serif] text-[30px] md:text-[40px] lg:text-[48px] text-(--color-dark) m-0 leading-[1.2]">
          Nous vendons votre bien<br className="hidden md:inline" />
          {' '}<span className="text-(--color-orange)">en 30 jours</span> et <span className="text-(--color-orange)">au prix convenu</span>
        </h1>
        <p className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[18px] lg:text-[20px] text-(--color-dark) m-0">
          Sinon jusqu&apos;à <strong>100% des honoraires offerts</strong>
        </p>
        <ContactForm />
        <div ref={trustindexMobileRef} className="mt-4 md:hidden" />
      </div>

      {/* Vidéo / bouton découvrir */}
      <div
        className="mt-6 mx-auto relative w-full max-w-[min(100%, 1140px)] cursor-pointer overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.15)]"
        onClick={!playing ? handlePlay : undefined}
      >
        {!playing && (
          <>
            <img
              src="/images/hero/video-cover.png"
              alt="Découvrir Vend & Bien"
              className="w-full block"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/18">
              <div className="w-20 h-20 bg-(--color-orange) rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(222,101,57,0.5)] transition-transform duration-200 hover:scale-[1.08]">
                <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <span className="font-[effra,Roboto,sans-serif] text-[13px] font-bold text-white uppercase tracking-[1.5px]">
                Cliquez pour découvrir
              </span>
            </div>
          </>
        )}
        <video
          ref={videoRef}
          src="https://www.immovendetbien.com/wp-content/uploads/2025/09/Pitch-Vend-Bien.mp4"
          controls={playing}
          className={`w-full ${playing ? 'block' : 'hidden'}`}
        />
      </div>
    </section>
  );
}
