"use client";

import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
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
    textureUrl = "/textures/diver_sprite.png",
    cols = 8,
    rows = 2,
    fps = 10,
    size = 2.8,
    x = 0,
    z = 2,
    yTop = -4,
    yBottom = -100,
}: Props) {
    const meshRef = useRef<THREE.Mesh>(null);

    // ✅ material을 ref로 잡아서 “외부 시스템(three material)”로 취급
    const matRef = useRef<THREE.MeshBasicMaterial>(null);

    // 원본 텍스처(불변처럼 사용)
    const baseTex = useTexture(textureUrl);

    // UV 애니메이션할 텍스처는 ref로
    const texRef = useRef<THREE.Texture | null>(null);

    // 프레임 인덱스
    const totalFrames = 9; // 실제 프레임 수에 맞게 조정
    const frameRef = useRef(0);

    //실제 적용할 중간 Y값
    const smoothYRef = useRef<number>(yTop);

    useEffect(() => {   //초기 세팅, 정리
        const t = baseTex.clone();

        //텍스쳐 좌표 clamp
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;

        t.repeat.set(1 / cols, 1 / rows);   //한칸 크기로 자르기
        t.offset.set(0, 1 - 1 / rows);

        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;

        t.needsUpdate = true;
        texRef.current = t;

        // ✅ setState 대신, material에 직접 map 주입 (외부 시스템 동기화)
        if (matRef.current) {
            matRef.current.map = t;
            matRef.current.needsUpdate = true;
        }

        return () => {
            // material에서 map 제거
            if (matRef.current && matRef.current.map === t) {
                matRef.current.map = null;
                matRef.current.needsUpdate = true;
            }

            t.dispose();
            texRef.current = null;
        };
    }, [baseTex, cols, rows]);

    useFrame((state, delta) => {    //매 프레임 애니메이션 업데이트
        const m = meshRef.current;
        const tex = texRef.current;
        if (!m || !tex) return;

        const t = state.clock.getElapsedTime();

        // 위치/흔들림
        const targetY = THREE.MathUtils.lerp(yTop, yBottom, depthRatio);
        // 2) 프레임 독립적 스무딩 (delta 고려)
        // 값이 클수록 더 빨리 따라감. 6~12 정도로 시작 추천
        const follow = 3;
        const k = 1 - Math.exp(-follow * delta);

        smoothYRef.current = THREE.MathUtils.lerp(smoothYRef.current, targetY, k);

        // 3) 적용
        m.position.set(
            x + Math.sin(t * 1) * 0.7,
            smoothYRef.current + Math.sin(t * 0.9) * 0.18,
            z + Math.sin(t * 0.9) * 0.7
        );

        m.rotation.z = Math.sin(t * 0.45) * 0.08;

        // billboard
        m.lookAt(state.camera.position);

        // 스프라이트 프레임
        frameRef.current = (frameRef.current + fps * delta) % totalFrames;
        const frame = Math.floor(frameRef.current);

        const col = frame % cols;
        const row = Math.floor(frame / cols);

        tex.offset.x = col / cols;
        tex.offset.y = 1 - (row + 1) / rows;
        tex.needsUpdate = true;
    });

    return (
        <mesh ref={meshRef} frustumCulled={false}>
            <planeGeometry args={[size, size]} />
            <meshBasicMaterial
                ref={matRef}
                transparent
                opacity={0.95}
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
