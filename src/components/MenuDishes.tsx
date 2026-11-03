import React, { useState } from 'react';
import { Utensils, Clock, Flame, Sparkles, ChefHat } from 'lucide-react';
import { DISHES_DATA, DishItem } from '../data/gameData';
import { soundFx } from '../utils/audioFx';

export const MenuDishes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDish, setActiveDish] = useState<DishItem | null>(null);

  const categories = [
    { key: 'all', label: 'All Dishes' },
    { key: 'ulam', label: 'Ulam (Mains)' },
    { key: 'sabaw', label: 'Sabaw (Soups)' },
    { key: 'sizzling', label: 'Sizzling Plates' },
    { key: 'dessert', label: 'Malamig & Sweet' },
  ];

  const filteredDishes = selectedCategory === 'all'
    ? DISHES_DATA
    : DISHES_DATA.filter(d => d.category === selectedCategory);

  return (
    <section id="menu" className="py-16 sm:py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <span>Authentic Recipes</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>In-Game Caldero Dishes</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              The Karinderya Menu
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              From slow-simmered adobo to smoking-hot pork sisig, discover the recipes you will master behind Bossing's gas stoves.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
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

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map(dish => (
            <div
              key={dish.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">
                      {dish.tagalogName}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors mt-0.5">
                      {dish.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg font-bold font-mono text-amber-400 tabular-nums">
                      ₱{dish.price}
                    </span>
                    <div className="text-[11px] text-slate-500">per serving</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {dish.description}
                </p>

                {/* Flavor & Cook Time */}
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{dish.cookTime}</span>
                  </div>
                  <span aria-hidden="true" className="text-slate-700">·</span>
                  <div className="flex items-center gap-1.5 truncate">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span className="truncate">{dish.flavor}</span>
                  </div>
                </div>

                {/* Key Ingredients */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Key Ingredients
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs text-slate-300">
                    {dish.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bossing's Tip Callout */}
              <div className="mt-2 pt-3 border-t border-slate-800/80 bg-slate-950/40 -mx-2 px-3 py-2.5 rounded-lg border border-slate-800/60">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 mb-1">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Bossing's Timpla Tip:</span>
                </div>
                <p className="text-xs text-slate-400 italic">
                  "{dish.bossingTip}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
