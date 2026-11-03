import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Award, CheckCircle2, AlertCircle, ChefHat, Timer, Trophy } from 'lucide-react';
import { soundFx } from '../utils/audioFx';
import { GAME_URL } from '../data/gameData';
import { Leaderboard } from './Leaderboard';

interface Order {
  id: number;
  customerName: string;
  role: string;
  dishName: string;
  dishKey: 'adobo' | 'sinigang' | 'sisig';
  dishPrice: number;
  ricePrice: number;
  totalPrice: number;
  paymentGiven: number;
  expectedSukli: number;
  comment: string;
}

const ORDERS: Order[] = [
  {
    id: 1,
    customerName: 'Mang Erning',
    role: 'Jeepney Driver',
    dishName: 'Pork & Chicken Adobo',
    dishKey: 'adobo',
    dishPrice: 70,
    ricePrice: 15,
    totalPrice: 85,
    paymentGiven: 100,
    expectedSukli: 15,
    comment: 'Paki-damihan ang sabaw Bossing! Mahaba pa ruta ko.'
  },
  {
    id: 2,
    customerName: 'Sir Francis',
    role: 'BPO Night Shift Lead',
    dishName: 'Sizzling Crispy Sisig',
    dishKey: 'sisig',
    dishPrice: 85,
    ricePrice: 15,
    totalPrice: 100,
    paymentGiven: 200,
    expectedSukli: 100,
    comment: 'Need this quick, meeting starts in 10 minutes!'
  },
  {
    id: 3,
    customerName: 'Joyce & Tin',
    role: 'University Crammers',
    dishName: 'Sour Tamarind Sinigang',
    dishKey: 'sinigang',
    dishPrice: 80,
    ricePrice: 15,
    totalPrice: 95,
    paymentGiven: 100,
    expectedSukli: 5,
    comment: 'Kuya, extra asim po sa sabaw please!'
  }
];

