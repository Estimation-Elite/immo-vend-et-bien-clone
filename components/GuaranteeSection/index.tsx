'use client';

import { useEffect, useRef } from 'react';
import CTAButton from '@/components/CTAButton';

export default function GuaranteeSection() {
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: any;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && lottieRef.current) {
          const lottie = (await import('lottie-web')).default;
          animation = lottie.loadAnimation({
            container: lottieRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://lottie.host/89e0d551-f51b-4e3c-b10d-b183d96d6c7f/PKada3ibfP.json',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (lottieRef.current) observer.observe(lottieRef.current);
    return () => {
      observer.disconnect();
      if (animation) animation.destroy();
    };
  }, []);

  return (
    <section className="bg-(--color-orange) py-15 md:pt-20 md:pb-40 relative overflow-x-clip">
      {/* Decorative team member — Maève left */}
      <img
        src="/images/Maeve-4gg-12-768x1024.png"
        alt=""
        className="hidden lg:block absolute left-28 bottom-0 h-full max-h-140 z-1 object-contain object-[bottom_left]"
        aria-hidden="true"
      />
      {/* Decorative team member — Amina right */}
      <img
        src="/images/agents/amina-full.png"
        alt=""
        className="hidden lg:block absolute right-28 bottom-0 h-full max-h-140 z-1 object-contain object-[bottom_right]"
        aria-hidden="true"
      />
      <div className="max-w-285 mx-auto px-5 text-center relative z-2 flex flex-col items-center gap-2">
        <h2 className="font-[arista-pro,Roboto,sans-serif] text-3xl font-bold md:text-[36px] text-white mx-auto mt-0 leading-[1.3] max-w-175">
          B&eacute;n&eacute;ficiez de notre garantie vendeur <br />&agrave; 30 jours, au meilleur prix
        </h2>
        <div
          className="w-75 md:w-[450px] max-w-full mx-auto"
          ref={lottieRef}
        ></div>
        <CTAButton variant="white">Je vérifie l&apos;éligibilité de mon bien</CTAButton>
      </div>
    </section>
  );
}
