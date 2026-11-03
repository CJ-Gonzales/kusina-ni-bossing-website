import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Play, ExternalLink, RefreshCw, Eye, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem, GAME_URL } from '../data/gameData';
import { soundFx } from '../utils/audioFx';
import { InGameScene } from './InGameScene';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [lightboxMode, setLightboxMode] = useState<'scene' | 'live'>('scene');

  const categories = ['All', 'Gameplay', 'Kitchen', 'Environment', 'Upgrades'];

  const filteredItems = selectedCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handleOpenLightbox = (item: GalleryItem) => {
    soundFx.playCoin();
    setActiveItem(item);
    setLightboxMode('scene');
  };

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(i => i.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    soundFx.playLadle();
    setActiveItem(GALLERY_ITEMS[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(i => i.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    soundFx.playLadle();
    setActiveItem(GALLERY_ITEMS[prevIndex]);
  };

  const getSceneTypeForItem = (id: string): 'counter' | 'kitchen' | 'dining' => {
    if (id.includes('kitchen')) return 'kitchen';
    if (id.includes('monobloc')) return 'dining';
    return 'counter';
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 border-b border-slate-800/80 bg-[#0d121a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with retro in-game banner styling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
              <span>In-Game Viewports</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Live Engine Renders (No Local Saves)</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              In-Game Karinderya Gallery
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Real in-engine views of the rush-hour counter, sauté kitchen station, Pasay street front, and dining area upgrades.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1a130c] border-2 border-[#5c3820] rounded-xl overflow-x-auto shadow-inner">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playLadle();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-amber-200/80 hover:text-white hover:bg-[#2e1d13]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid of In-Game Scenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredItems.map(item => {
            const sceneType = getSceneTypeForItem(item.id);
            return (
              <div
                key={item.id}
                className="bg-[#141b24] rounded-2xl overflow-hidden border-2 border-[#5c3820] hover:border-amber-400/80 transition-all duration-300 group flex flex-col shadow-xl"
              >
                {/* In-Game Scene Container */}
                <div 
                  className="relative aspect-[4/3] bg-[#1a120c] overflow-hidden cursor-pointer"
                  onClick={() => handleOpenLightbox(item)}
                >
                  <InGameScene
                    initialScene={sceneType}
                    aspectRatio="4/3"
                    showControls={false}
                  />

                  {/* Hover inspect badge */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <div className="px-4 py-2 bg-[#2a170b] text-amber-300 text-xs font-mono font-bold rounded-lg border border-amber-400 flex items-center gap-2 backdrop-blur-sm shadow-2xl">
                      <Maximize2 className="w-4 h-4" />
                      <span>Inspect In-Game View</span>
                    </div>
                  </div>

                  {/* In-Game Scene Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#26150a]/90 backdrop-blur-md rounded text-[11px] font-mono font-bold text-amber-300 border border-[#6b4429] shadow">
                    IN-GAME: {item.category.toUpperCase()}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-[#141b24]">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-sans">
                      {item.caption}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400/90 font-bold">{item.specs.resolution}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{item.specs.stage}</span>
                    </div>
                    <button
                      onClick={() => handleOpenLightbox(item)}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect View</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal: Live In-Game Canvas & Game Engine Frame */}
      {activeBadgeModal(activeItem, lightboxMode, setLightboxMode, handlePrev, handleNext, () => setActiveItem(null))}
    </section>
  );
};

function activeBadgeModal(
  activeItem: GalleryItem | null,
  lightboxMode: 'scene' | 'live',
  setLightboxMode: (m: 'scene' | 'live') => void,
  handlePrev: () => void,
  handleNext: () => void,
  handleClose: () => void
) {
  if (!activeItem) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-[#171e29] border-4 border-[#5c3820] rounded-2xl overflow-hidden shadow-2xl my-auto font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with in-game wood styling */}
        <div className="px-6 py-4 bg-[#2b170c] border-b-2 border-[#5c3820] flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <span>{activeItem.category} IN-GAME VIEWPORT</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">{activeItem.specs.resolution}</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-0.5">{activeItem.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Interactive Scene vs Live Web Simulator */}
            <div className="flex items-center gap-1 p-1 bg-[#1a0e07] border border-[#5c3820] rounded-lg">
              <button
                onClick={() => setLightboxMode('scene')}
                className={`px-3 py-1 text-xs font-bold rounded ${
                  lightboxMode === 'scene' ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                In-Engine View
              </button>
              <button
                onClick={() => setLightboxMode('live')}
                className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-1 ${
                  lightboxMode === 'live' ? 'bg-emerald-400 text-slate-950' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Play Live Engine</span>
              </button>
            </div>

            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Previous scene"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Next scene"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-200 hover:text-rose-200 transition-colors ml-2"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Viewport Content */}
        <div className="relative bg-[#100b07] min-h-[460px] flex items-center justify-center overflow-hidden p-2">
          {lightboxMode === 'live' ? (
            <div className="w-full h-[520px] bg-black rounded-xl overflow-hidden border-2 border-emerald-500/40">
              <iframe
                src={GAME_URL}
                title="Kusina ni Bossing Live Game Frame"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
              />
            </div>
          ) : (
            <div className="w-full">
              <InGameScene
                initialScene={activeItem.id.includes('kitchen') ? 'kitchen' : activeItem.id.includes('monobloc') ? 'dining' : 'counter'}
                aspectRatio="16/9"
                showControls={true}
              />
            </div>
          )}
        </div>

        {/* Modal Footer Description */}
        <div className="p-6 bg-[#171e29] border-t-2 border-[#5c3820] grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
              Scene Breakdown & Mechanics
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">{activeItem.caption}</p>
            <p className="text-xs text-amber-300/90 mt-2 font-mono italic">{activeItem.highlight}</p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between font-mono">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">In-Game Target</h4>
              <div className="text-sm font-bold text-white">{activeItem.specs.stage}</div>
              <div className="text-xs text-slate-400 mt-1">{activeItem.specs.focus}</div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <a
                href={GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Launch in Full Window</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
