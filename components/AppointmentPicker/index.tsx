'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { trackAppointmentScheduled } from '@/lib/analytics/trackAppointmentScheduled';

const DAYS_FR = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'];
const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
const WEEKDAYS_LONG_FR = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

// Créneaux de 09:00 à 17:45 par pas de 15 min
const SLOTS: string[] = [];
for (let h = 9; h <= 17; h++) {
  for (let m = 0; m < 60; m += 15) {
    if (h === 17 && m > 45) break;
    SLOTS.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  }
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-10 h-10 rounded-full bg-transparent flex items-center justify-center cursor-pointer border border-gray-300 hover:bg-(--color-orange)/10 hover:border-(--color-orange) transition-colors"
    >
      <ArrowLeft size={20} className="text-(--color-dark) group-hover:text-(--color-orange)" />
    </button>
  );
}

function TimezoneInfo() {
  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-(--color-dark) mb-1">Fuseau horaire</p>
      <div className="flex items-center gap-2 text-sm text-[#525252]">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>GMT+02:00 Europe/Paris (GMT+2)</span>
        <svg viewBox="0 0 12 12" width="10" height="10" className="text-[#525252] ml-1">
          <path fill="currentColor" d="M6 8L1 3h10z" />
        </svg>
      </div>
    </div>
  );
}

interface ContactData {
  nom: string;
  telephone: string;
  email: string;
}

type PickerStep = 'calendar' | 'slots' | 'done';

interface Props {
  onBack: () => void;
  contactData: ContactData;
  onStepChange?: (step: PickerStep) => void;
}

export default function AppointmentPicker({ onBack, contactData, onStepChange }: Props) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<PickerStep>('calendar');

  // Remonte l'étape courante au parent (barre de progression)
  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  // --- Calendar helpers ---
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  // 0=Sun in JS, we want 0=Mon
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isBeforeToday = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  const isWeekend = (dayIdx: number) => dayIdx >= 5; // 0=Mon..6=Sun

  const handleDayClick = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    setSelectedDate(date);
    setSelectedSlot(null);
    setStep('slots');
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot) return;

    try {
      const body = {
        ...contactData,
        rdv_date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
        rdv_heure: selectedSlot,
      }
      await fetch('/api/rdv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch { /* on affiche quand même la confirmation */ }

    trackAppointmentScheduled();
    setStep('done');
  };

  // --- Calendar view ---
  if (step === 'calendar') {
    const cells: React.ReactNode[] = [];
    // Empty cells before first day
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dayIdx = (firstDayOfWeek + day - 1) % 7;
      const weekend = isWeekend(dayIdx);
      const past = isBeforeToday(day);
      const disabled = weekend || past;

      cells.push(
        <button
          key={day}
          type="button"
          disabled={disabled}
          onClick={() => handleDayClick(day)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] border-none cursor-pointer transition-colors ${disabled
            ? 'text-gray-300 bg-transparent cursor-default'
            : 'text-(--color-orange) bg-(--color-orange)/5 hover:text-black'
            }`}
        >
          {day}
        </button>,
      );
    }

    return (
      <div>
        <BackButton onClick={onBack} />

        <div className="flex items-center justify-center gap-6 mt-4 mb-4">
          <button
            type="button"
            onClick={prevMonth}
            className="w-10 h-10 rounded-full bg-(--color-orange)/5 flex items-center justify-center cursor-pointer border-none hover:text-black! transition-colors"
          >
            <ChevronLeft size={16} className="text-(--color-orange)" />
          </button>
          <span className="text-lg font-semibold text-(--color-dark) min-w-40 text-center">
            {MONTHS_FR[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="w-10 h-10 rounded-full bg-(--color-orange)/5 flex items-center justify-center cursor-pointer border-none hover:text-black transition-colors"
          >
            <ChevronRight size={16} className="text-(--color-orange)" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center mb-2">
          {DAYS_FR.map((d) => (
            <span key={d} className="text-sm font-semibold text-(--color-dark)">
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 justify-items-center">
          {cells}
        </div>

        {/* <TimezoneInfo /> */}
      </div>
    );
  }

  // --- Slots view ---
  if (step === 'slots' && selectedDate) {
    const dayName = WEEKDAYS_LONG_FR[selectedDate.getDay()];
    const dateStr = `${MONTHS_FR[selectedDate.getMonth()].toLowerCase()} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;

    return (
      <div>
        <div className="flex items-center mb-2">
          <BackButton onClick={() => setStep('calendar')} />
          <div className='mx-auto text-center'>
            <p className="text-xl font-bold text-(--color-dark) m-0">{dayName}</p>
            <p className="text-sm text-[#8c8c8c] m-0">{dateStr}</p>
          </div>
        </div>

        {/* <TimezoneInfo /> */}

        <p className="text-xl text-gray-800 text-center mt-6 mb-5!">
          Sélectionner une période
        </p>

        <div className="flex flex-col gap-2 max-h-100 overflow-y-auto">
          {SLOTS.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <div key={slot} className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex-1 py-3 rounded-md border text-[15px] cursor-pointer transition-colors ${isSelected
                    ? 'bg-gray-600 text-white border-(--color-dark)'
                    : 'bg-white text-(--color-orange) border-(--color-orange) hover:text-black'
                    }`}
                >
                  {slot}
                </button>
                {isSelected && (
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="flex-1 py-3 rounded-md border-none bg-(--color-orange) text-white font-bold text-[15px] cursor-pointer hover:bg-[#c9552e] transition-colors"
                  >
                    Confirmer
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- Done view ---
  return (
    <div className="text-center py-10">
      <div className="w-16 h-16 mx-auto mb-4 bg-(--color-orange) rounded-full flex items-center justify-center">
        <Check size={32} className="text-white" strokeWidth={3} />
      </div>
      <p className="text-[18px] font-bold text-(--color-dark) mb-2">
        Rendez-vous confirmé !
      </p>
      {selectedDate && selectedSlot && (
        <p className="text-[15px] text-[#525252]">
          {WEEKDAYS_LONG_FR[selectedDate.getDay()]} {selectedDate.getDate()} {MONTHS_FR[selectedDate.getMonth()].toLowerCase()} {selectedDate.getFullYear()} à {selectedSlot}
        </p>
      )}
      <p className="text-[14px] text-[#8c8c8c] mt-4">
        Nous vous recontacterons très rapidement.
      </p>
    </div>
  );
}
