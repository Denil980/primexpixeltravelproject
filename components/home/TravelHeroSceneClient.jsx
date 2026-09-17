"use client";
import dynamic from 'next/dynamic';
const TravelHeroScene = dynamic(() => import('@/components/three/homepage/TravelHeroScene').then((module) => module.TravelHeroScene), { ssr: false });
export function TravelHeroSceneClient() {
    return <TravelHeroScene />;
}
