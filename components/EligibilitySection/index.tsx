'use client';

import { useEffect } from 'react';

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
    <section className="bg-white py-10 md:py-14 text-center" id="eligibilite">
      <div className="max-w-285 mx-auto px-5">
        {/* Widget d'avis Trustindex */}
        <div id="trustindex-eligibility"></div>
      </div>
    </section>
  );
}
