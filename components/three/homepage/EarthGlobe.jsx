"use client";

import { useEffect, useState } from 'react';

export function EarthGlobe() {
  const [cursorLight, setCursorLight] = useState({ x: 32, y: 25 });
  const [cursorRotation, setCursorRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = Math.max(18, Math.min(82, (event.clientX / window.innerWidth) * 100));
      const y = Math.max(16, Math.min(84, (event.clientY / window.innerHeight) * 100));
      setCursorLight({ x, y });
      setCursorRotation({
        x: ((50 - y) / 50) * 8,
        y: ((x - 50) / 50) * 10,
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div aria-hidden="true" className="earth-starfield pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(70vw,34rem)] w-[min(70vw,34rem)] max-w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2">
        <div
          aria-hidden="true"
          className="earth-globe-rotation h-full w-full transform-gpu overflow-hidden rounded-full bg-cover bg-position-[52%_42%] transition-transform duration-500 ease-out shadow-[inset_-4rem_-3rem_5rem_rgba(0,0,0,0.8),inset_1.5rem_1rem_2.5rem_rgba(174,211,232,0.28),0_2rem_4rem_rgba(0,0,0,0.55)]"
          style={{
            backgroundImage: "url('/textures/earth/earth_atmos_2048.jpg')",
            transform: `rotateX(${cursorRotation.x}deg) rotateY(${cursorRotation.y}deg)`,
          }}
        >
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_31%_25%,rgba(255,255,255,0.3),transparent_25%,rgba(255,255,255,0.04)_43%,transparent_58%)]" />
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_78%_50%,rgba(1,8,18,0.7)_0%,rgba(1,8,18,0.3)_38%,transparent_69%)]" />
        <span
          className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2),rgba(150,210,255,0.06)_35%,transparent_72%)] blur-sm transition-[left,top] duration-300 ease-out"
          style={{ left: `${cursorLight.x}%`, top: `${cursorLight.y}%` }}
        />
        <span className="absolute inset-0 rounded-full border border-cyan-100/20 shadow-[inset_0.35rem_0.2rem_0.65rem_rgba(190,230,255,0.32)]" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_46%,transparent_23%,rgba(4,10,17,0.25)_55%,rgba(4,10,17,0.8)_100%)]" />
    </div>
  );
}