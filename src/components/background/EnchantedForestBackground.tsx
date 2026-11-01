import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface ForestParticle {
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
  maxOpacity: number;
  type: 'particle' | 'petal' | 'firefly' | 'sparkle';
  tint: string;
  glowSize: number;
}

interface EnchantedForestBackgroundProps {
  mouseX: number;
  mouseY: number;
}

export const EnchantedForestBackground: React.FC<EnchantedForestBackgroundProps> = ({
  mouseX,
  mouseY,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

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
    const particleCount = isMobile ? 20 : 36;
    const petalCount = isMobile ? 12 : 20;
    const fireflyCount = isMobile ? 8 : 14;
    const sparkleCount = isMobile ? 6 : 10;

    const particleTints = [
      'rgba(255, 248, 230, ', // warm ivory
      'rgba(246, 224, 214, ', // soft blush pink
      'rgba(238, 225, 248, ', // pale lavender
    ];

    const petalTints = [
      'rgba(255, 245, 238, ', // seashell white
      'rgba(248, 215, 218, ', // dusty rose petal
      'rgba(225, 238, 246, ', // powder blue blossom
    ];

    const fireflyTints = [
      'rgba(255, 235, 150, ', // champagne gold
      'rgba(255, 220, 230, ', // warm peach
      'rgba(220, 245, 255, ', // soft celestial blue
    ];

    const items: ForestParticle[] = [];

    // 1. Floating Pastels / Dust Motes
    for (let i = 0; i < particleCount; i++) {
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2,
        speedY: -0.04 + Math.random() * 0.1,
        speedX: -0.05 + Math.random() * 0.1,
        swayAmp: 0.2 + Math.random() * 0.35,
        swayFreq: 0.003 + Math.random() * 0.005,
        phase: Math.random() * Math.PI * 2,
        rotation: 0,
        rotationSpeed: 0,
        opacity: Math.random() * 0.6,
        maxOpacity: 0.3 + Math.random() * 0.5,
        type: 'particle',
        tint: particleTints[i % particleTints.length],
        glowSize: 2.5 + Math.random() * 3.5,
      });
    }

    // 2. Falling Petals
    for (let i = 0; i < petalCount; i++) {
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 3 + Math.random() * 3.8,
        speedY: 0.18 + Math.random() * 0.28,
        speedX: -0.1 + Math.random() * 0.2,
        swayAmp: 0.35 + Math.random() * 0.55,
        swayFreq: 0.004 + Math.random() * 0.006,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.007,
        opacity: 0.35 + Math.random() * 0.45,
        maxOpacity: 0.65,
        type: 'petal',
        tint: petalTints[i % petalTints.length],
        glowSize: 0,
      });
    }

    // 3. Fireflies & Magical Sparks
    for (let i = 0; i < fireflyCount; i++) {
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1.8 + Math.random() * 2,
        speedY: -0.12 + Math.random() * 0.24,
        speedX: -0.12 + Math.random() * 0.24,
        swayAmp: 0.4 + Math.random() * 0.7,
        swayFreq: 0.008 + Math.random() * 0.012,
        phase: Math.random() * Math.PI * 2,
        rotation: 0,
        rotationSpeed: 0,
        opacity: Math.random() * 0.85,
        maxOpacity: 0.75 + Math.random() * 0.25,
        type: 'firefly',
        tint: fireflyTints[i % fireflyTints.length],
        glowSize: 7 + Math.random() * 9,
      });
    }

    // 4. Little Star Twinkles
    for (let i = 0; i < sparkleCount; i++) {
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 2 + Math.random() * 2.5,
        speedY: -0.02 + Math.random() * 0.04,
        speedX: -0.02 + Math.random() * 0.04,
        swayAmp: 0.1 + Math.random() * 0.2,
        swayFreq: 0.002 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI,
        rotationSpeed: 0.01,
        opacity: Math.random() * 0.9,
        maxOpacity: 0.8,
        type: 'sparkle',
        tint: 'rgba(255, 245, 210, ',
        glowSize: 5 + Math.random() * 6,
      });
    }

    let tick = 0;

    const drawParticle = (p: ForestParticle, alpha: number) => {
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowSize);
      gradient.addColorStop(0, `${p.tint}${alpha.toFixed(3)})`);
      gradient.addColorStop(0.5, `${p.tint}${(alpha * 0.4).toFixed(3)})`);
      gradient.addColorStop(1, `${p.tint}0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPetal = (p: ForestParticle, alpha: number) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const flutterScale = 0.6 + 0.4 * Math.sin(tick * 0.012 + p.phase);
      ctx.scale(1, flutterScale);

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(
        p.size * 0.85,
        -p.size * 0.65,
        p.size * 0.75,
        p.size * 0.65,
        0,
        p.size
      );
      ctx.bezierCurveTo(
        -p.size * 0.75,
        p.size * 0.65,
        -p.size * 0.85,
        -p.size * 0.65,
        0,
        -p.size
      );
      ctx.closePath();

      ctx.fillStyle = `${p.tint}${alpha.toFixed(3)})`;
      ctx.fill();
      ctx.restore();
    };

    const drawFirefly = (p: ForestParticle, alpha: number) => {
      const pulse = 0.5 + 0.5 * Math.sin(tick * 0.035 + p.phase);
      const currentAlpha = alpha * pulse;

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowSize * 1.8);
      gradient.addColorStop(0, `${p.tint}${currentAlpha.toFixed(3)})`);
      gradient.addColorStop(0.4, `${p.tint}${(currentAlpha * 0.45).toFixed(3)})`);
      gradient.addColorStop(1, `${p.tint}0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.glowSize * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Bright inner core
      ctx.fillStyle = `rgba(255, 255, 245, ${(currentAlpha * 1.3).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawSparkle = (p: ForestParticle, alpha: number) => {
      const pulse = 0.3 + 0.7 * Math.abs(Math.sin(tick * 0.04 + p.phase));
      const currentAlpha = alpha * pulse;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(tick * 0.005 + p.rotation);

      ctx.strokeStyle = `${p.tint}${currentAlpha.toFixed(3)})`;
      ctx.fillStyle = `${p.tint}${(currentAlpha * 0.8).toFixed(3)})`;
      ctx.lineWidth = 1;

      // 4-point sparkle cross
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 1.8);
      ctx.quadraticCurveTo(0, 0, p.size * 1.8, 0);
      ctx.quadraticCurveTo(0, 0, 0, p.size * 1.8);
      ctx.quadraticCurveTo(0, 0, -p.size * 1.8, 0);
      ctx.quadraticCurveTo(0, 0, 0, -p.size * 1.8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      for (const p of items) {
        if (!prefersReducedMotion) {
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(tick * p.swayFreq + p.phase) * p.swayAmp;
          p.rotation += p.rotationSpeed;

          const fadeCycle = Math.sin(tick * 0.008 + p.phase) * 0.5 + 0.5;
          p.opacity = p.maxOpacity * (0.35 + 0.65 * fadeCycle);

          if (p.y > height + 25) {
            p.y = -25;
            p.x = Math.random() * width;
          } else if (p.y < -25) {
            p.y = height + 25;
          }

          if (p.x > width + 25) {
            p.x = -25;
          } else if (p.x < -25) {
            p.x = width + 25;
          }
        }

        if (p.type === 'particle') {
          drawParticle(p, p.opacity);
        } else if (p.type === 'petal') {
          drawPetal(p, p.opacity);
        } else if (p.type === 'firefly') {
          drawFirefly(p, p.opacity);
        } else {
          drawSparkle(p, p.opacity);
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
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-[-24px] transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0) scale(1.04)`,
        }}
      >
        {/* Full-Screen Forest MP4 Video */}
        <video
          ref={videoRef}
          src={SITE_CONFIG.videoBackgroundSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />

        {/* Bright Airy Fairy-Tale Pastel Scrim & Vignette (Light and airy, not dark) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 65% 55% at 50% 48%, rgba(255, 253, 248, 0.28) 0%, rgba(252, 242, 230, 0.15) 55%, rgba(246, 232, 218, 0.32) 100%),
              linear-gradient(to bottom, rgba(255, 252, 246, 0.32) 0%, rgba(255, 255, 255, 0.08) 45%, rgba(248, 235, 222, 0.38) 100%)
            `,
          }}
        />

        {/* Soft Pearlescent Light Haze over Center */}
        <div
          className="absolute inset-0 pointer-events-none animate-moonlight-haze"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(255, 250, 235, 0.28) 0%, rgba(250, 230, 210, 0.12) 50%, transparent 80%)',
          }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};
