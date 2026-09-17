"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const EarthGlobe = dynamic(() => import('@/components/three/homepage/EarthGlobe').then((module) => module.EarthGlobe), { ssr: false });

const storyBeats = [
  {
    eyebrow: 'Begin in Kashmir',
    title: 'Start close to wonder.',
    body: 'A slow orbit over mountain valleys, living culture, and the places that make every journey feel personal.',
    side: 'left',
  },
  {
    eyebrow: 'Follow the horizon',
    title: 'Let the world open up.',
    body: 'Trace a route from Srinagar toward warm coastlines, old cities, and new stories waiting beyond the familiar.',
    side: 'right',
  },
  {
    eyebrow: 'Choose your direction',
    title: 'Travel your way.',
    body: 'Browse hand-picked destinations and shape the pace, comfort, and character of your next escape.',
    side: 'left',
  },
];

function getBeatState(progress, index) {
  if (index === 0) {
    const opacity = Math.max(0, 1 - progress / 0.14);
    return { opacity, transform: `translate3d(0, ${-opacity * 8}px, 0)` };
  }

  const ranges = [
    [0.14, 0.43],
    [0.38, 0.7],
    [0.65, 1],
  ];
  const [start, end] = ranges[index - 1];
  const fadeDistance = 0.06;
  const enterOpacity = Math.min(1, Math.max(0, (progress - start) / fadeDistance));
  const exitOpacity = Math.min(1, Math.max(0, (end - progress) / fadeDistance));
  const opacity = Math.min(enterOpacity, exitOpacity);
  return {
    opacity,
    transform: `translate3d(0, ${(1 - opacity) * 24}px, 0)`,
  };
}

function getHeroTitleState(progress) {
  const fadeProgress = Math.min(1, progress / 0.2);
  return {
    opacity: 1 - fadeProgress,
    transform: `perspective(1100px) translate3d(0, ${-fadeProgress * 42}px, ${-fadeProgress * 120}px) rotateX(${fadeProgress * 14}deg) scale(${1 - fadeProgress * 0.08})`,
    textShadow: `${fadeProgress * 14}px ${fadeProgress * 18}px 30px rgba(0, 0, 0, ${0.18 + fadeProgress * 0.2}), 0 1px 0 rgba(255, 255, 255, 0.18)`,
  };
}

export function HeroExperience() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const bounds = sectionRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const scrollDistance = Math.max(1, bounds.height - window.innerHeight);
      setScrollProgress(Math.max(0, Math.min(1, -bounds.top / scrollDistance)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen w-full max-w-full overflow-hidden bg-[#071c2b]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,#182b3e_0%,#0a111a_42%,#04070b_100%)]" />
        <EarthGlobe reducedMotion={false} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,11,0.68)_0%,rgba(4,7,11,0.22)_42%,rgba(4,7,11,0.05)_75%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-2 h-40 bg-linear-to-b from-[#071d24]/75 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-48 bg-linear-to-t from-[#071d24] to-transparent" />

        <div className="relative z-3 mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute left-4 top-1/2 z-10 w-[calc(100%-2rem)] max-w-lg -translate-y-1/2 sm:left-6 md:w-auto md:max-w-md lg:left-8" style={getBeatState(scrollProgress, 0)}>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#e2c78b] sm:text-sm">Explore · Discover · Experience</div>
            <h1 className="max-w-xl origin-left transform-gpu font-playfair text-4xl leading-[0.95] text-white sm:text-6xl md:text-5xl lg:text-7xl" style={getHeroTitleState(scrollProgress)}>
              Your journey.<span className="block text-[#e2c78b]">Your way.</span>
            </h1>
            <p className="mt-5 max-w-md font-inter text-sm leading-6 text-white/85 sm:text-base md:text-lg">Carefully crafted journeys that blend wild landscapes, living culture, and the freedom to go further.</p>
          </div>

          {storyBeats.map((beat, index) => (
            <div
              key={beat.title}
              className={`pointer-events-none absolute bottom-24 left-4 right-4 mx-auto w-auto max-w-xs text-left sm:top-1/2 sm:bottom-auto sm:mx-0 sm:max-w-sm sm:-translate-y-1/2 ${beat.side === 'right' ? 'sm:right-6 sm:left-auto sm:text-right lg:right-8' : 'sm:left-6 lg:left-8'}`}
              style={getBeatState(scrollProgress, index + 1)}
            >
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#e2c78b]">{beat.eyebrow}</div>
              <h2 className="font-playfair text-3xl leading-tight text-white sm:text-4xl">{beat.title}</h2>
              <p className="mt-4 font-inter text-sm leading-6 text-white/75 sm:text-base">{beat.body}</p>
            </div>
          ))}

          <div className="absolute bottom-8 left-1/2 z-4 -translate-x-1/2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/65">
            <span className="mb-3 block h-10 w-px bg-[#ead8ad]/70 mx-auto" />
            {scrollProgress > 0.82 ? (
              <Link href="/#destinations" className="pointer-events-auto text-[#ead8ad] transition-colors hover:text-white">
                Continue to destinations <span aria-hidden="true">-&gt;</span>
              </Link>
            ) : 'Scroll to travel'}
          </div>
        </div>
      </div>
    </section>
  );
}