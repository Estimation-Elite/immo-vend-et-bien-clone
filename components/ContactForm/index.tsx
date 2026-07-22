'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CTAButton from '@/components/CTAButton';
import { FormInput, FormSelect, FormPhoneInput, FormAddressInput } from '@/components/FormField';
import { useAddressAutocomplete, type AddressSuggestion } from '@/hooks/useAddressAutocomplete';
import { trackLeadSubmitted } from '@/lib/analytics/trackLeadSubmitted';
import { trackFormStart } from '@/lib/analytics/trackFormStart';

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
  const formStartedRef = useRef(false);

  // GTM form_start : déclenché une seule fois à la première interaction utilisateur
  const handleFirstInteraction = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackFormStart();
  };

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

      trackLeadSubmitted({
        property_type: formData.typeDeBien,
        sale_timeline: formData.delaiVente,
        city: formData.ville,
      });
      sessionStorage.setItem('contactData', JSON.stringify(formData));
      setStatus('idle');
      router.push('/video');
      return;
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  // Conditions de visibilité progressive (adresse → nom → email → tél → délai)
  const showNom = formData.ville.trim().length > 0;
  const showEmail = showNom && formData.nom.trim().length > 0;
  const showTelephone = showEmail && formData.email.trim().length > 0;
  const showDelai = showTelephone && formData.telephone.trim().length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={handleFirstInteraction}
      className="w-full max-w-225 border-3 border-(--color-orange) rounded-xl bg-white p-8 md:p-10 text-left mt-2"
    >
      {/* 1. Toujours visible : Type de bien */}
      <FormSelect
        name="typeDeBien"
        label="Quel type de bien avez-vous ?"
        value={formData.typeDeBien}
        onChange={handleChange}
        options={PROPERTY_TYPES}
        className="mb-6"
      />

      {/* 2. Toujours visible : Adresse (autocomplete) */}
      <FormAddressInput
        name="ville"
        label="L'adresse où se trouve votre bien ?"
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

      {/* 3. Apparaît quand l'adresse est remplie : Prénom et Nom */}
      <RevealField show={showNom}>
        <FormInput
          name="nom"
          label="Prénom et Nom"
          required={showNom}
          value={formData.nom}
          onChange={handleChange}
          className="mb-6"
        />
      </RevealField>

      {/* 4. Apparaît quand le nom est rempli : E-mail */}
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

      {/* 5. Apparaît quand l'e-mail est rempli : Téléphone portable */}
      <RevealField show={showTelephone}>
        <FormPhoneInput
          name="telephone"
          label="Téléphone portable"
          required={showTelephone}
          value={formData.telephone}
          onChange={handleChange}
          className="mb-6"
        />
      </RevealField>

      {/* 6. Apparaît quand le téléphone est rempli : Envisagez-vous de vendre */}
      <RevealField show={showDelai}>
        <FormSelect
          name="delaiVente"
          label="Envisagez-vous de vendre votre bien ?"
          value={formData.delaiVente}
          onChange={handleChange}
          options={SALE_TIMELINES}
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
        <span className="font-bold text-[18px] md:text-[20px] block">
          {status === 'submitting'
            ? 'Envoi en cours...'
            : 'Découvrir la vidéo Garantie vendeur à 30 jours'}
        </span>
        <span className="text-[14px] text-white/80 block mt-0.5">
          (gratuit et sans engagement)
        </span>
      </CTAButton>
    </form>
  );
}
