import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { bandAlpha } from "./utill";

export default function WreckAndShark({ depthRatio }: { depthRatio: number }) {
    const wreckRef = useRef<THREE.Mesh>(null);
    const sharkRef = useRef<THREE.Mesh>(null);

    const alpha = bandAlpha(depthRatio, 0.85, 0.10);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // 난파선: 거의 고정, 살짝 흔들리는 느낌만
        if (wreckRef.current) {
            wreckRef.current.visible = alpha > 0.01;
            wreckRef.current.material = wreckRef.current.material as THREE.MeshStandardMaterial;
            (wreckRef.current.material as THREE.MeshStandardMaterial).opacity = 0.85 * alpha;

            wreckRef.current.rotation.z = -0.25 + Math.sin(t * 0.15) * 0.02;
            wreckRef.current.position.y = -85;
            wreckRef.current.position.z = -8;
        }

        // 상어: alpha가 살아있을 때만 “한 번씩” 지나가게
        if (sharkRef.current) {
            sharkRef.current.visible = alpha > 0.05;

            // alpha 구간에서만 진행이 보이게(시간 기반)
            // -1~1 반복 이동
            const phase = (t * 0.18) % 1; // 0~1
            const x = THREE.MathUtils.lerp(26, -26, phase);

            sharkRef.current.position.set(x, -78 + Math.sin(t * 0.7) * 0.4, -4);
            sharkRef.current.rotation.y = Math.PI; // 좌로 이동하니 뒤집기
            const mat = sharkRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.65 * alpha;
        }
    });

    return (
        <>
            {/* 난파선 실루엣 */}
            <mesh ref={wreckRef} position={[0, -85, -8]} rotation={[0, 0, -0.25]}>
                <boxGeometry args={[18, 6, 4]} />
                <meshStandardMaterial
                    color={"#0B1220"}
                    transparent
                    opacity={0}
                    roughness={1}
                    metalness={0}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* 상어 실루엣(간단 plane) */}
            <mesh ref={sharkRef}>
                <planeGeometry args={[8, 2.6]} />
                <meshBasicMaterial
                    color={"#111A2E"}
                    transparent
                    opacity={0}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </>
    );
}


