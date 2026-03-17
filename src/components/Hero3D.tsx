import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const FloatingShape = ({ position, color, speed = 1, distort = 0.3, size = 1 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  size?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.003 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={size}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.35}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const CodeBracket = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.8, 0.15, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color="#0dd3e8"
          emissive="#0dd3e8"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  const shapes = useMemo(() => [
    { position: [-3, 1.5, -2] as [number, number, number], color: "#0dd3e8", speed: 0.8, distort: 0.4, size: 0.8 },
    { position: [3.5, -1, -3] as [number, number, number], color: "#7c3aed", speed: 1.2, distort: 0.3, size: 1.2 },
    { position: [1, 2.5, -4] as [number, number, number], color: "#0dd3e8", speed: 0.6, distort: 0.5, size: 0.6 },
    { position: [-2, -2, -2] as [number, number, number], color: "#7c3aed", speed: 1, distort: 0.2, size: 0.5 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#0dd3e8" />
      <pointLight position={[-10, -5, 5]} intensity={0.4} color="#7c3aed" />
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}
      <CodeBracket position={[2, 1, -1.5]} />
      <CodeBracket position={[-1.5, -1.5, -2.5]} />
    </>
  );
};

const Hero3D = () => (
  <div className="absolute inset-0 z-0">
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  </div>
);

export default Hero3D;
