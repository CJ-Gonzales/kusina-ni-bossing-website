import React, { useState } from 'react';
import { 
  Award, 
  Flame, 
  Zap, 
  CookingPot, 
  Soup, 
  Mic, 
  BookOpen, 
  CloudRain, 
  Crown, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Gift, 
  X,
  Filter,
  Layers
} from 'lucide-react';
import { ACHIEVEMENT_BADGES, AchievementBadge } from '../data/gameData';
import { soundFx } from '../utils/audioFx';

export const AchievementBadges: React.FC = () => {
  const [badges, setBadges] = useState<AchievementBadge[]>(ACHIEVEMENT_BADGES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeBadge, setActiveBadge] = useState<AchievementBadge | null>(null);

  const categories = [
    { key: 'all', label: 'All Milestones' },
    { key: 'cooking', label: 'Cooking & Caldero' },
    { key: 'speed', label: 'Speed & Sukli' },
    { key: 'life', label: 'Street Life & Banter' },
    { key: 'milestone', label: 'Empire Expansion' }
  ];

  const filteredBadges = selectedCategory === 'all'
    ? badges
    : badges.filter(b => b.category === selectedCategory);

  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const progressPercent = Math.round((unlockedCount / badges.length) * 100);

  const handleInspectBadge = (badge: AchievementBadge) => {
    if (badge.isUnlocked) {
      soundFx.playCoin();
    } else {
      soundFx.playLadle();
    }
    setActiveBadge(badge);
  };

  const handleSimulateUnlock = () => {
    const lockedIndex = badges.findIndex(b => !b.isUnlocked);
    if (lockedIndex !== -1) {
      soundFx.playCoin();
      soundFx.playHorn();
      setBadges(prev => {
        const copy = [...prev];
        copy[lockedIndex] = {
          ...copy[lockedIndex],
          isUnlocked: true,
          progress: copy[lockedIndex].maxProgress
        };
        return copy;
      });
      setActiveBadge({
        ...badges[lockedIndex],
        isUnlocked: true,
        progress: badges[lockedIndex].maxProgress
      });
    }
  };

  // Icon selector based on badge key
  const renderBadgeIcon = (iconKey: AchievementBadge['iconKey'], isUnlocked: boolean, tier: AchievementBadge['tier']) => {
    const iconClass = `w-7 h-7 ${
      !isUnlocked 
        ? 'text-slate-500' 
        : tier === 'Mythic' 
        ? 'text-amber-300' 
        : tier === 'Gold' 
        ? 'text-amber-400' 
        : tier === 'Silver' 
        ? 'text-slate-200' 
        : 'text-amber-600'
    }`;

    switch (iconKey) {
      case 'adobo':
        return <CookingPot className={iconClass} />;
      case 'speed':
        return <Zap className={iconClass} />;
      case 'rice':
        return <Layers className={iconClass} />;
      case 'gossip':
        return <Sparkles className={iconClass} />;
      case 'soup':
        return <Soup className={iconClass} />;
      case 'videoke':
        return <Mic className={iconClass} />;
      case 'pautang':
        return <BookOpen className={iconClass} />;
      case 'typhoon':
        return <CloudRain className={iconClass} />;
      case 'fiesta':
        return <Crown className={iconClass} />;
      default:
        return <Award className={iconClass} />;
    }
  };

  return (
    <section id="achievements" className="py-16 sm:py-20 border-b border-slate-800/80 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <span>Player Milestones</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Trophy & Perk System</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
              <span>Karinderya Achievement Badges</span>
              <Award className="w-6 h-6 text-amber-400" />
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Earn iconic badge recognitions and unlock gameplay buffs for mastering the rush hour, calculating lightning sukli, and enduring neighborhood banter.
            </p>
          </div>

          {/* Action & Filter buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSimulateUnlock}
              title="Test unlocking the next milestone badge"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Next Unlock</span>
            </button>
          </div>
        </div>

        {/* Global Progress Strip Banner */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Overall Career Progress
              </div>
              <div className="text-lg font-bold text-white flex items-center gap-2">
                <span>{unlockedCount} of {badges.length} Badges Mastered</span>
                <span className="text-xs font-mono text-amber-400 tabular-nums">({progressPercent}%)</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Next Milestone: {badges.find(b => !b.isUnlocked)?.title || 'All Completed!'}</span>
              <span className="font-mono tabular-nums">{unlockedCount}/{badges.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Category Filter Pills (Interactive Buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto shrink-0">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => {
                  soundFx.playLadle();
                  setSelectedCategory(cat.key);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.key
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Badges Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map(badge => {
            const isUnlocked = badge.isUnlocked;
            const tierColors = {
              Mythic: 'from-purple-950/40 border-purple-500/40 text-purple-300',
              Gold: 'from-amber-950/40 border-amber-500/40 text-amber-300',
              Silver: 'from-slate-900/60 border-slate-600/40 text-slate-300',
              Bronze: 'from-amber-950/20 border-amber-800/40 text-amber-500'
            };

            return (
              <div
                key={badge.id}
                onClick={() => handleInspectBadge(badge)}
                className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isUnlocked
                    ? `bg-gradient-to-br ${tierColors[badge.tier]} bg-slate-900/90 hover:border-amber-400/80 shadow-lg hover:shadow-amber-500/5`
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  {/* Top Bar: Icon Medal Frame & Status Badge */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Visual Medal Emblem */}
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isUnlocked
                        ? badge.tier === 'Mythic'
                          ? 'bg-gradient-to-b from-purple-900 to-purple-950 border-purple-400 shadow-md shadow-purple-900/30'
                          : badge.tier === 'Gold'
                          ? 'bg-gradient-to-b from-amber-900/80 to-slate-950 border-amber-400 shadow-md shadow-amber-900/30'
                          : 'bg-gradient-to-b from-slate-800 to-slate-950 border-slate-500'
                        : 'bg-slate-900 border-slate-800'
                    }`}>
                      {renderBadgeIcon(badge.iconKey, isUnlocked, badge.tier)}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1.5 mb-1">
                        {isUnlocked ? (
                          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Unlocked</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Locked</span>
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {badge.tier} Tier
                      </div>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="text-xs font-semibold text-amber-400/90 uppercase tracking-wide">
                    {badge.tagline}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors mt-0.5 mb-2">
                    {badge.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {badge.description}
                  </p>
                </div>

                <div>
                  {/* Progress Meter */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Requirement</span>
                      <span className="font-mono tabular-nums text-slate-300">
                        {badge.progress} / {badge.maxProgress} {badge.unit}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          isUnlocked ? 'bg-amber-400' : 'bg-slate-700'
                        }`}
                        style={{ width: `${Math.min(100, (badge.progress / badge.maxProgress) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Unlocked Reward Perk */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 truncate mr-2">
                      <Gift className={`w-3.5 h-3.5 shrink-0 ${isUnlocked ? 'text-amber-400' : 'text-slate-600'}`} />
                      <span className="text-[11px] font-medium truncate">{badge.reward}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-400 group-hover:underline shrink-0">
                      View Details
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Lightbox Modal */}
      {activeBadge && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center overflow-y-auto animate-fade-in"
          onClick={() => setActiveBadge(null)}
        >
          <div 
            className="relative max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveBadge(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shrink-0 ${
                activeBadge.isUnlocked 
                  ? 'bg-gradient-to-b from-amber-900 to-slate-950 border-amber-400' 
                  : 'bg-slate-950 border-slate-800'
              }`}>
                {renderBadgeIcon(activeBadge.iconKey, activeBadge.isUnlocked, activeBadge.tier)}
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  <span>{activeBadge.tier} Tier</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{activeBadge.isUnlocked ? 'Completed' : 'In Progress'}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">{activeBadge.title}</h3>
                <div className="text-xs text-slate-400">{activeBadge.tagline}</div>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Milestone Description</h4>
                <p className="leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-slate-200">
                  {activeBadge.description}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Progress Metric</h4>
                <div className="flex justify-between font-mono text-xs text-slate-200 mb-1">
                  <span>Current Progress</span>
                  <span className="font-bold text-amber-400 tabular-nums">
                    {activeBadge.progress} / {activeBadge.maxProgress} {activeBadge.unit}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${Math.min(100, (activeBadge.progress / activeBadge.maxProgress) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Unlocked In-Game Perk</h4>
                <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl">
                  <div className="font-bold text-amber-300 text-xs mb-0.5 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5" />
                    <span>{activeBadge.reward}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {activeBadge.rewardPerk}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Status: {activeBadge.isUnlocked ? 'Active in Karinderya' : 'Awaiting Completion'}</span>
              <button
                onClick={() => setActiveBadge(null)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
