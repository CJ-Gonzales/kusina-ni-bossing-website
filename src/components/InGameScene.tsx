import React, { useState, useEffect } from 'react';
import { Play, Sparkles, ExternalLink, RefreshCw, Maximize2, Volume2, Flame, Users, Clock } from 'lucide-react';
import { GAME_URL } from '../data/gameData';
import { soundFx } from '../utils/audioFx';

interface InGameSceneProps {
  initialScene?: 'counter' | 'kitchen' | 'dining' | 'live';
  aspectRatio?: '16/9' | '4/3';
  showControls?: boolean;
}

export const InGameScene: React.FC<InGameSceneProps> = ({
  initialScene = 'counter',
  aspectRatio = '16/9',
  showControls = true
}) => {
  const [scene, setScene] = useState<'counter' | 'kitchen' | 'dining' | 'live'>(initialScene);
  const [activeSpeech, setActiveSpeech] = useState<'KARE-KARE!' | 'EXTRA SABAW!' | 'UNLI-RICE!' | 'DOUBLE SISIG!'>('KARE-KARE!');
  const [dayTime, setDayTime] = useState('12:30 PM');
  const [pesos, setPesos] = useState(1580);
  const [customerName, setCustomerName] = useState('MARIA');
  const [isSteaming, setIsSteaming] = useState(true);

  // Cycle customer dialogue to simulate dynamic in-game activity
  useEffect(() => {
    const speechOptions: Array<{ speech: 'KARE-KARE!' | 'EXTRA SABAW!' | 'UNLI-RICE!' | 'DOUBLE SISIG!'; customer: string; pay: number }> = [
      { speech: 'KARE-KARE!', customer: 'MARIA', pay: 80 },
      { speech: 'EXTRA SABAW!', customer: 'MANG ERNING', pay: 70 },
      { speech: 'DOUBLE SISIG!', customer: 'SIR FRANCIS', pay: 170 },
      { speech: 'UNLI-RICE!', customer: 'JOYCE & TIN', pay: 50 }
    ];

    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % speechOptions.length;
      setActiveSpeech(speechOptions[idx].speech);
      setCustomerName(speechOptions[idx].customer);
      setPesos(prev => prev + speechOptions[idx].pay);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border-4 border-[#5c3820] bg-[#1a120c] shadow-2xl flex flex-col font-mono select-none">
      
      {/* Retro In-Game Wooden Top Bar HUD */}
      <div className="bg-[#382012] border-b-2 border-[#5c3820] px-4 py-2 flex items-center justify-between text-xs sm:text-sm text-[#f6d895] shadow-inner">
        <div className="flex items-center gap-2 font-bold tracking-wider">
          <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm inline-block animate-pulse" />
          <span className="font-display uppercase tracking-widest text-amber-200">KUSINA NI BOSSING</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-xs">
          <div className="flex items-center gap-1.5 text-[#e8c07d]">
            <Clock className="w-3.5 h-3.5" />
            <span>DAY 14 - {dayTime}</span>
          </div>

          <div className="font-bold text-amber-400 tabular-nums bg-[#26150a] px-2 py-0.5 rounded border border-[#5c3820]">
            PESOS: {pesos.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Main In-Game Stage Viewport */}
      <div className={`relative w-full ${aspectRatio === '16/9' ? 'aspect-[16/9]' : 'aspect-[4/3]'} bg-[#22160f] overflow-hidden`}>
        
        {scene === 'live' ? (
          /* Direct Live Game Web Viewport */
          <div className="w-full h-full relative bg-black">
            <iframe
              src={GAME_URL}
              title="Kusina ni Bossing In-Game Simulator"
              className="w-full h-full border-0"
              allow="autoplay; fullscreen"
            />
          </div>
        ) : scene === 'counter' ? (
          /* Live Counter Scene: Authentic In-Engine Karinderya Render */
          <div className="w-full h-full relative bg-gradient-to-b from-[#2a1b12] to-[#120a06] flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
            
            {/* Background Wall: Green Chalkboard & Pasay Street Window */}
            <div className="flex items-start justify-between gap-4">
              
              {/* Window to Pasay Street with passing colorful Jeepney */}
              <div className="w-40 sm:w-56 h-24 sm:h-28 rounded-lg border-2 border-[#4a2e19] bg-[#3a4454] relative overflow-hidden shadow-inner">
                {/* Street background sky */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#ff8c42]/40 to-[#3b4356]" />
                
                {/* Passing Jeepney sprite animation */}
                <div className="absolute bottom-2 animate-[translate-x_8s_linear_infinite] flex items-center gap-1">
                  <div className="px-3 py-1 bg-amber-500 text-[10px] font-bold text-slate-950 rounded border border-amber-300 shadow">
                    MANILA ⇌ PASAY
                  </div>
                </div>

                <div className="absolute top-1 left-2 text-[9px] text-amber-200/70 uppercase">
                  Pasay Rotonda Junction
                </div>
              </div>

              {/* Hanging Authentic Green Chalkboard Menu */}
              <div className="bg-[#18291d] border-2 border-[#543b27] rounded-md p-2.5 sm:p-3 text-[10px] sm:text-xs text-[#e8f5e9] shadow-md w-36 sm:w-44">
                <div className="font-bold text-amber-300 border-b border-[#31523a] pb-1 mb-1 text-center tracking-wider">
                  MENU:
                </div>
                <div className="space-y-0.5 font-mono">
                  <div className="flex justify-between"><span>ADOBO</span><span className="text-amber-300">70</span></div>
                  <div className="flex justify-between"><span>KARE-KARE</span><span className="text-amber-300">80</span></div>
                  <div className="flex justify-between"><span>SISIG</span><span className="text-amber-300">75</span></div>
                  <div className="flex justify-between"><span>KANIN</span><span className="text-amber-300">15</span></div>
                </div>
              </div>

            </div>

            {/* Middle Zone: Customer Dialogue & Speech Bubble */}
            <div className="relative flex items-center justify-between my-2">
              {/* Customer with speech bubble */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* In-Game Pixel Style Speech Bubble */}
                  <div className="px-3 py-1.5 bg-white text-slate-950 font-bold text-xs sm:text-sm rounded-lg border-2 border-slate-950 shadow-lg animate-bounce">
                    {activeSpeech}
                    <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-950" />
                  </div>
                  
                  {/* Customer Label Tag */}
                  <div className="mt-3 px-2 py-0.5 bg-[#3a2517] text-amber-300 text-[11px] font-bold rounded border border-[#6b4429] inline-block">
                    {customerName}
                  </div>
                </div>
              </div>

              {/* Bossing Chef behind the counter */}
              <div className="text-right">
                <div className="inline-block px-3 py-1 bg-[#ffb703] text-slate-950 font-black text-xs rounded-md shadow border-2 border-slate-900">
                  CHEF BOSSING
                </div>
                <div className="text-[10px] text-amber-300/80 mt-1">
                  "Mainit-init pa yan, Suki!"
                </div>
              </div>
            </div>

            {/* Bottom Service Counter: Stainless Calderos & Bayad Box */}
            <div className="relative bg-[#5a3219] border-t-4 border-[#7a4827] -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 p-3 sm:p-4 shadow-2xl">
              
              {/* Caldero pots on display */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 items-end">
                
                {/* Caldero 1: Pork Adobo */}
                <div className="bg-[#1f1712] border-2 border-slate-400 rounded-t-lg p-2 text-center relative group">
                  <div className="text-[10px] sm:text-xs font-bold text-amber-300">ADOBO</div>
                  <div className="text-[9px] text-slate-400">₱70</div>
                  {/* Animated steam puffs */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] opacity-70 animate-pulse text-amber-100">
                    ♨
                  </div>
                </div>

                {/* Caldero 2: Kare-Kare */}
                <div className="bg-[#2a1d08] border-2 border-amber-400 rounded-t-lg p-2 text-center relative">
                  <div className="text-[10px] sm:text-xs font-bold text-amber-400">KARE-KARE</div>
                  <div className="text-[9px] text-amber-200">₱80</div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] opacity-70 animate-pulse text-amber-200">
                    ♨
                  </div>
                </div>

                {/* Sizzling Sisig Skillet */}
                <div className="bg-[#161413] border-2 border-rose-500/80 rounded-t-lg p-2 text-center relative">
                  <div className="text-[10px] sm:text-xs font-bold text-rose-300">SISIG</div>
                  <div className="text-[9px] text-rose-200">₱75</div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] opacity-70 animate-bounce text-rose-300">
                    ♨
                  </div>
                </div>

                {/* Giant Rice Cooker: KANIN */}
                <div className="bg-[#333d47] border-2 border-slate-300 rounded-t-lg p-2 text-center relative">
                  <div className="text-[10px] sm:text-xs font-bold text-white">KANIN</div>
                  <div className="text-[9px] text-emerald-300">₱15 UNLI</div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] opacity-90 animate-pulse text-white">
                    ♨♨
                  </div>
                </div>

              </div>

              {/* Bayad Here Tin Plate */}
              <div className="mt-2 pt-2 border-t border-[#7a4827] flex items-center justify-between text-[11px]">
                <div className="px-2 py-0.5 bg-[#26150a] text-amber-300 border border-[#6b4429] rounded font-bold">
                  BAYAD HERE: [ ₱20 ] [ ₱10 ] [ ₱5 ]
                </div>
                <div className="text-amber-200/90 font-bold">
                  ORDER: {customerName} → {activeSpeech}
                </div>
              </div>

            </div>

          </div>
        ) : scene === 'kitchen' ? (
          /* Live Kitchen Prep & LPG Flame Burner Scene */
          <div className="w-full h-full bg-[#1b1410] p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#4d321d] pb-3">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">KITCHEN STATION #1</span>
                <h4 className="text-white text-base font-bold font-display">Gas Stove & Cast Iron Sauté</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded text-xs font-bold animate-pulse">
                  FLAME: HIGH
                </span>
              </div>
            </div>

            {/* Sizzling Pan Illustration */}
            <div className="my-auto text-center py-4">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-slate-900 to-black border-4 border-slate-600 relative flex items-center justify-center shadow-2xl">
                <div className="absolute inset-2 rounded-full border border-amber-500/20 bg-[#2b180d] flex flex-col items-center justify-center p-4">
                  <Flame className="w-8 h-8 text-amber-500 animate-bounce mb-1" />
                  <div className="text-xs font-bold text-amber-300">Pork Sisig Sizzling</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Raw Egg + Onions + Chili</div>
                </div>
                {/* Gas flame below */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
                  <div className="w-3 h-4 bg-cyan-400 rounded-full blur-[1px] animate-pulse" />
                  <div className="w-4 h-6 bg-blue-500 rounded-full blur-[1px] animate-pulse" />
                  <div className="w-3 h-4 bg-cyan-400 rounded-full blur-[1px] animate-pulse" />
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#26160d] rounded-xl border border-[#4d321d] flex items-center justify-between text-xs">
              <span className="text-amber-300">Ingredients: Garlic, Onions, Calamansi, Sili</span>
              <span className="font-bold text-emerald-400">Timpla Status: Optimal</span>
            </div>
          </div>
        ) : (
          /* Live Dining Hall & Monobloc Chairs Scene */
          <div className="w-full h-full bg-[#1e130c] p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#4d321d] pb-3">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">DINING EXPANSION</span>
                <h4 className="text-white text-base font-bold font-display">Fiesta Monobloc Hall & Videoke</h4>
              </div>
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-xs font-bold">
                STAGE 3 UNLOCKED
              </span>
            </div>

            {/* Monobloc chairs & videoke display */}
            <div className="grid grid-cols-3 gap-4 my-auto text-center py-4">
              <div className="p-4 rounded-xl bg-[#2a1b12] border-2 border-red-600/70 shadow">
                <div className="text-2xl mb-1">🪑</div>
                <div className="text-xs font-bold text-red-400">Red Monoblocs</div>
                <div className="text-[10px] text-slate-400 mt-1">+4 Table Capacity</div>
              </div>

              <div className="p-4 rounded-xl bg-[#2a1b12] border-2 border-emerald-600/70 shadow">
                <div className="text-2xl mb-1">🪑</div>
                <div className="text-xs font-bold text-emerald-400">Green Monoblocs</div>
                <div className="text-[10px] text-slate-400 mt-1">+4 Table Capacity</div>
              </div>

              <div className="p-4 rounded-xl bg-[#2a1b12] border-2 border-amber-400 shadow">
                <div className="text-2xl mb-1">🎤</div>
                <div className="text-xs font-bold text-amber-300">Retro Videoke</div>
                <div className="text-[10px] text-slate-400 mt-1">+50% Suki Tip Buff</div>
              </div>
            </div>

            <div className="p-3 bg-[#26160d] rounded-xl border border-[#4d321d] flex items-center justify-between text-xs">
              <span className="text-amber-300">Atmosphere: Electric Stand Fan + Fiesta Banderitas</span>
              <span className="font-bold text-amber-400">Suki Satisfaction: 100%</span>
            </div>
          </div>
        )}

      </div>

      {/* In-Game Scene Controller Bar */}
      {showControls && (
        <div className="bg-[#26160d] border-t-2 border-[#5c3820] p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-slate-400 mr-1 text-[11px] uppercase">Camera View:</span>
            
            <button
              onClick={() => {
                soundFx.playLadle();
                setScene('counter');
              }}
              className={`px-3 py-1.5 rounded border text-xs font-bold transition-all ${
                scene === 'counter'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                  : 'bg-[#1b1008] text-slate-300 border-[#4a2e19] hover:text-white'
              }`}
            >
              Turo-Turo Counter
            </button>

            <button
              onClick={() => {
                soundFx.playLadle();
                setScene('kitchen');
              }}
              className={`px-3 py-1.5 rounded border text-xs font-bold transition-all ${
                scene === 'kitchen'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                  : 'bg-[#1b1008] text-slate-300 border-[#4a2e19] hover:text-white'
              }`}
            >
              Kitchen Stove
            </button>

            <button
              onClick={() => {
                soundFx.playLadle();
                setScene('dining');
              }}
              className={`px-3 py-1.5 rounded border text-xs font-bold transition-all ${
                scene === 'dining'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                  : 'bg-[#1b1008] text-slate-300 border-[#4a2e19] hover:text-white'
              }`}
            >
              Dining & Monoblocs
            </button>

            <button
              onClick={() => {
                soundFx.playCoin();
                setScene('live');
              }}
              className={`px-3 py-1.5 rounded border text-xs font-bold transition-all flex items-center gap-1 ${
                scene === 'live'
                  ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow'
                  : 'bg-[#1b1008] text-emerald-400 border-emerald-800 hover:text-emerald-300'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Live Game Web Engine</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playCoin()}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px] underline underline-offset-2"
            >
              <span>Full Browser Window</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

    </div>
  );
};
