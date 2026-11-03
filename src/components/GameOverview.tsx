import React, { useState } from 'react';
import { Flame, Utensils, Coins, Sparkles, ChefHat, Clock, Music, Heart, Volume2 } from 'lucide-react';
import { soundFx } from '../utils/audioFx';

export const GameOverview: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const playSoundEffect = (type: 'sizzle' | 'ladle' | 'coin' | 'horn', name: string) => {
    setActiveSound(name);
    setTimeout(() => setActiveSound(null), 1200);

    if (type === 'sizzle') soundFx.playSizzle();
    if (type === 'ladle') soundFx.playLadle();
    if (type === 'coin') soundFx.playCoin();
    if (type === 'horn') soundFx.playHorn();
  };

  const coreMechanics = [
    {
      num: '01',
      title: 'The Art of the Timpla',
      subtitle: 'Recipe Prep & Stove Control',
      icon: Flame,
      description: 'Filipino cuisine is all about balancing the holy trinity of acidity, savory richness, and gentle sweetness. In the kitchen minigame, chop red shallots, crush native garlic, adjust LPG flame heat, and simmer cane vinegar until fragrant. Overcook the adobo and customers will grumble; balance it perfectly and they become loyal suki.',
      details: [
        'Real-time burner flame management (LPG tanks)',
        'Heirloom recipes: Adobo, Sinigang, Sisig, Kare-Kare',
        'Secret tips from Bossing for flavor equilibrium'
      ]
    },
    {
      num: '02',
      title: 'High-Octane Turo-Turo Rush',
      subtitle: 'Fast Ladling & Order Assembly',
      icon: Utensils,
      description: 'When the 12:00 PM Manila lunch whistle blows, queues wrap around the block. Customers peer into your glass display and point to their favorites. Ladle steaming meat portions, mound hot white rice onto plastic plates, and don’t forget Mang Erning’s request for "libreng sabaw" (free soup) to keep his patience meter overflowing.',
      details: [
        'Dynamic customer patience and order queues',
        'Turo-turo point-and-ladle speed combos',
        'Special customer requests (extra sarsa, unli-rice)'
      ]
    },
    {
      num: '03',
      title: 'Mental Math Sukli & Bayad Box',
      subtitle: 'Coin Counting & The Pautang Ledger',
      icon: Coins,
      description: 'Speed isn\'t just about the food—it\'s about the change! Customers drop ₱50, ₱100, or ₱500 bills into your stainless coin box. Quickly tap ₱1, ₱5, ₱10, and ₱20 coins to dispense exact sukli. Beware of neighborhood marites asking to put meals on the "pautang" (credit) notebook—manage your cash flow carefully!',
      details: [
        'Speedy change-giving mental math minigame',
        'Authentic Philippine coin and bill denominations',
        'Manage tip jars vs. the dreaded pautang credit list'
      ]
    },
    {
      num: '04',
      title: 'Eatery Expansion & Manila Vibe',
      subtitle: 'From Pushcart to Barrio Landmark',
      icon: Sparkles,
      description: 'Reinvest your daily revenue into authentic karinderya essentials. Buy bright red and emerald green monobloc plastic chairs, mount an electric stand fan with ribbons to circulate the tropical air, and install a neon-lit Videoke arcade machine that draws crowds and boosts customer tips by 50%.',
      details: [
        'Decor upgrades with functional gameplay buffs',
        'Weather cycles: Monsoon typhoons & summer brownouts',
        'VIP Barangay Captain catering and fiesta orders'
      ]
    }
  ];

  return (
    <section id="overview" className="py-16 sm:py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <span>Core Game Systems</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Design Philosophy</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            How Kusina ni Bossing Works
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            A love letter to Philippine street food culture, merging fast-paced time-management restaurant cooking with cozy neighborhood stories and authentic eatery management.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {coreMechanics.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 sm:p-7 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-display text-2xl font-bold text-amber-400/90 font-mono">
                      {item.num}.
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-amber-400/80 uppercase tracking-wide mb-3">
                    {item.subtitle}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Gameplay Features</div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Karinderya Street Soundboard */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/20 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Interactive Street Ambience Soundboard</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                Hear the Sounds of Manila Street Cooking
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Click any sound button below to experience authentic synthesized karinderya soundscapes.
              </p>
            </div>

            {activeSound && (
              <div className="px-3.5 py-1.5 bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm animate-pulse whitespace-nowrap">
                Playing: {activeSound}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <button
              onClick={() => playSoundEffect('sizzle', 'Sizzling Sisig')}
              className="p-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-amber-400/50 rounded-xl text-left transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Flame className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-bold text-white group-hover:text-amber-300">Sizzling Sisig</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Hot cast-iron crackle</div>
            </button>

            <button
              onClick={() => playSoundEffect('ladle', 'Caldero Ladle Clink')}
              className="p-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-amber-400/50 rounded-xl text-left transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Utensils className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-bold text-white group-hover:text-amber-300">Ladle Clank</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Stainless pot resonance</div>
            </button>

            <button
              onClick={() => playSoundEffect('coin', 'Sukli Coins Chime')}
              className="p-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-amber-400/50 rounded-xl text-left transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Coins className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-bold text-white group-hover:text-amber-300">Coin Sukli</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Exact change clink</div>
            </button>

            <button
              onClick={() => playSoundEffect('horn', 'Manila Jeepney Horn')}
              className="p-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-amber-400/50 rounded-xl text-left transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Music className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-bold text-white group-hover:text-amber-300">Jeepney Horn</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Pasay two-tone beep</div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
