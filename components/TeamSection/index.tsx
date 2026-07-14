'use client';

import CTAButton from '@/components/CTAButton';

// Colonne gauche (desktop) : Manil en haut, Alessia en bas
const leftMembers = [
  { name: 'Manil', src: '/images/agents/manil.jpg' },
  { name: 'Alessia', src: '/images/agents/alessia2.jpg' },
];

// Colonne droite (desktop) : Véronique en haut, Malik en bas
const rightMembers = [
  { name: 'Véronique', src: '/images/agents/veronique.jpg' },
  { name: 'Malik', src: '/images/agents/malik.jpg' },
];

// Ordre visuel mobile (grille 2 colonnes) : Manil, Véronique / Alessia, Malik
const mobileOrder = [leftMembers[0], rightMembers[0], leftMembers[1], rightMembers[1]];

function MemberCard({ name, src }: { name: string; src: string }) {
  return (
    <div className="relative animate-fadeInUp">
      <img
        src={src}
        alt={name}
        className="w-full h-62.5 object-cover object-top border-4 border-[#DE6539]"
        loading="lazy"
      />
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
        <div className="bg-[#DE6539] px-4 py-1.5 whitespace-nowrap">
          <h2 className="font-[Roboto,sans-serif] text-[24px] font-semibold text-white text-center m-0 leading-tight">
            {name}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="pt-16 pb-12 md:pt-20 md:pb-16 relative overflow-visible mb-16">
      {/* V watermark overlay — visible behind content */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/favicon.png)',
          backgroundSize: 'contain',
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="max-w-360 mx-auto px-5 relative z-1">
        {/* Desktop layout: 3 columns */}
        <div className="hidden lg:flex items-center justify-center gap-0">
          {/* Left column: Manil (haut) + Alessia (bas) */}
          <div className="flex flex-col gap-37.5 w-65 shrink-0">
            {leftMembers.map((member) => (
              <MemberCard key={member.name} {...member} />
            ))}
          </div>

          {/* Center column: Logo + Text + CTA */}
          <div className="flex flex-col items-center justify-center text-center gap-4 max-w-132.5 flex-1 py-40 px-8">
            <img
              src="/images/logo-horizontal.png"
              alt="Vend & Bien"
              className="w-full max-w-115 h-auto"
            />
            <p className="font-[effra,Roboto,sans-serif] text-[28px] text-[#58595b] leading-[1.2] m-0">
              Votre projet immobilier,{' '}
              <strong className="text-(--color-orange)">notre priorité absolue&nbsp;!</strong>
            </p>
            <CTAButton>Je vérifie l&apos;éligibilité de mon bien</CTAButton>
          </div>

          {/* Right column: Véronique (haut) + Malik (bas) */}
          <div className="flex flex-col gap-37.5 w-68.75 shrink-0">
            {rightMembers.map((member) => (
              <MemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>

        {/* Mobile layout: stacked */}
        <div className="flex flex-col items-center gap-6 lg:hidden">
          {/* Center content first on mobile */}
          <div className="flex flex-col items-center text-center gap-4 max-w-100">
            <img
              src="/images/logo-horizontal.png"
              alt="Vend & Bien"
              className="w-full max-w-75 h-auto"
            />
            <p className="font-[effra,Roboto,sans-serif] text-[22px] text-[#58595b] leading-[1.2] m-0">
              Votre projet immobilier,{' '}
              <strong className="text-(--color-orange)">notre priorité absolue&nbsp;!</strong>
            </p>
            <CTAButton>Je vérifie l&apos;éligibilité de mon bien</CTAButton>
          </div>

          {/* Team members grid on mobile — ordre : Manil, Véronique / Alessia, Malik */}
          <div className="grid grid-cols-2 gap-4 gap-y-8 w-full max-w-100">
            {mobileOrder.map((member) => (
              <MemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
