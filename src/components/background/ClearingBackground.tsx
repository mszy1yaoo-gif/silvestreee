import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface PetalParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'particle' | 'firefly';
  tint: string;
  glowSize: number;
}

interface ClearingBackgroundProps {
  mouseX: number;
  mouseY: number;
}

export const ClearingBackground: React.FC<ClearingBackgroundProps> = ({ mouseX, mouseY }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const petalCount = isMobile ? 12 : 22;
    const particleCount = isMobile ? 16 : 28;
    const fireflyCount = isMobile ? 6 : 10;

    // Dreamy wisteria, rose, cream & lavender tints
    const petalTints = [
      'rgba(255, 252, 246, ', // Pure ivory blossom
      'rgba(240, 226, 248, ', // Soft pale lavender
      'rgba(252, 230, 236, ', // Delicate dusty pink
      'rgba(235, 245, 238, ', // Pale sage dewdrop
    ];

    const particleTints = [
      'rgba(255, 248, 220, ', // Warm gold mote
      'rgba(245, 240, 255, ', // Luminous wisteria pollen
      'rgba(240, 248, 242, ', // Gentle daylight glow
    ];

    const fireflyTints = [
      'rgba(255, 240, 160, ', // Gentle warm gold firefly
      'rgba(238, 255, 210, ', // Pale leaf-green firefly
    ];

    const items: PetalParticle[] = [];

    // Falling wisteria & rose petals
    for (let i = 0; i < petalCount; i++) {
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 3.2 + Math.random() * 3.6,
        speedY: 0.16 + Math.random() * 0.22,
        speedX: -0.08 + Math.random() * 0.16,
        swayAmp: 0.35 + Math.random() * 0.45,
        swayFreq: 0.004 + Math.random() * 0.006,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        opacity: 0.35 + Math.random() * 0.35,
        type: 'petal',
        tint: petalTints[i % petalTints.length],
        glowSize: 0,
      });
    }

    // Drifting sunlight dust particles
    for (let i = 0; i < particleCount; i++) {
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1.0 + Math.random() * 1.8,
        speedY: -0.04 + Math.random() * 0.1,
        speedX: -0.05 + Math.random() * 0.1,
        swayAmp: 0.15 + Math.random() * 0.25,
        swayFreq: 0.003 + Math.random() * 0.005,
        phase: Math.random() * Math.PI * 2,
        rotation: 0,
        rotationSpeed: 0,
        opacity: 0.25 + Math.random() * 0.4,
        type: 'particle',
        tint: particleTints[i % particleTints.length],
        glowSize: 3 + Math.random() * 4,
      });
    }

    // Soft daylight fireflies
    for (let i = 0; i < fireflyCount; i++) {
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1.6 + Math.random() * 1.8,
        speedY: -0.08 + Math.random() * 0.16,
        speedX: -0.08 + Math.random() * 0.16,
        swayAmp: 0.4 + Math.random() * 0.5,
        swayFreq: 0.007 + Math.random() * 0.009,
        phase: Math.random() * Math.PI * 2,
        rotation: 0,
        rotationSpeed: 0,
        opacity: 0.3 + Math.random() * 0.5,
        type: 'firefly',
        tint: fireflyTints[i % fireflyTints.length],
        glowSize: 6 + Math.random() * 7,
      });
    }

    let tick = 0;

    const drawPetal = (p: PetalParticle, alpha: number) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const flutterScale = 0.65 + 0.35 * Math.sin(tick * 0.014 + p.phase);
      ctx.scale(1, flutterScale);

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.65, p.size * 0.75, p.size * 0.65, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.65, -p.size * 0.85, -p.size * 0.65, 0, -p.size);
      ctx.closePath();

      ctx.fillStyle = `${p.tint}${alpha.toFixed(3)})`;
      ctx.fill();
      ctx.restore();
    };

    const drawParticle = (p: PetalParticle, alpha: number) => {
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowSize);
      gradient.addColorStop(0, `${p.tint}${alpha.toFixed(3)})`);
      gradient.addColorStop(0.5, `${p.tint}${(alpha * 0.3).toFixed(3)})`);
      gradient.addColorStop(1, `${p.tint}0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawFirefly = (p: PetalParticle, alpha: number) => {
      const pulse = 0.5 + 0.5 * Math.sin(tick * 0.025 + p.phase);
      const currentAlpha = alpha * pulse;

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowSize * 1.6);
      gradient.addColorStop(0, `${p.tint}${currentAlpha.toFixed(3)})`);
      gradient.addColorStop(0.4, `${p.tint}${(currentAlpha * 0.35).toFixed(3)})`);
      gradient.addColorStop(1, `${p.tint}0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.glowSize * 1.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(255, 255, 245, ${(currentAlpha * 1.1).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      for (const p of items) {
        if (!prefersReducedMotion) {
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(tick * p.swayFreq + p.phase) * p.swayAmp;
          p.rotation += p.rotationSpeed;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          } else if (p.y < -20) {
            p.y = height + 20;
          }

          if (p.x > width + 20) {
            p.x = -20;
          } else if (p.x < -20) {
            p.x = width + 20;
          }
        }

        if (p.type === 'petal') {
          drawPetal(p, p.opacity);
        } else if (p.type === 'particle') {
          drawParticle(p, p.opacity);
        } else {
          drawFirefly(p, p.opacity);
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const parallaxX = mouseX * 10;
  const parallaxY = mouseY * 10;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* Parallax Image Container */}
      <div
        className="absolute inset-[-20px] transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0) scale(1.03)`,
        }}
      >
        <img
          src={SITE_CONFIG.clearingBackgroundSrc}
          alt="Enchanted clearing with weeping wisteria blossoms"
          className="w-full h-full object-cover object-center filter brightness-[1.04] contrast-[1.02] saturate-[1.05]"
        />

        {/* Luminous Dreamy Fairy-Tale Sunlight & Mist Layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255, 253, 245, 0.42) 0%, rgba(248, 238, 222, 0.22) 50%, rgba(215, 225, 218, 0.28) 85%, rgba(185, 195, 185, 0.35) 100%),
              linear-gradient(to bottom, rgba(255, 252, 245, 0.22) 0%, rgba(246, 238, 225, 0.08) 45%, rgba(220, 230, 222, 0.25) 100%)
            `,
          }}
        />

        {/* Soft center sunlight haze for notice board legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(255, 254, 248, 0.38) 0%, rgba(252, 246, 236, 0.18) 60%, transparent 85%)',
          }}
        />
      </div>

      {/* Atmospheric Canvas (drifting wisteria petals, floating pollen, fireflies) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};
