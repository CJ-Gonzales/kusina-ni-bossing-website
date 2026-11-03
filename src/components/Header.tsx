import React from 'react';
import { Volume2, VolumeX, ExternalLink, Play } from 'lucide-react';
import { soundFx } from '../utils/audioFx';
import { GAME_URL } from '../data/gameData';

interface HeaderProps {
  onOpenSimulator: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSimulator, isMuted, onToggleMute }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0f141c]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a 
          href="#" 
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-white">Kusina ni</span>
          <span className="text-amber-400 underline decoration-amber-500/50 decoration-2 underline-offset-4">Bossing</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-slate-300">
          <a href="#overview" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Overview</a>
          <a href="#gallery" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Gallery</a>
          <a href="#demo" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Rush Demo</a>
          <a href="#menu" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Menu</a>
          <a href="#achievements" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Badges</a>
          <a href="#characters" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Suki Roster</a>
          <a href="#feedback" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Reviews</a>
          <a href="#upgrades" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Upgrades</a>
          <a href="#credits" className="hover:text-amber-400 transition-colors text-amber-300 font-bold whitespace-nowrap shrink-0">Credits</a>
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Sound Controller */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Toggle sound effects"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-400" />}
          </button>

          <button
            onClick={() => {
              soundFx.playCoin();
              onOpenSimulator();
            }}
            className="px-4 py-2 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-lg shadow-sm hover:shadow-amber-500/20 transition-all whitespace-nowrap shrink-0 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play Simulator</span>
          </button>
        </div>
      </div>
    </header>
  );
};
