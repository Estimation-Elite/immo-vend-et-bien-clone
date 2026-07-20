'use client';

/**
 * Accélérateur de conversion réutilisé « tout au long du site » :
 * rareté (places limitées) + preuve sociale live (visiteurs en ligne).
 * Placé à plusieurs points de la page pour relancer l'urgence au scroll.
 */
export default function LiveAccelerator({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <span className="inline-flex items-center gap-2 rounded-full border-2 border-(--color-orange) bg-white/90 px-4 py-1.5">
        <span className="w-2 h-2 rounded-full bg-(--color-orange) animate-pulse" aria-hidden="true" />
        <span className="font-[effra,Roboto,sans-serif] text-[13px] md:text-[14px] font-bold uppercase tracking-[0.5px] text-(--color-orange)">
          Offre limitée : 8 places disponibles
        </span>
      </span>
      <p className="font-[effra,Roboto,sans-serif] text-[11px] text-(--color-dark)/50 m-0">
        13 visiteurs en ligne
      </p>
    </div>
  );
}
