"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { AxesHelper } from "three";
import FishSchool from "./FishSchool";
import JellyBloom from "./Jellyfish";
import WreckAndShark from "./Diver";
import DiverSprite from "./Diver";

// =========================================
// 유틸리티 및 설정
// =========================================

const lerpColor = (colorA: string, colorB: string, t: number) => {
  const cA = new THREE.Color(colorA);
  const cB = new THREE.Color(colorB);
  return cA.lerp(cB, t == 100 ? 95 : t);
};

const CONFIG = {
  maxDepth: 100,
  surfaceColor: "#4fbaf0",
  deepColor: "#0d2736",
  bubbleCount: 150,
  particleCount: 2000,
};

type BubbleParticle = {
  x: number;
  y: number;
  z: number;
  speed: number;
  scale: number;
  offset: number;
};

function DepthSmoother({
  target,
  onUpdate,
  follow = 10, // 6~14 범위 추천 (클수록 빨리 따라감)
}: {
  target: number; // depthRatio (0~1)
  onUpdate: (v: number) => void; // smoothDepthRatio 전달
  follow?: number;
}) {
  const smoothRef = useRef(0);

  // target이 바뀌어도 smoothRef는 유지되게
  const targetRef = useRef(target);
  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-follow * delta); // 프레임 독립 스무딩
    smoothRef.current = THREE.MathUtils.lerp(
      smoothRef.current,
      targetRef.current,
      k
    );
    onUpdate(smoothRef.current);
  });

  return null;
}

// 1. Bubbles 아래에서 위로 올라오는 거품 
function Bubbles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { bubbleCount } = CONFIG;

  const particlesRef = useRef<BubbleParticle[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const data: BubbleParticle[] = [];
    for (let i = 0; i < bubbleCount; i++) {
      data.push({
        x: (Math.random() - 0.5) * 20,
        y: Math.random() * -CONFIG.maxDepth,
        z: (Math.random() - 0.5) * 20,
        speed: 0.05 + Math.random() * 0.1,
        scale: 0.05 + Math.random() * 0.15,
        offset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = data;
  }, [bubbleCount]);

  useFrame((state) => {
    if (!meshRef.current || particlesRef.current.length === 0) return;
    const t = state.clock.getElapsedTime();

    particlesRef.current.forEach((p, i) => {
      p.y += p.speed;
      const wobbleX = Math.sin(t * 2 + p.offset) * 0.1;
      const wobbleZ = Math.cos(t * 2 + p.offset) * 0.1;

      if (p.y > 5) {
        p.y = -CONFIG.maxDepth;
        p.x = (Math.random() - 0.5) * 20;
        p.z = (Math.random() - 0.5) * 20;
      }

      //dummy를 i번째 버블이라고 가정
      dummy.position.set(p.x + wobbleX, p.y, p.z + wobbleZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, bubbleCount]}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshPhysicalMaterial
        color="white"
        transparent
        opacity={0.4}
        roughness={0.1}
        metalness={0.1}
        clearcoat={1}
        emissiveIntensity={5}
        emissive={"#ffffff"}
      />
    </instancedMesh>
  );
}

// 2. OceanParticles 부유물
function OceanParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<Float32Array | null>(null);
  const attrRef = useRef<THREE.BufferAttribute | null>(null);
  const { particleCount } = CONFIG;

  const dataArray = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);

  useEffect(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 60;
      arr[i + 1] = Math.random() * -CONFIG.maxDepth * 1.2;
      arr[i + 2] = (Math.random() - 0.5) * 60;
    }
    positionsRef.current = arr;

    if (attrRef.current) {
      attrRef.current.set(arr);
      attrRef.current.needsUpdate = true;
    }
  }, [particleCount]);

  useFrame((state) => {
    const p = pointsRef.current;
    if (!p) return;
    p.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  // OceanParticles 컴포넌트 내부의 return 부분 수정
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          ref={attrRef}
          attach="attributes-position"
          // ✅ 생성자 인자: [데이터배열, 항목당크기(XYZ=3)]
          args={[dataArray, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8ab4f8"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}


// 4. DiveController
function DiveController({ depthRatio }: { depthRatio: number }) {
  // useThree()에서 camera, scene을 꺼내지 않습니다.
  const fogRef = useRef<THREE.FogExp2>(null);

  const currentColor = useMemo(() =>
    lerpColor(CONFIG.surfaceColor, CONFIG.deepColor, depthRatio),
    [depthRatio]);

  useFrame((state) => {
    // ✅ state.camera, state.scene을 통해 접근해야 안전합니다.
    const camera = state.camera as THREE.PerspectiveCamera;
    const scene = state.scene;

    // 1. 카메라 위치 제어 //카메라 이동의 필요성이 있나?
    const targetY = -depthRatio * CONFIG.maxDepth;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);

    // 2. 카메라 FOV 제어 //카메라 FOV제어의 필요성도 딱히..
    // const targetFov = 75 - depthRatio * 15;
    // camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);
    // camera.updateProjectionMatrix();

    // 3. 안개(Fog) 제어
    // if (fogRef.current) {
    //   fogRef.current.color.lerp(currentColor, 0.1);
    //   const density = 0.02 + Math.sin(depthRatio * Math.PI) * 0.03;
    //   fogRef.current.density = THREE.MathUtils.lerp(fogRef.current.density, density, 0.05);
    // }

    // 4. 배경색 제어
    scene.background = currentColor;

  });

  return (
    // <fogExp2
    //   ref={fogRef}
    //   attach="fog"
    //   // 생성자 인자: [색상, 밀도] 순서대로 배열로 전달
    //   args={[CONFIG.surfaceColor, 0.02]}
    // />
    null
  );
}

// 5. SceneLighting 필요성을 잘..
function SceneLighting({ depthRatio }: { depthRatio: number }) {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const intensityFactor = 1 - depthRatio * 0.8;
    if (dirLightRef.current) {
      dirLightRef.current.intensity = THREE.MathUtils.lerp(dirLightRef.current.intensity, 0.8 * intensityFactor, 0.05);
    }
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(ambientLightRef.current.intensity, 0.3 * intensityFactor, 0.05);
    }
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.3} color={CONFIG.surfaceColor} />
      <directionalLight
        ref={dirLightRef}
        position={[5, 10, 5]}
        intensity={0.8}
        color="#ffffff"
      />
      <pointLight position={[0, -CONFIG.maxDepth / 2, 0]} intensity={0.5} color={CONFIG.deepColor} distance={30} />
    </>
  );
}

