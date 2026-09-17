import React from 'react';
// Simple placeholder geometry for a mountain terrain.
export const MountainPlaceholder = () => (<mesh rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[5, 5, 32, 32]}/>
    <meshStandardMaterial color="#8b5cf6" metalness={0.2} roughness={0.8}/>
  </mesh>);
