import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#5D8D96] py-12 px-5 text-center">
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
        <div className="flex space-x-4 mt-4 md:mt-0">
          <span className="flex gap-2 flex-nowrap items-center text-white text-sm whitespace-nowrap">
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
        </div>
      </div>
    </footer>
  );
}
