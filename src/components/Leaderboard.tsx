import React, { useState } from 'react';
import { Trophy, Medal, Sparkles, UserCheck, Flame, ArrowUpRight, ChefHat, RefreshCw, Send } from 'lucide-react';
import { soundFx } from '../utils/audioFx';

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  location: string;
  servedCount: number;
  signatureDish: string;
  accuracy: string;
  cashEarned: number;
  category: 'daily' | 'all-time' | 'speed';
  isPlayer?: boolean;
}

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'b1',
    rank: 1,
    name: 'Bossing Tonipet',
    location: 'Pasay Rotonda Corner',
    servedCount: 14,
    signatureDish: 'Sizzling Crispy Sisig',
    accuracy: '100% Sukli',
    cashEarned: 1380,
    category: 'daily'
  },
  {
    id: 'b2',
    rank: 2,
    name: 'Aling Nena',
    location: 'Quiapo Church Alley',
    servedCount: 12,
    signatureDish: 'Pork & Chicken Adobo',
    accuracy: '100% Sukli',
    cashEarned: 1190,
    category: 'daily'
  },
  {
    id: 'b3',
    rank: 3,
    name: 'Kuya Jomari',
    location: 'Cubao Bus Terminal',
    servedCount: 11,
    signatureDish: 'Kare-Kareng Baka',
    accuracy: '96% Sukli',
    cashEarned: 1045,
    category: 'daily'
  },
  {
    id: 'b4',
    rank: 4,
    name: 'Ate Beth',
    location: 'España University Belt',
    servedCount: 10,
    signatureDish: 'Sinigang na Baboy',
    accuracy: '95% Sukli',
    cashEarned: 950,
    category: 'daily'
  },
  {
    id: 'b5',
    rank: 5,
    name: 'Mang Boy',
    location: 'Tondo Pier 4 Eatery',
    servedCount: 9,
    signatureDish: 'Lumpiang Shanghai',
    accuracy: '92% Sukli',
    cashEarned: 820,
    category: 'daily'
  },

  // All-time entries
  {
    id: 'at1',
    rank: 1,
    name: 'Master Chef Bossing',
    location: 'Heirloom Central Eatery',
    servedCount: 48,
    signatureDish: 'Grand Fiesta Sisig & Adobo',
    accuracy: '100% Sukli',
    cashEarned: 4650,
    category: 'all-time'
  },
  {
    id: 'at2',
    rank: 2,
    name: 'Nanay Gloria',
    location: 'Malabon Heritage Turo-Turo',
    servedCount: 42,
    signatureDish: 'Pancit Malabon & Kare-Kare',
    accuracy: '99% Sukli',
    cashEarned: 3980,
    category: 'all-time'
  },
  {
    id: 'at3',
    rank: 3,
    name: 'Boss Roger',
    location: 'Makati BPO Junction',
    servedCount: 38,
    signatureDish: 'Night Shift Sizzling Sisig',
    accuracy: '98% Sukli',
    cashEarned: 3620,
    category: 'all-time'
  },

  // Speed entries
  {
    id: 'sp1',
    rank: 1,
    name: 'Flash Caloy',
    location: 'Divisoria Night Market',
    servedCount: 16,
    signatureDish: 'Fast Flash Adobo',
    accuracy: '1.8s avg ladle',
    cashEarned: 1490,
    category: 'speed'
  },
  {
    id: 'sp2',
    rank: 2,
    name: 'Ate Cherry',
    location: 'Mendiola Peace Arch',
    servedCount: 15,
    signatureDish: 'Speed Sinigang Broth',
    accuracy: '2.1s avg ladle',
    cashEarned: 1375,
    category: 'speed'
  }
];

