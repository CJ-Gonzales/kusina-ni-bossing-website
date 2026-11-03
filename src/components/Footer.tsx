import React from 'react';
import { ExternalLink, Heart, ChefHat, Play } from 'lucide-react';
import { GAME_URL } from '../data/gameData';
import { soundFx } from '../utils/audioFx';

interface FooterProps {
  onOpenSimulator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSimulator }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div>
            <a 
              href="#" 
              className="font-display text-xl font-bold tracking-tight text-white flex items-center gap-2"
            >
              <span>Kusina ni</span>
              <span className="text-amber-400">Bossing</span>
            </a>
            <p className="text-xs text-slate-400 mt-2 max-w-sm">
              The official showcase and interactive guide for Kusina ni Bossing 2D Karinderya Simulator. Built with love for Filipino street food culture.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a href="#overview" className="hover:text-amber-400 transition-colors">Overview</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a>
            <a href="#demo" className="hover:text-amber-400 transition-colors">Mini-Rush Demo</a>
            <a href="#menu" className="hover:text-amber-400 transition-colors">Menu</a>
            <a href="#achievements" className="hover:text-amber-400 transition-colors">Badges</a>
            <a href="#characters" className="hover:text-amber-400 transition-colors">Characters</a>
            <a href="#feedback" className="hover:text-amber-400 transition-colors">Suki Reviews</a>
            <a href="#upgrades" className="hover:text-amber-400 transition-colors">Upgrades</a>
            <a href="#credits" className="hover:text-amber-400 transition-colors text-amber-300 font-bold">Credits</a>
          </div>

          {/* Direct Simulator Link Button */}
          <div className="flex items-center gap-3">
            <a
              href={GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playCoin()}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Launch Simulator</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar with Lone Developer and QA Lead Credits */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} Kusina ni Bossing.</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Developed by <span className="text-amber-400 font-bold">CJ Gonzales</span> (Lone Developer)</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>QA by <span className="text-emerald-400 font-bold">GR Almoniña</span> (Official Game Tester & QA)</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
            <span>Official Game:</span>
            <a 
              href={GAME_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline"
            >
              kusina-ni-bossing-2d-karinderya-simulator.ai.studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
