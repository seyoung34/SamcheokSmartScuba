"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { DeepSeaScene } from '../DeepSeaScene';

export default function Home() {
  const [isDiving, setIsDiving] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <DeepSeaScene isDiving={isDiving} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80 pointer-events-none" />

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
            <span className="block text-foreground">Samcheok Smart Scuba</span>
            {/* <span className="block text-primary mt-2">Deep Blue</span> */}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto "
          >
            삼척의 맑고 아름다운 바다에서 당신의 스쿠버 다이빙 여정을 시작하세요
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => setIsDiving(!isDiving)}
              className="group relative px-8 py-4 bg-primary hover:bg-[#1F6ED6] text-primary-foreground rounded-lg transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">
                {isDiving ? 'Surface' : 'Start Diving'}
              </span>
              <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>

            <button className="px-8 py-4 bg-transparent border-2 border-primary text-foreground hover:bg-primary/10 rounded-lg transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </div>

      {/* Info Cards Section */}
      <div className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg">
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
                className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
