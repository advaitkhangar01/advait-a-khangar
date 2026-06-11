import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface ThemeColors {
  primary: string;
  glow: string;
  innerHalo: string;
  spotlight: string;
}

const THEME_MAP: Record<string, ThemeColors> = {
  gold: {
    primary: '#C9A227',
    glow: '#C9A227',
    innerHalo: '#FFE98A',
    spotlight: '#2563EB',
  },
  indigo: {
    primary: '#4F46E5',
    glow: '#4F46E5',
    innerHalo: '#C7D2FE',
    spotlight: '#EC4899',
  },
  emerald: {
    primary: '#059669',
    glow: '#059669',
    innerHalo: '#A7F3D0',
    spotlight: '#D97706',
  },
  coral: {
    primary: '#EA580C',
    glow: '#EA580C',
    innerHalo: '#FED7AA',
    spotlight: '#3B82F6',
  },
  amethyst: {
    primary: '#BE185D',
    glow: '#BE185D',
    innerHalo: '#FBCFE8',
    spotlight: '#6366F1',
  }
};

// ==========================================================================
// 3D GLASS CRYSTAL CORE
// ==========================================================================
interface CentralNexusProps {
  theme: string;
}

const CentralNexus: React.FC<CentralNexusProps> = ({ theme }) => {
  const colors = THEME_MAP[theme] || THEME_MAP.gold;
  const crystalMeshRef = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const outerHaloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate the glass crystal
    if (crystalMeshRef.current) {
      crystalMeshRef.current.rotation.y = time * 0.15;
      crystalMeshRef.current.rotation.z = time * 0.08;
      
      // Gentle breathing scale
      const scale = 1.0 + Math.sin(time * 1.5) * 0.03;
      crystalMeshRef.current.scale.set(scale, scale, scale);
    }

    // Pulse the inner glowing energy core
    if (innerSphereRef.current) {
      const innerScale = 0.45 + Math.sin(time * 2.5) * 0.05;
      innerSphereRef.current.scale.set(innerScale, innerScale, innerScale);
    }

    // Gentle pulse on the background outer halo
    if (outerHaloRef.current) {
      const outerScale = 1.3 + Math.cos(time * 1.5) * 0.04;
      outerHaloRef.current.scale.set(outerScale, outerScale, outerScale);
      if (outerHaloRef.current.material) {
        const mat = outerHaloRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.04 + Math.sin(time * 1.5) * 0.015;
      }
    }
  });

  return (
    <group>
      {/* 3D Glass Polyhedron Core */}
      <mesh ref={crystalMeshRef}>
        <icosahedronGeometry args={[0.8, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={3}
          thickness={0.8}
          chromaticAberration={0.12}
          anisotropy={0.2}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          roughness={0.08}
          attenuationDistance={1.2}
          attenuationColor="#FAFAF8"
          color={colors.primary}
          transmission={0.96}
          opacity={1}
        />
      </mesh>

      {/* Internal Glowing Energy Core */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={colors.primary} />
      </mesh>

      {/* Wide Outer Halo Glow (Dynamic Primary Glow) */}
      <mesh ref={outerHaloRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color={colors.primary}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// ==========================================================================
// GYROSCOPIC GLASS RING WITH SATELLITE NODES
// ==========================================================================
interface GlassRingProps {
  radius: number;
  width: number;
  speed: number;
  axis: 'x' | 'y' | 'z';
  color: string;
  sides?: number;
}

const ArchitecturalGlassRing: React.FC<GlassRingProps> = ({ radius, width, speed, axis, color, sides = 5 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const accentLineRef = useRef<THREE.Mesh>(null);
  const satellitesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      const rot = time * speed;
      // Gyroscopic tilt & wobble on rotation
      if (axis === 'x') {
        groupRef.current.rotation.x = rot;
        groupRef.current.rotation.y = Math.sin(time * 0.4) * 0.12;
      } else if (axis === 'y') {
        groupRef.current.rotation.y = rot;
        groupRef.current.rotation.z = Math.cos(time * 0.3) * 0.15;
      } else {
        groupRef.current.rotation.z = rot;
        groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      }
    }

    // Glowing wireframe pulse
    if (accentLineRef.current && accentLineRef.current.material) {
      const mat = accentLineRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.2 + Math.sin(time * 2.2 + radius * 3.0) * 0.15;
    }

    // Rotate satellites opposite direction
    if (satellitesRef.current) {
      satellitesRef.current.rotation.z = -time * speed * 1.6;
    }
  });

  const tubeRadius = width * 0.25;

  return (
    <group ref={groupRef}>
      {/* Faceted Reflective Torus (Optimized using meshPhysicalMaterial to prevent shader compile lag) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, tubeRadius, sides, 80]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.08}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Orbiting wireframe rail */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius + tubeRadius * 1.8, 0.005, 8, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>
      
      {/* Outer glowing line */}
      <mesh ref={accentLineRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius + tubeRadius * 2.4, 0.003, 8, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>

      {/* Orbiting Satellites */}
      <group ref={satellitesRef} rotation={[Math.PI / 2, 0, 0]}>
        {[0, Math.PI * 0.67, Math.PI * 1.33].map((angle, idx) => {
          const orbitRadius = radius + tubeRadius * 1.8;
          const x = Math.cos(angle) * orbitRadius;
          const y = Math.sin(angle) * orbitRadius;
          return (
            <group key={idx} position={[x, y, 0]}>
              <mesh>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshBasicMaterial color={color} />
              </mesh>
              <mesh>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};

// ==========================================================================
// GLOWING DATA PIPELINES & SATURN DUST RING
// ==========================================================================
interface DataPipelinesProps {
  theme: string;
}

const DataPipelines: React.FC<DataPipelinesProps> = ({ theme }) => {
  const colors = THEME_MAP[theme] || THEME_MAP.gold;
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const count = 40;
  const radius = 2.8;
  const [vertices] = useState(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      arr.push(new THREE.Vector3(x, y, z));
    }
    return arr;
  });

  const [linePairs] = useState(() => {
    const pairs: THREE.Vector3[] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dist = vertices[i].distanceTo(vertices[j]);
        // Connect nearby nodes to form a clean micro-lattice network
        if (dist < 1.8) {
          pairs.push(vertices[i], vertices[j]);
        }
      }
    }
    return pairs;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = time * 0.03;
      if (pointsRef.current.material) {
        const mat = pointsRef.current.material as THREE.PointsMaterial;
        mat.opacity = 0.5 + Math.sin(time * 2.5) * 0.25;
      }
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.05;
      linesRef.current.rotation.x = time * 0.03;
      if (linesRef.current.material) {
        const mat = linesRef.current.material as THREE.LineBasicMaterial;
        mat.opacity = 0.10 + Math.sin(time * 1.5) * 0.05;
      }
    }
  });

  const pointGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePairs);

  return (
    <group>
      <points ref={pointsRef} geometry={pointGeometry}>
        <pointsMaterial
          color={colors.primary}
          size={0.06}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#A8ADB4"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

// Saturn-style planetary stardust ring
interface StarDustRingProps {
  color: string;
}

const StarDustRing: React.FC<StarDustRingProps> = ({ color }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 90;
  const [vertices] = useState(() => {
    const coords = [];
    let seed = 123;
    const pseudoRandom = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.15 + pseudoRandom() * 0.55;
      const x = Math.cos(angle) * r;
      const y = (pseudoRandom() - 0.5) * 0.06;
      const z = Math.sin(angle) * r;
      coords.push(new THREE.Vector3(x, y, z));
    }
    return coords;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.08;
    }
  });

  const geom = new THREE.BufferGeometry().setFromPoints(vertices);

  return (
    <group rotation={[Math.PI / 7, 0, Math.PI / 10]}>
      <points ref={pointsRef} geometry={geom}>
        <pointsMaterial
          color={color}
          size={0.03}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

// ==========================================================================
// SCENE CONTROLLER & TRANSITION
// ==========================================================================
interface SceneControllerProps {
  theme: string;
  isPreloaded: boolean;
}

const SceneController: React.FC<SceneControllerProps> = ({ theme, isPreloaded }) => {
  const colors = THEME_MAP[theme] || THEME_MAP.gold;
  const groupRef = useRef<THREE.Group>(null);
  
  const ringsGroupRef = useRef<THREE.Group>(null);
  const pipelinesGroupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect viewport size for mobile layouts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Caching the stable scroll height to prevent dynamic address bar resize jitter on mobile
  const widthRef = useRef(window.innerWidth);
  const scrollHeightRef = useRef(0);

  useEffect(() => {
    const updateScrollHeight = () => {
      const isMobileSize = window.innerWidth < 1024;
      const widthChanged = Math.abs(window.innerWidth - widthRef.current) > 5;
      
      // On mobile, only update scroll height if the width actually changed (ignoring address bar dynamic resize)
      if (!isMobileSize || widthChanged || scrollHeightRef.current === 0) {
        widthRef.current = window.innerWidth;
        scrollHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
      }
    };
    updateScrollHeight();
    window.addEventListener('resize', updateScrollHeight);
    return () => window.removeEventListener('resize', updateScrollHeight);
  }, []);

  // Track mouse coordinates for smooth parallax
  const mouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Detailed multi-phase transition properties ref
  const transitionProps = useRef({
    x: 0,           // Horizontal offset (0 center, 1 scroll-based position)
    y: -1.5,        // Vertical offset (1.5 shifted down to bottom half during loading)
    z: -2.0,        // Z depth coordinates (pushed into background during loading)
    scale: 0.85,    // Crystal core scale multiplier (smaller in background during loading)
    ringsScale: 0.75, // Rings expand scale (0.75 tight orbit during loading)
    opacity: 0.25   // Pipelines/stardust opacity multiplier (faint during loading)
  });

  // Animate transition variables on preloader completion
  useEffect(() => {
    if (isPreloaded) {
      const tl = gsap.timeline();

      // Phase 1: Retreat crystal and rings deeper into background (anticipation)
      tl.to(transitionProps.current, {
        scale: 0.5,
        z: -3.2,
        ringsScale: 0.4,
        opacity: 0.05,
        duration: 0.45,
        ease: 'power2.inOut'
      });

      // Phase 2: Zoom forward and glide to the right Hero position (Smooth exponential ease)
      tl.to(transitionProps.current, {
        x: 1,
        y: 0, // Settle back to 0 scroll position
        z: 0,
        scale: 1.0,
        duration: 1.8,
        ease: 'expo.out'
      }, '-=0.15');

      // Phase 3: Concentric rings and pipelines fly out with a soft back spring
      tl.to(transitionProps.current, {
        ringsScale: 1.0,
        opacity: 1.0,
        duration: 1.5,
        ease: 'back.out(1.2)'
      }, '-=1.5');
    } else {
      transitionProps.current.x = 0;
      transitionProps.current.y = -1.5; // Shifted down to bottom half during loading
      transitionProps.current.z = -2.0; // Pushed back into background during loading
      transitionProps.current.scale = 0.85; // Smaller size during loading
      transitionProps.current.ringsScale = 0.75;
      transitionProps.current.opacity = 0.25;
    }
  }, [isPreloaded]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // 1. Mouse Parallax (Luxurious Float Damping)
    const targetX = mouse.current.x * 0.25;
    const targetY = mouse.current.y * 0.25;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.035;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.035;
    
    // 2. Scroll Transformation using cached stable scrollHeight to ignore dynamic browser bar updates
    const scrollHeight = scrollHeightRef.current || (document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    const scrollTargetPos = new THREE.Vector3(2.2, 0, 0); // Default to right side in Hero
    let scrollTargetScale: number;
    
    if (isMobile) {
      // Mobile Centered Positions (no horizontal offset to prevent offscreen rendering)
      if (scrollProgress < 0.15) {
        // Hero Moment: Centered background, scaled down slightly
        scrollTargetPos.set(0, 0, -1.0);
        scrollTargetScale = 0.55;
      } else if (scrollProgress >= 0.15 && scrollProgress < 0.35) {
        // Story Moment
        scrollTargetPos.set(0, -0.2, -2.5);
        scrollTargetScale = 0.5;
      } else if (scrollProgress >= 0.35 && scrollProgress < 0.65) {
        // Product Moments
        scrollTargetPos.set(0, 0, -2.0); 
        scrollTargetScale = 0.45;
      } else if (scrollProgress >= 0.65 && scrollProgress < 0.85) {
        // Technical Case Studies / How I Work
        scrollTargetPos.set(0, 0.2, -1.2); 
        scrollTargetScale = 0.65;
      } else if (scrollProgress >= 0.85 && scrollProgress < 0.95) {
        // Ask AI
        scrollTargetPos.set(0, -0.6, -1.8);
        scrollTargetScale = 0.5;
      } else {
        // Contact Moment / Footer
        scrollTargetPos.set(0, -1.0, -2.2);
        scrollTargetScale = 0.45;
      }
    } else {
      // Desktop Positions
      if (scrollProgress < 0.15) {
        const ratio = scrollProgress / 0.15;
        scrollTargetPos.set(2.2 - ratio * 2.2, 0, 0);
        scrollTargetScale = 1.0 + ratio * 0.2;
      } else if (scrollProgress >= 0.15 && scrollProgress < 0.35) {
        const ratio = (scrollProgress - 0.15) / 0.2;
        scrollTargetPos.set(0, -ratio * 0.5, -ratio * 2);
        scrollTargetScale = 1.2 - ratio * 0.4;
      } else if (scrollProgress >= 0.35 && scrollProgress < 0.65) {
        scrollTargetPos.set(-2.5, 0.5, -1.0); 
        scrollTargetScale = 0.8;
      } else if (scrollProgress >= 0.65 && scrollProgress < 0.85) {
        const ratio = (scrollProgress - 0.65) / 0.2;
        scrollTargetPos.set(0, 0, 1.0 - ratio * 1.0); 
        scrollTargetScale = 1.4;
      } else if (scrollProgress >= 0.85 && scrollProgress < 0.95) {
        const ratio = (scrollProgress - 0.85) / 0.1;
        scrollTargetPos.set(2.5 - ratio * 0.5, -1.5 - ratio * 0.5, -1.5);
        scrollTargetScale = 0.8 - ratio * 0.1;
      } else {
        const ratio = (scrollProgress - 0.95) / 0.05;
        scrollTargetPos.set(2.0 - ratio * 2.0, -2.0 + ratio * 2.0, -1.5 - ratio * 1.0);
        scrollTargetScale = 0.7 + ratio * 0.8;
      }
    }

    // 3. Coordinate Transition (Interpolate from centered loading state to scroll-based layout)
    const p = transitionProps.current;
    const targetPos = new THREE.Vector3().lerpVectors(new THREE.Vector3(0, p.y, p.z), scrollTargetPos, p.x);
    const targetScale = p.scale * THREE.MathUtils.lerp(1.1, scrollTargetScale, p.x);

    // Apply smooth linear interpolation (lerp - optimized to 0.028 for deep fluid parallax inertia)
    groupRef.current.position.lerp(targetPos, 0.028);
    const currentScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.028);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);

    // Slowly drift position for cinematic ambient flow
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y += Math.sin(time * 1.5) * 0.002;

    // 4. Animate expanding rings and pipelines
    if (ringsGroupRef.current) {
      ringsGroupRef.current.scale.set(p.ringsScale, p.ringsScale, p.ringsScale);
    }
    if (pipelinesGroupRef.current) {
      pipelinesGroupRef.current.scale.set(p.ringsScale, p.ringsScale, p.ringsScale);
      pipelinesGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Points) {
          const mat = child.material as THREE.PointsMaterial;
          if (mat) mat.opacity = (child.name === 'stardust' ? 0.4 : 0.8) * p.opacity;
        } else if (child instanceof THREE.LineSegments) {
          const mat = child.material as THREE.LineBasicMaterial;
          if (mat) mat.opacity = 0.15 * p.opacity;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating Wrapper */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Core elements */}
        <CentralNexus theme={theme} />
        
        {/* Pipelines Group (scaled & faded on transition) */}
        <group ref={pipelinesGroupRef}>
          <DataPipelines theme={theme} />
          <StarDustRing color={colors.primary} />
        </group>
        
        {/* Concentric Rings Group (scaled on transition) */}
        <group ref={ringsGroupRef}>
          {/* Inner Glass Layer (Faceted pentagonal section) */}
          <ArchitecturalGlassRing radius={1.4} width={0.15} speed={0.2} axis="y" color="#FFFFFF" sides={5} />
          
          {/* Middle Structure Ring (Dynamic Tinted triangular section) */}
          <ArchitecturalGlassRing radius={2.0} width={0.25} speed={-0.12} axis="x" color={colors.primary} sides={3} />
          
          {/* Outer Orbit Pipeline Ring (Silver Tone hexagonal section) */}
          <ArchitecturalGlassRing radius={2.6} width={0.08} speed={0.08} axis="z" color="#A8ADB4" sides={6} />
        </group>
      </Float>
    </group>
  );
};

// Main Export Component
interface SystemCoreProps {
  theme: string;
  isPreloaded: boolean;
}

export const SystemCore: React.FC<SystemCoreProps> = ({ theme, isPreloaded }) => {
  const colors = THEME_MAP[theme] || THEME_MAP.gold;
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="threejs-canvas-wrapper"
      style={{
        zIndex: isPreloaded ? 1 : 9995,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none'
      }}
    >
      <Canvas
        className="interactive-3d-canvas"
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={isMobile ? 1 : [1, 1.5]} // Limit pixel ratio on mobile screens to save GPU fill rate and prevent frame drop
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FAFAF8" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color={colors.primary} />
        <spotLight position={[0, 10, 0]} intensity={2.0} angle={0.3} penumbra={1} color={colors.spotlight} />
        
        <SceneController theme={theme} isPreloaded={isPreloaded} />
        
        {/* Subdued ambient environment grids */}
        <gridHelper args={[20, 20, '#A8ADB4', '#E5E7EB']} position={[0, -4, 0]} />
      </Canvas>
    </div>
  );
};

export default SystemCore;
