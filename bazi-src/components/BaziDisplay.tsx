import React from 'react';
import { BaziPillars } from '../types';

interface BaziDisplayProps {
  bazi: BaziPillars;
}

const PillarCard: React.FC<{ title: string; value: string; delay: number }> = ({ title, value, delay }) => (
  <div 
    className="flex flex-col items-center bg-slate-800 border border-amber-900/50 p-4 rounded-lg shadow-lg animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <span className="text-amber-500/60 text-xs tracking-widest uppercase mb-2 font-serif">{title}</span>
    <div className="flex flex-col space-y-1">
        {/* Splitting the pillar into two chars (Stem and Branch) for vertical display style if needed, 
            but usually Bazi is displayed vertically. Let's assume the API returns "甲辰" string. */}
        <span className="text-3xl md:text-4xl font-bold text-slate-100 font-serif leading-relaxed">
            {value.split('').map((char, i) => (
                <span key={i} className="block text-center">{char}</span>
            ))}
        </span>
    </div>
  </div>
);

export const BaziDisplay: React.FC<BaziDisplayProps> = ({ bazi }) => {
  return (
    <div className="w-full mb-8">
        <h2 className="text-center text-amber-500 mb-6 text-xl font-serif tracking-widest flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-amber-500/50"></span>
            乾坤八字
            <span className="h-px w-8 bg-amber-500/50"></span>
        </h2>
        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
            <PillarCard title="年柱 (Year)" value={bazi.year} delay={100} />
            <PillarCard title="月柱 (Month)" value={bazi.month} delay={300} />
            <PillarCard title="日柱 (Day)" value={bazi.day} delay={500} />
            <PillarCard title="时柱 (Hour)" value={bazi.hour} delay={700} />
        </div>
    </div>
  );
};