import React, { useState } from 'react';
import { X, ExternalLink, Play, Maximize, Keyboard, Sparkles, ChefHat } from 'lucide-react';
import { GAME_URL } from '../data/gameData';
import { soundFx } from '../utils/audioFx';

interface SimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulatorModal: React.FC<SimulatorModalProps> = ({ isOpen, onClose }) => {
  const [loadIframe, setLoadIframe] = useState(false);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 lg:p-8 flex items-center justify-center overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
              <ChefHat className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <span>Simulator Launcher</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400">Web Runtime</span>
              </div>
              <h3 className="text-lg font-bold text-white">Kusina ni Bossing: 2D Karinderya Simulator</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playCoin()}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Close launcher"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Embedded Player or Direct Launcher Window */}
        <div className="p-6 bg-slate-950 flex flex-col items-center justify-center min-h-[460px]">
          {loadIframe ? (
            <div className="w-full h-[580px] rounded-xl overflow-hidden border border-slate-800 bg-black">
              <iframe
                src={GAME_URL}
                title="Kusina ni Bossing 2D Karinderya Simulator"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
              />
            </div>
          ) : (
            <div className="max-w-xl text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-5">
                <Play className="w-8 h-8 fill-current ml-0.5" />
              </div>

              <h4 className="font-display text-2xl font-bold text-white mb-2">
                Ready to Serve the Pasay Lunch Rush?
              </h4>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Step into the full interactive simulation hosted directly on Google AI Studio. Simmer heirloom Filipino dishes, ladle unli-rice for suki, and grow your eatery empire.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                <a
                  href={GAME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playCoin()}
                  className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch in New Fullscreen Window</span>
                </a>

                <button
                  onClick={() => {
                    soundFx.playLadle();
                    setLoadIframe(true);
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Maximize className="w-4 h-4 text-amber-400" />
                  <span>Load Live Frame Here</span>
                </button>
              </div>

              {/* Quick Gameplay Shortcuts Cheatsheet */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5">
                  <Keyboard className="w-4 h-4" />
                  <span>Simulator Quick Key Controls</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span>1, 2, 3, 4</span>
                    <span className="text-amber-400 font-mono">Select Dish</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span>Spacebar</span>
                    <span className="text-amber-400 font-mono">Scoop Rice</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span>C Key</span>
                    <span className="text-amber-400 font-mono">Count Sukli</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span>Enter</span>
                    <span className="text-amber-400 font-mono">Serve Plate</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="truncate">URL: {GAME_URL}</span>
          <span className="text-amber-400 font-medium shrink-0 ml-4">100% Free Web Simulation</span>
        </div>
      </div>
    </div>
  );
};
