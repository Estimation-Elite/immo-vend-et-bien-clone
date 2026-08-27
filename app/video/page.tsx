import type { Metadata } from 'next';
import PageContent from '@/components/PageContent';

export const metadata: Metadata = {
  title: 'Vend & Bien - Votre vidéo Garantie vendeur à 30 jours',
  description: 'Découvrez la vidéo de présentation et prenez rendez-vous avec un conseiller Vend & Bien.',
};

export default function VideoPage() {
  return <PageContent variant="lead" />;
}
