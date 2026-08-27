export default function ComparisonSection() {
  return (
    <>
      <div className="bg-(--color-teal) pt-10 md:pt-16 pb-0 text-center">
        <h2 className="font-[arista-pro,Roboto,sans-serif] text-[30px] md:text-[42px] text-white w-[90%] md:w-[55%] mx-auto mt-0 mb-0 leading-tight pb-8">
          Comment souhaitez-vous vendre&nbsp;?
        </h2>
      </div>
      <section className="bg-(--color-teal) px-5 py-8 md:px-10 md:py-10 lg:px-10 lg:py-12">
        <div className="max-w-300 mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          {/* Colonne Vente Traditionnelle */}
          <div className="flex-1 flex flex-col p-[24px_20px] md:p-8 rounded-lg bg-(--color-gray)">
            <div className="flex items-center gap-4 mb-4">
              <svg className="w-12 h-12 shrink-0" viewBox="0 0 64 64" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 4L4 28h8v32h16V44h8v16h16V28h8L32 4z" />
              </svg>
              <h3 className="font-[effra,Roboto,sans-serif] text-[24px] md:text-[26px] uppercase text-white m-0">
                Une vente traditionnelle
              </h3>
            </div>
            <p className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] font-bold text-white m-0 mb-3">
              ⚠️ Attention aux risques&nbsp;:
            </p>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] text-white flex items-start gap-1.5 leading-normal">
                <span className="text-(--color-orange) text-[22px] font-bold shrink-0 mt-0.5">✗</span>
                Plusieurs mois de vente sans résultat
              </li>
              <li className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] text-white flex items-start gap-1.5 leading-normal">
                <span className="text-(--color-orange) text-[22px] font-bold shrink-0 mt-0.5">✗</span>
                Accepter une baisse de prix inévitable
              </li>
              <li className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] text-white flex items-start gap-1.5 leading-normal">
                <span className="text-(--color-orange) text-[22px] font-bold shrink-0 mt-0.5">✗</span>
                Acquéreur non finançable
              </li>
              <li className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] text-white flex items-start gap-1.5 leading-normal">
                <span className="text-(--color-orange) text-[22px] font-bold shrink-0 mt-0.5">✗</span>
                Erreurs administratives coûteuses
              </li>
            </ul>
            <p className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] text-white italic font-bold m-0 mt-4">
              En conclusion&nbsp;: Un projet immobilier à l&apos;arrêt
            </p>
          </div>

          {/* Colonne Vend & Bien */}
          <div className="flex-1 flex flex-col p-[24px_20px] md:p-8 rounded-lg bg-(--color-orange)">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h3 className="font-[effra,Roboto,sans-serif] text-[24px] md:text-[26px] uppercase text-white m-0">
                Une vente
              </h3>
              <img
                src="/images/logo-white-horizontal-noslogan.png"
                alt="Vend & Bien"
                className="max-w-52 md:max-w-60 h-auto"
              />
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] text-white flex items-start gap-1.5 leading-normal">
                <span className="text-white text-[22px] font-bold shrink-0 mt-0.5">✓</span>
                Garantie vendeur à&nbsp;<strong>30 jours</strong>
              </li>
              <li className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] text-white flex items-start gap-1.5 leading-normal">
                <span className="text-white text-[22px] font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  <strong>Engagement de résultat</strong> contractuel
                </span>
              </li>
              <li className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] text-white flex items-start gap-1.5 leading-normal">
                <span className="text-white text-[22px] font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  Jusqu&apos;à <strong>100% des honoraires offerts</strong>
                </span>
              </li>
              <li className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] text-white flex items-start gap-1.5 leading-normal">
                <span className="text-white text-[22px] font-bold shrink-0 mt-0.5">✓</span>
                <span>
                  Vendez votre bien en toute <strong>sérénité</strong>
                </span>
              </li>
            </ul>
            <p className="font-[effra,Roboto,sans-serif] text-[18px] md:text-[20px] text-white italic font-bold m-0 mt-4">
              En conclusion&nbsp;: Une vente rapide, sans compromis sur le prix&nbsp;!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
