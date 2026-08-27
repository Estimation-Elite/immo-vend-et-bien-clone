'use client';

import CTAButton from '@/components/CTAButton';

interface Review {
  name: string;
  date: string;
  text: string;
}

// Avis clients (remplace l'ancien widget Trustindex). À compléter / mettre à jour
// avec les vrais avis Google fournis par le client.
const REVIEWS: Review[] = [
  {
    name: 'Bryan Cossard',
    date: '20/04/2025',
    text: "J'ai vendu ma maison via l'agence Vend & Bien. Grâce à Alessia et son grand réseau d'acheteurs, nous avons trouvé un acquéreur rapidement et au prix convenu.",
  },
  {
    name: 'Emmanuelle Devarenne-Charpentier',
    date: '03/04/2025',
    text: "Des personnes à votre écoute, très bon contact, efficacité dans les échanges suite aux visites et accompagnement tout au long de la vente.",
  },
  {
    name: 'Sébastien Lefèvre',
    date: '18/03/2025',
    text: "Accompagnement au top du début à la fin. Vente réalisée en moins de 30 jours, je recommande vivement toute l'équipe Vend & Bien.",
  },
];

function GoogleLogo({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

const STAR_POINTS = '12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26';

function StarIcon({ size = 18, state = 'full', emptyColor = 'rgba(255,255,255,0.4)' }: { size?: number; state?: 'full' | 'half' | 'empty'; emptyColor?: string }) {
  if (state === 'half') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stopColor="#FBBC05" />
            <stop offset="50%" stopColor={emptyColor} />
          </linearGradient>
        </defs>
        <polygon points={STAR_POINTS} fill="url(#halfStar)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <polygon points={STAR_POINTS} fill={state === 'full' ? '#FBBC05' : emptyColor} />
    </svg>
  );
}

function Stars({ value = 5, size = 18, emptyColor }: { value?: number; size?: number; emptyColor?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Note ${value.toString().replace('.', ',')} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const state = value >= i ? 'full' : value > i - 1 ? 'half' : 'empty';
        return <StarIcon key={i} size={size} state={state} emptyColor={emptyColor} />;
      })}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');
}

export default function TestimonialsSection() {
  return (
    <section className="bg-(--color-orange) py-12 md:py-20 text-center">
      <div className="max-w-285 mx-auto px-5">
        <h2 className="font-[arista-pro,Roboto,sans-serif] text-[30px] md:text-[42px] text-white mt-0 mb-3">
          Ils t&eacute;moignent de nos succ&egrave;s !
        </h2>
        <p className="font-[effra,Roboto,sans-serif] text-[17px] md:text-[20px] text-white mb-6">
          98% de nos clients satisfaits par nos conseillers, alors pourquoi pas vous ?
        </p>

        {/* Résumé de la note (Google agrandi, "98% satisfaits", dernière étoile à moitié) */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <GoogleLogo size={44} />
          <div className="text-left leading-tight">
            <p className="font-[effra,Roboto,sans-serif] text-[20px] md:text-[24px] font-bold text-white m-0">
              98% satisfaits
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <Stars value={4.5} size={22} />
              <span className="font-[effra,Roboto,sans-serif] text-[14px] text-white/90">4,8/5</span>
            </div>
          </div>
        </div>

        {/* 3 avis centrés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8 max-w-[1000px] mx-auto">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white rounded-xl p-5 text-left shadow-[0_6px_20px_rgba(0,0,0,0.12)] flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 shrink-0 rounded-full bg-(--color-orange)/10 text-(--color-orange) font-bold flex items-center justify-center font-[effra,Roboto,sans-serif]">
                  {initials(r.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-[effra,Roboto,sans-serif] font-semibold text-[15px] text-(--color-dark) truncate m-0">{r.name}</p>
                  <p className="font-[effra,Roboto,sans-serif] text-[12px] text-gray-400 m-0">{r.date}</p>
                </div>
                <GoogleLogo size={20} />
              </div>
              <Stars value={5} size={16} emptyColor="#e2e2e2" />
              <p className="font-[effra,Roboto,sans-serif] text-[14px] text-[#525252] mt-2 leading-snug m-0">
                {r.text}
              </p>
            </div>
          ))}
        </div>

        <CTAButton variant="white" opensForm location="testimonials">Je vérifie l&apos;éligibilité de mon bien</CTAButton>
      </div>
    </section>
  );
}
