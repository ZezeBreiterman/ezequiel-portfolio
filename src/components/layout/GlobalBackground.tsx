'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useTransform, useSpring } from 'framer-motion';

const GRID_SIZE = 40;
const SPACING = 1.2;
const INSTANCE_COUNT = GRID_SIZE * GRID_SIZE;

// Global mouse tracker
const globalMouse = new THREE.Vector2(0, 0);
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

function TechnicalCore() {
  const { scrollY } = useScroll();
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // 1. Visibility
  const baseOpacity = useTransform(scrollY, [400, 800, 3000, 4000], [0, 1, 1, 0]);
  const opacity = useSpring(baseOpacity, { stiffness: 100, damping: 30 });
  
  const scale = useSpring(useTransform(scrollY, [400, 1000, 2000, 4000], [isMobile ? 0.2 : 0.3, isMobile ? 0.6 : 1, isMobile ? 0.8 : 1.2, 0.8]), { stiffness: 60, damping: 30 });
  
  // 2. Position Transitions
  const posX = useSpring(useTransform(scrollY, [0, 1800, 2500, 4500, 6000], [0, 0, isMobile ? 3 : 6, isMobile ? -3 : -6, 0]), { stiffness: 40, damping: 25 });
  const posY = useSpring(useTransform(scrollY, [0, 2000, 3500, 5000, 6500], [0, 0, 3, -3, 0]), { stiffness: 40, damping: 25 });

  const groupRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      const r = 4 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = r * Math.cos(phi);
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const currentOpacity = opacity.get();

    if (groupRef.current) {
      groupRef.current.visible = currentOpacity > 0.005;
      if (groupRef.current.visible) {
        groupRef.current.rotation.y = time * 0.12;
        groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.15;
        
        groupRef.current.position.x = posX.get() + globalMouse.x * 0.4;
        groupRef.current.position.y = posY.get() + globalMouse.y * 0.4;
        groupRef.current.scale.setScalar(scale.get());
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.6, 64, 64]}>
          <MeshDistortMaterial
            color="#F5A623"
            speed={2.5}
            distort={0.4}
            radius={1}
            emissive="#F5A623"
            emissiveIntensity={0.4}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </Float>
      
      {/* Dynamic Rings */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        {[2.4, 2.6, 3.4, 4.2].map((radius, i) => (
          <Float key={radius} speed={1 + i * 0.5} rotationIntensity={1} floatIntensity={0.2}>
            <mesh rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
              <torusGeometry args={[radius, 0.015, 16, 100]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? "#00E5FF" : "#F5A623"} 
                emissive={i % 2 === 0 ? "#00E5FF" : "#F5A623"} 
                emissiveIntensity={1.5}
                transparent
                opacity={0.5}
              />
            </mesh>
          </Float>
        ))}
      </group>

      {/* Orbiting Particles */}
      <Points positions={particles}>
        <PointMaterial
          transparent
          color="#00E5FF"
          size={0.07}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

function HeroWaves() {
  const { scrollY } = useScroll();
  const { camera } = useThree();
  
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => new Float32Array(INSTANCE_COUNT * 3), []);
  
  const baseColor = new THREE.Color('#08080c');
  const cyan = new THREE.Color('#00E5FF');
  const amber = new THREE.Color('#F5A623');

  const mouseTarget = useRef(new THREE.Vector3());

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollPx = scrollY.get();
    
    const vector = new THREE.Vector3(globalMouse.x, globalMouse.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distZ = (-4 - camera.position.z) / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distZ));
    mouseTarget.current.lerp(pos, 0.1);

    if (meshRef.current) {
      const visibility = Math.max(0, 1 - scrollPx / 1000);
      meshRef.current.visible = visibility > 0.01;
      
      if (meshRef.current.visible) {
        let i = 0;
        const sinkOffset = (scrollPx / 1000) * -12;
        
        for (let x = 0; x < GRID_SIZE; x++) {
          for (let y = 0; y < GRID_SIZE; y++) {
            const posX = (x - GRID_SIZE / 2) * SPACING;
            const posY = (y - GRID_SIZE / 2) * SPACING;
            
            const dx = posX - mouseTarget.current.x;
            const dy = posY - mouseTarget.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            const impactRadius = 7;
            const impact = Math.max(0, impactRadius - dist);
            const ripple = (impact / impactRadius) * 2.8;
            
            const wave = Math.sin(posX * 0.2 + time) * Math.cos(posY * 0.2 + time) * 1.5;
            
            dummy.position.set(posX, posY, wave + ripple - 5 + sinkOffset); 
            dummy.scale.setScalar(0.4 * visibility);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
            
            const c = baseColor.clone();
            if (impact > 0) {
              c.lerp(cyan, (impact / impactRadius) * 0.8 * visibility);
            } else {
              c.lerp(amber, ((wave + 1.5) / 12) * visibility);
            }
            
            colorArray[i * 3] = c.r;
            colorArray[i * 3 + 1] = c.g;
            colorArray[i * 3 + 2] = c.b;
            i++;
          }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.geometry.attributes.color.needsUpdate = true;
      }
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, INSTANCE_COUNT]}>
      <boxGeometry args={[0.5, 0.5, 0.5]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </boxGeometry>
      <meshStandardMaterial vertexColors metalness={0.8} roughness={0.2} transparent />
    </instancedMesh>
  );
}

export default function GlobalBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: '#050508' }}>
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 45 }} 
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[15, 15, 15]} intensity={2.5} color="#00E5FF" />
        <pointLight position={[-15, -15, 15]} intensity={2} color="#F5A623" />
        
        <HeroWaves />
        <TechnicalCore />
      </Canvas>
    </div>
  );
}
