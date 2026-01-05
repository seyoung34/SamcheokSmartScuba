"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DeepSeaScene from '../DeepSea/DeepSeaScene';

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



export default function Home() {

  const [showOverlay, setShowOverlay] = useState(false);
  const [meter, setMeter] = useState(0);

  return (
    <div className="relative min-h-[120dvh] overflow-x-hidden">

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl mb-6 tracking-tight"
          >
            <span className="block text-white"><span className='text-blue-300'>S</span>amcheok <span className='text-blue-300'>S</span>mart <span className='text-blue-300'>S</span>cuba</span>

          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-white/60"
          >
            한결과 함께 하는 할렐야루 스쿠버 다이빙
          </motion.p>
        </motion.div>
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 text-white/50 text-center pointer-events-auto ">
          <p className="animate-bounce mb-2">↓</p>
          <p>Scroll to Dive</p>
        </div>
      </div>

      {/* 3D Background */}
      <DeepSeaScene
        onDepthGateChange={(isOver, m) => {
          setMeter(m);
          setShowOverlay(isOver);
        }}
      />

      <AnimatePresence>
        {showOverlay && (
          <DepthOverlay
            meter={meter}
            onClose={() => setShowOverlay(false)}
          />
        )}
      </AnimatePresence>

      {/* Info Cards Section */}
      <div className="relative py-24 px-4  ">
        <div className="max-w-7xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-white/70">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg text-white/70">
              전문적이고 안전한 다이빙 경험을 제공합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Professional Instructors',
                description: '국제 공인 자격증을 보유한 전문 강사진',
                icon: '🏆',
              },
              {
                title: 'Safety First',
                description: '최신 장비와 철저한 안전 관리 시스템',
                icon: '🛡️',
              },
              {
                title: 'Beautiful Location',
                description: '삼척의 깨끗하고 아름다운 다이빙 포인트',
                icon: '🌊',
              },
            ].map((item, index) => (
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
