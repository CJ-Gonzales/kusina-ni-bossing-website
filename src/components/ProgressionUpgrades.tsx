import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Shield, Award, Flame } from 'lucide-react';
import { UPGRADE_TIERS } from '../data/gameData';
import { soundFx } from '../utils/audioFx';

export const ProgressionUpgrades: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<number>(3);

  const current = UPGRADE_TIERS.find(t => t.level === selectedTier) || UPGRADE_TIERS[2];

  return (
    <section id="upgrades" className="py-16 sm:py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <span>Shop Progression</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Eatery Expansion Tree</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            From Pushcart to Barrio Landmark
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Reinvest daily earnings into authentic Filipino karinderya fixtures. Add iconic red monobloc chairs, install a fluttering stand fan, and fire up a retro videoke machine!
          </p>
        </div>

        {/* Milestone Steps Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {UPGRADE_TIERS.map(tier => {
            const isSelected = selectedTier === tier.level;
            return (
              <button
                key={tier.level}
                onClick={() => {
                  soundFx.playLadle();
                  setSelectedTier(tier.level);
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-400 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className={isSelected ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                    Stage 0{tier.level}
                  </span>
                  <span className="text-[11px] text-slate-400">{tier.cost}</span>
                </div>
                <div className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {tier.name.split(' (')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Focus Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <span>Stage {current.level} Milestone Details</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">{current.cost}</span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              {current.name}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {current.description}
            </p>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Store Perks & Capacity
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Marquee Unlocked Item
              </div>
              <div className="text-lg font-bold text-amber-400">
                {current.unlockedItem}
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Permanently increases customer comfort, seating rotation speed, and suki tip probability.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Ready to test in-game?</span>
              <a
                href="#demo"
                className="text-amber-400 font-semibold hover:text-amber-300 flex items-center gap-1"
              >
                <span>Try Demo First</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
