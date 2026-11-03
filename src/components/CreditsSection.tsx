import React from 'react';
import { Code2, ShieldCheck, Heart, Sparkles, ExternalLink, Award, UserCheck, Terminal } from 'lucide-react';
import { GAME_CREDITS, GAME_URL } from '../data/gameData';
import { soundFx } from '../utils/audioFx';

export const CreditsSection: React.FC = () => {
  return (
    <section id="credits" className="py-16 sm:py-20 border-b border-slate-800/80 bg-gradient-to-b from-[#0d121a] to-[#0a0e14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with retro pixel game styling */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Kusina ni Bossing · Credits Roll</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet the Makers
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Crafted with passion for Philippine street food and retro simulation gaming. The people behind the calderos, the timpla, and the sukli math.
          </p>
        </div>

        {/* 2-Column Developer & QA Lead Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          
          {/* Lone Developer Card */}
          <div className="bg-[#141b24] border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-amber-400 transition-all">
            {/* Top Retro Tag */}
            <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
              Solo Creator
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                  <Code2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {GAME_CREDITS.developer}
                  </h3>
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    {GAME_CREDITS.developerRole}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-[#0c1017] p-4 rounded-xl border border-slate-800">
                "{GAME_CREDITS.developerDescription}"
              </p>

              {/* Development Highlights */}
              <div className="space-y-2 text-xs text-slate-300 mb-6 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>2D Karinderya Simulation Engine & Logic</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>Interactive Timpla & Gas Stove Minigames</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>Mental Math Sukli & Coin Counting Architecture</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Role: Full-Stack Indie Dev</span>
              <span className="text-amber-400 font-bold">100% Solo Codebase</span>
            </div>
          </div>

          {/* Official Game Tester & QA Lead Card */}
          <div className="bg-[#141b24] border-2 border-emerald-500/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-emerald-400 transition-all">
            {/* Top Retro Tag */}
            <div className="absolute top-0 right-0 bg-emerald-400 text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
              Verified QA
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 font-bold flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {GAME_CREDITS.qaTester}
                  </h3>
                  <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    {GAME_CREDITS.qaRole}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-[#0c1017] p-4 rounded-xl border border-slate-800">
                "{GAME_CREDITS.qaDescription}"
              </p>

              {/* QA Highlights */}
              <div className="space-y-2 text-xs text-slate-300 mb-6 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Rush Hour Peak Balance & Ladle Speed Tuning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Sukli Cash Register Math & Edge Case Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Customer Patience Curves & Audio Sync Validation</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Status: QA Certified</span>
              <span className="text-emerald-400 font-bold">100% Gameplay Tested</span>
            </div>
          </div>

        </div>

        {/* Special In-Game Tribute Banner */}
        <div className="max-w-4xl mx-auto bg-[#0f151e] border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white">
                Play the Official Release
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Experience the game created by <span className="text-amber-400 font-bold">{GAME_CREDITS.developer}</span> and tested by <span className="text-emerald-400 font-bold">{GAME_CREDITS.qaTester}</span>.
              </p>
            </div>
          </div>

          <a
            href={GAME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playCoin()}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-2 shrink-0 shadow-md shadow-amber-500/10 focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>Play Simulator Now</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
