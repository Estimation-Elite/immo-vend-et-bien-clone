'use client';

import { useEffect, useRef } from 'react';


interface Step {
  lottie: string;
  title: string;
  text: string;
}

const steps: Step[] = [
  {
    lottie: 'https://lottie.host/b0cd9abb-0ad5-4a85-93da-a4f6edc7f92f/LDQNV5wFuK.json',
    title: 'Votre projet',
    text: 'Parlez de votre projet avec un conseiller & découvrez notre garantie vendeur à 30 jours.',
  },
  {
    lottie: 'https://lottie.host/398fb822-80c6-456e-b0aa-16db0e40e5c7/sR0EyLKKhx.json',
    title: 'Prix de vente optimal',
    text: 'Bénéficiez de notre Triple Estimation & maximisez la valeur de votre bien.',
  },
  {
    lottie: 'https://lottie.host/624aef38-a7c3-4371-892a-1c3be7c7fed6/bb6DWwEOlS.json',
    title: 'Réseaux d\u2019acquéreurs',
    text: 'Validez notre plan d\u2019action de vente & activez notre réseau d\u2019acquéreurs exclusifs.',
  },
  {
    lottie: 'https://lottie.host/f8b5b868-ef2c-4cb7-a722-d49a265d85b5/ViLARkuAgj.json',
    title: 'Souriez, c\'est vendu !',
    text: 'Ouvrez la porte de votre nouveau projet immobilier\u2026',
  },
];

/* Arrow config: side alternates left/right, each has a specific rotation */
const arrowConfigs = [
  { side: 'left', transform: 'rotate(-30deg)' },
  { side: 'right', transform: 'rotate(30deg) scaleX(-1)' },
  { side: 'left', transform: 'rotate(-30deg)' },
] as const;

function HandDrawnArrow({ side, transform }: { side: string; transform: string }) {
  return (
    <div className="relative">
      <div
        className={`
          absolute h-full
          top-12
          ${side === 'left' ? '-left-26' : '-right-26'}
          transition-all duration-700
          -scale-y-100
          `
        }
        style={{ transform: `${transform}` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="90"
          viewBox="0 0 156 156"
          width="90"
          fill="#DE6539"
        >
          <g>
            <path d="m99 32.11c-25.22-10.36-50.8 2-62.67 25.2-12.08 23.62-10.59 54.9 2.06 77.91 2.64 4.79 9.33.59 7.19-4.2-9.34-20.93-11.15-45.7-2-67a47.94 47.94 0 0 1 19.26-22.3c11.25-6.91 23-5.86 35.47-4.79 3 .26 2.99-3.86.69-4.82z" />
            <path d="m126.56 36.18c-10.17-6.91-21-15.32-33.42-17.48a1.75 1.75 0 0 0 -.93 3.37c10.44 4.1 19.32 10.16 28.2 16.77-5.64 4.49-12.15 8.18-17 13.46a2.71 2.71 0 0 0 3.27 4.23 92.87 92.87 0 0 0 20.44-15.75 3 3 0 0 0 -.56-4.6z" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LottieAnimation({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: ReturnType<typeof import('lottie-web').default.loadAnimation> | null = null;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          const lottie = (await import('lottie-web')).default;
          animation = lottie.loadAnimation({
            container: ref.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: url,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (animation) animation.destroy();
    };
  }, [url]);

  return <div ref={ref} className="w-12.5 h-12.5 shrink-0" />;
}

function StepCard({ step }: { step: Step }) {
  return (
    <div
      className="bg-white p-6 shadow-[0_0_20px_-4px_rgba(0,0,0,0.15)] w-full flex gap-5 flex-row items-center"
    >
      <LottieAnimation url={step.lottie} />
      <div className="flex flex-col gap-2">
        <h3 className="font-[arista-pro,Roboto,sans-serif] text-[21px] text-(--color-dark) font-bold m-0">
          {step.title}
        </h3>
        <p className="font-[effra,Roboto,sans-serif] text-[18px] text-[#58595b] m-0 leading-normal">
          {step.text}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-150 overflow-visible"
      style={{
        backgroundImage: 'url(/images/how-it-works/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: '0% 0%',
      }}
    >
      {/* Radial gradient overlay — white fade from bottom right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(at bottom right, #FFFFFF00 48%, #FFFFFF 72%)',
        }}
      />

      <div className="relative z-1 max-w-285 mx-auto px-5 py-15 flex items-center justify-center lg:justify-start">
        {/* Single column — 500px wide, gap 10px, all content stacked */}
        <div className="w-full lg:w-125.25 flex flex-col gap-2.5 justify-center">
          {/* Heading — outside cards */}
          <h2 className="font-[arista-pro,Roboto,sans-serif] text-[26px] md:text-[36px] text-(--color-dark) m-0 mb-2">
            Comment ça marche ?
          </h2>

          {/* Steps + Arrows — all siblings */}
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-2.5">
              <StepCard step={step} />
              {i < steps.length - 1 && arrowConfigs[i] && (
                <HandDrawnArrow
                  side={arrowConfigs[i].side}
                  transform={arrowConfigs[i].transform}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
