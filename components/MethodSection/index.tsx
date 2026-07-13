export default function MethodSection() {
  return (
    <section className="bg-white py-20 md:py-25 relative z-5">
      <div className="max-w-285 mx-auto px-5">
        <h2 className="font-[arista-pro,Roboto,sans-serif] text-[28px] md:text-[36px] font-bold text-(--color-dark) text-center mx-auto mb-7.5 mt-0">
          Notre m&eacute;thode pour une vente garantie
        </h2>
        <div className="flex flex-col">
          {/* Bloc 1 - texte gauche, image droite */}
          <div className="flex flex-col lg:flex-row items-stretch pb-7.5 lg:pb-15">
            <div className="flex-1 bg-white shadow-[0_0_20px_-4px_rgba(0,0,0,0.15)] p-6 md:p-12.5 relative z-10 flex flex-col justify-center lg:-mr-20 lg:ml-20 self-center">
              <span className="bg-(--color-orange) text-white font-[effra,Roboto,sans-serif] text-[14px] font-semibold uppercase tracking-[1px] px-2.5 py-1.25 inline-block mb-5 self-start">
                &Eacute;tape 1
              </span>
              <h3 className="font-[arista-pro,Roboto,sans-serif] text-[22px] md:text-[28px] font-bold text-(--color-dark) mt-0 mb-5">
                Estimation fiable
              </h3>
              <p className="font-[effra,Roboto,sans-serif] text-[16px] text-(--color-dark) leading-[1.6] mb-0">
                Nos 3 estimations compl&eacute;mentaires permettent de r&eacute;v&eacute;ler tout le potentiel de votre bien et d&apos;en optimiser la valeur.
              </p>
              <p className="font-[effra,Roboto,sans-serif] text-[16px] text-(--color-dark) leading-[1.6] mb-0">
                3 estimations qui valorisent votre bien.
              </p>
              <ul className="pl-5 mt-2 mb-0 font-[effra,Roboto,sans-serif] text-[16px] text-(--color-dark) leading-[1.8] [&_li]:mb-1">
                <li><strong>Structurelle</strong> : pour d&eacute;celer la valeur unique de votre bien</li>
                <li><strong>March&eacute;</strong> : pour &eacute;laborer une strat&eacute;gie d&apos;acquisition acqu&eacute;reurs</li>
                <li><strong>Concurrentielle</strong> : pour r&eacute;aliser une vente rapide au meilleur prix</li>
              </ul>
            </div>
            <div
              className="flex-1 min-h-62.5 lg:min-h-125 bg-cover bg-center border-[5px] border-solid border-(--color-orange) rounded-[5px] z-8"
              style={{ backgroundImage: `url('/images/steps/estimation.jpg')` }}
            ></div>
          </div>

          {/* Bloc 2 - image gauche, texte droite */}
          <div className="flex flex-col-reverse lg:flex-row items-stretch">
            <div
              className="flex-1 min-h-62.5 lg:min-h-125 bg-cover bg-center border-[5px] border-solid border-(--color-orange) z-8"
              style={{ backgroundImage: `url('/images/steps/digital.png')` }}
            ></div>
            <div className="flex-1 bg-white shadow-[0_0_20px_-4px_rgba(0,0,0,0.15)] p-6 md:p-12.5 relative z-10 flex flex-col justify-center lg:-ml-20 lg:mr-20 self-center">
              <span className="bg-(--color-orange) text-white font-[effra,Roboto,sans-serif] text-[14px] font-semibold uppercase tracking-[1px] px-2.5 py-1.25 inline-block mb-5 self-start">
                &Eacute;tape 2
              </span>
              <h3 className="font-[arista-pro,Roboto,sans-serif] text-[22px] md:text-[28px] font-bold text-(--color-dark) mt-0 mb-5">
                Strat&eacute;gie digitale optimale
              </h3>
              <p className="font-[effra,Roboto,sans-serif] text-[16px] text-(--color-dark) leading-[1.6] mb-0">
                Vendez plus vite, avec plus de visibilit&eacute; !
              </p>
              <p className="font-[effra,Roboto,sans-serif] text-[16px] text-(--color-dark) leading-[1.6] mb-0">
                Gr&acirc;ce &agrave; notre strat&eacute;gie digitale avanc&eacute;e, offrez &agrave; votre bien une visibilit&eacute; maximale et attirez des acqu&eacute;reurs cibl&eacute;s, avant m&ecirc;me la mise en ligne de votre annonce.
              </p>
            </div>
          </div>

          {/* Bloc 3 - texte gauche, image droite */}
          <div className="flex flex-col lg:flex-row items-stretch pt-7.5 lg:pt-15">
            <div className="flex-1 bg-white shadow-[0_0_20px_-4px_rgba(0,0,0,0.15)] p-6 md:p-12.5 relative z-10 flex flex-col justify-center lg:-mr-20 lg:ml-20 self-center">
              <span className="bg-(--color-orange) text-white font-[effra,Roboto,sans-serif] text-[14px] font-semibold uppercase tracking-[1px] px-2.5 py-1.25 inline-block mb-5 self-start">
                &Eacute;tape 3
              </span>
              <h3 className="font-[arista-pro,Roboto,sans-serif] text-[22px] md:text-[28px] font-bold text-(--color-dark) mt-0 mb-5">
                Votre projet, notre priorit&eacute; absolue !
              </h3>
              <p className="font-[effra,Roboto,sans-serif] text-[16px] text-(--color-dark) leading-[1.6] mb-0">
                Votre projet, guid&eacute; par notre engagement.
              </p>
              <ul className="pl-5 mt-2 mb-0 font-[effra,Roboto,sans-serif] text-[16px] text-(--color-dark) leading-[1.8] [&_li]:mb-1">
                <li>Disponible 7j/7, de 8h &agrave; 20h, 365 jours par an.</li>
                <li>Estimation en 48h.</li>
              </ul>
            </div>
            <div
              className="flex-1 min-h-62.5 lg:min-h-125 bg-cover bg-center border-[5px] border-solid border-(--color-orange) z-8"
              style={{ backgroundImage: `url('/images/steps/equipe.png')` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
