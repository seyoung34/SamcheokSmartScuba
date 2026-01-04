// depthRatio(0~1)에서 특정 지점(center) 주변(width)만 살아나는 알파(0~1)
export function clamp01(v: number) {
    return Math.max(0, Math.min(1, v));
}

export function smoothstep(edge0: number, edge1: number, x: number) {
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
}

// center를 기준으로 좌/우 width 범위에서 1에 가까워지고, 바깥에서 0으로 내려감
export function bandAlpha(t: number, center: number, width: number) {
    const left = smoothstep(center - width, center, t);
    const right = 1 - smoothstep(center, center + width, t);
    return clamp01(left * right);
}

// Math.random 대신: 고정 시드 기반 PRNG (deterministic)
export function mulberry32(seed: number) {
    return function () {
        let t = (seed += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// i 기반 “항상 동일한” 랜덤
export function rand01(i: number, salt = 0) {
    const r = mulberry32(i * 10007 + salt * 1009);
    return r(); // 0~1
}

export function randRange(i: number, min: number, max: number, salt = 0) {
    return min + (max - min) * rand01(i, salt);
}
