/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { EnchantedForestBackground } from './components/background/EnchantedForestBackground';
import { ClearingBackground } from './components/background/ClearingBackground';
import { BotanicalFrame } from './components/frame/BotanicalFrame';
import { ForestTransitionScreen } from './components/transition/ForestTransitionScreen';
import { HomePage } from './pages/HomePage';
import { MainMenuPage } from './pages/MainMenuPage';
import { CreatorTerritoryPlaceholder } from './pages/CreatorTerritoryPlaceholder';
import { NaomiTerritoryPage } from './pages/NaomiTerritoryPage';
import { SiYingTerritoryPage } from './pages/SiYingTerritoryPage';
import { JunTerritoryPage } from './pages/JunTerritoryPage';
import { NoiTrienDongTerritoryPage } from './pages/NoiTrienDongTerritoryPage';

const SilvestreRouter: React.FC = () => {
  const { currentRoute, routeParams, isForestTransitioning, completeForestTransition } = useNavigation();

  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showFrame, setShowFrame] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setShowFrame(true);
      return;
    }

    const tFrame = window.setTimeout(() => setShowFrame(true), 300);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setCoords({ x, y });
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.max(-1, Math.min(1, e.gamma / 30));
        const y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
        setCoords({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.clearTimeout(tFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 1. Background Layer:
          - Homepage uses the enchanted forest video background.
          - Naomi's, Si Ying's, Jun's, and Chấm's territories have their own dedicated atmospheres.
          - Forest Clearing Menu & other Territory pages use the uploaded wisteria clearing image asset. */}
      {currentRoute === 'home' ? (
        <EnchantedForestBackground mouseX={coords.x} mouseY={coords.y} />
      ) : currentRoute === 'creator-territory' && (routeParams.creatorId === 'mo-suong-chi-uc-dao' || routeParams.creatorId === 'si-ying' || routeParams.creatorId === 'mong-du-ve-may' || routeParams.creatorId === 'noi-trien-dong-duom-yen') ? null : (
        <ClearingBackground mouseX={coords.x} mouseY={coords.y} />
      )}

      {/* 2. Botanical Frame (present on homepage, dims gently on transition, hidden or subtle on clearing) */}
      {currentRoute === 'home' && (
        <BotanicalFrame visible={showFrame} dimmed={isForestTransitioning} />
      )}

      {/* 3. Atmospheric Walking-Deeper Forest Transition Screen (with dedicated loading video & compass) */}
      {isForestTransitioning && (
        <ForestTransitionScreen onComplete={completeForestTransition} />
      )}

      {/* 4. Connected Route Views */}
      <AnimatePresence mode="wait">
        {currentRoute === 'home' && !isForestTransitioning && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <HomePage />
          </motion.div>
        )}

        {currentRoute === 'forest-map' && !isForestTransitioning && (
          <motion.div
            key="forest-clearing-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full overflow-y-auto"
          >
            <MainMenuPage />
          </motion.div>
        )}

        {currentRoute === 'creator-territory' && !isForestTransitioning && (
          <motion.div
            key={`creator-territory-${routeParams.creatorId || 'default'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full overflow-y-auto"
          >
            {routeParams.creatorId === 'mo-suong-chi-uc-dao' ? (
              <NaomiTerritoryPage />
            ) : routeParams.creatorId === 'si-ying' ? (
              <SiYingTerritoryPage />
            ) : routeParams.creatorId === 'mong-du-ve-may' ? (
              <JunTerritoryPage />
            ) : routeParams.creatorId === 'noi-trien-dong-duom-yen' ? (
              <NoiTrienDongTerritoryPage />
            ) : (
              <CreatorTerritoryPlaceholder />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <SilvestreRouter />
    </NavigationProvider>
  );
}
