'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './HeroScene.module.css';

const GRID_SIZE = 60;
const SPACING = 0.5;
const INSTANCE_COUNT = GRID_SIZE * GRID_SIZE;

function InteractiveOcean() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => new Float32Array(INSTANCE_COUNT * 3), []);
  
  const baseColor = new THREE.Color('#101015');
  const accent1 = new THREE.Color('#F5A623');
  const accent2 = new THREE.Color('#00E5FF');

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { pointer, viewport } = state;

    if (meshRef.current) {
      let i = 0;
      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          const posX = (x - GRID_SIZE / 2) * SPACING;
          const posY = (y - GRID_SIZE / 2) * SPACING;

          // Multi-frequency noise-like waves
          const wave1 = Math.sin(posX * 0.3 + time * 0.5) * 0.8;
          const wave2 = Math.cos(posY * 0.4 + time * 0.8) * 0.5;
          const wave3 = Math.sin((posX + posY) * 0.2 + time) * 1.2;
          
          // Interaction
          const dist = Math.sqrt(Math.pow(posX - pointer.x * viewport.width * 1.5, 2) + Math.pow(posY - pointer.y * viewport.height * 1.5, 2));
          const ripple = Math.max(0, 5 - dist) * 0.5;
          
          const z = wave1 + wave2 + wave3 + ripple;

          dummy.position.set(posX, posY, z);
          
          // Rotation based on wave slope (pseudo-normals)
          dummy.rotation.x = Math.sin(time + x * 0.1) * 0.1;
          dummy.rotation.y = Math.cos(time + y * 0.1) * 0.1;
          
          // Scale
          const s = 0.35 + ripple * 0.1;
          dummy.scale.set(s, s, s * 4);
          
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);

          // Dynamic colors
          const c = baseColor.clone();
          const mix = (z + 2.5) / 5;
          c.lerp(accent1, mix * 0.3);
          if (ripple > 0) c.lerp(accent2, ripple / 3);
          
          colorArray[i * 3] = c.r;
          colorArray[i * 3 + 1] = c.g;
          colorArray[i * 3 + 2] = c.b;

          i++;
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, INSTANCE_COUNT]}>
      <boxGeometry args={[0.2, 0.2, 0.2]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </boxGeometry>
      <meshPhysicalMaterial 
        vertexColors 
        roughness={0.15} 
        metalness={0.9} 
        reflectivity={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </instancedMesh>
  );
}

export default function HeroScene() {
  return (
    <div className={styles.canvas} aria-hidden="true">
      <Canvas
        camera={{ position: [0, -12, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#F5A623" />
        <pointLight position={[-10, -10, 10]} intensity={1.5} color="#00E5FF" />
        <InteractiveOcean />
      </Canvas>
    </div>
  );
}
