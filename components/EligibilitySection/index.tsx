'use client';

import { useEffect } from 'react';
import CTAButton from '@/components/CTAButton';

export default function EligibilitySection() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?13b4318507bb4209bc2699f24b0';
    script.defer = true;
    script.async = true;
    const container = document.getElementById('trustindex-eligibility');
    if (container) container.appendChild(script);
  }, []);

  return (
    <section className="bg-white py-15 md:py-20 text-center" id="eligibilite">
      <div className="max-w-285 mx-auto px-5">
        <h2 className="font-[arista-pro,Roboto,sans-serif] text-[24px] md:text-[32px] text-(--color-dark) mb-12">
          Vérifiez en 1 clic si vous êtes éligible à notre garantie
        </h2>
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div
            className="flex-1 min-h-70 md:min-h-100 relative rounded-lg overflow-hidden bg-cover bg-center flex flex-col items-center justify-center p-10 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            style={{ backgroundImage: `url('/images/eligibility/maison.jpg')` }}
          >
            <div className="absolute inset-0 bg-black/50 z-0"></div>
            <div className="relative z-1 flex flex-col items-center gap-5">
              <h3 className="font-[arista-pro,Roboto,sans-serif] text-[32px] text-white m-0">J&apos;ai une maison</h3>
              <CTAButton size="small">Je vérifie l&apos;éligibilité de mon bien</CTAButton>
            </div>
          </div>
          <div
            className="flex-1 min-h-70 md:min-h-100 relative rounded-lg overflow-hidden bg-cover bg-center flex flex-col items-center justify-center p-10 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            style={{ backgroundImage: `url('/images/eligibility/appartement.jpg')` }}
          >
            <div className="absolute inset-0 bg-black/50 z-0"></div>
            <div className="relative z-1 flex flex-col items-center gap-5">
              <h3 className="font-[arista-pro,Roboto,sans-serif] text-[32px] text-white m-0">J&apos;ai un appartement</h3>
              <CTAButton size="small">Je vérifie l&apos;éligibilité de mon bien</CTAButton>
            </div>
          </div>
        </div>
        <div className="mt-6" id="trustindex-eligibility"></div>
      </div>
    </section>
  );
}
