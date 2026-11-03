import React from 'react';
import { Play, ExternalLink, Utensils, Compass, Code2, ShieldCheck, Sparkles } from 'lucide-react';
import { GAME_URL, GAME_CREDITS } from '../data/gameData';
import { soundFx } from '../utils/audioFx';
import { InGameScene } from './InGameScene';

interface HeroProps {
  onOpenSimulator: () => void;
  onScrollToDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSimulator, onScrollToDemo }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-slate-800/80 bg-gradient-to-b from-[#120c08]/60 via-[#0f141c] to-[#0f141c]">
      {/* Subtle ambient warm lighting background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Proposition & Credits */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Developer & QA Trust Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 p-1.5 px-3 bg-[#24170e] border border-[#633b1e] rounded-lg text-xs font-mono mb-4 w-fit shadow-sm">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Dev: {GAME_CREDITS.developer}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>QA: {GAME_CREDITS.qaTester}</span>
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5 text-balance">
              The Cozy, Hectic 2D <span className="text-amber-400">Karinderya</span> Simulator
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
              Step behind the steaming <span className="text-amber-300 font-medium">turo-turo</span> glass counter in the bustling heart of Manila. Simmer heirloom Filipino dishes, ladle unli-rice for colorful suki, master rapid mental-math <span className="text-amber-300 font-medium">sukli</span>, and grow from a humble pushcart into a legendary neighborhood eatery.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <a
                href={GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playCoin()}
                className="px-6 py-3.5 text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-lg shadow-lg shadow-amber-500/10 transition-all whitespace-nowrap shrink-0 flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Play Live Game</span>
                <ExternalLink className="w-4 h-4 ml-0.5 opacity-70" />
              </a>

              <button
                onClick={() => {
                  soundFx.playLadle();
                  onScrollToDemo();
                }}
                className="px-5 py-3.5 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 active:scale-98 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                <Utensils className="w-4 h-4 text-amber-400" />
                <span>Try Quick Rush Demo</span>
              </button>

              <a
                href="#gallery"
                className="px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-slate-400" />
                <span>In-Game Scenes</span>
              </a>
            </div>

            {/* Quiet feature metadata strip */}
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-4 border-t border-slate-800">
              <span className="text-slate-200 font-medium">Direct Browser Play</span>
              <span aria-hidden="true">·</span>
              <span>No Download Needed</span>
              <span aria-hidden="true">·</span>
              <a href="#credits" className="text-amber-400 hover:underline">
                View Full Credits
              </a>
            </div>
          </div>

          {/* Right Column: Live In-Game Interactive Viewport (No Local Save) */}
          <div className="lg:col-span-7 relative">
            <InGameScene aspectRatio="16/9" showControls={true} />
            <div className="mt-2 text-center text-[11px] text-slate-400 font-mono">
              Live In-Game View · Switch camera or click "Live Game Web Engine" above
            </div>
          </div>

        </div>

        {/* 4-Item Proof Strip Row Below Hero */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">18+</span>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-0.5">Authentic Recipes</span>
            <span className="text-xs text-slate-400 mt-1">Adobo, Sisig, Sinigang, Kare-kare & more</span>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">12</span>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-0.5">Manila Suki Characters</span>
            <span className="text-xs text-slate-400 mt-1">Jeepney drivers, students, call center agents</span>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">4.9 / 5.0</span>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-0.5">Community Praise</span>
            <span className="text-xs text-slate-400 mt-1">Tested & approved by indie gamers</span>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-white">Free & Instant</span>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-0.5">Browser Simulator</span>
            <span className="text-xs text-slate-400 mt-1">Play directly on AI Studio web runtime</span>
          </div>
        </div>

      </div>
    </section>
  );
};
