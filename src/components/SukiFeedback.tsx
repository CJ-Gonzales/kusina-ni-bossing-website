import React, { useState, useEffect } from 'react';
import { 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  MessageSquarePlus, 
  Sparkles, 
  CheckCircle2, 
  Send,
  Heart,
  Utensils
} from 'lucide-react';
import { SUKI_REVIEWS, SukiReview } from '../data/gameData';
import { soundFx } from '../utils/audioFx';

export const SukiFeedback: React.FC = () => {
  const [reviews, setReviews] = useState<SukiReview[]>(SUKI_REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDish, setNewDish] = useState('Classic Pork & Chicken Adobo');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const activeReview = reviews[currentIndex] || reviews[0];

  // Auto rotation timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying && !isHovered && reviews.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % reviews.length);
      }, 5500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, reviews.length]);

  const handleNext = () => {
    soundFx.playLadle();
    setCurrentIndex(prev => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    soundFx.playLadle();
    setCurrentIndex(prev => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSelectIndex = (idx: number) => {
    soundFx.playCoin();
    setCurrentIndex(idx);
  };

  const handleToggleAutoPlay = () => {
    soundFx.playCoin();
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    soundFx.playCoin();

    const createdReview: SukiReview = {
      id: `user-rev-${Date.now()}`,
      characterId: 'custom-suki',
      author: newAuthor.trim(),
      role: newRole.trim() || 'Neighborhood Eatery Regular',
      rating: newRating,
      time: 'Freshly Posted · Just now',
      orderedDish: newDish,
      comment: newComment.trim(),
      sukiBadge: 'Verified Karinderya Patron',
      hilariousHighlight: 'Fresh community review'
    };

    setReviews(prev => [createdReview, ...prev]);
    setCurrentIndex(0);
    setSubmitSuccess(true);

    setTimeout(() => {
      setShowAddForm(false);
      setSubmitSuccess(false);
      setNewAuthor('');
      setNewRole('');
      setNewComment('');
    }, 1800);
  };

  return (
    <section id="feedback" className="py-16 sm:py-20 border-b border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <span>Customer Word-of-Mouth</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Authentic Karinderya Reviews</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
              <span>Suki Feedback & Roadside Buzz</span>
              <Heart className="w-6 h-6 text-rose-500 fill-current" />
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Unvarnished roadside reviews straight from Pasay jeepney drivers, graveyard call center shift workers, and neighborhood gossip queens.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                soundFx.playLadle();
                setShowAddForm(!showAddForm);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-400" />
              <span>{showAddForm ? 'Close Form' : 'Write a Suki Review'}</span>
            </button>

            <button
              onClick={handleToggleAutoPlay}
              title={isAutoPlaying ? 'Pause rotation' : 'Resume auto-rotation'}
              className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-amber-400 rounded-lg text-xs font-medium transition-colors"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* User Submission Drawer */}
        {showAddForm && (
          <div className="mb-10 p-6 bg-slate-900 border border-amber-500/40 rounded-2xl shadow-xl animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Post Your Own Karinderya Review</span>
            </div>
            <p className="text-xs text-slate-300 mb-5">
              Share your favorite ulam, how much extra sabaw you requested, or what funny neighborhood banter happened at Bossing’s table.
            </p>

            {submitSuccess ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Salamat po! Your review has been pinned to Bossing’s rotating review board!</span>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Your Name / Nickname
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kuya Dodong"
                      value={newAuthor}
                      onChange={e => setNewAuthor(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Role / Daily Route
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Taft Jeepney Commuter"
                      value={newRole}
                      onChange={e => setNewRole(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Favorite Caldero Dish
                    </label>
                    <select
                      value={newDish}
                      onChange={e => setNewDish(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Classic Pork & Chicken Adobo">Pork & Chicken Adobo</option>
                      <option value="Sizzling Crispy Pork Sisig">Sizzling Crispy Sisig</option>
                      <option value="Tamarind Pork Soup (Sinigang)">Sinigang na Baboy</option>
                      <option value="Kare-Kare with Bagoong">Kare-Kare with Bagoong</option>
                      <option value="Crispy Pork Spring Rolls">Lumpiang Shanghai</option>
                      <option value="Ultimate Fiesta Halo-Halo">Halo-Halo Espesyal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Your Honest Karinderya Review (Colloquial & Humorous)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Solid ang asim ng sabaw, binuhos ko sa tatlong tasang kanin..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400 mr-2">Rating:</span>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-4 h-4 ${star <= newRating ? 'fill-current' : 'text-slate-600'}`} />
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Main Rotating Marquee Testimonial Card */}
        <div 
          className="relative bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden mb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle decorative background quotation watermarks */}
          <div className="absolute top-4 right-6 text-amber-500/10 pointer-events-none">
            <Quote className="w-24 h-24 rotate-180" />
          </div>

          <div className="relative z-10 flex flex-col justify-between min-h-[220px]">
            {/* Top Bar: Author, Role, Rating & Timestamp */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <span className="text-base sm:text-lg font-bold text-white">{activeReview.author}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-xs text-slate-300">{activeReview.role}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>{activeReview.time}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-300/90 font-medium">{activeReview.orderedDish}</span>
                </div>
              </div>

              {/* Stars & Verified Seal */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="font-mono text-xs font-bold ml-1 text-slate-200">5.0</span>
                </div>
                <div className="text-[11px] px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium">
                  {activeReview.sukiBadge}
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="my-2">
              <p className="text-base sm:text-xl text-slate-100 leading-relaxed font-normal italic">
                "{activeReview.comment}"
              </p>
            </blockquote>

            {/* Highlight takeaway & controls */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-500 font-semibold uppercase tracking-wider">Highlight:</span>
                <span className="text-amber-300 font-medium italic">"{activeReview.hilariousHighlight}"</span>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 transition-colors"
                  title="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-xs font-mono text-slate-400 px-2 tabular-nums">
                  {currentIndex + 1} / {reviews.length}
                </div>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 transition-colors"
                  title="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-6 bg-amber-400'
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Jump to review ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* 3-Column Browse Grid of Other Recent Suki Reviews */}
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Browse All Customer Testimonials</span>
            <span className="text-[11px] text-amber-400/80">Click any card to feature in rotator</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((rev, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={rev.id}
                  onClick={() => handleSelectIndex(index)}
                  className={`p-5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-slate-900 border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-amber-300">
                          {rev.author}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[190px]">
                          {rev.role}
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-mono font-bold ml-0.5">5.0</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mt-2 italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-amber-400/90 font-medium truncate max-w-[170px]">
                      {rev.orderedDish.split(' +')[0]}
                    </span>
                    <span className="text-slate-500 font-mono text-[10px]">{rev.time.split(' ·')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
