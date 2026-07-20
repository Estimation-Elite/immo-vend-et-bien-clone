'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CTAButton from '@/components/CTAButton';
import { FormInput, FormSelect, FormPhoneInput, FormAddressInput } from '@/components/FormField';
import { useAddressAutocomplete, type AddressSuggestion } from '@/hooks/useAddressAutocomplete';
import { trackLeadSubmitted } from '@/lib/analytics/trackLeadSubmitted';

const PROPERTY_TYPES = ['Une maison', 'Un appartement', 'Un Immeuble', 'Un terrain', 'Autre'] as const;
const SALE_TIMELINES = ['Au plus vite', 'Dans les 3 mois', 'Plus tard', 'Je ne souhaite pas vendre'] as const;

interface FormData {
  typeDeBien: string;
  adresse: string;
  ville: string;
  codePostal: string;
  delaiVente: string;
  nom: string;
  email: string;
  telephone: string;
  website: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

function RevealField({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{ maxHeight: show ? '200px' : '0', opacity: show ? 1 : 0 }}
    >
      {children}
    </div>
  );
}

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    typeDeBien: '',
    adresse: '',
    ville: '',
    codePostal: '',
    delaiVente: '',
    nom: '',
    email: '',
    telephone: '',
    website: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData((prev) => ({
      ...prev,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
    }));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const type = (e as CustomEvent<string>).detail;
      setFormData((prev) => ({ ...prev, typeDeBien: type }));
    };
    window.addEventListener('select-property-type', handler);
    return () => window.removeEventListener('select-property-type', handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const {
    address: villeInput,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleAddressChange,
    handleSelectAddress,
  } = useAddressAutocomplete();

  const onAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAddressChange(e);
    setFormData((prev) => ({ ...prev, adresse: '', ville: '', codePostal: '' }));
  };

  const onSelectSuggestion = (suggestion: AddressSuggestion) => {
    handleSelectAddress(suggestion);
    setFormData((prev) => ({
      ...prev,
      adresse: suggestion.label,
      ville: suggestion.city,
      codePostal: suggestion.postcode,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Une erreur est survenue.');
      }

      trackLeadSubmitted();
      sessionStorage.setItem('contactData', JSON.stringify(formData));
      setStatus('idle');
      setSubmitted(true);
      return;
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  // Conditions de visibilité progressive
  const showDelai = formData.ville.trim().length > 0;
  const showNom = showDelai && formData.delaiVente !== '';
  const showEmail = showNom && formData.nom.trim().length > 0;
  const showTelephone = showEmail && formData.email.trim().length > 0;

  // Étape suivante (dans la modale) : la vidéo, débloquée après l'envoi du formulaire
  if (submitted) {
    return (
      <div className="w-full max-w-225 border-3 border-(--color-orange) rounded-xl bg-white p-8 md:p-10 text-center mt-2">
        <h2 className="font-[arista-pro,Roboto,sans-serif] text-[24px] md:text-[28px] text-(--color-dark) leading-tight mb-1">
          Merci&nbsp;! Voici votre <span className="text-(--color-orange)">vidéo de présentation</span>
        </h2>
        <p className="font-[effra,Roboto,sans-serif] text-[15px] text-(--color-gray) mb-5">
          Découvrez comment nous vendons votre bien en 30 jours, au prix convenu.
        </p>
        <div className="rounded-xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.15)]">
          <video
            src="/videos/presentation.mp4"
            poster="/images/hero/video-cover.png"
            controls
            autoPlay
            playsInline
            className="w-full block bg-black"
          />
        </div>
        <CTAButton
          as="button"
          type="button"
          variant="orange-warm"
          size="pill"
          onClick={() => router.push('/confirmation')}
          className="w-full border-none mt-6"
        >
          <span className="font-bold text-[18px] md:text-[20px] block">
            Prendre rendez-vous avec un conseiller
          </span>
        </CTAButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-225 border-3 border-(--color-orange) rounded-xl bg-white p-8 md:p-10 text-left mt-2"
    >
      {/* Toujours visible : Type de bien */}
      <FormSelect
        name="typeDeBien"
        label="Quel type de bien avez-vous ?"
        value={formData.typeDeBien}
        onChange={handleChange}
        options={PROPERTY_TYPES}
        className="mb-6"
      />

      {/* Toujours visible : Ville (autocomplete) */}
      <FormAddressInput
        name="ville"
        label="L'adresse où se situe votre bien ?"
        required
        value={villeInput}
        onChange={onAddressInputChange}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onSelectSuggestion={onSelectSuggestion}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onFocus={() => { if (villeInput.length >= 3) setShowSuggestions(true); }}
        placeholder="Tapez l'adresse du bien..."
        className="mb-6"
      />

      {/* Apparaît quand ville est remplie */}
      <RevealField show={showDelai}>
        <FormSelect
          name="delaiVente"
          label="Envisagez-vous de vendre votre bien :"
          value={formData.delaiVente}
          onChange={handleChange}
          options={SALE_TIMELINES}
          className="mb-6"
        />
      </RevealField>

      {/* Apparaît quand délai est sélectionné */}
      <RevealField show={showNom}>
        <FormInput
          name="nom"
          label="Nom"
          required={showNom}
          value={formData.nom}
          onChange={handleChange}
          className="mb-6"
        />
      </RevealField>

      {/* Apparaît quand nom est rempli */}
      <RevealField show={showEmail}>
        <FormInput
          name="email"
          label="E-mail"
          type="email"
          required={showEmail}
          value={formData.email}
          onChange={handleChange}
          className="mb-6"
        />
      </RevealField>

      {/* Apparaît quand email est rempli */}
      <RevealField show={showTelephone}>
        <FormPhoneInput
          name="telephone"
          label="Téléphone"
          required={showTelephone}
          value={formData.telephone}
          onChange={handleChange}
          className="mb-6"
        />
      </RevealField>

      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      {/* Erreur */}
      {status === 'error' && (
        <p className="font-[effra,Roboto,sans-serif] text-[14px] text-[#cb3837] mb-4">{errorMessage}</p>
      )}

      {/* Bouton submit */}
      <CTAButton
        as="button"
        type="submit"
        variant="orange-warm"
        size="pill"
        disabled={status === 'submitting'}
        className="w-full border-none"
      >
        <span className="font-bold text-[20px] block">
          {status === 'submitting'
            ? 'Envoi en cours...'
            : "Je vérifie l\u2019éligibilité de mon bien"}
        </span>
        <span className="text-[14px] text-white/80 block mt-0.5">
          (gratuit et sans engagement)
        </span>
      </CTAButton>
    </form>
  );
}