// =========================================
// 메인 페이지 컴포넌트
// =========================================
export default function DeepSeaScene() {
  const [depthRatio, setDepthRatio] = useState(0);
  const [smoothDepthRatio, setSmoothDepthRatio] = useState(0);
  const [currentDepthMeter, setCurrentDepthMeter] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      const scrollRange = documentHeight - windowHeight;

      let ratio = scrollRange > 0 ? scrollY / scrollRange : 0;
      ratio = Math.min(Math.max(ratio, 0), 1);

      setDepthRatio(ratio);
      setCurrentDepthMeter(Math.round(ratio * CONFIG.maxDepth));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div style={{ height: "500vh" }} className="pointer-events-none" />


      <div className="fixed inset-0 w-full h-full z-[-1] bg-black">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >

          <DepthSmoother
            target={depthRatio}
            onUpdate={setSmoothDepthRatio}
            follow={10}
          />

          <DiveController depthRatio={smoothDepthRatio} />
          {/* <SceneLighting depthRatio={depthRatio} /> */}

          <OceanParticles />
          <Bubbles />
          {/* <SimpleGodRays /> */}
          <FishSchool depthRatio={smoothDepthRatio} />
          <JellyBloom depthRatio={smoothDepthRatio} />
          <DiverSprite depthRatio={smoothDepthRatio} />

          {/* <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.2}
            maxAzimuthAngle={Math.PI / 6}
            minAzimuthAngle={-Math.PI / 6}
            rotateSpeed={0.2}
            enableDamping={false}
          /> */}

          {/* <axesHelper args={[5]} /> */}

        </Canvas>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
                      radial-gradient(circle at 50% 25%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.55) 100%),
                      linear-gradient(180deg, rgba(79,186,240,0.10) 0%, rgba(11,18,32,0.35) 55%, rgba(5,10,20,0.70) 100%)
                    `,
            mixBlendMode: "normal",
          }}
        />


        <div className="absolute bottom-10 right-10 text-white text-right font-mono pointer-events-none">
          <div className="text-4xl font-bold">{currentDepthMeter} m</div>
          <div className="text-sm opacity-70">DEPTH</div>
        </div>
      </div>
    </>
  );
}