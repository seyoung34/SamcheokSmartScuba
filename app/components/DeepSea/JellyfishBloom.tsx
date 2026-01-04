import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { bandAlpha, randRange } from "./utill";

type Jelly = {
    x: number; y: number; z: number;
    speed: number;
    phase: number;
    scale: number;
};

export default function JellyBloom({ depthRatio }: { depthRatio: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const count = 70;

    // const alpha = bandAlpha(depthRatio, 0.60, 0.12);
    const alpha = 1;

    const data = useMemo<Jelly[]>(() => {
        const arr: Jelly[] = [];
        for (let i = 0; i < count; i++) {
            arr.push({
                x: randRange(i, -18, 18, 11),
                y: randRange(i, -6, 2, 12),

                z: randRange(i, -6, 2, 13),

                speed: randRange(i, 0.015, 0.035, 14),
                phase: randRange(i, 0, Math.PI * 2, 15),
                scale: randRange(i, 0.9, 1.8, 16),
            });
        }
        return arr;
    }, []);

    useFrame((state) => {
        const m = meshRef.current;
        if (!m) return;

        if (alpha < 0.01) {
            m.visible = false;
            return;
        }
        m.visible = true;

        const t = state.clock.getElapsedTime();

        data.forEach((j, i) => {
            // 천천히 상승
            j.y += j.speed;
            if (j.y > -30) j.y = -80;

            // 펄스(수축/팽창) + 좌우 흔들림
            const pulse = 1 + Math.sin(t * 2 + j.phase) * 0.08;
            const swayX = Math.sin(t * 0.7 + j.phase) * 0.25;

            dummy.position.set(j.x + swayX, j.y, j.z);
            dummy.scale.setScalar(j.scale * pulse);

            dummy.rotation.set(
                Math.sin(t * 0.3 + i) * 0.1,
                Math.sin(t * 0.2 + i) * 0.2,
                0
            );

            dummy.updateMatrix();
            m.setMatrixAt(i, dummy.matrix);
        });

        m.instanceMatrix.needsUpdate = true;
    });

    // 
    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, count]}
            frustumCulled={false}
        >
            <sphereGeometry args={[0.55, 18, 18]} />
            <meshBasicMaterial
                color="#F5F7FF"
                transparent
                opacity={0.6 * alpha}
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </instancedMesh>
    );

}
