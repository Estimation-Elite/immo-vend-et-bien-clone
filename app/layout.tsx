import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  title: 'Vend & Bien - Agence Immobilière Reims & Epernay',
  description: 'Nous vendons votre bien en 30 jours au prix convenu. Sinon jusqu\'à 100% des honoraires offerts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {gtmId && (
          <>
            <Script id="gtm" strategy="beforeInteractive">{`
              (function(w,d,s,l){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0], j=d.createElement(s);
                j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+${JSON.stringify(gtmId)};
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer');
            `}</Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