export const InteractiveMiniRush: React.FC = () => {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [selectedDish, setSelectedDish] = useState<'adobo' | 'sinigang' | 'sisig' | null>(null);
  const [hasRice, setHasRice] = useState(false);
  const [changeGiven, setChangeGiven] = useState(0);
  const [servedCount, setServedCount] = useState(0);
  const [earnedCash, setEarnedCash] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [timer, setTimer] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentOrder = ORDERS[currentOrderIndex % ORDERS.length];

  // Game timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsGameOver(true);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  const startGame = () => {
    soundFx.playCoin();
    setIsPlaying(true);
    setIsGameOver(false);
    setTimer(45);
    setServedCount(0);
    setEarnedCash(0);
    setCurrentOrderIndex(0);
    resetPlate();
    setFeedback({ type: null, message: '' });
  };

  const resetPlate = () => {
    setSelectedDish(null);
    setHasRice(false);
    setChangeGiven(0);
  };

  const handleSelectDish = (dish: 'adobo' | 'sinigang' | 'sisig') => {
    soundFx.playLadle();
    setSelectedDish(dish);
  };

  const handleToggleRice = () => {
    soundFx.playLadle();
    setHasRice(!hasRice);
  };

  const handleAddChange = (amount: number) => {
    soundFx.playCoin();
    setChangeGiven(prev => prev + amount);
  };

  const handleResetChange = () => {
    soundFx.playCoin();
    setChangeGiven(0);
  };

  const handleServeOrder = () => {
    if (!isPlaying) {
      setFeedback({ type: 'error', message: 'Click "Start Rush Hour" to begin!' });
      return;
    }

    if (!selectedDish) {
      setFeedback({ type: 'error', message: 'Wait! You forgot to ladle the ulam dish!' });
      return;
    }

    if (!hasRice) {
      setFeedback({ type: 'error', message: 'No Pinoy meal is complete without Kanin (Rice)!' });
      return;
    }

    if (selectedDish !== currentOrder.dishKey) {
      setFeedback({ 
        type: 'error', 
        message: `Wrong dish! ${currentOrder.customerName} wanted ${currentOrder.dishName}.` 
      });
      return;
    }

    if (changeGiven !== currentOrder.expectedSukli) {
      setFeedback({
        type: 'error',
        message: `Maling sukli! Change should be ₱${currentOrder.expectedSukli}, but you gave ₱${changeGiven}.`
      });
      return;
    }

    // Success!
    soundFx.playCoin();
    const cashEarned = currentOrder.totalPrice;
    setEarnedCash(prev => prev + cashEarned);
    setServedCount(prev => prev + 1);
    setFeedback({
      type: 'success',
      message: `Sarap! ${currentOrder.customerName} is satisfied! +₱${cashEarned} in the register!`
    });

    // Advance to next order
    setTimeout(() => {
      resetPlate();
      setCurrentOrderIndex(prev => prev + 1);
      setFeedback({ type: null, message: '' });
    }, 1100);
  };

  return (
    <section id="demo" className="py-16 sm:py-20 border-b border-slate-800/80 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <span>Interactive Gameplay Demo</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Web Simulator Minigame</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Test Your Rush-Hour Reflexes
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              Experience the core gameplay loop directly in your browser: ladle the correct dish, scoop hot rice, and calculate exact sukli before customer patience runs out!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isPlaying ? (
              <button
                onClick={startGame}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isGameOver ? 'Play Again' : 'Start Rush Hour (45s)'}</span>
              </button>
            ) : (
              <button
                onClick={startGame}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            )}
          </div>
        </div>

        {/* In-Game Simulator Dashboard Container */}
        <div className="bg-[#1c120b] border-4 border-[#5c3820] rounded-2xl overflow-hidden shadow-2xl font-mono">
          
          {/* Retro In-Game Top Wood Bar */}
          <div className="px-6 py-3 bg-[#382012] border-b-2 border-[#5c3820] flex flex-wrap items-center justify-between gap-4 text-[#f6d895]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-bold">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm inline-block animate-pulse" />
                <span className="font-display uppercase tracking-widest text-white text-xs sm:text-sm">KUSINA NI BOSSING</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Timer className={`w-4 h-4 ${timer < 10 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
                <span className="text-amber-200/80">DAY 14 RUSH:</span>
                <span className="font-bold text-white tabular-nums">{timer}s left</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-[#140b06] px-2.5 py-1 rounded border border-[#5c3820]">
                <Award className="w-3.5 h-3.5" />
                <span>{servedCount} SUKI SERVED</span>
              </div>
              <div className="font-bold text-amber-400 tabular-nums bg-[#140b06] px-3 py-1 rounded border border-[#5c3820] text-sm">
                PESOS: ₱{earnedCash.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Main Simulation Arena: Warm Wooden Counter Atmosphere */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gradient-to-b from-[#23150c] to-[#140b06]">
            
            {/* Left: Customer Ticket & In-Game Speech Bubble */}
            <div className="lg:col-span-5 bg-[#2c1b10] border-2 border-[#5c3820] rounded-xl p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between text-xs mb-3 text-amber-300">
                  <span className="font-bold uppercase tracking-wider">WAITING SUKI</span>
                  <span className="text-[#c7a47a]">ORDER #{currentOrderIndex + 1}</span>
                </div>

                {/* In-Game Speech Bubble & Customer Card */}
                <div className="bg-[#180e07] rounded-lg p-4 border border-[#4a2e19] mb-4">
                  
                  {/* Customer speech bubble */}
                  <div className="relative mb-3">
                    <div className="px-3 py-1.5 bg-white text-slate-950 font-bold text-xs sm:text-sm rounded-lg border-2 border-slate-950 shadow inline-block animate-bounce">
                      "{currentOrder.comment}"
                      <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-950" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <h4 className="text-base font-bold text-white">{currentOrder.customerName}</h4>
                      <p className="text-xs text-amber-400/90">{currentOrder.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">BAYAD GIVEN</div>
                      <div className="text-sm font-bold text-amber-400 font-mono bg-[#28160b] px-2 py-0.5 rounded border border-[#5c3820]">
                        ₱{currentOrder.paymentGiven} bill
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chalkboard Receipt Breakdown */}
                <div className="bg-[#18291d] rounded-lg p-3 text-xs space-y-1.5 border-2 border-[#37523f] text-[#e8f5e9]">
                  <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider border-b border-[#31523a] pb-1 mb-1">
                    CHALK TICKET:
                  </div>
                  <div className="flex justify-between">
                    <span>1x {currentOrder.dishName}</span>
                    <span className="text-amber-300 font-bold">₱{currentOrder.dishPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1x Steaming Kanin (Rice)</span>
                    <span className="text-amber-300 font-bold">₱{currentOrder.ricePrice}</span>
                  </div>
                  <div className="pt-2 border-t border-[#31523a] flex justify-between font-bold text-white text-sm">
                    <span>TOTAL DUE</span>
                    <span className="text-amber-400">₱{currentOrder.totalPrice}</span>
                  </div>
                  <div className="pt-1 flex justify-between text-amber-300 font-bold">
                    <span>EXACT SUKLI TO GIVE</span>
                    <span className="underline">₱{currentOrder.expectedSukli}</span>
                  </div>
                </div>
              </div>

              {/* Feedback Prompt */}
              {feedback.type && (
                <div className={`mt-4 p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                  feedback.type === 'success' 
                    ? 'bg-emerald-950 text-emerald-200 border-2 border-emerald-600'
                    : 'bg-rose-950 text-rose-200 border-2 border-rose-600'
                }`}>
                  {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{feedback.message}</span>
                </div>
              )}
            </div>

            {/* Right: Counter Actions (Pots, Rice, Sukli Calculator) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              
              {/* Step 1: Ladle the Caldero Dish */}
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>1. POINT & LADLE CALDERO ULAM</span>
                  <span className="text-[11px] text-slate-400">Click to select dish</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSelectDish('adobo')}
                    className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                      selectedDish === 'adobo'
                        ? 'bg-[#3b2313] border-amber-400 text-white shadow-lg'
                        : 'bg-[#23150c] border-[#4a2e19] text-slate-300 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-amber-400 uppercase">CALDERO #1 ♨</div>
                    <div className="text-sm font-bold text-white mt-0.5">Pork Adobo</div>
                    <div className="text-[11px] text-amber-200/80 mt-1">₱70 · Cane Vinegar</div>
                  </button>

                  <button
                    onClick={() => handleSelectDish('sinigang')}
                    className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                      selectedDish === 'sinigang'
                        ? 'bg-[#3b2313] border-amber-400 text-white shadow-lg'
                        : 'bg-[#23150c] border-[#4a2e19] text-slate-300 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-amber-400 uppercase">CALDERO #2 ♨</div>
                    <div className="text-sm font-bold text-white mt-0.5">Sinigang</div>
                    <div className="text-[11px] text-amber-200/80 mt-1">₱80 · Sampalok</div>
                  </button>

                  <button
                    onClick={() => handleSelectDish('sisig')}
                    className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                      selectedDish === 'sisig'
                        ? 'bg-[#3b2313] border-amber-400 text-white shadow-lg'
                        : 'bg-[#23150c] border-[#4a2e19] text-slate-300 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-rose-400 uppercase">CAST IRON ♨</div>
                    <div className="text-sm font-bold text-white mt-0.5">Sizzling Sisig</div>
                    <div className="text-[11px] text-rose-200/80 mt-1">₱85 · Calamansi</div>
                  </button>
                </div>
              </div>

              {/* Step 2: Scoop Kanin Rice */}
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>2. SCOOP STEAMING KANIN</span>
                  <span className="text-[11px] text-slate-400">₱15 per cup</span>
                </div>
                <button
                  onClick={handleToggleRice}
                  className={`w-full p-3.5 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                    hasRice
                      ? 'bg-[#18331d] border-emerald-400 text-white shadow-md'
                      : 'bg-[#23150c] border-[#4a2e19] text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3.5 h-3.5 rounded-sm ${hasRice ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                    <span className="text-sm font-bold text-white">Giant Stainless Rice Cooker [ KANIN ]</span>
                  </div>
                  <span className="text-xs font-bold text-amber-300">
                    {hasRice ? '✓ RICE SCOOPED ONTO PLATE' : '+ TAP TO SCOOP'}
                  </span>
                </button>
              </div>

              {/* Step 3: Count Sukli (Change) */}
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>3. "BAYAD HERE" SUKLI CALCULATOR</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">GIVEN:</span>
                    <span className="font-bold text-amber-400 text-sm">₱{changeGiven}</span>
                    <button
                      onClick={handleResetChange}
                      className="text-[11px] text-rose-400 hover:underline ml-1 font-bold"
                    >
                      CLEAR
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[1, 5, 10, 20, 50, 100].map(val => (
                    <button
                      key={val}
                      onClick={() => handleAddChange(val)}
                      className="py-2.5 px-3 bg-[#2c1b10] hover:bg-[#3b2313] active:scale-95 border-2 border-[#5c3820] hover:border-amber-400 rounded-lg text-xs font-bold text-amber-200 transition-all shadow"
                    >
                      +₱{val}
                    </button>
                  ))}
                  <button
                    onClick={handleResetChange}
                    className="col-span-2 py-2.5 px-3 bg-[#23150c] hover:bg-rose-950/60 text-slate-400 hover:text-rose-200 border-2 border-[#4a2e19] rounded-lg text-xs font-bold transition-colors"
                  >
                    RESET CHANGE
                  </button>
                </div>
              </div>

              {/* Serve Action Button */}
              <button
                onClick={handleServeOrder}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-98 text-slate-950 font-black rounded-xl shadow-xl transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer border-2 border-amber-200"
              >
                <ChefHat className="w-5 h-5 fill-current" />
                <span>SERVE ORDER & HAND SUKLI!</span>
              </button>

            </div>
          </div>

          {/* Game Over Scorecard Overlay */}
          {isGameOver && (
            <div className="p-8 bg-slate-900/95 border-t border-slate-800 text-center animate-fade-in">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">Rush Hour Finished!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                You served <span className="text-amber-400 font-bold">{servedCount} suki</span> and accumulated <span className="text-amber-400 font-bold">₱{earnedCash}</span> in revenue!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-sm shadow-md transition-all"
                >
                  Play Another Rush
                </button>
                <a
                  href={GAME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-sm border border-slate-700 transition-colors"
                >
                  Launch Full 2D Game
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Top Karinderya Bosses Leaderboard */}
        <Leaderboard
          playerCash={earnedCash}
          playerServed={servedCount}
          isGameOver={isGameOver}
        />

      </div>
    </section>
  );
};
