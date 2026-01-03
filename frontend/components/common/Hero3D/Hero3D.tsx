"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";

function HoloScene() {
  const group = useRef<THREE.Group>(null);

  // Pre-create materials/geometries (performance)
  const mats = useMemo(() => {
    const core = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ff7000"),
      emissive: new THREE.Color("#ff7000"),
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.9,
    });

    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0b0b0f"),
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.35, // glass feel
      thickness: 0.6,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    });

    const ring = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ff7000"),
      emissive: new THREE.Color("#ff7000"),
      emissiveIntensity: 0.35,
      roughness: 0.35,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });

    return { core, glass, ring };
  }, []);

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;

    // Cursor parallax (subtle)
    const tx = -pointer.y * 0.25;
    const ty = pointer.x * 0.45;

    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, tx, 6, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, ty, 6, delta);

    // Gentle breathing
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      Math.sin(performance.now() * 0.001) * 0.06,
      4,
      delta
    );
  });

  return (
    <group ref={group} position={[0.3, 0, 0]}>
      {/* Core */}
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.2}>
        <mesh material={mats.core}>
          <icosahedronGeometry args={[0.75, 2]} />
        </mesh>

        {/* Glass shell - reduced segments for faster load */}
        <mesh material={mats.glass}>
          <sphereGeometry args={[0.98, 32, 32]} />
        </mesh>

        {/* Rings - reduced segments for faster load */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.ring}>
          <torusGeometry args={[1.2, 0.03, 12, 64]} />
        </mesh>
        <mesh rotation={[0.35, 0.4, 0.2]} material={mats.ring}>
          <torusGeometry args={[1.35, 0.02, 12, 64]} />
        </mesh>
        <mesh rotation={[-0.5, 0.2, 0.35]} material={mats.ring}>
          <torusGeometry args={[1.5, 0.018, 12, 64]} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if desktop on mount
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    
    // Add resize listener with debounce
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkDesktop, 150);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Don't render anything on server or mobile
  if (!mounted || !isDesktop) {
    return null;
  }

  return (
    <div className="relative h-[600px] w-full globe">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0.4, 4.4], fov: 42 }}
          gl={{ 
            antialias: true, 
            alpha: true, 
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          dpr={[1, 1.5]}
          frameloop="always"
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 4, 2]} intensity={1.1} />
          <pointLight position={[-3, 1, 2]} intensity={0.8} />

          <HoloScene />
          <Environment preset="city" environmentIntensity={0.5} />
        </Canvas>
      </Suspense>

      {/* Orange glow behind 3D */}
      <div className="pointer-events-none absolute right-6 top-16 h-72 w-72 rounded-full bg-[#ff7000]/20 blur-3xl" />
    </div>
  );
}
