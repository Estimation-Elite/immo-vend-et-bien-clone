'use client';

import { useEffect } from 'react';

export default function Navbar() {
  useEffect(() => {
    const container = document.getElementById('trustindex-navbar');
    if (!container) return;
    // Avoid loading twice
    if (container.querySelector('script')) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?ba912c75057c420761467bbcd77';
    script.defer = true;
    script.async = true;
    container.appendChild(script);
  }, []);

  return (
    <nav className="absolute top-0 left-0 w-full z-999 px-2.5 py-1.5 flex items-center justify-center md:px-2.5 md:py-2 lg:px-10 lg:py-2 md:justify-between">
      <div>
        <a href="#">
          <img
            src="/images/logo-horizontal.png"
            alt="Vend & Bien"
            className="max-w-65 md:max-w-85 lg:max-w-110 w-full h-auto"
          />
        </a>
      </div>
      <div className="hidden md:block" id="trustindex-navbar"></div>
    </nav>
  );
}
