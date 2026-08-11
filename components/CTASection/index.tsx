'use client';

import { useEffect, useRef } from 'react';
import type { AnimationItem } from 'lottie-web';
import CTAButton from '@/components/CTAButton';

export default function CTASection() {
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: AnimationItem | undefined;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && lottieRef.current) {
          const lottie = (await import('lottie-web')).default;
          animation = lottie.loadAnimation({
            container: lottieRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://lottie.host/9486f40c-c601-4545-a71f-df0a82c3fcdd/7pg2tZa6dg.json',
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
    <section className="bg-white py-12 md:py-20 lg:py-32 relative overflow-x-clip text-center">
      <div className="max-w-285 mx-auto px-5 relative z-2">
        <h2 className="w-full md:w-[90%] mx-auto mb-3 font-[effra,Roboto,sans-serif] text-[22px] md:text-[28px] text-(--color-dark) leading-normal">
          Nous vendons votre bien dans{' '}
          <span className="text-[#DE6539]">les 30 prochains jours</span>, au{' '}
          <span className="text-[#DE6539]">prix convenu.</span>
        </h2>
        <p className="font-[effra,Roboto,sans-serif] text-[22px] text-[var(--color-gray)] mb-6">
          Sinon, jusqu&apos;à <strong>100% des honoraires offerts</strong>.
        </p>
        <div className="w-[300px] mx-auto mb-6" ref={lottieRef}></div>
        <div className="flex flex-col items-center gap-3">
          <CTAButton
            as="button"
            variant="orange-warm"
            opensForm
            location="cta_section"
          >
            EN SAVOIR PLUS
          </CTAButton>
          <span className="inline-flex items-center gap-2 bg-[#DE6539]/10 text-[#DE6539] font-[effra,Roboto,sans-serif] font-semibold text-[15px] px-4 py-1.5 rounded-full uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#DE6539] animate-pulse" aria-hidden="true"></span>
            Offre limitée&nbsp;: 8 réservations possibles
          </span>
        </div>
      </div>
    </section>
  );
}
