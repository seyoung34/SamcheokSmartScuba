import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { bandAlpha, randRange } from "./utill";

type Fish = {
    x: number;
    y: number;
    z: number;
    speed: number;     // 항상 양수로 두고
    dir: 1 | -1;       // 방향은 dir로 관리
    wobble: number;
    scale: number;
    rotJitter: number;
};

type BatchProps = {
    depthRatio: number;
    alpha: number;
    count: number;
    texture: THREE.Texture;
    seedBase: number;
};

function FishBatch({ depthRatio, alpha, count, texture, seedBase }: BatchProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // 물고기 데이터는 최초 1회 생성(렌더 중 Math.random 금지)
    const fishData = useMemo<Fish[]>(() => {
        const arr: Fish[] = [];
        for (let i = 0; i < count; i++) {
            const dir = randRange(i + seedBase, 0, 1, 99) > 0.5 ? 1 : -1;
            arr.push({
                x: randRange(i + seedBase, -25, 25, 1),
                y: randRange(i + seedBase, -50, 5, 2),
                z: randRange(i + seedBase, -18, 8, 3),
                speed: randRange(i + seedBase, 0.02, 0.07, 4),
                dir,
                wobble: randRange(i + seedBase, 0.8, 2.2, 5),
                scale: randRange(i + seedBase, 0.6, 1.4, 6),
                rotJitter: randRange(i + seedBase, -0.08, 0.08, 7),
            });
        }
        return arr;
    }, [count, seedBase]);

    useFrame((state) => {
        const m = meshRef.current;
        if (!m) return;

        if (alpha < 0.01) {
            m.visible = false;
            return;
        }
        m.visible = true;

        const t = state.clock.getElapsedTime();

        // depthRatio에 따라 학교(무리) 전체를 살짝 이동시키고 싶다면:
        // (필요 없으면 지워도 됨)
        m.position.x = Math.sin(t * 0.2) * 0.35;

        fishData.forEach((f, i) => {
            // 진행 (dir에 따라 좌↔우)
            f.x += f.speed * f.dir;

            // 화면 밖으로 나가면 반대편에서 다시 등장
            if (f.x > 30) f.x = -30;
            if (f.x < -30) f.x = 30;

            const wobY = Math.sin(t * f.wobble + i * 0.3) * 0.15;
            const wobZ = Math.cos(t * f.wobble + i * 0.2) * 0.15;

            dummy.position.set(f.x, f.y + wobY, f.z + wobZ);

            // ✅ 방향에 따라 머리 방향(회전) 결정
            // dir=1이면 오른쪽, dir=-1이면 왼쪽
            // plane을 y축 0/PI로 돌려서 방향 맞춤
            const yaw = f.dir === 1 ? Math.PI : 0;
            const roll = Math.sin(t * 3 + i) * 0.08 + f.rotJitter;

            dummy.rotation.set(0, yaw, roll);

            dummy.scale.setScalar(f.scale);
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
            {/* 물고기 비율이 가로로 긴 편이면 [1.2, 0.7] 같은 식으로 */}
            <planeGeometry args={[1.0, 1.0]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={0.8 * alpha}
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </instancedMesh>
    );
}

export default function FishSchool({ depthRatio }: { depthRatio: number }) {
    // 30m 근처 활성 (중심 0.30, 폭 0.12면 대략 18m~42m 느낌)
    // 너는 넓게 쓰고 싶어서 0.3, 0.3로 했는데 너무 길게 보이면 폭만 줄이면 됨.
    const alpha = bandAlpha(depthRatio, 0.30, 0.3);

    // ✅ 여러 텍스처 한 번에 로드
    const textures = useTexture([
        "/textures/fish1.png",
        "/textures/fish2.png",
        "/textures/fish3.png",
    ]) as THREE.Texture[];

    // 텍스처 공통 설정(선택)
    useMemo(() => {
        textures.forEach((t) => {
            t.minFilter = THREE.LinearFilter;
            t.magFilter = THREE.LinearFilter;
            t.needsUpdate = true;
        });
    }, [textures]);

    // 종류별 마릿수 분배
    const total = 130;
    const counts = useMemo(() => {
        const a = Math.floor(total * 0.65);
        const b = Math.floor(total * 0.1);
        const c = total - a - b;
        return [a, b, c];
    }, [total]);

    return (
        <>
            <FishBatch
                depthRatio={depthRatio}
                alpha={alpha}
                count={counts[0]}
                texture={textures[0]}
                seedBase={1000}
            />
            <FishBatch
                depthRatio={depthRatio}
                alpha={alpha}
                count={counts[1]}
                texture={textures[1]}
                seedBase={2000}
            />
            <FishBatch
                depthRatio={depthRatio}
                alpha={alpha}
                count={counts[2]}
                texture={textures[2]}
                seedBase={3000}
            />
        </>
    );
}
