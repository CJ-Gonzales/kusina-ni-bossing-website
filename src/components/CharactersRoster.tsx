import React from 'react';
import { Users, Heart, Clock, Utensils, Sparkles } from 'lucide-react';
import { SUKI_CHARACTERS } from '../data/gameData';
import { soundFx } from '../utils/audioFx';

export const CharactersRoster: React.FC = () => {
  return (
    <section id="characters" className="py-16 sm:py-20 border-b border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <span>Customer Roster</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Neighborhood Personalities</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Meet Your Loyal Suki
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Every regular who pulls up a red monobloc chair has their own story, hunger level, patience meter, and ordering quirks.
          </p>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUKI_CHARACTERS.map(char => (
            <div
              key={char.id}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {char.name}
                    </h3>
                    <div className="text-xs text-amber-400 font-medium">
                      {char.role}
                    </div>
                  </div>

                  {/* Patience Indicator */}
                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Patience</div>
                    <div className={`text-xs font-bold ${
                      char.patience === 'High' ? 'text-emerald-400' :
                      char.patience === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {char.patience}
                    </div>
                  </div>
                </div>

                {/* Catchphrase Dialogue Box */}
                <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800/80 text-xs text-slate-200 italic mb-4 leading-relaxed">
                  {char.catchphrase}
                </div>

                {/* Quirk & Habit */}
                <div className="space-y-2 text-xs text-slate-300 mb-4">
                  <div>
                    <span className="text-slate-500 font-semibold block text-[11px] uppercase tracking-wider">Behavior Quirk</span>
                    <p className="mt-0.5 text-slate-300">{char.quirk}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block text-[11px] uppercase tracking-wider">Ordering Habit</span>
                    <p className="mt-0.5 text-slate-300">{char.orderHabit}</p>
                  </div>
                </div>
              </div>

              {/* Favorite Dish */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">Go-to Order:</span>
                <span className="text-amber-400 font-semibold">{char.favoriteDish}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