interface LeaderboardProps {
  playerCash?: number;
  playerServed?: number;
  isGameOver?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  playerCash = 0,
  playerServed = 0,
  isGameOver = false
}) => {
  const [filter, setFilter] = useState<'daily' | 'all-time' | 'speed'>('daily');
  const [entries, setEntries] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [signatureDish, setSignatureDish] = useState('Sizzling Sisig');

  const filteredEntries = entries
    .filter(e => e.category === filter)
    .sort((a, b) => b.cashEarned - a.cashEarned)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || playerCash === 0) return;

    soundFx.playCoin();

    const newEntry: LeaderboardEntry = {
      id: `player-${Date.now()}`,
      rank: 1,
      name: playerName.trim().startsWith('Bossing') ? playerName.trim() : `Bossing ${playerName.trim()}`,
      location: 'My Corner Karinderya',
      servedCount: playerServed,
      signatureDish: signatureDish,
      accuracy: '100% Sukli Verified',
      cashEarned: playerCash,
      category: filter,
      isPlayer: true
    };

    setEntries(prev => [newEntry, ...prev]);
    setSubmitted(true);
  };

  const handleSimulateChallenger = () => {
    soundFx.playLadle();
    const challengerNames = [
      'Mang Dante (Balintawak)',
      'Ate Marivic (Katipunan)',
      'Kuya Bogs (Cainta Junction)',
      'Aling Teresa (Paco Market)',
      'Chef Renzo (Taguig Bayan)'
    ];
    const dishes = ['Adobong Baboy', 'Crispy Sisig', 'Sinigang sa Sampalok', 'Kare-Kareng Baka'];
    const randomName = challengerNames[Math.floor(Math.random() * challengerNames.length)];
    const randomCash = 700 + Math.floor(Math.random() * 850);
    const randomServed = Math.floor(randomCash / 95);

    const simulated: LeaderboardEntry = {
      id: `challenger-${Date.now()}`,
      rank: 99,
      name: randomName,
      location: 'Metro Manila Rush Eatery',
      servedCount: randomServed,
      signatureDish: dishes[Math.floor(Math.random() * dishes.length)],
      accuracy: '95% Sukli',
      cashEarned: randomCash,
      category: filter
    };

    setEntries(prev => [simulated, ...prev]);
  };

  return (
    <div className="mt-12 pt-10 border-t border-slate-800/90">
      
      {/* Leaderboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <span>Barangay Rankings</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Suki Satisfaction Index</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>Top Karinderya Bosses</span>
            <Trophy className="w-6 h-6 text-amber-400" />
          </h3>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            The hall of fame for Manila’s fastest ladlers and mental-math masters. Play the minigame above to submit your high score to the live rankings!
          </p>
        </div>

        {/* Filter Tabs & Simulator Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => {
                soundFx.playLadle();
                setFilter('daily');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                filter === 'daily'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Daily Lunch Rush
            </button>
            <button
              onClick={() => {
                soundFx.playLadle();
                setFilter('all-time');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                filter === 'all-time'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              All-Time Legends
            </button>
            <button
              onClick={() => {
                soundFx.playLadle();
                setFilter('speed');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                filter === 'speed'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Speed Masters
            </button>
          </div>

          <button
            onClick={handleSimulateChallenger}
            title="Simulate another neighborhood karinderya challenger"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Challenger</span>
          </button>
        </div>
      </div>

      {/* Player Score Submission Banner (Shows when player has earned cash) */}
      {playerCash > 0 && !submitted && (
        <div className="mb-6 p-5 bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                <ChefHat className="w-4 h-4" />
                <span>Submit Your Rush-Hour Record</span>
              </div>
              <p className="text-sm text-slate-200 mt-1">
                You generated <span className="font-mono font-bold text-amber-300 tabular-nums">₱{playerCash}</span> and served <span className="font-mono font-bold text-emerald-300 tabular-nums">{playerServed} suki</span>! Register your Bossing nickname to rank on the leaderboard.
              </p>
            </div>

            <form onSubmit={handleSubmitScore} className="flex items-center gap-2 shrink-0">
              <input
                type="text"
                placeholder="Your Bossing Name..."
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                maxLength={20}
                required
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 w-44"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {submitted && (
        <div className="mb-6 p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold rounded-lg flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Success! Your score is now ranked among the Top Karinderya Bosses below!</span>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
                <th className="py-3 px-4 font-semibold w-16 text-center">Rank</th>
                <th className="py-3 px-4 font-semibold">Karinderya Master & Location</th>
                <th className="py-3 px-4 font-semibold text-center">Suki Served</th>
                <th className="py-3 px-4 font-semibold">Signature Dish</th>
                <th className="py-3 px-4 font-semibold">Sukli Accuracy</th>
                <th className="py-3 px-4 font-semibold text-right">Revenue Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
              {filteredEntries.map((entry) => {
                const isTop3 = entry.rank <= 3;
                const isFirst = entry.rank === 1;
                const isSecond = entry.rank === 2;
                const isThird = entry.rank === 3;

                return (
                  <tr
                    key={entry.id}
                    className={`transition-colors ${
                      entry.isPlayer
                        ? 'bg-amber-500/10 hover:bg-amber-500/15'
                        : isFirst
                        ? 'bg-amber-950/20 hover:bg-amber-950/30'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center">
                      {isFirst ? (
                        <div className="w-7 h-7 mx-auto rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-sm">
                          1
                        </div>
                      ) : isSecond ? (
                        <div className="w-7 h-7 mx-auto rounded-full bg-slate-300 text-slate-950 font-bold flex items-center justify-center text-xs">
                          2
                        </div>
                      ) : isThird ? (
                        <div className="w-7 h-7 mx-auto rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-xs">
                          3
                        </div>
                      ) : (
                        <span className="font-mono text-slate-400 font-semibold tabular-nums">
                          #{entry.rank}
                        </span>
                      )}
                    </td>

                    {/* Bossing Name & Location */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${entry.isPlayer ? 'text-amber-400' : 'text-white'}`}>
                          {entry.name}
                        </span>
                        {entry.isPlayer && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold uppercase tracking-wider">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {entry.location}
                      </div>
                    </td>

                    {/* Suki Served */}
                    <td className="py-3.5 px-4 text-center font-mono text-slate-300 tabular-nums">
                      {entry.servedCount} suki
                    </td>

                    {/* Signature Dish */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-medium">{entry.signatureDish}</div>
                    </td>

                    {/* Sukli Accuracy */}
                    <td className="py-3.5 px-4">
                      <div className="text-xs text-slate-300 font-mono">{entry.accuracy}</div>
                    </td>

                    {/* Revenue Earned */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-bold text-amber-400 text-sm sm:text-base tabular-nums">
                        ₱{entry.cashEarned.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 bg-slate-900/60 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span>Showing top {filteredEntries.length} verified eatery bossings</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Simulated live rankings</span>
          </div>
          <div className="text-amber-400/80 font-medium">
            Next lunch rush starts in 45s
          </div>
        </div>
      </div>

    </div>
  );
};
