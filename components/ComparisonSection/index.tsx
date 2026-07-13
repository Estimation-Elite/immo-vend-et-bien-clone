export default function ComparisonSection() {
  return (
    <>
      <div className="bg-(--color-teal) pt-15 md:pt-25 pb-0 text-center">
        <h2 className="font-[arista-pro,Roboto,sans-serif] text-[26px] md:text-[36px] text-white w-[90%] md:w-[55%] mx-auto mt-0 mb-0 leading-[1.3] pb-15">
          VEND &amp; BIEN votre atout Immobilier, pour une vente rapide, au prix convenu !
        </h2>
      </div>
      <section className="bg-(--color-teal) px-5 py-10 md:px-10 md:py-12.5 lg:px-25 lg:py-12.5">
        <div className="max-w-250 mx-auto flex flex-col md:flex-row gap-6 md:gap-7.5 items-stretch">
          {/* Colonne Vente Traditionnelle */}
          <div className="flex flex-col justify-center">
            <div className="p-[28px_20px] md:p-10 rounded-lg bg-(--color-gray)">
              <div className="flex items-center gap-4 mb-8">
                <svg className="w-12 h-12 shrink-0" viewBox="0 0 64 64" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 4L4 28h8v32h16V44h8v16h16V28h8L32 4z" />
                </svg>
                <h3 className="font-[effra,Roboto,sans-serif] text-[22px] uppercase text-white m-0">
                  Vente traditionnelle
                </h3>
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                <li className="font-[effra,Roboto,sans-serif] text-[17px] text-white flex items-start gap-1 leading-normal">
                  <span className="text-(--color-orange) text-[20px] font-bold shrink-0 mt-0.5">✗</span>
                  Durée moyenne de vente +144 jours
                </li>
                <li className="font-[effra,Roboto,sans-serif] text-[17px] text-white flex items-start gap-1 leading-normal">
                  <span className="text-(--color-orange) text-[20px] font-bold shrink-0 mt-0.5">✗</span>
                  Financement acquéreur non vérifié
                </li>
                <li className="font-[effra,Roboto,sans-serif] text-[17px] text-white flex items-start gap-1 leading-normal">
                  <span className="text-(--color-orange) text-[20px] font-bold shrink-0 mt-0.5">✗</span>
                  Incertitude du prix de vente
                </li>
                <li className="font-[effra,Roboto,sans-serif] text-[17px] text-white flex items-start gap-1 leading-normal">
                  <span className="text-(--color-orange) text-[20px] font-bold shrink-0 mt-0.5">✗</span>
                  Visibilité limitée de votre bien
                </li>
              </ul>
            </div>
          </div>

          {/* Colonne Vend & Bien */}
          <div className="flex-1 p-[28px_20px] md:p-10 rounded-lg bg-(--color-orange)">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/images/logo-white-horizontal.png"
                alt="Vend & Bien"
                className="max-w-50 h-auto"
              />
            </div>
            <ul className="text-nowrap list-none p-0 m-0 flex flex-col gap-4">
              <li className="font-[effra,Roboto,sans-serif] text-[17px] text-white flex items-start gap-1 leading-normal">
                <span className="text-white text-[20px] font-bold shrink-0 mt-0.5">✓</span>
                Garantie vendeur à <strong>&nbsp;30 jours</strong>
              </li>
              <li className="font-[effra,Roboto,sans-serif] text-[17px] text-white flex items-start gap-1 leading-normal">
                <span className="text-white text-[20px] font-bold shrink-0 mt-0.5">✓</span>
                <strong>Qualification</strong>&nbsp;des acquéreurs
              </li>
              <li className="font-[effra,Roboto,sans-serif] text-[17px] text-white flex items-start gap-1 leading-normal">
                <span className="text-white text-[20px] font-bold shrink-0 mt-0.5">✓</span>
                Prix net vendeur&nbsp;<strong>optimal</strong>
              </li>
              <li className="font-[effra,Roboto,sans-serif] text-[17px] text-white flex items-start gap-1 leading-normal">
                <span className="text-white text-[20px] font-bold shrink-0 mt-0.5">✓</span>
                <strong>Méthode éprouvé</strong>&nbsp;portée par notre expertise
              </li>
              <li className="font-[effra,Roboto,sans-serif] text-[17px] text-white flex items-start gap-1 leading-normal">
                <span className="text-white text-[20px] font-bold shrink-0 mt-0.5">✓</span>
                Accompagnement global, <strong>transaction sereine et réussie.</strong>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
