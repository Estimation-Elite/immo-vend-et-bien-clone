'use client';

import { useEffect, useRef } from 'react';

export default function CTASection() {
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
    <section className="bg-white py-15 md:py-25 lg:py-50 relative overflow-x-clip text-center">
      <img
        src="/images/agents/alessia-full2.png"
        alt=""
        className="hidden lg:block absolute left-0 bottom-0 h-3/4 max-h-145 z-1 object-contain object-[bottom_left]"
        aria-hidden="true"
      />
      <div className="max-w-285 mx-auto px-5 relative z-2">
        <h2 className="w-full md:w-[90%] mx-auto mb-4 font-[effra,Roboto,sans-serif] text-[20px] md:text-[25px] text-(--color-dark) leading-normal">
          Nous vendons votre bien dans{' '}
          <span className="text-[#DE6539]">les 30 prochains jours</span>, au{' '}
          <span className="text-[#DE6539]">prix convenu.</span>
        </h2>
        <p className="font-[effra,Roboto,sans-serif] text-[20px] text-[var(--color-gray)] mb-10">
          Sinon, jusqu&apos;à <strong>100% des honoraires offerts</strong>.
        </p>
        <div className="w-[300px] mx-auto mb-10" ref={lottieRef}></div>
      </div>
      <img
        src="/images/agents/sebastien-full2.png"
        alt=""
        className="hidden lg:block absolute right-0 bottom-0 h-3/4 max-h-145 z-1 object-contain object-[bottom_right]"
        aria-hidden="true"
      />
    </section>
  );
}
