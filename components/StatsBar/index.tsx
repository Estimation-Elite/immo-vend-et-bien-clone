'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  label: string;
  target: number;
  suffix: string;
}

const stats: StatItem[] = [
  { label: 'Biens vendus', target: 188, suffix: '' },
  { label: 'Garantie Vendeur', target: 30, suffix: ' jours' },
  { label: 'Satisfaction clients', target: 98, suffix: ' %' },
];

function useCounter(target: number, started: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);

  return value;
}

function StatCounter({ stat, started }: { stat: StatItem; started: boolean }) {
  const value = useCounter(stat.target, started);
  return (
    <div className="text-center px-1 sm:px-3">
      <span className="font-[arista-pro,Roboto,sans-serif] text-[30px] sm:text-[40px] md:text-[50px] text-(--color-dark) block leading-none uppercase whitespace-nowrap tabular-nums">
        {value}
        {stat.suffix && (
          <span className="text-[0.5em] font-[effra,Roboto,sans-serif] font-bold lowercase align-baseline ml-0.5">
            {stat.suffix.trim()}
          </span>
        )}
      </span>
      <span className="font-[effra,Roboto,sans-serif] text-[14px] sm:text-[19px] md:text-[26px] font-bold text-(--color-orange) mt-1.5 block leading-tight">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10 -mt-10 md:-mt-20 px-5 bg-transparent" ref={ref}>
      <div className="max-w-285 mx-auto bg-white shadow-[0px_0px_20px_-4px_rgba(0,0,0,0.155)] px-2 py-6 sm:px-4 md:px-5 md:py-9 grid grid-cols-3 items-center divide-x divide-black/10">
        {stats.map((stat) => (
          <StatCounter key={stat.label} stat={stat} started={started} />
        ))}
      </div>
    </section>
  );
}
