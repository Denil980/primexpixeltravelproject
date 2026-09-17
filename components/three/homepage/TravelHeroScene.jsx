"use client";
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
function useReducedMotionPreference() {
    const [reducedMotion, setReducedMotion] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReducedMotion(mediaQuery.matches);
        update();
        mediaQuery.addEventListener('change', update);
        return () => mediaQuery.removeEventListener('change', update);
    }, []);
    return reducedMotion;
}
function detectWebGL() {
    if (typeof window === 'undefined')
        return true;
    try {
        const canvas = document.createElement('canvas');
        return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    }
    catch (_a) {
        return false;
    }
}
function Traveler({ phase, reducedMotion }) {
    const group = useRef(null);
    const leftLeg = useRef(null);
    const rightLeg = useRef(null);
    const leftArm = useRef(null);
    const rightArm = useRef(null);
    useFrame(({ clock }, delta) => {
        if (!group.current)
            return;
        const elapsed = clock.getElapsedTime();
        const walking = phase === 'walking' || phase === 'arriving';
        const walkingCycle = reducedMotion ? 0 : Math.sin(elapsed * 8) * (walking ? 0.45 : 0.04);
        const armsOpen = phase === 'armsOpen' || phase === 'complete';
        group.current.position.x = THREE.MathUtils.damp(group.current.position.x, phase === 'complete' || armsOpen ? 0.75 : -0.75, 1.8, delta);
        group.current.position.y = THREE.MathUtils.damp(group.current.position.y, walking ? 0.05 + Math.abs(walkingCycle) * 0.04 : 0, 2, delta);
        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, armsOpen ? -0.15 : 0.25, 2, delta);
        if (leftLeg.current)
            leftLeg.current.rotation.x = walkingCycle;
        if (rightLeg.current)
            rightLeg.current.rotation.x = -walkingCycle;
        if (leftArm.current)
            leftArm.current.rotation.z = THREE.MathUtils.damp(leftArm.current.rotation.z, armsOpen ? -1.05 : -0.18, 3, delta);
        if (rightArm.current)
            rightArm.current.rotation.z = THREE.MathUtils.damp(rightArm.current.rotation.z, armsOpen ? 1.05 : 0.18, 3, delta);
    });
    return (<group ref={group} position={[-0.75, 0, 0.6]} scale={0.82}>
      <mesh position={[0, 1.45, 0]} castShadow>
        <sphereGeometry args={[0.19, 20, 16]}/>
        <meshStandardMaterial color="#c98d68" roughness={0.9}/>
      </mesh>
      <mesh position={[0, 1.18, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.52, 8, 16]}/>
        <meshStandardMaterial color="#315b62" roughness={0.82}/>
      </mesh>
      <mesh position={[0, 1.22, -0.2]} castShadow>
        <boxGeometry args={[0.34, 0.48, 0.14]}/>
        <meshStandardMaterial color="#9f4f3c" roughness={0.9}/>
      </mesh>
      <group ref={leftArm} position={[-0.27, 1.25, 0]}>
        <mesh position={[0, -0.23, 0]} rotation={[0, 0, 0.1]} castShadow>
          <capsuleGeometry args={[0.07, 0.38, 6, 10]}/>
          <meshStandardMaterial color="#c98d68" roughness={0.9}/>
        </mesh>
      </group>
      <group ref={rightArm} position={[0.27, 1.25, 0]}>
        <mesh position={[0, -0.23, 0]} rotation={[0, 0, -0.1]} castShadow>
          <capsuleGeometry args={[0.07, 0.38, 6, 10]}/>
          <meshStandardMaterial color="#c98d68" roughness={0.9}/>
        </mesh>
      </group>
      <group ref={leftLeg} position={[-0.11, 0.8, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.48, 6, 10]}/>
          <meshStandardMaterial color="#1d3038" roughness={0.95}/>
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.11, 0.8, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.48, 6, 10]}/>
          <meshStandardMaterial color="#1d3038" roughness={0.95}/>
        </mesh>
      </group>
    </group>);
}
function MountainEnvironment() {
    return (<>
      <mesh position={[0, -0.25, -1.8]} rotation={[0, 0, 0]} receiveShadow>
        <coneGeometry args={[3.5, 3.1, 4]}/>
        <meshStandardMaterial color="#233d43" roughness={1} flatShading/>
      </mesh>
      <mesh position={[2.7, -0.45, -3.2]} rotation={[0, 0.4, 0]}>
        <coneGeometry args={[3.2, 3.8, 4]}/>
        <meshStandardMaterial color="#31545a" roughness={1} flatShading/>
      </mesh>
      <mesh position={[-2.8, -0.55, -3.7]} rotation={[0, -0.5, 0]}>
        <coneGeometry args={[2.7, 3.2, 4]}/>
        <meshStandardMaterial color="#40666a" roughness={1} flatShading/>
      </mesh>
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]}/>
        <meshStandardMaterial color="#182d2e" roughness={1}/>
      </mesh>
      {[-2.2, -1.6, 1.8, 2.3].map((x, index) => (<group key={x} position={[x, 0, -1.1 - index * 0.35]} scale={0.55 + index * 0.08}>
          <mesh position={[0, 0.55, 0]} castShadow>
            <coneGeometry args={[0.35, 1.4, 6]}/>
            <meshStandardMaterial color="#173d3d" roughness={1}/>
          </mesh>
          <mesh position={[0, 1.05, 0]} castShadow>
            <coneGeometry args={[0.28, 1.1, 6]}/>
            <meshStandardMaterial color="#24544d" roughness={1}/>
          </mesh>
        </group>))}
    </>);
}
function HeroCamera({ phase, reducedMotion }) {
    const { camera, pointer } = useThree();
    useFrame((_, delta) => {
        const targetX = reducedMotion ? 0 : pointer.x * 0.12;
        const targetY = reducedMotion ? 1.2 : 1.2 + pointer.y * 0.08;
        const targetZ = phase === 'complete' ? 6.2 : 5.3;
        // R3F exposes the active camera as a mutable Three.js object.
        // eslint-disable-next-line react-hooks/immutability
        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 1.3, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 1.3, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 1.1, delta);
        camera.lookAt(0, 0.8, -1.2);
    });
    return null;
}
function Scene({ phase, reducedMotion }) {
    return (<>
      <color attach="background" args={["#102d35"]}/>
      <fog attach="fog" args={["#102d35", 4, 12]}/>
      <ambientLight intensity={1.3} color="#c6d7c4"/>
      <directionalLight position={[-4, 6, 4]} intensity={2.2} color="#ffd7a0" castShadow/>
      <directionalLight position={[4, 2, -3]} intensity={0.7} color="#98c6c8"/>
      <Stars radius={60} depth={25} count={reducedMotion ? 250 : 700} factor={2} saturation={0} fade speed={0.15}/>
      <MountainEnvironment />
      <Traveler phase={phase} reducedMotion={reducedMotion}/>
      <HeroCamera phase={phase} reducedMotion={reducedMotion}/>
      <Environment preset="sunset"/>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false}/>
    </>);
}
export function TravelHeroScene() {
    const reducedMotion = useReducedMotionPreference();
    const [phase, setPhase] = useState('idle');
    const [webGLAvailable] = useState(detectWebGL);
    useEffect(() => {
        if (reducedMotion) {
            return;
        }
        const phases = [
            ['walking', 300],
            ['arriving', 2200],
            ['armsOpen', 2750],
            ['complete', 3800],
        ];
        const timers = phases.map(([nextPhase, delay]) => window.setTimeout(() => setPhase(nextPhase), delay));
        return () => timers.forEach(window.clearTimeout);
    }, [reducedMotion]);
    const visiblePhase = reducedMotion ? 'complete' : phase;
    if (!webGLAvailable) {
        return <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_68%_26%,#628b82_0%,#244b50_42%,#102d35_78%)]"/>;
    }
    return (<div aria-hidden="true" className="absolute inset-0">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 1.2, 5.3], fov: 38 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <Scene phase={visiblePhase} reducedMotion={reducedMotion}/>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(6,22,27,0.58)_100%)]"/>
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.32%22/%3E%3C/svg%3E')]"/>
    </div>);
}
