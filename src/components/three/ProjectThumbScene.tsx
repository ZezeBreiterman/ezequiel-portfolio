'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DigitalSignal({ color }: { color: string }) {
  const rows = 15;
  const cols = 15;
  const count = rows * cols;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const c = new THREE.Color(color);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      let i = 0;
      for (let x = 0; x < rows; x++) {
        for (let z = 0; z < cols; z++) {
          const posX = (x - rows / 2) * 0.25;
          const posZ = (z - cols / 2) * 0.25;
          
          // Distance from mouse
          const dist = Math.sqrt(
            Math.pow(posX - state.pointer.x * 2, 2) + 
            Math.pow(posZ - state.pointer.y * -2, 2)
          );
          const influence = Math.max(0, 1.5 - dist);
          
          // Wave effect
          const wave = Math.sin(time * 2 + (x + z) * 0.3) * 0.5;
          const height = 0.2 + wave + influence * 2.5;
          
          dummy.position.set(posX, height / 2 - 1, posZ);
          dummy.scale.set(0.15, height, 0.15);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i++, dummy.matrix);
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={1.5} 
        metalness={0.8}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

export default function ProjectThumbScene({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [2, 2, 4], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <DigitalSignal color={color} />
      </Canvas>
    </div>
  );
}
