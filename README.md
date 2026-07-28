# Vend & Bien — page de vente

Clone de https://www.immovendetbien.com/

## Production

🌐 **Site en ligne : https://immovendbien.fr/**

Tunnel de conversion en 2 pages :

1. `/` — landing (vidéo hero muette + overlay, CTA « Découvrir la vidéo Garantie vendeur à 30 jours »)
2. → soumission du formulaire → `/video` (vidéo débloquée avec le son, CTA « Prendre rendez-vous »)
3. → `/confirmation` (prise de rendez-vous / calendrier)

Aperçu (peut être obsolète) : https://immo-vend-et-bien-clone.vercel.app/

## Déploiement

Déploiement via le skill **`deploy-app`** (`.claude/skills/deploy-app/SKILL.md`) :
build Docker → transfert SSH vers le **VPS IONOS** (`/opt/immo-vend-et-bien`), servi derrière **nginx-proxy-manager**.
Identifiants serveur dans `.servers` (non versionné, à la racine du checkout principal).

Tracking : **GTM `GTM-PL6RGMC3`** (`.env` → `NEXT_PUBLIC_GTM_ID` ; `.env` n'est pas versionné → à définir dans l'environnement de prod).
