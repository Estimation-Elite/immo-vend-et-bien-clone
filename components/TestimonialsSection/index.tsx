'use client';

import { useEffect } from 'react';
import CTAButton from '@/components/CTAButton';

export default function TestimonialsSection() {
  useEffect(() => {
    const container = document.getElementById('trustindex-testimonials');
    if (!container) return;
    // Avoid loading twice
    if (container.querySelector('script')) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?71afdad303093508a086ca123cd';
    script.defer = true;
    script.async = true;
    container.appendChild(script);
  }, []);

  return (
    <section className="bg-(--color-orange) py-12 md:py-20 text-center">
      <div className="max-w-285 mx-auto px-5">
        <h2 className="font-[arista-pro,Roboto,sans-serif] text-[30px] md:text-[42px] text-white mt-0 mb-3">
          Ils t&eacute;moignent de nos succ&egrave;s !
        </h2>
        <p className="font-[effra,Roboto,sans-serif] text-[17px] md:text-[20px] text-white mb-8">
          98% de nos clients satisfaits par nos conseillers, alors pourquoi pas vous ?
        </p>
        <div className="mb-8" id="trustindex-testimonials"></div>
        <CTAButton variant="white" opensForm location="testimonials">Je vérifie l&apos;éligibilité de mon bien</CTAButton>
      </div>
    </section>
  );
}
