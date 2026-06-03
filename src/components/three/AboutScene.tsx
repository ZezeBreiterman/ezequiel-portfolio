'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
      meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.2;
      
      // Follow mouse subtly
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, state.pointer.x * 0.5, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, state.pointer.y * 0.5, 0.1);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]} scale={1.5}>
      <MeshDistortMaterial
        color="#F5A623"
        speed={1.5}
        distort={0.4}
        radius={1}
        emissive="#F5A623"
        emissiveIntensity={0.2}
        metalness={0.9}
        roughness={0.1}
      />
    </Sphere>
  );
}

export default function AboutScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        <MorphingBlob />
      </Canvas>
    </div>
  );
}
