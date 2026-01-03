"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function OceanParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  // ✅ positions는 렌더 중 생성 금지 → ref로 보관
  const positionsRef = useRef<Float32Array | null>(null);

  // ✅ bufferAttribute를 ref로 잡아서 나중에 값 주입
  const attrRef = useRef<THREE.BufferAttribute | null>(null);

  const count = 1000;

  // ✅ 랜덤 생성은 클라이언트 마운트 이후 1회만 실행
  useEffect(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 50;
      arr[i + 1] = (Math.random() - 0.5) * 50;
      arr[i + 2] = (Math.random() - 0.5) * 50;
    }

    positionsRef.current = arr;

    // ✅ attribute가 만들어진 뒤라면 값 주입 + 업데이트 플래그
    if (attrRef.current) {
      attrRef.current.set(arr);
      attrRef.current.needsUpdate = true;
    }
  }, [count]);

  useFrame((state) => {
    const p = pointsRef.current;
    if (!p) return;

    const t = state.clock.getElapsedTime();
    p.rotation.y = t * 0.05;
    p.position.y = Math.sin(t * 0.2) * 2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* ✅ 타입 에러 방지: args로 BufferAttribute 생성 */}
        <bufferAttribute
          ref={attrRef}
          attach="attributes-position"
          args={[new Float32Array(count * 3), 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.05}
        color="#5C89DD"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const m = meshRef.current;
    if (!m) return;

    const t = state.clock.getElapsedTime();
    m.rotation.x = t * 0.1;
    m.rotation.y = t * 0.15;
    m.position.y = Math.sin(t * 0.3) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#2E89E4"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
}

function CameraAnimation({ isDiving }: { isDiving: boolean }) {
  useFrame((state) => {
    const targetZ = isDiving ? -10 : 5;
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.02
    );
  });
  return null;
}

// export function DeepSeaScene({ isDiving }: { isDiving: boolean }) {
//   return (
//     <div className="absolute inset-0 w-full h-full">
//       <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: "transparent" }}>
//         <ambientLight intensity={0.3} />
//         <pointLight position={[10, 10, 10]} intensity={0.5} />
//         <pointLight position={[-10, -10, -10]} intensity={0.3} color="#5C89DD" />

//         <Stars
//           radius={50}
//           depth={50}
//           count={2000}
//           factor={4}
//           saturation={0.5}
//           fade
//           speed={0.5}
//         />

//         <OceanParticles />
//         <AnimatedSphere />
//         <CameraAnimation isDiving={isDiving} />

//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           maxPolarAngle={Math.PI / 2}
//           minPolarAngle={Math.PI / 2}
//           autoRotate
//           autoRotateSpeed={0.5}
//         />
//       </Canvas>
//     </div>
//   );
// }

export function DeepSeaScene({ isDiving }: { isDiving: boolean }) {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        background:
          "radial-gradient(1200px 800px at 50% 20%, rgba(46,137,228,0.18), rgba(11,18,32,1) 60%), linear-gradient(180deg, #111A2E 0%, #0B1220 55%, #050A14 100%)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: "transparent" }}>
        {/* ✅ 심해 포그 */}
        <fog attach="fog" args={["#0B1220", 6, 28]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[2, 8, 5]} intensity={0.6} color="#5C89DD" />
        <pointLight position={[-10, -10, -10]} intensity={0.25} color="#1F6ED6" />

        <OceanParticles />
        {/* AnimatedSphere는 일단 꺼보고 비교 추천 */}
        {/* <AnimatedSphere /> */}
        <CameraAnimation isDiving={isDiving} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.15}
        />
      </Canvas>
    </div>
  );
}
