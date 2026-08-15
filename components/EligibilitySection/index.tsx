// Note Google statique (remplace l'ancien widget Trustindex).
export default function EligibilitySection() {
  return (
    <section className="bg-white pt-2 pb-10 md:pb-14 text-center" id="eligibilite">
      <div className="max-w-285 mx-auto px-5 flex justify-center">
        <div className="inline-flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.10)]">
          {/* Logo Google */}
          <svg viewBox="0 0 24 24" width="46" height="46" aria-hidden="true" className="shrink-0">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <div className="text-left">
            <p className="font-[effra,Roboto,sans-serif] text-[17px] md:text-[19px] font-bold text-(--color-dark) m-0">
              Service le mieux not&eacute; 2026
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-[effra,Roboto,sans-serif] text-[18px] font-bold text-(--color-dark)">4,8</span>
              <span className="inline-flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" width="20" height="20" fill="#FBBC05" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
