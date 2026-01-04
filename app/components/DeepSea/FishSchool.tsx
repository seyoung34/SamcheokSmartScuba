import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { bandAlpha, randRange } from "./utill";
import { useTexture } from "@react-three/drei";


type Fish = {
    x: number; y: number; z: number;
    speed: number;
    wobble: number;
    scale: number;
};

export default function FishSchool({ depthRatio }: { depthRatio: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const fishTexture = useTexture("/textures/fish.png");

    const count = 180;

    // 30m 근처에서만 활성 (폭은 0.10 = 10m 정도 범위 느낌)
    const alpha = bandAlpha(depthRatio, 0.3, 0.3);

    const fishData = useMemo<Fish[]>(() => {
        const arr: Fish[] = [];
        for (let i = 0; i < count; i++) {
            arr.push({
                x: randRange(i, -25, 25, 1),
                y: randRange(i, -50, 5, 2),
                z: randRange(i, -18, 8, 3),
                speed: randRange(i, 0.03, 0.08, 4),
                wobble: randRange(i, 0.8, 2.2, 5),
                scale: randRange(i, 0.6, 1.4, 6),
            });
        }
        return arr;
    }, []);

    useFrame((state) => {
        const m = meshRef.current;
        if (!m) return;

        // alpha가 거의 0이면 업데이트 비용 줄이기
        if (alpha < 0.01) {
            m.visible = false;
            return;
        }
        m.visible = true;

        const t = state.clock.getElapsedTime();
        // 그룹 전체 살짝 좌우 흔들림
        m.position.x = Math.sin(t * 0.25) * 0.4;

        fishData.forEach((f, i) => {
            // x 흐름 (좌-우)
            f.x += f.speed;
            if (f.x > 30) f.x = -30;

            const wobY = Math.sin(t * f.wobble + i * 0.3) * 0.15;
            const wobZ = Math.cos(t * f.wobble + i * 0.2) * 0.15;

            dummy.position.set(f.x, f.y + wobY, f.z + wobZ);
            dummy.scale.setScalar(f.scale);

            // 진행 방향으로 살짝 기울여서 “헤엄” 느낌
            dummy.rotation.set(0, Math.PI, Math.sin(t * 3 + i) * 0.1);
            dummy.updateMatrix();
            m.setMatrixAt(i, dummy.matrix);
        });

        m.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <planeGeometry args={[0.9, 0.9]} />
            <meshBasicMaterial
                map={fishTexture}
                transparent
                opacity={0.7 * alpha}
                depthWrite={false}
                side={THREE.DoubleSide}
            />

        </instancedMesh>
    );
}
