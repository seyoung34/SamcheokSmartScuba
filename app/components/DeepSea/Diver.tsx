"use client";

import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
    depthRatio: number;
    textureUrl?: string;
    cols?: number;
    rows?: number;
    fps?: number;
    size?: number;
    x?: number;
    z?: number;
    yTop?: number;
    yBottom?: number;
};

export default function DiverSprite({
    depthRatio,
    textureUrl = "/textures/diver.jpg",
    cols = 6,
    rows = 4,
    fps = 10,
    size = 2.8,
    x = 2.5,
    z = -4,
    yTop = 2,
    yBottom = -92,
}: Props) {
    const meshRef = useRef<THREE.Mesh>(null);

    // 원본 텍스처(불변 취급)
    const baseTex = useTexture(textureUrl);

    // ✅ 수정 가능한 텍스처는 ref로
    const texRef = useRef<THREE.Texture | null>(null);

    const totalFrames = useMemo(() => cols * rows, [cols, rows]);
    const frameRef = useRef(0);

    useEffect(() => {
        const t = baseTex.clone();

        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;

        t.repeat.set(1 / cols, 1 / rows);
        t.offset.set(0, 1 - 1 / rows);

        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;

        t.needsUpdate = true;
        texRef.current = t;

        return () => {
            t.dispose();
            texRef.current = null;
        };
    }, [baseTex, cols, rows]);

    useFrame((state, delta) => {
        const m = meshRef.current;
        const tex = texRef.current;
        if (!m || !tex) return;

        const t = state.clock.getElapsedTime();

        // 위치/흔들림
        const y = THREE.MathUtils.lerp(yTop, yBottom, depthRatio);
        m.position.set(
            x + Math.sin(t * 0.6) * 0.25,
            y + Math.sin(t * 0.9) * 0.18,
            z
        );

        // 살짝 기울기
        m.rotation.z = Math.sin(t * 0.45) * 0.08;

        // billboard (다이버가 카메라를 향하게)
        m.lookAt(state.camera.position);

        // 프레임 진행
        frameRef.current = (frameRef.current + fps * delta) % totalFrames;
        const frame = Math.floor(frameRef.current);

        const col = frame % cols;
        const row = Math.floor(frame / cols);

        // ✅ ref의 텍스처는 mutate 가능
        tex.offset.x = col / cols;
        tex.offset.y = 1 - (row + 1) / rows;
        tex.needsUpdate = true;
    });

    // texRef가 준비되기 전에는 material에 map을 못 넣으니, 기본 material로 안전하게
    const map = texRef.current ?? undefined;

    return (
        <mesh ref={meshRef} frustumCulled={false}>
            <planeGeometry args={[size, size / 2]} />
            <meshBasicMaterial
                map={map}
                transparent
                opacity={0.95}
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
