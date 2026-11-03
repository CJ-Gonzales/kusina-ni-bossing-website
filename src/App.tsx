import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GameOverview } from './components/GameOverview';
import { Gallery } from './components/Gallery';
import { InteractiveMiniRush } from './components/InteractiveMiniRush';
import { MenuDishes } from './components/MenuDishes';
import { AchievementBadges } from './components/AchievementBadges';
import { CharactersRoster } from './components/CharactersRoster';
import { SukiFeedback } from './components/SukiFeedback';
import { ProgressionUpgrades } from './components/ProgressionUpgrades';
import { CreditsSection } from './components/CreditsSection';
import { Footer } from './components/Footer';
import { SimulatorModal } from './components/SimulatorModal';
import { soundFx } from './utils/audioFx';

export default function App() {
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    soundFx.isMuted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) {
      soundFx.playCoin();
    }
  };

  const scrollToDemo = () => {
    const demoElement = document.getElementById('demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f141c] text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Top Navigation Contract */}
      <Header
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Main Showcase Body */}
      <main className="flex-1">
        {/* Marquee Hero Section */}
        <Hero
          onOpenSimulator={() => setIsSimulatorOpen(true)}
          onScrollToDemo={scrollToDemo}
        />

        {/* Core Game Systems & Soundboard */}
        <GameOverview />

        {/* 2D Visual Showcase & Artwork Lightbox */}
        <Gallery />

        {/* Interactive Playable Web Minigame Rush Demo */}
        <InteractiveMiniRush />

        {/* Authentic Filipino Caldero Menu Showcase */}
        <MenuDishes />

        {/* Milestone Achievement Badges & Perks */}
        <AchievementBadges />

        {/* Meet the Suki Customers */}
        <CharactersRoster />

        {/* Rotating Suki Customer Feedback & Humorous Reviews */}
        <SukiFeedback />

        {/* Karinderya Store Expansion & Upgrades */}
        <ProgressionUpgrades />

        {/* Development & QA Credits */}
        <CreditsSection />
      </main>

      {/* Quiet Production Footer */}
      <Footer onOpenSimulator={() => setIsSimulatorOpen(true)} />

      {/* Simulator Launcher Modal */}
      <SimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />
    </div>
  );
}
