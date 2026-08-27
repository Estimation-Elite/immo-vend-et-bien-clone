import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#5D8D96] pt-12 pb-28 px-5 text-center">
      <div className="max-w-285 mx-auto flex flex-col items-center gap-5">
        <Link href="/">
          <img
            src="/images/logo-white-horizontal.png"
            alt="Vend & Bien"
            className="max-w-65 h-auto"
          />
        </Link>
        <p className="font-[effra,Roboto,sans-serif] text-[14px] text-white/80 m-0">Tous droits réservés – Vend&amp;Bien – 2025</p>
        <nav className="flex gap-4 md:gap-6 flex-wrap justify-center">
          <Link href="/honoraires" className="font-[effra,Roboto,sans-serif] text-[14px] text-white/90! no-underline hover:underline hover:text-white">Honoraires</Link>
          <Link href="/mentions-legales" className="font-[effra,Roboto,sans-serif] text-[14px] text-white/90! no-underline hover:underline hover:text-white">Mentions légales</Link>
          <Link href="/declaration-de-confidentialite-ue" className="font-[effra,Roboto,sans-serif] text-[14px] text-white/90! no-underline hover:underline hover:text-white">Politique de confidentialité</Link>
        </nav>
        {/* Bas de footer : crédit à gauche, coordonnées en bas à droite */}
        <div className="w-full border-t border-white/20 pt-6 mt-2 flex flex-col md:flex-row md:justify-between md:items-end gap-5">
          <span className="flex gap-2 flex-nowrap items-center justify-center md:justify-start text-white text-sm whitespace-nowrap order-2 md:order-1">
            <span className="flex gap-2 flex-nowrap items-center whitespace-nowrap">
              Développé avec <Heart className="w-4 h-4 fill-red-400 text-red-400" /> par
            </span>
            <a
              href="https://www.artech-group.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white! hover:no-underline!"
            >
              ARTECH
            </a>
          </span>

          <div className="text-center md:text-right order-1 md:order-2">
            <p className="font-[effra,Roboto,sans-serif] text-[13px] font-bold uppercase tracking-[0.5px] text-white m-0 mb-1">
              Nous contacter
            </p>
            <a href="tel:0326046310" className="font-[effra,Roboto,sans-serif] text-[16px] font-bold text-white! no-underline hover:underline block">
              03 26 04 63 10
            </a>
            <p className="font-[effra,Roboto,sans-serif] text-[13px] text-white/80 m-0">Reims &amp; &Eacute;pernay</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
