import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { bandAlpha, randRange } from "./utill";
import { useTexture } from "@react-three/drei";

type Jelly = {
    x: number; y: number; z: number;
    speed: number;
    phase: number;
    scale: number;
};

export default function Jellyfish({ depthRatio }: { depthRatio: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const jellyFishTexture = useTexture("/textures/jellyfish.png");
    const count = 20;

    // ✅ 60m 근처에서만: center=0.60, width=0.12 (대략 48~72m 느낌)
    const alpha = bandAlpha(depthRatio, 0.60, 0.12);

    // ✅ 카메라 y(0 ~ -100)에 맞춰 해파리 군락을 -75~-45 사이에 분포
    const data = useMemo<Jelly[]>(() => {
        const arr: Jelly[] = [];
        for (let i = 0; i < count; i++) {
            arr.push({
                x: randRange(i, -14, 14, 11),
                y: randRange(i, -75, -45, 12),  // ✅ 60m층 근처
                z: randRange(i, -16, 2, 13),    // ✅ 카메라(0)보다 살짝 뒤쪽(-)에 더 많이
                speed: randRange(i, 0.006, 0.014, 14), // ✅ 너무 빠르면 "거품"처럼 보임
                phase: randRange(i, 0, Math.PI * 2, 15),
                scale: randRange(i, 0.7, 1.6, 16),
            });
        }
        return arr;
    }, []);

    useFrame((state) => {
        const m = meshRef.current;
        if (!m) return;

        if (alpha < 0.02) {
            m.visible = false;
            return;
        }
        m.visible = true;

        const t = state.clock.getElapsedTime();

        data.forEach((j, i) => {
            // ✅ 천천히 상승 (심해 생물 “둥실” 느낌)
            j.y += j.speed;

            // ✅ -45 위로 올라가면 다시 -75 아래로
            if (j.y > -45) j.y = -75;

            // ✅ 펄스 + sway
            const pulse = 1 + Math.sin(t * 1.7 + j.phase) * 0.10;
            const swayX = Math.sin(t * 0.6 + j.phase) * 0.35;
            const swayZ = Math.cos(t * 0.5 + j.phase) * 0.15;

            dummy.position.set(j.x + swayX, j.y, j.z + swayZ);
            dummy.scale.setScalar(j.scale * pulse);

            // ✅ 살짝 기울기
            dummy.rotation.set(
                Math.sin(t * 0.25 + i * 0.2) * 0.15,
                Math.sin(t * 0.18 + i * 0.15) * 0.25,
                0
            );

            dummy.updateMatrix();
            m.setMatrixAt(i, dummy.matrix);
        });

        m.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, count]}
            frustumCulled={false}
        >
            {/* ✅ “해파리”를 구로 두면 존재감이 약하니 약간 크게 */}
            <planeGeometry args={[1.5, 1.5]} />
            <meshBasicMaterial
                map={jellyFishTexture}
                transparent
                opacity={0.35 * alpha} // ✅ 과하게 밝으면 우주 느낌 남
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </instancedMesh>
    );
}
