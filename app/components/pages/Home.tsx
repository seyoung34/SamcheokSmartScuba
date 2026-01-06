"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DeepSeaScene from '../DeepSea/DeepSeaScene';
import Image from "next/image";

const CardSectionArray = [
  {
    title: '넓은 주차 공간',
    description: '',
    icon: '🅿️',
  },
  {
    title: '샵에서 선착장까지 30초',
    description: '다이빙 선 3척 보유',
    icon: '⛵',
  },
  {
    title: 'Beautiful Location',
    description: '삼척의 깨끗하고 아름다운 다이빙 포인트',
    icon: '🌊',
  },
];


export function DepthOverlay({
  meter,
  title = "안내",
  message = "이 지점에서 이벤트가 발생합니다.",
  onClose,
}: {
  meter: number;
  title?: string;
  message?: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40">
      {/* dim */}
      <motion.button
        type="button"
        aria-label="닫기"
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      />

      {/* card */}
      <motion.div
        className="absolute left-1/2 top-[28%] -translate-x-1/2 w-[min(92vw,480px)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <div className="rounded-xl border border-white/15 px-4 py-4 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-white/60">DEPTH {meter}m</div>
              <div className="mt-1 text-base font-semibold text-white">{title}</div>
            </div>

            <button
              onClick={onClose}
              className="text-sm text-white/70 hover:text-white transition"
            >
              닫기
            </button>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-white/75">{message}</p>
        </div>
      </motion.div>
    </div>
  );
}

//글래스모피즘
function ShopPromoOverlay() {
  return (
    <div
      className={[
        // glass card
        "rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl",
        "shadow-[0_10px_40px_rgba(0,0,0,0.35)]",  //주변 그림자
        // layout
        "px-4 py-4 sm:px-6 sm:py-5",
        "text-white",
      ].join(" ")}
    >
      {/* 상단: 타이틀 */}
      <div className="flex items-start gap-3">


        <div className="min-w-0">
          <div className="text-base sm:text-lg font-semibold tracking-tight">
            다이빙 리조트 & 샵 안내
          </div>
          <div className="mt-1 text-sm sm:text-[15px] text-white/75 leading-relaxed">
            접근성 좋은 동선과 편의 시설로, 준비부터 입수까지 빠르고 편안하게 진행할 수 있어요.
          </div>
        </div>
      </div>

      {/* 포인트 칩 */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Pill icon="🅿️" label="넓은 주차공간" />
        <Pill icon="⛵" label="샵 바로 앞 선착장" />
        <Pill icon="🧰" label="장비/교육 동선 최적" />
      </div>

      {/* 강조 문구 */}
      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 px-3 py-3">
        <div className="text-sm sm:text-[15px] leading-relaxed text-white/85">
          “샵 → 선착장” 이동이 짧아 <span className="text-white font-semibold">대기 시간</span>이 줄고,
          체력 소모를 최소화할 수 있습니다.
        </div>
      </div>

      {/* 하단 액션 */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-xs sm:text-sm text-white/60">
          * 현장 상황에 따라 운영 동선은 달라질 수 있어요
        </div>

        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className={[
            "shrink-0 rounded-xl px-4 py-2 text-sm font-medium",
            "bg-sky-400/90 text-slate-950",
            "hover:bg-sky-300/95",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          ].join(" ")}
          onClick={() => {
            // TODO: 예약/문의 모달 열기 등
            console.log("예약 문의 클릭");
          }}
        >
          예약 문의
        </motion.button>
      </div>
    </div>
  );
}


// 이미지 오버레이
function ImageOverlayCard({
  src,
  title,
}: {
  src: string;
  title: string
}) {
  return (

    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        // glass base
        "bg-black/20 backdrop-blur-xl",
        "border border-white/10",
      ].join(" ")}
    >
      {/* 이미지 영역 */}
      <div className="relative w-full aspect-[16/9] max-h-[44vh]">
        <Image
          src={src}
          alt={title}
          fill
          priority={false}
          className="object-cover"
          sizes="(max-width: 768px) 92vw, 760px"
        />

      </div>

    </div>

  );
}


function Pill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1">
      <span className="text-sm">{icon}</span>
      <span className="text-xs sm:text-sm text-white/85">{label}</span>
    </div>
  );
}

function OverlayHost({ id }: { id: string }) {

  switch (id) {
    case "1": {

      return (
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[min(92vw,760px)] px-4">
          <AnimatePresence mode="wait">
            <motion.div
              className="pointer-events-auto"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)", scale: 0.99 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: 10, filter: "blur(6px)", scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ImageOverlayCard
                src="/mainImage.jpg" // 원하는 이미지로 교체
                title="삼척 다이빙 리조트"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      );
    }

    case "2":
      return (
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(92vw,760px)] px-4">
          <AnimatePresence mode="wait">
            <motion.div
              className="pointer-events-auto"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)", scale: 0.99 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: 10, filter: "blur(6px)", scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ImageOverlayCard
                src="/mainImage2.jpg" // 원하는 이미지로 교체
                title="이미지2"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      );
    case "3":
      return (
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[min(92vw,760px)] px-4">
          <AnimatePresence mode="wait">
            <motion.div
              className="pointer-events-auto"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)", scale: 0.99 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: 10, filter: "blur(6px)", scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ImageOverlayCard
                src="/mainImage3.jpg" // 원하는 이미지로 교체
                title="이미지3"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      );
    default:
      return null;
  }
}

export default function Home() {

  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [meter, setMeter] = useState(0);

  useEffect(() => {
    console.log(`activeIds : ${activeIds}`);
  }, [activeIds]);

  return (
    <div className="relative min-h-[120dvh] overflow-x-hidden">

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }} // amount: 트리거 민감도
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
          }}
        >
          <motion.h1
            className="text-5xl md:text-7xl mb-6 tracking-tight"
            variants={{
              hidden: { opacity: 0, scale: 0.98 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
            }}
          >
            {/* PC */}
            <span className="hidden md:inline text-white">
              <span className="text-blue-300">S</span>amcheok{" "}
              <span className="text-blue-300">S</span>mart{" "}
              <span className="text-blue-300">S</span>cuba
            </span>

            {/* 모바일 */}
            <motion.span className="md:hidden flex flex-col space-y-4">
              {["amcheok", "mart", "cuba"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-blue-400">S</span>{word}
                </motion.span>
              ))}
            </motion.span>

          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/60 -translate-x-2"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.6 } },
            }}
          >
            한결같은 스쿠버 다이빙
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute top-3/4 left-1/2 -translate-x-1/2 text-white/50 text-center pointer-events-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.6 }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <p className="animate-bounce mb-2">↓</p>
          <p>Scroll to Dive</p>
        </motion.div>
      </div>


      {/* 3D Background */}
      <DeepSeaScene
        onOverlaysChange={(ids, m) => {
          setActiveIds(ids);
          setMeter(m);
          console.log(activeIds.toString());
        }}
      />

      {/* 오버레이 */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        {activeIds.map((id) => (
          <OverlayHost key={id} id={id} />
        ))}
      </div>

      {/* 카드 섹션 */}
      <div className="relative py-24 px-4  ">
        <div className="max-w-7xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-white/70">Samcheok Smart Scuba</h2>
            <p className="text-muted-foreground text-lg text-white/70">
              전문적이고 안전한 다이빙 경험을 제공합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CardSectionArray.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300 border-white/80"
              >
                <div className="text-5xl mb-4 ">{item.icon}</div>
                <h3 className="text-xl mb-3 text-white/70">{item.title}</h3>
                <p className="text-muted-foreground text-white/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
